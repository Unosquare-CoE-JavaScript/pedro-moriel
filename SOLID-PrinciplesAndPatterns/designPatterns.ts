/*
==> DESIGN PATTERNS <==

    Design patterns are great problem solving templates that developers can apply to their projects. There are way too 
    many patterns to cover in a single article though and they tend to attack different needs.

    *STRUCTURAL PATTERNS ==> they deal with structuring the relationship between different components (or classes) and forming 
    new structures in order to provide new functionalities. Examples of structural patterns are Composite, Adapter and Decorator.

    *BEHAVIORAL PATTERNS ==> they help abstract common behavior between components into a separate entity which in turn, and your 
    creational patterns. Examples of behavioral patterns are Command, Strategy, and one of my personal favorites: the Observer pattern.

    *CREATIONAL PATTERNS ==> they focus on class instantiation and making your life easier in order to create new entities. I’m talking 
    about Factory method, Singleton and Abstract Factory.

    == Singleton Pattern ==
    The singleton pattern is probably one of the most known design patterns out there. It is a creational pattern because it ensures that 
    no matter how many times you try to instantiate a class, you’ll only have one instance available.
    This is a great pattern to handle things such as "database connections", since you’ll probably want to only handle one at a time, instead 
    of having to re-connect on every user request.
    Example:    
*/
//Simulate a database connectino class
class MyDBConn{

    protected static instance: MyDBConn | null = null
    private id: number = 0

    constructor() {
        //... db connection logic
        this.id = Math.random() //the ID could represent the actual connection to the db
    }
    
    public getID(): number {
        return this.id
    }

    public static getInstance(): MyDBConn {
        if(!MyDBConn.instance) {
            MyDBConn.instance = new MyDBConn()
        }
        return MyDBConn.instance
    }
}

const connections = [
                        MyDBConn.getInstance(),
                        MyDBConn.getInstance(),
                        MyDBConn.getInstance(),
                        MyDBConn.getInstance(),
                        MyDBConn.getInstance()
                ]

connections.forEach( c => {
    console.log(c.getID())
})

/*
    Now, granted, you can’t directly instantiate the class, but with the getInstance method, you can be sure you won’t have more than 
    one instance. In the above example, you can see how a fake class that would wrap the database connection would benefit from this 
    pattern. Ths id property could easily be thought of as thee actual connection, and this little test is showing you how that 
    “connection” is always going to be the same one, no matter how many times you call the getInstance method.


    == Factory Method Pattern ==
    the Factory Method pattern is a creational pattern, just like Singleton. However, instead of directly working on top of the object 
    we care about, this pattern only takes care of managing its creation.

    Imagine you have to write code that will move vehicles, they are very different types of vehicles (i.e a car, a bicycle and a plane), 
    the movement code should be encapsulated inside each vehicle class, but the code that calls their move method can be generic.

    The question here is how are you going to handle the object creation? You could have a single creator class with 3 methods, or one method 
    that receives a parameter. In either case, extending this logic in order to support the creationg of more vehices requires you to keep 
    growing the same class.

    However, if you decided to use the factory method pattern, you could create a new object is encapsulated into a new class, one for each 
    vehicle type. This ensures that if you need to add vehicles in the future you just need to add a new class, without having to modify anything 
    already existing.

    Let’s take a closer look at how we would implement this with TypeScript:
*/
interface Vehicle {
    move(): void
}

//The classes we care about, the "move" method is where our "business logic" would live
class Car implements Vehicle {

    public move(): void {
        console.log("Moving the car!")
    }
}

class Bicycle implements Vehicle {

    public move(): void {
        console.log("Moving the bicycle!")
    }
}

class Plane implements Vehicle {

    public move(): void {
        console.log("Flying the plane!")
    }
}

//The VehicleHandler is "abstract" because noone is going to instantiate it
//We want to extend it and implement the abstract method
abstract class VehicleHandler {

    //This is the method real handlers need to implement
    public abstract createVehicle(): Vehicle 

    //This is the method we care about, the rest of the business logic resides here
    public moveVehicle(): void {
        const myVehicle = this.createVehicle()
        myVehicle.move()
    }
} 

//Here is where we implement the custom object creation
class PlaneHandler extends VehicleHandler{

    public createVehicle(): Vehicle {
        return new Plane()
    }
}

class CarHandler  extends VehicleHandler{

    public createVehicle(): Vehicle {
        return new Car()
    }
}

class BicycleHandler  extends VehicleHandler{

    public createVehicle(): Vehicle {
        return new Bicycle()
    }
}

/// User code...
const planes = new PlaneHandler()
const cars = new CarHandler()

planes.moveVehicle()
cars.moveVehicle()

/*
    Essentially in the end, we care about the custom handlers, and I called them handlers instead of creators (which is how other literature 
    might call them) because they don’t only take care of creating the objects, but they also have the logic that uses them (as you can see 
    by the moveVehicle method).

    The beauty of this pattern, is that if you wanted to add a new vehicle type, all you have to do is add its vehicle class and its handler class, 
    without growing the LOC of any other class.


    == Observer Pattern ==
    Heard about ReactJS? Based on it. What about event handlers in front-end JavaScript? Based on it. At least based on the theory, I honestly 
    don’t know how each browser implements their event system, but it’s a good enough guess. The point is, with the Observer pattern you can 
    implement them and more.

     Essentially the pattern states that you have a set of observer objects, which will react to changes in the state of the observed entity. 
     In order for this to happen, once a change is received at the observed end, it is responsible for notifying its observers by calling one 
     of its methods.

     In practice, the implementation of this pattern is relatively easy, let’s take a quick look at the code and then review it:
*/
type InternalState = {
    event: String
}

abstract class Observer { 
    abstract update(state:InternalState): void 
} 


abstract class Observable {

    protected observers: Observer[] = [] //the list of observers
    protected state:InternalState = { event: "" } //the internal state observers are watching

    public addObserver(o:Observer):void {
        this.observers.push(o)
    }
    
    protected notify() {
        this.observers.forEach( o => o.update(this.state) )
    }
}

//Actual implementations
class ConsoleLogger extends Observer  {

    public update(newState: InternalState) {
        console.log("New internal state update: ", newState)
    }
}

class InputElement extends Observable {

    public click():void {
        this.state = { event: "click" }
        this.notify()
    }

}

const input = new InputElement()
input.addObserver(new ConsoleLogger())

input.click()

/*
    As you can see, with two abstract classes we can define the Observer which is going to represent the objects that react to changes on the 
    Observable entity. In our example above, we’re pretending to have an InputElement entity (similar to how you have your HTML input fields on 
    the front-end) that gets clicked, and one ConsoleLogger that logs everything that happens to the console, without us having to do anything.

    The beauty of this pattern is that it allows us to know and react to the internal state of the Observable without having to mess with its 
    internal code. We can keep adding Observers that do other things, even some that react to specific events, and then have their code decide 
    what to do on each notification.

    == Decorator Pattern ==
    The decorator pattern attemps to add behavior to an already existing object during run-time. In a way, you can think of this as dynamic 
    inheritance because even though you’re not creating a new class in order to add the behavior, you’re creating a new object with the extended 
    functionality.

    Composition allows you to encapsulate custom behavior inside different classes and then use the pattern to create new instances of those classes 
    by passinng the originaal object to their constructor. Let’s take a look at the code:
*/
abstract class Animal {

    abstract move(): void
}

abstract class SuperDecorator extends Animal {
    protected comp: Animal
    
    constructor(decoratedAnimal: Animal) {
        super()
        this.comp = decoratedAnimal
    }
    
    abstract move(): void
}

class Dog extends Animal {

    public move():void {
        console.log("Moving the dog...")
    }
}

class SuperAnimal extends SuperDecorator {

    public move():void {
        console.log("Starts flying...")
        this.comp.move()
        console.log("Landing...")
    }
}

class SwimmingAnimal extends SuperDecorator {

    public move():void {
        console.log("Jumps into the water...")
        this.comp.move()
    }
}


const dog = new Dog()

console.log("--- Non-decorated attempt: ")
dog.move()

console.log("--- Flying decorator --- ")
const superDog =  new SuperAnimal(dog)
superDog.move()

console.log("--- Now let's go swimming --- ")
const swimmingDog =  new SwimmingAnimal(dog)
swimmingDog.move()

/*
    -> The SuperDecorator class is indeed, extending the Animal class, the same class that the Dog class extends. This is because the 
      decorator needs to provide the same public interface that the class its trying to decorate.
    -> The SuperDecorator class is abstract which means you don’t really work with it, you just use it to define the constructor which 
      will keep the copy of the original object in a protected property. The overwrite of the public interface is done inside the custom 
      decorators.
    -> SuperAnimal and SwimmingAnimal are the actual decorators, and they are the ones that add the extra behavior.

    The benefit of having this setup, is that if you wanted to mix both behaviors into one, thanks to the fact that all decorators are indirectly 
    extending the Animal class as well, you can do the following:
 */
console.log("--- Now let's go SUPER swimming --- ")
const superSwimmingDog =  new SwimmingAnimal(superDog)
superSwimmingDog.move()

/*
    == Composite Pattern ==
    A very useful and interesting pattern when it comes to handling multiple similar objects together. This pattern allows you to handle a set of 
    similar components as a group, being able to execute a particular operation on them and aggregating the result from them all.

    The interesting part about this pattern though, is that it’s not a simple group of object, it can contain entities or groups of entities, and 
    each group can at the same time, contain more groups.

    Let’s take a look at an example:
*/
interface IProduct {
    
    getName(): string
    getPrice(): number 
}

//The "Component" entity
class Product implements IProduct {

    private price:number 
    private name:string
    
    constructor(name:string, price:number) {
        this.name = name
        this.price = price
    }
    
    public getPrice(): number {
        return this.price
    }
    
    public getName(): string {
        return this.name
    }
}

//The "Composite" entity which will group all other composites and components (hence the "IProduct" interface)
class Box implements IProduct {

    private products: IProduct[] = []
    
    contructor() {
        this.products = []
    }
    
    public getName(): string {
        return "A box with " + this.products.length + " products"
    } 
    
    add(p: IProduct):void {
        console.log("Adding a ", p.getName(), "to the box")
        this.products.push(p)
    }

    getPrice(): number {
        return this.products.reduce( (curr: number, b: IProduct) => (curr + b.getPrice()),  0)
    }
}

//Using the code...
const box1 = new Box()
box1.add(new Product("Bubble gum", 0.5))
box1.add(new Product("Samsung Note 20", 1005))

const box2 = new Box()
box2.add( new Product("Samsung TV 20in", 300))
box2.add( new Product("Samsung TV 50in", 800))

box1.add(box2)

console.log("Total price: ", box1.getPrice())

/*
    In the above example, we have products that can be put into boxes, and boxes that can also, be put inside other boxes. This is a 
    classic example of a composite, because what you’re trying to achieve is to get the complete price of the delivery you’re making, 
    thus you want to add the price of every element inside the big box (including the price of each individual smaller box).

    Thus, the normally called “component” element, is the Product class, otherwise known as the “leaf” element inside the tree. This 
    is because this entity has no children. While the Box class is the composite itself, having a list of children, all of them implementing 
    the same interface. That last part is because you want to be able to iterate over all children and execute the same method (remember that 
    here a child can be another, smaller composite).

    The output from the example should be:
        Adding a  Bubble gum to the box
        Adding a  Samsung Note 20 to the box
        Adding a  Samsung TV 20in to the box
        Adding a  Samsung TV 50in to the box
        Adding a  A box with 2 products to the box
        Total price:  2105.5

    So, consider using this pattern when it comes to dealing with multiple objects that follow the same interface.

    +++++
    In conclusion, Design patterns are perfect tools to use for problem solving, although no matter how many examples you see online, none will 
    fit your needs exactly, you’ll have to understand them and modify them a little to make them work. Either that or modify your business logic 
    to make the pattern fit, either way, it’s always a good investment.
*/

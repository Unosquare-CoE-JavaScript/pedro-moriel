/*
    ==> SOLID Pronciples <==

    SOLID is an acronym that stands for the first five OOD principles as outlined by renowned software engineer 
    Robert C. Martin. The SOLID principles are designed to help developers design robust, maintainable applications.

    The five SOLID principles are:

    - Single-responsibility principle ->  Classes should have a single responsibility and thus only a single reason to change.
    - Open–closed principle -> Classes and other entities should be open for extension but closed for modification.
    - Liskov substitution principle -> Objects should be replaceable by their subtypes.
    - Interface segregation principle -> Interfaces should be client specific rather than general.
    - Dependency inversion principle -> Depend on abstractions rather than concretions.


    == Single Responsibility principle ==

    The single responsibility principle in JavaScript deals with the cohesiveness of modules. It states that functions 
    and classes should only have one job.

    Take, for example, a Car model:
*/
class Car {
    constructor(name,model,year) {
        this.name=name
        this.model=model
        this.year=year
    }
    getCar(id) {
        return this.http.get('api/cars/'+id)
    }
    saveCar() {
        return this.post('api/cars', { name: this.name, year: this.year, model: this.model })
    }
}
/*
    The above example violates the single responsibility principle. Why? The Car model was meant to hold/represent a car, 
    but it has a getCar method that fetches a car from the internet. That gives it another responsibility of getting cars 
    from an endpoint.

    A line needs to be drawn on the responsibility of the Car class: will it be used as a model or as an object?
    If we touch either the saveCar or getCar methods to make a change, this change may force us to redesign the Car model either 
    by adding an extra property or adding another thing in the Car class. If we forget to do this, that application may break in 
    unpredictable ways.

    We can separate the responsibilities to different classes:
*/
class Car {
    constructor(name, model, year) {
        this.name = name
        this.model = model
        this.year = year
    }
}
class CarService {
    getCar(id) {
        return this.http.get('api/cars/'+id)
    }
    saveCar(car) {
        this.http.post('api/cars', car)
    }
}
/*
    As you can see from this example, we now have the responsibilities separated. Now, the Car model manages a car and the CarService 
    has the responsibility of getting and saving cars from an endpoint.

    If a class has more than one responsibility, the responsibilities become coupled. Changes to one responsibility may inhibit the 
    class’s ability to meet the others. This kind of coupling leads to fragile designs that break in unexpected ways when changed.


    == Open-Closed principle ==

    The open-closed principle says that code should be open for extension, but closed for modification. What this means is that if 
    we want to add additional functionality, we should be able to do so simply by extending the original functionality, without the 
    need to modify it.

    Below we have a Vehicle class. When a Vehicle instance is created, we pass in the fuel capacity and fuel efficiency. To get our 
    range, we simply multiply our capacity by our efficiency.
*/
class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }
    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}
const standardVehicle1 = new Vehicle(10, 15);
console.log(standardVehicle.getRange()); // Outputs '150'
/*
    But let’s say we add a new type of vehicle; a hybrid vehicle. This vehicle doesn’t just have standard fuel-based range, it 
    also has an electric range which it can use as well. To find out the range now, we need to modify our getRange() method to check 
    if the vehicle is hybrid, and add its electric range if so:
*/
class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        let range = this.fuelCapacity * this.fuelEfficiency;

        if (this instanceof HybridVehicle) {
            range += this.electricRange;
        }
        return range;
    }
}

class HybridVehicle extends Vehicle {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }
}

const standardVehicle2 = new Vehicle(10, 15);
const hybridVehicle1 = new HybridVehicle(10, 15, 50);

console.log(standardVehicle.getRange()); // Outputs '150'
console.log(hybridVehicle.getRange()); // Outputs '200'
/*
    This violates the open-closed principle, because whilst adding our new HybridVehicle class we have had to go back and modify 
    the code of our Vehicle class in order to make it work. Going forward, every time we add a new type of vehicle that might have 
    different parameters for its range, we’ll have to continually modify that existing getRange function.

    Instead what we could do, is to override the getRange method in the HybridVehicle class, giving the correct output for both Vehicle 
    types, without every modifying the original code:
*/
class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}

class HybridVehicle extends Vehicle {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }

    getRange() {
        return (this.fuelCapacity * this.fuelEfficiency) + this.electricRange;
    }
}

const standardVehicle3 = new Vehicle(10, 15);
const hybridVehicle2 = new HybridVehicle(10, 15, 50);

console.log(standardVehicle.getRange()); // Outputs '150'
console.log(hybridVehicle.getRange()); // Outputs '200'

/*

    == Liskov Substitution principle ==

    The Liskov substitution principle states that any class should be substitutable for its parent class without unexpected 
    consequences. In others words, if the classes Cat and Dog extend the class Animal, then we would expect all of the functionality 
    held within the Animal class to behave normally for a Cat and Dog object.

    A classic example of a Liskov substitution violation is the “square & rectangle problem”. In this problem, it is posed that a 
    Square class can inherit from a Rectangle class. On the face of it, this makes sense; both shapes have two sides, and both 
    calculate their area by multiplying their sides by each other.

    But the problem arises when we try to utilise some Rectangle functionality on a Square object. Let’s look at an example:
*/
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    setHeight(newHeight) {
        this.height = newHeight;
    }
}

class Square extends Rectangle {}

const rectangle = new Rectangle(4, 5);
const square = new Square(4, 4);

console.log(`Height: ${rectangle.height}, Width: ${rectangle.width}`); // Outputs 'Height: 4, Width: 5' (correct)
console.log(`Height: ${square.height}, Width: ${square.width}`); // Outputs 'Height: 4, Width: 4' (correct)

square.setHeight(5);
console.log(`Height: ${square.height}, Width: ${square.width}`); // Outputs 'Height: 5, Width: 4' (wrong)

/*
    In this example we initialise a Rectangle and Square, and output their dimensions. We then call the Rectangle.setHeight() on 
    the Square object, and output its dimensions again. What we find is that the square now has a different height than its length, 
    which of course makes for an invalid square.

    This can be solved, using polymorphism, an if statement in the Rectangle class, or a variety of other methods. But the real 
    cause of the issue is that Square is not a good child class of Rectangle, and that in reality, perhaps both shapes should inherit 
    from a Shape class instead.


    == Interface Segregator principle ==

    The interface segregation principle states that an entity should never be forced to implement an interface that contains elements 
    which it will never use. For example, a Penguin should never be forced to implement a Bird interface if that Bird interface 
    includes functionality relating to flying, as penguins cannot fly.

    Now, this functionality is a little more difficult to demonstrate using JavaScript, due to its lack of interfaces. However, we can 
    demonstrate it by using composition.

    Composition is a subject all by itself, but I’ll give a very high level introduction: Instead of inheriting an entire class, we can 
    instead add chunks of functionality to a class. Here’s an example that actually addresses the interface segregation principle:
*/
class Penguin {}

class Bird {}

const flyer = {
    fly() {
        console.log(`Flap flap, I'm flying!`);
    },
};

Object.assign(Bird.prototype, flyer);

const bird = new Bird();
bird.fly(); // Outputs 'Flap flap, I'm flying!'

const penguin = new Penguin();
penguin.fly(); // 'Error: penguin.fly is not a function'
/*
    What this example does is to add the flying functionality (or interface) only to the class(es) that require it. This means that 
    penguins won’t be given the ability to fly, whereas birds will.

    This is one method of adhering to the interface segregation principle, but it is a fairly rough example (as, once again, JavaScript 
    doesn’t play well with interfaces).



    == Dependency Inversion principle ==

    The dependency inversion principle or DIP refers to a specific form of decoupling software modules. When following this principle, 
    the conventional dependency relationships established from high-level, policy-setting modules to low-level, dependency modules are 
    reversed.
    
    The bases of this principle are:

    - High-level modules should not depend on low-level modules. Both should depend on abstractions.
    - Abstractions should not depend on details. Details should depend on abstractions.
    - DIP is about binding classes behind the interfaces consumed by client code.
    - DIP states that classes that implement interfaces are not visible to the client code.

    In general, it indicates decoupling elements by providing their dependencies from the outside, instead of creating them directly, 
    which would create adhesion.

    There are various ways how we can provide an instance with its necessary dependencies, for example:

    - Method injection
    - Constructor injection
    - Property injection

    But, how to implement the DIP in JavaScript?
    Another implementation of Dependency Injection in JavaScript is with ES6 modules, with the ability to use and encapsulate the same 
    code and then import it where we need it.

    In the following example, we have a class called DownloadToConsole. In this class, we have the method: downloadDataFromAPI that 
    downloads data from an external API and then log it in the console.

    If we use the Fetch implementation directly in all our classes, we will have to substitute one implementation for another in all
    classes where we are using it because we’re utilizing directly, but DIP tells us that we should use the interface, no the 
    implementation.

    We can simply import doGet dependency and use it:
*/
import { doGet } from './utils.js'
const url = "https://jsonplaceholder.typicode.com/posts"
class Example { 
    constructor() {
        // ...
    } 
    downloadDataFromAPI(params) {  
        doGet(url)
        .then(r => {
            console.log("Posts:" + r);
        });
    }
}
/*
    In the classes where we import this method, we don’t care how it is implemented internally, allowing you to decouple the 
    download code from your implementation.
*/
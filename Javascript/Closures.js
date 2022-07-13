/*
CLOSURES

    Closure is one of the most important language characteristicsever invented in programming—it 
    underlies major program-ming paradigms, including Functional Programming (FP),modules, and even 
    a bit of class-oriented design.

    Closure is originally a mathematical concept, from lambdacalculus. Closure is a behavior of functions 
    and only functions. If youaren’t dealing with a function, closure does not apply. Anobject cannot have 
    closure, nor does a class have closure(though its functions/methods might). Only functions haveclosure.

    In short terms, Closure is a function that can use or return other function inside. The child function use 
    the properties of the parent function to apply some actions.

    Let’s look at some code:
*/
console.log("\n======START EXAMPLE 1=======");
function lookupStudent(studentID) {
    //++LEXICAL SCOPE
    var students = [
        { id:14, name:"Kyle"},
        { id:73, name:"Suzy"},
        { id:112, name:"Frank"},
        { id:6, name:"Sarah"}
    ];
    return function greetStudent(greeting) {
        //--SCOPE NESTED (inner scope)
        var student = students.find(student => student.id==studentID);
        return `${greeting},${student.name}!`;
        //--
    };
    //++
}

var chosenStudents=[lookupStudent(6),lookupStudent(112)]; // Generate the closure

// ==> Calling the closure:
    // accessing the function's name:
    console.log(chosenStudents[0].name); // greetStudent
    console.log(chosenStudents[0]("Hello")); // Hello, Sarah!
    console.log(chosenStudents[1]("Howdy")); // Howdy, Frank!
// <==
console.log("======END EXAMPLE 1=======\n");
/*
    As you can see, the lexical scope allows to access the variables statically of the outer scopes.

    Let's look another simple example:
*/
console.log("\n======START EXAMPLE 2=======");
 function person(firstName, lastName, age) { // creating the closure
    
     return function() {
         // this inner function is using the args of the outer function to create the closure
         console.log("Hello, my name is " + firstName + " " + lastName + " and I'm " + age + " years old.");
     }
 }
 var presentYourSelf = person("Pedro", "Moriel", 31); // Here we generate the closure
 presentYourSelf(); // Calling the closure
console.log("======END EXAMPLE 2=======\n");
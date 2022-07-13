/*
    ==> FUNCTIONAL PROGRAMING <==

    Functional programming is a programming paradigm designed to handle pure mathematical functions. 
    This paradigm is totally focused on writing more compounded and pure functions.

    JavaScript is a multi-paradigm language, which means that we can easily mix a lot of different paradigms 
    inside a simple piece of JavaScript code. The fact that JavaScript is multi-paradigm and allows us to work 
    with a lot of different ways of programming is what makes this language so beautiful and powerful.

    ==First-Class Objects==

    Functions in JavaScript are first-class objects, also known as “first-class citizens.” This means that we 
    can work with functions in JavaScript the same way as variables.
    Examples:
*/
const sum = (a, b) => a + b;

const resultSum = sum(1, 2);

const sumAgain = (a, b, sum) => sum(a, b);

/*
    Functions in JavaScript are objects—they can have properties and have a link back to their constructor function.
    We can work with functions in JavaScript in a lot of different ways. For example:

    - We can assign them in a variable as a value.
    - We can pass them as arguments to other functions.
    - We can return them as a return value of another function.
    - We can include them in different data structures.

    The way JavaScript handles functions is what makes it possible for us to implement the functional programming 
    paradigm in JavaScript.

    ==Pure Functions==

    One of the most important concepts in the functional programming paradigm is pure functions. Functional programming 
    requires us to write pure and deterministic functions, and this is what makes functional programming so beautiful and useful: 
    it forces us to write better code with pure functions, making our code easier to test and manage.

    Pure functions are functions that, given a specific input, will always return the same output. Pure functions are designed to 
    not cause any side effects—for example, writing to the console, modifying an object, reassigning a variable, etc.
    Example:
*/
const myName = (name) => `Hello ${name}`;

myName("Pedro") // Should always return "Hello Pedro"

/*
    One of the reasons that pure functions are so powerful is that they are way easier to test and debug. Since a pure function should 
    return the same output given specific input value, we can test this function very easily.

    Some functions rely on data other than the arguments that you pass. These are the "impure functions" (functions that mutate or change 
    any sort of data, variable, state outside). Impure functions are also known for returning different values.
    Example:
*/
let count = 0;

const increaseCount = (value) => count += value;

/*
        So in short terms, pure functions are simple and reusable building blocks inside an application. They are completely independent of the outside state, 
        easy to refactor, move around the codebase and adapt in the future.


        ==Higher-Order Functions==

        A powerful concept of functional programming is higher-order functions. They are a great way to abstract out functionality and 
        write better code. 

        A high-order function is a function that receives another function as a parameter or returns a function as a return value. You might be using a lot of 
        high-order functions on a daily basis without knowing it, for example, "map", "filter" and "reduce" methods from JavaScript are higher-order functions.
        Example:
*/
const names = ["Pedro", "Luis", "Hernesto", "José", "Maria", "Juan"];

const sayHiToNames = names.map(name => `Hello ${name}`);
/*
        It’s very easy to identify if a function is in fact a higher-order function: If this function is receiving another function as a parameter 
        (another term for this is “callback”), it is a higher-order function.


        ==Composition==

        Knowing how to compose your functions and how to put them in the right place is a technique that you can improve over time and a 
        concept that’s very important in functional programming.

        Composition can also be expressed as combination—it’s a process of combining multiple functions in a hierarchy to produce a new function or 
        perform a computation.
        Example:
*/
const splitName = (name) => name.split('_').join(' ');

const returnNameCapitalized = (name) => name.toUpperCase();

console.log(returnNameCapitalized(splitName('pedro_moriel')));

/*
        Composition is all about passing inputs from right to left, returning the output of one function as an input to another function.
        Once you understand and start to use it, you will feel that it helped you to write better composed and more readable functions, 
        separating concerns and making your code cleaner.
*/



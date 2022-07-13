/*
    SCOPE

    When you define a variable, you want it to exist within some boundaries. E.g. a result 
    variable makes sense to exist within a calculate() function, as an internal detail. Outside of 
    the calculate(), the result variable is useless.

    The accessibility of variables is managed by scope. You are free to access the variable defined 
    within its scope. But outside of that scope, the variable is inaccessible.

    In JavaScript, a scope is created by a function or a code block.
    Let's see how the scope affects the availability of a variable count. This variable belongs to 
    the scope created by function foo():
*/
function foo() {
    // The function scope
    let count = 0;
    console.log(count); // logs 0
}
foo();
console.log(count); // ReferenceError: count is not defined

/*
    "count" is freely accessed within the scope of foo(). However, outside of the foo() scope, count is 
    inaccessible. If you try to access count from outside anyways, JavaScript throws ReferenceError: "count 
    is not defined."

    So in conclusion, "count" is defined inside a function scope by that we can only have access inside the block
    they resides.

    Now if we want to access the "count" value we can do it like this:
*/
function foo2() {
    // The function scope
    let count = 0;
    return count;
}
let counter = foo2();
console.log(counter); // Now we can see the value of "count" using a closure

/*
    SCOPES NESTING

    Let's play a bit more with scopes, and nest one scope into another. For example, the function innerFunc() is 
    nested inside an outer function outerFunc().
    How would the 2 function scopes interact with each other? Can I access the variable outerVar of outerFunc() 
    from within innerFunc() scope?

    Let's try that in the example:
*/
function outerFunc() {
    // the outer scope
    let outerVar = 'I am outside!';
    function innerFunc() {
      // the inner scope
      console.log(outerVar); // => logs "I am outside!"
    }
    innerFunc();
}
outerFunc();
/*
    Indeed, outerVar variable is accessible inside innerFunc() scope. The variables of the outer scope are accessible 
    inside the inner scope.

    Now we have learned 2 important things:
     -> Scopes can be nested.
     -> The variables of the outer scope are accessible inside the inner scope.


    LEXICAL SCOPE

    How does JavaScript understand that outerVar inside innerFunc() corresponds to the variable outerVar of outerFunc()?

    JavaScript implements a scoping mechanism named lexical scoping (or static scoping). Lexical scoping means that the 
    accessibility of variables is determined by the position of the variables inside the nested scopes.

    Simpler, the lexical scoping means that inside the inner scope you can access variables of outer scopes. It's called 
    lexical (or static) because the engine determines (at lexing time) the nesting of scopes just by looking at the 
    JavaScript source code, without executing it.

    In short terms, "lexical scope consists of outer scopes determined statically".
    EXAMPLE:
*/
const myGlobal = 0;
function func() {
  const myVar = 1;
  console.log(myGlobal); // logs "0"
  function innerOfFunc() {
    const myInnerVar = 2;
    console.log(myVar, myGlobal); // logs "1 0"
    function innerOfInnerOfFunc() {
      console.log(myInnerVar, myVar, myGlobal); // logs "2 1 0"
    }
    innerOfInnerOfFunc();
  }
  innerOfFunc();
}
func();
/*
    The lexical scope of innerOfInnerOfFunc() consits of scopes of innerOfFunc(), func() and global scope (the outermost scope). 
    Within innerOfInnerOfFunc() you can access the lexical scope variables myInnerVar, myVar and myGlobal.

    The lexical scope of innerFunc() consists of func() and global scope. Within innerOfFunc() you can access the lexical scope 
    variables myVar and myGlobal.

    Finally, the lexical scope of func() consists of only the global scope. Within func() you can access the lexical scope variable 
    myGlobal.


    ==var vs let==
    Why did we use var instead of let to declare the buckets variable? There’s both semantic and technical reasons to choose var here.
    Stylistically, var has always, from the earliest days of JS, signaled “variable that belongs to a whole function.” As we saw in 
    "Lexical Scopes", var attaches to the nearest enclosing function scope, no matter where it appears. That’s true even if var appears 
    inside a block:
*/
function diff(x, y) {
    if (x > y) {
        var tmp = x;// `tmp` is function-scoped
        x = y;
        y = tmp;
    }
    return y-x;
}
/*
    Even thoughvaris inside a block, its declaration is function-scoped (to diff(..)), not block-scoped.
    While you can declare var inside a block (and still have it be function-scoped), I would recommend against this approach except in a few 
    specific cases. Otherwise, var should be reserved for use in the top-level scope of a function.

    Why not just use let in that same location? Because var is visually distinct from let and therefore signals clearly, “this variable is function-scoped.” 
    Using let in the top-level scope, specially if not in the first few lines of a function, and when all the other declarations in blocks use let, 
    does not visually draw attention to the difference with the function-scoped declaration.

    In other words, I feel var better communicates function-scoped than let does, and let both communicates (and achieves!) block-scoping 
    where var is insufficient.
*/

// NOTE: FOR TESTING PROPOUSES IF YOU WANT TO RUN THE FILE JUST NEED TO COMENT THE LINE 21 THAT WILL RUN IN A KNOWN REFERENCE ERROR!!
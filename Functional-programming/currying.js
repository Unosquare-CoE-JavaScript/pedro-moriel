/*
    Currying is an advanced technique of working with functions. It’s used not only in JavaScript, but in other languages as well. 
    Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c). 
    Currying doesn’t call a function. It just transforms it. Let’s see an example first, to better understand what we’re talking 
    about, and then practical applications. 
    We will create a helper function curry(f) that performs currying for a two-argument f. In other words, curry(f) for 
    two-argument f(a, b) translates it into a function that runs as f(a)(b):
*/
function curry(f) { // curry(f) does the currying transform
    return function(a) {
      return function(b) {
        return f(a, b);
      };
    };
  }
  // usage
  function sum(a, b) {
    return a + b;
  }
  
  let curriedSum = curry(sum);
  
  console.log(curriedSum(1)(2)); // 3
  /*
    As you can see, the implementation is straightforward: it’s just two wrappers.
    - The result of curry(func) is a wrapper function(a).
    - When it is called like curriedSum(1), the argument is saved in the Lexical Environment, and a new wrapper is returned function(b).
    - Then this wrapper is called with 2 as an argument, and it passes the call to the original sum.
  */

  /*
    Let's see another example of Non-curried and curried functions:
  */
    //Noncurried
    const add = (a, b, c)=>{
        return a+ b + c
    }
    console.log(add(2, 3, 5)) // 10
    
    //Curried
    const addCurry =(a) => {
        return (b)=>{
            return (c)=>{
                return a+b+c
            }
        }
    }
 /*
    In summary, currying is a transform that makes f(a,b,c) callable as f(a)(b)(c). JavaScript implementations usually both keep the 
    function callable normally and return the partial if the arguments count is not enough. 
    Currying allows us to easily get partials. As we’ve seen in the logging example, after currying the three argument universal 
    function log(date, importance, message) gives us partials when called with one argument (like log(date)) or two arguments 
    (like log(date, importance)).
 */
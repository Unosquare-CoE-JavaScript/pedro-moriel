/*
    ==> FUNCTORS <==

    In mathematics, a functor is a map between categories. A category is just a collection of objects and arrows between 
    objects like below. Category C has the objects x,y and an arrow f from x to y.

    The Array is a Functor together with the map method. The map is the method that maps or as we say lift a function f from 
    the initial category. But we can look at the simplest Functor:
*/
[1, 2, 3].map(x => x * 2) //=> [2, 4, 6]

/*
    If you used before an array map functionality, you have used functors.

    Another example of Functors:
*/
const Functor = (v) => ({
    value: v,
    map: (f) => Functor(f(v))
  });
  
  var s =  Functor(2).map(x=>x*x).map(x=>x.toString());
  console.log(s.value);

  /*
    ==> MONADS <==

    Monad is a design pattern used to describe computations as a series of steps. They are extensively used in 
    pure functional programming languages to manage side effects but can also be used in multiparadigm languages 
    to control complexity.

    Monads wrap types giving them additional behavior like the automatic propagation of empty value (Maybe monad) 
    or simplifying asynchronous code.

    To be considered a monad the structure has to provide three components:

    * type constructor — a feature that creates a monadic type for the underlying type. For example it defines the 
      type Maybe<number> for the underlying type number.

    * the unit function that wraps a value of underlying type into a monad. For the Maybe monad it wraps value 2 of 
      the type number into the value Maybe(2) of the type Maybe<number>.
      
    * the bind function that chains the operations on a monadic values.

    ==> A monad is a way of composing functions that require context in addition to the return value, such as computation, branching, 
    or I/O. Monads type lift, flatten and map so that the types line up for lifting functions a => M(b), making them composable. 
    It's a mapping from some type a to some type b along with some computational context, hidden in the implementation details of 
    lift, flatten, and map:

    - Functions map: a => b
    - Functors map with context: Functor(a) => Functor(b)
    - Monads flatten and map with context: Monad(Monad(a)) => Monad(b)

    Monads are needed because lots of functions aren’t simple mappings from a => b. Some functions need to deal with side effects 
    (promises, streams), handle branching (Maybe), deal with exceptions (Either), etc...

    ==What Monads are Made of==
    A monad is based on a simple symmetry — A way to wrap a value into a context, and a way to unwrap the value from the context:

    - Lift/Unit: A type lift from some type into the monad context: a => M(a)
    - Flatten/Join: Unwrapping the type from the context: M(a) => a

    And since monads are also functors, they can also map:
    - Map: Map with context preserved: M(a) -> M(b)


    ==The monad laws==

    Before you can start building your own monads, you need to know there are three laws that all monads should satisfy:

    - Left identity: unit(x).chain(f) ==== f(x)
    - Right identity: m.chain(unit) ==== m
    - Associativity: m.chain(f).chain(g) ==== m.chain(x => f(x).chain(g))
  */

    // Identity monad
  const Id = value => ({
    // Functor mapping
    // Preserve the wrapping for .map() by 
    // passing the mapped value into the type
    // lift:
    map: f => Id.of(f(value)),    // Monad chaining
    // Discard one level of wrapping
    // by omitting the .of() type lift:
    chain: f => f(value),    // Just a convenient way to inspect
    // the values:
    toString: () => `Id(${ value })`
  });  // The type lift for this monad is just
  // a reference to the factory.
  Id.of = Id;  const g = n => Id(n + 1);
  const f = n => Id(n * 2);  // Left identity
  // unit(x).chain(f) ==== f(x)
  trace('Id monad left identity')([
    Id(x).chain(f),
    f(x)
  ]);
  // Id monad left identity: Id(40), Id(40)
  // Right identity
  // m.chain(unit) ==== m
  trace('Id monad right identity')([
    Id(x).chain(Id.of),
    Id(x)
  ]);
  // Id monad right identity: Id(20), Id(20)  // Associativity
  // m.chain(f).chain(g) ====
  // m.chain(x => f(x).chain(g)  
  trace('Id monad associativity')([
    Id(x).chain(g).chain(f),
    Id(x).chain(x => g(x).chain(f))
  ]);
  // Id monad associativity: Id(42), Id(42)
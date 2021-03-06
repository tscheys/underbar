(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * in implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    //NOTES: Ternary operator: if n is undefined just return first element else use slice for n elements
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    //NOTES: reverse array so we can use _.first to get the last elements. Then reverse again to put them back in the proper order
    var copy = array.reverse();
    return n === undefined ? _.first(copy) : _.first(copy,n).reverse();
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      for(var i = 0; i < collection.length; ++i) {
        iterator(collection[i], i , collection);
      }
    }
    else if({}.toString.call(collection) === "[object Object]") {
      for(var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = [];
    _.each(collection, function(value) {
      if(test(value)) {
        filtered.push(value);
      }
    });
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var rejected = collection.slice(0);
    var filtered = _.filter(collection, test);

    _.each(filtered, function (value) {
      rejected.splice(_.indexOf(rejected, value), 1);
    });

    return rejected;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    var uniq = [];

    _.each(array, function (value) {
      if(_.indexOf(uniq, value) === - 1) {
        uniq.push(value);
      }
    });
    return uniq;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];
    _.each(collection, function (value) {
      mapped.push(iterator(value));
    });
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the  , and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var current = (accumulator !== undefined) ? accumulator : collection.shift();

    _.each(collection, function (value) {
        current = iterator(current, value);
    });
    return current;
  };  

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!

    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(collection, function (current, value) {
      var test = (iterator !== undefined) ? !!iterator(value) : value;

      return (test && current) ? true : false;
    }, true);
    // TIP: Try re-using   reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) { //Needs refactoring. Does not use every
    return _.reduce(collection, function (current, value) {
      var test = (iterator !== undefined) ? !!iterator(value) : value;
      return (test || current) ? true : false;

    }, false);

    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
   var args = Array.prototype.slice.call(arguments);

    _.each(args, function (object) {
      _.each(object, function (val, key) {
        obj[key] = val;
      });
      
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments).slice(1);
        _.each(args, function (object) {
          _.each(object, function (value, key) {
            if(_.identity(obj[key]) === undefined) {
            obj[key] = value;
          }
          
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

var computed = [];

return function () {
  var result;
  var argument = Array.prototype.slice.call(arguments)[0];

  _.each(computed, function(value) {
    if(value.arg === argument) {result = value.sol;}
  });

  if(result !== undefined) {return result;}
  else {
  result = func.apply(this,arguments);
  computed.push({arg: argument , sol: result});
  return result;
}
}
};

/* var memoAdd = _.memoize(function(a,b) {} */

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    var functionArgs = args.slice(2);

    setTimeout(function () {
      return func.apply(this,functionArgs);}
    ,wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copy = array.slice(0);
    var shuffled = [];
    function randomize (originalIndex) { 
      //This function was created to ensure shuffled array is not exactly equal to input array
      //It uses recursion until we get an index different from the original index
      var randomIndex = Math.floor(Math.random()*(copy.length));
      return (randomIndex === originalIndex) ? randomize(originalIndex) : randomIndex; 
    }

    for(var i = 0; i < array.length; i++) {
      var s = randomize(i);
      shuffled[i] = copy[s];
      copy.splice(s,1);
    }
    
    return shuffled;
  };


  /*
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var result = [];

    _.each(collection, function (value) {
      result.push(functionOrKey.apply(this, value));

    });

    return result;
      
         
      
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if(typeof iterator === 'string') {
      return collection.sort(function(a, b) {
      if(a[iterator] > b[iterator]) {
        return 1;
      }
      if(a[iterator] < b[iterator]) {
        return -1;
      }
      return 0;

      });
    }
    else {
      return collection.sort(function(a, b) {
        if(iterator(a) > iterator(b)) {
          return 1;
        }
        if(iterator(a) < iterator(b)) {
          return -1;
        }
        return 0;
      });
    }

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipped = [];
    var arrays = Array.prototype.slice.call(arguments);
    var biggestArray = _.reduce(arrays, function (current, value) {
      return value.length > current.length ? value : current; 
    }, []);

    _.each(biggestArray, function (value, index) {
      var zip = [];
      _.each(arrays, function (value) {
        zip.push(value[index]);
      });
      zipped.push(zip);

    });

    return zipped;

    };


  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  result = (typeof result === 'undefined') ? [] : result;
  
  _.each(nestedArray, function (value) {
    (Array.isArray(value)) ? _.flatten(value, result) : result.push(value);
  });

  return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {


    var others = Array.prototype.slice.call(arguments, 1);
    var first = arguments[0];
    var intersected = [];
       
    _.each(first, function (value) {

      var isEverywhere =  _.reduce(others, function (current, array) {

        return _.contains(array, value) && current;

      }, true);

      if(isEverywhere) {intersected.push(value);}
    });

    return intersected;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    //Try to get this working with intersection
    var difference = [];
    var others = _.flatten(Array.prototype.slice.call(arguments, 1));

    _.each(array, function (value) {
      if(!_.contains(others, value)) {
        difference.push(value);
      }
    });
    return difference;

  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

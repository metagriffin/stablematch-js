stablematch
===========

A pure javascript implementation of a Stable Matching Algorithm, which
is used to provide a solution to the stable marriage problem
(http://wikipedia.org/wiki/Stable_marriage_problem) using a
left-optimized algorithm.

The core implementation was shamelessly scrubbed and adapted from the
"toy" implementation by Paul Butler
(https://github.com/paulgb/Python-Gale-Shapley/), adapted to
javascript and improved to support asymmetric data sets.

Installation
============

This is the easy part, provided you have ``npm`` installed:

    npm install stablematch

Usage
=====

Here is an example of how to pair up two six-element sets. Note the
use of [amdefine](https://npmjs.org/package/amdefine), which allows
``stablematch`` to be used in any javascript-enabled context.

``` js
if ( typeof(define) !== 'function' )
  var define = require('amdefine')(module);

define(['stablematch'], function(sma) {

  // setup two sets that will be paired
  var setA = ['1','2','3','4','5','6'];
  var setB = ['a','b','c','d','e','f'];

  // callback function `rankA` returns the preference order
  // of `setB` given any element in `setA`.
  var rankA = function(a) {
    switch ( a )
    {
      case '1': return ['a', 'd', 'b', 'f', 'e', 'c'];
      case '2': return ['c', 'a', 'b', 'd', 'e', 'f'];
      case '3': return ['a', 'b', 'd', 'c', 'e', 'f'];
      case '4': return ['d', 'a', 'b', 'e', 'c', 'f'];
      case '5': return ['a', 'b', 'c', 'f', 'd', 'e'];
      case '6': return ['b', 'a', 'd', 'c', 'e', 'f'];
      default:  throw 'no such element "' + a + '" in set A';
    }
  };

  // callback function `rankB` returns the preference order
  // of `setA` given any element in `setB`.
  var rankB = function(b) {
    switch ( b )
    {
      case 'a': return ['1', '2', '3', '4', '5', '6'];
      case 'b': return ['2', '1', '4', '3', '5', '6'];
      case 'c': return ['5', '1', '6', '3', '2', '4'];
      case 'd': return ['1', '3', '2', '5', '4', '6'];
      case 'e': return ['4', '1', '3', '6', '2', '5'];
      case 'f': return ['2', '1', '4', '3', '6', '5'];
      default:  throw 'no such element "' + b + '" in set B';
    }
  };

  // call stablematch.match() to pair all of the elements.
  var solution = sma.match(setA, setB, rankA, rankB);

  // solution ::=
  //   [
  //     ['1', 'a'], ['2', 'b'], ['3', 'd'],
  //     ['4', 'e'], ['5', 'c'], ['6', 'f']
  //   ]

});
```

Performance and Optimality
==========================

The implementation is not intended to be the world's best... It was,
after all, a quick-n-dirty implementation done one Saturday morning
just so that a basic pairing could be done inside the
[syncml-js](https://npmjs.org/package/syncml-js) package...

If you care to improve it in any way, please do so! I'll accept any
pull requests that don't break it and improve performance.

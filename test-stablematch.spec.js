// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: unit test for the stablematch javascript module
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2012/12/29
// copy: (C) CopyLoose 2012 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

// for node compatibility...
if ( typeof(define) !== 'function' )
  var define = require('amdefine')(module);

define(['underscore', './stablematch'], function(_, sma) {

  //---------------------------------------------------------------------------
  describe('stablematch', function() {

    //-------------------------------------------------------------------------
    it('pairs two sets of symmetric length', function() {
      var setA = ['1','2','3','4','5','6'];
      var setB = ['a','b','c','d','e','f'];
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
      // todo: check into why this is:
      // note: interestingly, the python implementation comes to
      //       a different stable solution than the javascript version...
      //       despite being (i thought) the same algorithm!...
      // python solution (according to paul):
      // var chk = [ ['1', 'a'], ['2', 'b'], ['3', 'd'], ['4', 'f'], ['5', 'c'], ['6', 'e'] ];
      // javascript solution (also stable):
      var chk = [ ['1', 'a'], ['2', 'b'], ['3', 'd'], ['4', 'e'], ['5', 'c'], ['6', 'f'] ];
      expect(sma.match(setA, setB, rankA, rankB)).toEqual(chk);
    });

  });

});

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------

// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: unit test for the stablematch javascript module
// auth: metagriffin <metagriffin@uberdev.org>
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
          case '1': return [1, 4, 2, 6, 5, 3];
          case '2': return [3, 1, 2, 4, 5, 6];
          case '3': return [1, 2, 4, 3, 5, 6];
          case '4': return [4, 1, 2, 5, 3, 6];
          case '5': return [1, 2, 3, 6, 4, 5];
          case '6': return [2, 1, 4, 3, 5, 6];
          default:  throw 'no such element "' + a + '" in set A';
        }
      };
      var rankB = function(b) {
        switch ( b )
        {
          case 'a': return [1, 2, 3, 4, 5, 6];
          case 'b': return [2, 1, 4, 3, 5, 6];
          case 'c': return [5, 1, 6, 3, 2, 4];
          case 'd': return [1, 3, 2, 5, 4, 6];
          case 'e': return [4, 1, 3, 6, 2, 5];
          case 'f': return [2, 1, 4, 3, 6, 5];
          default:  throw 'no such element "' + b + '" in set B';
        }
      };
      var chk = [['1', 'a'], ['2', 'b'], ['3', 'd'], ['4', 'f'], ['5', 'c'], ['6', 'e']];
      expect(sma.match(setA, setB, rankA, rankB)).toEqual(chk);
    });

  });

});

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------

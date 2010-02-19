;(function(global) {

  var warn = (typeof console !== 'undefined' && typeof console.warn === 'function') ?
    console.warn :
    (typeof print === 'function') ?
      function(warning){ print.call(this, 'WARN '+warning); } :
      function(){};
  
  function warnUnexpected(property){
    warn('Unexpected global: "'+property+'"');
  }
  
  function warnExpected(property){
    warn('Expected "'+property+'" to be defined');
  }

  function getGlobalProperties(){
    var properties = [];
    for (var p in global) properties.push(p);
    return properties;
  }

  insureAdditionalGlobals = function(expected, func){
    if (typeof expected === "function"){
      func = expected;
      expected = [];
    }
    if (!func) throw new Error('function expected');

    var difference, after, before = getGlobalProperties();
    func.apply(global);
    after = getGlobalProperties();

    for (var i=0; i < expected.length; i++)
      if (!(expected[i] in global)) warnExpected(expected[i]);

    for (var i=0; i < after.length; i++)
      if (before.indexOf(after[i]) === -1 && expected.indexOf(after[i]) === -1)
        warnUnexpected(after[i]);
  };

  expectGlobals = function(){
    var expected = Array.prototype.slice.apply(arguments),
        after    = getGlobalProperties();

    for (var i=0; i < after.length; i++)
      if (INITAL_GLOBAL_PROPERTIES.indexOf(after[i]) === -1 && expected.indexOf(after[i]) === -1)
        warnUnexpected(after[i]);
    
    for (var i=0; i < expected.length; i++)
      if (!(expected[i] in global)) warnExpected(expected[i]);

  };

  var INITAL_GLOBAL_PROPERTIES = getGlobalProperties();

})(this);

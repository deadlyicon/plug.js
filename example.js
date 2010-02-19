// Just pass an array of your expected global definitions and a function to
// insureAdditionalGlobals and it will throw warnings for any unplanned 
// global definitions
insureAdditionalGlobals(['MyThing'], function(){

  things = [];

  MyThing = function(){
    things.push(this);
  };


});

//-> WARN: Unexpected Global: "things"

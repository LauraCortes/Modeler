module.exports= function(){
  var angular =require('angular');
  var app = angular.module('modeler',[]);

  app.controller('PropController',function(){
    this.tab=1;
    this.selectTab= function(tab){
      this.tab=tab;
    };
    this.isSelected = function(tab){
      return this.tab===tab;
    }
  });
}

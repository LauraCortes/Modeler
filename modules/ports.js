module.exports= function(element){
  var joint = require('jointjs');
  var $ = require('jquery');
  var lodash = require('lodash');
  var backbone = require('backbone');

  var inMoney ={
        id: 'inM',
        position: 'bottom',
        attrs: { circle: { fill:"none", stroke:"#2EFE2E", 'stroke-width':"3" } }
  };
  var outMoney={
        id: 'outM',
        position: 'bottom',
        attrs: { circle: { fill:"#2EFE2E", stroke:"#2EFE2E"} }
  };
  $('#inM').change(function() {
    if(this.checked) {
        element.model.addPort(inMoney);
    }
    else{
      element.model.removePort(inMoney);
    }
  });

  $('#outM').change(function() {
    if(this.checked) {
        element.model.addPort(outMoney);
    }
    else{
      element.model.removePort(outMoney);
    }
  });

 var inValue={
        id: 'inV',
        position: 'top',
        attrs: { circle: { fill:"none", stroke:"#FE2E64", 'stroke-width':"3" } }
  };
  var outValue={
        id: 'outV',
        position: 'top',
        attrs: { circle: { fill:"#FE2E64", stroke:"#FE2E64"} }
  };
  $('#inV').change(function() {
    if(this.checked) {
        element.model.addPort(inValue);
    }
    else{
      element.model.removePort(inValue);
    }
  });

  $('#outV').change(function() {
    if(this.checked) {
        element.model.addPort(outValue);
    }
    else{
      element.model.removePort(outValue);
    }
  });

  var inMean={
        id: 'inE',
        attrs: { circle: { fill:"none", stroke:"#9A2EFE", 'stroke-width':"3" } }
  };
  var outMean={
        id: 'outE',
        attrs: { circle: { fill:"#9A2EFE", stroke:"#9A2EFE"} }
  }
  $('#inE').change(function() {
    if(this.checked) {
        element.model.addPort(inMean);
    }
    else{
      element.model.removePort(inMean);
    }
  });

  $('#outE').change(function() {
    if(this.checked) {
        element.model.addPort(outMean);
    }
    else{
      element.model.removePort(outMean);
    }
  });
};

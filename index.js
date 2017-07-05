var joint = require('jointjs');
var $ = require('jquery');
var lodash = require('lodash');
var backbone = require('backbone');
var panel= require('./modules/editPanel.js');
var properties = require('./modules/properties.js');
var ports=require('./modules/ports.js');

properties();
active = function(cellView){
  cellView.highlight(null, {
    highlighter: {
        name: 'stroke',
        options: {
          padding: 10,
          rx: 5,
          ry: 5,
          attrs: {
            'stroke-width': 1,
            stroke: '#FFFF00'
          }
        }
    }
  });
};

var unactive = function(cellView){
  cellView.unhighlight(null, {
    highlighter: {
        name: 'stroke',
        options: {
          padding: 10,
          rx: 5,
          ry: 5,
          attrs: {
            'stroke-width': 1,
            stroke: '#FFFF00'
          }
        }
    }
  });
};

var requiredElements = new joint.dia.Graph;
var paperEdit= new joint.dia.Paper({
  el: $('#panel'),
  height: $( window ).height(),
  width: $('#panel').width(),
  padding:0,
  model: requiredElements,
  restrictTranslate: true,
  interactive: false
});
panel(requiredElements);

paperEdit.drawBackground({color:"#EFF8FB"});
var cellHighlight;
var elementAdd;
paperEdit.on('cell:pointerclick', function(cellView,evt, x, y) {
    if(cellHighlight){
      unactive(cellHighlight);
    }
    if(cellHighlight!=cellView){
      cellHighlight=cellView;
      elementAdd=cellView.model.clone();
      active(cellView);
    }
    else {
      cellHighlight=null;
      elementAdd=null;
    }
});

var graph = new joint.dia.Graph;
var paper= new joint.dia.Paper({
  el: $('#myHolder'),
  height: $( window ).height(),
  width: $('#myHolder').width(),
  padding:0,
  model: graph,
  restrictTranslate: true,
  embeddingMode: true
});
paper.on('blank:pointerclick',function(evt,x,y){
  if(elementAdd){
    var obj = elementAdd.clone();
    if(obj.isElement()){
      obj.position(x,y);
      graph.addCell(obj);
      obj.toFront();
      obj.on('change:embeds',function(){obj.fitEmbeds({padding:10});});
    }
  }
});

var propElement;
paper.on('cell:pointerclick',function(cellView,evt,x,y){
  if(elementAdd){
    if(elementAdd.isLink()){
      if(!elementAdd.get('source').id){
        elementAdd.set('source',{id:cellView.model.id});
      }
      else{
        var finalLink=elementAdd.clone();
        finalLink.set('target',{id:cellView.model.id});
        graph.addCell(finalLink);
        elementAdd.disconnect();
        finalLink.toFront();
      }
    }
  }
  else{
    if(propElement){
      unactive(propElement);
      $("#tabProperties tbody").empty();
    }
    if(propElement!=cellView){
      var newRowContent ="<tr><td>Value</td><td><input type='checkbox' id='inV'></td><td><input type='checkbox' id='outV'></td></tr>"+
      "<tr><td>Money</td><td><input type='checkbox' id='inM'></td><td><input type='checkbox' id='outM'></td></tr>"+
      "<tr><td>Mean</td><td><input type='checkbox' id='inE'></td><td><input type='checkbox' id='outE'></td></tr>";
      $("#tabProperties tbody").append(newRowContent);
      ports(cellView);
      active(cellView);
      propElement=cellView;
    }
    else {
        $("#tabProperties tbody").empty();
        propElement=null;
    }
  }
});

var addP = function(port, element){
  element.model.addPort(port);
};

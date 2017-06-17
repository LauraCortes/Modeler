var joint = require('jointjs');
var $ = require('jquery');
var lodash = require('lodash');
var backbone = require('backbone');

var panel= require('./modules/editPanel.js');

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
      cellHighlight.unhighlight(null, {
          highlighter: {
              name: 'stroke',
              options: {
                padding: 10,
                rx: 5,
                ry: 5,
                attrs: {
                  'stroke-width': 3,
                  stroke: '#FFFF00'
                }
              }
            }
          });
    }
    if(cellHighlight!=cellView){
    cellHighlight=cellView;
    elementAdd=cellView.model.clone();
      cellView.highlight(null, {
          highlighter: {
              name: 'stroke',
              options: {
                padding: 10,
                rx: 5,
                ry: 5,
                attrs: {
                  'stroke-width': 3,
                  stroke: '#FFFF00'
                }
              }
            }
          });
      }
    else {
      cellHighlight=null;
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
  var obj = elementAdd.clone();
  if(obj.isElement()){
    obj.position(x,y);
    graph.addCell(obj);
    obj.toFront();
    obj.on('change:embeds',function(){obj.fitEmbeds({padding:10});});
  }
});
paper.on('cell:pointerclick',function(cellView,evt,x,y){
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
});

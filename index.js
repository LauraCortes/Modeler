var joint = require('jointjs');
var $ = require('jquery');
var lodash = require('lodash');
var backbone = require('backbone');
var panel= require('./modules/editPanel.js');
var properties = require('./modules/properties.js');
var props= require('./modules/props.js')

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
var json=$('#json');
var data= "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(graph.toJSON()));
json.attr("href","data:" + data );
json.attr("download", "data.json");
var paper= new joint.dia.Paper({
  el: $('#myHolder'),
  height: $( window ).height(),
  width: $('#myHolder').width(),
  padding:0,
  model: graph,
  restrictTranslate:true,
  embeddingMode: true
});

$('#svg').click(function(){
  var svg = document.querySelector("svg");
  var serializer = new XMLSerializer();
  var string = serializer.serializeToString(svg);
  console.log(string);
  string = '<?xml version="1.0" standalone="no"?>\r\n' +string;
  var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(string);
  $('#svg').attr("href","data:" +url);
  $('#svg').attr("download", "data.svg");
});

paper.on('blank:pointerclick',function(evt,x,y){
  if(elementAdd){
    var obj = elementAdd.clone();
    if(obj.isElement()){
      obj.position(x,y);
      graph.addCell(obj);
      data= "text/json;charset=utf-8," +encodeURIComponent(JSON.stringify(graph.toJSON()));
      json.attr("href","data:" + data );
      obj.toFront();
    }
  }
});

var propElement;

var select = function(cellView){
  if(propElement){
    unactive(propElement);
    $("#tabAttributes #table tbody").empty();
    $("#tabAttributes #addButton").empty();
    $("#tabProperties #width").empty();
    $("#tabProperties #height").empty();
  }
  if(propElement!=cellView){
    props(cellView);
    active(cellView);
    propElement=cellView;
  }
  else {
      propElement=null;
  }
}
paper.on('cell:pointerclick',function(cellView,evt,x,y){
  if(elementAdd){
    if(elementAdd.isLink()){
      console.log(elementAdd.attributes.name);
      if(!elementAdd.get('source').id){
        elementAdd.set('source',{id:cellView.model.id});
      }
      else{
        var finalLink=elementAdd.clone();
        finalLink.set('target',{id:cellView.model.id});
        graph.addCell(finalLink);
        data= "text/json;charset=utf-8," +encodeURIComponent(JSON.stringify(graph.toJSON()));
        json.attr("href","data:" + data );
        elementAdd.disconnect();
        finalLink.toFront();

      }
    }
    else {
      select(cellView);
    }
  }
  else{
    select(cellView);
  }
});

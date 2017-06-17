module.exports= function(graph){
  var joint = require('jointjs');
  var $ = require('jquery');
  var lodash = require('lodash');
  var backbone = require('backbone');

  var zones= ['Supply','Transform', 'Monetize', 'Delivery'];

  var width = (3*$(window).width())/4,
  height=($(window).height());
  var size = width/zones.length;
  for(zone in zones){
    var circle = new joint.shapes.basic.Circle({
            position: { x: (width/4)*zone, y: (height-size)/2 },
            size: { width: size, height: size },
            attrs: { circle: { fill: 'none', stroke:'#A4A4A4' },
                    text: { text:zones[zone], 'ref-y': size, ref: 'circle', 'y-alignment': 'after-edge', 'x-alignment': 'middle'}}
    }).addTo(graph);
    console.log(circle);
  }
};

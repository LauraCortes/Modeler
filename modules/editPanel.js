module.exports= function(graph){
  var joint = require('jointjs');
  var $ = require('jquery');
  var lodash = require('lodash');
  var backbone = require('backbone');

  var size = $('#panel').width()/2,
      margin ={top:5, bottom:5, left:5, right:5};
//Elementos básicos
  var circle = new joint.shapes.basic.Circle({
          position: { x: size/2, y:margin.top+size/2 },
          size: { width: size-margin.right-margin.left, height: size-margin.top-margin.bottom},
          attrs: { circle: { fill: '#F2F2F2', stroke:'#BDBDBD' }}
  }).addTo(graph);
  var rectangle = new joint.shapes.basic.Rect({
          position: { x: size/2, y:2*margin.top+3*size/2 },
          size: { width: size-margin.right-margin.left, height: size-2*(margin.top+margin.bottom)},
          attrs: { rect: { fill: '#F2F2F2', stroke:'#BDBDBD' }}
  }).addTo(graph);
//Relaciones
  var moneyLink= new joint.dia.Link({
        source:{x:margin.left,y:3*size+margin.top},
        target:{x:2*size-margin.right,y:3*size+margin.top},
        markup: [
            '<path class="connection" stroke="#2EFE2E" d="M 0 0 0 0"/>',
             '<path class="marker-target" fill="#2EFE2E" stroke="#2EFE2E" d="M 10 0 L 0 5 L 10 10 z"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="marker-vertices"/>'
        ].join(''),
    }).addTo(graph);

  var valueLink= new joint.dia.Link({
        source:{x:margin.left,y:3*size+2*(margin.top+margin.bottom)},
        target:{x:2*size-margin.right,y:3*size+2*(margin.top+margin.bottom)},
        markup: [
            '<path class="connection" stroke="#FE2E64" d="M 0 0 0 0"/>',
            '<path class="marker-target" fill="#FE2E64" stroke="#FE2E64" d="M 10 0 L 0 5 L 10 10 z"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="marker-vertices"/>'
        ].join(''),
  }).addTo(graph);

  var meanLink= new joint.dia.Link({
        source:{x:margin.left,y:3*size+4*(margin.top+margin.bottom)},
        target:{x:2*size-margin.right,y:3*size+4*(margin.top+margin.bottom)},
        markup: [
            '<path class="connection" stroke="#9A2EFE" d="M 0 0 0 0"/>',
            '<path class="marker-target" fill="#9A2EFE" stroke="#9A2EFE" d="M 10 0 L 0 5 L 10 10 z"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="marker-vertices"/>'
        ].join(''),
  }).addTo(graph);

//Zona
  var circle = new joint.shapes.basic.Circle({
          position: { x: margin.left, y:4*size+margin.top},
          size: { width: 2*size-margin.left-margin.right, height: 2*size-margin.top-margin.bottom},
          attrs: { circle: { fill: '#F2F2F2', stroke:'#151515' }}
  }).addTo(graph);
};

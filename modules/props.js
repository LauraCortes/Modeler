module.exports= function(cellView){
var $ = require('jquery');
var joint = require('jointjs');

  var getName = function(cellView){
    if (cellView.model.attributes.name) {
      return cellView.model.attributes.name;
    }
    else {
      return "";
    }
  };
  var attributes =function(type, func){
    if(type=='val'){
      if(func=='in'){
        return {circle:{stroke:"#FE2E64"}};
      }
      else{
        return {circle:{stroke:"#FE2E64", fill:"#FE2E64"}};
      }
    }
    if(type=='mon'){
      if(func=='in'){
        return {circle:{stroke:"#2EFE2E"}};
      }
      else{
        return {circle:{stroke:"#2EFE2E", fill:"#2EFE2E"}};
      }
    }
    else{
      if(func=='in'){
        return {circle:{stroke:"#9A2EFE"}};
      }
      else{
        return {circle:{stroke:"#9A2EFE", fill:"#9A2EFE"}};
      }
    }
  };
  var nPort=0;
  $("#tabAttributes #addButton").append(
    "<button type='button' class='btn btn-default btn-sm' id='addAttribute'>"+
    "<span class='glyphicon glyphicon-plus'></span>"+
    "</button>"
  );
  $("#tabPorts #addPort").append(
    "<button type='button' class='btn btn-default btn-sm' id='btnPort'>"+
    "<span class='glyphicon glyphicon-plus'></span>"+
    "</button>"
  );
  $("#tabAttributes #table tbody").append("<tr><td>Name</td><td><input type='text' value='"+getName(cellView)+"' id='name' name='usrname'></td></tr>");
  if(cellView.model.attributes.type==='p'){
    $("#tabAttributes #table tbody").append("<tr><td>Multiple</td><td><input type='checkbox' id='multiple' name='multiple' "+cellView.model.attributes.multiple+"></td></tr>");
  }
  $("#tabProperties #width").append(
    "<label for='w'>Width</label>"+
    "<input id='w' class='form-control' type='range' value='"+cellView.model.attributes.size.width+"' min='10' max='"+$('#myHolder').width()+"' oninput='wV.value=w.value' >"
    +"<output for='w' id='wV' style='display:inline'>"+cellView.model.attributes.size.width+"</output>"
  );
  $("#tabProperties #height").append(
    "<label for='h'>Height</label>"+
    "<input id='h' class='form-control' type='range' value='"+cellView.model.attributes.size.height+"' min='10' max='"+$('#myHolder').height()+"' oninput='hV.value=h.value'>"
    +"<output for='h' id='hV' style='display:inline'>"+cellView.model.attributes.size.height+"</output>"
  );
  var $w = $('#w');
  $w.on('input change', function() {
    cellView.model.resize(parseInt($w.val(), 10),cellView.model.attributes.size.height);
  });
  var $h = $('#h');
  $h.on('input change', function() {
    cellView.model.resize(cellView.model.attributes.size.width,parseInt($h.val(), 10));
  });
  var $n = $('#name');
  $n.on('input change', function() {
    cellView.model.prop('name',$n.val());
  });
  $('#multiple').change(function(){
    if(this.checked) {
        cellView.model.prop('multiple','checked');
        var newRowContent ="<tr id='amount'><td>Amount</td><td><input type='text' id='quan'></td></tr>";
        $("#tabAttributes #table tbody").append(newRowContent);
        var $am = $('#quan');
        $am.on('input change', function() {
          cellView.model.attr({text: { text: $am.val(), 'ref-y': cellView.model.attributes.size.height+8}});
        });
    }
    else{
        cellView.model.prop('multiple','');
        $("#tabAttributes #table tbody #amount").empty();
    }
  });
  $('#addAttribute').click(function(){
    $("#tabAttributes #table tbody").append("<tr><td><input id='PN' type='text'></td><td><input type='text' id='PV'></td></tr>");
  });

  $('#btnPort').click(function(){
      nPort ++;
    $("#tabPorts #table tbody").append(
      "<tr id='port"+nPort+"'><td><input id='id' type='text'></td>"+
      "<td><select id='type'><option value='val'>Value</option><option value='mon'>Money</option><option value='inf'>Information</option></select></td>"+
      "<td><select id='function'><option value='in'>Input</option><option value='out'>Output</option></select></td>"+
      "<td><select id='position'><option value='top'>Top</option><option value='bottom'>Bottom</option><option value='left'>Left</option><option value='right'>Right</option></select></td>"+
      "<td><input id='active' name='port"+nPort+"' type='checkbox'></td>"+
      "</tr>");
    $("#port"+nPort+" #active").change(function(){
      console.log(this);
      if(this.checked) {
         $("#"+this.name+" #id" ).prop('disabled', true);
        var port = {
          id: $("#"+this.name+" #id" ).val(),
          group: $("#"+this.name+" #position" ).val(),
          args: {'type':$("#"+this.name+" #type" ).val(), 'function':$("#"+this.name+" #function" ).val()},
          attrs: attributes($("#"+this.name+" #type" ).val(),$("#"+this.name+" #function" ).val())
        };
        cellView.model.addPort(port);
      }
      else{
        cellView.model.removePort($("#"+this.name+" #id" ).val());
      }
    });
  });
}

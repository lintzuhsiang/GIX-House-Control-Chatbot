

function drawFace(){
  data = [
  {x:100,y:100},
  {x:300,y:100},
 ]
svg = d3.select("svg")//.attr("width",800).attr("height",800)

var arc = d3.svg.arc()
.innerRadius(50)
.outerRadius(75)
.startAngle(120*Math.PI/180)
.endAngle(240*Math.PI/180)

svg.append('g')
.append('path')
.attr("id","mouth")
.attr("d",arc)
//.attr("transform","translate((50%,70%))")
.attr("transform","translate(200,200)")

var cirAttr1 = {
  class:"eyes",
  cx:function(d){return d.x},
  cy:function(d){return d.y},
  r:30,
  fill:"black",
}
var cirAttr2 = {
  class:"eyeballs",
  cx:function(d){return d.x},
  cy:function(d){return d.y},
  r:10,
  fill:"orange",
}

svg.selectAll(".eyes")
.data(data).enter()
.append('g')
.append("circle").attr(cirAttr1)

svg.selectAll(".eyeballs")
.data(data).enter()
.append('g')
.append("circle").attr(cirAttr2)
}

function xscale(x,d){
  return Math.min(Math.max(x/1.5,d-10),d+10);
}
function yscale(y,d){
  return Math.min(Math.max(y/1.5,d-10),d+10);
}


function handlemove(){
  d3.selectAll(".eyeballs").attr({
    cx: function(d){return xscale(new_data['x'],d.x)},
    cy: function(d){return yscale(new_data['y'],d.y)},
})
 }

function happy(){
  var arc = d3.svg.arc()
.innerRadius(50)
.outerRadius(75)
.startAngle(90*Math.PI/180)
.endAngle(270*Math.PI/180)

  d3.select("path")
  .attr("d",arc)
  .attr("transform","translate(200,250)")
  d3.selectAll(".eyeballs").attr({
    fill:"yellow",
    rx: 5,
    ry:10,
  })
}

function sad(){
  console.log("sad")
 var arc = d3.svg.arc()
.innerRadius(50)
.outerRadius(75)
.startAngle(90*Math.PI/180)
.endAngle(-90*Math.PI/180)

  d3.select("path")
  .attr("d",arc)
  .attr("transform","translate(200,250)")
  // d3.selectAll(".eyeballs").attr({
  //   fill:"gray",
  //   rx: 5,
  //   ry:10,
  // })
}


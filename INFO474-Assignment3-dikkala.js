var color = "steelblue";

var formatCount = d3.format(",.0f");

var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 950 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom; 

d3.csv("data/Admission_Predict.csv", parse, function(error, data) {
    values = data.map(function(d) { return d['TOEFL Score']; });  

    var x = d3.scale.linear()
      .domain([90, 124]) 
      .range([0, width]);

    var data = d3.layout.histogram()
      .bins(x.ticks(20))
      (values);

    var yMax = 54;
    var yMin = 0; 

    var colorScale = d3.scale.linear()
        .domain([0, 54])
        .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

    var y = d3.scale.linear()
      .domain([0, 54])
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var svg = d3.select("body").append("svg") 
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
      .data(data)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
      .attr("x", 1)
      .attr("width", (x(data[0].dx) - x(0)) - 1)
      .attr("height", function(d) { return height - y(d.y); })
      .attr("fill", function(d) { return colorScale(d.y) });

    bar.append("text")
      .attr("dy", ".75em")
      .attr("y", -12)
      .attr("x", (x(data[0].dx) - x(0)) / 2)
      .attr("text-anchor", "middle")
      .text(function(d) { return formatCount(d.y); });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("text")             
      .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 380)
      .attr("y", height + 30)
      .text("TOEFL Score (bin)");

});

function parse(row) {
  row['Calculus I'] = +row['Calculus I'];
  return row;
} 
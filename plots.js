// Initialize layout parameters
var layout = {
  autosize: true,
  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  }
}

var config = {responsive: true}

// Initializes the page with a default plot
function init() {
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
  }];

  Plotly.newPlot("chart1", data, layout, config);
  Plotly.newPlot("chart2", data, layout, config);
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  var x = [];
  var y = [];

  if (dataset === 'dataset1') {
    x = [1, 2, 3, 4, 5];
    y = [1, 2, 4, 8, 16];
  }

  else if (dataset === 'dataset2') {
    x = [10, 20, 30, 40, 50];
    y = [1, 10, 100, 1000, 10000];
  }

  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("chart1", "x", [x]);
  Plotly.restyle("chart1", "y", [y]);
  Plotly.restyle("chart2", "x", [x]);
  Plotly.restyle("chart2", "y", [y]);
}

init();


function getTimeAggregator(mode) {
  switch(mode) {
    case 'daily':
      return function(date) {
        return date;
      }

    case 'weekly':
      return function(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1 - (date.getDay()||7)));
      }
    
    case 'monthly':
      return function(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
      }
    
    case 'quarterly':
      return function(date) {
        return new Date(Date.UTC(date.getFullYear(), 3 * Math.floor(date.getMonth() / 3), 1));
      }

    case 'annually':
      return function(date) {
        return new Date(Date.UTC(date.getFullYear(), 0, 1));
      }
  }
}

function percentAggregator(values) {
  return 100 * (values
    .map(function(value) { return 1 + value / 100; })
    .reduce(function(prev, curr) { return prev * curr; }, 1) - 1);
}

function createColorFormat(threshold) {
  var formatter = new google.visualization.ColorFormat();
  formatter.addRange(null, -threshold, 'black', 'red');
  formatter.addGradientRange(-threshold, 0, 'black', 'red', 'white');
  formatter.addGradientRange(0, threshold, 'black', 'white', 'green');
  formatter.addRange(threshold, null, 'black', 'green');
  return formatter;
}

function range(start, stop) {
  var result = [];
  for (var i = start; i < stop; i += 1) {
    result.push(i);
  }
  return result;
}

function createChart(options) {
  var default_options = {
    rangeSelector: {
      selected: 5,
    },
    
    yAxis: {
      crosshair: true,
      offset: 40,
      labels: {
        align: 'right',
        x: -10,
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: 'black',
      }],
    },

    plotOptions: {
      series: {
        compareStart: true,
        showInNavigator: true,
        states: {
          hover: {
            lineWidthPlus: 2,
          },
        },
      },
    },
    
    rangeSelector: {
      inputEditDateFormat: '%Y/%m/%d',
      inputDateFormat: '%Y/%m/%d',
    },

    tooltip: {
      split: false,
      shared: true,
      shadow: false,
      borderWidth: 0,
      backgroundColor: 'rgba(255,255,255,0.8)',
      positioner: function () { return { x: 10, y: 35 }; },
    },

    scrollbar: {
      enabled: false,
    },
  };
    
  function deep_merge(a, b) {
    if (a === null) return b;
    if (b === null) return a;
    if (typeof a === 'object' && typeof b === 'object') {
      for (var key in b) {
        a[key] = a.hasOwnProperty(key) ? deep_merge(a[key], b[key]) : b[key];
      }
      return a;
    }
    return b;
  }
    
  var combined = deep_merge(default_options, options);
  return Highcharts.stockChart('graph', combined);
}



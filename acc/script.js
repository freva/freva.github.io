const data = {};
const sankeyData = [];

function cumulativeSeries(transactions, loans, stocks, properties) {
  const series = [
    { name: 'Cash', data: [] },
    { name: 'Stocks', data: [] },
    { name: 'BSU', data: [] },
    { name: 'Property', data: [] },
    { name: 'Loan', data: [] },
  ];
  const prevSum = [0, 0, 0, 0, 0];
  let prevDate;

  for (let ri = -1, ti = 0, li = 0, si = 0, pi = 0; ti < transactions.length || li < loans.length || si < stocks.length || pi < properties.length; ) {
    const tDate = transactions[ti]?.[0];
    const lDate = loans[li]?.[0];
    const sDate = stocks[si]?.[0];
    const pDate = properties[pi]?.[0];

    const nextDate = [tDate, lDate, sDate, pDate].reduce((a, b) => !b || a < b ? a : b);
    if (nextDate == null) break;

    if (nextDate === tDate) {
      prevSum[0] += transactions[ti][2];
      prevSum[4] += transactions[ti][3];
      prevSum[2] += transactions[ti][4];
      ti++;
    }
    if (nextDate === lDate) prevSum[4] += loans[li++][1];
    if (nextDate === sDate) prevSum[1] = stocks[si++][1];
    if (nextDate === pDate) prevSum[3] = properties[pi++][1];

    if (prevDate !== nextDate) {
        for (let i = 0; i < prevSum.length; i++) {
            series[i].data.push([nextDate, prevSum[i]]);
        }
        prevDate = nextDate;
    }
  }

  return series;
}

function graphCumulative(series) {
  const options = {
    rangeSelector: {
      selected: 5,
    },

    xAxis: {
      ordinal: false,
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
        stacking: 'normal',
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
      positioner: () => ({ x: 10, y: 35 }),
      formatter: function() {
        let total = 0;
        let s = '<b>Date: ' + Highcharts.dateFormat('%Y/%m/%d', new Date(this.x)) + '</b><br/>';

        this.points.forEach(function(point) {
          const color = point.y < 0 ? 'red' : 'green';
          total += point.y;
          s += '<br/><b>' + point.series.name + ': </b>' +
               '<span style="color:' + point.series.color + ';font-weight:bold">' + Highcharts.numberFormat(point.y, 2) + '</span>';
        });
        s += '<br/><b>Total: </b>' +
             '<span style="color:#000;font-weight:bold">' + Highcharts.numberFormat(total, 2) + '</span>';
        return s;
      },
    },

    scrollbar: {
      enabled: false,
    },

    series,
  };

  const chart = Highcharts.stockChart('graph', options);
  chart.renderer.button('Stack', 300, 5)
    .on('click', function () {
      const current = chart.options.plotOptions.series.stacking;
      chart.update({ plotOptions: { series: { stacking: current ? undefined : 'normal' } } });
    })
    .add();
}

function graphSankey(data) {
    Highcharts.chart('sankey', {
      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
        }
      },
      series: [{
        keys: ['from', 'to', 'weight'],
        data,
        type: 'sankey',
    }],
  });
}

window.onload = function () {
    const { transactions, loans, stocks, properties } = data;
    graphCumulative(cumulativeSeries(transactions, loans, stocks, properties));
    graphSankey(sankeyData);
};

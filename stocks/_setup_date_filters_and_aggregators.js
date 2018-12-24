  var date_range_slider = new google.visualization.ControlWrapper({
    controlType: 'DateRangeFilter',
    containerId: 'fake_filter',
    options: {
      filterColumnIndex: 0,
    }
  });

  var table = new google.visualization.ChartWrapper({
    chartType: 'Table',
    containerId: 'value_table_div',
    options: {
      allowHtml: true,
      //showRowNumber: true,
      width: '100%',
      sortAscending: false,
      sortColumn: 0,
      pageSize: 100,
    },
  });

  var data_table = google.visualization.arrayToDataTable(data);
  format_data_table(data_table);

  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));
  dashboard.bind([date_range_slider], [table]);
  dashboard.draw(data_table);

  var filter = function(event) {
    var chart_extremes = event == null ? chart.xAxis[0].getExtremes() : event;
    date_range_slider.setState({lowValue: new Date(chart_extremes.min), highValue: new Date(chart_extremes.max)});
    date_range_slider.draw();
  }
    
  var aggregator = function() {
    var selected_time_aggregate = document.querySelector('input[name=radio_aggregate_time]:checked').value;
    var selected_number_aggregate = document.querySelector('input[name=radio_aggregate_number]:checked').value;
    if (selected_time_aggregate == 'daily') return dashboard.draw(data_table);

    var new_data_table = google.visualization.data.group(data_table,
      [{column: 0, modifier: getTimeAggregator(selected_time_aggregate), type: 'date'}],
      range(1, width).map(function(i) {
        return {
          column: i,
          aggregation: getNumberAggregator(selected_number_aggregate, i, width),
          type: 'number'
        }
      })
    );
    format_data_table(new_data_table);
    dashboard.draw(new_data_table);
    filter();
  }

  document.querySelectorAll('input[name=radio_aggregate_time]')
    .forEach(function(e) { e.addEventListener('change', aggregator); });
  document.querySelectorAll('input[name=radio_aggregate_number]')
    .forEach(function(e) { e.addEventListener('change', aggregator); });

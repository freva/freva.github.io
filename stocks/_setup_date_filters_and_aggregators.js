  const table = new google.visualization.Table(document.getElementById('value_table_div'));
  const table_options = {
    allowHtml: true,
    //showRowNumber: true,
    width: '100%',
    sortAscending: false,
    sortColumn: 0,
    pageSize: 100,
  };

  const data_table = google.visualization.arrayToDataTable(data);
  let current_data_table = data_table;
  format_data_table(data_table);

  table.draw(data_table, table_options);

  const filter = event => {
    const chart_extremes = event == null ? chart.xAxis[0].getExtremes() : event;
    const data_view = new google.visualization.DataView(current_data_table);
    data_view.setRows(current_data_table.getFilteredRows([
      {column: 0, minValue: new Date(chart_extremes.min), maxValue: new Date(chart_extremes.max)}]));

    table.draw(data_view, table_options);
  }
    
  const aggregator = () => {
    const selected_time_aggregate = document.querySelector('input[name=radio_aggregate_time]:checked').value;
    const selected_number_aggregate = document.querySelector('input[name=radio_aggregate_number]:checked').value;

    current_data_table = google.visualization.data.group(data_table,
      [{column: 0, modifier: getTimeAggregator(selected_time_aggregate), type: 'date'}],
      range(1, width).map(i => {
        return {
          column: i,
          aggregation: getNumberAggregator(selected_number_aggregate, i, width),
          type: 'number'
        }
      })
    );
    format_data_table(current_data_table);
    filter();
  }

  document.querySelectorAll('input[name=radio_aggregate_time]')
    .forEach(e => e.addEventListener('change', aggregator));
  document.querySelectorAll('input[name=radio_aggregate_number]')
    .forEach(e => e.addEventListener('change', aggregator));

  google.visualization.events.addListener(table, 'sort', e => {
    table_options.sortColumn = e.column;
    table_options.sortAscending = e.ascending;
  });

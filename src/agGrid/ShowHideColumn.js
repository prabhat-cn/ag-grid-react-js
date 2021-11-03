import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgAbstractField } from 'ag-grid-community';

const ShowHideColumn = () => {
  const [gridApiData, setGridApiData] = useState();
  const [gridToggleApi, setGridToggleApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  // For Toggle column
  const [hideColumn, setHideColumn] = useState(false);
  // for export csv & Take Api
  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api;
    // for pagination
    setGridApiData(params);
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((response) => {
        params.api.applyTransaction({ add: response });
        // for show hide single column
        setGridColumnApi(params.columnApi);
        // toggle multiple column
        setGridToggleApi(params.api);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  // Export End

  const onPaginationChange = (pageSize) => {
    gridApiData.api.paginationSetPageSize(pageSize);
  };
  const rowSelectionType = 'multiple'; // Type single | multiple

  // print single selection row
  const onSelectionChanged = (event) => {
    console.log('event', event.api.getSelectedRows());
  };
  const isRowSelectable = (node) => {
    return node.data
      ? node.data.id % 2 === 0 || node.data.email.includes('.org')
      : false;
  };

  // Show Hide Column
  const showBodyColumn = () => {
    // gridColumnApi.setColumnVisible('body', true);
    // toggle Single Column
    gridColumnApi.setColumnVisible('body', hideColumn);
    // toggle multiple column
    gridColumnApi.setColumnsVisible(['email', 'name', hideColumn]);
    setHideColumn(!hideColumn);
    gridToggleApi.sizeColumnsToFit();
  };
  // as per api data
  const columnsDefs = [
    {
      headerName: 'ID',
      field: 'id',
      // Row Selection With Check box
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Body',
      field: 'body',
      // hide single property & Toggle
      hide: true,
      // If multy then no use default
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    editable: true,
    flex: 1,
    minWidth: 100,
  };

  return (
    <>
      <div>
        <h4>
          Show Hide Column, Button Click Show-Hide Column, Toggle Single/
          Multiple Column
        </h4>
        {/* Dynamic pagination from dropdown */}
        <select
          style={{ float: 'right' }}
          onChange={(e) => {
            console.log('onPaginationChange', e.target.value);
            onPaginationChange(e.target.value);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <button
          onClick={() => {
            onExportClick();
          }}
        >
          Export
        </button>{' '}
        &nbsp;
        <button onClick={showBodyColumn}>Show Body Column</button>
        <div
          className="ag-theme-alpine"
          style={{
            height: 600,
            width: '100%',
            // margin: '0 auto'
          }}
        >
          {/* Type- 3 */}
          <AgGridReact
            columnDefs={columnsDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            // without ctrl+ click use
            rowMultiSelectWithClick={true}
            // Row Selection Base On Condition
            isRowSelectable={isRowSelectable}
            pagination={true}
            paginationPageSize={8}
          />
        </div>
      </div>
    </>
  );
};

export default ShowHideColumn;

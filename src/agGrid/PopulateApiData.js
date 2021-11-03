import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgAbstractField } from 'ag-grid-community';

const PopulateApiData = () => {
  // for export csv & Take Api
  let gridApi;

  const onGridReady = (params) => {
    // data response
    // onGridReady {type: 'gridReady', api: GridApi, columnApi: ColumnApi}
    gridApi = params.api;
    console.log('onGridReady', params);
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((response) => {
        console.log('fetch->', response);
        params.api.applyTransaction({ add: response });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  // Export End
  // as per api data
  const columnsDefs = [
    {
      headerName: 'ID',
      field: 'id',
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
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
  };

  return (
    <>
      <div>
        <h2>Render Custom, Static Data, Dynamic Styles, Tooltip</h2>
        <button
          onClick={() => {
            onExportClick();
          }}
        >
          Export
        </button>
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
          />
        </div>
      </div>
    </>
  );
};

export default PopulateApiData;

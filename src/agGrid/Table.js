import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgAbstractField } from 'ag-grid-community';

const Table = () => {
  const data = [
    {
      name: 'Rahul',
      age: 23,
      department: 'Software Engineer',
    },
    {
      name: 'Kiran',
      age: 28,
      department: 'UI Developer',
    },
    {
      name: 'Ram',
      age: 27,
      department: 'DevOps',
    },
    {
      name: 'Rohit',
      age: 26,
      department: 'Web Devloper',
    },
  ];
  const columns = [
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      editable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Age',
      field: 'age',
      sortable: true,
    },
    {
      headerName: 'Department',
      field: 'department',
      sortable: true,
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  // for export csv
  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api;
    console.log('gridApi', gridApi);
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  return (
    <>
      <div>
        <h2>Static Data Table</h2>
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
            rowData={data}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          />
          {/* Type-1 */}
          {/* <AgGridReact rowData={data}>
        <AgGridColumn field="name"></AgGridColumn>
        <AgGridColumn field="age"></AgGridColumn>
        <AgGridColumn field="department"></AgGridColumn>
      </AgGridReact> */}

          {/* Type- 2  for single setup for individual */}
          {/* <AgGridReact rowData={data} columnDefs={columns} /> */}
        </div>
      </div>
    </>
  );
};

export default Table;

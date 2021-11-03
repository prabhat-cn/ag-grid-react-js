import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgAbstractField } from 'ag-grid-community';

const RenderCustomComponent = () => {
  const actionButton = (params) => {
    console.log('actionButton', params);
    // data taken from const data
    alert(`${params.data.name} ${params.value}`);
  };
  const data = [
    {
      name: 'Rahul',
      age: 23,
      department: 'Software Engineer',
      salary: 20000,
    },
    {
      name: 'Kiran',
      age: 28,
      department: 'UI Developer',
      salary: 30000,
    },
    {
      name: 'Ram',
      age: 27,
      department: 'DevOps',
      salary: 50000,
    },
    {
      name: 'Rohit',
      age: 26,
      department: 'Web Devloper',
      salary: 60000,
    },
  ];
  const columnsDefs = [
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
      // add for each column check 'value' by console.log
      cellStyle: (params) =>
        // console.log(
        //   'cell-style',
        //   params.value > 18 ? { background: 'green' } : { background: 'red' }
        // ),
        params.value > 27
          ? { background: 'green', borderLeft: '5px dotted #000' }
          : { background: 'red' },
      cellClass: (params) => (params.value > 27 ? 'moreThan27' : 'lessThan27'),
    },
    {
      headerName: 'Department',
      field: 'department',
      sortable: true,
    },
    {
      headerName: 'Salary',
      field: 'salary',
      sortable: true,
    },
    {
      headerName: 'Action',
      field: 'salary',
      cellRendererFramework: (params) => (
        <button onClick={() => actionButton(params)}>Click me</button>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
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
        <h2>Render Custom, Static Data, Dynamic Styles</h2>
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
            columnDefs={columnsDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </>
  );
};

export default RenderCustomComponent;

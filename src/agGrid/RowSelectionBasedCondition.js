import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgAbstractField } from 'ag-grid-community';

const RowSelectionBasedCondition = () => {
  // for export csv & Take Api
  let gridApi;

  const onGridReady = (params) => {
    // data response
    // onGridReady {type: 'gridReady', api: GridApi, columnApi: ColumnApi}
    gridApi = params.api;
    // console.log('onGridReady', params);
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((response) => {
        // console.log('fetch->', response);
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
  // if click on select single/ multiple row data selected
  // const rowSelectionType = 'single';
  const rowSelectionType = 'multiple'; // Type single | multiple

  // print single selection row
  const onSelectionChanged = (event) => {
    // event {type: 'selectionChanged', api: GridApi, columnApi: ColumnApi}
    // console.log('event', event);
    console.log('event', event.api.getSelectedRows());
    // If multiple row selection then command/ctrl + click
  };
  // Row Selection Base On Condition checkbox
  const isRowSelectable = (node) => {
    // return false;
    // handle single condition
    // return node.data ? node.data.id % 2 === 0 : false;
    // handle multiple conditions with odd also
    return node.data
      ? node.data.id % 2 === 0 || node.data.email.includes('.org')
      : false;
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
        <h4>
          Populate Api Data, Row Selection Base On Condition & handle multiple
          conditions
        </h4>
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
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            // without ctrl+ click use
            rowMultiSelectWithClick={true}
            // Row Selection Base On Condition
            isRowSelectable={isRowSelectable}
          />
        </div>
      </div>
    </>
  );
};

export default RowSelectionBasedCondition;

import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgAbstractField } from 'ag-grid-community';

const searchDivStyle = {
  backgroundColor: '#014e016b',
  padding: 10,
};

const searchStyle = {
  width: '50%',
  float: 'right',
  borderRadius: '20px',
  outline: 0,
  border: '2px solid #0037ffe8',
  paddingLeft: '15px',
  paddingTop: '4px',
  paddingbottom: '4px',
};

const QuickFilter = () => {
  const [gridFilterApi, setGridFilterApi] = useState(null);
  // for export csv & Take Api
  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api;
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((response) => {
        params.api.applyTransaction({ add: response });
        // for filter operation
        setGridFilterApi(params.api);
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
    editable: true,
    flex: 1,
    minWidth: 100,
  };
  // filter function
  const onFilterTextChange = (e) => {
    console.log('onFilter', e.target.value);
    gridFilterApi.setQuickFilter(e.target.value);
  };

  return (
    <>
      <div>
        <h4>Quick Filter & Custom Search Filter</h4>
        <br />
        <div className="" style={searchDivStyle}>
          <button
            onClick={() => {
              onExportClick();
            }}
          >
            Export
          </button>
          {/* filtercustom */}
          <input
            type="search"
            placeholder="Search Here.."
            onChange={onFilterTextChange}
            style={searchStyle}
          />
        </div>
        <br />
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
            rowMultiSelectWithClick={true}
            pagination={true}
            paginationPageSize={8}
          />
        </div>
      </div>
    </>
  );
};

export default QuickFilter;

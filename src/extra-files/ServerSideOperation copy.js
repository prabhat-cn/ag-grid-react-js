import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgAbstractField } from 'ag-grid-community';

const ServerSideOperation = () => {
  const [gridFilterApi, setGridFilterApi] = useState(null);
  // server side code

  // const datasource = {
  //   getRows(params) {
  //     console.log(JSON.stringify(params.request, null, 1));
  //     let url = 'https://jsonplaceholder.typicode.com/comments?';
  //     console.log(url);
  //     fetch(url)
  //       .then((httpResponse) => httpResponse.json())
  //       .then((response) => {
  //         params.successCallback(response, 499);
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         params.failCallback();
  //       });
  //   },
  // };

  // const onGridReady = (params) => {
  //   // register datasource with the grid
  //   params.api.setServerSideDatasource(datasource);
  //   console.log('datasource', datasource);
  // };

  const onGridReady = (params) => {
    // console.log(params.request);
    // console.log(JSON.stringify(params.request, null, 1));
    let startRow;
    let endRow;
    let url = 'https://jsonplaceholder.typicode.com/comments?';
    // url += `_start=${startRow}&_end=${endRow}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        // console.log(params);
        params.api.applyTransaction({ add: response });
        // for filter operation
        setGridFilterApi(params.api);
      })
      .catch((err) => {
        console.log(err);
      });
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
    editable: true,
    flex: 1,
    minWidth: 100,
  };

  return (
    <>
      <div>
        <h4>Serverside Operation</h4>
        <br />

        <br />
        <div
          className="ag-theme-alpine"
          style={{
            // height: 600,
            width: '100%',
            // margin: '0 auto'
          }}
        >
          {/* Type- 3 */}
          <AgGridReact
            columnDefs={columnsDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={5}
            // for auto height
            domLayout="autoHeight"
            // rowModelType="serverSide"
          />
        </div>
      </div>
    </>
  );
};

export default ServerSideOperation;

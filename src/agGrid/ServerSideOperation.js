import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const ServerSideOperation = () => {
  const [gridApi, setGridApi] = useState(null);

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
  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      console.log(params);
      const { startRow, endRow, filterModel, sortModel } = params.request;
      let url = `https://jsonplaceholder.typicode.com/comments?`;
      //Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `_sort=${colId}&_order=${sort}&`;
      }
      //Filtering
      const filterKeys = Object.keys(filterModel);
      filterKeys.forEach((filter) => {
        url += `${filter}=${filterModel[filter].filter}&`;
      });
      //Pagination
      // url += `_start=${startRow}&_end=${endRow}`;
      fetch(url)
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          console.log('app-res', params.successCallback(response.rows));
          params.successCallback(response, 499);
        })
        .catch((error) => {
          console.error(error);
          params.failCallback();
        });
    },
  };

  const onGridReady = (params) => {
    setGridApi(params);
    // register datasource with the grid
    params.api.setServerSideDatasource(datasource);
  };

  return (
    <>
      <div>
        <h4>
          Implement Server-Side Pagination(Working in paid version), Filter and
          Sorting in ag Grid
        </h4>

        <div
          className="ag-theme-alpine"
          style={{
            width: '100%',
          }}
        >
          {/* Type- 3 */}

          <AgGridReact
            columnDefs={columnsDefs}
            pagination={true}
            paginationPageSize={8}
            domLayout="autoHeight"
            rowModelType="serverSide"
            onGridReady={onGridReady}
            defaultColDef={{
              filter: true,
              floatingFilter: true,
              sortable: true,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default ServerSideOperation;

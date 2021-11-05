import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Button, Grid } from '@material-ui/core';
import { FormAlertDialog } from './components/FormAlertDialog';
import axios from 'axios';

const Main = () => {
  const [gridApi, setGridApi] = useState(null);
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  // const [tableData, setTableData] = useState([
  //   {
  //     id: 1,
  //     name: 'Raj',
  //     email: 'rahul@gmail.com',
  //     phone: '9875674756',
  //   },
  // ]);
  const [tableData, setTableData] = useState(null);
  const columnsDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
  ];
  let url = `https://jsonplaceholder.typicode.com/users`;

  const getApiData = () => {
    fetch(url)
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        console.log(response);
        setTableData(response);
      });
  };
  const onGridReady = (params) => {
    setGridApi(params);
    getApiData();
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // field onchange
  const onChange = (e) => {
    // console.log('onChange', e);
    const { value, id } = e.target;
    // console.log(value, id);
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = () => {
    axios.post(url).then((data) => {
      console.log(data);
    });
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then((httpResponse) => httpResponse.json())
    //   .then((response) => {
    //     console.log('Add-res->', response);
    //   });
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <div>
      <h4>CRUD Opearation AG-Grid</h4>
      <div className="add-btn">
        <Grid align="right">
          <Button onClick={handleClickOpen} variant="contained" color="primary">
            Add User
          </Button>
        </Grid>
      </div>
      <br />
      <div
        className="ag-theme-alpine"
        style={{
          width: '100%',
          // margin: '0 auto'
        }}
      >
        <AgGridReact
          domLayout="autoHeight"
          rowData={tableData}
          columnDefs={columnsDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      <FormAlertDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        formData={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Main;

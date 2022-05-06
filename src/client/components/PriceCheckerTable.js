import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
//import Button from "@mui/material/Button";

const ariaLabel = { "aria-label": "description" };

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function PriceCheckerTable() {
  const [list, setList] = React.useState([])
  React.useEffect(() =>{
      console.log("Sas")
      getAllUrls()
  },[])

  const getAllUrls = () => {
    fetch('/api/urls').then(data => data.json()).then(res => {
      console.log(res)
      setList(res)
  }).catch(err => console.error(err))
  }

  const addItem = () => {
    const img = document.getElementById('img').value.trim();
    const name = document.getElementById('name').value.trim();
    const url = document.getElementById('url').value.trim();
    const price = document.getElementById('price').value.trim();
    document.getElementById('img').value = '';
      document.getElementById('name').value = '';
    document.getElementById('url').value = '';
      document.getElementById('price').value = '';
    fetch('/api/new', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify({img,name,url,price})
    }).then(data => {

      getAllUrls()
    }).catch(err => console.log(err))
}
  return (
    <>
    <Box
    component="form"
    sx={{
      "& > :not(style)": { m: 1 },
    }}
    noValidate
    autoComplete="off"
    id="inputBoxes"
  >
    <Input placeholder="Image" inputProps={ariaLabel} id="img"/>
    <Input placeholder="Name" inputProps={ariaLabel} id="name"/>
    <Input placeholder="Url" inputProps={ariaLabel} id="url"/>
    <Input placeholder="Price" inputProps={ariaLabel} id="price"/>
    <Button align="right" variant="contained" onClick={addItem}>
      Add
    </Button>
  </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Link</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((el,i) => (
            <TableRow
              key={el.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left"><img src={el.img} alt="" width="100" height="100"/></TableCell>
              <TableCell component="th" scope="row">
              <Link href={el.url}>{el.name}</Link>
              </TableCell>
              <TableCell align="left">{el.price}</TableCell>
              <TableCell align="right"><Button variant="outlined" color="error"><MoveDownOutlinedIcon/></Button></TableCell>
              {/* <TableCell align="right">{el.fat}</TableCell>
              <TableCell align="right">{el.carbs}</TableCell>
              <TableCell align="right">{el.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const ariaLabel = { "aria-label": "description" };

export default function NewItems() {
    const addItem = () => {
        const img = document.getElementById('img').value.trim();
        const name = document.getElementById('name').value.trim();
        const url = document.getElementById('url').value.trim();
        const price = document.getElementById('price').value.trim();

        fetch('/api/new', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify({img,name,url,price})
        }).then(data => data.json()).then(res => {
            location.reload();

        }).catch(err => console.log(err))
    }
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Input placeholder="Image" inputProps={ariaLabel} id="img"/>
      <Input placeholder="Name" inputProps={ariaLabel} id="name"/>
      <Input placeholder="Url" inputProps={ariaLabel} id="url"/>
      <Input placeholder="Price" inputProps={ariaLabel} id="price"/>
      <Button align="right" variant="contained" onClick={addItem}>
        Add
      </Button>
    </Box>
  );
}

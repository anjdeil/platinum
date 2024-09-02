import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function TestSelect()
{
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event: SelectChangeEvent) =>
  {
    setCurrency(event.target.value as string);
  };

  return (
    <Box sx={{ width: '300px', marginTop: '50px', marginLeft: '50px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label='EUR'
          onChange={handleChange}
        >
          <MenuItem value={'EUR'}>EUR</MenuItem>
          <MenuItem value={'PLN'}>PLN</MenuItem>
          <MenuItem value={'USD'}>USD</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
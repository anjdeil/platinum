import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCurrentCurrency } from '@/store/slices/currencySlice';

export default function TestSelect()
{
  const currency = useAppSelector((state) => state.currencySlice);
  const dispatch = useAppDispatch();

  const onCurrencyChange = (event: SelectChangeEvent) =>
  {
    dispatch(setCurrentCurrency({ code: event.target.value }));
  };

  return (
    <Box sx={{ width: '300px', marginTop: '50px', marginLeft: '50px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency.code}
          label='EUR'
          onChange={onCurrencyChange}
        >
          <MenuItem value={'EUR'}>EUR</MenuItem>
          <MenuItem value={'PLN'}>PLN</MenuItem>
          <MenuItem value={'USD'}>USD</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
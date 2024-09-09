import { CurrencyState } from '@/store/slices/currencySlice';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import styles from './CustomSelect.module.scss';

interface CustomSelectProps {
  options: CurrencyState[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className={styles.selectWrapper}>
      <FormControl fullWidth variant="standard">
        <Select
          className={styles.customSelect}
          value={value}
          onChange={onChange}
          onOpen={handleOpen}
          onClose={handleClose}
          disableUnderline
          IconComponent={(props) => (
            <span {...props} className={`${styles.arrow} ${open ? styles.arrowUp : ''}`}></span>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                width: '53px',
                boxShadow: 'none',
              },
            },
          }}
          sx={{
            '& .MuiSelect-select': {
              paddingRight: '0px !important',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.code} value={option.code} className={styles.menuItem}>
              {option.symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

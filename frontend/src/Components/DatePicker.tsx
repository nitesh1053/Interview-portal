import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker(props: { changeDate: (date: Dayjs) => void, date: Dayjs | null | undefined }) {
  const {
    date,
    changeDate,
  } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={date}
        onChange={(newValue: any) => {
          changeDate(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DateTimePickers(props) {
    console.log("---------props de composant DateTimePickers",props);

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-01-14T21:00:00'));
  console.log("------------selectedDate",selectedDate);

  const handleDateChange = (date) => {
      setSelectedDate(date);
    props.setSelectedDate(date);
  };


  
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha del evento"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Hora del evento"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
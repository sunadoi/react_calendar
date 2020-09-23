import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import jaLocale from "date-fns/locale/ja";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

jaLocale.options.weekStartsOn = 0;

const StyeledDatePicker = ({ selectedDate, dateChangeHandler }) => {
  return (
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
        <DatePicker
          disableToolbar
          variant="inline"
          format="yyyy年MM月dd日"
          value={selectedDate}
          onChange={dateChangeHandler}
          inputVariant="standard"
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default StyeledDatePicker;

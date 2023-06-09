import { Box, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useEffect, useState } from "react";

function DatePicker(props) {
  const {
    value,
    error,
    touched,
    helperText,
    onChange,
    onBlur,
    format,
    ...rest
  } = props;

  const [localError, setLocalError] = useState(false);

  useEffect(() => {
    touched && error ? setLocalError(true) : setLocalError(false);
  }, [error, touched]);

  return (
    <Box mb={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker"]}
          sx={{ paddingTop: 0, flexDirection: "column", overflow: "visible" }}
        >
          <DesktopDatePicker
            format={format}
            value={value}
            onChange={onChange}
            onClose={onBlur}
            renderInput={(props) => <TextField {...props} />}
            slotProps={{
              textField: {
                helperText: localError && helperText ? helperText : "",
                onBlur: onBlur,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: localError ? "error.main" : "rgba(0, 0, 0, 0.23)",
              },
              "& .MuiIconButton-root": {
                color: localError ? "error.main" : "rgba(0, 0, 0, 0.54)",
              },
              "& .MuiFormHelperText-root": {
                color: localError ? "error.main" : "rgba(0, 0, 0, 0.54)",
              },
              label: {
                color: localError ? "error.main" : "rgba(0, 0, 0, 0.54)",
              },
            }}
            {...rest}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}

export default DatePicker;

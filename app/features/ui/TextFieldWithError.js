import React from 'react';
import { TextField } from '@mui/material';

const TextFieldWithError = ({ label, value, onChange, error, helperText, ...props }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};
export default TextFieldWithError;
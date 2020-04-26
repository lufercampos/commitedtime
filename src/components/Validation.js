import React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

export const renderTextField = ({
  defaultValue,
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    FormHelperTextProps={{
      style: { textAlign: "right" },
    }}
    defaultValue={defaultValue}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderSelectField = ({
  htmlFor,
  className,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl margin="dense" className={className} error={touched && error}>
    <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
    <Select {...input} {...custom}>
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { EXECUTOR_TYPE } from "../../helpers/Constants";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500
  }
});

export default function Step2() {
  const classes = useStyles();

  const currentCreateJobProps = useSelector(
    state => state.appState.currentCreateJobProps
  );

  return (
    <div className={classes.root}>
      {currentCreateJobProps.executor == EXECUTOR_TYPE[0].value ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              required
              id="jobName"
              name="jobName"
              label="Job Name"
              fullWidth
              autoComplete="fname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              placeholder={"Talk about the work to be done."}
              multiline
              rowsMax="6"
              rows="6"
              required
              id="jobDetails"
              name="jobDetails"
              label="Job Details"
              fullWidth
              autoComplete="jobDetails"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl required fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Valor por Hora
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : currentCreateJobProps.executor === EXECUTOR_TYPE[1].value ? (
        <div />
      ) : currentCreateJobProps.executor === EXECUTOR_TYPE[2].value ? (
        <div />
      ) : (
        <div />
      )}
    </div>
  );
}

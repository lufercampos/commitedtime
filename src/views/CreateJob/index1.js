import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {},
});

export default function CreateJob() {
  const theme = useTheme();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              id="jobName"
              name="jobName"
              label="Name"
              fullWidth
              autoComplete="jobName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              multiline
              rows={5}
              required
              id="jobDetails"
              name="jobDetails"
              label="Details"
              fullWidth
              autoComplete="jobDetails"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              id="jobValue"
              name="jobValue"
              label="Value per hour"
              fullWidth
              autoComplete="jobValue"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              id="expectedDateEnd"
              name="expectedDateEnd"
              label="Expected Date to End"
              fullWidth
              autoComplete="expectedDateEnd"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Without forecast"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

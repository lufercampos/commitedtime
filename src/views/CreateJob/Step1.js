import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { setCurrentCreateJobProps } from "../../store/actions/AppAction";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function Step1() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(null);

  const handleChange = event => {
    dispatch(setCurrentCreateJobProps({ executor: event.target.value }));

    setValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        Who will execute?
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Executor</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="1" control={<Radio />} label="Myself" />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Looking for professional"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="Insert the code of the professional"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

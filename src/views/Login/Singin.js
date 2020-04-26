import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { authenticatesUser } from "../../store/actions/AuthAction";
import { showAlert } from "../../store/actions/AppAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../../components/Validation";
import Blocker from "../../components/Blocker";

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
});
const MAX_LENGTH_PASSWORD = 50;
const MAX_LENGTH_NAME = 100;
const MAX_LENGTH_EMAIL = 200;

const validate = (values) => {
  const errors = {};

  if (!values.name || values.name.trim().length == 0) {
    errors.name = "Required field";
  } else if (values.name.length > MAX_LENGTH_NAME) {
    errors.name =
      "The maximum number of characters in this field is:" + MAX_LENGTH_NAME;
  }

  if (!values.email || values.email.trim().length == 0) {
    errors.email = "Required field";
  } else if (values.email.length > MAX_LENGTH_EMAIL) {
    errors.email =
      "The maximum number of characters in this field is:" + MAX_LENGTH_EMAIL;
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (!values.password || values.password.trim().length == 0) {
    errors.password = "Required field";
  } else if (values.password.length > MAX_LENGTH_PASSWORD) {
    errors.password =
      "The maximum number of characters in this field is:" +
      MAX_LENGTH_PASSWORD;
  }

  if (!values.confirmpassword || values.confirmpassword.trim().length == 0) {
    errors.confirmpassword = "Required field";
  } else if (values.confirmpassword.length > MAX_LENGTH_PASSWORD) {
    errors.confirmpassword =
      "The maximum number of characters in this field is:" +
      MAX_LENGTH_PASSWORD;
  }

  return errors;
};

class Singin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  onLogin = () => {
    this.props.onLogin(this.state.user.email, this.state.user.password);
  };

  onChange = (event) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [event.target.name]: event.target.value,
      },
    }));
  };

  goToSingup = (event) => {
    this.props.goToSingup(event);
  };

  render() {
    const { classes, handleSubmit, loggedIn, submitting } = this.props;

    return !loggedIn ? (
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <div className={classes.form}>
          <Blocker submitting={submitting}>
            <Field
              variant="outlined"
              margin="dense"
              onChange={this.onChange}
              fullWidth
              name="email"
              component={renderTextField}
              label="Email Address"
              autoComplete="email"
            />

            <Field
              variant="outlined"
              margin="dense"
              onChange={this.onChange}
              fullWidth
              name="password"
              component={renderTextField}
              label="Password"
              autoComplete="password"
              type="password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={handleSubmit(this.onLogin)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={this.goToSingup} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Blocker>
        </div>
      </div>
    ) : (
      <Redirect to={{ from: { pathname: "/" } }} />
    );
  }
}

Singin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles, { withTheme: true })(
    reduxForm({
      form: "SinginForm",
      validate,
    })(Singin)
  )
);

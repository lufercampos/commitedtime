import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
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
  submit: {
    margin: theme.spacing(3, 0, 2),
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

class Singup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      confirmPassword: null,
    };
  }

  onSingup = () => {
    return new Promise((resolve, reject) => {
      if (this.state.confirmPassword !== this.state.user.password) {
        showAlert({
          message: "Password confirmation does not match!",
          options: {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          },
        });
        reject();
      } else {
        this.props.onSingup();
      }
    });
  };

  onChange = (event) => {
    if (event.target.name === "confirmpassword") {
      this.setState({ confirmPassword: event.target.value });
    } else {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          [event.target.name]: event.target.value,
        },
      }));
    }
  };

  goToSingin = (event) => {
    this.props.goToSingin(event);
  };

  render() {
    const { classes, theme, handleSubmit, submitting, loggedIn } = this.props;

    return !loggedIn ? (
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form}>
          <Blocker submitting={submitting}>
            <Field
              variant="outlined"
              margin="dense"
              onChange={this.onChange}
              fullWidth
              name="name"
              component={renderTextField}
              label="Name"
              autoComplete="name"
            />

            <Field
              variant="outlined"
              margin="dense"
              onChange={this.onChange}
              fullWidth
              name="email"
              component={renderTextField}
              label="Email Address"
              autoComplete="email"
              type="email"
            />

            <Field
              variant="outlined"
              margin="dense"
              onChange={this.onChange}
              fullWidth
              name="password"
              component={renderTextField}
              label="Password"
              autoComplete="current-password"
              type="password"
            />

            <Field
              variant="outlined"
              margin="dense"
              onChange={this.onChange}
              fullWidth
              name="confirmpassword"
              component={renderTextField}
              label="Confirm Password"
              autoComplete="current-password"
              type="password"
            />

            <Button
              onClick={handleSubmit(this.onSingup)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" onClick={this.goToSingin} variant="body2">
                  Already have an account? Sign in
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

Singup.propTypes = {
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
      form: "SingupForm",
      validate,
    })(Singup)
  )
);

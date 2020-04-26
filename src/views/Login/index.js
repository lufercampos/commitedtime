import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { authenticatesUser } from "../store/actions/AuthAction";
import { showAlert } from "../store/actions/AppAction";
import { saveUser } from "../services/UserService";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../components/Validation";
import Blocker from "../components/Blocker";
import Singin from "./Singin";

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      confirmPassword: null,
      value: 0,
    };
  }

  onLogin = () => {
    return new Promise((resolve, reject) => {
      this.props
        .authenticatesUser({
          email: this.state.user.email,
          password: this.state.user.password,
        })
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          this.props.showAlert({
            message: error.message,
            options: {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            },
          });
          reject();
        });
    });
  };

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
        saveUser(this.state.user)
          .then((result) => {
            showAlert({
              message:
                "Singup finish with sucefully! Check your e-mail to validate and Sing In later.",
              options: {
                variant: "sucess",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              },
            });
            resolve();
          })
          .catch((error) => {
            this.props.showAlert({
              message: error.message,
              options: {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
              },
            });
            reject();
          });
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

  goToSingup = (event) => {
    event.preventDefault();
    this.setState({ value: 1 });
  };

  goToSingin = (event) => {
    event.preventDefault();
    this.setState({ value: 0 });
  };

  render() {
    const { classes, theme, handleSubmit, submitting, loggedIn } = this.props;

    return !loggedIn ? (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Blocker submitting={submitting}>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value}
            >
              <TabPanel
                value={this.state.value}
                index={0}
                dir={theme.direction}
              >
                <Singin onLogin={this.onLogin} goToSingup={this.goToSingup} />
              </TabPanel>
              <TabPanel
                value={this.state.value}
                index={1}
                dir={theme.direction}
              >
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <div className={classes.form}>
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
                        <Link
                          href="#"
                          onClick={this.goToSingin}
                          variant="body2"
                        >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                    <Box mt={5}>
                      <Copyright />
                    </Box>
                  </div>
                </div>
              </TabPanel>
            </SwipeableViews>
          </Blocker>
        </Grid>
      </Grid>
    ) : (
      <Redirect to={{ from: { pathname: "/" } }} />
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert, authenticatesUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles, { withTheme: true })(
    reduxForm({
      form: "LoginForm",
      validate,
    })(Login)
  )
);

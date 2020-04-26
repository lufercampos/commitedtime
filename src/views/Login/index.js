import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { authenticatesUser } from "../../store/actions/AuthAction";
import { showAlert } from "../../store/actions/AppAction";
import { saveUser } from "../../services/UserService";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Singin from "./Singin";
import Singup from "./Singup";

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
      value: 0,
    };
  }

  onLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      this.props
        .authenticatesUser({
          email: email,
          password: password,
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
    });
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
    const { classes, theme, loggedIn } = this.props;

    return !loggedIn ? (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={this.state.value}
          >
            <TabPanel value={this.state.value} index={0} dir={theme.direction}>
              <Singin onLogin={this.onLogin} goToSingup={this.goToSingup} />
            </TabPanel>
            <TabPanel value={this.state.value} index={1} dir={theme.direction}>
              <Singup onSingup={this.onSingup} goToSingin={this.goToSingin} />
            </TabPanel>
          </SwipeableViews>
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
)(withStyles(styles, { withTheme: true })(Login));

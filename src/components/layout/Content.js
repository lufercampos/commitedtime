import React, { Component } from "react";
import AppRouter from "../../routers/AppRouter";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    //...theme.mixins.toolbar,
    height: "50px",
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  }
});

class Content extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main
        className={classes.content}
        style={{
          paddingLeft: "1px",
          paddingRight: "1px",
          paddingTop: "0px",
          paddingBottom: "0px"
        }}
      >
        <div className={classes.drawerHeader} />
        <AppRouter />
      </main>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);

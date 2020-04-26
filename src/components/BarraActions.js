import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    color: "red",
  },
  buttonConfirm: {
    margin: theme.spacing(1),
    color: "#404d5a",
  },
  iconCofirm: {
    color: "#0d8822",
  },
  iconCancel: {
    color: "#c71111",
  },
  buttonCancel: {
    margin: theme.spacing(1),
    color: "#404d5a",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});

class BarraActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickConfirm = () => {
    this.props.handleClickConfirm();
  };

  handleClickCancel = () => {
    this.props.handleClickCancel();
  };

  render() {
    const { classes, submitting } = this.props;
    return (
      <React.Fragment>
        <Button
          disabled={submitting}
          variant="outlined"
          size="small"
          onClick={this.handleClickConfirm}
          className={classes.buttonConfirm}
        >
          <DoneIcon
            className={clsx(
              classes.leftIcon,
              classes.iconSmall,
              classes.iconCofirm
            )}
          />
          {"Confirm"}
        </Button>
        <Button
          disabled={submitting}
          variant="outlined"
          size="small"
          onClick={this.handleClickCancel}
          className={classes.buttonCancel}
        >
          <CancelIcon
            className={clsx(
              classes.leftIcon,
              classes.iconSmall,
              classes.iconCancel
            )}
          />
          {"Cancel"}
        </Button>
      </React.Fragment>
    );
  }
}

BarraActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BarraActions);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Blocker from "./Blocker";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BarraActions from "./BarraActions";

const styles = {
  root: {
    flexGrow: 1,
  },
  paperRoot: {},
};

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      fullScreen,
      submitting,
      classes,
      titulo,
      handleClickConfirm,
      handleClickCancel,
      children,
    } = this.props;

    return (
      <Dialog
        classes={{ paper: classes.paperRoot }}
        scroll="paper"
        fullScreen={fullScreen}
        open={true}
      >
        <DialogTitle>{titulo}</DialogTitle>
        <DialogContent>
          <Blocker submitting={submitting}>{children}</Blocker>
        </DialogContent>

        <DialogActions>
          <BarraActions
            submitting={submitting}
            handleClickConfirm={handleClickConfirm}
            handleClickCancel={handleClickCancel}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles)(EditDialog));

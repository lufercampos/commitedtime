import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { removeAlert } from "../store/actions/AppAction";

class Notifier extends React.Component {
  state = {
    displayed: []
  };

  storeDisplayed = key => {
    this.setState(({ displayed }) => ({
      displayed: [...displayed, key]
    }));
  };

  render() {
    const { notifications, enqueueSnackbar, removeAlert } = this.props;
    const { displayed } = this.state;

    notifications.forEach(notification => {
      setTimeout(() => {
        if (displayed.indexOf(notification.key) > -1) return;
        enqueueSnackbar(notification.message, notification.options);
        this.storeDisplayed(notification.key);
        removeAlert(notification.key);
      }, 1);
    });

    return null;
  }
}

const mapStateToProps = store => ({
  notifications: store.appState.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Notifier));

import React from "react";
import { connect } from "react-redux";

import modals from "./modals";

const modalComponentLookupTable = {
  ...modals
};

class ModalManager extends React.Component {
  render() {
    const { currentModals } = this.props;

    const renderedModals = currentModals.map((modalDescription, index) => {
      const { modalType, modalProps = {} } = modalDescription;
      let ModalComponent = null;
      let key = "";
      if (modalType.constructor === String) {
        ModalComponent = modalComponentLookupTable[modalType];
        key = modalType + index;
      } else {
        ModalComponent = modalType;
        key = "modal" + index;
      }

      return <ModalComponent {...modalProps} key={key} />;
    });
    return <React.Fragment>{renderedModals}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  currentModals: state.appState.modals
});

export default connect(mapStateToProps)(ModalManager);

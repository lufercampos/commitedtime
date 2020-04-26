import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import t from "../../../helpers/Translation";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "../../../store/actions/AppAction";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ConfirmacaoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickConfirmar = () => {
    this.props.onConfirmar(this.props.item);
  };

  handleClickCancelar = () => {
    this.props.closeModal();
  };

  render() {
    const { mensagem } = this.props;
    return (
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">
          {t("c.global.confirmacao")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{mensagem}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickConfirmar} color="primary">
            {t("c.global.confirmar")}
          </Button>
          <Button onClick={this.handleClickCancelar} color="primary">
            {t("c.global.cancelar")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmacaoDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ConfirmacaoDialog));

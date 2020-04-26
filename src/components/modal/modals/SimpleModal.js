import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { closeModal } from "../../../store/actions/AppAction";
import { useDispatch } from "react-redux";

export default function SimpleModal(props) {
  //const classes = useStyles();
  const dispatch = useDispatch();
  const { title, content } = props;

  const save = () => {
    props.save();
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={true}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import React from "react";
import EditDialog from "../../components/EditDialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showAlert, closeModal } from "../../store/actions/AppAction";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../../components/Validation";
import { saveJob } from "../../services/JobService";

const MAX_LENGTH_JOBNAME = 100;
const MAX_LENGTH_JOBDETAILS = 1000;

const styles = {
  root: {
    flexGrow: 1,
  },
};

const validate = (values) => {
  const errors = {};

  if (!values.jobName || values.jobName.trim().length == 0) {
    errors.jobName = "Required field";
  } else if (values.jobName.length > MAX_LENGTH_JOBNAME) {
    errors.jobName =
      "The maximum number of characters in this field is:" + MAX_LENGTH_JOBNAME;
  }

  if (!values.jobDetails || values.jobDetails.trim().length == 0) {
    errors.jobDetails = "Required field";
  } else if (values.jobDetails.length > MAX_LENGTH_JOBDETAILS) {
    errors.jobDetails =
      "The maximum number of characters in this field is:" +
      MAX_LENGTH_JOBDETAILS;
  }

  if (!values.jobValue) {
    errors.jobValue = "Required field";
  }

  return errors;
};

class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {
        id: 0,
        idUser: 0,
        jobName: "",
        jobDetails: "",
        jobValue: 0,
        jobCreateDate: null,
        jobFinishDate: null,
        jobTimer: 0,
        playing: false,
        lastStartDate: null,
        lastPauseDate: null,
        expectedDateEnd: null,
      },
    };
  }

  onChange = (event) => {
    this.setState((prevState) => ({
      job: {
        ...prevState.job,
        [event.target.name]: event.target.value,
      },
    }));
  };

  handleClickConfirm = () => {
    return new Promise((resolve, reject) => {
      saveJob(this.state.job)
        .then((result) => {
          this.props.showAlert({
            message: "Job was created successfully!",
            options: {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "center" },
            },
          });
          this.props.save();
          this.props.closeModal();
          resolve();
        })
        .catch((err) => {
          this.props.showAlert({
            message: err.message,
            options: {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
            },
          });
          reject();
        });
    });
  };

  handleClickCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { handleSubmit, classes, fullScreen, submitting } = this.props;

    return (
      <EditDialog
        submitting={submitting}
        titulo={"Create Job"}
        handleClickConfirm={handleSubmit(this.handleClickConfirm)}
        handleClickCancel={this.handleClickCancel}
      >
        <Field
          variant="outlined"
          autoFocus
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="jobName"
          component={renderTextField}
          label="Name"
          autoComplete="jobName"
        />

        <Field
          variant="outlined"
          multiline
          rows={5}
          variant="outlined"
          autoFocus
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="jobDetails"
          component={renderTextField}
          label="Details"
          autoComplete="jobDetails"
        />

        <Field
          variant="outlined"
          autoFocus
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="jobValue"
          component={renderTextField}
          label="Value"
          autoComplete="jobValue"
        />
      </EditDialog>
    );
  }
}

CreateJob.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appState: state.appState,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert, closeModal }, dispatch);
}

export default withMobileDialog()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withStyles(styles)(
      reduxForm({
        form: "CreateJobForm",
        validate,
      })(CreateJob)
    )
  )
);

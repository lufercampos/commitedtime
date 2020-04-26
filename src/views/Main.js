import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { openModal, setserverCurrentTimer } from "../store/actions/AppAction";
import CreateJob from "../views/CreateJob";
import { getAllJobs } from "../services/JobService";
import JobCard from "../components/JobCard";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },

  filters: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

const URL = "ws://localhost:8080/api-time/timer";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, jobs: [] };
  }

  ws = new WebSocket(URL);

  getServerTime = () => {
    this.ws.send("getTimer");
  };

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
      this.timerID = setInterval(() => this.getServerTime(), 100);
    };

    this.ws.onmessage = (evt) => {
      this.props.setserverCurrentTimer(parseInt(evt.data));
      //console.log(evt.data);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
    };

    this.request();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  request = () => {
    getAllJobs()
      .then((result) => {
        this.setState({ jobs: result.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  openModalCreateJob = () => {
    this.props.openModal(CreateJob, {
      save: this.request,
    });
  };

  handleExpandClick = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Toolbar variant="dense">
              <div className={classes.sectionDesktop}>
                <Button
                  onClick={this.openModalCreateJob}
                  color="primary"
                  className={classes.actionsButton}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  create job
                </Button>
                <Button
                  color="primary"
                  className={classes.actionsButton}
                  startIcon={<PeopleOutlineIcon />}
                >
                  take on task
                </Button>
              </div>

              <div className={classes.sectionMobile}>
                <Tooltip title="create job">
                  <IconButton
                    onClick={this.openModalCreateJob}
                    className={classes.actionsButton}
                    aria-label="Create Job"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="take on task">
                  <IconButton
                    className={classes.actionsButton}
                    aria-label="take on task"
                  >
                    <PeopleOutlineIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.grow} />
              {/*
              <div className={classes.filters}>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" disabled color="primary">
                  <DeleteIcon />
                </IconButton>
                <IconButton color="secondary" aria-label="add an alarm">
                  <AlarmIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </div>
             */}
            </Toolbar>
          </Grid>

          {this.state.jobs.map((job) => (
            <Grid key={job.id} item xs={12}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openModal, setserverCurrentTimer }, dispatch);
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Main));

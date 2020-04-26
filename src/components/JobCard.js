import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { showAlert } from "../store/actions/AppAction";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { setJobEvent } from "../services/JobService";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";

var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

const styles = (theme) => ({
  root: { flexGrow: 1 },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  actionsButton: {
    marginRight: theme.spacing(2),
  },
});

class JobCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuJobOpen: false,
      anchorEl: null,
      expanded: false,
      playing: false,
      startDate: null,
      pauseDate: null,
      jobTimer: 0,
      timer: 0,
      finish: false,
    };
  }

  componentDidMount() {
    this.setState(
      (prevState) => ({
        timer: this.props.job.jobTimer,
        jobTimer: this.props.job.jobTimer,
        playing: this.props.job.playing,
        startDate: this.props.job.lastStartDate,
        finish: this.props.job.jobFinishDate !== null,
      }),
      () => {
        if (this.state.playing && !this.state.finish) {
          this.timerID = setInterval(() => this.setTimer(), 100);
        } else {
          clearInterval(this.timerID);
        }
      }
    );
  }

  setTimer = () => {
    let now = moment(this.props.serverCurrentTimer);
    let end = moment(this.state.startDate);
    let duration = moment.duration(now.diff(end));

    this.setState((prevState) => ({
      timer: moment(this.state.jobTimer)
        .add(duration.asMilliseconds(), "milliseconds")
        .utc()
        .valueOf(),
    }));
  };

  finishJob = () => {
    this.setState({ finish: true }, () => {
      this.setJob();
    });
  };

  setJob = () => {
    let job = {
      ...this.props.job,
      lastPauseDate: this.state.playing
        ? this.props.serverCurrentTimer
        : this.state.pauseDate,
      lastStartDate: !this.state.playing
        ? this.props.serverCurrentTimer
        : this.state.startDate,

      jobTimer: this.state.timer,
      playing: this.state.playing,
      jobFinishDate: this.state.finish ? this.props.serverCurrentTimer : null,
    };

    setJobEvent(job)
      .then((result) => {
        this.setState(
          {
            playing: result.data.playing,
            startDate: result.data.lastStartDate,
            pauseDate: result.data.lastPauseDate,
            jobTimer: result.data.jobTimer,
            timer: result.data.jobTimer,
            finish: result.data.jobFinishDate != null,
          },
          () => {
            if (this.state.playing) {
              this.timerID = setInterval(() => this.setTimer(), 100);
            } else {
              if (this.state.finish) {
                this.props.showAlert({
                  message: "The job was successfully completed!",
                  options: {
                    variant: "success",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                  },
                });
              }
              clearInterval(this.timerID);
            }
          }
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  handleExpandClick = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  handleMenuJobClose = () => {
    this.setState({ anchorEl: null, isMenuJobOpen: false });
  };

  handleMenuJobOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget, isMenuJobOpen: true });
  };

  render() {
    const { classes, job } = this.props;

    return job && Object.keys(job).length > 0 && job.id > 0 ? (
      <Card elevation={10} className={classes.root}>
        <Menu
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id="menuJob"
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.isMenuJobOpen}
          onClose={this.handleMenuJobClose}
        >
          <MenuItem onClick={this.handleMenuJobClose}>Remove Job</MenuItem>
        </Menu>
        <CardHeader
          avatar={<WorkOutlineIcon />}
          action={
            <IconButton
              aria-label="show more"
              aria-controls="menuJob"
              aria-haspopup="true"
              onClick={this.handleMenuJobOpen}
            >
              <MoreVertIcon />
            </IconButton>
          }
          titleTypographyProps={{ variant: "title" }}
          subheader={job.jobName}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography
                    style={{
                      color: this.state.playing
                        ? "#032399b8"
                        : this.state.finish
                        ? "#037611"
                        : "#c02929f5",
                    }}
                    variant="h3"
                  >
                    {moment.duration.format(
                      [moment.duration(this.state.timer, "millisecond")],
                      "HH:mm:ss "
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    {moment.duration.format(
                      [moment.duration(this.state.timer, "millisecond")],
                      "H [hours], m [minutes], s [seconds]"
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(job.jobValue) + " per hour"}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    {"You earned " +
                      new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      }).format(
                        job.jobValue *
                          moment
                            .duration(this.state.timer, "millisecond")
                            .asHours()
                      ) +
                      " in this job"}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  {!this.state.finish && (
                    <IconButton onClick={this.setJob} aria-label="play job">
                      {this.state.playing ? (
                        <Tooltip title="Pause Job">
                          <PauseCircleOutlineIcon
                            style={{ fontSize: "5.1875rem" }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Start Job">
                          <PlayCircleOutlineIcon
                            style={{ fontSize: "5.1875rem", color: "#15d146" }}
                          />
                        </Tooltip>
                      )}
                    </IconButton>
                  )}

                  {this.state.finish ? (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <CheckCircleOutlineIcon
                          style={{
                            fontSize: "5.1875rem",
                            color: this.state.finish ? "#15d146" : null,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2" component="p">
                          Job finished!
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <Tooltip title="Finish the Job">
                      <IconButton
                        onClick={this.finishJob}
                        aria-label="finish job"
                      >
                        <CheckCircleOutlineIcon
                          style={{
                            fontSize: "5.1875rem",
                            color: this.state.finish ? "#15d146" : null,
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />

            <Grid item xs={7}>
              <List className={classes.root}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Job description"
                    secondary={job.jobDetails}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ) : (
      <div />
    );
  }
}

JobCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  serverCurrentTimer: state.appState.serverCurrentTimer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(JobCard));

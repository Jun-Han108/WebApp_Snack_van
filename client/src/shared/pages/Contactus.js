import React from "react";
// import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Contactus() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      {/* Hero unit */}
      <div className={classes.heroContent} style={{height:"91vh"}}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            If you require support from our team, please call us, Monday to
            Friday, 8:00am - 8:00pm (AEST) or Saturday, 9am - 2pm (AEST) on{" "}
            <a href="tel:1300 000 000">1300 000 000</a> OR{" "}
            <a href="tel:+61 3 0000 0000">+61 3 0000 0000</a> (outside of
            Australia)
          </Typography>
          {/* <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Main call to action
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Secondary action
                </Button>
              </Grid>
            </Grid>
          </div> */}
        </Container>
      </div>
    </React.Fragment>
  );
}

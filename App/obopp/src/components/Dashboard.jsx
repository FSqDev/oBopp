import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CameraCapture1 from './CameraCapture1';
import CameraCapture2 from './CameraCapture2';
import CameraCapture3 from './CameraCapture3';
import CameraCapture4 from './CameraCapture4';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          oBopp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },

}));

export default function Dashboard() {
    const classes = useStyles;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightCameraPaper = clsx(classes.paper, classes.fixedHeightCamera);

    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* CameraCapture1 */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={fixedHeightCameraPaper}>
                <CameraCapture1 />
              </Paper>
            </Grid>
            {/* CameraCapture2 */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={fixedHeightCameraPaper}>
                <CameraCapture2 />
              </Paper>
            </Grid>
            {/* CameraCapture3 */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={fixedHeightCameraPaper}>
                <CameraCapture3 />
              </Paper>
            </Grid>
            {/* CameraCapture4 */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={fixedHeightCameraPaper}>
                <CameraCapture4 />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
}
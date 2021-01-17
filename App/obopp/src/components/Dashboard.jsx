import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Events from './Events';
import CameraCapture from './CameraCapture';
import Title from './Title';
import Cookies from 'js-cookie';
import { getCameras } from '../actions/actions.js'

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
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },

}));

export default function Dashboard() {
    const classes = useStyles;

    const [cameras, setCameras] = useState([]);
    useEffect(() => {
      getCameras(Cookies.get('user-id')).then(function(result) {
        setCameras(result.cams);
      })
    }, [])

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightCameraPaper = clsx(classes.paper, classes.fixedHeightCamera);

    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {cameras.map((socketID) => {
              return (
                <Grid item xs={12} md={4} lg={6}>
                  <Title>Camera ID: {socketID}</Title>
                  <Paper className={fixedHeightCameraPaper}>
                    <CameraCapture id={socketID} key={socketID}/>
                  </Paper>
                </Grid>
              )
            })}
            {/* Recent Events */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Events />
              </Paper>
            </Grid>
            {/* Chart */}
            {/* <Grid item xs={12} md={4} lg={12}>
              <Paper className={fixedHeightCameraPaper}>
                <Chart />
              </Paper>
            </Grid> */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
}
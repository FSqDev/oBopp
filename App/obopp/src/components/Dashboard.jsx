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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';import Drawer from '@material-ui/core/Drawer';

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
    root: {
      flexGrow: 1,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(10),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      margin: 'auto',
    },
    card: {
      padding: theme.spacing.unit,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      margin: 'auto',
    },
    fixedHeight: {
      height: 240,
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
    const fixedHeightCard = clsx(classes.card, classes.fixedHeight);
    const fixedHeightCameraPaper = clsx(classes.paper, classes.fixedHeightCamera);

    return (
      <main className={classes.content}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            {cameras.map((socketID) => {
              return(
                <Grid>
                  <Title>Camera ID: {socketID}</Title>
                  <Card className={classes.root} >
                    <CardContent>
                      <CameraCapture id={socketID} key={socketID}/>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        {/* Recent Events */}
        <Grid item xs={12}>
          <Grid item xs container direction="column" spacing={16}>
            <Card className={classes.root}>
              <CardContent>
                <Events />
              </CardContent>
            </Card>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </main>
    );
}
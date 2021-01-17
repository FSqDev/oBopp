import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Events from './Events';
import CameraCapture from './CameraCapture';
import Cookies from 'js-cookie';
import { getCameras } from '../actions/actions.js'
import { getUserEvents } from "../actions/events.js"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent';
import './dashboard.css';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://omfgdogs.com/">
          oBopp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

    const useStyles = makeStyles((theme) => ({
    root: {
      flex: 0

    },

    container: {
      paddingLeft: theme.spacing(4),
    },
    card: {
      padding: theme.spacing(4),
      display: 'flex',
      overflow: 'auto',
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

    const [events, setEvents] = useState([]);
    useEffect(() => {
      getUserEvents(Cookies.get('user-id')).then(function(result) {
        setEvents(result.events);
      })
    }, [])

    // const fixedHeightCard = clsx(classes.card, classes.fixedHeight);
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <main className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container >
            {cameras.map((socketID, index) => {
              return(
                  <Grid item xs={6} lg={6} md={4}>
                    <Card className={classes.root} >
                      <CardContent>
                        <h2>Camera {index+1}</h2>
                        <CameraCapture id={socketID} key={socketID}/>
                        < Typography 
                        color='textSecondary' 
                        variant='body2'
                        align='center'>
                          Camera ID: {socketID}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
              )
            })}
          </Grid>
        </Grid>
        {/* Recent Events */}
        <Grid container spacing ={2} id="event">
          <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Events eventList={events}/>
                </CardContent>
              </Card>
          </Grid>
        </Grid>

        <Card className={classes.root} id="dog">
          <CardActionArea>
          <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="540"
              image="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg"
              title="Contemplative Reptile"
              padding='10'
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Dying?
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Call 911
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
      </Card>
            <Box pt={4}>
              <Copyright />
            </Box>
      </main>
    );
}
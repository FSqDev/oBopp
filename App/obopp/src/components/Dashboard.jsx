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
        getCameras(Cookies.get('user-id')).then(function (result) {
            setCameras(result.cams);
        })
    }, [])

    const [userEvents, setUserEvents] = useState([]);
    useEffect(() => {
        getUserEvents(Cookies.get('user-id')).then(function (result) {
            setUserEvents(result.events);
        })
    }, [])

    // const fixedHeightCard = clsx(classes.card, classes.fixedHeight);
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <main className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm container >
                    {cameras.map((socketID, index) => {
                        return (
                            <Grid item xs={6} lg={6} md={4}>
                                <Card className={classes.root} >
                                    <CardContent>
                                        <h2>Camera {index + 1}</h2>
                                        <CameraCapture id={socketID} key={socketID} />
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
            <Grid container spacing={2} id="event">
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Events eventList={userEvents} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box pt={4}>
                <Copyright />
            </Box>
        </main>
    );
}
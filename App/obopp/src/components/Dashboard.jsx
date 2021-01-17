import React from 'react';
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
import CssBaseline from '@material-ui/core/CssBaseline';


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

  const drawerWidth = 240;

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
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      margin: 'auto',
    },
    fixedHeight: {
      height: 240,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

export default function Dashboard() {
    const classes = useStyles;
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const [cameras, setCameras] = [];
    const loadCameras = async (e) => {
        e.preventDefault()
        try {
          await getCameras(Cookies.get('user-id'))
          .then((resp) => {
            console.log(resp);
          })
        } catch (e) {
          console.log(e.message);
        }
      }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightCard = clsx(classes.card, classes.fixedHeight);
    const fixedHeightCameraPaper = clsx(classes.paper, classes.fixedHeightCamera);

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* CameraCapture1 */}
              <Grid item xs={12} md={4} lg={6}>
                <Title>Camera Capture 1</Title>
                <Card className={classes.root}>
                <CardContent>
                    <CameraCapture />
                  </CardContent>                </Card>
              </Grid>
              {/* CameraCapture2 */}
              <Grid item xs={12} md={4} lg={6}>
                <Title>Camera Capture 2</Title>
                <Card className={classes.root}>
                <CardContent>
                    <CameraCapture />
                  </CardContent>                </Card>
              </Grid>
              {/* CameraCapture3 */}
              <Grid item xs={12} md={4} lg={6}>
                <Title>Camera Capture 3</Title>
                <Card className={classes.root}>
                <CardContent>
                    <CameraCapture />
                  </CardContent>                </Card>
              </Grid>
              {/* CameraCapture4 */}
              <Grid item xs={12} md={4} lg={6}>
                <Title>Camera Capture 4</Title>
                <Card className={classes.root}>
                  <CardContent>
                    <CameraCapture />
                  </CardContent>
                </Card>
              </Grid>
              {/* Recent Events */}
              <Grid item xs={12}>
                <Grid item xs container direction="column" spacing={2}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Events />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
          </main>
        </Paper>
      </div>
    );
}
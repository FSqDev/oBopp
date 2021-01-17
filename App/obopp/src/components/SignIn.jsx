import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../actions/auth';
import Cookies from 'js-cookie';
import Particles from 'react-particles-js';
import './signin.css';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const login = async (e) => {
    e.preventDefault()
    try {
      await loginUser({
        "email": email,
        "password": password
      }).then((resp) => {
        console.log(resp.id);
        Cookies.set('user-id', resp.id)
        history.replace("/")
        window.location.reload(false)
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
    <Particles id="particles"
                params={
                  {
                    "autoPlay": true,
                    "background": {
                      "color": {
                        "value": "#ffffff"
                      },
                      "image": "",
                      "position": "",
                      "repeat": "",
                      "size": "",
                      "opacity": 1
                    },
                    "backgroundMask": {
                      "composite": "destination-out",
                      "cover": {
                        "color": {
                          "value": "#995c5c"
                        },
                        "opacity": 1
                      },
                      "enable": false
                    },
                    "backgroundMode": {
                      "enable": false,
                      "zIndex": -1
                    },
                    "detectRetina": true,
                    "fpsLimit": 60,
                    "infection": {
                      "cure": false,
                      "delay": 0,
                      "enable": false,
                      "infections": 0,
                      "stages": []
                    },
                    "interactivity": {
                      "detectsOn": "window",
                      "events": {
                        "onClick": {
                          "enable": true,
                          "mode": "bubble"
                        },
                        "onDiv": {
                          "selectors": [],
                          "enable": false,
                          "mode": [],
                          "type": "circle"
                        },
                        "onHover": {
                          "enable": true,
                          "mode": "grab",
                          "parallax": {
                            "enable": true,
                            "force": 50,
                            "smooth": 10
                          }
                        },
                        "resize": true
                      },
                      "modes": {
                        "attract": {
                          "distance": 200,
                          "duration": 0.4,
                          "speed": 1
                        },
                        "bounce": {
                          "distance": 200
                        },
                        "bubble": {
                          "distance": 200,
                          "duration": 0.4
                        },
                        "connect": {
                          "distance": 80,
                          "links": {
                            "opacity": 0.5
                          },
                          "radius": 60
                        },
                        "grab": {
                          "distance": 200,
                          "links": {
                            "blink": false,
                            "consent": false,
                            "opacity": 1
                          }
                        },
                        "light": {
                          "area": {
                            "gradient": {
                              "start": {
                                "value": "#ffffff"
                              },
                              "stop": {
                                "value": "#000000"
                              }
                            },
                            "radius": 1000
                          },
                          "shadow": {
                            "color": {
                              "value": "#000000"
                            },
                            "length": 2000
                          }
                        },
                        "push": {
                          "quantity": 4
                        },
                        "remove": {
                          "quantity": 2
                        },
                        "repulse": {
                          "distance": 200,
                          "duration": 0.4,
                          "speed": 1
                        },
                        "slow": {
                          "factor": 3,
                          "radius": 200
                        },
                        "trail": {
                          "delay": 0.005,
                          "quantity": 5,
                          "particles": {
                            "color": {
                              "value": "#ff0000",
                              "animation": {
                                "enable": true,
                                "speed": 400,
                                "sync": true
                              }
                            },
                            "collisions": {
                              "enable": false,
                              "bounce": {
                                "horizontal": {
                                  "random": {}
                                },
                                "vertical": {
                                  "random": {}
                                }
                              }
                            },
                            "links": {
                              "enable": false,
                              "shadow": {},
                              "triangles": {}
                            },
                            "move": {
                              "outMode": "destroy",
                              "speed": 5,
                              "angle": {},
                              "attract": {
                                "rotate": {}
                              },
                              "gravity": {},
                              "noise": {
                                "delay": {
                                  "random": {}
                                }
                              },
                              "outModes": {},
                              "trail": {}
                            },
                            "size": {
                              "value": 5,
                              "animation": {
                                "enable": true,
                                "speed": 5,
                                "minimumValue": 1,
                                "sync": true,
                                "startValue": "min",
                                "destroy": "max"
                              },
                              "random": {}
                            },
                            "bounce": {
                              "horizontal": {
                                "random": {}
                              },
                              "vertical": {
                                "random": {}
                              }
                            },
                            "life": {
                              "delay": {
                                "random": {}
                              },
                              "duration": {
                                "random": {}
                              }
                            },
                            "number": {
                              "density": {}
                            },
                            "opacity": {
                              "animation": {},
                              "random": {}
                            },
                            "rotate": {
                              "animation": {}
                            },
                            "shadow": {
                              "offset": {}
                            },
                            "shape": {},
                            "stroke": {
                              "color": {
                                "value": "",
                                "animation": {
                                  "enable": false,
                                  "speed": 0,
                                  "sync": false
                                }
                              }
                            },
                            "twinkle": {
                              "lines": {},
                              "particles": {}
                            }
                          }
                        }
                      }
                    },
                    "manualParticles": [],
                    "motion": {
                      "disable": true,
                      "reduce": {
                        "factor": 10,
                        "value": true
                      }
                    },
                    "particles": {
                      "bounce": {
                        "horizontal": {
                          "random": {
                            "enable": false,
                            "minimumValue": 0.1
                          },
                          "value": 1
                        },
                        "vertical": {
                          "random": {
                            "enable": false,
                            "minimumValue": 0.1
                          },
                          "value": 2
                        }
                      },
                      "collisions": {
                        "bounce": {
                          "horizontal": {
                            "random": {
                              "enable": false,
                              "minimumValue": 0.1
                            },
                            "value": 1
                          },
                          "vertical": {
                            "random": {
                              "enable": false,
                              "minimumValue": 0.1
                            },
                            "value": 0
                          }
                        },
                        "enable": false,
                        "mode": "bounce"
                      },
                      "color": {
                        "value": "#495dc1",
                        "animation": {
                          "enable": false,
                          "speed": 50,
                          "sync": false
                        }
                      },
                      "life": {
                        "count": 0,
                        "delay": {
                          "random": {
                            "enable": false,
                            "minimumValue": 0
                          },
                          "value": 0,
                          "sync": false
                        },
                        "duration": {
                          "random": {
                            "enable": false,
                            "minimumValue": 0.0001
                          },
                          "value": 0,
                          "sync": false
                        }
                      },
                      "links": {
                        "blink": false,
                        "color": {
                          "value": "random"
                        },
                        "consent": false,
                        "distance": 100,
                        "enable": true,
                        "frequency": 1,
                        "opacity": 1,
                        "shadow": {
                          "blur": 5,
                          "color": {
                            "value": "#00ff00"
                          },
                          "enable": false
                        },
                        "triangles": {
                          "enable": false,
                          "frequency": 1
                        },
                        "width": 1,
                        "warp": false
                      },
                      "move": {
                        "angle": {
                          "offset": 45,
                          "value": 90
                        },
                        "attract": {
                          "enable": false,
                          "rotate": {
                            "x": 3000,
                            "y": 3000
                          }
                        },
                        "direction": "none",
                        "distance": 0,
                        "enable": true,
                        "gravity": {
                          "acceleration": 9.81,
                          "enable": false,
                          "maxSpeed": 50
                        },
                        "noise": {
                          "delay": {
                            "random": {
                              "enable": false,
                              "minimumValue": 0
                            },
                            "value": 0
                          },
                          "enable": false
                        },
                        "outModes": {
                          "default": "out"
                        },
                        "random": false,
                        "size": false,
                        "speed": 2,
                        "straight": false,
                        "trail": {
                          "enable": false,
                          "length": 10,
                          "fillColor": {
                            "value": "#000000"
                          }
                        },
                        "vibrate": false,
                        "warp": false
                      },
                      "number": {
                        "density": {
                          "enable": true,
                          "area": 800,
                          "factor": 1000
                        },
                        "limit": 0,
                        "value": 100
                      },
                      "opacity": {
                        "random": {
                          "enable": true,
                          "minimumValue": 0.3
                        },
                        "value": 0.8,
                        "animation": {
                          "enable": true,
                          "minimumValue": 0.3,
                          "speed": 0.5,
                          "sync": false
                        }
                      },
                      "reduceDuplicates": false,
                      "rotate": {
                        "random": {
                          "enable": false,
                          "minimumValue": 0
                        },
                        "value": 0,
                        "animation": {
                          "enable": false,
                          "speed": 0,
                          "sync": false
                        },
                        "direction": "clockwise",
                        "path": false
                      },
                      "shadow": {
                        "blur": 100,
                        "color": {
                          "value": "#000000"
                        },
                        "enable": false,
                        "offset": {
                          "x": 0,
                          "y": 0
                        }
                      },
                      "shape": {
                        "options": {},
                        "type": "circle"
                      },
                      "size": {
                        "random": {
                          "enable": true,
                          "minimumValue": 1
                        },
                        "value": 3,
                        "animation": {
                          "destroy": "none",
                          "enable": true,
                          "minimumValue": 1,
                          "speed": 3,
                          "startValue": "max",
                          "sync": false
                        }
                      },
                      "stroke": {
                        "width": 0,
                        "color": {
                          "value": "",
                          "animation": {
                            "enable": false,
                            "speed": 0,
                            "sync": false
                          }
                        }
                      },
                      "twinkle": {
                        "lines": {
                          "enable": false,
                          "frequency": 0.05,
                          "opacity": 1,
                          "color": {
                            "value": "#8680db"
                          }
                        },
                        "particles": {
                          "enable": false,
                          "frequency": 0.05,
                          "opacity": 1
                        }
                      }
                    },
                    "pauseOnBlur": true,
                    "pauseOnOutsideViewport": false,
                    "themes": []
                  }
                  
                } />
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <img src='https://media.discordapp.net/attachments/799353146060570734/800322985764061184/dchendurant.png' id="logo"/>
      <div className={classes.paper}  id="form">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}
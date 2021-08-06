// React Component
import React, {useState} from 'react'
import {Route, Link} from 'react-router-dom'
// Material-UI Component
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
// FontAwesome Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
// CSS
import './App.css';

// Material-UI customizing
const useStyles = makeStyles((theme) => ({
  nav: {
    flexGrow: 1,
  },
  card: {
    width: 300,
    margin: theme.spacing(7)
  },
  detail: {
    margin: theme.spacing(6)
  }
}));

function App() {
  // For summary animation
  let [summary, summaryState] = useState(true)
  // For Material-UI customizing
  const classes = useStyles();

  return (
    <div className="App">
  
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.nav}>
            <Link to='/' class="nav-link"><FontAwesomeIcon icon={faBook} transform="left-7"/>Bookipedia</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* home */}
      <Route path='/' exact>
        <Grid 
          container 
          spacing={2}
          direction='row'
        >
          <Grid item xs={3}>
            <Link to='/detail' class="nav-link">
              <Box className="card">
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image="./logo.svg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        TITLE
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        AUTHOR
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        출간연도
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Route>

      {/* Detail */}
      <Route path='/detail' exact>
        <Grid container spacing={2} className={classes.detail}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="/logo.svg"
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography gutterBottom variant="h5" component="h2">
              TITLE
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              AUTHOR
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              출간연도
            </Typography>
            <Typography className="detail-summary-hidden" gutterBottom variant="h5" component="h2" onClick={(e) => {
              summaryState(!summary)
              if (summary === true) {
                e.target.classList.replace("detail-summary-hidden", "detail-summary")
              } else {
                e.target.classList.replace("detail-summary", "detail-summary-hidden")
              }
              
            }}>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              판매처
            </Typography>
          </Grid>
        </Grid>
      </Route>

      
    </div>
  );
}

export default App;


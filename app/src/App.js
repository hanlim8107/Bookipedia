// React Component
import React, {useState, useEffect} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
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
// Axios
import axios from 'axios'
// xml2json
const convert = require('xml-js')

// For Material-UI customizing
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
  // For UI Style
  const classes = useStyles();
  
  return (
    <div className="App">
  
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.nav}>
            <Link to='/' className="nav-link"><FontAwesomeIcon icon={faBook} transform="left-7"/>Bookipedia</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/detail/:isbn' component={Detail}/>
      </Switch>

    </div>
  );
}

function Home() {
  // For UI Style
  const classes = useStyles();

  // For homepage bookdata rendering
  let [data, setData] = useState([])

  // set home page book data
  useEffect(() => {
    axios.get('/api/v1/search/book_adv.xml', {
      params: {
        display: 40,
        start: 1,
        d_auth: '이외수'
      },
      headers: {
        'X-Naver-Client-Id': 'QjlAszdDPfT3qjGeEtvD',
        'X-Naver-Client-Secret': 'UhuhXpfzTw'
      }
    })
    .then((res) => {
      var bookApi = convert.xml2js(res.data, {compact:true, spaces: 4})
      setData(bookApi.rss.channel.item)
    })
    .catch((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <Grid 
      container 
      spacing={2}
      direction='row'
    > 
      {
        data.length !== 0 
        ? data.map((data) => {
            

            return (
              <Grid item xs={3}>
                <Link className="nav-link" to={`/detail/${data.isbn._text}`}>
                  <Box className="card">
                    <Card className={classes.card}>
                      <CardActionArea>
                          <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="140"
                              image={data.image._text}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {data.title._text}
                              </Typography>
                              <Typography gutterBottom variant="h5" component="h2">
                                {data.author._text}
                              </Typography>
                              <Typography gutterBottom variant="h5" component="h2">
                                {data.pubdate._text}
                              </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                  </Box>
                </Link>
              </Grid>
            )
        })
        : null
      }
    </Grid>
  )
}

function Detail({match}) {
  // For UI Style
  const classes = useStyles();

  // For summary animation
  let [summary, summaryState] = useState(true)

  // For detailpage bookdata rendering

  let [detailData, setDetailData] = useState([])
  useEffect(() => {
    axios.get('/api/v1/search/book_adv.xml', {
      params: {
        display: 40,
        start: 1,
        d_isbn: match.params.isbn
      },
      headers: {
        'X-Naver-Client-Id': 'QjlAszdDPfT3qjGeEtvD',
        'X-Naver-Client-Secret': 'UhuhXpfzTw'
      }
    })
    .then((res) => {
      let bookApi = convert.xml2js(res.data, {compact:true, spaces: 4})
      setDetailData(bookApi.rss.channel.item)
    })
    .catch((res) => {
      console.log(res.data)
    })
  }, [])

  return (
      <div>
      {
        detailData.length !== 0
        ? <Grid container spacing={2} className={classes.detail}>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={detailData.image._text}
                title="Contemplative Reptile"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography gutterBottom variant="h5" component="h2">
                {detailData.title._text}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {detailData.author._text}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {detailData.pubdate._text}
              </Typography>
              <Typography className="detail-summary-hidden" gutterBottom variant="h5" component="h2" onClick={(e) => {
                summaryState(!summary)
                if (summary === true) {
                  e.target.classList.replace("detail-summary-hidden", "detail-summary")
                } else {
                  e.target.classList.replace("detail-summary", "detail-summary-hidden")
                }
                
              }}>
                {detailData.description._text}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {detailData.publisher._text}
              </Typography>
            </Grid>
          </Grid>
        : null
      }
    </div>
  )
}

export default App;


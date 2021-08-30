// React Component
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import { KeepAlive } from 'react-keep-alive';
// import SearchInput Conponent
import {SearchInput} from './Container/SearchContainer'
// import Home Component
import Home from './Container/HomeCardContainer'
// import Detail Component
import Detail from './Container/DetailCardContainer'
// import Nav Component
import NavView from './View/NavView'

function App() {

  return (
    <div className="App">

      <NavView/>

      <Switch>
        <Route exact path='/'>
          <SearchInput/>
          <KeepAlive name='Home'>
            <Home/>
          </KeepAlive>
        </Route>
        <Route path='/detail/:titl' component={Detail}/>
      </Switch>

    </div>
  )

}

export default App;


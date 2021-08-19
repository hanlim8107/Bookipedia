// React Component
import React from 'react'
import {Route, Switch} from 'react-router-dom'
// import SearchInput Conponent
import {SearchInput} from './Container/SearchContainer'
// import Home Component
import Home from './Container/HomeContainer'
// import Detail Component
import Detail from './Container/DetailContainer'
// import Nav Component
import NavView from './view/NavView'

function App() {

  return (
    <div className="App">

      <NavView/>

      <Switch>
        <Route exact path='/'>
            <SearchInput/>
            <Home/>
        </Route>
        <Route path='/detail/:isbn' component={Detail}/>

      </Switch>

    </div>
  )

}

export default App;


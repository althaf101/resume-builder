import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Edit from './edit'
import View from './view'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Edit}/>
      <Route path='/edit' component={Edit}/>
      <Route path='/view' component={View}/>
    </Switch>
  </main>
)

export default Main

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Inputs from './Inputs';
import Results from './Results';

const Main = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Inputs}></Route>
            <Route exact path={'/results'} component={Results}></Route>
        </Switch>
    )
}

export default Main;
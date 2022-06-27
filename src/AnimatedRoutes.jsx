import React from "react";
import Details from './pages/Details';
import DetailsID from './pages/DetailsID';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Home from './pages/Home';
import {Route, Switch, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

const AnimatedRoutes = () => {
    const location = useLocation();
    return(
        <AnimatePresence exitBeforeEnter>
            <Route location={location} key={location.pathname}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/Details">
                        <Details />
                    </Route>
                    <Route path="/DetailsID/:ID">
                        <DetailsID />
                    </Route>
                    <Route path="/Search">
                        <Search />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Route>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
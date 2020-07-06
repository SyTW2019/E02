import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { CLoginPage } from '../components/sections/LoginPage';
import { CRegisterPage } from '../components/sections/RegisterPage';

import HomeView from '../components/sections/HomeView/HomeView';
import SearchView from '../components/sections/SearchView/SearchView';
import NewGameView from '../components/sections/NewGameView/NewGameView';
import UserProfileView from '../components/sections/UserProfileView/UserProfileVIew';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }
    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                            <Router history={history}>                                                  
                                <Switch>
                                    <Route exact path="/"> <HomeView/></Route>
                                    <Route path="/login" component={CLoginPage} />
                                    <Route path="/register" component={CRegisterPage} />
                                    <Route path="/newgame"><NewGameView /></Route>
                                    <Route path="/search"><SearchView /></Route>
                                    <Route path="/user_profile"><UserProfileView/></Route>
                                    <Route path='/noticias' component={() => { 
                                        window.location.href = 'https://vandal.elespanol.com/noticias/videojuegos'; 
                                        return null;
                                    }} />
                                    <Route path='/foro' component={() => {
                                        window.location.href = 'https://vandal.elespanol.com/foro/cgi-bin/foro.cgi';
                                        return null;
                                    }} />
                                    <Redirect from="*" to="/" />
                                </Switch>
                            </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
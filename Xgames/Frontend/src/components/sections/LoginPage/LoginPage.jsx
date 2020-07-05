import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Slider from '../../Slider/Slider';
import Layout from '../../../hoc/Layout/Layout';
import PageFooter from '../../PageFooter/PageFooter';
import { userActions } from '../../../_actions';
import classes from './LoginPage.module.css';


export class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loggedIn: false,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
            this.setState({ loggedIn: true});
        }
        event.preventDefault();
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        //const classes = useStyles();
        return (
            <div>
            <Layout>
            <Slider pageTitle={"Inicia sesión ahora mismo"}/>
            <div className={[classes.PageWrapper,classes.BgGraOne,classes.PtOneEight,classes.PbOneHun,classes.FontPoppins].join(' ')}>  
            <div className={[classes.Wrapper,classes.WrapperW].join(' ')}>
                <div className={[classes.Card,classes.CardThree].join(' ')}>
                    <div className={classes.CardHeading}></div>
                        <div className={classes.CardBody}>
                            <h2 className={classes.Title}>Sign In</h2>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={['form-group' + (submitted && !username ? ' has-error' : ''), classes.InputGroup].join(' ')}>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className={classes.InputSt} name="username" value={username} onChange={this.handleChange} />
                                        {submitted && !username &&
                                            <div className="help-block">Username is required</div>
                                        }
                                    </div>
                                    <div className={['form-group' + (submitted && !password ? ' has-error' : ''), classes.InputGroup].join(' ')}>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className={classes.InputSt} name="password" value={password} onChange={this.handleChange} />
                                        {submitted && !password &&
                                            <div className="help-block">Password is required</div>
                                        }
                                    </div>
                                    <div className={["form-group",classes.PtOnez].join(' ')}>
                                        <button type="submit" className={[classes.Btn,classes.BtnP,classes.BtnG].join(' ')}>Login</button>
                                        {loggingIn && <AutorenewIcon/>}
                                        <button className={[classes.Btn,classes.BtnP,classes.BtnG].join(' ')}><Link to="/register">Register</Link></button>
                                    </div>
                                </form>
                            </div>
                    </div>
            </div>
            </div>
            <PageFooter />
            </Layout>
            </div>
        );
    }
}

LoginPage.defaultProps = {
    login: userActions.login,
    logout: userActions.logout
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export {connectedLoginPage as CLoginPage};
//export { LoginPage as ULoginPage, connectedLoginPage as LoginPage };

//export default withStyles(styles)(HigherOrderComponent);

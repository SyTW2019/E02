import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ImagePicker from 'react-image-picker'
//import '../_constants/profile_picture/index.css';
//import { imageList } from '../_constants/profile_picture/random_profile_picture.js';
import { userActions } from '../../../_actions';
import classes from './RegisterPage.module.css';
import Slider from '../../Slider/Slider';
import Layout from '../../../hoc/Layout/Layout';
import PageFooter from '../../PageFooter/PageFooter';


import imageList from "../../../_constants/profile_picture/index";


export class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                username: '',
                email: '',
                password: '',
                email_regEx: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
                image_text: '',
                image_photo: null,
            },
            submitted: false,
            errors: false,
            error_type: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPick = this.onPick.bind(this);
    }

    onPick(image) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                image_photo : image,
            }
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;

        if(name === "name" && value !== ''){
            if(!value.match(/^[a-zA-Z]+$/)){
                this.setState({
                    errors : true,
                    error_type : 'Must have only letters',
                })
                return 'Only letters';    
            }        
        }
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.name && user.username && user.email && user.password && user.image_photo) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div>
            <Layout>
            <Slider pageTitle={"Registrate ahora mismo"}/>
            <div className={[classes.PageWrapper,classes.BgGraOne,classes.PtOneEight,classes.PbOneHun,classes.FontPoppins].join(' ')}>  
                <div className={[classes.Wrapper,classes.WrapperW].join(' ')}>
                    <div className={[classes.Card,classes.CardThree].join(' ')}>
                        <div className={classes.CardHeading}></div>
                            <div className={classes.CardBody}>
                                <h2 className={classes.Title}>Registration</h2>
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className={['form-group' + (submitted && !user.name ? ' has-error' : ''), classes.InputGroup].join(' ')}>
                                            <input placeholder="Name" minLength = "4" maxLength = "10" type="text" className={classes.InputSt} name="name" value={user.name} onChange={this.handleChange} />
                                            {submitted && !user.name &&
                                                <div className="help-block">Name is required</div>
                                            }
                                        </div>
                                        <div className={['form-group' + (submitted && !user.email ? ' has-error' : ''), classes.InputGroup].join(' ')}>
                                            <input type="email" placeholder = "Email" minLength = "7" maxLength = "25" className={classes.InputSt} name="email" value={user.email} onChange={this.handleChange} />
                                            {submitted && !user.email &&
                                                <div className="help-block">Email is required</div>
                                            }
                                        </div>
                                        <div className={['form-group' + (submitted && !user.email ? ' has-error' : ''), classes.InputGroup].join(' ')}>
                                            <input placeholder= "Username" minLength = "5" maxLength = "10" type="text" className={classes.InputSt} name="username" value={user.username} onChange={this.handleChange} />
                                            {submitted && !user.username &&
                                                <div className="help-block">Username is required</div>
                                            }
                                        </div>
                                        <div className={['form-group' + (submitted && !user.password ? ' has-error' : ''), classes.InputGroup].join(' ')}>
                                            <input placeholder="Password( 8 character min)" minLength = "8" maxLength = "20" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" type="password" className={classes.InputSt} name="password" value={user.password} onChange={this.handleChange} />
                                            {submitted && !user.password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>

                                        <div className= {'form-group' + (submitted && !user.image_photo ? ' has-error' : '')}>
                                            <ImagePicker className={classes.Image}
                                                images={imageList.map((image, i) => ({src: image, value: i+1,}))}                      //save title or path of picture
                                                onPick={this.onPick}
                                            />
                                            {submitted && !user.image_photo && <div className="help-block">Default image is required</div>}
                                            
                                        </div>

                                        <div className={["form-group",classes.PtOnez].join(' ')}>
                                            <button className={[classes.Btn,classes.BtnP,classes.BtnG].join(' ')}>Register</button>
                                            {registering && 
                                                <img alt="imagenes_de_registro" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                            <button className={[classes.Btn,classes.BtnP,classes.BtnG].join(' ')}><Link to="/login">Cancel</Link></button>
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

RegisterPage.defaultProps = {
    imageList: imageList
}


function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as CRegisterPage };
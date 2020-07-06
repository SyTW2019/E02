import React from 'react';


export class Logged extends React.Component{
    constructor(props) {
        super(props);
        this.state = {     
            userName: '',
            userUsername: '',
            userImg: '',
            userEmail: '',
            creationDate: '',
            wantedVideogames: [],
        }; 
    }
    componentDidMount = () => {
        this.getUserData();
    };

    getUserData = () => {

        const userData = JSON.parse(localStorage.getItem('user'));
        this.setState({
            userName: userData.name,
            userUsername:userData.username,
            userImg: userData.image_photo.src,
            userEmail: userData.email,
            creationDate: userData.creationDate,
            wantedVideogames: userData.wantedVideoGames })
    };
}
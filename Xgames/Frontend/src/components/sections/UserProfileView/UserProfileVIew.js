import React from 'react';
import classes from './UserProfileView.module.css';
import Layout from '../../../hoc/Layout/Layout';



export default class NewGameView extends React.Component {
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

    componentWillMount = () => {
        document.body.style.background = "rgb(87,85,121)";
        document.body.style.background = "linear-gradient(90deg, rgba(87,85,121,1) 7%, rgba(56,56,84,1) 33%, rgba(70,157,175,1) 76%)";
    }

    componentWillUnmount = () => {
        document.body.style.background = null;
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
        }

    getStoreLogo = (name) => {

        if(name === 'MediaMarkt'){
            return 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0022/7315/brand.gif?itok=D991v9Sj';
        }
        else if(name === 'PcComponentes'){
            return 'https://s03.s3c.es/imag/_v0/770x420/e/0/2/Nuevo-Logo-PcComponentes-770.jpg';
        }
        else if(name === 'ElCorteIngles'){
            return 'https://seeklogo.com/images/E/El_Corte_Ingles-logo-93BAD68F53-seeklogo.com.png';
        }
        else{
            return 'https://asset.zcache.es/assets/graphics/z4/stores/No_Store_300_Icon.png';
        }
    }

    getCategoryLogo = (name) => {
        
        if(name === 'Xbox One'){
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1200px-Xbox_one_logo.svg.png';
        }
        else if(name === 'PS4'){
            return 'https://i.pinimg.com/originals/44/60/0a/44600a9ca52c882fa910b63b760ab8f5.png';
        }
        else if(name === 'Nintendo Switch'){
            return 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Nintendo_Switch_Logo.svg';
        }
    }


    getGameDetails = (game) => {
        return game.gameStore.map((game_, index) => (
            <div className={classes.shopDisplay}>
                <a alt='link game' href={game.gameLink[index]}><img alt='link game' src={this.getStoreLogo(game_)} width="50" height="50"></img></a>
                <p>{game.gamePrice[index]}</p>
                <img alt='juego' src={this.getCategoryLogo(game.dataCategory)}  width="50" height="50"></img>
            </div>

        ))
    }


    getListOfGames = () => {
        // eslint-disable-next-line
        this.state.wantedVideogames.map((game, index) => {
            this.getGameDetails(game)
        });
    }


    render() {
        return (
            <div>
            <Layout activePage={"/user_profile"}>
            <div className={classes.userWrapper}>
                <div className={classes.leftPart}>
                    <img src={this.state.userImg} alt="Imagen Usuario" width="100" className={classes.leftImage}/>
                    <h4 className={classes.name}>{this.state.userName}</h4>
                    <p className={classes.userName}>{this.state.userUsername}</p>

                </div>
                <div className={classes.rightPart}>
                    <div className={classes.info}>
                        <h3 className={classes.rightTitle}>Perfil Usuario</h3>
                        <div className={classes.infoData}>
                            <div className={classes.data}>
                                <h4 className={classes.tit}>Email</h4>
                                <p className={classes.par}>{this.state.userEmail}</p>
                            </div>
                            <div className={classes.data}>
                                <h4 className={classes.titDate}>Creation Date</h4>
                                <p className={classes.par}>{this.state.creationDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.wantedVideoGames}>
                        <h3 className={classes.rightTitle}>Favorite List</h3>
                        <div className={classes.wantedData}>
                        {this.getListOfGames}
                        </div>
                    </div>
                </div>
            </div>
            </Layout>
        </div>
        )
        ;
    }
}
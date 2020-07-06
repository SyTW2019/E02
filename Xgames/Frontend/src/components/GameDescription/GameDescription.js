import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './GameDescription.module.css';
import axios from 'axios';


class GameDescription extends Component {

    constructor(props) {
        super(props);
        this.state = {     
            favorite: this.props.favorite,
            userData: JSON.parse(localStorage.getItem('user')),
            gameDetails: this.props.games,
        };
        this.handleClick = this.handleClick.bind(this);
    }

      handleClick = (event) => {

        if (this.state.userData === null){
            alert('Inicia sesion para añadir juego como favorito!');
        }
        else{
            const payload = {
                gameStore: this.state.gameDetails.gameStore, 
                gameTitle: this.state.gameDetails.gameTitle,
                gamePrice: this.state.gameDetails.gamePrice,
                imageSrc: this.state.gameDetails.imageSrc,
                dataCategory: this.state.gameDetails.dataCategory,
                gameLink: this.state.gameDetails.gameLink,
                description: this.state.gameDetails.description,
            };
            console.log(payload);
            if(this.state.favorite === true){
               // from true to false check if exists and remove from db
                var index = this.state.userData.wantedVideoGames.findIndex(obj_ => obj_.gameTitle === this.state.gameDetails.gameTitle && obj_.dataCategory === this.state.gameDetails.dataCategory);
                this.state.userData.wantedVideoGames.splice(index,1);
    
            }
            else if(this.state.favorite === false){
                if((this.state.userData.wantedVideoGames.some(item => item.gameTitle === payload.gameTitle && item.dataCategory === payload.dataCategory)) === false)
                    this.state.userData.wantedVideoGames.push(payload);
            }
    
            console.log(this.state.userData);
            this.setState({
                favorite: !this.state.favorite
              });
            
            const data_payload = this.state.userData;
            axios({
                url: 'http://localhost:4000/api/save_favorite',
                method: 'POST',
                data: data_payload,
                })
                .then(() => {
                console.log('Data has been sent!');
                })
                .catch(() => {
                console.log('Internal servor error!');
                });    
                event.preventDefault(); 
        }
           
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
    modifyLink = (link) => {

        return 'http://' + link;
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

    setNotAvailable = (games) => {
        
        var games_ = games;

        if(games_.length === 0) return null;
        // eslint-disable-next-line
        ['MediaMarkt','ElCorteIngles','PcComponentes'].map(function(elem,inx) {
            if(games_.gameStore.includes(elem) === false){
                games_.gameStore.push(elem);
                games_.gamePrice.push('NA');
                games_.gameLink.push('#');
            }
        })

        return games_;
    }

    render(){
        
        const text = this.state.favorite ? 'Has puesto como favorito este juego' : 'Este juego no esta puesto como favorito';
        const label = this.state.favorite ? 'Favorito' : 'No favorito';
        var games_ = this.setNotAvailable(this.props.games);
        if(games_ == null) return null;
        return(
            <Aux>
                <a href={"javascript:window.location.href=window.location.href"} title="Close" className={classes.modalClose}>Close</a>
                <h2 className={classes.title}>{this.props.games.gameTitle}</h2>
                {this.props.games.proximamente === 1 ? <div className={classes.textBadge}>Próximamente</div> : null }
                <img
                src={this.modifyLink(this.props.games.imageSrc)}
                alt={this.props.games.gameTitle}
                width="30%"
                height="30%"
                justify = "center"
                />
                <h3 className={classes.description}> Descripción</h3>
                <span>{this.props.description}</span>
                {games_.gameStore.map((game, index) => (
                    <div className={classes.shopDisplay}>
                        <a alt='game' href={this.props.games.gameLink[index]}><img alt='game' src={this.getStoreLogo(game)} width="50" height="50"></img></a>
                        <p>{this.props.games.gamePrice[index]}</p>
                        <img alt='game' src={this.getCategoryLogo(this.props.games.dataCategory)}  width="50" height="50"></img>
                    </div>

                ))}
                <div className={classes.favoriteContainer}>
                    <button className={classes.btn} onClick={this.handleClick}>{label}</button>
                    <p>{text}</p>
                </div>
            </Aux>
        );
    }
}

export default GameDescription;
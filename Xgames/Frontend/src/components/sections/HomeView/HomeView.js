import React, {Component} from 'react';
import Slider from '../../Slider/Slider';
import { Grid } from '@material-ui/core';
import Layout from '../../../hoc/Layout/Layout';
import PageFooter from '../../PageFooter/PageFooter';
import GameCard from '../../GameCard/GameCard';
import classes from './HomeView.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Modal from '../../UI/Modal/Modal';
import GameDescription from '../../GameDescription/GameDescription';
import axios from 'axios';


class HomeView extends Component{

  constructor(props) {
    super(props);
    this.state = {  
        games: [],
        mostPopGames: [],
        playStationGames: [],
        xboxGames: [],
        nintendoGames: [],
        proxGames: [],
        filteredGames: [],
        filterValue: '',
        showDetails: 0,
        
    };
    this.getInfoHandler = this.getInfoHandler.bind(this);
    this.moreInfoCancelHandler = this.moreInfoCancelHandler.bind(this);
    this.getMostPopGames = this.getMostPopGames.bind(this);
    this.getCategoryGame = this.getCategoryGame.bind(this);
  }

  componentDidMount = () => {
    this.getGameData();
  };

    getGameData = () => {
      axios.get('http://localhost:4000/api/')
      .then( (response) =>{
        const data = response.data;
        for(var i =0;i<data.length;i++){
          data[i].index = i;
        }
        
        var excludedGames = [];
        var mostPopGames = this.getMostPopGames(data);
        excludedGames = mostPopGames;
        var playStationGames = this.getCategoryGame(data, excludedGames, 'PS4');
        excludedGames = excludedGames.concat(playStationGames);


        var xboxGames = this.getCategoryGame(data, excludedGames, 'Xbox One');
        excludedGames = excludedGames.concat(xboxGames);
        var nintendoGames = this.getCategoryGame(data, excludedGames, 'Nintendo Switch');
        excludedGames = excludedGames.concat(nintendoGames);
        var proxGames = this.getProximosGames(data, excludedGames);

        this.setState({ games:data, 
                        mostPopGames: mostPopGames,
                        playStationGames: playStationGames,
                        xboxGames: xboxGames,
                        nintendoGames: nintendoGames,
                        proxGames: proxGames
                      });
        console.log('Data received');
        
      })
      .catch( () => {
        alert('Error retrieving data');
      })
    }


    getMostPopGames = (games) => {
      if (!games.length) return null;

      var most_popular = [];
      games.sort(function(a,b) {
        if(a.gameRating < b.gameRating) { return 1; }
        else if (a.gameRating == b.gameRating) { return 0; }
        else { return -1; }
      })

        for(var i=0;i<games.length;i++){
          if(games[i].gameLink.length > 1 && games[i].proximamente == 0){
              most_popular.push(games[i]);
            }
          }
      
      var mostPopular = most_popular.slice(0, 4);
      return mostPopular;
    }

    getProximosGames = (games,excludedGames) => {

      if (!games.length) return null;

      var proxGames = []
      var found = false;
        for(var i=0;i<games.length;i++){
          if(games[i].gameLink.length > 1 && games[i].proximamente == 1){
            found = false;
            for(var j=0;j<excludedGames.length;j++){
              if(excludedGames[j].gameTitle == games[i].gameTitle && excludedGames[j].dataCategory == games[i].dataCategory){
                found = true;
              }
            }
            if(found == false){
              proxGames.push(games[i]);
            }
          }
        } 
      var proxGames = proxGames.slice(0, 4);
      return proxGames;
    }

    getCategoryGame = (games, excludedGames, cat) => {
      if (!games.length) return null;

      var category_games = []
      var found = false;
      games.sort(function(a,b) {
        if(a.gameRating < b.gameRating) { return 1; }
        else if (a.gameRating == b.gameRating) { return 0; }
        else { return -1; }
      })

      for(var i=0;i<games.length;i++){
        if(games[i].gameLink.length > 1 && games[i].proximamente == 0 && games[i].dataCategory == cat){
          found = false;
          for(var j=0;j<excludedGames.length;j++){
            if(excludedGames[j].gameTitle == games[i].gameTitle && excludedGames[j].dataCategory == games[i].dataCategory){
              found = true;
            }
          }
          if(found == false){

            category_games.push(games[i]);
          }
        }
        } 
      var category_games = category_games.slice(0, 4);
      return category_games;
    }

    displayGame = (games) => {
      
      if (!games.length) return null;

      return games.map((elem,ix) => (
        <Aux>
          <GameCard key={ix} details = {elem}
          description={this.getDescription(elem.description)} getInfo={() => this.getInfoHandler(elem._id)}/>
          <Modal show={this.state.showDetails === elem._id} modalClosed={() => this.moreInfoCancelHandler(elem._id)}>
            <GameDescription games = {elem} description={this.getDescription(elem.description)}/>
          </Modal>
        </Aux>
      ));
    };
      
    getInfoHandler = (value) => {
      this.setState({ showDetails: value });
    }

    moreInfoCancelHandler = (value) => {
      this.setState({ showDetails: 0 });
    }


    getDescription = (description) => {
      if(description.length > 100)
        description = description.substring(0, 100)  + "...";
      return description;
    }

  render(){

    return(
      <div>
      <Layout activePage={"/"}>
      <Slider pageTitle={["Bienvenido a ", <strong>X</strong>, " Games. Tu página de Videojuegos"]}/>
      <div>
      <h1 className={classes.sectionTitle}>Títulos más buscados</h1>
      <section className={classes.products}>
        {this.displayGame(this.state.mostPopGames)}
      </section>
      </div>
      <h1 className={classes.sectionTitle}>Los juegos de PS4 más populares</h1>
      <section className={classes.products}>
        {this.displayGame(this.state.playStationGames)}
      </section>
      <h1 className={classes.sectionTitle}> Los juegos de Xbox más populares</h1>
      <section className={classes.products}>
        {this.displayGame(this.state.xboxGames)}
      </section>
      <h1 className={classes.sectionTitle}> Los juegos de Nintendo Switch más populares</h1>
      <section className={classes.products}>
        {this.displayGame(this.state.nintendoGames)}
      </section>
      <h1 className={classes.sectionTitle}> Próximamente</h1>
      <section className={classes.products}>
        {this.displayGame(this.state.proxGames)}
      </section>
      <PageFooter />
      </Layout>
      </div>
    );
  }
}

export default HomeView;




import React, {Component} from 'react';
import '../../../assets/css/App.css';
import GameCard from '../../GameCard/GameCard';
import Slider from '../../Slider/Slider';
import Layout from '../../../hoc/Layout/Layout';
import PageFooter from '../../PageFooter/PageFooter';
import axios from 'axios';
import classes from './SearchView.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Modal from '../../UI/Modal/Modal';
import GameDescription from '../../GameDescription/GameDescription';

class SearchView extends Component{

  constructor(props) {
    super(props);
    this.state = {  
        games: [],
        curCategory: 'All games',
        filteredGames: [],
        sortType: 'Default',
        filterValue: '',
        showDetails: 0,
        userFavoriteGames: [],
        
    };
    this.filterCategory = this.filterCategory.bind(this);
    this.sortGames = this.sortGames.bind(this);
    this.filterValue = this.filterValue.bind(this);
    this.getInfoHandler = this.getInfoHandler.bind(this);
    this.moreInfoCancelHandler = this.moreInfoCancelHandler.bind(this);
  }

  componentDidMount = () => {
      this.getGameData();
      this.getUserData();
  };


  getUserData = () => {
    axios.get('http://localhost:4000/api/get_user')
    .then( (response) =>{
      const data = response.data;
      const current_user_data = JSON.parse(localStorage.getItem('user'));
      console.log(data);
      // check with current user logged in

      if(current_user_data !== null){
        for(var i=0;i<data.length;i++){
          if(data[i].username === current_user_data.username){
              this.setState({
                userFavoriteGames: current_user_data.wantedVideoGames,
                })
          }
      }
      console.log('Data received');
      }
      else{
        this.setState({
          userFavoriteGames: '',
        })
      }
      
    })
    .catch( () => {
      alert('Error retrieving data!');
    })
  }

   getGameData = () => {
      axios.get('http://localhost:4000/api/')
      .then( (response) =>{
        const data = response.data;
        for(var i =0;i<data.length;i++){
          data[i].index = i;
        }
        this.setState({ games:data , filteredGames: data});
        console.log('Data received');
        
      })
      .catch( () => {
        alert('Error retrieving data');
      })
    }

    getInfoHandler = (value) => {
      this.setState({ showDetails: value });
    }

    moreInfoCancelHandler = (value) => {
      this.setState({ showDetails: 0 });
    }


    checkIfGameisAlreadyFavorite = (elem) => {
      for(var i=0;i<this.state.userFavoriteGames.length;i++){
        if(elem.gameTitle === this.state.userFavoriteGames[i].gameTitle && elem.dataCategory === this.state.userFavoriteGames[i].dataCategory){
          return true;
        }
      }
      return false;
    }
    
    displayGame = (games) => {
      
      if (!games.length) return null;

      return games.map((elem,ix) => (
        <Aux>
          <GameCard key={ix} details = {elem}
          description={this.getDescription(elem.description)} getInfo={() => this.getInfoHandler(elem._id)}/>
          <Modal show={this.state.showDetails === elem._id} modalClosed={() => this.moreInfoCancelHandler(elem._id)}>
            { /* <GameDescription games = {elem} favorite={this.checkIfGameisAlreadyFavorite} description={this.getDescription(elem.description)}/> */}
            <GameDescription games = {elem} description={this.getDescription(elem.description)}/>
          </Modal>
        </Aux>
      ));
    };
    

    filterCategory = (event) => {
      if(event.target.value === 'All games')
        var filter = this.state.games;

      else
        // eslint-disable-next-line
        var filter = this.state.games.filter(elem => elem.dataCategory === event.target.value);
      
      this.setState({
        filteredGames:filter,
        curCategory: event.target.value,
      });
    }

    sortGames = (event) => {
      // sort by name

      if(event.target.value === 'Default'){
        var games_ = this.state.games;
        this.setState({
          sortType: event.target.value,
          filteredGames: games_,
        })
      }
      else{
        // eslint-disable-next-line
        var games_ = this.state.games;
      if(event.target.value === 'Name'){
        games_.sort(function(a,b){ 
          var x = a.gameTitle < b.gameTitle? -1:1;  
          return x;
      });
      this.setState({
        sortType: event.target.value,
        filteredGames: games_,
      })
      }
      else if(event.target.value === 'Category'){
        games_.sort(function(a,b){ 
          var x = a.dataCategory < b.dataCategory? -1:1;
          return x; 
      });
      this.setState({
        sortType: event.target.value,
        filteredGames: games_,
      })
      }
      }
    }

    filterValue = (event) => {
      var filter_ = event.target.value;
      const data = this.state.games;
      const filteredData = data.filter(data_ => {
        return data_.gameTitle.toLowerCase().includes(filter_.toString().toLowerCase());
      })
      this.setState({
          filterValue: filter_,
          filteredGames: filteredData,
      })
    }

    getDescription = (description) => {
      if(description.length > 100)
        description = description.substring(0, 100)  + "...";
      return description;
    }

  render(){
    return( 
      <div>
      <Layout activePage={"/search"}>
      <Slider pageTitle={'Busca tu videojuego favorito'}/>
      <nav className={classes.ProductFilter}>
      <div className={classes.sort}>
      <div class={classes.searchWrapper}>
      <input class={classes.searchInput} type="text" placeholder="Buscar" value={this.state.filterValue} onChange={this.filterValue}/>
      </div>
        <div className={classes.CollectionSort}>
          <label>Filter by:</label>
          <select value={this.state.curCategory} onChange={this.filterCategory}>
            <option value="All games">All games</option>
            <option value="PS4">PS4</option>
            <option value="Xbox One">XboxOne</option>
            <option value="Nintendo Switch">NintendoSwitch</option>
          </select>
        </div>

        <div className={classes.CollectionSort}>
          <label>Sort by:</label>
          <select value={this.state.sortType} onChange={this.sortGames}>
            <option value="Default">Default</option>
            <option value="Name">Name</option>
            <option value="Category">Category</option>
          </select>
        </div>
      </div>
    </nav>

    <section className={classes.products}>
      
        {this.displayGame(this.state.filteredGames)}
    </section>
    <PageFooter />
    </Layout>
    </div>
    )
  }
}

export default SearchView;
import React, {Component} from 'react';
import Slider from '../../Slider/Slider';
import { Grid } from '@material-ui/core';
import Layout from '../../../hoc/Layout/Layout';
import PageFooter from '../../PageFooter/PageFooter';
import GameCard from '../../GameCard/GameCard';
import classes from './HomeView.module.css';

class HomeView extends Component{

  state = {
    gameCardsData: [
      {
        "title": "Fifa 20",
        "text": "Un juego de futbol interactivo y magnifico",
        "image": "https://lh3.googleusercontent.com/tjFx_uPUU3sOZxujIupK-DHCmJwbhBzUse6c80tTSqeSLeNILqHm7xo6uaEXrEEFm-aQkvFnS5BZmZhE5CRCqTgm"
      },
      {
        "title": "Red Dead Redemption",
        "text": "Esta aventura te llevara en el periodo Western de los 1900",
        "image": "https://source.unsplash.com/user/erondu/600x400"
      },
      {
        "title": "Black Desert Online",
        "text": "Un MMORPG con mucha diversidad",
        "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
      },
    ],
  }

  /*componentWillMount() {
    this.setState({
      gameCardsData: gameCardsData
    });*/

  render(){

    return(
      <div>
      <Layout />
      <Slider />
      <Grid container direction="row" alignContent='center' alignItems='flex-start' spacing={3} >
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
          <Grid container alignContent='flex-start' justify='flex-start' alignItems='flex-start' spacing={3} >
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12} justify='center'>
            <h1>Titulos mas buscados</h1>
          </Grid>
          <Grid className={classes.CardList} container direction="row" justify="center" alignItems="center">
              {Object.keys(this.state.gameCardsData).map(key => <GameCard className={classes.CardInformation} key={key} index={key} details={this.state.gameCardsData[key]}/>)}
          </Grid>
          </Grid>
          <Grid container alignContent='flex-start' justify='flex-start' alignItems='flex-start' spacing={3} >
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12} justify='center'>
            <h1>Rebajados</h1>
          </Grid>
          <Grid className={classes.CardList} container direction="row" justify="center" alignItems="center">
              {Object.keys(this.state.gameCardsData).map(key => <GameCard className={classes.CardInformation} key={key} index={key} details={this.state.gameCardsData[key]}/>)}
          </Grid>
          </Grid>
          <Grid container alignContent='flex-start' justify='flex-start' alignItems='flex-start' spacing={3} >
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12} justify='center'>
            <h1>Proximos Lanzamientos</h1>
          </Grid>
          <Grid className={classes.CardList} container direction="row" justify="center" alignItems="center">
              {Object.keys(this.state.gameCardsData).map(key => <GameCard className={classes.CardInformation} key={key} index={key} details={this.state.gameCardsData[key]}/>)}
          </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PageFooter />
    </div>
    );
  }
}

export default HomeView;

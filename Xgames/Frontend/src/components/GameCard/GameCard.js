import React, { Component} from 'react';
import classes from './GameCard.module.css';
import CardHeader from '../CardHeader/CardHeader';
import CardBody from '../CardBody/CardBody';
import ResponsiveDialog from '../ResponsiveDialog/ResponsiveDialog';
import Modal from '../UI/Modal/Modal';
import GameDescription from '../GameDescription/GameDescription';

class GameCard extends Component {
    render() {
      return (
        
        <div className={classes.gamecard}>
          <CardHeader imageSrc={this.props.details.imageSrc}/>
          <CardBody gameTitle={this.props.details.gameTitle} description={this.props.description} dataCategory={this.props.details.dataCategory} gameRating={this.props.details.gameRating}/>
          <button className={classes.InfoButton} color="primary" onClick={this.props.getInfo}>More Info</button>
        </div>
      )
    }
}

export default GameCard;  
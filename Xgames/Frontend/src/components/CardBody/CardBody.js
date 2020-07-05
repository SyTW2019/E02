import React, { Component } from 'react';
import classes from './CardBody.module.css';
import CardButton from '../CardButton/CardButton';
import 'font-awesome/css/font-awesome.min.css';


class CardBody extends Component {
    render() {
      return (
        <div className={classes.cardBody}>
            <div className={classes.cardInformation}>
                <p className={classes.CardGameCategory}>{this.props.dataCategory}</p>
                <p className={classes.CardRating}><i class={[classes.cardStar,"fa fa-star"].join(' ')}></i>{this.props.gameRating}</p>
                <h2 className={classes.cardTitle}>{this.props.gameTitle}</h2>
          </div>
          <p className={classes.cardContent}>{this.props.description}</p>

          {/*<CardButton/>*/}
        </div>
      )
    }
}

export default CardBody;
import React, {Component} from 'react';
import classes from './CardHeader.module.css';

class CardHeader extends Component {
    render() {

      const imageSrc = this.props.imageSrc;
      var style = { 
          backgroundImage: 'url(' + 'http://' +  imageSrc + ')',
      };
      return (
        
        <header style={style} className={classes.cardHeader}>
        </header>
      )
    }
}

export default CardHeader;


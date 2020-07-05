import React, {Component} from "react";

import classes from './Slider.module.css';

class Slider extends Component {
    render(){
        return(
            <div id="slider" className="slider-big">
                <h1 className={classes.SliderHeader}>{this.props.pageTitle}</h1>
            </div>
        )  
    }
}

/*Bienvenido a <strong>X</strong> Games. Tu página de Videojuegos*/

export default Slider;
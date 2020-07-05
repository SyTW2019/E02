import React, {Component} from 'react';
import '../../../assets/css/App.css';
import GameCard from '../../GameCard/GameCard';
import Layout from '../../../hoc/Layout/Layout';
import Header from '../../Header/Header';
import Slider from '../../Slider/Slider';
import Footer from '../../Footer/Footer';
import Card from '../../Card/Card';
import { Grid } from '@material-ui/core';

class SearchView extends Component{
  state = {
    productoBackup: [
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
    text: "",
    producto: [
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
    },],
  }

  
  filter(event){
    var text = event.target.value
    const data = this.state.productoBackup
    const newData = data.filter(function(item){
        const itemData = item.title.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
    })
    this.setState({
        producto: newData,
        text: text,
    })
  }
  render(){
    return( 
      <div>
          <Layout>
            <div>
              <input class="form-control"  value={this.state.text} onChange={(text) => this.filter(text)}/>
              {this.state.producto.map( item => <GameCard key={item} details={item} producto={this.state.producto[item]}/>)}
            </div>
          </Layout>
      </div>
    )
  }
}

export default SearchView;
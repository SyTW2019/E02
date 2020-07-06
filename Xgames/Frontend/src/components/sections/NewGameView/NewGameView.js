import React from 'react';
import classes from './NewGameView.module.css';
import axios from 'axios';
import Slider from '../../Slider/Slider';
import Layout from '../../../hoc/Layout/Layout';
import PageFooter from '../../PageFooter/PageFooter';

export default class NewGameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {     
            gameStore: '',
            gameTitle: '',
            gamePrice: '',
            imageSrc: '',
            dataCategory: 'PS4',
            gameLink: '',
            description: '',
            listOfVendors: [{gameStore:'',gamePrice:'',gameLink:''}],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
    }


    handleChange = ({ target }) =>  {
      const { name, value } = target;
      this.setState({[name]: value});  
    }

    handleDropdown = (event) => {
      console.log(event.target.value);
      this.setState({
        dataCategory:event.target.value,
      });
    }

    handleSubmit = (event) => {

      if(this.state.description.length === 0){
        // eslint-disable-next-line
        this.state.description = 'Este juego no tiene ninguna descripcion';
      }


      for(var i=0;i < this.state.listOfVendors.length;i++){
        // eslint-disable-next-line
        if(this.state.listOfVendors[i].gameStore.length === 0){
          // eslint-disable-next-line
          this.state.listOfVendors[i].gameStore = 'No-Store';
        }
        if(this.state.listOfVendors[i].gameLink.length === 0){
          // eslint-disable-next-line
          this.state.listOfVendors[i].gameLink = '#';
        }
      }
      if(this.state.imageSrc.length === 0){
        // eslint-disable-next-line
        this.state.imageSrc = 'lac.entrustdatacard.com/-/media/images/video-thumbnails_images/thumb-not-available.png';
      }

      var gamePrice_ = [];
      var gameStore_ = [];
      var gameLink_ = [];

      // eslint-disable-next-line
      for(var i=0;i<this.state.listOfVendors.length;i++){
        gamePrice_.push(this.state.listOfVendors[i].gamePrice);
        gameStore_.push(this.state.listOfVendors[i].gameStore);
        gameLink_.push(this.state.listOfVendors[i].gameLink);
      }

      const payload = {
          gameStore: gameStore_, 
          gameTitle: this.state.gameTitle,
          gamePrice: gamePrice_,
          imageSrc: this.state.imageSrc,
          dataCategory: this.state.dataCategory,
          gameLink: gameLink_,
          description: this.state.description,
      };
      
      axios({
        url: 'http://localhost:4000/api/save',
        method: 'POST',
        data: payload,
     })
     .then(() => {
       console.log('Data has been sent!');
       this.resetUserInputs();
     })
     .catch(() => {
       console.log('Internal servor error!');
     });
      event.preventDefault();
    }

    resetUserInputs = () => {
      this.setState({
        gameTitle: '',
        gamePrice: '',
        description: '',
        dataCategory: '',
        imageSrc: '',
        gameStore: '',
        gameLink: '',
        listOfVendors: [{gameStore:'',gamePrice:'',gameLink:''}],
      });
    };

    createIntForm(){
      return this.state.listOfVendors.map((el, i) => 
          <div key={i}>
            <div className={classes.InputGroup}>
            <label htmlFor="gamePrice" className={classes.labelTitle}>Precio(s)(€)</label>
            <input type="text" className={classes.InputSt} name="gamePrice" value={el.gamePrice} onChange={this.handleInputChange.bind(this, i)} required="required"/>

            <label htmlFor="gameStore" className={classes.labelTitle} >Tienda(s)/Compañía(s)</label>
            <input type="text" className={classes.InputSt} name="gameStore" value={el.gameStore} onChange={this.handleInputChange.bind(this, i)}/>

            <label htmlFor="gameLink"className={classes.labelTitle} >Enlace(s) del juego</label>
            <input type="text" className={classes.InputSt} name="gameLink" value={el.gameLink} onChange={this.handleInputChange.bind(this, i)}/>
            </div>
           <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
          </div>          
      )
   }

    handleInputChange(i, event) {
      let values = [...this.state.listOfVendors];
      if(event.target.name === "gamePrice"){
        values[i].gamePrice = event.target.value;
      }
      if(event.target.name === "gameStore"){
        values[i].gameStore = event.target.value;
      }
      if(event.target.name === "gameLink"){
        values[i].gameLink = event.target.value;
      }

      this.setState({ listOfVendors: values });
    }
  
    addClick(){
      this.setState(prevState => ({ listOfVendors: [...prevState.listOfVendors, {gameStore:'',gamePrice:'',gameLink:''}]}))
    }
  
    removeClick(i){
        let values = [...this.state.listOfVendors];
        values.splice(i,1);
        this.setState({ listOfVendors: values });
    }

    
    render() {
      
      return (
      <div>
      <Layout activePage={"/newgame"}>
      <Slider pageTitle={'Añade ahora tu videojuego favorito'}/>
        <div className={[classes.PageWrapper,classes.BgGraOne,classes.PtOneEight,classes.PbOneHun,classes.FontPoppins].join(' ')}>  
            <div className={[classes.Wrapper,classes.WrapperW].join(' ')}>
                <div className={[classes.Card,classes.CardThree].join(' ')}>
                    <div className={classes.CardHeading}></div>
                        <div className={classes.CardBody}>
                            <h2 className={classes.Title}>Añadir un juego a la base de datos!</h2>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={classes.InputGroup}>
                                        <label htmlFor="gameTitle" className={classes.labelTitle}>Titulo del juego</label>
                                        <input type="text" placeholder="Ej:Need for Speed" className={classes.InputSt} name="gameTitle" value={this.state.gameTitle} onChange={this.handleChange} required="required"/>
                                    </div>
                                    <div className={classes.InputGroup}>
                                        <label htmlFor="description" className={classes.labelTitle}>Descripcion</label>
                                        <input type="text" placeholder="Ej:Este es un juego de tipo..." className={classes.InputSt} name="description" value={this.state.description} onChange={this.handleChange}/>
                                    </div>

                                    <div className={classes.InputGroup}>
                                        <label htmlFor="dataCategory" className={classes.labelTitle}>Categoria: </label>
                                        <select name="dataCategory" value={this.state.dataCategory} onChange={this.handleDropdown} required="required">
                                          <option value="PS4" className={classes.DropdownStO}>PS4</option>
                                          <option value="Xbox One" className={classes.DropdownStT}>Xbox One</option>
                                          <option value="Nintendo Switch" className={classes.DropdownStTh}>Nintendo Switch</option>
                                        </select>
                                    </div>
                                    {this.createIntForm()}        
                                    <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
                                    <div className={classes.InputGroup}>
                                        <label htmlFor="imageSrc" className={classes.labelTitle}>Direccion de la imagen del juego</label>
                                        <input type="text" className={classes.InputSt} name="imageSrc" value={this.state.imageSrc} onChange={this.handleChange}/>
                                        <img alt='direccion imagen' src={this.state.imageSrc}/>  
                                    </div>


                                    <div className={["form-group",classes.PtOnez].join(' ')}>
                                        <button type="submit" className={[classes.Btn,classes.BtnP,classes.BtnG].join(' ')}>Guardar</button>
                                    </div>
                                </form>
                            </div>
                    </div>
            </div>
            </div>
            <PageFooter />
      </Layout>
      </div>
      );
    }
  }
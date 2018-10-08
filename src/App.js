import React, { Component } from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

//import logo from './logo.svg';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'efcd035226db47089ad8ab69c87ba826'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '', 

    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);  // vzima ot ImageLinkForm i go vadi v konzolata
  }


  // to add image to after the form in FaceRecognition
  // 
  onButtonSubmit = () => {
    console.log('click');
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', 
    'https://www.sanger.ac.uk/sites/default/files/gaffney-group.jpg').then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.error(err);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}  
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition />
        <Register />
        <Signin />
      </div>
    );
  }
}

export default App;

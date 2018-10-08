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
      imageURL: '',
    }
  }

  onInputChange = (event) => {
    //console.log(event.target.value);  // vzima ot ImageLinkForm i go vadi v konzolata
    this.setState({
      input: event.target.value,    // smenq propsa na input za da mojem da pokajem v FaceRecognition komponenta
    })
  }



  
  onButtonSubmit = () => {
    //console.log('click');
    this.setState({
      imageURL: this.state.input
    });
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', //face recognition model
    this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
        <FaceRecognition imageURL={this.state.imageURL} />
        <Register />
        <Signin />
      </div>
    );
  }
}

export default App;

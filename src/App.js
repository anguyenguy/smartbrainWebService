import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'bc2ddda56725425da2ab50cffda6b00a'
});

const ParticleOptions = {
    "particles": {
        "number": {
            "value": 260,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 20,
            "random": true
        },
        "move": {
            "direction": "bottom",
            "out_mode": "out"
        },
        "line_linked": {
            "enable": false
        }
    },
    "interactivity": {
        "events": {
            "onclick": {
                "enable": true,
                "mode": "remove"
            }
        },
        "modes": {
            "remove": {
                "particles_nb": 10
            }
        }
    }
}

class App extends Component {

  constructor () {
    super();
    this.state = {
      input: '',
      box: {},
      route: 'signin',
      isSignedin: false
    }
  }

boundingBox = (data) => {
  const bound = data.outputs[0].data.regions[0].region_info.bounding_box;
  const imageToFind = document.getElementById('faceImage');
  const imageWidth = Number(imageToFind.width);
  const imageHeight = Number(imageToFind.height);
  console.log(bound);
  console.log(imageWidth, imageHeight);
  return{
    leftCol   : bound.left_col*imageWidth,
    rightCol  : imageWidth-(bound.right_col*imageWidth),
    topRow    : bound.top_row*imageHeight,
    bottomRow : imageHeight-(bound.bottom_row*imageHeight)
  }
}

solidBox = (box) => {
  this.setState({ box : box });
}

onInputChange = (events) => {
  this.setState({ input : events.target.value });
}

onButtonClick = () => {
  app.models
  .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
  .then(response => this.solidBox(this.boundingBox(response)) )
  .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if(route==='home') this.setState({isSignedin: true});
  else this.setState({isSignedin: false});
  this.setState({route:route});
}

render() {
  const {isSignedin, route, input, box} = this.state;
  return (
    <div className="App">
      <Particles className='particles' params={ParticleOptions} />
      <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin}/>
      { route ==='signin'
         ?<Signin onRouteChange={this.onRouteChange}/>
         :( route ==='register'
            ?<Register onRouteChange={this.onRouteChange}/>
            :<div>
                <Logo />
                <Rank />
                <ImageLinkForm
                onButtonClick = {this.onButtonClick} />
                <FaceRecognition inputValue={input} box={box}/> 
             </div>
          )
      }
    </div>
  );
  }
}

export default App;

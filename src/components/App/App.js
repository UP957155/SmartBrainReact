//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navigation from '../navigation/Navigation';
import Logo from '../logo/Logo';
import Signin from '../Signin/Signin';
import Register from '../Signin/Register';
import InputText from '../inputText/InputText';
import Particles from 'react-particles-js';
//import Clarifai from 'clarifai';



const particleOptions =  {
  particles: {
    number: {
      enable: true,
      value: 100
    },
    size: {
      enable: true,
      value: 79,
      random: true
    },
    opacity: {
      enable: true,
      value : 0.21
    },
    line_linked: {
      enable: true,
      distance: 160,
      color: '#5DADE2',
      opacity: 1,
      width: 1
    },
    move: {
      enable: true,
      speed: 12,
      random: true,
      out_mode: 'out'
    }

  },
  interactivity: {
    events: {
      onhover:{
        enable: true,
        mode: 'grab'
      }
    },
    detect_on: 'window',
    modes: {
      grab: {
        distance: 300,
        line_linked: {
          opacity: 0.5
        }
      }
    }
  }
}



class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      box: {},
      route: 'signin',
      isSignIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        number: 0,
        login: ''
      }
    }
  }



  loadUser = async (data) => {
    await this.setState({user:{
      id: data.user_id,
      name: data.user_name,
      email: data.user_email,
      number: data.user_score,
      login: data.joined
    }})
  }

  onRouteChange = (route) => {
    if (route === 'home'){
      this.setState({ isSignIn: true })
    }else{
      this.setState({isSignIn: false})
    }
    this.setState({route: route})
  }

  onInputChange = async (event) => {
   await this.setState({input: event.target.value});
    const image = document.querySelector('#s');
    image.src = this.state.input;
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  calculateFaceDetection = (data) => {
    const pointsFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('s');
    const width = image.width;
    const height = image.height;
    let newThing =  {
      leftCol: pointsFace.left_col * width,
      topRow: pointsFace.top_row * height,
      rightCol: pointsFace.right_col * width,
      bottomRow: pointsFace.bottom_row * height
    };

    return newThing;
  }

  displayFace = (newbox) => {
   const c = document.getElementById('myCanvas');
   const ctx = c.getContext('2d');
   
  ctx.beginPath();
   ctx.rect(newbox.leftCol, newbox.topRow, newbox.rightCol - newbox.leftCol, 
    newbox.bottomRow - newbox.topRow);
    ctx.strokeStyle = 'red';
   ctx.stroke();


   
  }

  onSubmit = async () => {
    fetch('http://localhost:3000/imageUrl', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(data => {this.displayFace(this.calculateFaceDetection(data))})
    .catch(err => console.log('nepovedlo se'))
    
  }

  render(){
  return (
    <div className="App">
      <Particles className="particles"
      params={particleOptions}
      />
      <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange} />
      { this.state.route === 'home' ?
      <div>
      <Logo />
     <InputText userNumber={this.state.user.number} userName={this.state.user.name} box={this.state.box} onInputChange= {this.onInputChange} onSubmit= {this.onSubmit}/>
     </div>
      :( this.state.route === 'signin' ?
      <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      )
  }
    </div>
  );
  }
}

export default App;

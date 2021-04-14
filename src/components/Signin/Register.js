import React from 'react';


class Register extends React.Component {

  constructor(){
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
      name: ''
    }
  }

  onNameChange = async (event) => {
    await this.setState({name: event.target.value});
    
  }

  onEmailChange = async (event) => {
    await this.setState({signInEmail: event.target.value});
    
  }

  onPasswordChange = async (event) => {
   await this.setState({signInPassword: event.target.value})
  }

  onSubmit = () => {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body:JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data[0].user_id){
      this.props.loadUser(data[0]);
      this.props.onRouteChange('home');
      }else{
        return false;
      }
    });
}

  
  render(){
  
  return (
    <div>
    <main class="pa4 black-80">
      <form class="measure center">
     <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend class="f4 fw6 ph0 mh0">Register</legend>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" for="name">Name</label>
        <input onChange={this.onNameChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="name" required />
      </div>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" for="email-address">Email</label>
        <input onChange={this.onEmailChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required/>
      </div>
      <div class="mv3">
        <label class="db fw6 lh-copy f6" for="password">Password</label>
        <input onChange={this.onPasswordChange} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required/>
      </div>
    </fieldset>
  </form>
  <div class="">
      <input onClick={ this.onSubmit} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
  </div>
</main>
</div>
);
}



}

export default Register;
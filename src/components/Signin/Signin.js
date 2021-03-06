import React from 'react';


class Signin extends React.Component {
  constructor(){
    super();
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = async (event) => {
    await this.setState({signInEmail: event.target.value});
    
  }

  onPasswordChange = async (event) => {
   await this.setState({signInPassword: event.target.value})
  }

  onSubmit = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.user_id) {
        return false;
        }else{
          this.props.onRouteChange('home')
          this.props.loadUser(data)
        }
      
    });

}

  render(){
    const { onRouteChange } = this.props
return (
    <div>
    <main className="pa4 black-80">
      <form className="measure center">
     <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required/>
      </div>
    </fieldset>
  </form>
  <div className="">
      <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => {onRouteChange('Register')}} className="f6 link dim black db">Sign up</p>
    </div>
</main>
</div>
);
}
}

export default Signin;
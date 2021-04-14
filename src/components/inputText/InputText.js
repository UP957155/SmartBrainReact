import React from 'react';
import './InputText.css'


const InputText = ({ userName, userNumber, box, onInputChange, onSubmit }) => {
return (
<div className='dev'>
<div>
    <h3>{userName + ' your current score is ' + userNumber}</h3>
<p>{'Try our recognition app'}</p>
<input className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-30' type="text" placeholder="link to your image" onChange= {onInputChange}/>
<button className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick= {onSubmit}>Detect</button>
</div>
<br/>
<div className='dd'>
<canvas id='myCanvas' width='700px' height='500px'></canvas>
<img id='s' alt='kas' src={onInputChange} width='700px' height='500px'/>
</div>

</div>

);

}

export default InputText;
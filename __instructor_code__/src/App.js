import React , {useState, useEffect} from 'react';
import './App.css';

import MyGreetings from './MyGreetings'

function App() {
  
  const [color, setColor] = useState()
  const [action, setAction] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const hasImage = true;

  const getColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    fetch(`http://www.thecolorapi.com/id?rgb=${r},${g},${b}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setColor(res)
      })
  }

useEffect( ()=>{
  getColor()
  return console.log('I am running on the unmount of the component')
}, [])

{/**
  useEffect(()=>getColor()) -> will run after every render, in a continuos cycle. This corresponds to the componentDidUpdate lifecycle
  useEffect(()=>getColor(), []) -> will render ONLY after the first blank render, this corresponds to the componentDidMount lifecycle
  useEffect(()=>getColor(), [action]) -> will wait for the state to change before running. This is special and runs only on a change of state
  
  useEffect(()=>{return console.log('runs on unmount')}) -> will run once the component is done, also called clean-up. This corresonds to a componentWillUnmount
*/}

  return (
    <div className="App">
      <h1>Hello Pizza Bytes</h1>

      {color ? <img src={color.image.named} /> : <p>No color on the state that I can display...</p>}
      
      <br/>

      <button onClick={()=>setIsLoggedIn(!isLoggedIn)}>
        
        {isLoggedIn ? 'Log out' : 'Log in'} {/* the boolean shortcut will return either a boolean or something to render*/}
                             {/* since React does not render booleans and truthy falsy values, this works as conditional rendering */}

        </button>
    
        {(isLoggedIn || hasImage) && <MyGreetings />}
    </div>
  );
}

export default App;

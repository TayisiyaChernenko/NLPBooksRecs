import { useState } from 'react'
import RHS from './components/rhs';
import './App.css'
import Header from "./components/header";
import Recs from "./components/recommendations"
function App() {
  return (
    <div className='page'>
      <Header/>
      <div className="body">
      <Recs/>
      <RHS/>
      </div>
      <div className= "slogan-to-bottom">
        <div className = "bottom-container">
          <p>Become a more informed reader with LiteraryLens, using Goodreads review data to provide key insights to readers.</p>
        </div>
      </div>
    </div>
  );
}

export default App;


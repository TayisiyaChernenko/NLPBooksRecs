import { useState } from 'react'
import SignIn from './components/buttons';
import './App.css'
import Header from "./components/header";
import Recs from "./components/recommendations"
function App() {
  return (
    <div>
      <Header/>
      <Recs/>
    </div>
  );
}

export default App;


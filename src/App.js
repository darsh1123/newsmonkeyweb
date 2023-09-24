import './App.css';

// mein ab class based components use karunga aur mein rcc type karunga yaha mera class based component ban jayega
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  // c = 'john';  // yeh mera class variable ban gaya
  // Render method ek lifecycle method hain mtlb render method run hota hain aur uska kaam hota hain screen par HTML ko render karna
  // yeh hamne neeche loading bar ke lia likha hain code
  apiKey='2e8ef79ce1a14027a02a8554af74eae6';
  state = {
    progress:0
  }
  /// neeche maine arrow function banaya warna mujhe this provide nhi hota
  setProgress = (progress) =>{
    this.setState({progress:progress})
  }

  // ab jo maine uppar function bnaaya hain isse mein news component mein daalunga

  render() {
    return (
      <div>
        <Router>
        {/* <h1>Hello my first class base component {this.c}</h1> */}
        {/* // uppar maine ek tarike se c ko render kara hain */}
        <Navbar/>

        {/* Apply loading bar - mtlb jb ek chiz se doosr chiz pe jaate hain toh ek load sa aata hain uppar usi ko kehte hia */}
        {/* hum loading with state use kar rahe hain iski documentary mein hain yeh sabh */}
        <LoadingBar
        height={5}
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "general" PageSize={12} country="in" category="general"/>} />
        <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "business" PageSize={12} country="in" category="business"/>} />
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "entertainment" PageSize={12} country="in" category="entertainment"/>} />
        <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "general" PageSize={12} country="in" category="general"/>} />
        <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "health" PageSize={12} country="in" category="health"/>} />
        <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "science" PageSize={12} country="in" category="science"/>} />
        <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "sports" PageSize={12} country="in" category="sports"/>} />
        <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key = "technology" PageSize={12} country="in" category="technology"/>} />
          </Routes>
        </Router>
      </div>
      
    )
  }
}

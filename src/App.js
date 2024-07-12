import './App.css';
import React, { Component } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {

  apikey = process.env.REACT_APP_API_KEY

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  

  render() {
    return (
      <BrowserRouter>
        <div>

          <LoadingBar 
            color='#f11946'
            progress={this.state.progress}

          />
          <Navbar />
          <Routes>

            <Route exact path="/whatsnews" element={<News key="general" setProgress={this.setProgress} apikey={this.apikey} pageSize={20} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" setProgress={this.setProgress} apikey={this.apikey} pageSize={20} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} apikey={this.apikey} pageSize={20} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} apikey={this.apikey} pageSize={20} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News key="science" setProgress={this.setProgress} apikey={this.apikey} pageSize={20} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} apikey={this.apikey} pageSize={20} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News key="technology" setProgress={this.setProgress} apikey={this.apikey} pageSize={20} country="in" category="technology"/>}/>

          </Routes>
          </div>
        </BrowserRouter>

    )
  }
}

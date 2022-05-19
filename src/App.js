import React from 'react';
import axios from 'axios';

import './App.css';
import ShareButton from './ShareButton';

import { FaTwitter, FaSyncAlt } from 'react-icons/fa';

export default class App extends React.Component {

  // available color modes
  themes = ['light', 'dark'];

  // check if dark mode is enabled in the browser
  prefersDark = window.matchMedia('(prefers-color-scheme: dark').matches;

  // initial state
  state = {
    theme: this.prefersDark ? 'dark' : 'light',
    isLoading: true,
    advice: ''
  }

  componentDidMount() {
    const lcTheme = localStorage.getItem('theme');
    if(lcTheme) {
      this.setState({theme: lcTheme});
    }
    this.getAdvice();
  }

  getAdvice = () => {
    this.setState({isLoading: true});
    let ts = new Date().getTime();
    axios
      .get('https://api.adviceslip.com/advice?'+ts)
      .then(res => {
        this.setState({advice: res.data.slip.advice});
        this.setState({isLoading: false});
      })
      .catch(err => {
        console.log(err);
      });
  }

  switchTheme = () => {
    let newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({theme: newTheme});
    localStorage.setItem('theme', newTheme);
  }

  render() {
    let advice;
    if(this.state.isLoading) {
      advice = <h2><span>Loading...</span></h2>;
    } else {
      advice = <h2>{this.state.advice}</h2>;
    }

    return (
      <div className="app" data-theme={this.state.theme}>
        <div className="content">
          <div className="header">
            <h1>Random advice</h1>
            <p>Get a random piece of advice from the <a href="https://api.adviceslip.com/" target="_blank" rel="noopener noreferrer">AdviceSlip API</a></p>
          </div>
          <div className="card">{advice}</div>
          <div className="buttons">
            <div className="social-buttons">
              { this.state.isLoading ? '' :
              (
                <>
                  <ShareButton platform="twitter" url={`https://twitter.com/share?text=${this.state.advice}&url=https://github.com/pkariithi/random-advice-react-app`} title="Tweet this advice" icon={<FaTwitter />} />
                </>
              )}
            </div>
            <div className="app-buttons">
              <button onClick={() => this.getAdvice()} className="has-icon">Refresh <FaSyncAlt /></button>
            </div>
          </div>
          <div className="mode-switcher">
            <div className="switcher" onClick={() => this.switchTheme()}></div>
            <p>Switch to {this.state.theme === 'light' ? 'Dark' : 'Light'} Mode</p>
          </div>
        </div>
      </div>
    );
  }
}

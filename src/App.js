import React from 'react';
import axios from 'axios';
import './App.css';
import ShareButton from './ShareButton';

import { FaTwitter, FaSyncAlt } from 'react-icons/fa';

export default class App extends React.Component {

  state = {
    isLoading: true,
    advice: ''
  }

  componentDidMount() {
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


  render() {
    let advice;
    if(this.state.isLoading) {
      advice = <h2><span>Loading...</span></h2>;
    } else {
      advice = <h2>{this.state.advice}</h2>;
    }

    return (
      <div className="app">
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
                <ShareButton platform="twitter" url={`https://twitter.com/share?text=${this.state.advice}&url=https://api.adviceslip.com/`} title="Tweet this advice" icon={<FaTwitter />} />
              </>
            )}
          </div>
          <div className="app-buttons">
            <button onClick={() => this.getAdvice()} className="has-icon">Refresh <FaSyncAlt /></button>
          </div>
        </div>
      </div>
    );
  }
}

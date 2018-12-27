import React, { Component } from 'react'; 
import './App.css';
import Calculator from './Calculator.js';
import History from './History.js';

class App extends Component {
  constructor(props) { 
    super(props) ; 
 
    this.state = {historyItems: [] };
  }

  updateHistory(newItem) { 
    var currentHistoryItems = this.state.historyItems; 
    
    currentHistoryItems.push(newItem); 
    currentHistoryItems.push(<br />); 
 
    this.setState({  historyItems: currentHistoryItems });   

    setTimeout(this.scrollBottom, 100); 
  }

  scrollBottom() {   
    var element = document.getElementById("history");
    element.scrollTop = element.scrollHeight;
  }

  clearHistory() { 
    this.setState({historyItems: []});
  }

  render() {
    return (
      <div>
        <h1 className="push-right">Calculator</h1>

        <div className="inline push-right">
          <Calculator updateHistory={this.updateHistory.bind(this)}/>
        </div>
        <div className="inline push-right" >
          <History history={this.state.historyItems}/>
          <button onClick={this.clearHistory.bind(this)}>Clear History</button>
        </div>
      </div>
    );
  }
}

export default App;

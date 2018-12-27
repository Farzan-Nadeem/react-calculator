import React, { Component } from 'react'; 
import './index.css';

class History extends Component {
    render() { 
        return (
            <p id="history" className="history code" style={{overflowY: "auto"}}>
                {this.props.history}
            </p>
        );
    }
}

export default History; 

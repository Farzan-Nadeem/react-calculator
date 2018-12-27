import React, { Component } from 'react'; 
import './button.css';

class Button extends Component {
    render() { 
        return(
            <div 
            style={ {background: this.props.bgC, width: this.props.width, height: this.props.height, color: this.props.color} }
            className="action-button" 
            onClick={this.props.onClick}>
                { this.props.value }
            </div>
        )
    }
}

export default Button; 
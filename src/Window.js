import React, { Component } from 'react'; 
import './index.css';

class Window extends Component {
    render() { 
        return( 
            <div className="window"
            style={{width: this.props.width, height: this.props.height}}
            >
                {this.props.value}
            </div>
        )
    }
}

export default Window;

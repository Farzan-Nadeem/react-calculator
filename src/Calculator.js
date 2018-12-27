import React, { Component } from 'react'; 
import Button from './Button.js';
import Window from './Window.js';
import './calculator.css';

class Calculator extends Component {
    constructor(props) { 
        super(props); 
        
        this.MAX_VAL = 99999999999;

        this.BUTTON_WIDTH = 80; 
        this.BUTTON_HEIGHT = 60; 

        this.WINDOW_WIDTH = this.BUTTON_WIDTH*4 + 8; 
        this.WINDOW_HEIGHT = this.BUTTON_HEIGHT*4; 
  
        this.whiteColor = "#fff";
        this.blueColor = "#3ebfd6"; 
        this.redColor = "#b43b3b";
  
        this.operand = 0; 
        this.operand2 = 0;
        this.operation = "";
 
        this.state = { window : "0" };
    }
     
    createDigitButton(value, bgC, width, height, color) { 
        return <Button value={value} bgC={bgC} width={width * this.BUTTON_WIDTH + 2*(width - 1)} height={height * this.BUTTON_HEIGHT} color={color} onClick={this.handleDigitClick.bind(this)}/>
    }

    createActionButton(value, bgC, width, height, color) {   
        return <Button value={value} bgC={bgC} width={width * this.BUTTON_WIDTH + 2*(width - 1)} height={height * this.BUTTON_HEIGHT} color={color} onClick={this.handleActionClick.bind(this)}/>
    }
    
    handleDigitClick(event) {   
        var checkVal = this.operand*10 + parseInt(event.target.innerHTML);

        this.operand = (checkVal <= this.MAX_VAL) ? checkVal : this.operand;  

        this.setState({window: this.operand});
    }

    handleActionClick(event) {  
        var operation = event.target.innerHTML;

        switch(operation) {
            case "CLEAR": 
                this.operand = 0; 
                this.operand2 = 0;
                this.operation = "";
                 
                this.setState({window: 0});

                this.props.updateHistory("----CLEAR----");

                break;
            
            default:
                this.evaluateActionItem(operation);
        } 
    }

    evaluateActionItem(actionItem) { 
        if((this.operation !== "" || actionItem === "=") && this.operand2 !== 0) { 
            this.evaluateExpression(); 
            this.operation = actionItem;
        } 
        else { 
            this.operation = actionItem;
            this.operand2 = parseFloat(this.operand);
            this.operand = 0;
        } 
    }
  
    evaluateExpression() {  

        if(this.operation === ""  ) {
            return; 
        }
        
        if(this.operation !== "=") { 
            var historyItem = this.operand2 + this.operation + this.operand; 
            this.props.updateHistory(historyItem);
        }
        
        switch(this.operation) { 
            case "+":
                this.operand2 += this.operand;
                break; 
            case "-":
                this.operand2 -= this.operand;
                break;
            case "x":
                this.operand2 *= this.operand;
                break;
            case "/":
                this.operand2 /= this.operand;
                break;  
            default:
                break;
        }
         
        if(this.operation !== "=") { 
            this.props.updateHistory("=    " + this.operand2);
            this.props.updateHistory();
        } 

        this.operand = 0;   

        this.setState({window: this.operand2});
    }
 
    render() {  
        return ( 
            <div>
                <Window value={this.state.window} width={this.WINDOW_WIDTH} height={this.WINDOW_HEIGHT}/>

                <div className="row">
                    {this.createActionButton("CLEAR", this.redColor, 3, 1, "white")}

                    {this.createActionButton("/", this.blueColor, 1, 1, "white")} 
                </div>
                <div className="row">
                    {this.createDigitButton(7, this.whiteColor, 1, 1, "black")}
                    {this.createDigitButton(8, this.whiteColor, 1, 1, "black")}
                    {this.createDigitButton(9, this.whiteColor, 1, 1, "black")}
                    
                    {this.createActionButton("x", this.blueColor, 1, 1, "white")}                     
                </div>
                <div className="row">
                    {this.createDigitButton(4, this.whiteColor, 1, 1, "black")}
                    {this.createDigitButton(5, this.whiteColor, 1, 1, "black")}
                    {this.createDigitButton(6, this.whiteColor, 1, 1, "black")}
                    
                    {this.createActionButton("-", this.blueColor, 1, 1, "white")} 
                </div>
                <div className="row">
                    {this.createDigitButton(1, this.whiteColor, 1, 1, "black")}
                    {this.createDigitButton(2, this.whiteColor, 1, 1, "black")}
                    {this.createDigitButton(3, this.whiteColor, 1, 1, "black")}
                    
                    {this.createActionButton("+", this.blueColor, 1, 1, "white")} 
                </div>
                <div className="row">
                    {this.createDigitButton(0, this.whiteColor, 3, 1, "black")}
                     
                    {this.createActionButton("=", this.blueColor, 1, 1, "white")} 
                </div>
            </div>  
        );
    }
}

export default Calculator;

/**
 * Created by Alex Liu on 2015/7/10.
 */

import React from 'react';

import Progress from './progress/Progress';







export default class ApplicationPage extends React.Component{

  constructor(){
    super();
  }

    state = {
        spinner: true,
        trickle: true,
        show: true,
        done: false
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                spinner: true,
                progress: 0.7
            });

        }, 2000);




    }

  render(){
    return (
        <div id="test">
            {
                this.state.show &&
                <Progress
                    spinner={this.state.spinner}
                    progress={this.state.progress}
                    trickle={this.state.trickle}
                    trickleTimer={900}
                    done={this.state.done}
                    progress={this.state.progress}
                />
            }

            <input type="text" style={{marginTop:100,marginLeft:20, width:100}} onKeyUp={::this.setProgress} /><br />
            trickle:<input type="radio" name="trickle"  checked={this.state.trickle} onChange={this.onChange.bind(this, true)} /><br />
            not trickle:<input type="radio" name="trickle" checked={!this.state.trickle} onChange={this.onChange.bind(this, false)} /><br />
            <p><button className="btn" onClick={::this.done}></button> : done => progress == 1</p>
            <p>
                <button className="btn" onClick={::this.done1}></button> : toggle done
            </p>
        </div>
    );
  }

    done(){
        this.setState({
            progress: 1
        });
    }

    done1(){
        this.setState({
            done: !this.state.done
        });
    }

    onChange(value, e){

        this.setState({
            trickle: value
        });
    }
    setProgress(e){
        let value;
        if(e.which === 13){
            value = e.target.value.trim();
            if(!value || value < 0 || value > 1) return;

            this.setState({
                progress: value
            });
        }


    }

}


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
                    ref="progress"
                    spinner={this.state.spinner}
                    progress={this.state.progress}
                    trickle={this.state.trickle}
                    trickleRate={0.02}
                    trickleSpeed={400}
                    spinner={this.state.spinner}
                />
            }

            <p>
                <label htmlFor="progress">speed : </label><input id="progress" type="text" style={{width:100}} onKeyUp={::this.setProgress} />
            </p>
            <p>
                <label htmlFor="trickle">trickle:</label> <input id="trickle" type="checkbox" checked={this.state.trickle} onChange={::this.toggleTrickle} />
            </p>
            <p>
                <label htmlFor="spinner">spinner:</label> <input id="spinner" type="checkbox" checked={this.state.spinner} onChange={::this.toggleSpinner} />
            </p>

            <p>
                <label>done:</label> <button className="btn" onClick={::this.done}></button>
            </p>

        </div>
    );
  }

    done(){
        this.setState({
            progress: 1
        });
    }



    toggleTrickle(e){

        this.setState({
            trickle: !this.state.trickle,
            progress: this.refs.progress.state.progress
        });
    }

    toggleSpinner(){
        this.setState({
            spinner: !this.state.spinner,
            progress: this.refs.progress.state.progress
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


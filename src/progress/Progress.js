/**
 * Created by Alex a cool guy
 */
import React, {CSSTransitionGroup} from 'react';
import classnames  from 'classnames';
import clamp from './utils/clamp';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



const MIN = 0.08;
const MAX = 0.997;

const TIMEOUT = 300;

export default class Progress extends React.Component{

    static defaultProps = {
        spinner: false,
        progress: 0,
        trickle: true,
        trickleRate: 0.02,
        trickleSpeed: 800
    }

    state = {
        progress: this.props.progress
    }

    constructor(props){
        super(props);
    }


    componentWillReceiveProps(props){

        this.clearTimer();
        let progress = props.done ? 1 : +props.progress;
        this.set(progress);


        if(props.trickle) this.loopTrickle();

    }

    componentWillMount(){
        this.generateProgressWrapper();
    }
    componentDidUpdate(){
        this.renderProgress();
    }
    generateProgressWrapper(){
        var progressWrapper = document.createElement('div');
        progressWrapper.className = 'progress-wrapper ' + (this.props.className || '');
        this.progressWrapper = progressWrapper;
        document.body.appendChild(this.progressWrapper);
    }


    componentWillUnmount() {
        this.clearTimer();
        ReactDOM.unmountComponentAtNode(this.progressWrapper);
        try {
            this.progressWrapper.parentNode.removeChild(this.progressWrapper);
        } catch (e) {

        }
    }

    componentDidMount(){
        this.renderProgress();
        this.trickle();
        if(this.props.trickle) this.loopTrickle();

    }

    clearTimer(){
        clearTimeout(this.trickleTimer);
        clearTimeout(this.unmountTimer);
    }
    renderProgress(){
        ReactDOM.render(this.progress(), this.progressWrapper);
    }

    getWidth() {
        let {
            progress
            } = this.state;
        if(typeof progress === 'undefined') return 1;
        if(progress > 1){
            return 100 + '%'
        }else if(progress < 0){
            return 0;
        } else {
            return progress * 100 + '%';
        }

    }

    trickle(){
        this.inc(Math.random() * this.props.trickleRate);
    }

    loopTrickle(){
        clearTimeout(this.trickleTimer);
        const work = () => {
            this.trickleTimer = setTimeout(() => {
                if(this.state.progress === 1) return;
                this.trickle();
                work();
            }, this.props.trickleSpeed);
        }

        work();
    }


    set(progress){
        progress = clamp(progress, MIN, 1);

        this.setState({
            progress
        });
        // waiting until the progress animation is done;
        setTimeout(() => {
            if(this.state.progress === 1) return this.done();
        }, 300);
    }

    inc(p){

        let progress = this.state.progress + p;
        progress = clamp(progress, MIN, MAX);
        this.set(progress);
    }

    done(){
        this.clearTimer();
        this.setState({
            progress: null
        }, () => {
            // waiting until the progress transitionLeave animation is done;
            this.unmountTimer = setTimeout(() => {
                ReactDOM.unmountComponentAtNode(this.progressWrapper);
            }, TIMEOUT + 200);
        });



    }

    progress(){

        return (
            <ReactCSSTransitionGroup
                transitionName="progress"
                transitionAppear={true}
                transitionAppearTimeout={TIMEOUT}
                transitionEnterTimeout={TIMEOUT}
                transitionLeaveTimeout={TIMEOUT}
               >
                {
                    this.state.progress === null ? <div key="space" /> :

                        <div className="progress" key="progress">

                            <div className="progress-bar">
                                <div className="peg" style={{width: this.getWidth()}}></div>
                            </div>

                            {this.props.spinner &&
                                <div key="spinner" className="progress-spinner"></div>
                            }
                        </div>
                }


            </ReactCSSTransitionGroup>

        );
    }



    render(){
        return (

            <div />

        );
    }



}


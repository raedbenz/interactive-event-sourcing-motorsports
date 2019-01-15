import React from 'react';
import { connect } from 'react-redux';
import Controls from './Controls';
import Track from './Track';
import Help from './Help';
import { getRunPath, shouldTrigger } from './coordinates';
import { generateSpeeds } from './helper';
import * as es from '../../actions/events';
import * as sim from '../../actions/simulation';

// Temp
// https://stackoverflow.com/questions/35163164/how-to-center-content-in-a-bootstrap-column
// Vertical align
// https://getbootstrap.com/docs/4.1/utilities/vertical-align/
// https://stackoverflow.com/questions/42252443/vertical-align-center-in-bootstrap-4
// https://medium.com/wdstack/bootstrap-4-vertical-center-1211448a2eff


class SimulationContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0, carPosition: { x: 400, y: 50 } };
        this.interval = 0;
        this.route = getRunPath();
        this.index = 0;
        this.lapSpeeds = [0, 0, 0];
        this.speedIndex = 0;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.index === 0;
    // }

    drive = () => {
        var newPosition = this.route[this.index++];
        if (newPosition.x === this.state.carPosition.x && newPosition.y === this.state.carPosition.y) {
            newPosition = this.route[this.index++];
        }

        this.setState({ carPosition: newPosition });
        var trigger = shouldTrigger(newPosition);
        if (trigger > 0) {
            this.props.lapTriggered(trigger);
            if (trigger === 2) {
                this.stop();
                this.interval = setInterval(this.drive, this.lapSpeeds[this.speedIndex++]);
            }
        }

        if (this.index >= this.route.length) {
            this.stop();
            this.props.runEnded();
        }
    }

    startRunHandler = (e) => {
        this.index = 0;
        this.speedIndex = 0;
        this.lapSpeeds = generateSpeeds();
        console.log('speeds:' + this.lapSpeeds.toString());
        this.interval = setInterval(this.drive, this.lapSpeeds[this.speedIndex++]);
        //this.props.startNewRun();
        this.props.runStarted();
    }

    componentWillUnmount() {
        this.stop();
    }

    stop = () => {
        if (this.interval !== 0) {
            clearInterval(this.interval);
        }
    }

    resetAllHandler = (e) => {
        this.props.resetAll();
    }

    render() {
        return (
            <div className="row">
                <div className='col-md-3 my-auto'>
                    <Help />
                </div>

                <div className='col-md-6'>
                    <Track carPosition={this.state.carPosition} />
                </div>

                <div className='col-md-3 my-auto'>
                    <Controls startRun={this.startRunHandler} resetAll={this.resetAllHandler} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    lapTriggered: (trigger) => dispatch(es.lapTriggered(trigger)),
    runStarted: () => dispatch(es.runStarted()),
    runEnded: () => dispatch(es.runEnded()),
    resetAll: () => dispatch(sim.resetAll()),
    startNewRun: () => dispatch(sim.startNewRun())
});

export default connect(null, mapDispatchToProps)(SimulationContent);
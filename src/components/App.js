import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import Intro from './Intro';
import SimulationContent from './simulation';
import EventSourcingContent from './event-sourcing';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">

                <Header />

                <SimulationContent />

                {/* <div className="row bg-warning">
                    <div className='col-md-3'>
                        <p></p>
                    </div>
                </div> */}

                <EventSourcingContent />

                {/* <Intro /> */}

            </div>
        );
    }
}

export default App;

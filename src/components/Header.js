import React from 'react';

function Header() {
    return (
        <div className="row bg-secondary text-white">
            <div className='col-md-11'>
                <h1>Interactive Event Sourcing in Motorsports - IESM</h1>
                <p>Learn the mechanics of Event Sourcing by simulating a race car laps recording system. <a className='text-warning' href='http://abusanad.net/2019/01/09/interactive-event-sourcing-in-motorsports' target="_blank" rel="noopener noreferrer">Read more...</a></p>
                <p>&copy; <a className='text-warning' href='http://abusanad.net' target="_blank" rel="noopener noreferrer">abusanad.net</a></p>
            </div>
            <div className='col-md-1'>
                <img src="images/ch3.png" width='150' height='150' className="float-right" alt='' />
            </div>
        </div>
    )
}

export default Header;
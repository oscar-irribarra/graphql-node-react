import React, { useState } from 'react';

import Modal from '../components/modal/Modal';
import Backdrop from '../components/backdrop/Backdrop';
import './Events.css';

const Events = () => {
    const [creating, setCreating] = useState(false);

    const startCreateEventHandler = () => {
        setCreating(true);
    };

    const modalConfirmHandler = () => {
        setCreating(false);
    };

    const modalCancelHandler = () => {
        setCreating(false);
    };

    return (
        <>
            {creating && <Backdrop></Backdrop>}
            {creating && (
                <Modal
                    title="Add Event"
                    canCancel
                    canConfirm
                    onCancel={modalCancelHandler}
                    onConfirm={modalConfirmHandler}
                >
                    <p>Modal content</p>
                </Modal>
            )}
            <div className="events-control">
                <p>Share your event</p>
                <button className="btn" onClick={startCreateEventHandler}>
                    Create Event
                </button>
            </div>
        </>
    );
};

export default Events;

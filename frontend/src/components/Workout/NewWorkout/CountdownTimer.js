import React, {useEffect, useState} from 'react';
import {useTimer} from 'react-timer-hook';
import {Button, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";


function CountdownTimer() {
    let d = new Date();
    d.setSeconds(d.getSeconds());
    const [time, setTime] = useState(d);
    const [mins, setMins] = useState(2);
    const [secs, setSecs] = useState(0);
    const [timerWorking, setTimerWorking] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const onExpire = () => {
        setTimerWorking(false);
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        setShowPopup(false);
    }, []);

    const {
        totalSeconds,
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({autoStart: false, expiryTimestamp: time, onExpire});


    const handleReset = () => {
        setTimerWorking(false);
        const t = new Date();
        t.setMinutes(t.getMinutes() + parseInt(mins, 10));
        t.setSeconds(t.getSeconds() + parseInt(secs, 10));
        restart(t);
        setTimerWorking(true);
    }

    const handleOnStart = () => {
        if (timerWorking) {
            resume();
        } else {
            const t = new Date();
            t.setMinutes(t.getMinutes() + parseInt(mins, 10));
            t.setSeconds(t.getSeconds() + parseInt(secs, 10));
            restart(t);
            setTimerWorking(true)
        }
    }

    const handlePause = () => {
        setTimerWorking(false);
        pause();
    }

    const handleMinsChange = (event) => {
        if (event.target.validity.valid) {
            setMins(event.target.value)
        }
    }

    const handleSecsChange = (event) => {
        if (event.target.validity.valid) {
            setSecs(event.target.value)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: '10px', display: 'flex', flex: 1 }}>
                    <Form.Group as={Col} xs={3} className="flex-grow-2" style={{ width: '100px', marginRight: '10px' }}>
                        <Form.Label column>Minutes:</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            max="60"
                            step="1"
                            name="minutes"
                            value={mins}
                            onChange={(e) => handleMinsChange(e)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} xs={3} className="flex-grow-2" style={{ width: '100px' }}>
                        <Form.Label column>Seconds:</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            max="60"
                            step="1"
                            name="seconds"
                            value={secs}
                            onChange={(e) => handleSecsChange(e)}
                        />
                    </Form.Group>
                </div>

                <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ padding: '18px' }}>Timer:</div>
                    <div style={{ fontSize: '50px' }}>
                        <span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                </div>
            </div>

            <Modal show={showPopup} onHide={handleClosePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Time is up!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClosePopup}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                <Button variant="primary" onClick={handleOnStart} disabled={isRunning}
                        style={{marginRight: '10px'}}>
                    Start
                </Button>
                <Button variant="primary" onClick={pause} disabled={!isRunning} style={{marginRight: '10px'}}>
                    Pause
                </Button>
                <Button variant="danger" onClick={handleReset} style={{marginRight: '10px'}}>
                    Reset
                </Button>

            </div>
        </div>

    );
}

export default CountdownTimer;




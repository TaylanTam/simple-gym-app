import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CountdownTimer from "../Workout/NewWorkout/CountdownTimer";
import CalorieCalculator from "./CalorieCalculator";

const Tools = () => {
    const spotifyPlaylistLink = 'https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator';
    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Tools</h2>
            <Row className="justify-content-center">
                <Col lg={6} className="mb-4">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">Countdown Timer</Card.Title>
                                    <CountdownTimer />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={12} className="mt-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">Spotify Playlist</Card.Title>
                                    <iframe
                                        className="w-100"
                                        style={{ borderRadius: '12px' }}
                                        src={spotifyPlaylistLink}
                                        width="100%"
                                        height="352"
                                        allowFullScreen=""
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                    ></iframe>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="text-center">Calorie Calculator</Card.Title>
                            <CalorieCalculator />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Tools;

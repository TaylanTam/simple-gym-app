import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CalorieCalculator = () => {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [calories, setCalories] = useState('');

    const calculateCalories = () => {
        let bmr;

        if (gender === "male") {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === "female") {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        } else {
            return;
        }

        setCalories(bmr.toFixed(2));
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="text-center mb-4">
                        <p className="text-muted">Estimate the number of calories needed each day to maintain, lose, or gain weight.</p>
                    </div>

                    <Form>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">- Select -</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="height">
                            <Form.Label>Height (cm)</Form.Label>
                            <Form.Control type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="weight">
                            <Form.Label>Weight (kg)</Form.Label>
                            <Form.Control type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" style={{marginTop: '10px'}} onClick={calculateCalories}>Calculate</Button>
                    </Form>

                    {calories && (
                        <div className="mt-4 text-center">
                            <p>Your estimated daily calorie needs: <strong>{calories}</strong> calories</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CalorieCalculator;

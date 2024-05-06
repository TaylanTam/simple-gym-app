import {useDispatch, useSelector} from "react-redux";
import {ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddWorkoutExerciseDetails from "./AddWorkoutExerciseDetails";
import {deleteExercise} from "../../../redux/slices/workoutSlice";
import ExerciseVideo from "./ExerciseVideo";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import {useQuery} from "react-query";
import * as api from "../../../api/workoutApi";


const ListWorkoutExercises = () => {
    const exercises = useSelector((state) => state.workout.exercises);
    const dispatch = useDispatch();
    const {data} = useQuery('workout', api.getWorkoutHistory);
    const weightUnit = useSelector((state) => state.auth.weightUnit);

    const [displayVideos, setDisplayVideos] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [processedData, setProcessedData] = useState([]);

    const toggleDisplayVideo = (index) => {
        setDisplayVideos(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const processData = (exerciseName) => {
        const exerciseHistory = [];

        for (const workout of data) {
            for (const workoutExercise of workout.workout_exercises) {
                if (workoutExercise.name === exerciseName) {
                    for (const workoutExerciseDetail of workoutExercise.workout_exercise_details) {
                        exerciseHistory.push(workoutExerciseDetail);
                    }
                }
            }
        }
        setProcessedData(exerciseHistory);
        setShowPopup(true);
    }

    const isVideoDisplayed = (index) => displayVideos[index];

    const handleClosePopup = () => {
        setShowPopup(false);
        setProcessedData([]);
    };

    return (
        <div className="list-workout-exercises-scroll-container">
            <h6 className="mt-2">Exercises:</h6>
            <ListGroup variant="flush" className="scroll">
                {exercises?.map((exercise, index) =>
                    <ListGroup.Item key={index}>
                        <Row className="align-items-center">
                            <Col>
                                <h5>{exercise.name} ({exercise.equipment})</h5>
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-end align-items-center">
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="mx-2"
                                        onClick={() => dispatch(deleteExercise(index))}
                                    >
                                        Delete Exercise
                                    </Button>
                                    {
                                        isVideoDisplayed(index) ? (
                                            <Button
                                                variant="warning text-white"
                                                size="sm"
                                                className="mx-2"
                                                onClick={() => toggleDisplayVideo(index)}
                                            >
                                                Close Related Video
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="warning text-white"
                                                size="sm"
                                                className="mx-2"
                                                onClick={() => toggleDisplayVideo(index)}
                                            >
                                                Show Related Video
                                            </Button>
                                        )
                                    }
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="mx-2"
                                        onClick={() => processData(exercise.name)}
                                    >
                                        Exercise History
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        {
                            isVideoDisplayed(index) &&
                            <ExerciseVideo exerciseName={exercise.name}/>
                        }

                        <Modal show={showPopup} onHide={handleClosePopup}>
                            <Modal.Header closeButton>
                                <Modal.Title>Exercise History:</Modal.Title>
                            </Modal.Header>
                            <ListGroup variant="flush">
                                {
                                    processedData?.length === 0 &&
                                    <div className="text-center mt-5">
                                        <h5>You don't have any saved history!</h5>
                                    </div>
                                }
                                {
                                    processedData?.map((workout, index) =>
                                        <ListGroup.Item key={index}>
                                            <span>
                                                <i>{workout.sets} sets </i>
                                                <i className="fa fa-times"/>
                                                <i> {workout.reps} reps </i>
                                                <i className="fa fa-times"/><i> {workout.weight} {weightUnit}</i>
                                            </span>
                                        </ListGroup.Item>)
                                }
                            </ListGroup>
                        </Modal>

                        <AddWorkoutExerciseDetails exercise={exercise} exerciseIndex={index}/>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default ListWorkoutExercises;

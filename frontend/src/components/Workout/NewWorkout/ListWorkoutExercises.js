import {useDispatch, useSelector} from "react-redux";
import {ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddWorkoutExerciseDetails from "./AddWorkoutExerciseDetails";
import {addExerciseDetails, deleteExercise} from "../../../redux/slices/workoutSlice";
import ExerciseVideo from "./ExerciseVideo";
import {useEffect, useState} from "react";


const ListWorkoutExercises = () => {
    const exercises = useSelector((state) => state.workout.exercises);
    const [displayVideos, setDisplayVideos] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        document.cookie = "myCookie=myValue; SameSite=None; Secure";
    }, []);

    const toggleDisplayVideo = (index) => {
        setDisplayVideos(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const isVideoDisplayed = (index) => displayVideos[index];


    return (
        <div className="list-workout-exercises-scroll-container">
            <h6 className="mt-2">Exercises:</h6>
            <ListGroup variant="flush" className="scroll">
                {exercises?.map((exercise, index) =>
                    <ListGroup.Item key={index}>
                        <Row>
                            <Col>
                                <h5>{exercise.name} ({exercise.equipment})</h5>
                            </Col>
                            <Col>
                                {isVideoDisplayed(index) ? (
                                    <Button
                                        className="float-start"
                                        variant="warning"
                                        size="sm"
                                        onClick={() => toggleDisplayVideo(index)}
                                    >
                                        Close Related Video
                                    </Button>
                                ) : (
                                    <Button
                                        className="float-start"
                                        variant="info"
                                        size="sm"
                                        onClick={() => toggleDisplayVideo(index)}
                                    >
                                        Show Related Video
                                    </Button>
                                )}
                            </Col>
                            <Col>
                                <Button
                                    className="float-end"
                                    variant="danger"
                                    size="sm"
                                    onClick={() => dispatch(deleteExercise(index))}
                                >
                                    Delete Exercise
                                </Button>
                            </Col>
                        </Row>
                        {
                            isVideoDisplayed(index) &&
                            <ExerciseVideo exerciseName={exercise.name}/>
                        }
                        <AddWorkoutExerciseDetails exercise={exercise} exerciseIndex={index}/>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default ListWorkoutExercises;

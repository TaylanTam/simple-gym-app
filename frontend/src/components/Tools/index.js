import Button from "react-bootstrap/Button";
import CountdownTimer from "../Workout/NewWorkout/CountdownTimer";
import {useState} from "react";

// spotify playlist?

const Tools = () => {
    const [showTimer, setShowTimer] = useState(false);

    return (
        <div className="mt-2">
            <h2 className="text-center">Tools</h2>
            {
                showTimer ?
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="danger" onClick={() => setShowTimer(false)}>Timer Off</Button>
                        </div>
                        <CountdownTimer/>
                    </div>
                    :
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="success" onClick={() => setShowTimer(true)}>Timer On</Button>
                    </div>
            }
            {/*<div className="mt-3"><strong>Email: </strong>{profileData?.["email"]}</div>*/}
            {/*<div className="mt-3"><strong>Username: </strong>{profileData?.["username"]}</div>*/}
            {/*<div className="mt-3">*/}
            {/*    <strong>Weight unit:</strong>*/}
            {/*    <ToggleButtonGroup*/}
            {/*        name="metric-system"*/}
            {/*        type="radio"*/}
            {/*        value={weightUnit}*/}
            {/*        size="sm"*/}
            {/*        className="mx-1"*/}
            {/*        onChange={handleWeightUnitChange}*/}
            {/*    >*/}
            {/*        <ToggleButton*/}
            {/*            id="btn-kg"*/}
            {/*            variant={weightUnit === "kg" ? "primary" : "secondary"}*/}
            {/*            value="kg"*/}
            {/*        >*/}
            {/*            Metric (kg)*/}
            {/*        </ToggleButton>*/}
            {/*        <ToggleButton*/}
            {/*            id="btn-lbs"*/}
            {/*            variant={weightUnit === "lbs" ? "primary" : "secondary"}*/}
            {/*            value="lbs"*/}
            {/*        >*/}
            {/*            Imperial (lbs)*/}
            {/*        </ToggleButton>*/}
            {/*    </ToggleButtonGroup>*/}
            {/*</div>*/}
            {/*<div className="mt-2"><strong>Account created: </strong>{timestampToString(profileData?.["created"])}</div>*/}

            {/*<div className="mt-3 text-center">*/}
            {/*    <Button variant="danger" size="lg" onClick={() => logoutMutation.mutate()}>Log out</Button>*/}
            {/*</div>*/}
        </div>
    );
};

export default Tools;

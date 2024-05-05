import React, {useState, useEffect} from 'react';
import Iframe from 'react-iframe';

function ExerciseVideo({exerciseName: exerciseName}) {
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        document.cookie = "myCookie=myValue; SameSite=None; Secure";
    }, []);

    useEffect(() => {
        console.log('exerciseName:', exerciseName)
        try{
            if (exerciseName !== undefined) {
                fetchVideoData();
            }
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    }, [exerciseName]);

const fetchVideoData = async () => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
                exerciseName
            )}&maxResults=1&key=AIzaSyDNe0qKe4oGLwrDSzixVX_l0ECz3zErLgk`
        );
        if (!response.ok) {
            console.log('Failed to fetch video data');
        }
        const data = await response.json();
        const firstVideoId = data.items[0]?.id?.videoId;

        if (firstVideoId) {
            setVideoId(firstVideoId);
        }
    } catch (error) {
        console.error('Error fetching video data:', error);
    }
};


    return (
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
            {videoId ? (
                <iframe
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-presentation"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    width="560"
                    height="315"
                />
            ) : (
                <p>No video found for this exercise</p>
            )}
        </div>
    );
}

export default ExerciseVideo;

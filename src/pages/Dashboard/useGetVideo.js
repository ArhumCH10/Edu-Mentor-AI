import { useEffect, useState } from 'react';
import axios from 'axios';
import { Backend_URI } from '../../Config/Constant';


export function useGetVideo() {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    const userId = storedUserData.userData._id;
    const [videoData, setVideoData] = useState({});

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`${Backend_URI}/video/${userId}`);
                setVideoData(response.data);
                //console.log(response.data.videoData);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        if (userId) {
            fetchVideo();
        }
    }, [userId]);

    return videoData; // Return the video data
}
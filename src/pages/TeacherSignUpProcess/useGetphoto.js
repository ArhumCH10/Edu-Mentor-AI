import { useEffect, useState } from 'react';
import axios from 'axios';

export function useGetPhoto() {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    const userId = storedUserData.userData._id;
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                // Make a request for the photo with a responseType of 'blob'
                const response = await axios.get(`http://localhost:8080/photo/${userId}`, {
                    responseType: 'blob'
                });
                
                
                const url = URL.createObjectURL(response.data);
                
                setPhotoUrl(url);
            } catch (error) {
                console.error('Error fetching photo:', error);
            }
        };

        if (userId) {
            fetchPhoto();
        }
    }, [userId]);

    return photoUrl; // Return the photo URL
}
// ReviewForm.js
import React, { useState } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function ReviewForm({ productId }) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [user] = useAuthState(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'reviews'), {
                productId,
                review,
                rating,
                userId: user.uid,
                userEmail: user.email,
                createdAt: new Date(),
            });
            setReview('');
            setRating(0);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Leave a Review</h2>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Your review" />
            <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} min="1" max="5" placeholder="Rating (1-5)" />
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;

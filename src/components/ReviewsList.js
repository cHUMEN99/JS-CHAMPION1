// ReviewsList.js
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function ReviewsList({ productId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'reviews'), where('productId', '==', productId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reviewsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(reviewsData);
        });
        return unsubscribe;
    }, [productId]);

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.map((review) => (
                <div key={review.id}>
                    <p>{review.review}</p>
                    <p>Rating: {review.rating}</p>
                    <p>By: {review.userEmail}</p>
                </div>
            ))}
        </div>
    );
}

export default ReviewsList;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Try from './Try';

function AdDetails({ excelData, OnAddToCart }) {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (excelData && id) {
            console.log('Looking for ID:', id);
            const foundAd = excelData.find(item => {
                console.log('Checking item:', item.id, 'against ID:', id);
                return String(item.id).trim() === String(id).trim();
            });
            setAd(foundAd);
            setLoading(false);
        }
    }, [excelData, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!ad) {
        return (
            <div className='ogoloshenya'>
                <h1>Оголошення не знайдено</h1>
            </div>
        );
    }

    let imageUrl = [];
    if (ad['Фото товару']) {
        imageUrl = ad['Фото товару'].split(/[, ]+/).map(url => url.trim());
    }

    return (
        <div>
            <h1>{ad.C}</h1>
            <Try
                title={ad.Опис}
                price={ad.Ціна}
                imageUrl={imageUrl}
                OnAddToCart={OnAddToCart}
                id={id}
                added={false}
                description={ad['Кількість, шт.']} // змінено з 'E' на 'Кількість, шт.'
            />
        </div>
    );
}

export default AdDetails;

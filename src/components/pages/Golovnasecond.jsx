import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import * as XLSX from 'xlsx';
import ContentLoader from 'react-content-loader';
import './Golovnasecond.css';

function Golovnasecond({ OnAddToCart, setFavoritOpend }) {
    const [excelData, setExcelData] = useState(null);
    const [randomCards, setRandomCards] = useState([]);
    const [showPhoneButton, setShowPhoneButton] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [phoneIcon, setPhoneIcon] = useState('/img/phone.svg');

    useEffect(() => {
        const fetchExcelData = async () => {
            try {
                const response = await fetch('https://docs.google.com/spreadsheets/d/11IrWYOEe7F6E0vgKE4fa57H3SnhQAeRPGs73jg2RGvw/export?format=xlsx');
                const buffer = await response.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setExcelData(jsonData);

                const shuffledData = shuffleArray([...jsonData]);
                setRandomCards(shuffledData.slice(0, 4));
            } catch (error) {
                console.error('Error fetching Excel data:', error);
            }
        };

        fetchExcelData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPhoneButton(true);
        }, 1000); // Відображення кнопки через 1 секунду

        return () => clearTimeout(timer);
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const showCards = () => {
        if (!randomCards.length) {
            return (
                <div>
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={265}
                        viewBox="0 0 150 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="1" y="0" rx="10" ry="10" width="150" height="155" />
                        <rect x="0" y="167" rx="5" ry="5" width="150" height="15" />
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                        <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
                        <circle cx="20" cy="20" r="20" />
                    </ContentLoader>
                </div>
            );
        }

        return randomCards.map((item, index) => (
            <Card
                key={index}
                title={item['Опис']}
                price={item['Ціна']}
                imageUrl={item['Фото товару'] ? item['Фото товару'].split(',') : []}
                OnPlus={OnAddToCart}
                OnFavorite={() => console.log("Нажми на карточку")}
                id={item.id}
                loading={false}
            />
        ));
    };

    const sendTelegramMessage = (message) => {
        const botToken = '7203876334:AAFjSzR6uHirszWCBYLyJyA5RE9gb9snIWU';
        const chatId = '825627138';
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    };

    const handlePhoneClick = () => {
        setShowPhoneModal(true);
    };

    const handleCloseModal = () => {
        setShowPhoneModal(false);
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input.length <= 10) {
            setPhoneNumber(input);
        }
    };

    const handleCallRequest = () => {
        const isValid = /^\d{10}$/.test(phoneNumber);
        setIsPhoneNumberValid(isValid);

        if (isValid) {
            console.log(`Requesting call to: ${phoneNumber}`);
            let message = `Запит на дзвінок:\nНомер телефону: ${phoneNumber}`;
            sendTelegramMessage(message);
            setShowPhoneModal(false);
        }
    };

    const handleMouseEnter = () => {
        setPhoneIcon('/img/phone1.svg');
    };

    const handleMouseLeave = () => {
        setPhoneIcon('/img/phone.svg');
    };

    return (
        <div style={{ marginTop: 'auto', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center'  }} className='content'>
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <Link to="/tovar">
                    <img style={{ height: '100%', marginTop: '30px', width: '90%' }} src='/img/image.jpg' alt="Main" />
                </Link>
                <h2 style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'
                }}>
                    Автозапчастини нові та вживані
                </h2>
            </div>
            <div className='golovnab'>
                <h1 style={{ marginRight: '50px' }}>Категорія товарів:</h1>
                <li>
                    <Link to='/tovar'>
                        <button style={{ marginRight: '50px' }}>Мотори</button>
                    </Link>
                </li>
                <li>
                    <Link to='/tovar'>
                        <button style={{ marginRight: '50px' }}>Фари</button>
                    </Link>
                </li>
                <li>
                    <Link to='/tovar'>
                        <button style={{ marginRight: '50px' }}>Б/У Автозапчастини</button>
                    </Link>
                </li>
                <li>
                    <Link to='/tovar'>
                        <button style={{ marginRight: '50px' }}>Нові Автозапчастини</button>
                    </Link>
                </li>
            </div>
            <h1 style={{marginTop:'50px'}}>Вас може зацікавити</h1>
            <div className='chikavo' style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '0px', flexWrap: 'wrap' }}>
                {showCards()}
            </div>
            {showPhoneButton && (
                <div className="phone-button" onClick={handlePhoneClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={phoneIcon} alt="Phone" />
                </div>
            )}
            {showPhoneModal && (
                <div className="phone-modal">
                    <div className="phone-modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Хочете, зателефонуємо Вам за 30 секунд?</h2>
                        <input
                            type="text"
                            placeholder="Ваш номер телефону"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className={isPhoneNumberValid ? '' : 'invalid-input'}
                        />
                        {!isPhoneNumberValid && <p className="error-message">Введіть коректний номер телефону (9 цифр) починаючи з 0</p>}
                        <button onClick={handleCallRequest} disabled={!phoneNumber}>Зателефонуйте</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Golovnasecond;

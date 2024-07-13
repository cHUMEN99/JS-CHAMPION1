import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Buy from './components/Buy';
import Try from './components/Try';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import AppContext from './components/context';
import AdDetails from './components/AdDetails';
import Footer from './components/Footer';
import Partners from './components/Partners';
import Golovnasecond from './components/pages/Golovnasecond';
import Abaut from './components/pages/abaut';
import Contact from './components/pages/Contatc';
import { getItems, getCart, uploadFile,removeFromCart,addToCart } from './components/services/api'; // Updated API calls
import './index.css';

function App() {
    const [cartopend, setCartOpened] = useState(false);
    const [excelData, setExcelData] = useState(null);
    const [favoritopend, setFavoritOpend] = useState(false);
    const [cartitems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await getItems();
                const cartResponse = await getCart();
                
                setIsLoading(false);
                setCartItems(cartResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        fetchData();
    }, []);

    const OnAddToCart = async (obj) => {
        try {
            if (cartitems.find((item) => Number(item.id) === Number(obj.id))) {
                await removeFromCart(obj.id);
                setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const response = await addToCart(obj);
                setCartItems((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.error('Error adding/removing item:', error);
        }
    };

    const onRemoveCart = async (id) => {
        try {
            await removeFromCart(id);
            setCartItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const OnChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const IsItemAdded = (id) => {
        return cartitems.some((obj) => Number(obj.id) === Number(id));
    };

    return (
        <AppContext.Provider value={{ cartitems, items, IsItemAdded, setCartOpened, setCartItems }}>
            <div>
                <Buy/>
                <div className="wrapper">
                    {cartopend && <Drawer items={cartitems} OnClose={() => setCartOpened(false)} OnRemove={onRemoveCart} />}
                    <Header OnClickCart={() => setCartOpened(true)} OnClickfavorite={() => setFavoritOpend(true)} />

                    <Routes>
                        <Route 
                            path="/tovar" 
                            element={<Home 
                                cartitems={cartitems}
                                items={items} 
                                searchValue={searchValue} 
                                setSearchValue={setSearchValue} 
                                OnChangeSearchInput={OnChangeSearchInput}
                                OnAddToCart={OnAddToCart} 
                                setFavoritOpend={setFavoritOpend}
                                isloading={isLoading}
                                
                            />} 
                        />
                        <Route 
                            path="/favorites" 
                            element={<Favorites/>} 
                        />
                        <Route 
                            path="/" 
                            element={<Golovnasecond OnAddToCart={OnAddToCart} setFavoritOpend={setFavoritOpend}/>} 
                        />
                        <Route 
                            path="/partners" 
                            element={<Partners/>} 
                        />
                        <Route 
                            path="/abaut" 
                            element={<Abaut/>} 
                        />
                        <Route 
                            path="/contact" 
                            element={<Contact/>} 
                        />
                        <Route 
                            path="/ad/:id" 
                            element={<AdDetails excelData={excelData} OnAddToCart={OnAddToCart}/>} // Pass the fetched data to AdDetails
                        />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </AppContext.Provider>
    );
}

export default App;

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
    const [phoneIcon, setPhoneIcon] = useState(`${process.env.PUBLIC_URL}/img/phone.svg`);

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
            
            fetch('http://localhost:5000/api/call-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Call request sent:', data);
            })
            .catch(error => {
                console.error('Error sending call request:', error);
            });

            setShowPhoneModal(false);
        }
    };

    const handleMouseEnter = () => {
        setPhoneIcon(`${process.env.PUBLIC_URL}/img/phone1.svg`);
    };

    const handleMouseLeave = () => {
        setPhoneIcon(`${process.env.PUBLIC_URL}/img/phone.svg`);
    };

    return (
        <div style={{ marginTop: 'auto', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center'  }} className='content'>
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <Link to="/tovar">
                    <img style={{ height: '100%', marginTop: '30px', width: '90%' }} src={`${process.env.PUBLIC_URL}/img/image.jpg`} alt="Main" />
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


import React, { useEffect, useState, useContext } from "react";
import Info from "./info";
import AppContext from "./context";

function Drawer({ OnClose, OnRemove, items = [] }) {
    const [isComplete, setIsComplete] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const [viewHistory, setViewHistory] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const { setCartItems, cartitems } = useContext(AppContext);

    const totalPrice = cartitems.reduce((sum, obj) => Number(obj.price) + sum, 0);
    const tax = totalPrice * 0.05;

    const OnClickOrder = () => {
        setIsConfirming(true);
    };

    const confirmOrder = () => {
        const newOrder = { items: [...cartitems], totalPrice, tax, date: new Date().toLocaleString(), phoneNumber };
        const updatedOrderHistory = [...orderHistory, newOrder];

        localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));

        setIsComplete(true);
        setOrderHistory(updatedOrderHistory);
        setCartItems([]);  // Clear the cart
        setIsConfirming(false);

        fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order processed:', data);
        })
        .catch(error => {
            console.error('Error processing order:', error);
        });
    };

    const cancelOrder = () => {
        setIsConfirming(false);
    };

    const handleViewHistory = () => {
        setViewHistory(true);
    };

    const handleBackToCart = () => {
        setViewHistory(false);
    };

    useEffect(() => {
        const savedOrderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrderHistory(savedOrderHistory);
    }, []);

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input.length <= 10) {
            setPhoneNumber(input);
        }
    };

    return (
        <div className="overley">
            <div className="drawer">
                <h2 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    Кошик
                    <img onClick={OnClose} className="remove1" height={30} width={30} src={`${process.env.PUBLIC_URL}/img/hrestuk.png`} alt="close" />
                </h2>

                <button onClick={viewHistory ? handleBackToCart : handleViewHistory} style={{ marginBottom: '20px', color: 'white' }}>
                    {viewHistory ? 'Назад до кошика' : 'Історія замовлень'}
                </button>

                {viewHistory ? (
                    <div className="order-history" style={{ overflowY: 'auto', maxHeight: '400px' }}>
                        <h3>Історія Замовлень</h3>
                        {orderHistory.length > 0 ? (
                            orderHistory.map((order, index) => (
                                <div key={index} className="order">
                                    <h4>Замовлення {index + 1} - {order.date}</h4>
                                    <div className="items">
                                        {order.items.map((item) => (
                                            <div className="cartitem" key={item.id}>
                                                {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 && (
                                                    <img src={item.imageUrl[0]} alt={item.title} className="cartitemimg" />
                                                )}
                                                <div className="cartname">
                                                    <p>{item.title}</p>
                                                    <b>{item.price}₴</b>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <ul className="totalblock">
                                        <li className="togo">
                                            <span>Того:</span>
                                            <div></div>
                                            <b>{order.totalPrice}₴</b>
                                        </li>
                                        <li className="togo1">
                                            <span>Налог 5%</span>
                                            <div></div>
                                            <b>{order.tax.toFixed(2)}₴</b>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>Історія замовлень порожня.</p>
                        )}
                    </div>
                ) : (
                    <>
                        {items.length > 0 ? (
                            <div className="items">
                                {items.map((obj) => (
                                    <div className="cartitem" key={obj.id}>
                                        {Array.isArray(obj.imageUrl) && obj.imageUrl.length > 0 && (
                                            <img src={obj.imageUrl[0]} alt={obj.title} className="cartitemimg" />
                                        )}
                                        <div className="cartname">
                                            <p>{obj.title}</p>
                                            <b>{obj.price}₴</b>
                                            <div>
                                                <img onClick={() => OnRemove(obj.id)} className="remove" height={30} width={30} src={`${process.env.PUBLIC_URL}/img/hrestuk.png`} alt="remove" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Info
                                title={isComplete ? (
                                    "Заказ оформлено"
                                ) : (
                                    <>
                                        Корзина Пуста
                                        <h5>Подивись наш каталог, обов'язково щось знайдеш</h5>
                                    </>
                                )}
                                image={isComplete ? `${process.env.PUBLIC_URL}/img/zamovlenya.png` : `${process.env.PUBLIC_URL}/img/cartpusto.svg`}
                            />
                        )}

                        {items.length > 0 && (
                            <ul className="totalblock">
                                <li className="togo">
                                    <span>Разом:</span>
                                    <div></div>
                                    <b>{totalPrice}₴</b>
                                </li>
                                <li className="togo1">
                                    <span>Податок 5%</span>
                                    <div></div>
                                    <b>{tax.toFixed(2)}₴</b>
                                </li>
                                <li>
                                    {isConfirming ? (
                                        <div className="confirm-order">
                                            <p>Для замовлення потрібно ввести номер і до вас перетелефонують</p>
                                            <input
                                                type="text"
                                                placeholder="Введіть номер телефону"
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                className="phone-input"
                                            />
                                            <button onClick={confirmOrder} disabled={!phoneNumber}>
                                                Підтвердити
                                            </button>
                                            <button onClick={cancelOrder}>
                                                Скасувати
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={OnClickOrder}>
                                            Оплатити <img height={25} width={25} src={`${process.env.PUBLIC_URL}/img/arrow1.png`} alt="Arrow" />
                                        </button>
                                    )}
                                </li>
                            </ul>
                        )}

                        {isComplete && (
                            <div className="order-complete">
                                <p>Заказ оформлено!</p>
                                <button onClick={handleViewHistory}>Переглянути замовлення</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Drawer;


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

    const sendOrderToBackend = (order) => {
        fetch('/api/orders', { // Новий API маршрут на бекенді
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order sent:', data);
        })
        .catch(error => {
            console.error('Error sending order:', error);
        });
    };

    const OnClickOrder = () => {
        setIsConfirming(true);
    };

    const confirmOrder = () => {
        const newOrder = { items: [...cartitems], totalPrice, tax, date: new Date().toLocaleString(), phoneNumber };
        const updatedOrderHistory = [...orderHistory, newOrder];

        localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));

        setIsComplete(true);
        setOrderHistory(updatedOrderHistory);
        setCartItems([]);
        setIsConfirming(false);

        sendOrderToBackend(newOrder); // Відправляємо замовлення на бекенд
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
                                                    <b>{item.price}$</b>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <ul className="totalblock">
                                        <li className="togo">
                                            <span>Того:</span>
                                            <div></div>
                                            <b>{order.totalPrice}</b>
                                        </li>
                                        <li className="togo1">
                                            <span>Налог 5%</span>
                                            <div></div>
                                            <b>{order.tax.toFixed(2)}</b>
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
                                image={isComplete ? "/img/zamovlenya.png" : "/img/cartpusto.svg"}
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


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

        let message = `New order:\nDate: ${newOrder.date}\nItems:\n`;
        newOrder.items.forEach(item => {
            message += `${item.title} - ${item.price}₴\n`;
        });
        message += `Total: ${totalPrice}₴\n`;
        message += `Phone: ${phoneNumber}\n`;

        sendTelegramMessage(message);
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

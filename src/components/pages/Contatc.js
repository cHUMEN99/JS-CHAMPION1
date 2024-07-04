import React from 'react';
import './contact.css';

function Contact() {
    return (
        <div className="content">
            <h1 style={{ textAlign: 'center' }}>Контакти</h1>
            <div className="tablichki">
                <div className="contact-box">
                    <div className="icon-text">
                        <img className="icon" src={`${process.env.PUBLIC_URL}/img/phone.svg`} alt="Phone" />
                        <h3>Зв'язатися з нами</h3>
                    </div>
                    <p>Kyivstar: +38 0(67) 123 49 37</p>
                </div>
                <div className="contact-box">
                    <div className="icon-text">
                        <img  className="icon" src={`${process.env.PUBLIC_URL}/img/message.svg`} alt="Messenger" />
                        <h3>Месенджери</h3>
                    </div>
                    <p>Viber: @champion</p>
                    <p>Telegram: @champion</p>
                </div>
                <div className="contact-box">
                    <div className='icon-text'>
                    <img  className="icon" src={`${process.env.PUBLIC_URL}/img/gmail.svg`} alt="Messenger" />
                    <h3>Наша пошта</h3>
                    </div>
                    <p>E-mail: info@champion.ua</p>
                </div>
                <div className="contact-box">
                <div className='icon-text'>
                    <img  className="icon" src={`${process.env.PUBLIC_URL}/img/phone1.svg`} alt="Messenger" />
                    <h3>Графік роботи кол-центру</h3>
                    </div>
                    
                    <p>Пн-Пт: з 09:00 до 20:00</p>
                    <p>Сб-Нд: з 09:00 до 19:00</p>
                    <p>Нд: Вихідний</p>
                </div>
            </div>
        </div>
    );
}

export default Contact;

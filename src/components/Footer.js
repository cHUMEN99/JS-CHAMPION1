import React from 'react';

function Footer() {
    const sulka = 'https://www.google.com.ua/maps/place/CHAMPION+%7C+%D0%90%D0%B2%D1%82%D0%BE%D0%B7%D0%B0%D0%BF%D1%87%D0%B0%D1%81%D1%82%D0%B8%D0%BD%D0%B8+%7C+%D0%A8%D0%B8%D0%BD%D0%BE%D0%BC%D0%BE%D0%BD%D1%82%D0%B0%D0%B6+%7C+%D0%A0%D0%BE%D0%B7%D0%B1%D0%BE%D1%80%D0%BA%D0%B0+Volkswagen+Audi+Seat+Skod%D0%B0+Opel+Ford+,+%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D1%80%D0%BA%D0%B0,+%D1%88%D1%80%D0%BE%D1%82/@49.8202907,23.9854492,17z/data=!3m1!4b1!4m6!3m5!1s0x473ae777a4bed691:0xd9ac6d22c664face!8m2!3d49.8202873!4d23.9880241!16s%2Fg%2F11cmbls9qj?entry=ttu';

    return (
        <footer className="footer">
            <div className="container">
                <div className="column">
                    <h4>Champion</h4>
                    <p>вул. Кульпарківська, 110, Львів, Львівська область, 79000</p>
                    <p>Email: info@champion.ua</p>
                    <p>Тел: 0(67) 123 49 37</p>
                    
                </div>
                <div className="column">
                    <h4>Магазин</h4>
                    <ul>
                        <li><a href="/">Мотори</a></li>
                        <li><a href="/">Бампера</a></li>
                        <li><a href="/">Фари</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h4>Послуги</h4>
                    <ul>
                        <li><a href="/abaut">Шиномонтаж</a></li>
                        <li><a href="#selection">Вибір типу обладнання</a></li>
                        <li>Маєте запитання?</li>
                    </ul>
                </div>
                <div className="column">
                    <h4>Інфо</h4>
                    <ul>
                        <li><a href="/abaut">Про нас</a></li>
                        <li><a href="#contacts">Контакти</a></li>
                        <li><a href="#delivery">Доставка та оплата</a></li>
                        <li><a href="/partners">Партнери</a></li>
                    </ul>
                </div>
                <div className="column subscribe">
                    <h4>Отримуй 5% за підписку на розсилку</h4>
                    <p>& будь першим, хто буде дізнаватись про акції та спецпропозиції</p>
                    <input type="email" placeholder="Your email address" />
                    <button>JOIN</button>
                </div>
            </div>
            <div className="bottom">
                <p>© Champion 2024. All rights reserved.</p>
                <p>Secure payments <a href={sulka} target="_blank" rel="noopener noreferrer"><img style={{height:'50px', width:'50px'}} src="/img/maps.png" alt="Google Maps" /></a></p>
            </div>
        </footer>
    );
}

export default Footer;

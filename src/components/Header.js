import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from './context';
import { useState, useEffect } from 'react';

function Header(props) {
  const { cartitems } = React.useContext(AppContext);
  const TotalPrice = cartitems.reduce((sum, obj) => Number(obj.price) + sum, 0);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 998);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 998);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="header">
        <Link to="/">
          <div className="headerLeft">
            <img width={40} height={40} src={`${process.env.PUBLIC_URL}/img/image.jpg`} alt="Logo" />
            <div className="headerInfo12">
            <h1>Champion</h1>
            <p className="headerInfo1">Магазин автозапчастин</p>
            </div>
          </div>
        </Link>
        {!isMobile && (
          <div className="headermid">
            <li>
              <Link to="/tovar">
                <button>Товари</button>
              </Link>
            </li>
            <li>
              <Link to="/partners">
                <button>Шиномонтаж</button>
              </Link>
            </li>
            <li>
              <Link to="/abaut">
                <button>Про нас</button>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <button>Контакти</button>
              </Link>
            </li>
          </div>
        )}
        <ul className="headerRight">
          <li onClick={props.OnClickCart} style={{ cursor: 'pointer' }}>
            <img className="white-heart" height={18} width={18} src={`${process.env.PUBLIC_URL}/img/cart.svg.png`} alt="Cart" />
            <span className="white-heart">{TotalPrice}₴</span>
          </li>
          <li>
            <Link to="/favorites">
              <img className="white-heart" height={18} width={18} src={`${process.env.PUBLIC_URL}/img/heart.png`} alt="Favorites" />
            </Link>
          </li>
        </ul>
      </header>
      {isMobile && (
        <div className="bottom-nav">
          <Link to="/tovar">
            <img style={{ marginRight: '50px' }} src={`${process.env.PUBLIC_URL}/img/car-wheel.svg`} alt="Товари" />
          </Link>
          <Link to="/partners">
            <img style={{ marginRight: '50px' }} src={`${process.env.PUBLIC_URL}/img/changing-car.svg`} alt="Партнери" />
          </Link>
          <Link to="/abaut">
            <img style={{ marginRight: '50px' }} src={`${process.env.PUBLIC_URL}/img/about-us.svg`} alt="Про нас" />
          </Link>
          <Link to="/contact">
            <img style={{ marginRight: '50px' }} src={`${process.env.PUBLIC_URL}/img/contacts-phone.svg`} alt="Зареєструватися" />
          </Link>
        </div>
      )}
    </>
  );
}

export default Header;

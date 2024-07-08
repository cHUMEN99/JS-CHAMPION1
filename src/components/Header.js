import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from './context';

function Header(props) {
  const { cartitems } = React.useContext(AppContext);
  const totalPrice = cartitems.reduce((sum, obj) => Number(obj.price) + sum, 0);
  const itemCount = cartitems.length;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 998);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 998);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
          <li onClick={props.OnClickCart} style={{ cursor: 'pointer', position: 'relative' }}>
            <img className="white-heart" height={18} width={18} src={`${process.env.PUBLIC_URL}/img/cart.svg.png`} alt="Cart" />
            <span className="white-heart">{totalPrice}₴</span>
            {itemCount > 0 && (
              <span className="item-count-badge">{itemCount}</span>
            )}
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
          <div className="nav-item">
            <Link to="/tovar">
              <img src={`${process.env.PUBLIC_URL}/img/car-wheel.svg`} alt="Товари" />
            </Link>
            <p className="nav-text">Каталог</p>
          </div>
          <div className="nav-item">
            <Link to="/partners">
              <img src={`${process.env.PUBLIC_URL}/img/changing-car.svg`} alt="Партнери" />
            </Link>
            <p className="nav-text">Шиномонтаж</p>
          </div>
          <div className="nav-item">
            <Link to="/abaut">
              <img src={`${process.env.PUBLIC_URL}/img/about-us.svg`} alt="Про нас" />
            </Link>
            <p className="nav-text">Про нас</p>
          </div>
          <div className="nav-item">
            <Link to="/contact">
              <img src={`${process.env.PUBLIC_URL}/img/contacts-phone.svg`} alt="Контакти" />
            </Link>
            <p className="nav-text">Контакти</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import './try.css';
import Card from './Card';
import * as XLSX from 'xlsx';

function Try({ OnAddToCart, title, price, id, added = false, ...props }) {
  const [isAddedToCart, setIsAddedToCart] = useState(added);
  const [excelData, setExcelData] = useState(null);
  const [randomCards, setRandomCards] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const imageUrl = props.imageUrl && props.imageUrl.length > 0 ? props.imageUrl : ["/img/default-image.svg"];

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/11IrWYOEe7F6E0vgKE4fa57H3SnhQAeRPGs73jg2RGvw/export?format=xlsx');
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setExcelData(jsonData);

        const shuffledData = shuffleArray([...jsonData]);
        setRandomCards(shuffledData.slice(0, calculateNumberOfCards()));
      } catch (error) {
        console.error('Error fetching Excel data:', error);
      }
    };

    fetchExcelData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const calculateNumberOfCards = () => {
    if (windowWidth <= 768) {
      return 2;
    } else if (windowWidth <= 998) {
      return 3;
    } else {
      return 4;
    }
  };

  const showCards = () => {
    if (!randomCards.length) {
      return (
        <div>Loading...</div>
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

  const OnClickPlus = () => {
    if (!isAddedToCart) {
      OnAddToCart({ id, title, imageUrl, price });
      setIsAddedToCart(true);
    }
  };

  return (
    <div className="try">
      <ul className="headerRight1">
        <li>
          <Link to="/tovar">
            <img 
              height={25} 
              width={25} 
              style={{ cursor: 'pointer' }} 
              src={`${process.env.PUBLIC_URL}/img/arrowleft.png`} 
              alt="Arrow Left" 
            />
          </Link>
          <div className="carousel-container" style={{ marginTop: '60px', marginRight: '70px' }}>
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              infiniteLoop={true}
              useKeyboardArrows={true}
              autoPlay={false}
            >
              {imageUrl.map((url, index) => (
                <div 
                  key={index} 
                  className="carousel-image" 
                  onClick={() => { setLightboxOpen(true); setCurrentImageIndex(index); }}
                >
                  <img  src={url} alt={`Motors ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </li>
        {windowWidth > 768 ? (
          <li className="details">
            <h1>{title}</h1>
            <h4>Продавець: Магазин Champion</h4>
            <div className="try2">
              <ul className="table">
                <li className="price-section table-row">
                  <h1 className="table-cell" style={{ color: 'red', marginRight: '10px' }}>{price}₴</h1>
                </li>
                <li className="availability-row">
                  <p className="availability">є в наявності!</p>
                </li>
                <p className="table-row">В наявності: {props.description}</p>
                <li className="lishka table-row">
                  <button 
                    onClick={OnClickPlus} 
                    disabled={isAddedToCart}
                    className={isAddedToCart ? "added-to-cart" : ""}
                  >
                    {isAddedToCart ? "У корзині" : "Купити"}
                  </button>
                </li>
                <li className="oplata">
                  <h5>Оплата готівкою, карткою, на розрахунковий рахунок або онлайн за допомогою Visa/Mastercard/MonoPay.</h5>
                  <img src={`${process.env.PUBLIC_URL}/img/visa.svg`} alt="Visa" />
                  <img src={`${process.env.PUBLIC_URL}/img/monopay.svg`} alt="MonoPay" />
                  <img src={`${process.env.PUBLIC_URL}/img/mastercard.svg`} alt="MasterCard" />
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li className="details-mobile">
            <h1>{title}</h1>
            <h4>Продавець: Магазин Champion</h4>
            <div className="try2">
              <ul className="table">
                <li className="price-section table-row">
                  <h1 className="table-cell" style={{ color: 'red', marginRight: '10px' }}>{price}₴</h1>
                </li>
                <li className="availability-row">
                  <p className="availability">є в наявності!</p>
                </li>
                <p className="table-row">В наявності: {props.description}</p>
                <li className="lishka table-row">
                  <button 
                    onClick={OnClickPlus} 
                    disabled={isAddedToCart}
                    className={isAddedToCart ? "added-to-cart" : ""}
                  >
                    {isAddedToCart ? "У корзині" : "Купити"}
                  </button>
                </li>
                <li className="oplata">
                  <h5>Оплата готівкою, карткою, на розрахунковий рахунок або онлайн за допомогою Visa/Mastercard/MonoPay.</h5>
                  <img src={`${process.env.PUBLIC_URL}/img/visa.svg`} alt="Visa" />
                  <img src={`${process.env.PUBLIC_URL}/img/monopay.svg`} alt="MonoPay" />
                  <img src={`${process.env.PUBLIC_URL}/img/mastercard.svg`} alt="MasterCard" />
                </li>
              </ul>
            </div>
          </li>
        )}
        <li className="advantages">
        <h3>Наші переваги:</h3>
<ul className="advantages-list">
  <li className="advantage-item">
    <img 
      className="advantage-image"
      src={`${process.env.PUBLIC_URL}/img/dostavka.png`} 
      alt="Зручна доставка" 
    /> 
    <span>Зручна доставка</span>
  </li>
  <li className="advantage-item">
    <img 
      className="advantage-image"
      src={`${process.env.PUBLIC_URL}/img/garan.png`} 
      alt="Гарантія на усі товари" 
    />
    <span>Гарантія на усі товари</span>
  </li>
</ul>
<ul className="advantages-list" style={{marginTop:'40px'}}>
  <li className="advantage-item">
    <img 
      className="advantage-image"
      src={`${process.env.PUBLIC_URL}/img/garan.png`} 
      alt="Консультація на усі товари" 
    />
    <span>Консультація на усі товари</span>
  </li>
  <li className="advantage-item">
    <img 
      className="advantage-image"
      src={`${process.env.PUBLIC_URL}/img/garan.png`} 
      alt="Миттєва відповідь" 
    />
    <span>Миттєва відповідь</span>
  </li>
</ul>
<div className='delivery'>
  <h3>Варіанти доставки:</h3>
  <ul>
    <li className="delivery-item">
      <img src={`${process.env.PUBLIC_URL}/img/post-office.svg`} className="delivery-icon" alt="Самовивіз" />
      <div>
        <span>Самовивіз:</span>
        <h5>З офісу продаж <br />
            вул. Кульпарківська, 110, <br />
            Львів, Львівська область, 79000
        </h5>
      </div>
    </li>
    <li className="delivery-variantu">
      <img src={`${process.env.PUBLIC_URL}/img/nova-poshta.svg`} className="delivery-icon" alt="Нова Пошта" />
      <div>
        <span>У відділення Нової пошти</span>
        <h5>Безкоштовна доставка від 2500 грн</h5>
      </div>
    </li>
    <li className="delivery-variantu">
      <img src={`${process.env.PUBLIC_URL}/img/nova-poshta.svg`} className="delivery-icon" alt="Нова Пошта" />
      <div>
        <span>У поштомат Нової пошти</span>
        <h5>Безкоштовна доставка від 2500 грн</h5>
      </div>
    </li>
    <li className="delivery-variantu">
      <img src={`${process.env.PUBLIC_URL}/img/ukr-poshta.svg`} className="delivery-icon" alt="Укрпошта" />
      <div>
        <span>У відділення Укрпошти</span>
        <h5>Безкоштовна доставка від 2500 грн</h5>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      
      <div style={{marginTop:'100px'}} className='recommendations'>
        <div style={{display:'flex ',alignItems:'center'}} >
          <h2 style={{marginRight:'20px',marginBottom:'20px'}} >Схожі товари:  </h2>
        </div>
        <div style={{display:'flex'}}>
          { showCards()}
        </div>
      </div>
      
      {lightboxOpen && (
        <Lightbox 
          images={imageUrl.map((url) => ({ url }))}
          onClose={() => setLightboxOpen(false)}
          startIndex={currentImageIndex}
        />
      )}
    </div>
  );
}

export default Try;

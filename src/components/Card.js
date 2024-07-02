  import React from "react";
  import ContentLoader from "react-content-loader";
  import { Link } from "react-router-dom";
  import AppContext from "./context";

  function Card({ OnClickfavorite, OnPlus, title, imageUrl, price, id, added = false, loading = false }) {
    const mainImageUrl = Array.isArray(imageUrl) && imageUrl.length > 0 ? imageUrl[0] : imageUrl; // Вибираємо перше зображення або залишаємо рядок imageUrl як є

    const [islike, setIslike] = React.useState(false);
    const [isAddedToCart, setIsAddedToCart] = React.useState(added);
    const { IsItemAdded } = React.useContext(AppContext);

    const OnClickPlus = () => {
      OnPlus({ id, title, imageUrl, price });
      setIsAddedToCart(true);
    };

    const OnClickLike = () => {
      setIslike(!islike);
    };

    return (
      <div className="card">
        
      
        {loading ? (
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
        ) : (
          <>
            <div className="favorite">
            
              <img
                height={18}
                onClick={OnClickLike}
                src={islike ? "/img/redheart.png" : "/img/heart50.png"}
                alt="unliked"
                
                style={{ verticalAlign: "top" }}
              />
            </div>
            <Link to={`/ad/${id}`}>
              <img
              className="ImageUrl"
                onClick={OnClickfavorite}
                height={112}
                width={133}
                src={mainImageUrl}
                alt=""
                style={{ marginTop: "20px" }}
              />
            </Link>
            <h5>{title}</h5>

            <div className="cardbotom">
              <div className="price">
                <span>Ціна:</span>
                <b>{price}₴</b>
              </div>

            
              {isAddedToCart ? ( // Перевіряємо, чи товар доданий до корзини
                <img className="plus" height={11} width={11} src="/img/done.png" alt="" /> // Відображаємо галочку, якщо товар вже в корзині
              ) : (
                <button onClick={OnClickPlus}>
                  <img className="plus" height={11} width={11} src="/img/plus.png" alt="" /> {/* Відображаємо кнопку "+" якщо товар ще не додано до корзини */}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  export default Card;

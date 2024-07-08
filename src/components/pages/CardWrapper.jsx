import React from 'react';
import { useInView } from 'react-intersection-observer';
import Card from '../Card';

const CardWrapper = ({ item, OnAddToCart, setFavoritOpend }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`card-wrapper ${inView ? 'visible' : 'hidden'}`}>
      <Card
        title={item['Опис']}
        price={item['Ціна']}
        imageUrl={item['Фото товару'].split(',')}
        OnPlus={OnAddToCart}
        OnFavorite={() => console.log('Нажми на карточку')}
        id={item.id}
        OnClickfavorite={() => setFavoritOpend(true)}
        loading={false}
      />
    </div>
  );
};

export default CardWrapper;

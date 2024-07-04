import React from 'react';
import { Link } from 'react-router-dom';

function Abaut() {
    const containerStyle = {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const headerStyle = {
        position: 'relative',
        display: 'inline-block',
        paddingBottom: '10px',
        fontSize: '2em',
        fontWeight: 'bold',
    };

    const underlineStyle = {
        content: '""',
        position: 'absolute',
        width: '150%',
        height: '2px',
        bottom: '-10px',
        left: '-25%',
        backgroundColor: 'black',
    };

    const textStyle = {
        marginTop: '20px',
        lineHeight: '1.6',
    };

    const imageStyle = {
        marginTop: '50px',
        height: '500px',
        width: 'auto',
    };

    return (
        <div className="content" style={containerStyle}>
            <div>
                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div >
                        <h1 >Про нас</h1>
                        <span ></span>
                    </div>
                    <Link to='/'>
                    <img style={imageStyle} src={`${process.env.PUBLIC_URL}/img/image.jpg  `} alt="Масла Motours" />
                    </Link>
                    <li>
                        
                             <h1 style={{ marginTop: '20px' }}>Магазин Champion</h1>
                        
                    </li>
                    <p style={textStyle}>
                        Магазин автозапчастин Champiom має великий досвід роботи на українському ринку автозапчастин. Електронна база пропозицій оригінальних і аналогових запчастин, витратних матеріалів та аксесуарів скомпонована з урахуванням аналітики потреб українських автомобілістів, охоплює максимально великий список нових і вікових марок і моделей і містить не тільки популярні, але й традиційно дефіцитні позиції.
                    </p>
                    <p style={textStyle}>
                        Ми пропонуємо:
                        <ul>
                            <li>Широкий вибір автозапчастин (нові, вживані, бу)</li>
                            <li>Підбір автозапчастин по VIN-коду</li>
                            <li>Замовлення та доставку нових та вживаних автозапчастин з закордону протягом 3-6 днів</li>
                            <li>Надаємо гарантію на встановлення та перевірку</li>
                        </ul>
                    </p>
                    <p style={textStyle}>
                        Також у нас в наявності бу автозапчастини (розборка) для популярних марок автомобілів:
                        <ul>
                            <li>VAG Group Volkswagen</li>
                            <li>AUDI</li>
                            <li>MERSEDES</li>
                            <li>BMW</li>
                            <li>RENAULT</li>
                            <li>SEAT</li>
                            <li>SKODA</li>
                            <li>OPEL</li>
                        </ul>
                        Усі демонтовані автозапчастини лише з німецьких автомобілів без пробігу по Україні.
                    </p>
                    <p style={textStyle}>
                        Ми працюємо для того, щоб кожен клієнт зміг підібрати потрібну запчастину та отримати якнайшвидше!
                        Чекаємо на Вас!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Abaut;

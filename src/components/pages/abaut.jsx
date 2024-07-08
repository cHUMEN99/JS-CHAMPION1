import React from 'react';
import { Link } from 'react-router-dom';

function Abaut() {
    const containerStyle = {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        maxWidth: '800px',
        margin: '0 auto',
    };

    const headerStyle = {
        position: 'relative',
        display: 'inline-block',
        paddingBottom: '10px',
        fontSize: '2.5em',
        fontWeight: 'bold',
    };

    const textStyle = {
        marginTop: '20px',
        lineHeight: '1.8',
        textAlign: 'left',
    };

    const imageStyle = {
        marginTop: '30px',
        height: 'auto',
        width: '100%',
        maxWidth: '600px',
    };

    const listStyle = {
        textAlign: 'left',
        paddingLeft: '20px',
    };

    const listItemStyle = {
        marginBottom: '10px',
    };

    return (
        <div className="content" style={containerStyle}>
            <div>
                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div>
                        <h1 style={headerStyle}>Про нас</h1>
                    </div>
                    <Link to='/'>
                        <img style={imageStyle} src={`${process.env.PUBLIC_URL}/img/image.jpg`} alt="Масла Motours" />
                    </Link>
                    <h2 style={{ marginTop: '20px' }}>Магазин Champion</h2>
                    <p style={textStyle}>
                        Магазин автозапчастин Champion має великий досвід роботи на українському ринку автозапчастин. Електронна база пропозицій оригінальних і аналогових запчастин, витратних матеріалів та аксесуарів скомпонована з урахуванням аналітики потреб українських автомобілістів, охоплює максимально великий список нових і вікових марок і моделей і містить не тільки популярні, але й традиційно дефіцитні позиції.
                    </p>
                    <p style={textStyle}>
                        Ми пропонуємо:
                        <ul style={listStyle}>
                            <li style={listItemStyle}>Широкий вибір автозапчастин (нові, вживані, бу)</li>
                            <li style={listItemStyle}>Підбір автозапчастин по VIN-коду</li>
                            <li style={listItemStyle}>Замовлення та доставку нових та вживаних автозапчастин з закордону протягом 3-6 днів</li>
                            <li style={listItemStyle}>Надаємо гарантію на встановлення та перевірку</li>
                        </ul>
                    </p>
                    <p style={textStyle}>
                        Також у нас в наявності бу автозапчастини (розборка) для популярних марок автомобілів:
                        <ul style={listStyle}>
                            <li style={listItemStyle}>VAG Group Volkswagen</li>
                            <li style={listItemStyle}>AUDI</li>
                            <li style={listItemStyle}>MERCEDES</li>
                            <li style={listItemStyle}>BMW</li>
                            <li style={listItemStyle}>RENAULT</li>
                            <li style={listItemStyle}>SEAT</li>
                            <li style={listItemStyle}>SKODA</li>
                            <li style={listItemStyle}>OPEL</li>
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

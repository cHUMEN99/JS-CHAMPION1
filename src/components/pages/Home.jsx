import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Card from '../Card';
import Pagination from 'react-js-pagination';
import ContentLoader from 'react-content-loader';

function Home({ OnAddToCart, setFavoritOpend }) {
    const [excelData, setExcelData] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

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
            } catch (error) {
                console.error('Error fetching Excel data:', error);
            }
        };

        fetchExcelData();
    }, []);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const filteredData = excelData ? excelData.filter(item =>
        item['Опис'].toLowerCase().includes(searchValue.toLowerCase())
    ) : [];

    const showCards = () => {
        if (!excelData) {
            return (
                <div>
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
                </div>
            );
        }

        const cardsPerPage = 20;
        const startIndex = (activePage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        return filteredData.slice(startIndex, endIndex).map((item, index) => (
            <Card
                key={index}
                title={item['Опис']}
                price={item['Ціна']}
                imageUrl={item['Фото товару'].split(',')}
                OnPlus={OnAddToCart}
                OnFavorite={() => console.log("Нажми на карточку")}
                id={item.id}
                OnClickfavorite={() => setFavoritOpend(true)}
                loading={false}
            />
        ));
    };

    return (
        <div className="content">
            <div className="searchf" style={{ marginBottom: '50px' }}>
                <h1>{searchValue ? `Пошук по запросу: "${searchValue}"` : 'Всі оголошення'}</h1>
                <div className="search">
                    <img height={14.25} width={14.25} src="/img/search.png" alt="" />
                    <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder="Пошук " />
                </div>
            </div>
            <div className="motors">
                {showCards()}
            </div>
            <div className="pagination-container">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={20}  
                    totalItemsCount={filteredData.length}
                    onChange={handlePageChange}
                    itemClass="pagination-button"
                    activeClass="pagination-active"
                />
            </div>
        </div>
    );
}

export default Home;

import React from 'react';

const ExcelData = ({ data }) => {
    return (
        <div>
            <h2>Дані з Excel-файлу</h2>
            <table>
                <thead>
                    <tr>
                        {data[0].map((cell, index) => <th key={index}>{cell}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelData;

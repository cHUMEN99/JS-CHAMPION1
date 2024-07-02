import React from 'react';

function Golovna() {
    return (
        <div style={{marginTop:'160px',padding:'00px'}}>
            <div  style={{ marginBottom: '50px' }}>
                <h1 style={{textAlign:'center',color:'red'}}>Ми пропонуємо:</h1>
                <div style={{display:'flex'}}>
                    <li>
                    <h2 style={{marginRight:'400px'}}>Підбір автозапчастин по VIN-коду</h2>
                    <img src='/img/motor.jpg'/>
                    </li>
                    <li>
                    <h2 style={{marginRight:'350px'}}>Автошрот (авторозборка)</h2>
                    <img style={{height:'300px',marginLeft:'-60px'}} src='/img/image.jpg'/>
                    </li>
                    <li>
                    <h2>Автозапчастини нові та вживані</h2>
                    <img src='/img/1.jpg'/>
                    </li>
                </div>
                <div style={{textAlign:'center',marginTop:'100px'}}>
                        <h2>Широкий вибір нових та вживаних автозапчастин найкращої якості. Гарантія якості. <br />
                        Завжди приємні ціни та задоволені клієнти! <br />
                        Доставка автозапчастин із закордону протягом 3-6 днів.
                        </h2>

                    </div>
            </div>
            
        </div>
    );
}

export default Golovna;

import React from "react";
import AppContext from "./context";

const Info =({title,image})=>{
    const{setCartOpened}=React.useContext(AppContext);
    return(
        <div>
        <img  style={{ display: 'block', margin: 'auto' }} height={200} width={200} src={image} alt=""/>
        <h2 style={{ display: 'block', margin: '50px auto', textAlign: 'center' }}> {title}</h2>
        
        <button onClick={()=>setCartOpened(false)} style={{ display: 'block',textAlign:'center'}} className="buttonback">
        <img  height={25} width={25} className="imgback" src="/img/arrowleft.png" alt=""  />
         Вернутись назад
        </button>
        
      </div>
    )
}


export default Info;    
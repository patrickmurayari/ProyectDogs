import React from "react";
import style from "../styles/Card.module.css";
import { Link } from "react-router-dom";

export default function Card ({id,name,imagen,peso,temperament, createdInDb}) {
    return (
        <div className={style.card}>
            <div className={style.head_card}>
                <h5>{name}</h5><br />
                <h5>{peso}</h5>
            </div>
            <Link className={style.link} to={`/detail/${id}`} >
            {
                !createdInDb?
                temperament && temperament.map((el,i) => { 
                    return (
                            <div className={style.listas}>
                                <ul>
                                <li key={i} name={el} >{el}</li>
                                </ul>
                            </div>
                            )
                // <li key={i} name={el} >{el}</li>
                }) :
                temperament && temperament.map((el,i) => 
                <li key={i} name={el} >{el.name}</li>
                ) 
            }
            <img src={imagen} alt="img not found" width="200px" height="250px" />
            </Link>
        </div>
    );
}
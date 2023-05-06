import React from "react";
import style from "../styles/Card.module.css";
import { Link } from "react-router-dom";

export default function Card ({id,name,imagen,temperament, createdInDb}) {
    return (
        <div className={style.card}>
            <Link className={style.link} to={`/detail/${id}`} >
            <h3>{name}</h3>
            {/* <h2>{id}</h2> */}
            {
                !createdInDb?
                temperament && temperament.map((el,i) => 
                    <h5 key={i} name={el} >{el}</h5>
                ) :
                temperament && temperament.map((el,i) => 
                    <h5 key={i} name={el} >{el.name}</h5>
                ) 
            }
            <img src={imagen} alt="img not found" width="200px" height="250px" />
            </Link>
        </div>
    );
}
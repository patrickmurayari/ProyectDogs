import React from "react";
import {Link} from "react-router-dom";
import style from "../styles/Landing.module.css"
export default function LandingPage () {
    return (
        <div>
            <h1 className={style.title} >BIENVENIDOS A MI APP DE DOGS</h1>
            <Link to='/home'>
                <button className={style.button}>Ingresar</button>
            </Link>
        </div>
    )
}
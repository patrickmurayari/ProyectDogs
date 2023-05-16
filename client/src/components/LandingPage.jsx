import React from "react";
import {Link} from "react-router-dom";
import style from "../styles/Landing.module.css"
export default function LandingPage () {
    return (
        <div>
            <div className={style.container} >
                <div className={style.nav} >
                <h1 className={style.title} >Welcome to my Dogs App </h1>
                </div>
                <Link to='/home'>
                    <button className={style.button}>Get Into</button>
                </Link>
            </div>
        </div>
    )
}
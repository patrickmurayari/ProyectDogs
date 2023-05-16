import React from "react"; 
import style from "../styles/Footer.module.css"

export default function Footer() {
    return (
    <div className={style.footer}>
        <h1> Individual  Proyect  Dogs</h1>
        <a href="https://github.com/patrickmurayari"><button className={style.button} >GitHub</button></a>
        <a href="https://www.instagram.com/patrick_m_cc/"><footer><button className={style.button} >Instagram</button></footer></a>
        <a href="https://www.linkedin.com/in/patrick-murayari-coronel-a5b4b0233/"><footer><button className={style.button} >Linkedin</button></footer></a>
    </div>)
}
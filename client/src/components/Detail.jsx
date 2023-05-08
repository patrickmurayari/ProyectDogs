import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import style from  "../styles/Detail.module.css";

export default function Detail() {
    const {id} = useParams();
    const [dog,setDog] = useState({})

    useEffect(() => {
        async function getDetail () {
            try {
            const {data} = await axios(`http://localhost:3001/dogs/${id}`);
            if (data[0].name) {
            setDog({name: data[0].name ,
                    imagen: data[0].imagen ,
                    lifes_span : data[0].lifes_span ,
                    peso : data[0].peso ,
                    altura : data[0].altura,
                    temperament : !data[0].createdInDb? data[0].temperament : data[0].Temperaments ,
                    createdInDb: data[0].createdInDb? data[0].createdInDb : null
                } )
            }else {
                window.alert("No ha personaje con ese ID");
            }
        } catch (error) {
            console.log('Message ErrRor :',error);
        }
    }
    getDetail();
    return setDog({});
},[id])

    return (
        <div className={style.card_detail} >
            <h1>DETALLE</h1>
            <div className={style.detail}>
                <h3>Identificador de {dog.name} : ID_{id}</h3>
                <h3>La altura es : {dog.altura}</h3>
                <h3>Su peso es de : {dog.peso}</h3>
                <h3>Años de vida : {dog.lifes_span}</h3>
                <h3>Temperamentos : {!dog.createdInDb? dog.temperament  + ' ' : dog.temperament.map((el) => el.name + (' '))}</h3>
            </div>
            <img  src={dog.imagen} alt="img" />
            <Link to="/home"><button className={style.button} >Volver</button></Link>
        </div>
    )
}
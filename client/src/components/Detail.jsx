import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from "../redux/actions";
import axios from "axios";


export default function Detail() {
    const {id} = useParams();
    const [dog,setDog] = useState({})

    useEffect(() => {
        async function getDetail () {
            try {
            const {data} = await axios(`http://localhost:3001/dogs/${id}`);
            console.log(':::DATA:::',data[0]);
        // console.log('___DATA___',data);
            if (data[0].name) {
            // setDog(json.data)
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

console.log('::::DOGSTATE:::',dog);
    return (
        <div>
            <h1>DETAIL</h1>
            <h1>{id}</h1>
            <img src={dog.imagen} alt="img" />
            <h1>{dog.altura}</h1>
            <h1>{dog.peso}</h1>
            <h1>{dog.lifes_span}</h1>
            <h1>{!dog.createdInDb? dog.temperament  + ' ' : dog.temperament.map((el) => el.name + (' '))}</h1>
            <Link to="/home"><button>Volver</button></Link>
        </div>
    )
}





// async function getDetail () {
//     try {
//         const json = await axios(`http://localhost:3001/dogs/${id}`);
//         console.log(':::DATA:::',json.data[0].name);
//         // console.log('___DATA___',data);
//         if (json.data) {
//             setDog(json.data)
//             // setDog({name: data[0].name ,
//             //         imagen: data[0].imagen ,
//             //         lifes_span : data[0].lifes_span ,
//             //         peso : data[0].peso ,
//             //         altura : data[0].altura} )
//             console.log('::::DOGSTATE:::',dog[0]);
//         }else {
//             window.alert("No ha personaje con ese ID");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// getDetail();
// return setDog({});
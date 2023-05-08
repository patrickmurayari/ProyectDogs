import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameSearch } from "../redux/actions";
import style from "../styles/SearchBar.module.css";


export default function GetNameSearch () {
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    const handleInputChange = (event) => {
        event.preventDefault();
        const valor = event.target.value;
        setName(valor)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getNameSearch(name))
    }

    return (
        <div>
            <input 
                className={style.input}
                type = "text"
                placeholder = "Buscar"
                onChange={(e) => handleInputChange(e)}
            />
            <button className={style.button} type = "submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}
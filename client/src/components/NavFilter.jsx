import React, { useEffect } from "react";
import { 
        filterCreated, 
        orderAlfabetico ,
        orderPorPeso , 
        getTemperaments,
        filterTemperaments
        } from "../redux/actions";

import styles from "../styles/Home.module.css"
import style from "../styles/NavFilter.module.css"
import stylesSelect from "../styles/Cards.module.css"
import {useDispatch , useSelector } from "react-redux";

export default function NavFilter () {
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.dogstemperaments)

    useEffect(() => {
        dispatch(getTemperaments())
    },[dispatch])

    
    const handleFilter = (event) => {
        event.preventDefault();
        const value = event.target.value;
        dispatch(getTemperaments())
        dispatch(filterCreated(value))
    }

    const handleOrder1 = (event) => {
        const value = event.target.value;
        dispatch(orderAlfabetico(value))
    }

    const handleOrder2 = (event) => {
        const value = event.target.value;
        dispatch(orderPorPeso(value))
    }

    const handleTemperaments = (event) => {
        const valueTem = event.target.value;
        dispatch(filterTemperaments(valueTem))
    }
    

    return (
        <div className={style.nav} >
            <div className={stylesSelect.select}>
            <select onChange={(e) => handleOrder1(e)}>
                    <option>Alphabetical Order</option>
                    <option value="ascAlfa"  >Alphabetical order A-z</option>
                    <option value="descAlfa" >Alphabetical order Z-a</option>
                </select>
                <select onChange={(e)=> handleOrder2(e)}>
                    <option>Weight Order</option>
                    <option value="ascPeso"  >Ascending order : Weight</option>
                    <option value="descPeso" >Descending order : Weight</option>
                </select>
                    <select onChange={(e)=>handleTemperaments(e)}>
                        {
                            allTemperaments && allTemperaments.map ((el,i) =>(
                                <option key={i} value={el.name}>{el.name}</option>
                                ))
                            }
                    </select>
                <select onChange={(e) => handleFilter(e)} >
                    <option>All</option>
                    <option value="all" >Existing</option>
                    <option value="created" >Created</option>
                </select>
            </div>
        </div>
    )
}
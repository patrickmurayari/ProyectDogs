import React from "react";
import { useEffect } from "react";
import {useDispatch , useSelector} from "react-redux";
import { getCharacters , 
        filterCreated, 
        orderAlfabetico ,
        orderPorPeso , 
        getTemperaments,
        filterTemperaments
        } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import style from "../styles/Cards.module.css"
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import styles from "../styles/Home.module.css"

export default function Home () {
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.dogCharacters)
    const allTemperaments = useSelector((state) => state.dogstemperaments)
    const numPage = useSelector((state) => state.numPage);

    let desde = (numPage-1) * 8;
    let hasta = numPage * 8 ;
    let cantPages = Math.floor(allCharacters.length / 8);
    let viewDog = allCharacters.slice(desde,hasta)


    useEffect(() => {
        dispatch(getCharacters());
        dispatch(getTemperaments())
    },[dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCharacters());
        dispatch(getTemperaments())
    }

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
    <div>
            <br></br>
            <div className={style.containerButton}>
            <Link to ='/form'><button className={styles.button}>Create a puppy</button></Link>
            <br></br>  
            <button className={styles.button} onClick={e => {handleClick(e)}}>
                Reload all Dogs
            </button>
            <br></br>
            <SearchBar />
            </div>
            <br></br>
            <div className={style.select} >
                <select onChange={(e) => handleOrder1(e)}>
                    <option value="ascAlfa"  >Alphabetical order A-z</option>
                    <option value="descAlfa" >Alphabetical order Z-a</option>
                </select>
                <select onChange={(e)=> handleOrder2(e)}>
                    <option value="ascPeso"  >Ascending order : Weight</option>
                    <option value="descPeso" >Descending order : Weight</option>
                </select>
                    <select onChange={(e)=>handleTemperaments(e)}>
                        {
                            allTemperaments && allTemperaments.map ((el,i) =>(
                                <option key={i}
                                value={el.name}>{el.name}</option>
                                ))
                            }
                    </select>
                <select onChange={(e) => handleFilter(e)} >
                    <option>All</option>
                    <option value="all" >Existing</option>
                    <option value="created" >Created</option>
                    {/* <option value="api" >Existentes</option> */}
                </select>
            </div>
                <br></br>
                <br></br>
                <Paginate cantPages={allCharacters.slice(0,cantPages)}></Paginate>
                <br></br>
                <div className={style.cards_container}>
                {
                    viewDog && viewDog.map((c) => {
                        return (
                            <Card
                            key={c.id}
                            id={c.id} 
                            name={c.name} 
                                        imagen={c.imagen} 
                                        peso={c.peso}
                                        createdInDb = {c.createdInDb? c.createdInDb : null} 
                                        temperament={!c.createdInDb? c.temperament : c.Temperaments}
                                />
                        )})
                    }
                </div>
    </div>
    )
}
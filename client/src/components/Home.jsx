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

    console.log('::::allCharacters::::', allCharacters);
    console.log('::::numPage::::', numPage);
    console.log('::::desde::::', desde);
    console.log('::::hasta::::', hasta);
    console.log('::::cantPages::::', cantPages);
    console.log('::::viewDog::::', viewDog);

    useEffect(() => {
        dispatch(getCharacters());
        console.log('DISPATCH');
        dispatch(getTemperaments())
    },[dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCharacters());
    }

    const handleFilter = (event) => {
        event.preventDefault();
        const value = event.target.value;
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
            <Link to ='/form'><button className={styles.button}>Crea un perrito</button></Link>
            <h1>PROYECTO INDIVIDUAL DOGS</h1>
            <button className={styles.button} onClick={e => {handleClick(e)}}>
                Volver a cargar Dogs
            </button>
            <div>
                <select className={styles.select} onChange={(e) => handleOrder1(e)}>
                    <option value="ascAlfa"  >Ascendente Por orden Alfabetico</option>
                    <option value="descAlfa" >Descendente Por orden Alfabetico</option>
                </select>
                <select onChange={(e)=> handleOrder2(e)}>
                    <option value="ascPeso"  >Ascendente Por Peso</option>
                    <option value="descPeso" >Descendente Por peso</option>
                </select>
                {/* <h2 className={styles.label} >Temperamentos:</h2> */}
                    <select onChange={(e)=>handleTemperaments(e)}>
                        {
                            allTemperaments && allTemperaments.map ((el,i) =>(
                                    <option key={i}
                                            value={el.name}>{el.name}</option>
                            ))
                        }
                    </select>
                <select onChange={(e) => handleFilter(e)} >
                    <option>Todos</option>
                    <option value="created" >Creados</option>
                    {/* <option value="api" >Existentes</option> */}
                </select>
                <SearchBar />
                <div>
                <Paginate cantPages={allCharacters.slice(0,cantPages)}></Paginate>
                </div>
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
        </div>
    )
}
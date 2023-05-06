import React from "react";
import { useEffect, useState } from "react";
import {useDispatch , useSelector} from "react-redux";
import { getCharacters , filterCreated, orderAlfabetico ,orderPorPeso , filtergetTemperaments } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import style from "../styles/Cards.module.css"
import Paginate from "./Paginate";
import SearchBar from "./SearchBar"

export default function Home () {
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.dogCharacters)
    const allTemperaments = useSelector((state) => state.dogstemperamentsFilter)
    const [currentPage , setCurrentPage] = useState(1);
    const [charactersPerPage, setCharacterPerPage] = useState(8);
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharcter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = allCharacters.slice(indexOfFirstCharcter, indexOfLastCharacter);
    console.log(':::::allTemperaments:::', allCharacters.length);
    console.log(':::::allTemperaments:::', allTemperaments.length);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCharacters());
        console.log('DISPATCH');
        dispatch(filtergetTemperaments())
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

    return (
        <div>
            <Link to ='/form'>Crea</Link>
            <h1>PROYECTO INDIVIDUAL DOGS</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar Dogs
            </button>
            <div>
                <select onChange={(e) => handleOrder1(e)}>
                    <option value="ascAlfa"  >Ascendente Por orden Alfabetico</option>
                    <option value="descAlfa" >Descendente Por orden Alfabetico</option>
                </select>
                <select onChange={(e)=> handleOrder2(e)}>
                    <option value="ascPeso"  >Ascendente Por Peso</option>
                    <option value="descPeso" >Descendente Por peso</option>
                </select>
                <select>
                    <option value="temp" >Temperamentos</option>
                </select>
                <select onChange={(e) => handleFilter(e)} >
                    <option value="all" >Todos</option>
                    <option value="created" >Creados</option>
                    <option value="api" >Existentes</option>
                </select>
                <div className={style.cards_container}>
                <Paginate 
                    charactersPerPage={charactersPerPage}
                    allCharacters={allCharacters.length}
                    paginate={paginate}/>
                <SearchBar />
                {
                    currentCharacters && currentCharacters.map((c) => {
                        return (
                            <div>
                                <Card
                                        key={c.id}
                                        id={c.id} 
                                        name={c.name} 
                                        imagen={c.imagen} 
                                        createdInDb = {c.createdInDb? c.createdInDb : null} 
                                        temperament={!c.createdInDb? c.temperament : c.Temperaments}
                                />
                            </div>
                        )})
                }
                </div>
            </div>
        </div>
    )
}
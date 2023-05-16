import React from "react";
import { useEffect } from "react";
import {useDispatch , useSelector} from "react-redux";
import { getCharacters} from "../redux/actions";
import Card from "./Card";
import style from "../styles/Cards.module.css"
import Paginate from "./Paginate";
import Nav from "./Nav";
import Footer from "./Footer";
import NavFilter from "./NavFilter";

export default function Home () {
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.dogCharacters)
    const numPage = useSelector((state) => state.numPage);

    let desde = (numPage-1) * 8;
    let hasta = numPage * 8 ;
    let cantPages = Math.floor(allCharacters.length / 8);
    let viewDog = allCharacters.slice(desde,hasta)


    useEffect(() => {
        dispatch(getCharacters());
    },[dispatch])
    
    return (
    <div>
            <Nav />
            <NavFilter />
                <Paginate cantPages={cantPages} />
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
                {/* <hr></hr> */}
                <div>
                    <Footer />
                </div>
    </div>
    )
}
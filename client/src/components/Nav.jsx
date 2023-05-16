import React from "react";
import style from "../styles/Nav.module.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCharacters , getTemperaments} from "../redux/actions";
import SearchBar from "./SearchBar";

export default function Nav () {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCharacters());
        dispatch(getTemperaments())
    }
    return (
        <div className={style.nav}>
            <Link  to ='/form'>
                <button className={style.button}>
                Create a puppy
                </button>
            </Link>
            <button className={style.button} onClick={e => {handleClick(e)}}>
                Reload all Dogs
            </button>
            <SearchBar />
        </div>
    )
}
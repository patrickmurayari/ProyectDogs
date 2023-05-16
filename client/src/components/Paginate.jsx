import React from "react";
import { useDispatch ,useSelector } from "react-redux";
import {nextPage, prevPage } from "../redux/actions";
import style from "../styles/Paginate.module.css"

export default function Paginate ({cantPages}) {
    const { numPage } = useSelector((state) => state);
    const dispatch = useDispatch();

    function next() {
        dispatch(nextPage());
    }
    function prev() {
        dispatch(prevPage());
    }

    return (
        <div className={style.page} >
            {numPage > 1 ? (
            <div>
                <button className={style.button} onClick={prev}>PREV</button>
                {/* <h3>{numPage - 1}</h3> */}
            </div>
            ) : null}

            <h3>{numPage}</h3>
            {numPage < cantPages ? (
            <div>
            {/* <h3>{numPage + 1}</h3> */}
            <button className={style.button}  onClick={next}>NEXT</button>
            </div>
            ) : null}
        </div>
    )
}
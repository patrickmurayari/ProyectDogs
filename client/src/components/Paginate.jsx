import React from "react";
import { useDispatch } from "react-redux";
import { handleNumber } from "../redux/actions";
import style from "../styles/Paginate.module.css"

export default function Paginate ({cantPages}) {
    const dispatch = useDispatch();
    const number = (n) => {
        dispatch(handleNumber(n))
    }
    return (
        <div>
            {cantPages && cantPages.map((e,i) => (
                    <button key={i} className={style.button} onClick={() => number(i+1)} >{i+1}</button>
                ))}
        </div>
    )
}
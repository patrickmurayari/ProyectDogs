import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage () {
    return (
        <div>
            <h1>BIENVENIDOS A MI APP DE DOGS</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}
import React from "react";



export default function Paginate ({charactersPerPage, allCharacters,paginate}) {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allCharacters/charactersPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <div>
            {
                pageNumbers &&
                pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))
            }
        </div>
    )
}
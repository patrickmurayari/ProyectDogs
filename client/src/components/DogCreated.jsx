import React from "react";
import { useState, useEffect } from "react";
import { Link , useNavigate  } from "react-router-dom";
import { postDogs, getTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function DogCreated() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Temperaments = useSelector((state) => state.dogstemperaments);
    const [error, setError] = useState({
        name : "",
        imagen: "",
        altura : "",
        peso : "",
        lifes_span : "",
        temperament: "",
    })
    const [input , setInput] = useState({
        name : "",
        imagen: "",
        altura : "",
        peso : "",
        lifes_span : "",
        temperament : [],
    })

    useEffect(() => {
        dispatch(getTemperaments())
    },[]) 

    const validate = (input) => {
        let obj = {}
        if(!input.name) {
            obj.name = "Ingrese un nombre";
        }
        else if (!input.imagen) {
            obj.imagen = "Ingrese una imagen";
        }
        else if (!input.altura){
            obj.altura = "Ingrese una altura";
        }
        else if(!input.peso) {
            obj.peso = "Ingrese un peso";
        }
        else if(!input.lifes_span){
            obj.lifes_span = "Ingrese años de vida"
        }
        // else if(input.temperament.length === 0 ){
        //     obj.temperament = "Seleccione un temperamento"
        // }
        return obj
    }

    const handleChangeInput = (event) => {
        setInput({
            ...input, 
            [event.target.name] : event.target.value
        })
        setError(validate({
            ...input,
            [event.target.name] : event.target.value
        }))
        console.log(error);
    }

    const handleSelect = (event) => {;
        setInput({
            ...input,
            temperament : [...input.temperament,event.target.value]
        })
        console.log(':::input.temperaments:::::',input.temperament);
        console.log(input);
    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            temperament : input.temperament.filter(tem => tem !== el)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('::',input);
        dispatch(postDogs(input))
        alert('Personaje Creado');
        setInput({
            name : "",
            imagen: "",
            altura : "",
            peso : "",
            lifes_span : "",
            temperament : [],
        })
        setError({
            name : "",
            imagen: "",
            altura : "",
            peso : "",
            lifes_span : "",
        })
        navigate("/home")
    }



    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu Raza de Perro</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div>
                    <label>Nombre:</label>
                    <input  type="text" 
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.name && (<p>{error.name}</p>)}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input  type="text" 
                            value={input.imagen}
                            name="imagen"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.imagen && (<p>{error.imagen}</p>)}
                </div>
                <div>
                    <label>Altura:</label>
                    <input  type="number" 
                            value={input.altura}
                            name="altura"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.altura && (<p>{error.altura}</p>)}
                </div>
                <div>
                    <label>Peso:</label>
                    <input  type="text" 
                            value={input.peso}
                            name="peso"
                            onChange={(e) => handleChangeInput(e)}/>
                    {error.peso && (<p>{error.peso}</p>)}
                </div>
                <div>
                    <label>Años de vida:</label>
                    <input  type="text" 
                            value={input.lifes_span}
                            name="lifes_span"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.lifes_span && (<p>{error.lifes_span}</p>)}
                </div>
                <label>Temperamentos: </label>
                <select onChange={(e) => handleSelect(e)} >
                    {
                        Temperaments?.map((tem,i) => (
                            <option key={i}  value={tem.name}>{tem.name}</option>
                        ))
                    }
                </select>
                {/* {error.temperament && (<p>{error.temperament}</p>)} */}
                <br />
                {input.temperament.map(el =>{
                            return (
                                <div>
                                    <p>{el}</p>
                                    <button onClick={()=>handleDelete(el)}>X</button>
                                </div>
                            )
                        
                })}
                {
                    Object.keys(error).length === 0 ?
                    (<button type="submit">Crear Raza de Perro</button>):
                    (<div>INSERT INFO</div>)
                }
            </form>
        </div>
    )
}
import React from "react";
import { useState} from "react";
import { Link , useNavigate  } from "react-router-dom";
import { postDogs } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Form.module.css"

export default function DogCreated() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Temperaments = useSelector((state) => state.dogstemperaments);
    const [error, setError] = useState({
        name : "",
        imagen: "",
        altura1 :"",
        altura2 :"",
        alturaError : "",
        peso1 : "",
        peso2 : "",
        pesoError : "",
        lifes_span : "",
        temperament: "",
    })
    const [input , setInput] = useState({
        name : "",
        imagen: "",
        altura1: "", 
        altura2 :"",
        peso1 : "",
        peso2 : "",
        lifes_span : "",
        temperament : [],
    })

    const validate = (input) => {
        let obj = {}
        if(!input.name) {
            obj.name = "Ingrese un nombre";
        }
        else if (!input.imagen) {
            obj.imagen = "Ingrese una imagen";
        }
        else if (!input.altura1){
            obj.altura1 = "Ingrese una altura Min ";
        }
        else if(!input.altura2){
            obj.altura2 = "Ingrese altura Max"
        }
        else if(input.altura1 > input.altura2){
            obj.alturaError = "La altura Min no puede ser mayor a Max"
        }
        else if(!input.peso1) {
            obj.peso1 = "Ingrese un peso MIn";
        }
        else if (!input.peso2) {
            obj.peso2 = "Ingrese un peso Max";
        }
        else if (input.peso1 > input.peso2) {
            obj.pesoError = "El peso Min no puede ser mayor a Max"
        }
        else if(!input.lifes_span){
            obj.lifes_span = "Ingrese años de vida"
        }
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
    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            temperament : input.temperament.filter(tem => tem !== el)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('::ENVIAR::',input);
        dispatch(postDogs(input))
        alert('Personaje Creado');
        setInput({
            name : "",
            imagen: "",
            altura1 : "",
            altura2 : "",
            peso1 : "",
            peso2 : "",
            lifes_span : "",
            temperament : [],
        })
        setError({
            name : "",
            imagen: "",
            altura1 : "",
            altura2 : "",
            alturaError : "",
            peso1 : "",
            peso2 : "",
            pesoError : "",
            lifes_span : "",
            temperament : "",
        })
        navigate("/home")
    }
    console.log('::::INPUT::::' , input);
    console.log('::::ERROR::::' , error);
    return (
        <div>
            <Link to="/home"><button className={style.button} >Volver</button></Link>
            <h1>Crea tu Raza de Perro</h1>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)} >
                <div>
                    <label>Nombre:</label>
                    <input  type="text" 
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.name && (<p>{error.name}</p>)}
                </div>
                <br />
                <div>
                    <label>Imagen:</label>
                    <input  type="text" 
                            value={input.imagen}
                            name="imagen"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.imagen && (<p>{error.imagen}</p>)}
                </div>
                <br />
                <div>
                    <label>Altura Minima:</label>
                    <input  type="number" 
                            value={input.altura1}
                            name="altura1"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)} />
                    {error.altura1 && (<p>{error.altura1}</p>)}
                    <label>Maxima:</label>
                    <input  type = "number"
                            name = "altura2"
                            value= {input.altura2}
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}></input>
                    {error.altura2 && (<p>{error.altura2}</p>)}
                    {error.alturaError && (<p>{error.alturaError}</p>)}
                </div>
                <br />
                <div>
                    <label>Peso Minimo:</label>
                    <input  type="number" 
                            value={input.peso1}
                            name="peso1"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}/>
                    {error.peso1 && (<p>{error.peso1}</p>)}
                    <label>Maximo:</label>
                    <input  type="number" 
                            value={input.peso2}
                            name="peso2"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}/>
                    {error.peso2 && (<p>{error.peso2}</p>)}
                    {error.pesoError && (<p>{error.pesoError}</p>)}
                </div>
                <br />
                <div>
                    <label>Años de vida:</label>
                    <input  type="number" 
                            value={input.lifes_span}
                            name="lifes_span"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.lifes_span && (<p>{error.lifes_span}</p>)}
                </div>
                <br />
                <label>Temperamentos: </label>
                <select onChange={(e) => handleSelect(e)} >
                    {
                        Temperaments && Temperaments.map((tem,i) => (
                            <option key={i}  value={tem.name}>{tem.name}</option>
                            ))
                        }
                </select>
                <br />
                {input.temperament && input.temperament.map((el,i) =>{
                    return (
                        <div key={i} >
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
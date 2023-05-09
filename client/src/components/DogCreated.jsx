import React from "react";
import { useState} from "react";
import { Link , useNavigate  } from "react-router-dom";
import { postDogs } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Form.module.css"

export default function DogCreated() {
    // const regex = /^\d+([\.,]\d+)?$/;
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
            <h1>Create the race that you like the most</h1>
            <div  >
            <form className={style.form} onSubmit={(e) => handleSubmit(e)} >
                <div>
                    <label>Name:</label>
                    <input  type="text" 
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.name && (<p className={style.error} >{error.name}</p>)}
                </div>
                <br />
                <div>
                    <label>Image:</label>
                    <input  type="text" 
                            value={input.imagen}
                            name="imagen"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.imagen && (<p className={style.error} >{error.imagen}</p>)}
                </div>
                <br />
                <div>
                    <label>Minimun Height:</label>
                    <input  type="number" 
                            value={input.altura1}
                            name="altura1"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)} />
                    {error.altura1 && (<p className={style.error} >{error.altura1}</p>)}
                    <label>Maximum:</label>
                    <input  type = "number"
                            name = "altura2"
                            value= {input.altura2}
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}></input>
                    {error.altura2 && (<p className={style.error} >{error.altura2}</p>)}
                    {error.alturaError && (<p className={style.error} >{error.alturaError}</p>)}
                </div>
                <br />
                <div>
                    <label>Weight Minimun :</label>
                    <input  type="number" 
                            value={input.peso1}
                            name="peso1"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}/>
                    {error.peso1 && (<p className={style.error} >{error.peso1}</p>)}
                    <label>Maximum:</label>
                    <input  type="number" 
                            value={input.peso2}
                            name="peso2"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}/>
                    {error.peso2 && (<p className={style.error} >{error.peso2}</p>)}
                    {error.pesoError && (<p className={style.error}  >{error.pesoError}</p>)}
                </div>
                <br />
                <div>
                    <label>Years of life:</label>
                    <input  type="number" 
                            value={input.lifes_span}
                            name="lifes_span"
                            onChange={(e) => handleChangeInput(e)} />
                    {error.lifes_span && (<p className={style.error} >{error.lifes_span}</p>)}
                </div>
                <br />
                <label>Temperaments: </label>
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
                    (<button type="submit">Create Race</button>):
                    (<div>INSERT INFO</div>)
                }
            </form>
        </div>
        </div>
    )
}
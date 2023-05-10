import React from "react";
import { useState} from "react";
import { Link , useNavigate  } from "react-router-dom";
import { postDogs } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Form.module.css"

export default function DogCreated() {
    const regexNum = /^\d+([\.,]\d+)?$/;
    const regex = /^https?:\/\/(?:www\.)?[^\s()<>]+(?:\.(?:jpg|jpeg|gif|png|bmp))?(?:\?\S*)?$/
    const regexImage = /\.(jpe?g|png|gif|bmp)$/i;

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
        else if(!regex.test(input.imagen) || !regexImage.test(input.imagen)){
            obj.imagen = "Ingrese una imagen valida"
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
        else if(!regexNum.test(input.peso1)) {
            obj.peso1 = "Ingrese un peso valido"
        }
        else if(!regexNum.test(input.peso2)) {
            obj.peso2 = "Ingrese un peso valido"
        }
        else if(!regexNum.test(input.altura1)) {
            obj.altura1 = "Ingrese una altura valida"
        }
        else if(!regexNum.test(input.altura2)) {
            obj.altura2 = "Ingrese una altura valida"
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
        dispatch(postDogs(input))
        alert('Puppy created successfully');
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
    return (
        <div >
            <Link to="/home"><button className={style.button} >Back</button></Link>
            <div  >
            <form className={style.form} onSubmit={(e) => handleSubmit(e)} >
                <div>
                    <label>Name:</label>
                    <input  type="text" 
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChangeInput(e)} />
                </div>
                <div>{error.name && (<p className={style.error} >{error.name}</p>)}</div>    
                <br />
                <div>
                    <label>Image:</label>
                    <input  type="text" 
                            value={input.imagen}
                            name="imagen"
                            onChange={(e) => handleChangeInput(e)} />
                </div>
                <div>{error.imagen && (<p className={style.error} >{error.imagen}</p>)}</div> 
                <br />
                <div>
                    <label>Minimun Height:</label>
                    <input  type="text" 
                            value={input.altura1}
                            name="altura1"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)} />   
                <div>{error.altura1 && (<p className={style.error} >{error.altura1}</p>)}</div>
                    <label>Maximum:</label>
                    <input  type = "text"
                            name = "altura2"
                            value= {input.altura2}
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}></input>
                </div>
                <div>{error.altura2 && (<p className={style.error} >{error.altura2}</p>)}</div>
                <div>{error.alturaError && (<p className={style.error} >{error.alturaError}</p>)}</div>
                <br />
                <div>
                    <label>Weight Minimun :</label>
                    <input  type="text" 
                            value={input.peso1}
                            name="peso1"
                            className={style.input}
                            onChange={(e) => handleChangeInput(e)}/>  
                <div>{error.peso1 && (<p className={style.error} >{error.peso1}</p>)}</div>  
                    <label>Maximum:</label>
                    <input  type="text" 
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
                </div>
                <div>{error.lifes_span && (<p className={style.error} >{error.lifes_span}</p>)}</div>  
                <br />
                <div>
                <label>Temperaments: </label>
                <select onChange={(e) => handleSelect(e)} >
                    {
                        Temperaments && Temperaments.map((tem,i) => (
                            <option key={i}  value={tem.name}>{tem.name}</option>
                            ))
                        }
                </select>
                </div>
                <br />
                <div>
                {input.temperament && input.temperament.map((el,i) =>{
                    return (
                        <div key={i} >
                                    <button className={style.buttonDelete} onClick={()=>handleDelete(el)}>X</button>
                                    <h3>{el}</h3>
                        </div>
                            )
                            
                        })}
                </div>
                <div>
                {
                    Object.keys(error).length === 0 ?
                    (<button type="submit">Create Race</button>):
                    (<h1>INSERT INFO</h1>)
                }
                </div>
            </form>
        </div>
        </div>
    )
}
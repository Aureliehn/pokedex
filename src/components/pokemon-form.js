import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';
import Pokemon from '../models/pokemon';
const PokemonForm = ({pokemon, isEditForm}) => {

    const navigate = useNavigate() 
    const [form, setForm]=useState({
        picture:{value:pokemon.picture},
        name:{value:pokemon.name, isValid:true},
        hp:{value:pokemon.hp, isValid:true},
        cp:{value:pokemon.cp, isValid:true},
        types:{value:pokemon.types, isValid:true},
    })

    const types = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];
    
    const handleInputChanged = (e)=>{
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const newField = {[fieldName]: {value:fieldValue}};

        setForm({...form, ...newField});
    }

    const isAddForm=()=>{
        return !isEditForm
    }
    const selectType = (type, e)=>{
        const checked  = e.target.checked
        let newField;

        if(checked){
            const newsTypes = form.types.value.concat([types]);
            newField ={value:newsTypes}
        } else {
            const newsTypes = form.types.value.filter((currentType)=> currentType !== type);
            newField= {value:newsTypes}
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // const isFormValid = validateForm()
        // if(isFormValid){
        //     navigate(`/pokemons/${pokemon.id}`)
        // }
        pokemon.picture = form.picture.value
        pokemon.name = form.name.value
        pokemon.hp = form.hp.value
        pokemon.cp = form.cp.value
        // PokemonService.updatePokemon(pokemon).then(()=>navigate(`/pokemons/${pokemon.id}`))
        isEditForm ? updatePokemon() : addPokemon()
    }

    const addPokemon = ()=>{
        PokemonService.addPokemon(pokemon).then(()=>navigate(`/pokemons`))
    }
    const updatePokemon= ()=>{
        PokemonService.updatePokemon(pokemon).then(()=>navigate(`/pokemons/${pokemon.id}`))
    }
    const validateForm= ()=>{
        let newForm = form;
        if(isAddForm()){
            const start="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"
            const end= ".png"
            if(!form.picture.value.startsWith(start)||!form.picture.value.endsWith(end)){
                const errorMsg = "Url pas valide"
                const newField= {value: form.picture.value, errorMsg: errorMsg, isValid: false}
                newForm = {...form, ...{picture:newField}}
            }else{
                const newField={value: form.picture.value, errMsg:'', isValid:true}
                newForm={...form, ...{picture: newField}}
            }
        }
        if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)){
            const errMsg = 'Le nom est requis';
            const newField = {value: form.name.value, error: errMsg, isValid: false};
            newForm = {...newForm, ...{name: newField}};
        }else{
            const newField = {value: form.name.value, error: '', isValid:true};
            newField = {...newForm, ...{name: newField}}
        }
        if(!/^[0-99 ]{1,2}$/.test(form.hp.value)){
            const errMsg = 'Les points de vie doivent être compris entre 0 et 99';
            const newField = {value: form.hp.value, error: errMsg, isValid: false};
            newForm = {...newForm, ...{hp: newField}};
        }
        else{
            const newField = {value: form.hp.value, error: '', isValid:true};
            newField = {...newForm, ...{hp: newField}}
        }
        setForm(newForm)
        return newForm.name.isValid && newForm.hp.isValid 
    }

    const deletePokemon = ()=>{
        PokemonService.deletePokemon(pokemon).then(()=>navigate(`/pokemons`))
    }

  return (
    <form onSubmit={e=>handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
          {isEditForm && (
             <div className="card-image">
             <img src={pokemon.picture} value={form.picture.value} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
             <sapn className="btn-floating halfway-fab waves-effect waves-light">
               <i onClick={deletePokemon} className="material-icons">suppr</i>
             </sapn>
           </div>
          )}
           
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                {isAddForm() && (
                    <div className="form-group">
                        <label htmlFor="name">Image</label>
                        <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e =>handleInputChanged(e)}></input>
                        {form.picture.error &&
                        <div className='card-panel red accent-1'>
                        {form.picture.error}</div>}
                        </div>
                )}

                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e =>handleInputChanged(e)}></input>
                </div>
                {form.name.error &&
                <div className='card-panel red accent-1'>
                    {form.name.error}</div>}
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e =>handleInputChanged(e)}></input>
                </div>
                {form.hp.error &&
                <div className='card-panel red accent-1'>
                    {form.hp.error}</div>}
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e =>handleInputChanged(e)}></input>
                </div>
       
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={types} onChange={e=>selectType(type,e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
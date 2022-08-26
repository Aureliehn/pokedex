import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatType from '../helpers/format-type';

const PokemonForm = ({pokemon}) => {

    const navigate = useNavigate() 
    const [form, setForm]=useState({
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
        const isFormValid = validateForm()
        if(isFormValid){
            navigate(`/pokemons/${pokemon.id}`)
        }

    }

    const validateForm= ()=>{
        let newForm = form;
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

  return (
    <form onSubmit={e=>handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
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
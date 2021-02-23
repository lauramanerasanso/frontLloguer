import React from 'react';


const Input = ({ atributs, handleChange, param }) => {
    return (
        <div className='inputContainer'>
            <input
                id={atributs.name}
                placeholder={atributs.ph}
                name={atributs.name}
                type={atributs.inputType}
               onChange={ (e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
            />
        </div>
    )
};

export default Input;
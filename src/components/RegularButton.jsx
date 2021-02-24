import React from 'react';

const RegularButton = ({ handleOnClick, text, param }) => {
    return (
        <div className='regularButtonLoginContainer'>
            <button
            onClick={ (e) => handleOnClick(e) }
            disabled={ param ? false : true }
            className="btn btn-primary"
            >
                { text }
            </button>
        </div>
    )
};

export default RegularButton;
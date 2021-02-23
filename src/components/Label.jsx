import React from 'react';

const Item = ({ text, per, classe }) => {
    return (
        <div className='ItemComponent'>
            <label className={classe} htmlFor={per}>
                { text }
            </label>
        </div>
    )
};


Item.defaultProps = {
    for : "label"
}

export default Item;
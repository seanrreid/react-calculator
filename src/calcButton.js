import React from 'react';

const buttonStyle = {
    alignItems: 'center',
    borderRadius: '1px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 4px',
    minHeight: '48px',
    textAlign: 'center',
    transition: 'border-color .2s ease-in-out, background-color .2s, box-shadow .2s'
}

const CalcButton = props => {
    const {type, value, onPress } = props;
    return (
        <button style={buttonStyle} className={type} type='button' onClick={() => onPress(value)} >
            {value}
        </button>
    )
}

export default CalcButton


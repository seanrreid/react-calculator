import React from 'react';
import CalcButton from './calcButton';

const GenerateButtons = props => {
    const { buttons, type, clickAction } = props;
    return buttons.map(button => <CalcButton key={button.value} type={type} value={button.value} onPress={(value) => clickAction(value)} />)
}

export default GenerateButtons;
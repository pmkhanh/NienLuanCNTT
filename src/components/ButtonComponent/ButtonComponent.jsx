import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({size, styleButton, textButton, disabled,...rests}) => {
    return (
        <Button 
        disabled={disabled}
            size={size} 
            style={
                {...styleButton,
                    opacity: disabled && .7,
                    cursor: disabled && 'no-drop',
                }
            }
            {...rests}>
            <span>{textButton}</span>
        </Button>
    )
}

export default ButtonComponent;
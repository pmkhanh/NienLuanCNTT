import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({size, styleButton, textButton, disabled,...rests}) => {
    return (
        <Button 
            size={size} 
            style={
                {...styleButton,
                    opacity: disabled && .7
                }
            }
            {...rests}>
            <span>{textButton}</span>
        </Button>
    )
}

export default ButtonComponent;
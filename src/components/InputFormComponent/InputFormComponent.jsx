import { Input } from 'antd';
import React, { useState } from 'react'
import { WrapperInput } from './style';

const InputFormComponent = (props) => {
    const {valueInput, setValueInput} = useState('');
    const {placeholder, ...rests} = props;
    return (
        <div style={{width: '450px'}} >
            <WrapperInput allowClear  placeholder={placeholder} valueInput={valueInput} {...rests} />
        </div>
    )
}

export default InputFormComponent;
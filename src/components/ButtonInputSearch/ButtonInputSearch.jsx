import { Button, Input } from 'antd';
import React from 'react';
import {
    SearchOutlined
  } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const { size,
        placeholder,
        textButton,
        borderR = '2px',
        marginL = '7px',
        } = props;
    return (
        <div style={{display: 'flex'}} >
            <Input 
                allowClear
                size={size} 
                placeholder={placeholder} 
                style={{backgroundColor: "#fff", borderRadius: '2px'}}
                 />
            <ButtonComponent 
                size={size} 
                styleButton={{borderRadius: borderR, marginLeft: marginL}}
                icon={<SearchOutlined style={{color: 'rgb(26, 148, 255)'}}/>}
                textButton = {textButton}   
            />
        </div>
    )
}

export default ButtonInputSearch;
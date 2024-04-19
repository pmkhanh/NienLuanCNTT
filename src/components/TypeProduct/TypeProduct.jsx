import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProduct = ({name}) => {
    const navigate = useNavigate()
    const typeProduct=() => {
        navigate('/typeproduct')
    }
    return (
        <div onClick={typeProduct} style={{cursor: 'pointer'}}>
            {name}
        </div>
    )
}

export default TypeProduct;
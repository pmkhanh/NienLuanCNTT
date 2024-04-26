import { useNavigate } from 'react-router-dom';

const TypeProduct = ({ name }) => {
    const navigate = useNavigate()
    const navigateType = (type) => {
        // .normalize : bo di dau tieng viet
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
      }
    return (
        <div onClick={() => navigateType(name)} style={{cursor: 'pointer'}}>
            {name}
        </div>
    )
}

export default TypeProduct;
import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../Services/ProductService'
import CardComponent from '../../components/CardComponent/CardComponent'
import Loading from '../../components/LoadingComponent/Loading'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import { useDebounce } from "../../hooks/useDebounce"
import { WrapperTypeProduct } from './style'


const TypeProductpage = () => {
    const { state } = useLocation();
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500);
    const [products, setProducts] = useState([]);
    const [isPending, setIsPeding] = useState(false);
    const [panigate, setPanigate] = useState({
        limit: 12,
        page: 0,
        total: 1,
    })

    // San pham theo loai
    const fetchProductType = async (type, page, limit) => {
        // setIsPeding(true)
        const res = await ProductService.productType(type, page, limit);
        if (res?.status === 'OK') {
            setProducts(res?.data)
            setIsPeding(false)
            setPanigate({
                ...panigate,
                total: res?.totalPage
            })

        } else {
            setIsPeding(false)

            console.log('error')
        }
    }
    useEffect(() => {
        if (state !== '') {
            fetchProductType(state, panigate.page, panigate.limit)
        }

    }, [state, panigate.page, panigate.limit])

    // Phan trang san pham
    const handlePanigate = (current, pageSize) => {
        setPanigate({
            ...panigate,
            page: current - 1,
            limit: pageSize,
        })
    }

    return (
        <Loading isPending={isPending}>
            <div>

                < div style={{ display: 'flex', marginTop: '30px', padding: '0 120px' }} >
                    <div>
                        <NavbarComponent />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5px' }}>
                        <WrapperTypeProduct  >
                            {products?.filter((pro) => {
                                if(searchDebounce === ''){
                                    return pro
                                }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLocaleLowerCase())){
                                    console.log('object', pro?.name?.toLowerCase()?.includes(searchDebounce?.toLocaleLowerCase()))
                                    return pro;
                                }
                            })?.map((product) => {

                                    return (
                                        < CardComponent
                                            id={product._id}
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            status={product.status}
                                            sell={product.sell}
                                        />
                                    )
                               
                            })}
                        </WrapperTypeProduct>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '22px' }} >
                    <Pagination
                        defaultCurrent={panigate?.page + 1}
                        total={panigate?.total}
                        onChange={handlePanigate}
                    />
                </div>
            </div>

        </Loading>
    )
}

export default TypeProductpage;
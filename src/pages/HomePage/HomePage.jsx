import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as ProductService from '../../Services/ProductService';
import slider1 from '../../assets/images/Slider1.webp';
import slider2 from '../../assets/images/Slider2.webp';
import slider3 from '../../assets/images/Slider3.webp';
import CardComponent from "../../components/CardComponent/CardComponent";
import IncentivesComponent from "../../components/IncentivesComponent/IncentivesComponent";
import Loading from '../../components/LoadingComponent/Loading';
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { useDebounce } from "../../hooks/useDebounce";
import { StyleButtonHover, StyleIncentives, StyleSlider, WrapperStyleProducts, WrapperTypeProduct } from "./style";



const HomePage = () => {
    const searchText = useSelector((state) => state?.product?.search)
    const [limit, setLimit] = useState(15);
    const searchDebounce = useDebounce(searchText, 500);
    const [isPendingSerch, setIsPendingSearch] = useState(false);
    const [typeProduct, setTypeProduct] = useState('');
    const navigate = useNavigate()

    const fetchProducts = async (context) => {
        try {
            const search = context?.queryKey && context?.queryKey[2];
            const limit = context?.queryKey && context?.queryKey[1];
            const res = await ProductService.getAllProduct(search, limit);
            return res;

        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Không tìm thấy sản phẩm:", error.response.data);
            } else {
                console.error("Có lỗi trong khi lấy dữ liệu:", error);
            }
        }
    }
    const fetchProductType = async () => {
        const res = await ProductService.getAllProductType();
        if (res?.status === 'OK') {
            setTypeProduct(res?.data)
        }
        return res;
    }
    const { isPending, data: product, isPreviousData } = useQuery({ queryKey: ['product', limit, searchDebounce], queryFn: fetchProducts, retry: 3, retryDelay: 1000, keepPreviousData: true })
    const queryProductType = useQuery({ queryKey: 'types', queryFn: fetchProductType })
    return (
        <div style={{ padding: '5px 120px', height: '200vh' }} >
            <WrapperTypeProduct>
                {
                    queryProductType?.data?.data?.map((type) => {
                        return (
                            <TypeProduct name={type} key={type} />

                        )
                    })
                }
            </WrapperTypeProduct>
            <StyleSlider>
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
                <StyleIncentives>
                    <IncentivesComponent />
                </StyleIncentives>
            </StyleSlider>
            <Loading isPending={isPending || isPendingSerch}>

                {product?.data?.length
                    ?
                    (<><WrapperStyleProducts>
                        {product?.data?.map((Product) => {
                            return (
                                <CardComponent
                                    id={Product._id}
                                    key={Product._id}
                                    countInStock={Product.countInStock}
                                    description={Product.description}
                                    image={Product.image}
                                    name={Product.name}
                                    price={Product.price}
                                    rating={Product.rating}
                                    type={Product.type}
                                    status={Product.status}
                                    sell={Product.sell}
                                />
                            );
                        })}
                    </WrapperStyleProducts><div style={{ textAlign: 'center' }}>
                            <StyleButtonHover
                                disabled={product?.total === product?.data?.length || product.totalPage === 1}
                                onClick={() => setLimit((prev) => prev + 5)}
                                textButton={"Xem Thêm"}
                                type="outline"
                                styleButton={{
                                    border: '1px solid #f53d2d',
                                    width: '120px',
                                    height: '40px',
                                    borderRadius: '5px'
                                }} />
                        </div></>)
                    :
                    (<>
                        <div
                            style={{
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '15vh',
                                backgroundColor: '##F0F0F0',
                                alignItems: 'center'
                            }} >

                            <h2>Không tìm thấy sản phẩm </h2>

                        </div>
                    </>)}
            </Loading>


        </div>

    )
}

export default HomePage;

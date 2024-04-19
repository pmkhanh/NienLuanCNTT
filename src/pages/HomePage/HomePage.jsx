import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { StyleButtonHover, StyleIncentives, StyleSlider, WrapperStyleProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../assets/images/Slider1.webp'
import slider2 from '../../assets/images/Slider2.webp'
import slider3 from '../../assets/images/Slider3.webp'
import IncentivesComponent from "../../components/IncentivesComponent/IncentivesComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../Services/ProductService'



const HomePage = () => {
    const category = ['Thời Trang Nam',
        'Điện Thoại & Phụ Kiện',
        'Thiết Bị Điện Tử',
        'Thời Trang Nữ',
        'Nhà Cửa & Đời Sống',
        'Sắc Đẹp',
        'Sức Khỏe',
        'Thể Thao & Du Lịch',
        'Đồng Hồ'
    ]
    const fetchProdcts = async () => {
        const res = await ProductService.getAllProduct()
        //    console.log("product", res)
        return res
    }
    const { isPending, data: product } = useQuery({ queryKey: 'product', queryFn: fetchProdcts, retry: 3, retryDelay: 1000 })
    // console.log("product", product)
    const navigate = useNavigate()

    return (
        <div style={{ padding: '5px 120px', height: '2000px' }} >
            <WrapperTypeProduct>

                {
                    category.map((cate) => {
                        return (
                            <TypeProduct name={cate} key={cate} />

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
            <WrapperStyleProducts  >
                {product?.data?.map((Product) => {
                    return (
                        <CardComponent 
                            key={Product._id} 
                            countInStock={Product.countInStock} 
                            description={Product.description} 
                            image={Product.image} 
                            name={Product.name} 
                            price={Product.price} 
                            rating={Product.rating} 
                            type={Product.type}
                            status={Product.status}
                            sell={Product.sell} />
                    )
                })}
            </WrapperStyleProducts>
            <div style={{ textAlign: 'center' }} >
                <StyleButtonHover textButton={"Xem Thêm"} type="outline" styleButton={{
                    border: '1px solid #f53d2d',
                    width: '120px', height: '40px', borderRadius: '5px'
                }
                } />
            </div>
        </div>
    )
}

export default HomePage;

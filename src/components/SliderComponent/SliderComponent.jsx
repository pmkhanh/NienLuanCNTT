import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick';
import { SilderComponent } from './style';

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (
        <SilderComponent>
            <Slider {...settings} >
                {arrImages.map((image) => {
                    return (
                        <Image src={image} alt="slider"/>
                    )
                })}
            </Slider>
        </SilderComponent>
    )
}

export default SliderComponent;
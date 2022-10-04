import React from 'react';
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom"

const ProductsDetail = () => {

    const { id } = useParams();

    const productsList = useSelector(state => state.productsList);

    const productDetail = productsList.find(product => product.id === Number(id))
    console.log(productDetail)

    return (
			<div>
				<h1>{productDetail?.title}</h1>
				<p>{productDetail?.lead}</p>
				<img src={productDetail?.productImgs} alt='' />
			</div>
		)
};

export default ProductsDetail;
import React, {useState, useEffect} from 'react';
import { Col, ListGroup, Row, Button, Carousel, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams} from "react-router-dom"
import { addCartThunk } from '../store/slices/cart.slice';

const ProductsDetail = () => {

	const { id } = useParams();
	const dispatch = useDispatch();

	const productsList = useSelector(state => state.productsList);
	const [rate, setRate] = useState(1);

    const productDetail = productsList.find(product => product.id === Number(id))
	const relatedProduct = productsList.filter(	(products) => {
		if (products.category.id === productDetail.category.id && products.id !== productDetail.id) { 
			return products
		}
		}
	)

	useEffect(() => {
		setNumberItems(0)
	}, [id])

	const [numberItems, setNumberItems] = useState(0)

	const addCart = () => {
		alert("Adding")
		const purchase = {
			id: id,
			quantity: rate,
		}
		dispatch(addCartThunk(purchase));
	}
	

    return (
			<Row>
				<Col>
					<h1>{productDetail?.title}</h1>
					<p>{productDetail?.lead}</p>
					<div className='rate mb-5'>
						<Button className='me-3' onClick={() => setRate(rate - 1)}>
							-
						</Button>
						{rate}
						<Button className='ms-3' onClick={() => setRate(rate + 1)}>
							+
						</Button>
						<br />
						<Button className='mt-2' onClick={() => addCart()}>
							ADD TO CART
						</Button>
					</div>

					<Carousel className='content' slide={false}>
						<Carousel.Item>
							<img
								className='d-block w-100'
								src={productDetail?.productImgs[0]}
								alt='First slide'
							/>
						</Carousel.Item>

						<Carousel.Item>
							<img
								className='d-block w-100'
								src={productDetail?.productImgs[1]}
								alt='Second slide'
							/>
						</Carousel.Item>

						<Carousel.Item>
							<img
								className='d-block w-100'
								src={productDetail?.productImgs[2]}
								alt='Third slide'
							/>
						</Carousel.Item>
					</Carousel>

					<p>{productDetail?.description}</p>
				</Col>

				<Col lg={3}>
					{/* <ListGroup variant='flush'>
						{relatedProduct.map((product) => (
							<ListGroup.Item key={product.id}>
								<Link to={`/product/${product.id}`}>
									<img src={product.productImgs} alt='' className='img-fluid' />
									{product.title}
								</Link>
							</ListGroup.Item>
						))}
					</ListGroup> */}

					<Row xs={1} md={1} xl={1}>
						{relatedProduct.map((products) => (
							<Col key={products.id}>
								<Link to={`/product/${products.id}`}>
									<Card className='Card' style={{ heigth: '100%' }}>
										<Card.Img variant='top' src={products.productImgs[1]} className='img-card' />
										<Card.Body>
											<Card.Title>{products.title}</Card.Title>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		)
};

export default ProductsDetail;
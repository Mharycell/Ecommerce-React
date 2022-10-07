import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const purchases = useSelector(state => state.purchases);const formatDate = (date) => {
			const months = [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre',
			]
			const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
			const newDate = new Date(date)
			const day = days[newDate.getDay()]
			const month = months[newDate.getMonth()]
			const dayNumber = newDate.getDate()
			return `${month}, ${day} ${dayNumber}`
		}

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])
    
    
    return (
			<div style={{ maxWidth: '900px', margin: '10% auto' }}>
				<h1>Purchases</h1>
				<hr />
				<ListGroup>
					{purchases.map((purchase) => {
						return (
							<ListGroup.Item
								key={purchase.id}
								style={{
									marginBottom: '20px',
									borderRadius: '20px',
									padding: '50px',
									backgroundColor: '#f5f5f5',
									border: '1px solid #e3e3e3',
								}}
							>
								<h5>
									{' '}
									<b>{formatDate(purchase.createdAt)}</b>{' '}
								</h5>
								<hr />
								{purchase.cart.products.map((product) => {
									return (
										<div
											key={product.id}
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'flex-start',
												marginBottom: '20px',
											}}
										>
											<div style={{ width: '50%' }}>
												<p>{product.title}</p>
											</div>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
													justifyContent: 'space-around',
													width: '50%',
												}}
											>
												<p
													style={{
														border: '1px solid #e3e3e3',
														padding: '4px 22px',
													}}
												>
													{' '}
													{product.productsInCart.quantity}{' '}
												</p>
												<p>$ {product.price} </p>
											</div>
										</div>
									)
								})}
							</ListGroup.Item>
						)
					})}
				</ListGroup>
			</div>
		)
};

export default Purchases;

// onClick={() => navigate(`/products/${purchase.products.id}`)}
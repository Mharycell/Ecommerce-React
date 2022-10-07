import React, {useEffect}  from 'react';
import { Offcanvas, ListGroup, Button } from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import { getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';
import { useNavigate, Link } from 'react-router-dom'

const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartThunk());
        
    }, [])



    return (
			<Offcanvas show={show} onHide={handleClose} placement='end'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Purchases</Offcanvas.Title>
				</Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    This is your cart!
                    {cart?.map(product=> (
                        <ListGroup.Item key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                {product.title}
                            </Link>
                        </ListGroup.Item>
                    ))}                
                </ListGroup>    
                <Button onClick={() => dispatch(purchaseCartThunk())}>
                    Checkout
                </Button>                       
				</Offcanvas.Body>
			</Offcanvas>
		)
};

export default CartSidebar;
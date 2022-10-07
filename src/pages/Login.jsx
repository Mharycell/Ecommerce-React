import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const Login = () => {

	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	
	const submit = (data) => {
		console.log(data)
		axios
			.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
			.then((res) => {
				localStorage.setItem('token', res.data.data.token)
				alert('usuario loggeado')
				navigate('/')
			})
			.catch((error) => {
				if (error.response?.status === 404) {
					alert('credenciales inválidas')
				}
				console.log(error.response)
			})
	}

	return (
		<div style={{maxWidth: "350px", margin: "0 auto"}}>
			<Form onSubmit={handleSubmit(submit)}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control {...register("email")} type='email' placeholder='Enter email' />					
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control {...register("password")} type='password' placeholder='Password' />
				</Form.Group>
				
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
		)
};

export default Login;


//<i class="fa-solid fa-user"></i>  usuario
//<i class="fa-solid fa-cart-shopping"></i>  car
//<i class="fa-solid fa-bag-shopping"></i>  bolsa compras
//<i class="fa-solid fa-house"></i>  home
//<i class="fa-solid fa-magnifying-glass"></i> search
//<i class="fa-solid fa-magnifying-glass"></i> return
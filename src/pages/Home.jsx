import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios"
import {Button, InputGroup, Form, Row, Col, Card, ListGroup, ListGroupItem} from "react-bootstrap"


const Home = () => {

    const navigate = useNavigate();
    const productsList = useSelector(state => state.productsList);
    const [categories, setCategories] = useState([]);
    const [searchProduct, setSearchProduct] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setFilteredProducts(productsList)
    },[productsList])

    const filterCategory = (categoryId) => {
        const filtered = productsList.filter(products =>
            products.category.id === categoryId)
        setFilteredProducts(filtered)
    }
    
    const searchProducts = () => {
        const filtered = productsList.filter((products) =>
            products.title.toLowerCase().includes(searchProduct.toLowerCase()))
				setFilteredProducts(filtered)
    }

    return (
			<Row>
				<Col lg={3}>
					<ListGroup>
						{categories?.map((category) => (
							<ListGroupItem
								key={category.id}
								onClick={() => filterCategory(category.id)}
								style={{ cursor: 'pointer' }}
							>
								{category.name}
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>

				<Col>
					<InputGroup className='mb-3'>
						<Form.Control
							placeholder='Search product'
							onChange={(e) => setSearchProduct(e.target.value)}
							value={searchProduct}
						/>
						<Button variant='outline-secondary' onClick={searchProducts}>
							Search
						</Button>
					</InputGroup>
					<Row xs={1} md={2} xl={3} className='g-4'>
						{filteredProducts.map((products) => (
							<Col key={products.id}>
								<Card className="Card" onClick={() => navigate(`/product/${products.id}`)} style={{heigth: "100%"}}>
									<Card.Img variant='top' src={products.productImgs[1]} className="img-card" />
									<Card.Body>
										<Card.Title>{products.title}</Card.Title>
										<Card.Text>											
											{products.category.name}	
										</Card.Text>
										<Card.Text className="price">Price: {products.price}$</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Col>			
			</Row>
		)
};

export default Home;
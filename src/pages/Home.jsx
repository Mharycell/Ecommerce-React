import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios"
import {Button} from "react-bootstrap"


const Home = () => {

    const navigate = useNavigate();
    const productsList = useSelector(state => state.productsList);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data))
    }, [])

    // const filterCategory = (categoryId) => {
    //     const filtered = productsList.filter(products =>
    //         products.category.id === categoryId)
    }


    return (
        <div>
            <h1>este es mi componente Home</h1>
            {/* {
                categories.map(category => (
                    <Button key={category.id} onClick={() => filterCategory(category.id) } >
                        {categories.name}
                    </Button>
                ))
            } */}

            <ul>
                {productsList.map(products => (
                    <li key={ products.id} onClick={()=> navigate(`/products/$product.id`)}>
                        <h4>{products.title}</h4>
                        <img src={products.productImgs} alt="" width={"40%"} /> 
                        <p>{products.description}</p>
                        <p>{products.category.name}</p>
                        <p>{ products.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
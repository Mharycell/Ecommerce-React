import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import ProductsDetail from './pages/ProductsDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import MyNavBar from './components/MyNavBar'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProductsThunk } from './store/slices/products.slice'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

	const isLoading = useSelector(state => state.isLoading)  
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductsThunk())
	}, [])
	

  return (
    <HashRouter>
      <MyNavBar />
		  {isLoading && <LoadingScreen />}
		  <Container className='mt-5'>			  
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/:id' element={<ProductsDetail />} />
				<Route path='/login' element={<Login />} />
				  <Route element={ <ProtectedRoutes/>}>
					<Route path='/Purchases' element={<Purchases />} />					  
				  </Route>
			</Routes>
		  </Container>
		</HashRouter>
	)
}

export default App

import {Routes,Route} from 'react-router-dom'
// import Navbarseller from './components/Navbarseller'
import Signupseller from './pages/seller/SellerSignup'
import Signupbuyer from './pages/buyer/SignupBuyer'
import Loginseller from './pages/seller/SellerLogin'
import Loginbuyer from './pages/buyer/Loginbuyer'
import Addproduct from './pages/seller/Addproduct'
import Viewproduct from './pages/seller/Viewproduct'
import Navbaradmin from './components/Navbaradmin'
import Viewproducts from './pages/admin/Viewproducts'
import Home from './pages/buyer/Home'
import Cart from './pages/buyer/Cart'
import OrderPageForAdmin from './pages/admin/OrderPageForAdmin'

//hhhhhhh
function App() {
  //comment

  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signupseller" element={<Signupseller/>} />
    <Route path="/signupbuyer" element={<Signupbuyer/>} />
    <Route path="/loginseller" element={<Loginseller/>}/>
    <Route path="/loginbuyer" element={<Loginbuyer/>}/>
    <Route path='/addproduct' element={<Addproduct/>} />
    <Route path='/getproductforseller' element={<Viewproduct/>} />
    <Route path='/navbaradmin' element={<Navbaradmin/>} />
    <Route path='/getproductforadmin' element={<Viewproducts/>} />
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/orderpageforadmin' element={<OrderPageForAdmin/>}/>

    </Routes>
    </>
  )
}

export default App

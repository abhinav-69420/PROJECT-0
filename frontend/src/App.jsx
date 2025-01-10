import {Routes,Route} from 'react-router-dom'
import Navbarseller from './components/Navbarseller'

//hhhhhhh
function App() {
  

  return (
    <>
    <Routes>
    <Route path="/" element={<Navbarseller />} />
    </Routes>
    </>
  )
}

export default App

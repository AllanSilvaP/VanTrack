import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Responsavel from "./pages/Responsavel"
import Motorista from "./pages/Motorista"
import RoleProtectedRoute from "./context/RoleProtectedRoute"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*Raiz direto para login*/}
          <Route path="/" element={<Navigate to="/login" replace/>}></Route>

          {/*Publicas*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          {/*Privadas*/}
          <Route path="/responsavel" element={<RoleProtectedRoute allowedRoles={["responsavel"]}><Responsavel/></RoleProtectedRoute>}/>
          <Route path="/motorista" element={<RoleProtectedRoute allowedRoles={["motorista"]}><Motorista/></RoleProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

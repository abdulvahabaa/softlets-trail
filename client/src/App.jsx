import AnonymousPage from "./components/AnonymousPage/anonymous"
import AuthPage from "./components/authenicatedPage/authPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnonymousPage/>} />
        <Route path="/auth" element={<AuthPage />} />
          
        <Route path="*" element={<>No Match</>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App



 

import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./ui/MainLayout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<MainLayout/>}/> 
      </Routes>
    </BrowserRouter>
  )
}

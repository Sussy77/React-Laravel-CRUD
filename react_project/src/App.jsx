import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Create from "./pages/Students/create";
import Show from "./pages/Students/show";
import Update from "./pages/Students/Update";


export default function App(){
  return <BrowserRouter>
  <Routes>

    <Route path="/" element={<Layout/>}>    
      <Route index element={<Home />}/>
      <Route path="/create" element={<Create />}/>
      <Route path="/students/:id" element={<Show />}/>
      <Route path="/students/update/:id" element={<Update />}/>
     
    </Route>
  </Routes>
  </BrowserRouter>
}

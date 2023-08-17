import styles from "./App.module.css"
import {Route,Routes,BrowserRouter} from "react-router-dom"
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Create from "./pages/Create/Create";
import Update from "./pages/Update/Update";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
// import Navbar from "./components/Navbar/Navbar";


function App() {
  return (<>

    <div className={styles.app}>
  <div className={styles.main}>

  <BrowserRouter>
    <Routes>


    
      <Route element={
        <Home/>
      } exact path="/" />


    
      <Route element={
        <Blog/>
      } exact path="/blog" />



      <Route element={
        <Update/>
      } exact path="/blog/:id/update" />
 
 
      <Route element={
        <Create/>
      } exact path="/create" />



      <Route path="/blog/:id" element={
        <BlogDetail/>
      } />


    </Routes>
  </BrowserRouter>
  </div>
    <Footer/>
    </div>
  </>
  );
}

export default App;

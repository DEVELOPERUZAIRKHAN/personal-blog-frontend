import styles from "./App.module.css"
import {Route,Routes,BrowserRouter} from "react-router-dom"
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
function App() {
  return (
    <div className={styles.app}>



  <BrowserRouter>
    <Routes>


    
      <Route element={
        <Blog/>
      } exact path="/" />



      <Route path="/:id" element={
        <BlogDetail/>
      } />


    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;

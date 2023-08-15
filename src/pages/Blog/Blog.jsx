import styles from  "./Blog.module.css"
import {getAll} from "../../api/internal.js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export default function Blog(){
   const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
   const handleClick = (id) =>{ 
navigate('/blog/'+id)
   }
    useEffect(() => {
        (async()=>{
          const response =  await getAll()
          if(response.data.blogs){
              setBlogs(response.data.blogs)
          }
          console.log(response.data.blogs)
        })()

      return () => {
        setBlogs([])
      }
    }, [])
    
    
    return (
        <div className={styles.main}>
         <div className={styles.navSection}>
            <div className={styles.navbar}>
                <Link className={styles.navLogo}>Devblogs </Link>
                <ul className={styles.mainNav}>
                <Link className={styles.navItem} to = '/'>Home</Link>
                <Link className={styles.navItem} to = '/blogs'>Blogs</Link>
 </ul>
                <Link to='/create' className={styles.navButton}>Create</Link>
            </div>            
            </div>
           
            <h1 className={styles.mainHeading}>All Blogs</h1>
            <ul className={styles.blogs}>
                {
                    blogs.map((blog)=>(
                        <section className={styles.lastSection}>
                <div className={styles.lastText}>
                    <h3 className={styles.lastHeading}>
                        {blog.title}
                    </h3>
                    <p className={styles.lastPara}>
                        {blog.description}
                    </p>
                    <button onClick={_=>handleClick(blog._id)} className={styles.lastButton}>
                Read Article
                    </button>
                </div>
                <div className={styles.lastPhotoContainer}>
                    <img className={styles.lastPhoto} src={`${blog.photo}`} alt="" srcset="" />
                </div>
            </section>
                    ))
                }
            </ul>

        </div>
    )
}
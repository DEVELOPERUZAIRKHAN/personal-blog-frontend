import styles from  "./Blog.module.css"
import {getAll} from "../../api/internal.js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export default function Blog(){
   const [blogs, setBlogs] = useState([])

//    const handleClick = (id) =>{ 


//    }
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

                <label className={styles.navLogo}>Devblogs</label>
                <ul className={styles.mainNav}>
                    <li className={styles.navItem}>Home</li>
                    <li className={styles.navItem}>Blogs</li>
                </ul>
                <button className={styles.navButton}>Create</button>
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
                    {/* <button onClick={_=>handleClick(blog._id)} className={styles.lastButton}> */}
                    <Link to={'/blog/'+blog._id}>
                     Read Article
                    </Link>
            
                    {/* </button> */}
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
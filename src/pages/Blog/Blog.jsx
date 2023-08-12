import styles from  "./Blog.module.css"
import {
    getAll
    } from "../../api/internal.js"
import { useEffect, useState } from "react"

export default function Blog(){
   const [blogs, setBlogs] = useState([])

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
            <h1 className={styles.mainHeading}>Blogs</h1>
            <ul className={styles.blogs}>
                {
                    blogs.map((blog)=>(
                        <div key={blog._id}  className={styles.blog}>
                        <div className={styles.textContainer}>
                        <h2 className={styles.title}>
                            {blog.title}
                        </h2>
                        <p className={styles.description}>
                            {blog.description}
                        </p>
                        </div>
                        <div className={styles.photoContainer}>
                        <img className={styles.photo} src={`${blog.photo}`} alt="Blog " />
                        </div>
                        </div>
                    ))
                }
            </ul>

        </div>
    )
}
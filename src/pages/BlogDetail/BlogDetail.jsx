import styles from "./BlogDetail.module.css"
import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import { getById } from "../../api/internal"
export default function BlogDetail(){
    
    const {id} = useParams()
    
    useEffect(() => {
        
      (async _=>{

       const response = await getById(id)
       console.log(response)
          
        }
      )()

      return () => {
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

            <header className={styles.header}>
                <h1 className={styles.mainHeading}>Time to get your house clean and in order</h1>
                <p className={styles.author}>Written by Uzair Khan on 12 Jul, 2023</p>
                <p className={styles.description}>
                Discover essential image optimization techniques for blazing-fast websites. Boost performance without sacrificing visual appeal!
                </p>
            </header>
            <div className={styles.photoCover}>
                {/* <img className={styles.photo} src={photo} alt="" /> */}
            </div>
          
        </div>
    )
}
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { getAll } from "../../api/internal";
export default function Home(){
const [blogs,setBlogs] = useState([])
    useEffect(() => {


        (async _ =>{
            try{

                const response =  await getAll()
                setBlogs(response.data.blogs)
            }
            catch(error){
                console.log(error)
            }
        })()
      return () => {
        
      }
    }, [])
    



    return(
        <div className={styles.main}>
            <header className={styles.header}>
                <div className={styles.mainPhotoContainer}>
                    <img className={styles.mainPhoto} src={`${blogs[0].photo}`} alt="" srcset="" />
                </div>
            <div className={styles.heroBox}>
                <h1 className={styles.mainHeading}>Time to get your house clean and in order</h1>
                <p className={styles.mainPara}>
                    To have good air quality, is not as simple as moving away from the city to the quiet and suburb environment
                </p>
                <button className={styles.mainButton}>Read Article</button>
            </div>
            </header>
        </div>
    )
}

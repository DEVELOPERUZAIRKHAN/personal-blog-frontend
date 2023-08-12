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
        setBlogs([])
      }
    }, [])
    
// console.log(blogs[0].photo)
if(!blogs[0]){
return (
    <div>Loading</div>
)
}

    return(
        <div className={styles.main}>
            <header style={{background:`url(${blogs[0].photo})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}} className={styles.header}>

            <div className={styles.white}></div>
        
            <div className={styles.heroBox}>
                <h1 className={styles.mainHeading}>Time to get your house clean and in order</h1>
                <p className={styles.mainPara}>
                    To have good air quality, is not as simple as moving away from the city to the quiet and suburb environment
                </p>
                <button className={styles.mainButton}>Read Article</button>
            </div>
            </header>

            <section className={styles.firstSection}>
                <div className={styles.leftFirst}>
                    <div className={styles.firstItem}>

                    </div>
                    <div className={styles.firstItem}>
                        <img src={`${blogs[0].photo}`} alt="" />
                        <h3 className={styles.itemHeading}></h3>
                    </div>
                </div>
                <div className={styles.rightFirst}></div>
            </section>
        </div>
    )
}

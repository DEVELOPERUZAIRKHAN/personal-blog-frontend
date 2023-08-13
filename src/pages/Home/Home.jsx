import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { getAll } from "../../api/internal";
export default function Home(){
const [blogs,setBlogs] = useState([])
const [section, setSection] = useState([])
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


if(!blogs[0]){
return (
    <div>Loading</div>
)
}

    return(
        <div className={styles.main}>
            <header style={{background:`url(${blogs[0].photo})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}} className={styles.header}>
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
            <div className={styles.white}></div>
        <div className={styles.container}>
            <div className={styles.heroBox}>
                <h1 className={styles.mainHeading}>{blogs[0].title}</h1>
                <p className={styles.mainPara}>
                    {blogs[0].description}
                </p>
                <button className={styles.mainButton}>Read Article</button>
            </div>
        </div>
            </header>

            <section className={styles.firstSection}>
                <div className={styles.leftFirst}>
                    <div className={styles.firstItem}>
                        <img className={styles.leftPhoto} src={`${blogs[1].photo}`} alt="" />
                        <h3 className={styles.leftHeading}>{blogs[1].title}</h3>
                        <p className={styles.leftPara}>{blogs[1].description}</p>
                        <button className={styles.leftButton}>Read Article</button>
                    </div>
                    <div className={styles.firstItem}>
                        <img className={styles.leftPhoto} src={`${blogs[2].photo}`} alt="" />
                        <h3 className={styles.leftHeading}>{blogs[2].title}</h3>
                        <p className={styles.leftPara}>{blogs[2].description}</p>
                        <button className={styles.leftButton}>Read Article</button>
                    </div>
                </div>
                <div className={styles.rightFirst}>
                    <div className={styles.rightItem}>
                        <h3 className={styles.rightHeading}>{blogs[3].title}</h3>
                        <p className={styles.rightPara}>{blogs[3].description}</p>
                        <button className={styles.rightButton}>Read this article</button>

                    </div>
            
                    <div className={styles.rightItem}>
                        <h3 className={styles.rightHeading}>{blogs[5].title}</h3>
                        <p className={styles.rightPara}>{blogs[5].description}</p>
                        <button className={styles.rightButton}>Read this article</button>

                    </div>
                </div>
            </section>
            <section className={styles.centerSection}>
                <h1 className={styles.centerHeading}>Read more blogs crafted for developers</h1>
                <button className={styles.centerButton}>View All</button>
            </section>
            <section className={styles.secondSection}>
            <div className={styles.secondContainer}>
            {

            }
                    <div className={styles.secondItem}>
                        <img className={styles.secondPhoto} src={`${blogs[6].photo}`} alt="" />
                        <h3 className={styles.secondHeading}>{blogs[6].title}</h3>
                        <p className={styles.secondPara}>{blogs[6].description}</p>
                        <button className={styles.secondButton}>Read Article</button>
                    </div>
                    <div className={styles.secondItem}>
                        <img className={styles.secondPhoto} src={`${blogs[7].photo}`} alt="" />
                        <h3 className={styles.secondHeading}>{blogs[7].title}</h3>
                        <p className={styles.secondPara}>{blogs[7].description}</p>
                        <button className={styles.secondButton}>Read Article</button>
                    </div>
                
                    <div className={styles.secondItem}>
                        <img className={styles.secondPhoto} src={`${blogs[8].photo}`} alt="" />
                        <h3 className={styles.secondHeading}>{blogs[8].title}</h3>
                        <p className={styles.secondPara}>{blogs[8].description}</p>
                        <button className={styles.secondButton}>Read Article</button>
                    </div>
                    <div className={styles.secondItem}>
                        <img className={styles.secondPhoto} src={`${blogs[9].photo}`} alt="" />
                        <h3 className={styles.secondHeading}>{blogs[9].title}</h3>
                        <p className={styles.secondPara}>{blogs[9].description}</p>
                        <button className={styles.secondButton}>Read Article</button>
                    </div>
                </div>
                
            </section>

            <section className={styles.lastSection}>
                <div className={styles.lastText}>
                    <h3 className={styles.lastHeading}>
                        {blogs[11].title}
                    </h3>
                    <p className={styles.lastPara}>
                        {blogs[11].description}
                    </p>
                    
                    <button className={styles.lastButton}>Read Article</button>
                </div>
                <div className={styles.lastPhotoContainer}>
                    <img className={styles.lastPhoto} src={`${blogs[11].photo}`} alt="" srcset="" />
                </div>
            </section>
        </div>
    )
}

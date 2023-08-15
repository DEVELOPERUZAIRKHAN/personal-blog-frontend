import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { getAll } from "../../api/internal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Home(){
const [blogs,setBlogs] = useState([])
const navigate = useNavigate()
const truncateTitle=(title,maxLength)=>{
    if(title.length>maxLength){
        return title.slice(0,maxLength-3)+'...';
    }
    else{
        return title
    }
}
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

                <Link to='/' className={styles.navLogo}>Devblogs</Link>
                <ul className={styles.mainNav}>
                    <Link to ='/' className={styles.navItem}>Home</Link>
                    <Link to ='/blog' className={styles.navItem}>Blogs</Link>
                </ul>
                <Link to='/create' className={styles.navButton}>Create</Link>
            </div>            
            </div>
            <div className={styles.white}></div>
        <div className={styles.container}>
            <div className={styles.heroBox}>
                <h1 className={styles.mainHeading}>{blogs[0].title}</h1>
                <p className={styles.mainPara}>
                    {blogs[0].description}
                </p>
                <button onClick={()=>navigate('/blog/'+blogs[0]._id)} className={styles.mainButton}>Read Article</button>
            </div>
        </div>
            </header>

            <section className={styles.firstSection}>
                <div className={styles.leftFirst}>
                    <div className={styles.firstItem}>
                        <img className={styles.leftPhoto} src={`${blogs[1].photo}`} alt="" />
                        <h3 className={styles.leftHeading}>{truncateTitle(blogs[1].title,46)}</h3>
                        <p className={styles.leftPara}>{truncateTitle(blogs[1].description,70)}</p>
                        <button onClick={()=>navigate('/blog/'+blogs[1]._id)} className={styles.leftButton}>Read Article</button>
                    </div>
                    <div className={styles.firstItem}>
                        <img className={styles.leftPhoto} src={`${blogs[2].photo}`} alt="" />
                        <h3 className={styles.leftHeading}>{truncateTitle(blogs[2].title,46)}</h3>
                        <p className={styles.leftPara}>{truncateTitle(blogs[2].description,70)}</p>
                        <button onClick={()=>navigate('/blog/'+blogs[2]._id)} className={styles.leftButton}>Read Article</button>
                    </div>
                </div>
                <div className={styles.rightFirst}>
                    <div className={styles.rightItem}>
                        <h3 style={{marginTop:'0'}} className={styles.rightHeading}>{truncateTitle(blogs[3].title,60)}</h3>
                        <p className={styles.rightPara}>{truncateTitle(blogs[3].description,70)}</p>
                        <button onClick={()=>{navigate('/blog/'+blogs[3]._id)}} className={styles.rightButton}>Read this article</button>

                    </div>
            
                    <div className={styles.rightItem}>
                        <h3 className={styles.rightHeading}>{truncateTitle(blogs[4].title,60)}</h3>
                        <p className={styles.rightPara}>{truncateTitle(blogs[4].description,70)}</p>
                        <button onClick={_=>navigate('/blog/'+blogs[4]._id)} className={styles.rightButton}>Read this article</button>

                    </div>
            
                    <div className={styles.rightItem}>
                        <h3 className={styles.rightHeading}>{truncateTitle(blogs[5].title,60)}</h3>
                        <p className={styles.rightPara}>{truncateTitle(blogs[5].description,70)}</p>
                        <button onClick={_=>navigate('/blog/'+blogs[5]._id)} className={styles.rightButton}>Read this article</button>

                    </div>
                </div>
            </section>
            <section className={styles.centerSection}>
                <h1 className={styles.centerHeading}>Read more blogs crafted for developers</h1>
                <button onClick={_=>navigate('/blog')} className={styles.centerButton}>View All</button>
            </section>
            <section className={styles.secondSection}>
            <div className={styles.secondContainer}>
            {

                    blogs.map((blog,index)=>
                    {
                        if (index>3){
                            return ''
                        }
                       return (
                    <div className={styles.secondItem}>
                        <img className={styles.secondPhoto} src={`${blog.photo}`} alt="" />
                        <h3 className={styles.secondHeading}>{truncateTitle(blog.title,56)}</h3>
                        <p className={styles.secondPara}>{truncateTitle(blog.description,80)}</p>
                        <button onClick={_=>navigate('/blog/'+blog._id)} className={styles.secondButton}>Read Article</button>
                    </div>

                    )})
            }
                   
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
                    
                    <button onClick={_=>navigate('/blog/'+blogs[11]._id)} className={styles.lastButton}>Read Article</button>
                </div>
                <div className={styles.lastPhotoContainer}>
                    <img className={styles.lastPhoto} src={`${blogs[11].photo}`} alt="" srcset="" />
                </div>
            </section>
        </div>
    )
}

import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
export default function Navbar(){

    return(
        <div className={styles.navSection}>
            <div className={styles.navbar}>
                <Link to='/' className={styles.navLogo}>Devblogs</Link>
                <div className={styles.mainNav}>
                <Link className={styles.navItem} to ='/'>Home</Link>
                <Link className={styles.navItem} to ='/blog'>Blogs</Link>
                </div>
                <Link to='/create' className={styles.navButton}>Create</Link>
            </div>            
            </div>
    )
}
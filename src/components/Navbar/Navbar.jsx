import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate =    useNavigate()
    const [hamburger, setHamburger]= useState(false)

  return (
    <div className={styles.navSection}>
      <div className={styles.navbar}>
        <Link to="/" className={styles.navLogo}>
          Devblogs
        </Link>
        <div className={styles.mainNav}>
          <Link className={styles.navItem} to="/">
            Home
          </Link>
          <Link className={styles.navItem} to="/blog">
            Blogs
          </Link>
        </div>
        <Link to="/create" className={styles.navButton}>
          Create 
        </Link>
        {
            hamburger?(
        <RxCross2 className={styles.hamburger} onClick={_=>setHamburger(!hamburger)} />

            ):(
        <BiMenu className={styles.hamburger} onClick={_=>setHamburger(!hamburger)} />

            )
        }
      </div>
      <div className={styles.itemCoverCover} >
        <div className={styles.itemCover} style={hamburger?({ transition:'all .5s ease',right:'0'}):({transition:'all .5s ease',right:"-100vw"})}>
          <div className={styles.item} onClick={_=>{
            navigate('/')
            setHamburger(!hamburger)
          }} >Home</div>
          <div className={styles.item} onClick={_=>{
            navigate('/blog')
            setHamburger(!hamburger)

          }}>Blogs</div>
          <div className={styles.item} onClick={_=>{
            navigate('/create')
            setHamburger(!hamburger)

          }}>Create</div>
          
        </div>
        <div style={hamburger?{display:"block"}:{display:"none"}} className={styles.backer} onClick={_=>{
            
            setHamburger(!hamburger)

        }}></div>
      </div>
    </div>
  );
}

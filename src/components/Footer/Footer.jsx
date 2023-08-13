import styles from "./Footer.module.css"
export default function Footer(){


    return(
        <div className={styles.footerSection}>
            <footer className={styles.footer}>
                <p>Developed by Uzair Saleem and some caffeine &copy; 2023 </p>
            </footer>
        </div>
    )
}
import styles from "./Create.module.css"

export default function Create (){



    return(
        <div className={styles.main}>

            <h1 className={styles.mainHeading}>
                CREATE BLOG POST
            </h1>
            <div className={styles.form}>
                
                <input className={styles.title} type="text" />
                <input className={styles.author} type="text" />
                <textarea className={styles.descrition} name="" id="" cols="30" rows="10"></textarea>
                <textarea className={styles.content} name="" id="" cols="30" rows="10"></textarea>
                <input type="file" name="" id="" />
            </div>



        </div>
    )
}
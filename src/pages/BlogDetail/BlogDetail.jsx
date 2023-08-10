import styles from "./BlogDetail.module.css"
import { useParams } from "react-router-dom"

export default function BlogDetail(){
  
   const {id} = useParams()
  
    return (
        <div className={styles.main}>

        </div>
    )
}
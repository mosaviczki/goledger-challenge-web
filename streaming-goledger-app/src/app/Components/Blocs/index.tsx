import styles from "./style.module.css";

export default function Blocs({title, icon, background}){
    return(
        <div className={styles.containerBlocs} style={{background: background}}>
            {icon}
            <h1>{title}</h1>
        </div>
        
    )
}
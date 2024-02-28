import styles from './SearchWrapper.module.css';

export  default function SearchWrapper({ children }) {
    return (
        <div className={styles.frame}>

            <div className={styles.pulse}>
                <div className={styles.ringContainer}>
                    <div className={styles.ringring}></div>
                    <div className={styles.circle}></div>
                </div>
                Live demo
            </div>
                    
            {children}
        
        </div>
    );
}

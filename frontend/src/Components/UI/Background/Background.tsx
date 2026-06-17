import styles from './BackgroundStyles.module.scss'

export default function Background({ children }: {children: React.ReactNode}){
    return (
        <div className={styles.container}>
            <div className={styles.right}></div>
            <div className={styles.left}></div>
            { children }
        </div>
    );
}
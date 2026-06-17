import styles from './LargePanelStyle.module.scss'

export default function LargePanel({children}: {children: React.ReactNode}){
    return(
        <div className={styles.content}>
            {children}
        </div>
    );
}
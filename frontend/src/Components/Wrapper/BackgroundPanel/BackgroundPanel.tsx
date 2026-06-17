import styles from './BackgroundPanelStyle.module.scss'

export default function BackgroundPanel({children}: {children: React.ReactNode}){
    return(
        <div className={styles.content}>
            {children}
        </div>
    );
}
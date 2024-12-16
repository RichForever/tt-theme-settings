import styles from './ScriptsPanel.module.css'

const container = ({children}) => {
    return (
        <div className={styles['panel__body-wrapper']}>
            {children}
        </div>
    )
}
export default container;
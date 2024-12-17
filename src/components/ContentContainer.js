import styles from './ContentContainer.module.css'

const ContentContainer = ({children}) => {
    return (
        <div className={styles['panel__body-wrapper']}>
            {children}
        </div>
    )
}
export default ContentContainer;
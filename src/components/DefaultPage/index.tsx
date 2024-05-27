import { Outlet } from 'react-router-dom'
import styles from './DefaultPage.module.scss'
export default function DefaultPage() {
    return (
        <div className={styles.container}>
            <Outlet />
        </div>
    )
}
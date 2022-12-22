import React from "react"
import styles from "./Card.module.scss"

import img from "../../static/images/logo.png"

const Card = ({title, description, icon_url, link, category}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles['image-container']}>
                    <img src={icon_url} alt="Logo image" />
                </div>
                <div className={styles['header-info']}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.type}>{category}</div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.url}>{link}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    )
}

export default Card
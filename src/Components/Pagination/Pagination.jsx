import React, {useState} from "react"
import { connect } from "react-redux"
import styles from "./Pagination.module.scss"
import { changePageNumber } from "../../actions"

import Card from "../Card/Card"

const Pagination = ({resources, pageNumber, changePageNumber}) => {

    const totalPages = Math.ceil(resources.length/6)

    const renderPagination = () => {
        return (
            Array(totalPages).fill(0).map((_, i) => {
                return (
                    <div key={i} 
                        className={styles["pagination-block"]}
                        onClick={() => changePageNumber(i)}
                    >{i+1}</div>
                )
            })
        )
    }

    const renderCards = () => {
        return (
            resources.filter((_, index) => (
                index >= pageNumber*6 && index < (pageNumber+1)*6
            ))
            .map(({title, description, link, icon_url, category, id}) => (
                <Card
                    key={id} 
                    title={title} 
                    description={description} 
                    link={link} 
                    icon_url={icon_url} 
                    category={category}
                />
            ))
        )
    }
    

    return (
        <div className={styles.container}>
            <div className={styles["card-container"]}>
                {renderCards()}
            </div>
            <div className={styles["pagination-container"]}>
                {renderPagination()}
            </div>
        </div>
    )
}

const mapStateToProps = ({pageNumber}) => {
    return {
        pageNumber
    }
}

export default connect(mapStateToProps, {
    changePageNumber
})(Pagination)
import React, { useEffect, useState } from "react"
import axios from 'axios'
import Fuse from "fuse.js"
import { connect } from "react-redux"
import { AddResources } from "../../actions"
import { changePageNumber } from "../../actions"
import styles from "./Resource.module.scss"

import Pagination from "../../Components/Pagination/Pagination"
import { IconSearch } from "../../utils/svg"

const Resource = ({AddResources, resources, changePageNumber}) => {
    const [resourceType, setResourceType] = useState('all')
    const [filteredResources, setFilteredResources] = useState(resources)
    const [resultsToDisplay, setResultsToDisplay] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const makeRequest = async () => {
            const response = await axios.get('https://media-content.ccbp.in/website/react-assignment/resources.json')
            AddResources(response.data)
            console.log("UseEffect is running")
        }
        if (resources.length == 0) makeRequest()
    }, [])

    useEffect(() => {
        if (resources.length === 0){
            return
        }
        if (resourceType === "all"){
            setFilteredResources(resources)
            setResultsToDisplay(resources)
        } else if (resourceType === "request" || resourceType === "user") {
            const filteredOutput = resources.filter(resource => resource.tag === resourceType)
            setFilteredResources(filteredOutput)
            setResultsToDisplay(filteredOutput)
        }
        setSearchValue('')
    }, [resourceType, resources])

    useEffect(() => {
        if (searchValue === "") {
            setResultsToDisplay(filteredResources)
            return
        }
        const fuse = new Fuse(filteredResources, {
            keys: ['title']
        })
        const searchResult = fuse.search(searchValue)
        setResultsToDisplay(searchResult.map(({item}) => item))
    }, [searchValue])

    return (
        <div className={styles.container}>
            <div className={styles["button-container"]}>
                <button 
                    className={`${styles.button} ${resourceType === "all" ? styles['selected-button'] : ''}`} 
                    onClick={() => {setResourceType('all'); changePageNumber(0)}}
                >Resources</button>
                <button 
                    className={`${styles.button} ${resourceType === "request" ? styles['selected-button'] : ''}`} 
                    onClick={() => {setResourceType('request'); changePageNumber(0)}}
                >Requests</button>
                <button 
                    className={`${styles.button} ${resourceType === "user" ? styles['selected-button'] : ''}`} 
                    onClick={() => {setResourceType('user'); changePageNumber(0)}}
                >Users</button>
            </div>
            <div className={styles.input}>
                <IconSearch />
                <input type="text" placeholder="Search" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
            </div>
            <Pagination resources={resultsToDisplay}/>
        </div>
    )
}

const mapStateToProps = ({resources}) => {
    return {
        resources
    }
}

export default connect(mapStateToProps, {
    AddResources,
    changePageNumber
})(Resource)
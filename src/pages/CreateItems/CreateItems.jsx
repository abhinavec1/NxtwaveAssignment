import React, {useState} from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./CreateItems.module.scss"

import img from "../../static/images/image9.png"
import { IconBack } from "../../utils/svg";
import { validateEmail } from "../../utils/regExp"

const CreateItem = () => {
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [iconURL, setIconURL] = useState('')
    const [tagname, setTagname] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const validateFields = () => {
        if (title.length === 0) {
            return "Title can't be empty"
        }
        if (link.length === 0) {
            return "Link can't be empty"
        }
        if (iconURL.length === 0) {
            return "IconURL can't be empty"
        }
        if (tagname.length === 0) {
            return "Tagname can't be empty"
        }
        if (category.length === 0) {
            return "Category can't be empty"
        }
        if (description.length === 0) {
            return "Description can't be empty"
        }
        if (!validateEmail.test(link) || !validateEmail.test(iconURL)) {
            return "Invalid URL Format"
        }
        return ""
    }

    const validateAndSubmit = async (e) => {
        e.preventDefault()
        let formError = validateFields()
        if (formError.length === 0) {
            const response = await axios.get(
                "https://media-content.ccbp.in/website/react-assignment/add_resource.json"
            )
            if (response.status !== 200) {
                formError = "Request Failed"
            }
        }
        if (formError.length === 0) {
            toast.success("Item added sucessfully", {
                position: "bottom-center"
            })
        }
        else toast.error(formError, {
            position: "bottom-center"
        })
        }

    return (
        <div className={styles.container}>
            <Link to="/" style={{textDecoration: "none"}}>
                <div className={styles["back-container"]}>
                    <IconBack className={styles['icon-back']}/>
                    <span>Users</span>
                </div>
            </Link>
            <div className={styles["form-container"]}>
                <div className={styles.card}>
                    <div className={styles.heading}>Item Details</div>
                    <form onSubmit={validateAndSubmit}>
                        <label>ITEM TITLE</label>
                        <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
                        <label>LINK</label>
                        <input type="text" value={link} onChange={({target}) => setLink(target.value)}/>
                        <label>ICON URL</label>
                        <input type="text" value={iconURL} onChange={({target}) => setIconURL(target.value)}/>
                        <label>TAGNAME</label>
                        <input type="text" value={tagname} onChange={({target}) => setTagname(target.value)}/>
                        <label>CATEGORY</label>
                        <input type="text" value={category} onChange={({target}) => setCategory(target.value)}/>
                        <label>DESCRIPTION</label>
                        <textarea value={description} onChange={({target}) => setDescription(target.value)}/>
                        <button type="submit" className={styles.button}>CREATE</button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
            <img src={img} alt="side image" className={styles.image}/>
        </div>
    )
}

export default CreateItem
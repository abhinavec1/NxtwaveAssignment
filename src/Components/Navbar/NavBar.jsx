import React from "react";
import styles from "./Navbar.module.scss"
import { Link, useLocation } from "react-router-dom";

import { IconNxtWave } from "../../utils/svg";
import img from "../../static/images/profile_pic.jpeg"

const Navbar = () => {
    const {pathname} = useLocation()
    return (
        <div className={styles.container}>
            <IconNxtWave />
            <div className={styles["user-utils"]}>
                {pathname === "/" ? 
                    <Link style={{textDecoration: "none"}} to="/create"><button className={styles.button}>ADD ITEM</button></Link>
                    : ''
                }
                
                <img src={img} alt="Profile pic" className={styles["profile-pic"]}/>
            </div>
        </div>
    )
}

export default Navbar
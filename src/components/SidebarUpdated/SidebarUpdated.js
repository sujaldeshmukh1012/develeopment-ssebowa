import React from "react";
import styles from "./SidebarUpdated.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/download.png"

function SidebarUpdated({isOpen,SetIsOpen}) {
    return (
        <div className={isOpen ? styles.SidebarUpdated : styles.SidebarUpdatedClosed}>
            <button className={styles.SidebarUpdatedBackdrop} onClick={SetIsOpen} ></button>
            <div className={isOpen ? styles.SidebarUpdatedMain : styles.SidebarUpdatedMainInvisible}>
                <button className={styles.CloseBtn} onClick={SetIsOpen}>
                <span role="img" aria-label="Close" >❌</span>
                </button>
                <div className={styles.SidebarTopSection} >
                    <img className={styles.SidebarLogo} src={logo} alt={"ssebowa logo"} />
                </div>
                <div className={styles.SidebarMainNavLinksMainSection}>
                    <ul className={styles.SidebarMainNavLinksMain}>
                        <a href={"/"} className={styles.SidebarMainNavLink}>Home</a>    
                        <a href={"/"} className={styles.SidebarMainNavLink}>About</a>
                        <a href={"/"} className={styles.SidebarMainNavLink}>Gallery</a>
                        <a href={"/"} className={styles.SidebarMainNavLink}>Projects</a>
                        <a href={"/"} className={styles.SidebarMainNavLink}>Contact</a>
                        <a href={"/"} className={styles.SidebarMainNavLink}>Team</a>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SidebarUpdated;

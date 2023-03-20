import React from 'react'
import styles from "./BottomSection.module.css"
import { faPlus,faBookmark,faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import Bookmarks from '../Bookmarks/Bookmarks';

function BottomSection() {
const [NewBookMark,SetNewBookMark] = React.useState(false)
const ToggleNewState = () =>{
    SetNewBookMark(!NewBookMark)
}
    return (
    <div className={styles.BottomSection} >
        <div className={styles.BottomSectionBtnDiv}>
            <button className={styles.BottomSectionBtnAddToChrome} >
           <span>Add to Chrome  <FontAwesomeIcon
                icon={faPlus}
                className="pt-1 pl-1"
                // size="lg"
                style={{color:"#4ab421",fontSize:"15px"}}
            /> </span>
            </button>
            <button  className={styles.BottomSectionBtnAddBookmark} onClick={()=>ToggleNewState()} >
            {NewBookMark?
                <span style={{color:"red",}} >Cancel<FontAwesomeIcon
                icon={faTimes}
                className="pt-1 pl-2"
                style={{color:"red",fontSize:"15px"}}
            /> </span>
            : 
                <span>Add Bookmark <FontAwesomeIcon
                icon={faBookmark}
                className="pt-1 pl-1"
                // size="lg"
                style={{color:"#4ab421",fontSize:"15px"}}
            /> </span>
}
            </button>
        </div>
        <div className={styles.BookmarkMainSection}>
                <Bookmarks closeAddNewBookmark={ToggleNewState} addNew={NewBookMark} />
                </div>
    </div>
  )
}

export default BottomSection
import React from 'react'
import { useStateValue } from '../context/StateProvider'
import '../css/ReviewHistory.css'
import LeftPanel from "../panels/upload/LeftPanel"
import RightPanel from "../panels/upload/RightPanel"


function ReviewHistory() {
    const [{},dispatch] = useStateValue()
    return (
        <div className="review-history">
            <div className="wallpaper"></div>
            <div className="review-container">
                <LeftPanel className="left-panel" />
                <RightPanel className="right-panel" />
            </div>
        </div>
    )
}

export default ReviewHistory

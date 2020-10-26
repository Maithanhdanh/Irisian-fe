import React, { useEffect, useRef } from 'react'
import useOnClickOutside from '../../custom-hook/useOutSideClick'
import { useStateValue } from '../context/StateProvider'
import '../css/ReviewHistory.css'
import LeftPanel from "../panels/upload/LeftPanel"
import RightPanel from "../panels/upload/RightPanel"
import PropTypes from "prop-types"

ReviewHistory.propTypes = {
	settShowReviewHistory: PropTypes.func
}
ReviewHistory.defaultProps = {
	settShowReviewHistory:null
}

function ReviewHistory({settShowReviewHistory}) {
    const ref = useRef()
    const [{},dispatch] = useStateValue()

    useOnClickOutside(ref, () => settShowReviewHistory(false))
    
    return (
        <div className="review-history">
            <div className="wallpaper"></div>
            <div className="review-container" ref={ref}>
                <LeftPanel className="left-panel" type={'review'}/>
                <RightPanel className="right-panel" type={'review'}/>
            </div>
        </div>
    )
}

export default ReviewHistory

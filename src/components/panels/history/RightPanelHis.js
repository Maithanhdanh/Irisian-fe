import React from "react"
import "../../css/RightPanelHis.css"
import HistoryCard from "../card/HistoryCard"

function RightPanelHis() {
	return (
		<div className="right-panel-his">
            <h1>Recent</h1>
			<div className="header">
				<div className="header__title">Search</div>
				<div className="filter-bar">
					<div class="ui transparent left icon input">
						<input type="text" placeholder="Search..." />
						<i class="search icon"></i>
					</div>
					<div class="ui transparent left icon input">
						<input type="text" placeholder="Search..." />
						<i class="search icon"></i>
					</div>
					<div class="ui transparent left icon input">
						<input type="text" placeholder="Search..." />
						<i class="search icon"></i>
					</div>
                    <button>Find</button>
				</div>
			</div>
			<div className="history">
				<HistoryCard />
			</div>
		</div>
	)
}

export default RightPanelHis

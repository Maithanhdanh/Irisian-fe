const rules = {
	VISITOR: {
		static: ["predict:upload"],
	},
	GUEST: {
		static: [
            "home:list", 
            "home:update",
			"predict:upload"
		],
		dynamic: {
			"home:remove": ({ userId, imageOwnerId }) => {
				if (!userId || !imageOwnerId) return false
				return userId === imageOwnerId
			},
		},
	},
	ADMIN: {
		static: [
			"home:list", 
            "home:update",
			"predict:upload",
			"home:remove",
			"dashboard:visit",
		],
	},
}

export default rules

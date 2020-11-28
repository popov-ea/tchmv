const rbacRules = {
    admin: {
        static: ["users:new"],
    },
    expert: {
        static: []
    },
    competitor: {
        static: []
    }
}

export default rbacRules;
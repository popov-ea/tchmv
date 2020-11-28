import rules from "./rbacRules";

const checkPermission = (role, action, data) => {
    const permissions = rules[role];

    if (!permissions) {
        return false;
    }

    const staticPermissions = permissions.static;

    if (staticPermissions && staticPermissions.includes(action)) {
        return true;
    }

    const dynamicPermissions = permissions.dynamic;

    if (dynamicPermissions) {
        const condition = dynamicPermissions[action];
        if (!condition) {
            return false;
        }

        return condition(data);
    }

    return false;
};

export default checkPermission;
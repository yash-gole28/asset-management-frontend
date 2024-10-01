const apiList = {
    login: "/auth/login",
    register: "/auth/register",
    getCurrentUser: "/auth/current-user",
    getAllUsers: "/auth//all-users",
    getAllActiveUsers:"/auth/all-active-users",
    registerAsset: "/asset/register-asset",
    getCategories: "/asset/get-categories",
    getAssets: "/asset/get-assets",
    getAssetsByCategoryName: "/asset/get-assets-by-category",
    createRequest: "/asset/add-request",
    category: "/asset/add-category",
    assetRequests: "/asset/get-asset-requests",
    updateRequest: "/asset/update-request",
    getAllCategory: '/asset/get-allcategory',
    changeActiveUser:'/auth/change-active-user'
};

export { apiList };


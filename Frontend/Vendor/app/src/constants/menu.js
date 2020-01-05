import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn
} from 'react-feather';

export const MENUITEMS = [
    // {
    //     path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    // },
    {
        title: 'Store', icon: Box, type: 'sub', active: false, children: [
            { path: '/Vendor/store', title: 'Create Store', type: 'link' },
            // { path: '/products/digital/digital-category', title: 'category', type: 'link' },
            // { path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
            { path: '/Vendor/products/digital/digital-product-list', title: 'Product List', type: 'link' },
            { path: '/Vendor/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
            { path: '/Vendor/products/digital/digital_pro_review', title: 'Product Reviews', type: 'link' },
        ]
            
        
    },
    {
        title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/Vendor/sales/orders', title: 'Orders', type: 'link' },
            // { path: '/sales/transactions', title: 'Transactions', type: 'link' },
        ]
    },
    // {
    //     title: 'Coupons', icon: Tag, type: 'sub', active: false, children: [
    //         { path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
    //         { path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Pages', icon: Clipboard , type: 'sub', active: false, children: [
    //         { path: '/pages/list-page', title: 'List Page', type: 'link' },
    //         { path: '/pages/create-page', title: 'Create Page', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Media', path: '/media', icon: Camera, type: 'link', active: false
    // },
    // {
    //     title: 'Menus', icon: AlignLeft, type: 'sub', active: false, children: [
    //         { path: '/menus/list-menu', title: 'List Menu', type: 'link' },
    //         { path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
    //     ]
    // },
    {
        title: 'Customers', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/Vendor/users/list-user', title: 'Customer List', type: 'link' },
            // { path: '/users/create-user', title: 'Create User', type: 'link' },
        ]
    },
    // {
    //     title: 'Vendors', icon: Users, type: 'sub', active: false, children: [
    //         { path: '/vendors/list_vendors', title: 'Vendor List', type: 'link' },
    //         { path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Localization', icon: Chrome, type: 'sub', children: [
    //         { path: '/localization/transactions', title: 'Translations', type: 'link' },
    //         { path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
    //         { path: '/localization/taxes', title: 'Taxes', type: 'link' }
    //     ]
    // },
    // {
    //     title: 'Reports',path:'/reports/report', icon: BarChart, type: 'link', active: false
    // },
    {
        title: 'Settings', icon: Settings, type: 'sub', children: [
            { path: '/Vendor/settings/profile', title: 'Profile', type: 'link' },
        ]
    },
    // {
    //     title: 'Invoice',path:'/invoice', icon: Archive, type: 'link', active: false
    // },
    // {
    //     title: 'Login',path:'/auth/login', icon: LogIn, type: 'link', active: false
    // }
]

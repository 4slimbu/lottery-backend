export const MainNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Dashboards',
        to: '#/dashboards',
    },
    {
        icon: 'pe-7s-id',
        label: 'Users',
        content: [
            {
                label: 'All Users',
                to: '#/users/all',
            },
            {
                label: 'Add New',
                to: '#/users/new',
            },
            {
                label: 'Your Profile',
                to: '#/users/profile',
            },
        ],
    },
    {
        icon: 'pe-7s-id',
        label: 'Roles',
        content: [
            {
                label: 'All Roles',
                to: '#/roles/all',
            },
            {
                label: 'Add New',
                to: '#/roles/new',
            }
        ],
    },
    {
        icon: 'pe-7s-id',
        label: 'Permissions',
        content: [
            {
                label: 'All Permissions',
                to: '#/permissions/all',
            },
            {
                label: 'Add New',
                to: '#/permissions/new',
            }
        ],
    },
    {
        icon: 'pe-7s-display1',
        label: 'Lottery',
        content: [
            {
                label: 'All Slots',
                to: '#/lottery/slots',
            },
            {
                label: 'Winners',
                to: '#/lottery/winners',
            },
        ],
    },
    {
        icon: 'pe-7s-rocket',
        label: 'Wallet',
        content: [
            {
                label: 'All Wallets',
                to: '#/wallets/all',
            },
            {
                label: 'Withdrawal Requests',
                to: '#/wallets/withdraw-requests/all',
            },
        ],
    },
    {
        icon: 'pe-7s-browser',
        label: 'Pages',
        content: [
            {
                label: 'All Pages',
                to: '#/pages/all',
            },
            {
                label: 'Add New',
                to: '#/pages/new',
            },
        ],
    },
    {
        icon: 'pe-7s-browser',
        label: 'Settings',
        content: [
            {
                label: 'All',
                to: '#/settings/all',
            },
            // {
            //     label: 'Lottery',
            //     to: '#/settings/lottery',
            // },
            // {
            //     label: 'Wallet',
            //     to: '#/settings/wallet',
            // },
        ],
    },
];

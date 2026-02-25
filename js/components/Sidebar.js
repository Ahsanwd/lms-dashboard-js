export function initSidebar() {
    const navItems = [
        { icon: 'fa-home', label: 'Dashboard', active: true },
        { icon: 'fa-book-open', label: 'My Courses', active: false },
        { icon: 'fa-chart-line', label: 'Progress', active: false },
        { icon: 'fa-calendar-alt', label: 'Schedule', active: false },
        { icon: 'fa-envelope', label: 'Messages', active: false, badge: '3' },
        { icon: 'fa-cog', label: 'Settings', active: false }
    ];

    const navContainer = document.getElementById('sidebarNav');

    let navHTML = '';
    navItems.forEach(item => {
        const activeClasses = item.active
            ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary font-semibold border-r-4 border-primary'
            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200 border-r-4 border-transparent';

        const badgeHTML = item.badge
            ? `<span class="ml-auto bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 py-0.5 px-2.5 rounded-full text-xs font-bold">${item.badge}</span>`
            : '';

        navHTML += `
            <a href="#" class="flex items-center px-6 py-3 transition-colors duration-200 ${activeClasses}">
                <i class="fas ${item.icon} w-6 text-center text-lg ${item.active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'}"></i>
                <span class="ml-3 text-sm">${item.label}</span>
                ${badgeHTML}
            </a>
        `;
    });

    navContainer.innerHTML = navHTML;
}

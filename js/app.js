import { store } from './store.js';
import { CourseCard } from './components/CourseCard.js';
import { ModalContent } from './components/ModalContent.js';
import { initSidebar } from './components/Sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initSidebar();

    // DOM Elements
    const elements = {
        grid: document.getElementById('courseGrid'),
        emptyState: document.getElementById('emptyState'),
        categoryFilter: document.getElementById('categoryFilter'),
        clearFiltersBtn: document.getElementById('clearFiltersBtn'),
        sidebar: document.getElementById('sidebar'),
        openSidebarBtn: document.getElementById('openSidebar'),
        closeSidebarBtn: document.getElementById('closeSidebar'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        darkModeToggle: document.getElementById('darkModeToggle'),

        // Add Modal Elements
        addCourseBtn: document.getElementById('addCourseBtn'),
        addCourseModal: document.getElementById('addCourseModal'),
        addModalOverlay: document.getElementById('addModalOverlay'),
        addModalContentWrapper: document.getElementById('addModalContentWrapper'),
        closeAddModalBtns: document.querySelectorAll('#closeAddModal, #cancelCourseBtn'),
        addCourseForm: document.getElementById('addCourseForm'),

        // Details Modal Elements
        detailsModal: document.getElementById('detailsModal'),
        detailsModalOverlay: document.getElementById('detailsModalOverlay'),
        detailsModalContentWrapper: document.getElementById('detailsModalContentWrapper'),
        closeDetailsModalBtn: document.getElementById('closeDetailsModal'),
        detailsModalContent: document.getElementById('modalContent')
    };

    // State
    let currentCategory = 'All';

    // ---- Render Functions ---- //

    function renderFilters() {
        const categories = store.getCategories();
        elements.categoryFilter.innerHTML = categories.map(cat =>
            `<option value="${cat}">${cat}</option>`
        ).join('');
        elements.categoryFilter.value = currentCategory;
    }

    function renderCourses() {
        const _courses = store.getCourses();
        let filtered = _courses;

        if (currentCategory !== 'All') {
            filtered = _courses.filter(c => c.category === currentCategory);
        }

        if (filtered.length === 0) {
            elements.grid.innerHTML = '';
            elements.grid.classList.add('hidden');
            elements.emptyState.classList.remove('hidden');
            elements.emptyState.classList.add('flex');
        } else {
            elements.emptyState.classList.add('hidden');
            elements.emptyState.classList.remove('flex');
            elements.grid.classList.remove('hidden');

            elements.grid.innerHTML = filtered.map(course => CourseCard(course)).join('');

            // Re-attach card listeners
            attachCardListeners();
        }
    }

    function attachCardListeners() {
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // If clicked on bookmark, don't open modal
                if (e.target.closest('button')) return;
                const id = card.dataset.id;
                openDetailsModal(id);
            });
        });
    }

    // ---- Event Listeners ---- //

    // Category Filter
    elements.categoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        renderCourses();
    });

    elements.clearFiltersBtn.addEventListener('click', () => {
        currentCategory = 'All';
        elements.categoryFilter.value = 'All';
        renderCourses();
    });

    // Dark Mode Toggle
    elements.darkModeToggle.addEventListener('click', () => {
        store.toggleTheme();
    });

    // Sidebar
    const toggleSidebar = (show) => {
        if (show) {
            elements.sidebar.classList.remove('-translate-x-full');
            elements.sidebarOverlay.classList.remove('hidden');
            setTimeout(() => {
                elements.sidebarOverlay.classList.remove('opacity-0');
            }, 10);
        } else {
            elements.sidebar.classList.add('-translate-x-full');
            elements.sidebarOverlay.classList.add('opacity-0');
            setTimeout(() => {
                elements.sidebarOverlay.classList.add('hidden');
            }, 300);
        }
    };

    elements.openSidebarBtn.addEventListener('click', () => toggleSidebar(true));
    elements.closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
    elements.sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

    // ---- Add Course Modal ---- //

    const toggleAddModal = (show) => {
        if (show) {
            elements.addCourseModal.classList.remove('invisible');
            setTimeout(() => {
                elements.addCourseModal.classList.add('modal-active');
            }, 10);
        } else {
            elements.addCourseModal.classList.remove('modal-active');
            setTimeout(() => {
                elements.addCourseModal.classList.add('invisible');
            }, 300);
        }
    };

    elements.addCourseBtn.addEventListener('click', () => toggleAddModal(true));

    elements.closeAddModalBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleAddModal(false));
    });

    elements.addModalOverlay.addEventListener('click', () => toggleAddModal(false));

    // Add Course Form Submit
    elements.addCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(elements.addCourseForm);
        const newCourse = {
            title: formData.get('title'),
            category: formData.get('category'),
            instructor: formData.get('instructor'),
            progress: formData.get('progress'),
            lessons: formData.get('lessons'),
            image: formData.get('image'),
            description: formData.get('description')
        };

        store.saveCourse(newCourse);
        elements.addCourseForm.reset();
        toggleAddModal(false);
        renderFilters();
        renderCourses();
    });

    // ---- Details Modal ---- //

    const openDetailsModal = (id) => {
        const course = store.getCourses().find(c => c.id === id);
        if (!course) return;

        elements.detailsModalContent.innerHTML = ModalContent(course);

        // Attach Delete Listener inside modal
        const deleteBtn = elements.detailsModalContent.querySelector('.delete-course-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this course?')) {
                    store.deleteCourse(id);
                    closeDetailsModal();
                    renderFilters(); // Category list might have changed
                    renderCourses();
                }
            });
        }

        // Show modal animation
        elements.detailsModal.classList.remove('invisible');
        setTimeout(() => {
            elements.detailsModal.classList.add('modal-active');
        }, 10);
    };

    const closeDetailsModal = () => {
        elements.detailsModal.classList.remove('modal-active');
        setTimeout(() => {
            elements.detailsModal.classList.add('invisible');
        }, 300);
    };

    elements.closeDetailsModalBtn.addEventListener('click', closeDetailsModal);
    elements.detailsModalOverlay.addEventListener('click', closeDetailsModal);

    // Initial Render
    renderFilters();
    renderCourses();
});

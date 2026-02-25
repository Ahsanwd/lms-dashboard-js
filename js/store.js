// Abstract LocalStorage layer
const STORAGE_KEY = 'lms_courses_data';

// Default mock data to populate if empty
const defaultCourses = [
    {
        id: '1',
        title: 'Complete React Developer in 2024',
        category: 'Development',
        instructor: 'Andrei Neagoie',
        progress: 85,
        lessonsCompleted: 85,
        totalLessons: 100,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        description: 'Learn React.js from scratch. Create massive, dynamic, front-end web apps. Includes React Hooks, Redux, Context API, Next.js, and more.',
        dateAdded: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '2',
        title: 'UI/UX Design Masterclass',
        category: 'Design',
        instructor: 'Sarah Drasner',
        progress: 32,
        lessonsCompleted: 16,
        totalLessons: 50,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        description: 'Design beautiful interfaces and user experiences with Figma. From layout theory, color psychology, and typography to advanced prototyping.',
        dateAdded: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '3',
        title: 'Python for Data Science',
        category: 'Data Science',
        instructor: 'Jose Portilla',
        progress: 100,
        lessonsCompleted: 120,
        totalLessons: 120,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        description: 'Master Python for data analysis, machine learning, and visualization using Pandas, NumPy, Matplotlib and Seaborn.',
        dateAdded: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '4',
        title: 'Digital Marketing Fundamentals',
        category: 'Marketing',
        instructor: 'Google Certification',
        progress: 0,
        lessonsCompleted: 0,
        totalLessons: 24,
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        description: 'Learn the core concepts of digital marketing, SEO, SEM, content marketing, and how to track conversions effectively.',
        dateAdded: new Date().toISOString()
    },
    {
        id: '5',
        title: 'Business Strategy & Leadership',
        category: 'Business',
        instructor: 'Harvard Business Publishing',
        progress: 60,
        lessonsCompleted: 18,
        totalLessons: 30,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        description: 'Develop strategic thinking and execution capabilities essential for leading teams and organizations in a competitive landscape.',
        dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
];

export class Store {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCourses));
        }
        
        // Setup initial dark mode state
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        }
        this.applyTheme();
    }

    getCourses() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    saveCourse(course) {
        const courses = this.getCourses();
        // Calculate lessons completed based on progress given by user
        const lessonsCompleted = Math.round((course.progress / 100) * course.lessons);
        
        const newCourse = {
            id: Date.now().toString(),
            title: course.title,
            category: course.category,
            instructor: course.instructor,
            progress: Number(course.progress),
            lessonsCompleted: lessonsCompleted,
            totalLessons: Number(course.lessons),
            image: course.image || `https://source.unsplash.com/600x400/?${encodeURIComponent(course.category)}`,
            description: course.description || 'No description provided for this course.',
            dateAdded: new Date().toISOString()
        };
        
        courses.unshift(newCourse); // Add to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
        return newCourse;
    }

    deleteCourse(id) {
        let courses = this.getCourses();
        courses = courses.filter(course => course.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        this.applyTheme();
        return newTheme;
    }

    applyTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    
    getCategories() {
        const courses = this.getCourses();
        const categories = new Set(courses.map(c => c.category));
        return ['All', ...Array.from(categories).sort()];
    }
}

export const store = new Store();

export function CourseCard(course) {
    // Generate badge colors dynamically based on category
    const getCategoryStyles = (cat) => {
        const map = {
            'Development': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
            'Design': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800',
            'Business': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
            'Data Science': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
            'Marketing': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800'
        };
        return map[cat] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    };

    const isCompleted = course.progress === 100;
    const progressColor = isCompleted ? 'bg-emerald-500' : 'bg-primary';

    return `
        <div class="course-card bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder overflow-hidden group flex flex-col h-full relative cursor-pointer" data-id="${course.id}">
            <!-- Image Area -->
            <div class="h-48 relative overflow-hidden bg-gray-200 dark:bg-gray-800 img-loading">
                <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80'; this.classList.remove('img-loading')">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button class="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg font-medium text-sm transition-colors shadow-sm">
                        View Details
                    </button>
                </div>
                <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold border ${getCategoryStyles(course.category)} backdrop-blur-md bg-opacity-90">
                    ${course.category}
                </div>
                <button class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors" title="Bookmark">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
            
            <!-- Content Area -->
            <div class="p-5 flex flex-col flex-1">
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                    <i class="fas fa-user-circle"></i>
                    <span>${course.instructor}</span>
                </div>
                
                <h3 class="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">${course.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${course.description}</p>
                
                <div class="mt-auto">
                    <!-- Progress Section -->
                    <div class="flex justify-between items-center text-xs mb-2">
                        <span class="font-semibold ${isCompleted ? 'text-emerald-500' : 'text-primary'}">
                            ${isCompleted ? 'Completed' : `${course.progress}%`}
                        </span>
                        <span class="text-gray-500 dark:text-gray-400 font-medium">${course.lessonsCompleted}/${course.totalLessons} Lessons</span>
                    </div>
                    <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full ${progressColor} rounded-full progress-fill relative" style="width: ${course.progress}%">
                            ${isCompleted ? '' : '<div class="absolute top-0 right-0 bottom-0 w-8 bg-white/20 translate-x-1/2 -skew-x-12"></div>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

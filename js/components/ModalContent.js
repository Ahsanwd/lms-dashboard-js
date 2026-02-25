export function ModalContent(course) {
    const isCompleted = course.progress === 100;
    const progressColor = isCompleted ? 'bg-emerald-500' : 'bg-primary';

    // Format date nicely
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateAdded = new Date(course.dateAdded).toLocaleDateString('en-US', dateOptions);

    return `
        <!-- Header Image -->
        <div class="h-64 relative bg-gray-200 dark:bg-gray-800">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
            
            <div class="absolute bottom-6 left-6 right-6">
                <span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold text-white border border-white/30 shadow-sm mb-3 inline-block">
                    ${course.category}
                </span>
                <h2 class="text-2xl sm:text-3xl font-bold text-white leading-tight">${course.title}</h2>
            </div>
        </div>

        <!-- Body -->
        <div class="p-6 md:p-8">
            <div class="flex flex-wrap gap-4 md:gap-8 items-center border-b border-gray-100 dark:border-darkBorder pb-6 mb-6">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-primary text-xl shadow-inner">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Instructor</p>
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">${course.instructor}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-500 text-xl shadow-inner">
                        <i class="fas fa-book"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Lessons</p>
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">${course.totalLessons} Total</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-500 text-xl shadow-inner">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Added On</p>
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">${dateAdded}</p>
                    </div>
                </div>
            </div>

            <div class="mb-8">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">About Course</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    ${course.description}
                </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-darkBorder">
                <div class="flex justify-between items-end mb-3">
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white">Your Progress</h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${course.lessonsCompleted} of ${course.totalLessons} lessons completed</p>
                    </div>
                    <span class="text-xl font-bold ${isCompleted ? 'text-emerald-500' : 'text-primary'}">${course.progress}%</span>
                </div>
                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    <div class="h-full ${progressColor} rounded-full transition-all duration-1000 ease-out relative" style="width: ${course.progress}%">
                        ${isCompleted ? '' : '<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>'}
                    </div>
                </div>
                
                <div class="mt-6 flex gap-3">
                    <button class="flex-1 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primaryHover transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                        ${isCompleted ? '<i class="fas fa-redo"></i> Review Course' : '<i class="fas fa-play"></i> Continue Learning'}
                    </button>
                    <!-- Delete Course Button -->
                    <button class="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 font-medium rounded-xl transition-colors delete-course-btn" data-id="${course.id}" title="Delete Course">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

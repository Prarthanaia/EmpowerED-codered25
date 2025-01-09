export const routes = {
  auth: {
    login: '/login',
    signup: '/signup',
  },
  educator: {
    dashboard: '/educator/dashboard',
    upload: '/educator/upload',
    quiz: {
      create: '/educator/quiz/create',
      list: '/educator/quiz/list',
    },
    students: {
      manage: '/educator/students',
      enable: '/educator/students/features',
    },
    preview: '/educator/preview',
  },
  student: {
    dashboard: '/student/dashboard',
    materials: '/student/materials',
    progress: '/student/progress',
    assessment: '/student/assessment',
  },
}


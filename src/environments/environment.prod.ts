export const environment = {
  production: true,
  apiUrl: 'http://syologicservices.com/oca/api',
  login: '/authenticate',
    user: {
        create: '/user/create',
        getUser: '/user/getUser',
        getUsersByClassId: '/user/getUsersByClass',
        getUsers: '/user/getUsers',
        update: '/user/update',
        delete: '/user/delete'
    },
    class: {
        getClasses: '/class/getClasses',
        getClass: '/class/getClass',
        create: '/class/create',
        update: '/class/update',
        delete: '/class/delete'
    },
    note: {
        getNotes:'/note/getNotes',
        getNote: '/note/getNote',
        create: '/note/create',
        update: '/note/update',
        delete: '/note/delete'
    },
    task: {
        getTasks:'/assignment/getAssignments',
        getTask: '/assignment/getAssignment',
        create: '/assignment/create',
        update: '/assignment/update',
        delete: '/assignment/delete',
        getTaskByClassId: '/assignment/getAssignmentByClass',
        submitAssignment: '/assignment/assignmentSubmission',
        asView: '/assignment/asView',
        getUsersByClassAndAssignment: '/assignment/getUsersByClassAndAssignment'
    },
    notification: {
        getNotifications: '/notification/getNotifications',
        getNotification: '/notification/getNotification',
        create: '/notification/create',
        update: '/notification/update',
        delete: '/notification/delete'
    },
    widget: {
        user: {
            getActive: '/user/getActive',
            getInactive: '/user/getInactive',
            getRegistered: '/user/getRegistered'
        },
        note: {
            getActive: '/note/getActive',
            getInActive: '/note/getInActive',
            getCreated: '/note/getCreated'
        },
        assignment: {
            getActive: '/assignment/getActive',
            getInActive: '/assignment/getInActive',
            getCreated: '/assignment/getCreated'
        },
        as: {
            getActive: '/assignment/getActive',
            getInActive: '/assignment/getInActive',
            getCreated: '/assignment/getCreated'
        },
        notification: {
            getActive: '/notification/getActive',
            getInActive: '/notification/getInActive',
            getCreated: '/notification/getCreated'
        }
    },
    common: {
        profile: '/common/profile'
    }
};

export const environment = {
  production: true,
  apiUrl: 'http://syologicservices.com/online_classes_apis',
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
          getActiveUsers: '/user/getActiveUsers',
          getInactiveUsers: '/user/getInactiveUsers',
          getRegistredUsers: '/user/getRegistredUsers',
          // getSuspendedUsers: '/user/getDeletedUsers'
      },
      note: {
          getActiveNotes: '/note/getActiveNotes',
          getInActiveNotes: '/note/getInActiveNotes',
          getCreatedNotes: '/note/getCreatedNotes',
          // getSuspendedNotes: '/note/getSuspendedNotes'
      },
      assignment: {
          getActiveAssignments: '/assignment/getActiveAssignments',
          getInActiveAssignments: '/assignment/getInActiveAssignments',
          getCreatedAssignments: '/assignment/getCreatedAssignments',
          // getSuspendedAssignments: '/assignment/getSuspendedAssignments'
      },
      as: {
          getActiveASs: '/assignment/getActiveASs',
          getInActiveASs: '/assignment/getInActiveASs',
          getCreatedASs: '/assignment/getCreatedASs',
          // getSuspendedASs: '/assignment/getSuspendedASs'
      },
      notification: {
          getActiveNotifications: '/notification/getActiveNotifications',
          getInActiveNotifications: '/notification/getInActiveNotifications',
          getCreatedNotifications: '/notification/getCreatedNotifications',
          // getSuspendedNotifications: '/notification/getSuspendedNotifications'
      }
  }
};

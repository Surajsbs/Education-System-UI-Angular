import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Registration'
  // },

  {
    title: true,
    name: 'Registration',
  },
  {
    name: 'Registration',
    icon: 'icon-user',
    children: [
      {
        name: 'Register',
        url: '/dashboard/registration/register',
        icon: 'fa fa-floppy-o'
      },
      {
        name: 'View',
        url: '/dashboard/registration/view',
        icon: 'fa fa-eye'
      }
    ]
  },
  {
    title: true,
    name: 'Notes'
  },
  {
    name: 'Notes',
    icon: 'icon-drop',
    children: [
      {
        name: 'Create',
        url: '/dashboard/notes/create',
        icon: 'fa fa-floppy-o'
      },
      {
        name: 'View',
        url: '/dashboard/notes/list',
        icon: 'fa fa-eye'
      }
    ]
  },
  {
    title: true,
    name: 'Assignment'
  },
  {
    name: 'Assignment',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Create Assignment',
        url: '/dashboard/assignment/create',
        icon: 'fa fa-floppy-o'
      },
      {
        name: 'View Assignments',
        url: '/dashboard/assignment/view',
        icon: 'fa fa-eye'
      },
      {
        name: 'Submission',
        url: '/dashboard/assignment/submission',
        icon: 'fa fa-floppy-o'
      },
      {
        name: 'View Submission',
        url: '/dashboard/assignment/viewSubmission',
        icon: 'fa fa-eye'
      }
    ]
  },
  {
    title: true,
    name: 'Notification'
  },
  {
    name: 'Notification',
    icon: 'icon-bell',
    children: [
      {
        name: 'Create',
        url: '/dashboard/notification/create',
        icon: 'fa fa-floppy-o'
      },
      {
        name: 'View',
        url: '/dashboard/notification/view',
        icon: 'fa fa-eye'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Class',
    icon: 'icon-star',
    children: [
      {
        name: 'Create Class',
        url: '/dashboard/class/create',
        icon: 'fa fa-floppy-o'
      }
    ]
  },
];

import { Component, OnInit } from "@angular/core";
import { DashboardWidgetService } from '../../_services/dashboard.widget.service';
import { Notification } from '../../_util/notification.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
  })

export class DashboardComponent implements OnInit  {
      
    private widget: DashboardWidgets;

    constructor(
    private widgetService: DashboardWidgetService,
    private notification: Notification
    ) {}

    ngOnInit () {
        this.notification.show();
        this.widget = new DashboardWidgets(this.widgetService);
        this.notification.hide();
    }
    
}



export class DashboardWidgets {

    private isUserCollapse: boolean = false;
    private isNoteCollapse: boolean = true;
    private isAssignmentCollapse: boolean = true;
    private isASCollapse: boolean = true;
    private isNotificationCollapse: boolean = true;

    // Users
    private activeUsers: number;
    private inActiveUsers: number;
    private registredUsers: number;
//   private suspendedUsers: number;

    // Notes
    private activeNotes: number;
    private inActiveNotes: number;
    private createdNotes: number;
//   private suspendedNotes: number;

    // Assignments
    private activeAssignments: number;
    private inActiveAssignments: number;
    private createdAssignments: number;
//   private suspendedAssignments: number;

    // Assignment Submission
    private activeASs: number;
    private inActiveASs: number;
    private createdASs: number;
//   private suspendedASs: number;

    // Notification
    private activeNotifications: number;
    private inActiveNotifications: number;
    private createdNotifications: number;
//   private suspendedNotifications: number;

    constructor(
        private widgetServie: DashboardWidgetService
    ) { 

        this.widgetServie.getCount().subscribe(response => {
            this.activeUsers = response[0].result;
            this.inActiveUsers = response[1].result;
            this.registredUsers = response[2].result;
            this.activeNotes = response[3].result;
            this.inActiveNotes = response[4].result;
            this.createdNotes = response[5].result;
            this.activeAssignments = response[6].result;
            this.inActiveAssignments = response[7].result;
            this.createdAssignments = response[8].result;
            this.activeNotifications = response[9].result;
            this.inActiveNotifications = response[10].result;
            this.createdNotifications = response[11].result;
        })
        
            // Users
        //  this.activeUsers = this.getActiveUsers;
        //  this.inActiveUsers = this.getInActiveUsers;
        //  this.registredUsers = this.getRegistredUsers;
        //  this.suspendedUsers = this.getSuspendedUsers;

            // Notes
        //  this.activeNotes = this.getActiveNotes;
        //  this.inActiveNotes = this.getInActiveNotes;
        //  this.createdNotes = this.getCreatedNotes;
        //  this.suspendedNotes = this.getSuspendedNotes;


            // Assignments
        //  this.activeAssignments = this.getActiveAssignments;
        //  this.inActiveAssignments = this.getInActiveAssignments;
        //  this.createdAssignments = this.getCreatedAssignments;
        //  this.suspendedAssignments = this.getSuspendedAssignments;

            // Assignment Submission
        //  this.activeASs = this.getActiveASs;
        //  this.inActiveASs = this.getInActiveASs;
        //  this.createdASs = this.getCreatedASs;
        //  this.suspendedASs = this.getSuspendedASs;

            // Notification
        //  this.activeNotifications = this.getActiveNotifications;
        //  this.inActiveNotifications = this.getInActiveNotifications;
        //  this.createdNotifications = this.getCreatedNotifications;
        //  this.suspendedNotifications = this.getSuspendedNotifications;
        }

    // Users
    // get getActiveUsers(): number { return this.widgetServie.getActiveUsers()};
    // get getInActiveUsers(): number { return this.widgetServie.getInActiveUsers()};
    // get getRegistredUsers(): number { return this.widgetServie.getRegistredUsers()};
    // get getSuspendedUsers(): number { return this.widgetServie.getSuspendedUsers()};

    // Notes
    // get getActiveNotes(): number { return this.widgetServie.getActiveNotes()};
    // get getInActiveNotes(): number { return this.widgetServie.getInActiveNotes()};
    // get getCreatedNotes(): number { return this.widgetServie.getCreatedNotes()};
    // get getSuspendedNotes(): number { return this.widgetServie.getSuspendedNotes()};

    // Assignments
    // get getActiveAssignments(): number { return this.widgetServie.getActiveAssignments()};
    // get getInActiveAssignments(): number { return this.widgetServie.getInActiveAssignments()};
    // get getCreatedAssignments(): number { return this.widgetServie.getCreatedAssignments()};
    // get getSuspendedAssignments(): number { return this.widgetServie.getSuspendedAssignments()};

    // Assignment Submission
    // get getActiveASs(): number { return this.widgetServie.getActiveASs()};
    // get getInActiveASs(): number { return this.widgetServie.getInActiveASs()};
    // get getCreatedASs(): number { return this.widgetServie.getCreatedASs()};
    // get getSuspendedASs(): number { return this.widgetServie.getSuspendedASs()};

    // Notification
    // get getActiveNotifications(): number { return this.widgetServie.getActiveNotifications()};
    // get getInActiveNotifications(): number { return this.widgetServie.getInActiveNotifications()};
    // get getCreatedNotifications(): number { return this.widgetServie.getCreatedNotifications()};
    // get getSuspendedNotifications(): number { return this.widgetServie.getSuspendedNotifications()};

}
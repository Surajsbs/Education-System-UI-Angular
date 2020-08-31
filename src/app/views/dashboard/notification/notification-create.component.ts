import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NotificationCreateModel } from '../../../_models/notificationcreatemodel';
import { CommonService } from '../../../_services/common.service';
import { NotificationService } from '../../../_services/notification.service';
import { CommonUtil } from '../../../_util/common.util';
import { DateUtil } from '../../../_util/date.util';
import { Notification } from '../../../_util/notification.service';
import { UserResponseModel } from '../../../_models/response/user.response.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';

@Component({
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})

export class NotificationCreateComponent {
  


        classes: LoadClassesResponse[] = [];
        feesStatus:string[] = [];
        classDurations:string[] = [];
        createNotificationForm: FormGroup;
        loading = false;
        submitted = false;
        notificationModel: NotificationCreateModel;
        response: any;
        activeStatus: string[];
        users: UserResponseModel[];
        modalRef: NgbModalRef;
        allComplete: boolean = false;
        selectedUsers = new Array();

  constructor(
        private formBuilder: FormBuilder,
        private notification: Notification,
        private commonService: CommonService,
        private notificationService: NotificationService,
        private commonUtil: CommonUtil,
        private dateUtil: DateUtil,
        private modalService: NgbModal
  )  {
        this.commonService.fetchClasses().then(data=>this.classes = data);
        this.feesStatus = this.commonUtil.feesStatus;
        this.classDurations = this.commonUtil.classDuration;
        this.activeStatus = this.commonUtil.activeStatus;
        this.allComplete = false;
   }


  
   ngOnInit() {
      this.createNotificationForm = this.formBuilder.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          classId: ['', Validators.required],
          activeStatus: ['', Validators.required],
          selectedUsers: ['', Validators.required],
          startDate: [this.dateUtil.currentDate, Validators.required],
          endDate: ['', Validators.required]
      });      
  }

  openModelToSelectUsers(usersModel) {
        this.allComplete = false;
        this.modalRef = this.modalService.open(usersModel, {backdrop: 'static', size: 'sm' });
  }

  async fetchUsers(classId) {
      this.notification.show();
      this.f.selectedUsers.setValue('');
      try {
          this.response = await this.commonService.fetchUsers(classId).toPromise();
          if(this.response.status === 200) {
            this.users = this.response.result;
            this.users.forEach(t => t.selected = false);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
          this.notification.error("Unable to load users");
      }
      this.notification.hide();
  }

  get f() { return this.createNotificationForm.controls; }

  onSubmit() {
    
    this.submitted = true;

      // stop here if form is invalid
      if (this.createNotificationForm.invalid) {
          return;
      }
      
      this.loading = true;
      this.notificationModel = new NotificationCreateModel();

      this.notificationModel.title = this.f.title.value;
      this.notificationModel.description = this.f.description.value;
      this.notificationModel.classId = this.f.classId.value;
      this.notificationModel.activeStatus = this.f.activeStatus.value;
      this.notificationModel.selectedUsers = this.saveCheckedUsers();
      this.notificationModel.startDate = this.dateUtil.format(this.f.startDate.value);
      this.notificationModel.endDate = this.dateUtil.format(this.f.endDate.value);

      this.createNotification(this.notificationModel);

      console.log(JSON.stringify(this.notificationModel));
      this.loading = false;

  }

  async createNotification(notificationModel) {
      this.notification.show();
      try {
          this.response = await this.notificationService.createNotification(notificationModel).toPromise();
          if(this.response.status === 200) {
              this.notification.success(this.response.message);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
          this.notification.error("Unable to create notification");
      }
      this.notification.hide();
  }  
  


    setAllUsers(selected: boolean) {
        this.allComplete = selected;
        this.users.forEach(t => t.selected = selected);
    }


    saveCheckedUsers() {
        const checkedUsers = this.getCheckedUsers();
        this.modalRef.close();
        return checkedUsers;

    }


    getCheckedUsers(): string {
      let selectedUserIds: string = '';
      this.selectedUsers = [];
      let selectedUserNames: string = '';
      this.users.forEach(t => {
          if(t.selected) {
            selectedUserIds += t.userId + ',' ;
            selectedUserNames += t.userName + '; ';
          }
      });
      this.f.selectedUsers.setValue(selectedUserNames);
      return selectedUserIds.substring(0, selectedUserIds.length-1);
    }

    onReset() {
        this.loading = false;
        this.submitted = false;
        this.createNotificationForm.reset();
        this.setDefaultsOnLoad();
    }

    setDefaultsOnLoad() {
        this.f.title.setValue("");
        this.f.description.setValue("");
        this.f.classId.setValue("");
        this.f.activeStatus.setValue("");
        this.f.selectedUsers.setValue("");
        this.f.startDate.setValue(this.dateUtil.currentDate);
        this.f.endDate.setValue("");
        
    }

}

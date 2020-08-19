import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { AssignmentCreateModel } from '../../../_models/assignmentcreatemodel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ASCreateModel } from '../../../_models/as-create.model';
import { Notification } from '../../../_util/notification.service';
import { CommonService } from '../../../_services/common.service';
import { CommonUtil } from '../../../_util/common.util';
import { DateUtil } from '../../../_util/date.util';
import { AssignmentService } from '../../../_services/assignment.service';
import { CustomValidator } from "../../../_validators/custom.validator";
import { UserResponseModel } from '../../../_models/response/user.response.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentResponseModel } from '../../../_models/response/assignment.response.model';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: './as-create.component.html'
})
export class ASCreateComponent implements OnInit {
    private createASForm: FormGroup;
    private loading = false;
    private submitted = false;
    private asModel: ASCreateModel;
    private classes: any[];
    private response: any;
    private activeStatus: string[];
    private users: UserResponseModel[];
    private modalRef: NgbModalRef;
    private selectedUsers = new Array();
    private allComplete: boolean = false;
    private assign: AssignmentResponseModel[];
    

    constructor(
        private formBuilder: FormBuilder,
        private notification: Notification,
        private commonService: CommonService,
        private commonUtil: CommonUtil,
        private dateUtil: DateUtil,
        private assignService: AssignmentService,
        private validator: CustomValidator,
        private modalService: NgbModal
    )  {
    }

    ngOnInit() {
        this.createASForm = this.validator.validateASCreateForm(this.formBuilder);
        this.f.submissionDate.setValue(this.dateUtil.currentDate);
        this.activeStatus = this.commonUtil.taskStatus;
        this.commonService.fetchClasses().then(data=>this.classes = data);

    }

    openModelToSelectUsers(usersModel) {
        this.allComplete = false;
        this.modalRef = this.modalService.open(usersModel, {backdrop: 'static', size: 'sm' });
    }


    fetchUsersAndTasks (classId) {
        this.assign = [];
        this.fetchUsers(classId);
        this.fetchTasks(classId);
        this.assign.forEach(e => {
            console.log(e);
        });
    }


    async fetchTasks(classId) {
        this.notification.show();
        this.f.selectedUsers.setValue('');
        try {
            this.response = await this.commonService.fetchAssignmentsByClass(classId).toPromise();
            if(this.response.status === 200) {
              this.assign = this.response.result;
            } else {
                this.notification.error(this.response.message);
            }
        } catch (err) {
            this.notification.error("Unable to load assignments");
        }
        this.notification.hide();
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
            this.notification.error("Unable to fetch users");
        }
        this.notification.hide();
    }

    get f() { return this.createASForm.controls; }

    onSubmit() {
      this.submitted = true;

        // stop here if form is invalid
        if (this.createASForm.invalid) {
            return;
        }
        this.loading = true;

        this.asModel = new ASCreateModel();
        this.asModel.classId = this.f.classId.value;
        this.asModel.assignmentId = this.f.assignmentId.value;
        this.asModel.activeStatus = this.f.activeStatus.value;
        this.asModel.submissionDate = this.dateUtil.format(this.f.submissionDate.value);
        this.asModel.result = this.f.result.value;
        this.asModel.remark = this.f.remark.value;
        this.asModel.selectedUserIds = this.saveCheckedUsers();

        this.loading = false;
        this.cnfSubmit(this.asModel);
        this.submitted = false;
        this.users = [];
        this.setDefaultsOnLoad();

    }

    async cnfSubmit (asModel) {
        try {
            this.response = await this.assignService.submitAssignment(asModel).toPromise();
            if(this.response.status === 200) {
                this.notification.success(this.response.message);
            } else {
                this.notification.error(this.response.message);
            }
        } catch (err) {
            this.notification.error("Unable to create assignemnt submission");
        }
    }

    onReset() {
        this.loading = false;
        this.submitted = false;
        this.createASForm.reset();
        this.setDefaultsOnLoad();
    }

    setDefaultsOnLoad() {
        this.f.classId.setValue("");
        this.f.assignmentId.setValue("");
        this.f.selectedUsers.setValue("");
        this.f.activeStatus.setValue("");
        this.f.submissionDate.setValue(this.dateUtil.currentDate);
        this.f.result.setValue("");
        this.f.remark.setValue("");
        this.selectedUsers = [];
        this.users = [];
        this.assign = [];
        
    }

    saveCheckedUsers() {
        const selectedUserIds = this.getCheckedUsers();
        this.modalRef.close();
        return selectedUserIds;

    }

    setAllUsers(selected: boolean) {
        this.allComplete = selected;
        this.users.forEach(t => t.selected = selected);
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
        console.log(selectedUserIds);
        return selectedUserIds.substring(0, selectedUserIds.length-1);
      }
}

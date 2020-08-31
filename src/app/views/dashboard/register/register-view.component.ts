import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { RegisterUserResponseModel } from '../../../_models/response/register.user.response';
import { Notification } from '../../../_util/notification.service';
import { CommonService } from '../../../_services/common.service';
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';
import { RegistrationService } from '../../../_services/registration.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from '../../../_util/date.util';
import { CommonUtil } from '../../../_util/common.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})

export class RegisterViewComponent implements OnInit {
  displayedColumns = ['FirstName', 'LastName', 'MobileNumber', 'Email', 'JoiningDate', 'View', 'Edit', 'Delete'];
  exampleDatabase: RegistrationService | null;
  dataSource: ExampleDataSource | null;
  response: any;
  userClass: LoadClassesResponse;
  className: any;
  classFee; any;
  modalRef: NgbModalRef;
  user: RegisterUserResponseModel;
  classes: LoadClassesResponse[];
  classDurations: string[];
  feesStatus: string[];
  isLoading = true;
  genders: string[];

  constructor(
      public httpClient: HttpClient,
      public dialog: MatDialog,
      private notification: Notification,
      private registerService: RegistrationService,
      private commonService: CommonService,
      private modalService: NgbModal,
      private dateUtil: DateUtil,
      private commonUtil: CommonUtil
  ) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.notification.show();
    this.loadData();
    this.commonService.fetchClasses().then(data=> this.classes = data);
    this.classDurations = this.commonUtil.classDuration;
    this.feesStatus = this.commonUtil.feesStatus;
    this.genders = this.commonUtil.gender;
    this.notification.hide();
  }

  // refresh() {
  //     this.loadData();
  // }

  viewUser(viewUserModel, user: RegisterUserResponseModel) {
      this.user = user;
      this.fetchClass(user.classNamedd);
      this.modalService.open(viewUserModel, {backdrop: 'static' });
  }

  async fetchClass(classId) {
      this.notification.show();
      try {
          this.response = await this.commonService.fetchClass(classId).toPromise();
          if(this.response.status === 200) {
              this.userClass = this.response.result;
              this.classFee = this.response.result.classFee;
              this.className = this.response.result.className;
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
          this.notification.hide();
          this.notification.error("Unable to load class");
      }
      this.notification.hide();
  }


  editUser(editUserModel, user) {
      this.user = user;
      this.modalRef = this.modalService.open(editUserModel, { backdrop: 'static', size: 'xl' });
  }

  deleteUser(deleteUserModel, user) {
      this.user = user;
      this.modalRef = this.modalService.open(deleteUserModel, { backdrop: 'static', size: 'sm' });
  }

  onChangeFetchClass (classId) {
      this.fetchClass(classId);
      this.user.feeAmount =  this.userClass.classFee;
  }

  submit(user) {
      user.joiningDate = this.dateUtil.format(user.joiningDate);
      this.registerService.updateUser(user);
      this.modalRef.close();
  }

  confirmDelete(user) {
      this.notification.show();
      this.cnfDelete(user.mobileNumber, user.userId);
      this.modalRef.close();
      this.notification.hide();
  }

  async cnfDelete(mobileNumber: string, id: number) {
      try {
          this.response = await this.registerService.deleteUser(mobileNumber, id).toPromise();
          if(this.response.status === 200) {
              this.notification.success(this.response.message);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
              this.notification.error("Unable to delete user");
      }
  }


  



  // private refreshTable() {
  //     this.paginator._changePageSize(this.paginator.pageSize);
  // }

  public loadData() {
      this.isLoading = true;
      this.exampleDatabase = new RegistrationService(this.httpClient, this.notification);
      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
          .subscribe(() => {
            if (!this.dataSource) {
              return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
      });
      this.isLoading = false;
  }
} 


export class ExampleDataSource extends DataSource<RegisterUserResponseModel> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: RegisterUserResponseModel[] = [];
  renderedData: RegisterUserResponseModel[] = [];

  constructor(public _exampleDatabase: RegistrationService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<RegisterUserResponseModel[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getRegisteredUsers();


    return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((user: RegisterUserResponseModel) => {
        const searchStr = (user.firstName + user.lastName + user.email + user.joiningDate
          + user.mobileNumber).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: RegisterUserResponseModel[]): RegisterUserResponseModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'MobileNumber': [propertyA, propertyB] = [a.mobileNumber, b.mobileNumber]; break;
        case 'Email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'FirstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'LastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
        case 'JoiningDate': [propertyA, propertyB] = [a.joiningDate, b.joiningDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

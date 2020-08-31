
import { NotificationService } from '../../../_services/notification.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../../../_util/notification.service';
import { CommonService } from '../../../_services/common.service';
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from '../../../_util/date.util';
import { CommonUtil } from '../../../_util/common.util';
import { NotificationResponseModel } from '../../../_models/response/notification.response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.css']
})

export class NotificationViewComponent implements OnInit {
  displayedColumns = ['Title', 'Class Name', 'End Date', 'Start Date', 'View', 'Edit', 'Delete'];
  notificationDatabase: NotificationService | null;
  dataSource: NotificationDataSource | null;
  response: any;
  userClass: LoadClassesResponse;
  className: any;
  classFee; any;
  modalRef: NgbModalRef;
  notification: NotificationResponseModel;
  classes: LoadClassesResponse[];
  classDurations: string[];
  feesStatus: string[];
  types: string[];

  constructor(
      private httpClient: HttpClient,
      private notify: Notification,
      private notificationService: NotificationService,
      private commonService: CommonService,
      private modalService: NgbModal,
      private dateUtil: DateUtil,
      private commonUtil: CommonUtil
  ) {
      this.types = this.commonUtil.noteTypes;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
        this.notify.show();
        this.loadData();
        this.commonService.fetchClasses().then(data=>this.classes = data);
        this.classDurations = this.commonUtil.classDuration;
        this.feesStatus = this.commonUtil.feesStatus;
        this.notify.hide();
  }

  // refresh() {
  //     this.loadData();
  // }

  viewNotification(viewNotificationModel, notification: NotificationResponseModel) {
      this.notification = notification;
      this.fetchClass(notification.classId);
      this.modalService.open(viewNotificationModel, { backdrop: 'static' });
  }

  async fetchClass(classId) {
      this.notify.show();
      try {
          this.response = await this.commonService.fetchClass(classId).toPromise();
          if(this.response.status === 200) {
              this.userClass = this.response.result;
              this.classFee = this.response.result.classFee;
              this.className = this.response.result.className;
          } else {
              this.notify.error(this.response.message);
          }
      } catch (err) {
          this.notify.hide();
          this.notify.error("Unable to load class");
      }
      this.notify.hide();
  }


  editNotification(editNotificationModel, notification: NotificationResponseModel) {
      this.notification = notification;
      this.modalRef = this.modalService.open(editNotificationModel, { backdrop: 'static', size: 'xl' });
  }

  deleteNotification(deleteNotificationModel, notification: NotificationResponseModel) {
      this.notification = notification;
      this.modalRef = this.modalService.open(deleteNotificationModel, {backdrop: 'static', size: 'sm' });
  }

  onChangeFetchClass (classId) {
      this.fetchClass(classId);
  }

  submit(notification: NotificationResponseModel) {
      notification.startDate = this.dateUtil.format(notification.startDate);
      notification.endDate = this.dateUtil.format(notification.endDate);
      notification.creationDate = this.dateUtil.format(notification.creationDate);
      this.update(notification);
      this.modalRef.close();
  }

  async update(notification: NotificationResponseModel) {
      this.notify.show();
      try {
          this.response = await this.notificationService.updateNotifications(notification).toPromise();
          if(this.response.status === 200) {
              this.notify.success(this.response.message);
              this.loadData();
          } else {
              this.notify.error(this.response.message);
          }
      } catch (err) {
              this.notify.error("Unable to update notification");
      }
      this.notify.hide();
  }

  confirmDelete(notification: NotificationResponseModel) {
      this.notify.show();
      this.cnfDelete(notification.notificationId);
      this.modalRef.close();
      this.notify.hide();
  }

  async cnfDelete(id: number) {
      this.notify.show();
      try {
          this.response = await this.notificationService.deleteNotification(id).toPromise();
          if(this.response.status === 200) {
              this.notify.success(this.response.message);
              this.loadData();
          } else {
              this.notify.error(this.response.message);
          }
      } catch (err) {
              this.notify.error("Unable to delete notification");
      }
      this.notify.hide();
  }

  public loadData() {
      this.notify.show();
      this.notificationDatabase = new NotificationService(this.httpClient, this.notify);
      this.dataSource = new NotificationDataSource(this.notificationDatabase, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
          .subscribe(() => {
            if (!this.dataSource) {
              return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
      });
      this.notify.hide();
  }
} 


export class NotificationDataSource extends DataSource<NotificationResponseModel> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: NotificationResponseModel[] = [];
  renderedData: NotificationResponseModel[] = [];

  constructor(public notificationData: NotificationService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<NotificationResponseModel[]> {
    const displayDataChanges = [
      this.notificationData.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.notificationData.getNotifications();
    
    return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this.notificationData.data.slice().filter((notification: NotificationResponseModel) => {
        const searchStr = (notification.title + notification.className + notification.startDate + notification.endDate).toLowerCase();
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
  sortData(data: NotificationResponseModel[]): NotificationResponseModel[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }

      return data.sort((a, b) => {
          let propertyA: number | string = '';
          let propertyB: number | string = '';
          
          switch (this._sort.active) {
            case 'Title': [propertyA, propertyB] = [a.title, b.title]; break;
            case 'Class Name': [propertyA, propertyB] = [a.className, b.className]; break;
            case 'End Date': [propertyA, propertyB] = [a.endDate, b.endDate]; break;
            case 'Start Date': [propertyA, propertyB] = [a.startDate, b.startDate]; break;
          }

          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
  }
}


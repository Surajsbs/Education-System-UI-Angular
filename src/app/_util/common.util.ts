import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonUtil {

    get classDuration() { return [ "2020-2021", "2021-2022", "2022-2023" ] }
    get feesStatus() { return [  "Full Paid", "Partial Paid", "Pending" ] }
    get noteTypes() { return [  "PDF File", "Audio File", "Video File", "Text File", "Doc File", "Excel Sheet", "Image" ] }
    get activeStatus() { return [  "Yes", "No" ] }
    get gender() { return [  "Male", "Female" ] }
    get taskStatus() { return [  "Completed", "In-Progress", "Pending"] }
}
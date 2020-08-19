import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class DateUtil {
    get currentDate() { return moment(new Date()).format("YYYY-MM-DD") }
    
    format(date): string { 
        return moment(date).format("YYYY-MM-DD");
    }
}
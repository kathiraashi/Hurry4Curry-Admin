import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/API/AccountSettings/';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

   constructor(private http: Http) { }

    // Bank
      public Bank_AsyncValidate(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_Create(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_List(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_List', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_Update(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_Delete(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Delete', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_SimpleList(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
      }

}

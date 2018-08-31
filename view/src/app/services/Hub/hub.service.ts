import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/API/Hub/';

@Injectable({
  providedIn: 'root'
})
export class HubService {


   constructor(private http: Http) {
   }

   // Hub
   public Hub_UserName_AsyncValidate(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Hub_UserName_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Hub_PhoneNumber_AsyncValidate(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Hub_PhoneNumber_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Hub_Create(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Hub_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Hub_List(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Hub_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Hub_View(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Hub_View', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Hub_Update(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Hub_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
}

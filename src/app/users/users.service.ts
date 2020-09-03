import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'https://api.github.com/';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        let url = this.baseUrl + "users";
        return this.http.get<any[]>(url).pipe(catchError(this.handleError));
    }

    getUserRepo(userName:string): Observable<any[]> {
        let url = this.baseUrl+`users/${userName}/repos`;
        return this.http.get<any[]>(url).pipe(catchError(this.handleError));
    }
    getUsersByUserName(userName:string): Observable<any[]> {
        let url = this.baseUrl+`users/${userName}`;
        return this.http.get<any[]>(url).pipe(catchError(this.handleError));
    }
    
    private handleError(err: any): Observable<never> {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}

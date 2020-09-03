import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './users.service';
import { UserResolved } from './UserResolved';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<UserResolved> {
    constructor(private userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
        const user = route.paramMap.get('user');
        return this.userService.getUserRepo(user)
            .pipe(
                map(repos => ({ repos })),
                catchError(error => {
                    const message = `Retrieval error: ${error}`;
                    console.error(message);
                    return of({ product: null, error: message });
                })
            );
    }
}

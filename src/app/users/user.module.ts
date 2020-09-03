import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './List/users.component';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos/repos.component';
import { UserResolver } from './user-resolver.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: UsersComponent
            },
            {
                path: ':user',
                component: ReposComponent,
                resolve: { resolvedData: UserResolver }
            }
        ])
    ],
    declarations: [
        UsersComponent,
        ReposComponent,
    ],
})
export class UserModule { }

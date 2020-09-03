import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectiveStrategy } from './selective-strategy.service';



@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'users',
        data: { preload: false },
        loadChildren: () =>
          import('./users/user.module').then(m => m.UserModule)
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ], { preloadingStrategy: SelectiveStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

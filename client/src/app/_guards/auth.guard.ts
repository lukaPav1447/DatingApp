// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable, map } from 'rxjs';
// import { AccountService } from '../_services/account.service';
// import { ToastrService } from 'ngx-toastr';

// @Injectable ({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate {
//   constructor(private accountService: AccountService, private toastr: ToastrService) {}
//   canActivate() : Observable<boolean> {
//     return this.accountService.currentUser$.pipe(
//       map(user => {
//         if(user) return true;
//         this.toastr.error('You shall not pass!')
//       })
//     )
//   }
// }
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user) return true;
      else {
        toastr.error('You shall not pass!');
        return false;
      }
    })
  )
};
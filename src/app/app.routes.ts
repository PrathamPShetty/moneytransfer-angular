import { Routes } from '@angular/router';
import {RouteConstants} from './constants/route-constants';
import {LoginComponent} from './ui/pages/login/login.component';
import {SignupComponent} from './ui/pages/signup/signup.component';
import {ProfileComponent} from './ui/pages/profile/profile.component';
import {TransactionsComponent} from './ui/pages/transactions/transactions.component';
import {TransferComponent} from './ui/pages/transfer/transfer.component';
import {authGuard} from './guard/auth/auth.guard';
import {loginGuard} from './guard/login/login.guard';
import {LayoutComponent} from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RouteConstants.LOGIN,
    pathMatch: 'full'
  },
  {
    path: RouteConstants.LOGIN,
    component: LoginComponent,
    // canActivate: [loginGuard]
  },
  {
    path: RouteConstants.SIGNUP,
    component: SignupComponent,
    // canActivate: [loginGuard]
  },
  {

    'path': '',
    component: LayoutComponent,
    children: [

      {
        path: RouteConstants.PROFILE,
        component: ProfileComponent
      },
      {
          path: RouteConstants.TRANSACTIONS,
        component: TransactionsComponent
      },
      {
        path: RouteConstants.TRANSFER,
        component: TransferComponent
      }
    ],
    // canActivateChild: [authGuard]
  }
];

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';
import {RouteConstants} from '../../constants/route-constants';
import {Subscription} from 'rxjs';
import {getConfig} from '../../utils/session-storage.utils';
import {SideNavService} from '../../services/side-nav/side-nav.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContent,
    MatToolbar,
    MatIcon,
    RouterOutlet,
    MatSidenav,
    MatNavList,
    MatSidenavContainer,
    MatListItem,
    RouterLink,
    MatIconButton
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit,OnDestroy{

  profile = RouteConstants.PROFILE;

  availableOptions :{routerLink:string,name:string}[] = [
    {
      routerLink:RouteConstants.PROFILE,
      name:'profile',
    },
    {
        routerLink: RouteConstants.TRANSACTIONS,
      name: 'transactions',
    },
    {
        routerLink: RouteConstants.TRANSFER,
      name: 'transfer',
    },

  ]
  options:{routerLink:string,name:string}[]=[];
  config:any = {};
  private subscription: Subscription|undefined;
  constructor(private authService: AuthService,private sideNavService:SideNavService) {
    this.updateUi();
  }

  ngOnInit() {
    this.subscription = this.sideNavService.notifyObservable$.subscribe(() => {
      this.updateUi();
    });
  }
  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }

  logout() {
    this.authService.logOut();
  }

  private updateUi() {
    this.config = getConfig();
    if (this.config) {
      this.options = this.availableOptions.filter(option => this.config['route-config'][option.routerLink]);
    }else{
      this.options = this.availableOptions;
    }
  }
}

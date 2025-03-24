import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private notifySubject = new Subject<void>();
  notifyObservable$ = this.notifySubject.asObservable();

  notify() {
    this.notifySubject.next();
  }
}

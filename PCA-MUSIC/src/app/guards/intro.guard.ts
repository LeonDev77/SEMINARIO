import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  async canActivate() {
    const isView: boolean = await this.storageService.get('intro');
    return isView === true ? true : this.router.navigate(['/intro']);
  }
}

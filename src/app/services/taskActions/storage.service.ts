import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    public locS = localStorage.getItem('todo')
  private storageSub= new BehaviorSubject<any[]>(JSON.parse(this.locS));

  watchStorage(): Observable<any[]> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
    this.storageSub.next(data);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.storageSub.next(null);
  }
}
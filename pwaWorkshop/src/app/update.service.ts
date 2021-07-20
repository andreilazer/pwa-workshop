import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  available$ = this.swUpdate.available;

  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) { }

  subscribeToUpdates() {
    if (this.swUpdate.isEnabled) {
      const isStable = this.appRef.isStable.pipe(
        first(stable => stable === true)
      );
      const updateInterval = interval(30 * 1000); // check every 30 seconds
      const updateOnceAppIsStable = concat(isStable, updateInterval);
      updateOnceAppIsStable
        .pipe(
          tap(() => console.log('checking for updates'))
        )
        .subscribe(() => this.swUpdate.checkForUpdate());
    }
  }

  activateUpdate() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
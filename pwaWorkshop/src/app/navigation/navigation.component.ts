import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NetworkStateService } from '../network-state.service';
import { UpdateService } from '../update.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );
  
  installPromptEvent: any;
  isInstallVisible = false;
    
  constructor(private breakpointObserver: BreakpointObserver,
    public networkService: NetworkStateService,
    private updateService: UpdateService,
    private snackBar: MatSnackBar) {
    
    this.subscribeToUpdates();
    this.prepareInstallButton();
  }

  install() {
    this.isInstallVisible = false;
    // Show the modal add to home screen dialog
    this.installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    this.installPromptEvent.userChoice.then((choice:any) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      this.installPromptEvent = null;
    });
  }

  private prepareInstallButton() {
    window.addEventListener('beforeinstallprompt', event => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.installPromptEvent = event;
      // Update the install UI to notify the user app can be installed
      this.isInstallVisible = true;
    });
  }
  
  private subscribeToUpdates() {
    this.updateService.subscribeToUpdates();
    this.updateService.available$
      .pipe(tap(update => console.log('update available', update)))
      .subscribe(event => {
        console.log(
          '[App Shell Update] Update available: current version is',
          event.current,
          'available version is',
          event.available
        );

        const versionMessage = (event.available?.appData as any)?.versionMessage || '';
        const snackBarRef = this.snackBar.open(
          versionMessage || 'Newer version of the app is available.',
          'Refresh the page'
        );

        snackBarRef.onAction().subscribe(() => {
          this.updateService.activateUpdate();
        });
      });
  }
}

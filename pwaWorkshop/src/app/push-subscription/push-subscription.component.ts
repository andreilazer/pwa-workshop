import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { take } from 'rxjs/operators';

// Import SwPush here

@Component({
  selector: 'push-subscription',
  templateUrl: './push-subscription.component.html',
  styleUrls: ['./push-subscription.component.css']
})
export class PushSubscriptionComponent implements OnInit {

  private snackBarDuration: number = 2000;

  constructor(
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
  }

  subscribeToPush() {
    // Code to subscribe user to the Push notifications
  }

  unsubscribeFromPush() {
    // Code to unsubscribe user from the Push notifications
  }

  showMessages() {
    // Code to listen to the Push notifications
  }
}

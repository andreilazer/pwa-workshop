import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { take } from 'rxjs/operators';

// Import SwPush here
import { SwPush } from '@angular/service-worker';
import { PushSubscriptionService } from '../push-subscription.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'push-subscription',
  templateUrl: './push-subscription.component.html',
  styleUrls: ['./push-subscription.component.css']
})
export class PushSubscriptionComponent implements OnInit {
  private VAPID_PUBLIC_KEY!: string;

  private snackBarDuration: number = 2000;

  constructor(
    private pushSubscriptionService: PushSubscriptionService,
    public snackBar: MatSnackBar,
    private configService: ConfigService,
    private swPush: SwPush
  ) {}

  ngOnInit() {
    this.VAPID_PUBLIC_KEY = this.configService.get('VAPID_PUBLIC_KEY');
  }

  subscribeToPush() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(pushSubscription => {
        this.pushSubscriptionService.addSubscriber(pushSubscription).subscribe(
          res => {
            console.log('[Push Subscription] Add subscriber request answer', res);
            this.snackBar.open(
              'Now you are subscribed',
              'OK',
              {
                duration: this.snackBarDuration
              }
            );
          },
          err => {
            console.log('[Push Subscription] Add subscriber request failed', err);
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  unsubscribeFromPush() {
    // Get active subscription
    this.swPush.subscription.pipe(take(1)).subscribe(pushSubscription => {
      console.log('[Push Subscription] pushSubscription', pushSubscription);

      // Delete the subscription on the backend
      this.pushSubscriptionService.deleteSubscriber(pushSubscription).subscribe(
        res => {
          console.log('[Push Subscription] Delete subscriber request answer', res);

          this.snackBar.open(
            'Now you are unsubscribed',
            'OK',
            {
              duration: this.snackBarDuration
            }
          );

          // Unsubscribe current client (browser)
          if (pushSubscription) {
            pushSubscription
              .unsubscribe()
            .then(success => {
              console.log('[Push Subscription] Unsubscription successful', success);
            })
            .catch(err => {
              console.log('[Push Subscription] Unsubscription failed', err);
            });
          }
        },
        err => {
          console.log('[Push Subscription] Delete subscription request failed', err);
        }
      );
    });
  }
}

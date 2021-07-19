import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushSubscriptionService {
  private pushSubscriptionUrl: string;

  constructor(private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.pushSubscriptionUrl = `${this.configService.get('PUSH_API_URL')}/api/PushSubscriptions`;
  }

  addSubscriber(subscription: PushSubscription): Observable<any> {
    console.log('[Push Subscription Service] Adding subscriber');

    return this.httpClient.post(this.pushSubscriptionUrl, subscription);
  }

  deleteSubscriber(subscription: any): Observable<any> {
    console.log('[Push Subscription Service] Deleting subscriber');

    return this.httpClient.post(this.pushSubscriptionUrl + '/removeSubscription', subscription);
  }
}

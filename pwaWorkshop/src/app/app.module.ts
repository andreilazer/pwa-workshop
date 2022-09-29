import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppShellUpdateComponent } from './app-shell-update/app-shell-update.component';
import { CachedRouteComponent } from './cached-route/cached-route.component';
import { NonCachedRouteComponent } from './non-cached-route/non-cached-route.component';
import { PushSubscriptionComponent } from './push-subscription/push-subscription.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CocktailMenuComponent } from './cocktail-menu/cocktail-menu.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { CocktailListComponent } from './cocktail-menu/cocktail-list/cocktail-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    PushSubscriptionComponent,
    AppShellUpdateComponent,
    CachedRouteComponent,
    NonCachedRouteComponent,
    CocktailMenuComponent,
    CocktailListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    HttpClientModule,
    MatPaginatorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [NavigationComponent]
})
export class AppModule { }

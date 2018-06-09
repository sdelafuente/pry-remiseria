import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { AbmViajesComponent } from './abm-viajes/abm-viajes.component';
import { JwtModule } from './jwt/jwt.module';
import { ServicioService } from './servicios/servicio.service';
import { AuthService } from './servicios/auth.service';
import { VerificarJWTService } from './servicios/verificar-jwt.service';


import { DirectionsMapDirective } from './google-map.directive';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent   },
  { path: 'inicio', component: InicioComponent, canActivate: [VerificarJWTService] },
  {path: 'viajes', component: AbmViajesComponent, canActivate: [VerificarJWTService] },
  // { path: 'viajes', component: AbmViajesComponent   },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ErrorComponent,
    MenuComponent,
    AbmViajesComponent,
    DirectionsMapDirective
  ],
  imports: [
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD8oGFz45Lag_VTJcXCzyjbb5P81aMVwbw',
        libraries: ['places']
        }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JwtModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ServicioService,
    AuthService,
    VerificarJWTService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import {FileUploadModule} from 'primeng/fileupload';

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
import { GeoCodingDirective } from './geocoding.directive';

import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { ModificarViajeComponent } from './modificar-viaje/modificar-viaje.component';
import { AbmVehiculosComponent } from './abm-vehiculos/abm-vehiculos.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { CategoriasPipe } from './pipes/categorias.pipe';
import { RegistroComponent } from './registro/registro.component';
import { RemiseroComponent } from './remisero/remisero.component';
import { FotosComponent } from './fotos/fotos.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent   },
  { path: 'registro', component: RegistroComponent   },
  { path: 'inicio', component: InicioComponent, canActivate: [VerificarJWTService] },
  { path: 'viajes', component: AbmViajesComponent, canActivate: [VerificarJWTService]},
  { path: 'modificar', component: ModificarViajeComponent, canActivate: [VerificarJWTService]},
  { path: 'vehiculos', component: AbmVehiculosComponent, canActivate: [VerificarJWTService]},
  { path: 'usuarios', component: AbmUsuariosComponent, canActivate: [VerificarJWTService] },
  { path: 'encuesta', component: EncuestaComponent, canActivate: [VerificarJWTService] },
  { path: 'remisero', component: RemiseroComponent, canActivate: [VerificarJWTService] },
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
    DirectionsMapDirective,
    GeoCodingDirective,
    AbmUsuariosComponent,
    ModificarViajeComponent,
    AbmVehiculosComponent,
    EncuestaComponent,
    CategoriasPipe,
    RegistroComponent,
    RemiseroComponent,
    FotosComponent
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
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    NgxCaptchaModule.forRoot({  reCaptcha2SiteKey: '6LeFR14UAAAAAEY8fJPkrNEV9PNDmoQgV708jdhZ'  })
  ],
  providers: [
    ServicioService,
    AuthService,
    VerificarJWTService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

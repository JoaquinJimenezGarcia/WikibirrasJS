import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros.component';
import { CervezasComponent } from './components/cervezas.component';
import { AdminLoginComponent } from './components/admin-login.component';
import { AdminCervezaComponent } from './components/admin-cerveza.component';
import { CervezaComponent } from './components/cerveza.component';
import { EditarCervezaComponent } from './components/editar-cerveza.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreNosotrosComponent,
    CervezasComponent,
    AdminLoginComponent,
    AdminCervezaComponent,
    CervezaComponent,
    EditarCervezaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

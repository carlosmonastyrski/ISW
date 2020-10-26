import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { MapaComponent } from './components/mapa/mapa.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PedidoComponent,
    MenuComponent,
    ModalDialogComponent,
    MapaComponent,
  ],
  imports: [
    // cosas del mapa
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBN3hl8CILMQex6Sv2xo0rxrhetOd1Zcs8',
    }),
    //
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'spedido', component: PedidoComponent },
      { path: 'mapa', component: MapaComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent, MapaComponent],
})
export class AppModule {}

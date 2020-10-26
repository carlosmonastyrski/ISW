import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  // -----------------------Origen

  ListoOrigen: boolean;
  FormOrigen: FormGroup;
  GotoDestino: boolean;
  GotoMapa: boolean;
  Mapa: boolean;
  MontoOrigen: number;
  Subido: boolean;

  // ---------------------------Destino
  Calendar: boolean;
  FormDestino: FormGroup;
  ListoDestino: boolean;
  PasarFP: boolean;

  // --------------------------- Pago
  Tarjeta: boolean;
  Efectivo: boolean;
  FormEfectivo: FormGroup;
  FormTarjeta: FormGroup;
  Submitted = false;

  constructor(public formBuilder: FormBuilder) {}

  // ----------------------MAPA

  // google maps zoom level
  zoom: number = 16;

  // initial center position for the map
  lat: number = -31.4286287;
  lng: number = -64.1848189;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: -31.4286287,
      lng: -64.1848189,
      label: 'A',
      draggable: true,
    },
  ];

  ngOnInit() {
    // -------------------------------------------- Origen
    this.ListoOrigen = false;
    this.GotoDestino = false;
    this.GotoMapa = false;
    this.Mapa = false;
    this.FormOrigen = this.formBuilder.group({
      QueOrigen: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      DirOrigen: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      NroOrigen: [
        null,
        [Validators.required, Validators.pattern('[0-9]{1,7}')],
      ],
      TorreOrigen: [null, [Validators.pattern('[0-9]{1,7}')]],
      PisoOrigen: [null, [Validators.pattern('[0-9]{1,7}')]],
      RefOrigen: [null, [Validators.maxLength(255)]],
      MontoOrigen: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,7}')],
      ],
    });
    //-----------------------------------------------Destino
    this.Calendar = false;
    this.ListoDestino = false;
    this.PasarFP = false;
    this.FormDestino = this.formBuilder.group({
      DirDestino: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      NroDestino: [
        null,
        [Validators.required, Validators.pattern('[0-9]{1,7}')],
      ],
      TorreDestino: [null, [Validators.pattern('[0-9]{1,7}')]],
      PisoDestino: [null, [Validators.pattern('[0-9]{1,7}')]],
      RefDestino: [null, [Validators.maxLength(255)]],
    });

    this.Efectivo = true;
    this.Subido = false;
    this.FormEfectivo = this.formBuilder.group({
      Abonado: [null, [Validators.required, Validators.pattern('[0-9]{1,7}')]],
    });
    this.FormTarjeta = this.formBuilder.group({
      Name: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      Nro: [
        null,
        [
          Validators.required,
          Validators.pattern('[4]{1}[0-9]{3}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}'),
        ],
      ],
      Fecha: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '([0]{1}[1-9]{1}||[1]{1}[0-2]{1})[-][2]{1}[0-9]{3}'
          ),
        ],
      ],
      Crc: [null, [Validators.required, Validators.pattern('[0-9]{3}')]],
    });
  }

  destino() {
    if (!this.checkImg()) {
      return;
    }
    if (this.FormOrigen.invalid) {
      this.ListoOrigen = true;
      return;
    } else {
      this.MontoOrigen = parseInt(
        (document.getElementById('MontoOrigen') as HTMLInputElement).value
      );
      this.GotoDestino = true;
    }
  }

  volverOrigen() {
    this.GotoMapa = false;
    this.GotoDestino = false;
  }

  mapa() {
    if (!this.checkImg()) {
      return;
    }
    if (this.FormOrigen.controls.QueOrigen.invalid) {
      this.Mapa = true;
      return;
    } else {
      this.GotoMapa = true;
    }
  }

  habilitar() {
    this.Calendar = true;
    return;
  }
  deshabilitar() {
    this.Calendar = false;
  }

  efectiv() {
    this.Efectivo = true;
    this.Tarjeta = false;
  }

  td() {
    this.Tarjeta = true;
    this.Efectivo = false;
  }

  checkImg() {
    let foto = document.getElementById('foto') as HTMLInputElement;

    if (foto.files[0] == undefined) {
      return true;
    }

    if (foto.files[0].size > 500000) {
      alert('El archivo no debe superar los 5MB');
      return false;
    }
    return true;
  }

  submit() {
    this.Submitted = true;
    if (this.Tarjeta) {
      if (this.FormTarjeta.invalid) {
        return;
      } else {
        let fecha = new Date();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        let mesTarjeta = (document.getElementById(
          'fechaVenc'
        ) as HTMLInputElement).value
          .toString()
          .split('-');

        if (
          parseInt(mesTarjeta[1]) < anio ||
          (parseInt(mesTarjeta[1]) == anio && parseInt(mesTarjeta[0]) <= mes)
        ) {
          this.FormTarjeta.controls.Fecha.reset();
          return;
        }

        this.Subido = true;
        console.log('Subido');
      }
    }
    if (this.Efectivo) {
      if (this.FormEfectivo.invalid) {
        return;
      } else {
        if (
          this.MontoOrigen >
          parseInt(
            (document.getElementById('MontoAbonado') as HTMLInputElement).value
          )
        ) {
          this.FormEfectivo.reset();
          alert('Monto Incorrecto');
          console.log('Monto incorrecto');
          return;
        }
        this.Subido = true;
        console.log('Subido');
      }
    }
  }

  formaPago() {
    if (this.FormDestino.invalid) {
      this.ListoDestino = true;
      return;
    } else {
      if (!this.Calendar) {
        this.PasarFP = true;
        this.GotoDestino = false;
        return;
      }

      var pedido = (document.getElementById('day') as HTMLInputElement).value;
      let diaPedido = pedido.toString().split('-');
      var horaPedido = (document.getElementById('hh') as HTMLInputElement)
        .value;

      let fecha = new Date();
      let hoy = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anio = fecha.getFullYear();
      let hora = fecha.getHours();

      if (
        parseInt(diaPedido[0]) >= anio &&
        parseInt(diaPedido[1]) >= mes &&
        parseInt(diaPedido[2]) >= hoy
      ) {
        if (parseInt(diaPedido[2]) == hoy && parseInt(horaPedido) < hora + 1) {
          alert('Fecha Incorrecta');
          console.log('Fecha Incorrecta.');
        } else {
          this.PasarFP = true;
          this.GotoDestino = false;
        }
      } else {
        alert('Fecha Incorrecta');
        console.log('Fecha Incorrecta.');
      }
    }
  }
  volverOrigenMapa() {
    this.GotoMapa = false;
  }

  volverDestino() {
    this.PasarFP = false;
    this.GotoDestino = true;
  }

  destinoMapa() {
    this.GotoMapa = false;
    this.GotoDestino = true;
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

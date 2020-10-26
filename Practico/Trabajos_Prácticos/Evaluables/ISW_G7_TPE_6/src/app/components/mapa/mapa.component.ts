import { Component } from '@angular/core';
// import { MouseEvent } from '@agm/core';

@Component({
  selector: 'my-app',
  templateUrl: './mapa.component.html',
  styleUrls: [ './mapa.component.css' ]
})


export class MapaComponent  {
  // google maps zoom level
  zoom: number = 16;
  
  // initial center position for the map
  lat: number = -31.4286287;
  lng: number = -64.1848189;
  

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
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
		  draggable: true
	  },
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}




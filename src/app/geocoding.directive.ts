import {GoogleMapsAPIWrapper} from '@agm/core';
import { MapsAPILoader} from '@agm/core';
import { Directive,  Input, Output } from '@angular/core';

declare var google: any;

@Directive({
  selector: 'agm-map-geocoging'
})

export class GeoCodingDirective {


constructor (private gmapsApi: GoogleMapsAPIWrapper) {}


}

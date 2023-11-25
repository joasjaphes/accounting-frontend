import { Component } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/router-animation';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  animations:[fadeIn]
})
export class ClientDetailsComponent {
  clientName:string;
  clientPhone:string;
  clientEmail:string;
}

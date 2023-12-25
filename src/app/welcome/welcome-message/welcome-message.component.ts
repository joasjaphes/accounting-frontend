import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/router-animation';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss'],
  animations: [fadeIn],
})
export class WelcomeMessageComponent implements OnInit {
  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  templateUrl: './home.component.html',
})
export class HomeComponent {}

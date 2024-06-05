import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root-layout',
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  templateUrl: './root-layout.component.html',
})
export class RootLayoutComponent {}

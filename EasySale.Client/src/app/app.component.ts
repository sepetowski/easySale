import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Ripple, RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, RippleModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig);

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}

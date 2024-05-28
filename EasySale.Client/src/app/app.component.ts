import { Component, OnInit, inject } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  private _primengConfig = inject(PrimeNGConfig);
  private _authService = inject(AuthService);

  ngOnInit() {
    this._primengConfig.ripple = true;
    this._authService.tryToSignInOnStart();
  }
}

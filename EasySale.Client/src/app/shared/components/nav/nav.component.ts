import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { NAV_ITEMS, NavItem } from './nav.constants';
import { RouterLink } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    StyleClassModule,
    ScrollPanelModule,
    RouterLink,
    AvatarModule,
  ],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  private authService = inject(AuthService);

  sidebarVisible: boolean = false;
  navItems: NavItem[] = NAV_ITEMS;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  handleLogOut() {
    this.authService.logOut();
  }
}

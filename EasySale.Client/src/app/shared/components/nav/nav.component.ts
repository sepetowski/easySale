import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { NAV_ITEMS, NavItem } from './nav.constants';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BadgeModule } from 'primeng/badge';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
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
    BadgeModule,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit, OnDestroy {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  private authService = inject(AuthService);

  private userSub: Subscription | null = null;
  user: User | null = null;

  sidebarVisible: boolean = false;
  navItems: NavItem[] = NAV_ITEMS;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.user = user)
    );
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  handleLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}

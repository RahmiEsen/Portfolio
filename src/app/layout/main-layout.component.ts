import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GoTopComponent } from './go-top/go-top.component';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    GoTopComponent,
    LanguageToggleComponent,
    CommonModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
  constructor(public router: Router) {}
  
  isOnSpecialPage(): boolean {
    return this.router.url.includes('/legal-notice') || this.router.url.includes('/privacy-policy');
  }
}
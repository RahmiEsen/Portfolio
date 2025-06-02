import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { RouterModule, Router  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

interface NavItem {
  icon: string;
  labelKey: string;
  route?: string;
  targetId?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  
  isDropdownVisible: boolean = false;
  hovered: string = '';
  
  navItems: NavItem[] = [
    { icon: 'home.png', labelKey: 'nav.home', route: '/', targetId: 'home' },
    { icon: 'work.png', labelKey: 'nav.projects', targetId: 'projects' },
    { icon: 'about.png', labelKey: 'nav.about', targetId: 'about' },
    { icon: 'mail.png', labelKey: 'nav.contact', targetId: 'contact' }
  ];
  
  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
  
  @HostListener('document:click', ['$event']) 
  onClick(event: MouseEvent) {
    if (!this.isDropdownVisible) return;
    const clickedInsideDropdown = this.dropdown.nativeElement.contains(event.target);
    const clickedOnHamburger = this.hamburger.nativeElement.contains(event.target);
    if (!clickedInsideDropdown && !clickedOnHamburger) {
      this.closeDropdown();
    }
  }
  
  closeDropdown() {
    this.isDropdownVisible = false;
  }
  
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;

    setTimeout(() => {
      const dropdown = document.querySelector('.mobil-dropdown');
      if (dropdown) {
        dropdown.classList.toggle('is-visible', this.isDropdownVisible);
      }
    }, 0);
  }
  
  navigateTo(targetId: string): void {
    const currentUrl = this.getCurrentUrl();
    if (this.shouldNavigateToRoot(currentUrl)) {
      this.prepareFocus(targetId);
      this.router.navigate(['/'], { fragment: targetId });
    } else {
      this.scrollToSection(targetId);
    }
    this.closeDropdown();
  }
  
  private getCurrentUrl(): string {
    return this.router.url.split('#')[0];
  }
  
  private shouldNavigateToRoot(currentUrl: string): boolean {
    return currentUrl !== '/';
  }
  
  private prepareFocus(targetId: string): void {
    if (targetId === 'contact') {
      sessionStorage.setItem('focusContactInput', 'true');
    }
  }
  
  private scrollToSection(targetId: string): void {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    
    if (targetId === 'contact') {
      this.prepareFocus(targetId);
      setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>('input[name="username"]');
        input?.focus();
        sessionStorage.removeItem('focusContactInput');
      }, 700);
    }
  }
}
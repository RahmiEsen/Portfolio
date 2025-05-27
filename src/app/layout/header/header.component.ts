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
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/') {
      this.router.navigate(['/'], { fragment: targetId });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
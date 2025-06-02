import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  socialLinks = [
    { icon: './assets/stack/linkedin.svg', name: 'LinkedIn', url: 'https://www.linkedin.com/in/rahmi-esen-574182310/' },
    { icon: './assets/stack/github.svg', name: 'GitHub', url: 'https://github.com/RahmiEsen' }
  ];
  
  navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'About Me', target: 'about' },
    { name: 'Contact', target: 'contact' }
  ];
  
  navigateTo(target: string): void {
    this.prepareFocusIfContact(target);
    this.scrollToTarget(target);
  }
  
  private prepareFocusIfContact(target: string): void {
    if (target === 'contact') {
      sessionStorage.setItem('focusContactInput', 'true');
    }
  }
  
  private scrollToTarget(target: string): void {
    if (this.isHome(target)) {
      this.scrollToTop();
    } else {
      this.scrollToSection(target);
    }
  }
  
  private isHome(target: string): boolean {
    return target === 'home';
  }
  
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  private scrollToSection(target: string): void {
    const element = document.getElementById(target);
    if (!element) return;
    
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    if (target === 'contact') {
      setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>('input[name="username"]');
        input?.focus();
        sessionStorage.removeItem('focusContactInput');
      }, 700);
    }
  }
  
  openProjects(): void {
    this.navigateTo('projects');
  }
  
  openExternal(url: string): void {
    window.open(url, '_blank');
  }
}
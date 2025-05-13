import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  socialLinks = [
    { icon: './assets/stack/linkedin.svg', name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: './assets/stack/github.svg', name: 'GitHub', url: 'https://github.com' }
  ];
  
  navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'About Me', target: 'about' },
    { name: 'Contact', target: 'contact' }
  ];
  
  navigateTo(target: string): void {
    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
  
  openProjects(): void {
    this.navigateTo('projects');
  }
  
  openExternal(url: string): void {
    window.open(url, '_blank');
  }
}
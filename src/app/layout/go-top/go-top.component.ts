import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-go-top',
  imports: [CommonModule],
  templateUrl: './go-top.component.html',
  styleUrls: ['./go-top.component.scss']
})

export class GoTopComponent {
  isVisible = false;
  private timer: any;
  
  @HostListener('window:scroll')
  onScroll(): void {
    this.toggleVisibility();
    this.resetTimer();
  }
  
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.isVisible = false;
    clearTimeout(this.timer);
  }
  
  private toggleVisibility(): void {
    this.isVisible = window.scrollY > 200;
  }
  
  private resetTimer(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => (this.isVisible = false), 2000);
  }
}
import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


interface NavItem {
  icon: string;
  label: string;
  route?: string;
  targetId?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements AfterViewInit {
  @ViewChild('typewriter') typewriterRef!: ElementRef;
  @ViewChild('cursor') cursorRef!: ElementRef;
  @ViewChild('mouseRef1') mouseRef1!: ElementRef;
  @ViewChild('mouseRef2') mouseRef2!: ElementRef;
  @ViewChild('mouseRef3') mouseRef3!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  isDropdownVisible: boolean = false;
  
  hovered: string = '';
  private angle1 = 0;
  private angle2 = 0;
  private angle3 = 0;
  
  navItems: NavItem[] = [
    { icon: 'home.png', label: 'Home', route: '/', targetId: 'home' },
    { icon: 'work.png', label: 'My Projects', targetId: 'projects' },
    { icon: 'about.png', label: 'About Me', targetId: 'about' },
    { icon: 'mail.png', label: 'Contact Me', targetId: 'contact' }
  ];
  
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
        if (this.isDropdownVisible) {
          dropdown.classList.add('is-visible');
        } else {
          dropdown.classList.remove('is-visible');
        }
      }
    }, 0);
  }
  
  navigateTo(targetId: string): void {
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    this.closeDropdown();
  }
  
  contactItem: NavItem = { icon: 'mail.png', label: 'Contact Me', route: '/contact' };
  
  ngAfterViewInit(): void {
    this.startMouseAnimation();
    this.startTypewriterEffect();
  }
  
  private startMouseAnimation(): void {
    const loop = () => {
      this.animateMouseRef1();
      this.animateMouseRef2();
      this.animateMouseRef3();
      requestAnimationFrame(loop);
    };
    loop();
  }
  
  private animateMouseRef1(): void {
    this.angle1 += 0.04;
    const x = Math.cos(this.angle1) * 15;
    const y = Math.sin(this.angle1) * 25;
    this.mouseRef1.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }
  
  private animateMouseRef2(): void {
    this.angle2 += 0.03;
    const x = Math.sin(this.angle2) * 30;
    const y = Math.sin(this.angle1) * 15;
    this.mouseRef2.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }
  
  private animateMouseRef3(): void {
    this.angle3 += 0.02;
    const x = Math.cos(this.angle3) * 40;
    const y = Math.sin(this.angle1) * 15;
    this.mouseRef3.nativeElement.style.transform = `translate(${x}px, ${y}px`;
  }
  
  private startTypewriterEffect(): void {
    const text = "Hello, World!";
    const el = this.typewriterRef.nativeElement;
    const cursor = this.cursorRef.nativeElement;
    let i = 0;
    let direction = 0;
    
    const type = () => {
      if (direction === 0) return this.blink(cursor, 1, () => { direction = 1; type(); });
      el.textContent = text.slice(0, i) + (i === text.length ? " " : "");
      cursor.style.opacity = "1";
      if (direction === 1 && i === text.length)
        return this.blink(cursor, 3, () => { direction = -1; type(); });
      if (direction === -1 && i === 0)
        return setTimeout(() => { direction = 0; type(); }, 800);
      i += direction;
      setTimeout(type, 120);
    };
    
    type();
  }
  
  private blink(cursor: HTMLElement, times: number, callback: () => void): void {
    let count = 0;
    const interval = setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
      count++;
      if (count === times * 2) {
        clearInterval(interval);
        cursor.style.opacity = "1";
        callback();
      }
    }, 400);
  }
}
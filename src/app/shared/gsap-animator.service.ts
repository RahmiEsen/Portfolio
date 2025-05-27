import { Injectable, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({ providedIn: 'root' })

export class GsapAnimatorService {
  
  fadeInUp(element: ElementRef): void {
    if (!element?.nativeElement) return;
    
    gsap.from(element.nativeElement, {
      opacity: 0.2,
      y: 80,
      duration: 1.5,
      delay: 0.2,
      ease: 'power4.out'
    });
  }
  
  fadeIn(element: ElementRef): void {
    if (!element?.nativeElement) return;
    
    gsap.from(element.nativeElement, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }
}
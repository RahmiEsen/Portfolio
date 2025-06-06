import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { GsapAnimatorService } from '../../../../shared/gsap-animator.service';

@Component({
  selector: 'app-about-me',
  imports: [CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})

export class AboutMeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursorBall', { static: true }) cursorBall!: ElementRef;
  @ViewChild('container', { static: false }) container!: ElementRef;
  
  private chars: HTMLElement[] = [];
  private animationFrameId = 0;
  private radius = 120;
  private mouseMoveHandler = this.onMouseMove.bind(this);
  private lastMouseX = 0;
  private lastMouseY = 0;
  
  ngAfterViewInit(): void {
    if (window.innerWidth > 1024) {
      this.collectCharacters();
      this.addMouseListener();
    }
    
    this.animator.fadeInUp(this.container);
  }
  
  ngOnDestroy(): void {
    this.removeMouseListener();
  }
  
  lines: string[] = [];
  
  constructor(
  private translate: TranslateService,
  private animator: GsapAnimatorService) {
    this.loadTranslatedLines();
    this.translate.onLangChange.subscribe(() => this.loadTranslatedLines());
  }
  
  private loadTranslatedLines(): void {
    this.translate.get('about.lines').subscribe((translated: string[]) => {
      this.lines = translated;
      setTimeout(() => {
        this.collectCharacters();
        this.addMouseListener();
      }, 0);
    });
  }
  
  private collectCharacters(): void {
    const spans = this.container.nativeElement.querySelectorAll('.hero-char');
    this.chars = Array.from(spans);
  }
  
  private addMouseListener(): void {
    window.addEventListener('mousemove', this.mouseMoveHandler);
    this.container.nativeElement.addEventListener('mouseleave', () => {
      this.resetCharacters();
    });
  }
  
  private removeMouseListener(): void {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    cancelAnimationFrame(this.animationFrameId);
  }
  
  private onMouseMove(event: MouseEvent): void {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
    this.animateCharacters(mouseX, mouseY);
  }
  
  private animateCharacters(mouseX: number, mouseY: number): void {
    this.chars.forEach((char) => {
      this.applyForceToChar(char, mouseX, mouseY);
    });
  }
  
  private applyForceToChar(char: HTMLElement, mouseX: number, mouseY: number): void {
    const rect = char.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - mouseX;
    const dy = centerY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const proximity = 1 - Math.min(distance / this.radius, 1);
    const angle = Math.atan2(dy, dx);

    const force = proximity * 100;
    const xOffset = Math.cos(angle) * force;
    const yOffset = Math.sin(angle) * force;

    gsap.to(char, {
      x: xOffset,
      y: yOffset,
      rotationZ: xOffset * 0.5,
      scale: 1 + proximity * 0.15,
      ease: 'expo.out',
      duration: 0.8
    });
  }
  
  private resetCharacters(): void {
    this.chars.forEach((char) => {
      gsap.to(char, {
        x: 0,
        y: 0,
        rotationZ: 0,
        scale: 1,
        ease: 'expo.out',
        duration: 1.2
      });
    });
  }
}

import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],  
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})

export class HeroComponent implements AfterViewInit {
  @ViewChild('typewriter') typewriterRef!: ElementRef;
  @ViewChild('cursor') cursorRef!: ElementRef;
  @ViewChild('mouseRef1') mouseRef1!: ElementRef;
  @ViewChild('mouseRef2') mouseRef2!: ElementRef;
  @ViewChild('mouseRef3') mouseRef3!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  private angle1 = 0;
  private angle2 = 0;
  private angle3 = 0;
  
  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
  
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
    this.mouseRef3.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
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
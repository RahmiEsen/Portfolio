import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-toggle.component.html',
  styleUrl: './language-toggle.component.scss'
})

export class LanguageToggleComponent {
  language: 'en' | 'de' = 'en';
  
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('language') as 'en' | 'de';
    this.language = savedLang || 'en';
    this.translate.use(this.language);
  }
  
  toggleLanguage(): void {
    this.language = this.language === 'en' ? 'de' : 'en';
    this.translate.use(this.language);
    localStorage.setItem('language', this.language);
  }
  
  get flagStyle(): { [key: string]: string } {
    return {
      backgroundImage: `url('./assets/images/${this.language}.png')`
    };
  }
  
  get textLabel(): string {
    return this.language.toUpperCase();
  }
  
  get flagClass(): string {
    return this.language === 'en' ? 'left' : 'right';
  }
  
  get textClass(): string {
    return this.language === 'en' ? 'right' : 'left';
  }
}
import { Component } from '@angular/core';
import { LanguageToggleComponent } from '../home/sections/language-toggle/language-toggle.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [LanguageToggleComponent, TranslateModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})

export class LegalNoticeComponent {
  constructor(private router: Router) {}
  goBack(): void {
    this.router.navigate(['/']);
  }
}
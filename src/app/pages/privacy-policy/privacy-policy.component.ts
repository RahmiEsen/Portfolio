import { Component } from '@angular/core';
import { LanguageToggleComponent } from '../home/sections/language-toggle/language-toggle.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [LanguageToggleComponent, TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})

export class PrivacyPolicyComponent {
  constructor(private router: Router) {}
  goBack(): void {
    this.router.navigate(['/']);
  }
}
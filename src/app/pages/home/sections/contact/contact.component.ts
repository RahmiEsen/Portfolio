import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { GsapAnimatorService } from '../../../../shared/gsap-animator.service';
import {
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, TranslateModule],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent {
  contactData = { name: '', mail: '', message: '' };
  nameError: string = '';
  mailError: string = '';
  messageError: string = '';
  successMessage: string = '';
  isFadingOut: boolean = false;
  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild('nameInput', { static: false }) nameInputRef!: ElementRef<HTMLInputElement>;
  
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private animator: GsapAnimatorService
  ) {}
  
  ngAfterViewInit(): void {
    this.animator.fadeInUp(this.container);
    
    const shouldFocus = sessionStorage.getItem('focusContactInput');
    if (shouldFocus === 'true') {
      setTimeout(() => {
        this.nameInputRef?.nativeElement.focus();
        sessionStorage.removeItem('focusContactInput');
      }, 400);
    }
  }
  
  onSubmit(): void {
    this.validateAllFields();
    if (this.isFormValid()) this.sendToBackend();
  }
  
  validateAllFields(): void {
    this.validateName();
    this.validateMail();
    this.validateMessage();
  }
  
  isFormValid(): boolean {
    return !this.nameError && !this.mailError && !this.messageError;
  }
  
  validateName(): void {
    const name = this.contactData.name.trim();
    if (name === '') {
      this.translate.get('contact.errors.nameRequired').subscribe(t => this.nameError = t);
    } else {
      this.nameError = '';
    }
  }
  
  validateMail(): void {
    const mail = this.contactData.mail.trim();
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (mail === '') {
      this.translate.get('contact.errors.emailRequired').subscribe(t => this.mailError = t);
    } else if (!pattern.test(mail)) {
      this.translate.get('contact.errors.emailInvalid').subscribe(t => this.mailError = t);
    } else {
      this.mailError = '';
    }
  }
  
  validateMessage(): void {
    const msg = this.contactData.message.trim();
    if (msg === '') {
      this.translate.get('contact.errors.messageRequired').subscribe(t => this.messageError = t);
    } else if (msg.length < 10) {
      this.translate.get('contact.errors.messageTooShort').subscribe(t => this.messageError = t);
    } else {
      this.messageError = '';
    }
  }
  
  handleSuccess(): void {
    this.contactData = { name: '', mail: '', message: '' };
    this.translate.get('contact.success.sent').subscribe(t => this.successMessage = t);
    this.isFadingOut = false;
    this.scheduleFadeOut();
  }
  
  handleError(error: any): void {
    console.error('Send failed:', error);
    this.translate.get('contact.errors.failed').subscribe(t => this.successMessage = t);
    this.isFadingOut = false;
    this.scheduleFadeOut();
  }
  
  sendToBackend(): void {
    this.http.post('https://rahmiesen.de/sendMail.php', this.contactData).subscribe({
      next: () => this.handleSuccess(),
      error: (err) => this.handleError(err)
    });
  }
  
  scheduleFadeOut(): void {
    setTimeout(() => this.isFadingOut = true, 2600);
    setTimeout(() => this.resetSuccessMessage(), 3000);
  }
  
  resetSuccessMessage(): void {
    this.successMessage = '';
    this.isFadingOut = false;
  }
}
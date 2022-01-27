import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:string):SafeHtml {
    console.log('>> @pipe - safeHtml: ' + this.sanitized.bypassSecurityTrustHtml(value));
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}


@Component({
  selector: 'app-bypass-security',
  templateUrl: './bypass-security.component.html',
})
export class BypassSecurityComponent {
  evilSVG: string;
  safeSVG: SafeHtml;

  dangerousUrl: string;         // js code
  trustedUrl: SafeUrl;

  dangerousVideoUrl: string;    // youtube video
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    /* html <script> */
    this.evilSVG = `Template 
                      <svg width="50" height="50">                        
                        <circle cx="25" cy="25" r="20" stroke="green" stroke-width="4" fill="yellow" />
                      </svg> 
                      <b>syntax</b>`;                                          // unsafe - Angular sanitizes

    this.safeSVG = this.sanitizer.bypassSecurityTrustHtml(this.evilSVG);       // can trust its ok..

    /* run some JavaScript code  */
    // Angular sanitizes URLs when data binding, but you can explicitly tell Angular to trust this value:
    this.dangerousUrl = 'javascript:alert("Hi there")';
    this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);

    /* embed a URL */
    const id: string = 'h7eVZg3j_Lk';
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
}

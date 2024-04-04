import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ibidem-front';

  private elements: { class: string; hidden_class: string; exceptions: string[] }[] = [
      {
        class: 'search-results',
        hidden_class: 'search-results-hidden',
        exceptions: ['search-button', 'search-result']
      },
      {
        class:  'account-dropdown-back',
        hidden_class: 'account-dropdown-hidden',
        exceptions: ['']
      },
      {
        class: 'nav-links-dropdown',
        hidden_class: 'nav-links',
        exceptions: ['hamburguer', 'line']
      },
  ];

  public verifyClick(event: Event): void {
    const targetElement = (event.target as HTMLElement).getAttribute('class') || '-';
    this.elements.forEach(element => {
      const htmlElement = document.querySelector('.'+element.class);
      const isHidden = htmlElement?.getAttribute('class') !== element.hidden_class;
      const notException = element.exceptions.indexOf(targetElement);
      if (targetElement !== element.class && isHidden && (notException === -1)) {
        htmlElement?.setAttribute('class', element.hidden_class);
      }
    });
  }
}

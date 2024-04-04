import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  public transform(value: string, ...args: any[]): string {
    const names = value.split(' ');
    let initials = '';
    for (let i = 0; i < 2; i++) {
      if (names[i])
        initials = initials+names[i].charAt(0);
    }
    return initials.toUpperCase();
  }

}

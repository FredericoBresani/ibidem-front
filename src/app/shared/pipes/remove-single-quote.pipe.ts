import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSingleQuote'
})
export class RemoveSingleQuotePipe implements PipeTransform {

  public transform(value: string, ...args: unknown[]): string {
      const replaceRegex = /'/g;
      const updatedValue = value.replace(replaceRegex, '"');
      return updatedValue;
  }
}

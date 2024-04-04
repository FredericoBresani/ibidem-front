import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDirectoryName'
})
export class StringToDirectoryNamePipe implements PipeTransform {

  public transform(value: string, ...args: unknown[]): string {
      const replaceRegex = / /g;
      const updatedValue = (value.replace(replaceRegex, '-').toLowerCase());
      return updatedValue; 
  }
}

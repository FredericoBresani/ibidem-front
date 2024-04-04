import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CharacterLimiter' })
export class CharacterLimiterPipe implements PipeTransform {
  public transform(text: string, limit: number): string {
    if (text.length < limit) {
      return '('+text+')';
    }
    const limitedString = text.slice(0, limit);
    return '('+limitedString+'...';
  }

}

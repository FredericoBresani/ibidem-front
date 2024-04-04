import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'week_age'
})
export class WeekAgePipe implements PipeTransform {
  public transform(value: Date, ...args: any[]): number {
    const current = new Date();
    const createdAt = new Date(value);
    let days = 0;
    let months = 0;
    if (createdAt.getFullYear() === current.getFullYear()) {
      months = current.getMonth() - createdAt.getMonth()
    } else if (current.getFullYear() - createdAt.getFullYear() === 1){
      months = 12 - createdAt.getMonth() + current.getMonth();
    } else {
      months = 12*(current.getFullYear() - createdAt.getFullYear()) + 12 - createdAt.getMonth() + current.getMonth();
    }
    if (months === 0) {
      days = current.getDate() - createdAt.getDate()
    } else if (months === 1) {
      days = 30 - createdAt.getDate() + current.getDate();
    } else {
      days = 30*(current.getMonth() - createdAt.getMonth()) + 30 - createdAt.getDate() + current.getDate();
    }
    return Math.floor(days/7);
  }

}

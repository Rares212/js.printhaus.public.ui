import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourToTime'
})
export class HourToTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value);
    const minutes = Math.floor((value - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

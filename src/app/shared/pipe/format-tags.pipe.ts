import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTags'
})
export class FormatTagsPipe implements PipeTransform {
  transform(tags: string[]): string {
    return tags ? tags.join(', ') : '';
  }
}

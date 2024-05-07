import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsS:any[] =
    [
      {
        tagName: 'Продуктивность',
        color: '#7367F0',
        class: false
      },
      {
        tagName: 'Образование',
        color: '#28C76F',
        class: false
      },
      {
        tagName: 'Здоровье',
        color: '#FF9F43',
        class: false
      },
      {
        tagName: 'Срочно',
        color: '#EA5455',
        class: false
      },
    ]
  getTags(){
    return this.tagsS
  }
  constructor() { }
}

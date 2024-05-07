import { Component, ViewChild } from '@angular/core';
import { TagsService } from '../../services/tags/tags.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
  providers: [TagsService, ViewChild]
})
export class TagsComponent {
  filteredTasks:any[] = []
  tags:any[] = [] 
  constructor(private tagsService: TagsService){}
  ngOnInit(){
    this.tags = this.tagsService.getTags()
  }
  toggleTags(tagger:any){
    tagger.class = !tagger.class
}
}

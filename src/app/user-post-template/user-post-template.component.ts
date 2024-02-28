import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserPostModel } from '../services/models/database-objects/user-post-model';

@Component({
  selector: 'app-user-post-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-post-template.component.html',
  styleUrl: './user-post-template.component.scss'
})
export class UserPostTemplateComponent {
  @Input()
  public userPost: UserPostModel = {
    postUrl: '',
    caption: {
      username: '',
      caption: '',
      tagged: []
    },
    tagged: [],
    postDate: '',
    likes: [],
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { ReplyModel } from '../services/models/database-objects/reply-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-user-post-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-post-template.component.html',
  styleUrl: './user-post-template.component.scss'
})
export class UserPostTemplateComponent implements OnInit {
  @Input()
  public userPost: UserPostModel = {
    postId: '',
    profilePicture: '',
    username: '',
    poster: '',
    caption: '',
    likes: [],
    taggedUsers: [],
    postDate: ''
  }
  public comments: CommentModel[] = [];
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  ngOnInit() {
    this.populateComments();
  }

  populateComments() {
    let comments: CommentModel[] = this.localStorageService.getInformation('comments');
    let rawComments = comments.filter((rawComment) => rawComment.postId == this.userPost.postId)

    this.comments = rawComments;
  }
  trimNumber(input: number) {
    let number: string = input.toString();

    if (number.length < 4) {
      return input;
    } else if (number.length == 4 && number.charAt(1) == '0') {
      return `${input.toString().substring(0, 1)}k`;
    } else if (number.length == 4 && number.charAt(1) != '0') {
      return `${number.substring(0, 1)}.${number.substring(1, 2)}k`;; 
    } else if (number.length == 5 && number.charAt(2) == '0') {
      return `${input.toString().substring(0, 2)}k`;
    } else if (number.length == 5 && number.charAt(2) != '0') {
      return `${number.substring(0, 2)}.${number.substring(2, 3)}k`;; 
    } else if (number.length == 6 && number.charAt(3) == '0') {
      return `${input.toString().substring(0, 3)}k`;
    } else if (number.length == 6 && number.charAt(3) != '0') {
      return `${number.substring(0, 3)}.${number.substring(3, 4)}k`;; 
    } else if (number.length == 7 && number.charAt(1) == '0') {
      return `${input.toString().substring(0, 1)}M`;
    } else if (number.length == 7 && number.charAt(1) != '0') {
      return `${number.substring(0, 1)}.${number.substring(1, 2)}M`;; 
    } else if (number.length == 8 && number.charAt(2) == '0') {
      return `${input.toString().substring(0, 2)}M`;
    } else if (number.length == 8 && number.charAt(2) != '0') {
      return `${number.substring(0, 2)}.${number.substring(2, 3)}M`;; 
    } else {
      return input;
    }
  }
}

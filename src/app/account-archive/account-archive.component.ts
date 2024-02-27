import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { RoutingService } from '../services/routing/routing.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FollowerFollowingTemplateComponent } from '../follower-following-template/follower-following-template.component';
import { FollowerTemplateComponent } from '../follower-template/follower-template.component';
import { FollowingTemplateComponent } from '../following-template/following-template.component';
import { RequestTemplateComponent } from '../request-template/request-template.component';
import { UserPostTemplateComponent } from '../user-post-template/user-post-template.component';

@Component({
  selector: 'app-account-archive',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    UserPostTemplateComponent, 
    FollowerTemplateComponent, 
    FollowingTemplateComponent, 
    RequestTemplateComponent, 
    FollowerFollowingTemplateComponent],
  templateUrl: './account-archive.component.html',
  styleUrl: './account-archive.component.scss'
})
export class AccountArchiveComponent {
  private routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public rawMockUsersDatabase: RawAccountInformationModel[] = [
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      password: 'Captain$47',
      email: 'holden.bourg@gmail.com',
      firstName: 'Holden',
      lastName: 'Bourg',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'EnriqueLeal',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'AshlynnDang'
      ],
      following: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'EnriqueLeal'],
      requests: [],
      blocked: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'CalebHaralson'],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      archivedPosts: [],
      private: false
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'LukasGocke',
      password: 'Captain$47',
      email: 'lukas.gocke@gmail.com',
      firstName: 'Lukas',
      lastName: 'Gocke',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::HoldenBourg,CalebHaralson,EnriqueLeal::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson;;;;CalebHaralson||||caption's are amazing @HoldenBourg @EnriqueLeal||||HoldenBourg,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::HoldenBourg,CalebHaralson,EnriqueLeal::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson;;;;CalebHaralson||||caption's are amazing @HoldenBourg @EnriqueLeal||||HoldenBourg,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::HoldenBourg,CalebHaralson,EnriqueLeal::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson;;;;CalebHaralson||||caption's are amazing @HoldenBourg @EnriqueLeal||||HoldenBourg,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::HoldenBourg,CalebHaralson,EnriqueLeal::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson;;;;CalebHaralson||||caption's are amazing @HoldenBourg @EnriqueLeal||||HoldenBourg,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: false
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'CalebHaralson',
      password: 'Captain$47',
      email: 'caleb.haralson@gmail.com',
      firstName: 'Caleb',
      lastName: 'Haralson',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::LukasGocke,HoldenBourg,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::LukasGocke,HoldenBourg,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::LukasGocke,HoldenBourg,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::LukasGocke,HoldenBourg,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: false
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'EnriqueLeal',
      password: 'Captain$47',
      email: 'enrique.leal@gmail.com',
      firstName: 'Enrique',
      lastName: 'Leal',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      following: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      requests: [],
      blocked: [],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: false
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'AshlynnDang',
      password: 'Captain$47',
      email: 'ashlynn.dang@gmail.com',
      firstName: 'Ashlynn',
      lastName: 'Dang',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      requests: [],
      blocked: [],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,HoldenBourg::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: false
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'OliverQueen',
      password: 'Captain$47',
      email: 'oliver.queen@gmail.com',
      firstName: 'Oliver',
      lastName: 'Queen',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: true
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'TommyMerlin',
      password: 'Captain$47',
      email: 'tommy.merlin@gmail.com',
      firstName: 'Tommy',
      lastName: 'Merlin',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: false
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'JohnDiggle',
      password: 'Captain$47',
      email: 'john.diggle@gmail.com',
      firstName: 'John',
      lastName: 'Diggle',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      blocked: [],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: true
    },
    {
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'FelicitySmoak',
      password: 'Captain$47',
      email: 'felicity.smoak@gmail.com',
      firstName: 'Felicity',
      lastName: 'Smoak',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      posts: [
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::LukasGocke,CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson;;;;CalebHaralson||||caption's are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal`,
      ],
      postsTaggedIn: [],
      archivedPosts: [],
      private: false
    }
  ];
  
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public userAccount: AccountInformationModel = {
    profilePicture: '',
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    followers: [],
    following: [],
    requests: [],
    blocked: [],
    posts: [],
    postsTaggedIn: [],
    archivedPosts: [],
    private: false
  }

  public username: string = '';
  
  public followers: boolean = true;
  public following: boolean = false;
  public requests: boolean = false;

  public doesUserExistResult: boolean = true;
  public isCurrentUserResult: boolean = false;
  public userBlockedCurrentUserResult: boolean = false;
  public currentUserBlockedUserResult: boolean = false;
  public currentUserFollowsUserResult: boolean = false;
  public currentUserRequestedUserResult: boolean = false;
  public userFollowsCurrentUserResult: boolean = false;
  public userRequestedCurrentUserResult: boolean = false;
  public privateUserNotFollowedByCurrentUserResult: boolean = true;
  public publicUserNotFollowedByCurrentUserResult: boolean = true;


  ngOnInit() {   
    //sets the username from the url parameter
    this.username = this.activatedRoute.snapshot.params['username'];

    this.doesUserExist();

    if(this.doesUserExistResult) {
      for(let i = 0; i < this.rawMockUsersDatabase.length; i++) {
        if(this.rawMockUsersDatabase.at(i)!.username == this.username) this.userAccount = this.convertRawUserToUser(this.rawMockUsersDatabase.at(i)!);
      }
    
      this.isCurrentUser();
      this.userBlockedCurrentUser();
      this.currentUserBlockedUser();
      this.currentUserFollowsUser();
      this.currentUserRequestedUser();
      this.userFollowsCurrentUser();
      this.userRequestedCurrentUser();
      this.publicUserNotFollowedByCurrentUser();
      this.privateUserNotFollowedByCurrentUser(); 
    }

    // console.log('does user exist: ' + this.doesUserExistResult)
    // console.log('is current user: ' + this.isCurrentUserResult);
    // console.log('user blocked current user: ' + this.userBlockedCurrentUserResult);
    // console.log('user is blocked current user: ' + this.currentUserBlockedUserResult);
    // console.log('current user follows user: ' + this.currentUserFollowsUserResult);
    // console.log('current user requested user: ' + this.currentUserRequestedUserResult)
    // console.log('user follows current user: ' + this.userFollowsCurrentUserResult);
    // console.log('user requested current user: ' + this.userRequestedCurrentUserResult);
    // console.log('private user not followed current user: ' + this.privateUserNotFollowedByCurrentUserResult);
    // console.log('public user not followed current user: ' + this.publicUserNotFollowedByCurrentUserResult);

    this.sidebarCloseOnResize();

    var width = window.innerWidth;

    if(width <= 1275) { 
      const themeClass = document.querySelector('.sidebar');
      themeClass?.classList.toggle('active'); 
    }
    
    //sets active follower-type to followers
    this.localStorageService.clearInformation('follower-type');
    this.localStorageService.setInformation('follower-type', 'followers');

    if(this.currentUser.archivedPosts.length == 0) {
      const noPostsWarning = document.querySelector('.no-posts');
      noPostsWarning!.textContent = 'You have no posts archived';
    }
  }

  
  toggleFollowers() {
    var activeFollowerType = this.localStorageService.getInformation('follower-type');

    if(activeFollowerType != 'followers' && !this.followers) {
      if(this.following) {
        this.following = !this.following;
      } else if (this.requests) {
        this.requests = !this.requests;
      }

      this.followers = true;

      this.localStorageService.clearInformation('follower-type');
      this.localStorageService.setInformation('follower-type', 'followers');

      const followers = document.querySelector('.followers');
      followers?.classList.toggle('active');

      const themeClass = document.querySelector(`.${activeFollowerType}`);
      themeClass?.classList.toggle('active');
    }
  }
  toggleFollowing() {
    var activeFollowerType = this.localStorageService.getInformation('follower-type');

    if(activeFollowerType != 'following' && !this.following) {
      if(this.followers) {
        this.followers = !this.followers;
      } else if (this.requests) {
        this.requests = !this.requests;
      }

      this.following = true;

      this.localStorageService.clearInformation('follower-type');
      this.localStorageService.setInformation('follower-type', 'following');

      const followers = document.querySelector('.following');
      followers?.classList.toggle('active');

      const themeClass = document.querySelector(`.${activeFollowerType}`);
      themeClass?.classList.toggle('active');
    }
  }
  toggleRequests() {
    var activeFollowerType = this.localStorageService.getInformation('follower-type');

    if(activeFollowerType != 'requests' && !this.requests) {
      if(this.followers) {
        this.followers = !this.followers;
      } else if (this.following) {
        this.following = !this.following;
      }

      this.requests = true;

      this.localStorageService.clearInformation('follower-type');
      this.localStorageService.setInformation('follower-type', 'requests');

      const followers = document.querySelector('.requests');
      followers?.classList.toggle('active');

      const themeClass = document.querySelector(`.${activeFollowerType}`);
      themeClass?.classList.toggle('active');
    }
  }

  //closes/opens sidebar if screen width goes above/below 1275 pixels
  sidebarCloseOnResize() {  
    const themeClass = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    var width = window.innerWidth;

    if(width <= 1275 && themeClass?.classList.contains('active')) {
      themeClass?.classList.toggle('active');
      container?.classList.toggle('active');  
    }
    if(width >= 1275 && !(themeClass?.classList.contains('active'))) {
      themeClass?.classList.toggle('active');
      container?.classList.toggle('active');  
    }
  }

  onPostClicked(postUrl: string) {
    throw new Error('Method not implemented.');
  }
  onEditProfile() {
    throw new Error('Method not implemented.');
  }

  doesUserExist() {
    let userExistsInDB: boolean = false;

    for(let i = 0; i < this.rawMockUsersDatabase.length; i++) {
      if(this.rawMockUsersDatabase.at(i)!.username == this.username) userExistsInDB = true;
    }

    if(userExistsInDB == false) {
      this.doesUserExistResult = false;
      this.isCurrentUserResult = false;
      this.userBlockedCurrentUserResult = false;
      this.currentUserBlockedUserResult = false;
      this.currentUserFollowsUserResult = false;
      this.currentUserRequestedUserResult = false;
      this.userFollowsCurrentUserResult = false;
      this.userRequestedCurrentUserResult = false;
      this.privateUserNotFollowedByCurrentUserResult = false;
      this.publicUserNotFollowedByCurrentUserResult = false;
    }
  }
  //account is current user (HoldenBourg)
  isCurrentUser() {
    if(this.currentUser.username === this.userAccount.username) {
      this.isCurrentUserResult = true;
    }

    //edit profile
    //view archive (maybe in future)
  }
  //account blocked current user (LukasGocke)
  userBlockedCurrentUser() {
    //pull user from users db using username
    //loop through the users blocked accounts list for the current users username
    for(let blockedUser of this.userAccount.blocked) {
      if(blockedUser.username === this.currentUser.username) {
        this.userBlockedCurrentUserResult = true;
      } 
    }

    //no buttons
    //no posts
    //can't click followers/following
    //"this user has you blocked"
  }
  //account is blocked by current user (CalebHaralson)
  currentUserBlockedUser() {
    for(let blockedUser of this.currentUser.blocked) {
      if(blockedUser.username === this.username) {
        this.currentUserBlockedUserResult = true;
      } 
    }

    //unblock
    //no posts
    //can't click followers/following
    //"you've blocked this user"
  }
  //account is followed by current user/mutual following (EnriqueLeal)
  currentUserFollowsUser() {
    for(let followedUser of this.currentUser.following) {
      if(followedUser.username === this.username) {
        this.currentUserFollowsUserResult = true;
      } 
    }

    //unfollow
    //message
  }
  //current user requested to follow user (JohnDiggle)
  currentUserRequestedUser() {
    if(this.userAccount.private == true) {
      for(let requestedUser of this.userAccount.requests) {
        if(requestedUser.username === this.currentUser.username) {
          this.currentUserRequestedUserResult = true;
        } 
      }
    }

    //requested
  }
  //account is following current user but current user doesn't follow user (AshlynnDang)
  userFollowsCurrentUser() {
    if(this.currentUser.private == false) {
      for(let follower of this.userAccount.following) {
        if(follower.username === this.currentUser.username && this.currentUserFollowsUserResult == false) {
          this.userFollowsCurrentUserResult = true;
        } 
      }
    }


    //follow back
    //message
  }
  //account requested to follow private current user but current user doesn't follow user (AshlynnDang)
  //if user switches to public requests transfer to followers, and currentUser gets added to users following
  userRequestedCurrentUser() {
    if(this.currentUser.private == true) {
      for(let requestedUser of this.currentUser.requests) {
        if(requestedUser.username === this.userAccount.username && this.currentUserFollowsUserResult == false) {
          this.userRequestedCurrentUserResult = true;
        } 
      }
    }


    //accept request
  }
  //current user doesn't follow private user (OliverQueen)
  privateUserNotFollowedByCurrentUser() {
    if(this.isCurrentUserResult) this.privateUserNotFollowedByCurrentUserResult = false;
    if(this.userAccount.private == false) this.privateUserNotFollowedByCurrentUserResult = false;
    if(this.userBlockedCurrentUserResult || this.currentUserBlockedUserResult) this.privateUserNotFollowedByCurrentUserResult = false;
    if(this.currentUserRequestedUserResult) this.privateUserNotFollowedByCurrentUserResult = false;

    //pull user from users db using username
    if(this.userAccount.private == true) {
      for(let followedUser of this.currentUser.following) {
        if(followedUser.username === this.username) {
          this.privateUserNotFollowedByCurrentUserResult = false;
        } 
      }
    }

    //request
  }
  //current user doesn't follow public user (TommyMerlin)
  publicUserNotFollowedByCurrentUser() {
    if(this.isCurrentUserResult) this.publicUserNotFollowedByCurrentUserResult = false;
    if(this.userAccount.private == true) this.publicUserNotFollowedByCurrentUserResult = false;
    if(this.userBlockedCurrentUserResult || this.currentUserBlockedUserResult) this.publicUserNotFollowedByCurrentUserResult = false;

    //pull user from users db using username
    if(this.userAccount.private == false) {
      for(let followedUser of this.currentUser.following) {
        if(followedUser.username === this.username) {
          this.publicUserNotFollowedByCurrentUserResult = false;
        } 
      }
    }

    //follow
    //message
  }

  //converts the users db raw output into AccountInformationModel
  convertRawUserToUser(rawUser: RawAccountInformationModel) {
    let user: AccountInformationModel = {
      profilePicture: rawUser.profilePicture,
      username: rawUser.username,
      password: rawUser.password,
      email: rawUser.email,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      bio: rawUser.bio,
      followers: this.convertRawFollowerToFollower(rawUser.followers),
      following: this.convertRawFollowerToFollower(rawUser.following),
      requests: this.convertRawFollowerToFollower(rawUser.requests),
      blocked: this.convertRawFollowerToFollower(rawUser.blocked),
      posts: this.convertRawPostsToPosts(rawUser.posts),
      postsTaggedIn: this.convertRawPostsToPosts(rawUser.postsTaggedIn),
      archivedPosts: this.convertRawPostsToPosts(rawUser.archivedPosts),
      private: rawUser.private
    }

    return user;
  }
  //rawFollower: profilePicture.jpg::::HoldenBourg
  convertRawFollowerToFollower(rawFollowers: string[]) {
    let returnArray: FollowerModel[] = [];

    rawFollowers.forEach((rawFollowerString) => {
      let splitArray = rawFollowerString.split('::::');

      let follower: FollowerModel = {
        profilePicture: splitArray.at(0)!,
        username: splitArray.at(1)!
      }

      returnArray.push(follower);
    })

    return returnArray;
  }
  //rawPost: postUrl.jpg::::HoldenBourg||||Loved being there with @LukasGocke||||LukasGocke::::CalebHaralson,EnriqueLeal::::12-06-2024::::LukasGocke,EnriqueLeal,CalebHaralson::::LukasGocke||||I remember being there with @CalebHaralson||||CalebHaralson
  convertRawPostsToPosts(rawPosts: string[]) {
    let returnArray: UserPostModel[] = [];

    rawPosts.forEach((rawPostString) => {
      let splitArray = rawPostString.split('::::');

      let post: UserPostModel = {
        postUrl: splitArray.at(0)!,
        caption: this.convertRawCaptionToCaption(splitArray.at(1)!),
        tagged: splitArray.at(2)!.split(','),
        postDate: splitArray.at(3)!,
        likes: splitArray.at(4)!.split(','),
        comments: this.convertRawCommentsToComments(splitArray.at(5)!)
      }

      returnArray.push(post);
    })

    return returnArray;
  }
  //rawComments: HoldenBourg||||Looks kinda like @LukasGocke or @EnriqueLeal||||LukasGocke,EnriqueLeal;;;;LukasGocke||||I remember being there with @CalebHaralson||||CalebHaralson (individual comments are split by ;;;;)
  convertRawCommentsToComments(rawComment: string) {
    let returnArray: CommentModel[] = [];

    //comments are split by ;;;;
    let commentsArray = rawComment.split(';;;;');

    commentsArray.forEach((rawCommentString) => {
      let splitArray = rawCommentString.split('||||');

      let comment: CommentModel = {
        username: splitArray.at(0)!,
        comment: splitArray.at(1)!,
        tagged: splitArray.at(2)!.split(',')
      }

      returnArray.push(comment);
    })

    return returnArray;
  }
  //rawCaption: HoldenBourg||||Loved being there with @LukasGocke||||LukasGocke
  convertRawCaptionToCaption(rawCaption: string) {
    let splitArray = rawCaption.split('||||');

    let caption: CommentModel = {
      username: splitArray.at(0)!,
      comment: splitArray.at(1)!,
      tagged: splitArray.at(2)!.split(',')
    }

    return caption;
  }

  navigateToHome() {
    this.routingService.navigateToHome();
  }
  navigateToLogin() {
    this.routingService.navigateToLogin();
  }
  navigateToSearchMovies() {
    this.routingService.navigateToSearchMovies();
  }  
  navigateToSearchSeries() {
    this.routingService.navigateToSearchSeries();
  }
  navigateToMovies() {
    this.routingService.navigateToMovies();
  }
  navigateToShows() {
    this.routingService.navigateToShows();
  }
  navigateToSummary() {
    this.routingService.navigateToSummary();
  }
  navigateToAccountsPosts() {
    this.routingService.navigateToAccountsPosts(this.currentUser.username);
  }
  navigateToAccountsTagged() {
    this.routingService.navigateToAccountsTagged(this.currentUser.username);
  }
  navigateToAccountsArchived() {
    this.routingService.navigateToAccountsArchived(this.currentUser.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingService } from '../services/routing/routing.service';
import { RegisterModel } from '../services/models/login-register/register-model';
import { LoginModel } from '../services/models/login-register/login-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { UserPostModel } from '../services/models/database-objects/user-post-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  private routingService: RoutingService = inject(RoutingService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public warning: string = '';

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
      private: false
    }
  ];
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  registerObject: RegisterModel = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  };

  loginObject: LoginModel = {
    username: '',
    password: ''
  }; 


  ngOnInit() {
    if(this.currentUser != undefined) {
      this.loginObject = {
        username: this.currentUser.username,
        password: this.currentUser.password
      }
    }
  }

  onTerms() {
    throw new Error('Method not implemented.');
  }
  onForgotPassword() {
    throw new Error('Method not implemented.');
  }

  //Send the new users info to the database
  onSignUp() {
    if(!this.checkAllSpecialCharacters(this.registerObject.firstName)) {
      this.warning = `First name can't have special characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkNameLengthMinimum(this.registerObject.firstName)) {
      this.warning = `First name must be over 2 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkNameLengthMaximum(this.registerObject.firstName)) {
      this.warning = `First name must be below 16 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkAllSpecialCharacters(this.registerObject.lastName)) {
      this.warning = `Last name can't have special characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkNameLengthMinimum(this.registerObject.lastName)) {
      this.warning = `Last name must be above 2 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkNameLengthMaximum(this.registerObject.lastName)) {
      this.warning = `Last name must be below 16 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkEmailLengthMinimum(this.registerObject.email)) {
      this.warning = `Email must be above 6 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkEmailLengthMaximum(this.registerObject.email)) {
      this.warning = `Email must be below 30 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkEmailContainsAt(this.registerObject.email)) {
      this.warning = `Email must conatin an '@'`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkEmailContainsPeriod(this.registerObject.email)) {
      this.warning = `Email must contain a '.'`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkSpecialCharactersEmail(this.registerObject.email)) {
      this.warning = `Email can't contain certain characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;

    //need to change the unique method to search the users database
    } else if(!this.checkUniqueUsername(this.registerObject.username)) {
      this.warning = `Username already exists`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkUsernameLengthMinimum(this.registerObject.username)) {
      this.warning = `Username must be above 6 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkUsernameLengthMaximum(this.registerObject.username)) {
      this.warning = `Username must be below 14 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkAllSpecialCharacters(this.registerObject.username)) {
      this.warning = `Username can't contain special characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordLengthMinimum(this.registerObject.password)) {
      this.warning = `Password must be above 8 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordLengthMaximum(this.registerObject.password)) {
      this.warning = `Password must be below 24 characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkSpecialCharactersPassword(this.registerObject.password)) {
      this.warning = `Password can't contain certain characters`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordContainsCapitalLetter(this.registerObject.password)) {
      this.warning = `Password must contain a capital letter`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordContainsOneNumber(this.registerObject.password)) {
      this.warning = `Password must contain a number`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordContainsOneSpecialCharacter(this.registerObject.password)) {
      this.warning = `Password must contain !,@,#,$,%,^,&,*`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    }
    
    let newAccount: AccountInformationModel = {
      profilePicture: '',
      username: this.registerObject.username,
      password: this.registerObject.username,
      email: this.registerObject.username,
      firstName: this.registerObject.username,
      lastName: this.registerObject.username,
      bio: '',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      posts: [],
      postsTaggedIn: [],
      private: false
    }

    //add user to the database
    this.currentUser = newAccount;
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', this.currentUser);
  }
  
  //Login if user/password exist in database, else warning
  onLogin() {
    //run database call to see if a user with the given user/password exists
    let user: RawAccountInformationModel;

    for(let i = 0; i < this.rawMockUsersDatabase.length; i++) {
      if(this.rawMockUsersDatabase.at(i)!.username == this.loginObject.username && this.rawMockUsersDatabase.at(i)!.password == this.loginObject.password) user = this.rawMockUsersDatabase.at(i)!;
    }

    //if they exist store username for later and route to home page, else show warning
    if(user! != null) {
      this.localStorageService.clearInformation('currentUser');
      this.localStorageService.setInformation('currentUser', this.convertRawUserToUser(user));
      this.routingService.navigateToHome();

    } else {
      this.warning = 'That username or password does not exist';
      setTimeout(() => {this.warning = ``;}, 3000);
    }
  }

  checkUniqueUsername(input: string) {
    let unique: boolean = true;

    for(let i = 0; i < this.rawMockUsersDatabase.length; i++) {
      if(this.rawMockUsersDatabase.at(i)!.username == input) unique = false;
    }

    return unique;
  }
  checkAllSpecialCharacters(input: string) {
    if(input.includes(' ') ||
      input.includes('.') ||
      input.includes(',') ||
      input.includes('[') ||
      input.includes(']') ||
      input.includes('{') ||
      input.includes('}') ||
      input.includes('(') ||
      input.includes(')') ||
      input.includes('_') ||
      input.includes('-') ||
      input.includes('+') ||
      input.includes('=') ||
      input.includes('!') ||
      input.includes('@') ||
      input.includes('#') ||
      input.includes('$') ||
      input.includes('%') ||
      input.includes('^') ||
      input.includes('&') ||
      input.includes('*') ||
      input.includes(':') ||
      input.includes(';') ||
      input.includes(`'`) ||
      input.includes(`"`) ||
      input.includes('<') ||
      input.includes('>') ||
      input.includes('?') ||
      input.includes('|') ||
      input.includes('~') ||
      input.includes('/') ||
      input.includes('\\')) {
      return false;
    } else {
      return true;
    }
  }
  checkUsernameLengthMinimum(input: string) {
    if (input.length < 6) {
      return false;
    } else {
      return true;
    }
  }
  checkUsernameLengthMaximum(input: string) {
    if (input.length > 14) {
      return false;
    } else {
      return true;
    }
  }

  checkSpecialCharactersPassword(input: string) {
    if(input.includes(' ') ||
      input.includes('.') ||
      input.includes(',') ||
      input.includes('[') ||
      input.includes(']') ||
      input.includes('{') ||
      input.includes('}') ||
      input.includes('(') ||
      input.includes(')') ||
      input.includes('_') ||
      input.includes('-') ||
      input.includes('+') ||
      input.includes('=') ||
      input.includes(':') ||
      input.includes(';') ||
      input.includes(`'`) ||
      input.includes(`"`) ||
      input.includes('<') ||
      input.includes('>') ||
      input.includes('?') ||
      input.includes('|') ||
      input.includes('~') ||
      input.includes('/') ||
      input.includes('\\')) {
      return false;
    } else {
      return true;
    }
  }
  checkPasswordLengthMinimum(input: string) {
    if (input.length < 8) {
      return false;
    } else {
      return true;
    }
  }
  checkPasswordLengthMaximum(input: string) {
    if (input.length > 24) {
      return false;
    } else {
      return true;
    }
  }
  checkPasswordContainsCapitalLetter(input: string) {
    if(input.includes('A') ||
       input.includes('B') ||
       input.includes('C') ||
       input.includes('D') ||
       input.includes('E') ||
       input.includes('F') ||
       input.includes('G') ||
       input.includes('H') ||
       input.includes('I') ||
       input.includes('J') ||
       input.includes('K') ||
       input.includes('L') ||
       input.includes('M') ||
       input.includes('N') ||
       input.includes('O') ||
       input.includes('P') ||
       input.includes('Q') ||
       input.includes('R') ||
       input.includes('S') ||
       input.includes('T') ||
       input.includes('U') ||
       input.includes('V') ||
       input.includes('W') ||
       input.includes('X') ||
       input.includes('Y') ||
       input.includes('Z')) {
      return true;
    } else {
      return false;
    }
  }
  checkPasswordContainsOneNumber(input: string) {
    if(input.includes('0') ||
       input.includes('1') ||
       input.includes('2') ||
       input.includes('3') ||
       input.includes('4') ||
       input.includes('5') ||
       input.includes('6') ||
       input.includes('7') ||
       input.includes('8') ||
       input.includes('9')) {
      return true;
    } else {
      return false;
    }
  }
  checkPasswordContainsOneSpecialCharacter(input: string) {
    if(input.includes('!') ||
       input.includes('@') ||
       input.includes('#') ||
       input.includes('$') ||
       input.includes('%') ||
       input.includes('^') ||
       input.includes('&') ||
       input.includes('*')) {
      return true;
    } else {
      return false;
    }
  }

  checkNameLengthMinimum(input: string) {
    if (input.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  checkNameLengthMaximum(input: string) {
    if (input.length > 16) {
      return false;
    } else {
      return true;
    }
  }

  checkEmailContainsAt(input: string) {
    if(input.includes('@')) {
      return true;
    } else {
      return false;
    }
  }
  checkEmailContainsPeriod(input: string) {
    if(input.includes('.')) {
      return true;
    } else {
      return false;
    }
  }
  checkEmailLengthMinimum(input: string) {
    if (input.length < 6) {
      return false;
    } else {
      return true;
    }
  }
  checkEmailLengthMaximum(input: string) {
    if (input.length > 30) {
      return false;
    } else {
      return true;
    }
  }
  checkSpecialCharactersEmail(input: string) {
    if(input.includes(' ') ||
      input.includes(',') ||
      input.includes('[') ||
      input.includes(']') ||
      input.includes('{') ||
      input.includes('}') ||
      input.includes('(') ||
      input.includes(')') ||
      input.includes('_') ||
      input.includes('-') ||
      input.includes('+') ||
      input.includes('=') ||
      input.includes('!') ||
      input.includes('#') ||
      input.includes('$') ||
      input.includes('%') ||
      input.includes('^') ||
      input.includes('&') ||
      input.includes('*') ||
      input.includes(':') ||
      input.includes(';') ||
      input.includes(`'`) ||
      input.includes(`"`) ||
      input.includes('<') ||
      input.includes('>') ||
      input.includes('?') ||
      input.includes('|') ||
      input.includes('~') ||
      input.includes('/') ||
      input.includes('\\')) {
      return false;
    } else {
      return true;
    }
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
  
  //switch between login/register form
  toggleLoginRegister() {
    const themeClass = document.querySelector('.wrapper');
    themeClass?.classList.toggle('active');

    this.warning = '';
  }
}

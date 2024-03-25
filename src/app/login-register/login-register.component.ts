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
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
import { RatedSeriesModel } from '../services/models/database-objects/rated-series-model';
import { RawUserPostModel } from '../services/models/database-objects/raw-user-post-model';
import { RawCommentModel } from '../services/models/database-objects/raw-comment-model';
import { ReplyModel } from '../services/models/database-objects/reply-model';

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
  public termsChecked: boolean = false;
  public rememberMeChecked: boolean = false;

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

  public rawMockUsersDatabase: RawAccountInformationModel[] = [
    {
      username: 'HoldenBourg',
      password: 'Captain$47',
      email: 'holden.bourg@gmail.com',
      firstName: 'Holden',
      lastName: 'Bourg',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'EnriqueLeal',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'AshlynnDang',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'OliverQueen',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'FelicitySmoak',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'JohnDiggle',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'TommyMerlin',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'MalcomMerlin',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'NarutoUzumaki',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'SasukeUchiha',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'ErenJaeger'
      ],
      following: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'EnriqueLeal'],
      requests: [],
      blocked: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'EnriqueLeal',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'AshlynnDang',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'OliverQueen',
      ],
      postIds: [
        `m1b114fbe2525b`,
        `mc64a0e2ed49d7`,
        `m08c9ee59315b7`,
        `m2b7950d28e018`,
        `mb79abc0e36da9`,
        `ma480047d8bc6b`,
        `m297bcedc228ff`,
        `maf9fa739dcc3f`,
        `md20fca600e5f7`,
        `m0ea021a14bc3c`,
        `sca316788b32b3`,
        `se21b5fdcc060e`,
        `s4af79f404ab75`,
        `s9bf8d9f4ec4d5`,
        `s2ddf16037acbc`,
        `se3eaaed56bf05`,
        `s1a0a11a13629d`,
        `s4d9733f005bf1`,
        `s0c0a652725a69`,
        `sb866077598854`
      ],
      taggedPostIds: [
        `mf5b3417fd47a7`,
        `m4ee49fbf13c86`,
        `m6e1657aa83a9a`,
        `mffab7fbeb34f9`,
        `m30500143dac36`
      ],
      archivedPostIds: [
        `m77b8e730b1597`,
        `m2e872b0b5fe1c`,
        `m64de727bc325a`
      ],
      dateJoined: '2003-04-10',
      private: false
    },
    {
      username: 'LukasGocke',
      password: 'Captain$47',
      email: 'lukas.gocke@gmail.com',
      firstName: 'Lukas',
      lastName: 'Gocke',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      postIds: [`m6e1657aa83a9a`],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-11',
      private: false
    },
    {
      username: 'CalebHaralson',
      password: 'Captain$47',
      email: 'caleb.haralson@gmail.com',
      firstName: 'Caleb',
      lastName: 'Haralson',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      postIds: [`mf5b3417fd47a7`],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-12',
      private: false
    },
    {
      username: 'EnriqueLeal',
      password: 'Captain$47',
      email: 'enrique.leal@gmail.com',
      firstName: 'Enrique',
      lastName: 'Leal',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      following: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      requests: [],
      blocked: [],
      postIds: [`m4ee49fbf13c86`],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-13',
      private: false
    },
    {
      username: 'AshlynnDang',
      password: 'Captain$47',
      email: 'ashlynn.dang@gmail.com',
      firstName: 'Ashlynn',
      lastName: 'Dang',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      requests: [],
      blocked: [],
      postIds: [`mffab7fbeb34f9`],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-14',
      private: false
    },
    {
      username: 'OliverQueen',
      password: 'Captain$47',
      email: 'oliver.queen@gmail.com',
      firstName: 'Oliver',
      lastName: 'Queen',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      postIds: [`m30500143dac36`],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-15',
      private: true
    },
    {
      username: 'TommyMerlin',
      password: 'Captain$47',
      email: 'tommy.merlin@gmail.com',
      firstName: 'Tommy',
      lastName: 'Merlin',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      postIds: [],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-16',
      private: false
    },
    {
      username: 'JohnDiggle',
      password: 'Captain$47',
      email: 'john.diggle@gmail.com',
      firstName: 'John',
      lastName: 'Diggle',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: ['https://cdn-icons-png.flaticon.com/512/1144/1144760.png' + '::::' + 'HoldenBourg'],
      blocked: [],
      postIds: [],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-17',
      private: true
    },
    {
      username: 'FelicitySmoak',
      password: 'Captain$47',
      email: 'felicity.smoak@gmail.com',
      firstName: 'Felicity',
      lastName: 'Smoak',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      bio: 'I love movies so much I love movies so much I love movies so much',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      postIds: [],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: '2003-04-18',
      private: false
    }
  ];
  public mockUsersDatabase: AccountInformationModel[] = this.rawMockUsersDatabase.map((rawUser) => this.convertRawUserToUser(rawUser));

  public mockRatedMoviesDatabase: RatedMovieModel[] = [
    {
      postId: 'm1b114fbe2525b',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      title: 'Avatar',
      releaseDate: '2009-12-08',
      rated: 'PG-13',
      runTime: 162,
      genres: ['Action', 'Adventure', 'Fantasy'],
      acting: 9,
      visuals: 6,
      story: 7,
      climax: 2,
      pacing: 4,
      ending: 5,
      rating: 5.5,
      username: 'HoldenBourg',
      dateRated: '2023-12-20'
    },
    {
      postId: 'mc64a0e2ed49d7',
      poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
      title: 'Avatar: The Way of Water',
      releaseDate: '2022-12-16',
      rated: 'PG-13',
      runTime: 192,
      genres: ['Action', 'Adventure', 'Fantasy'],
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 3,
      pacing: 8,
      ending: 7,
      rating: 5.5,
      username: 'HoldenBourg',
      dateRated: '2023-12-19'
    },
    {
      postId: 'm08c9ee59315b7',
      poster: 'https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg',
      title: 'Avatar:The Last Airbender - The Legend So Far',
      releaseDate: '2005-10-18',
      rated: 'N/A',
      runTime: 0,
      genres: ['Animation'],
      acting: 9,
      visuals: 6,
      story: 3,
      climax: 7,
      pacing: 4,
      ending: 1,
      rating: 5,
      username: 'HoldenBourg',
      dateRated: '2023-12-18'
    },
    {
      postId: 'm2b7950d28e018',
      poster: 'https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg',
      title: `The King's Avatar: For the Glory`,
      releaseDate: '2019-08-16',
      rated: 'N/A',
      runTime: 98,
      genres: ['Animation', 'Action', 'Drama'],
      acting: 5,
      visuals: 6,
      story: 4,
      climax: 8,
      pacing: 3,
      ending: 2,
      rating: 4.7,
      username: 'HoldenBourg',
      dateRated: '2023-12-17'
    },
    {
      postId: 'mb79abc0e36da9',
      poster: 'https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg',
      title: 'Avatar Spirits',
      releaseDate: '2010-06-22',
      rated: 'N/A',
      runTime: 32,
      genres: ['Documentary', 'Short'],
      acting: 7,
      visuals: 5,
      story: 3,
      climax: 9,
      pacing: 5,
      ending: 1,
      rating: 5,
      username: 'HoldenBourg',
      dateRated: '2023-12-16'
    },
    {
      postId: 'ma480047d8bc6b',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAyMDIyNzA4NV5BMl5BanBnXkFtZTgwMDgxNzE0ODE@._V1_SX300.jpg',
      title: 'The Last Avatar',
      releaseDate: '2014-12-06',
      rated: 'Not Rated',
      runTime: 90,
      genres: ['Drama'],
      acting: 8,
      visuals: 6,
      story: 5,
      climax: 9,
      pacing: 3,
      ending: 7,
      rating: 6.3,
      username: 'HoldenBourg',
      dateRated: '2023-12-15'
    },
    {
      postId: 'm297bcedc228ff',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg',
      title: 'Catch Me If You Can',
      releaseDate: '2002-12-25',
      rated: 'PG-13',
      runTime: 141,
      genres: ['Biography', 'Crime', 'Drama'],
      acting: 8,
      visuals: 6,
      story: 3,
      climax: 5,
      pacing: 9,
      ending: 4,
      rating: 5.8,
      username: 'HoldenBourg',
      dateRated: '2023-12-14'
    },
    {
      postId: 'maf9fa739dcc3f',
      poster: 'https://m.media-amazon.com/images/M/MV5BODM2ODgyOGYtYzYwMC00ZTEwLTg2MmItZDI2OTdhMTdiMGFiL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
      title: 'To Catch a Thief',
      releaseDate: '2009-12-08',
      rated: 'PG',
      runTime: 106,
      genres: ['Mystery', 'Romance', 'Thriller'],
      acting: 5,
      visuals: 6,
      story: 3,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 6.3,
      username: 'HoldenBourg',
      dateRated: '2023-12-13'
    },
    {
      postId: 'md20fca600e5f7',
      poster: 'https://m.media-amazon.com/images/M/MV5BNGMyZjM5YWUtMjVmMC00NmQ2LTgyMWEtNjYzZDFkYTIyMjFhXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_SX300.jpg',
      title: 'To Catch a Killer',
      releaseDate: '2023-04-06',
      rated: 'PG-13',
      runTime: 119,
      genres: ['Action', 'Crime', 'Drama'],
      acting: 7,
      visuals: 4,
      story: 1,
      climax: 8,
      pacing: 5,
      ending: 2,
      rating: 4.5,
      username: 'HoldenBourg',
      dateRated: '2023-12-12'
    },
    {
      postId: 'm0ea021a14bc3c',
      poster: 'https://m.media-amazon.com/images/M/MV5BNTk2NjU1MjMyNV5BMl5BanBnXkFtZTcwMzc5NjE0MQ@@._V1_SX300.jpg',
      title: 'Catch and Release',
      releaseDate: '2007-01-26',
      rated: 'PG-13',
      runTime: 111,
      genres: ['Comedy', 'Drama', 'Romance'],
      acting: 8,
      visuals: 5,
      story: 3,
      climax: 7,
      pacing: 2,
      ending: 7,
      rating: 5.3,
      username: 'HoldenBourg',
      dateRated: '2023-12-11'
    },
    {
      postId: 'm77b8e730b1597',
      poster: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
      title: 'Jaws',
      releaseDate: '1975-06-20',
      rated: 'PG',
      runTime: 124,
      genres: ['Adventure', 'Mystery', 'Thriller'],
      acting: 3,
      visuals: 3,
      story: 3,
      climax: 3,
      pacing: 3,
      ending: 3,
      rating: 3,
      username: 'HoldenBourg',
      dateRated: '2023-11-11'
    },
    {
      postId: 'm2e872b0b5fe1c',
      poster: 'https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      title: 'Jaws 2',
      releaseDate: '1978-06-16',
      rated: 'PG',
      runTime: 116,
      genres: ['Adventure', 'Horror', 'Thriller'],
      acting: 4,
      visuals: 4,
      story: 4,
      climax: 4,
      pacing: 4,
      ending: 4,
      rating: 4,
      username: 'HoldenBourg',
      dateRated: '2023-10-11'
    },
    {
      postId: 'm64de727bc325a',
      poster: 'https://m.media-amazon.com/images/M/MV5BY2UxMWVlNmMtYzM0Zi00YTQzLTk2N2ItM2Y1NmNmMDk4MDFjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg',
      title: 'Jaws: The Revenge',
      releaseDate: '1987-07-17',
      rated: 'PG-13',
      runTime: 89,
      genres: ['Adventure', 'Horror', 'Thriller'],
      acting: 5,
      visuals: 5,
      story: 5,
      climax: 5,
      pacing: 5,
      ending: 5,
      rating: 5,
      username: 'HoldenBourg',
      dateRated: '2023-09-11'
    },
    {
      postId: 'mf5b3417fd47a7',
      poster: 'https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      title: 'Halloween',
      releaseDate: '1978-10-27',
      rated: 'R',
      runTime: 91,
      genres: ['Horror', 'Thriller'],
      acting: 6,
      visuals: 6,
      story: 6,
      climax: 6,
      pacing: 6,
      ending: 6,
      rating: 6,
      username: 'CalebHaralson',
      dateRated: '2023-08-11'
    },
    {
      postId: 'm4ee49fbf13c86',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjZmYjg0ODctOTIyYy00YzhkLTgyMzEtNjUyY2JiZjVmYzI2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      title: 'Halloween II',
      releaseDate: '1981-10-30',
      rated: 'R',
      runTime: 92,
      genres: ['Horror'],
      acting: 7,
      visuals: 7,
      story: 7,
      climax: 7,
      pacing: 7,
      ending: 7,
      rating: 7,
      username: 'EnriqueLeal',
      dateRated: '2023-07-11'
    },
    {
      postId: 'm6e1657aa83a9a',
      poster: 'https://m.media-amazon.com/images/M/MV5BN2YzYjI0MWYtYWUyZS00ZDQ4LWEzN2EtMDU4NDJmNjA2ZWFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      title: 'Halloween III: Season of the Witch',
      releaseDate: '1982-10-22',
      rated: 'R',
      runTime: 98,
      genres: ['Horror', 'Mystery', 'Sci-Fi'],
      acting: 8,
      visuals: 8,
      story: 8,
      climax: 8,
      pacing: 8,
      ending: 8,
      rating: 8,
      username: 'LukasGocke',
      dateRated: '2023-06-11'
    },
    {
      postId: 'mffab7fbeb34f9',
      poster: 'https://m.media-amazon.com/images/M/MV5BYWNiNjBhZjAtMzVkNi00MTJiLWI0NGQtODE2NmIyNmU2OTQwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      title: 'Halloween 4: The Return of Michael Myers',
      releaseDate: '1988-10-21',
      rated: 'R',
      runTime: 88,
      genres: ['Horror', 'Thriller'],
      acting: 9,
      visuals: 9,
      story: 9,
      climax: 9,
      pacing: 9,
      ending: 9,
      rating: 9,
      username: 'AshlynnDang',
      dateRated: '2023-05-11'
    },
    {
      postId: 'm30500143dac36',
      poster: 'https://m.media-amazon.com/images/M/MV5BM2RmMGY2Y2UtNjA1NS00NGE4LThiNzItMmE1NTk5NzI5NmE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg',
      title: 'Halloween Kills',
      releaseDate: '2021-10-15',
      rated: 'R',
      runTime: 105,
      genres: ['Action', 'Horror', 'Thriller'],
      acting: 10,
      visuals: 10,
      story: 10,
      climax: 10,
      pacing: 10,
      ending: 10,
      rating: 10,
      username: 'OliverQueen',
      dateRated: '2023-04-11'
    }
  ];
  public mockRatedSeriesDatabase: RatedSeriesModel[] = [
    {
      postId: 'sca316788b32b3',
      poster: 'https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_SX300.jpg',
      title: 'Attack on Titan',
      releaseDate: '2009-12-18',
      rated: 'TV-MA',
      seasons: 5, 
      episodes: 124,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 9,
      visuals: 6,
      story: 7,
      length: 2,
      pacing: 4,
      ending: 5,
      rating: 5.5,
      username: 'HoldenBourg',
      dateRated: '2023-12-10'
    },
    {
      postId: 'se21b5fdcc060e',
      poster: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Death Note',
      releaseDate: '2007-10-21',
      rated: 'TV-14',
      seasons: 1, 
      episodes: 37,
      genres: ['Animation', 'Crime', 'Drama'],
      acting: 4,
      visuals: 5,
      story: 6,
      length: 3,
      pacing: 8,
      ending: 7,
      rating: 5.5,
      username: 'HoldenBourg',
      dateRated: '2023-12-09'
    },
    {
      postId: 's4af79f404ab75',
      poster: 'https://m.media-amazon.com/images/M/MV5BNGM0YTk3MWEtN2JlZC00ZmZmLWIwMDktZTMxZGE5Zjc2MGExXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Hunter x Hunter',
      releaseDate: '2016-04-17',
      rated: 'TV-14',
      seasons: 3, 
      episodes: 148,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 9,
      visuals: 6,
      story: 3,
      length: 7,
      pacing: 4,
      ending: 1,
      rating: 5,
      username: 'HoldenBourg',
      dateRated: '2023-12-08'
    },
    {
      postId: 's9bf8d9f4ec4d5',
      poster: 'https://m.media-amazon.com/images/M/MV5BY2IyMDA0NGEtZjIyOS00NjU0LThlOTctODA0OTZmMDU2ZTMxXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg',
      title: 'Fire Force',
      releaseDate: '2019-07-05',
      rated: 'TV-14',
      seasons: 3, 
      episodes: 78,
      genres: ['Animation', 'Action', 'Drama'],
      acting: 5,
      visuals: 6,
      story: 4,
      length: 8,
      pacing: 3,
      ending: 2,
      rating: 4.7,
      username: 'HoldenBourg',
      dateRated: '2023-12-07'
    },
    {
      postId: 's2ddf16037acbc',
      poster: 'https://m.media-amazon.com/images/M/MV5BNzgwY2QwYjItYTM1NS00OTZmLThlMjUtNmE0Mzg0OGE0NzE3XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Berserk',
      releaseDate: '2002-05-28',
      rated: 'TV-MA',
      seasons: 1, 
      episodes: 25,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 7,
      visuals: 5,
      story: 3,
      length: 9,
      pacing: 5,
      ending: 1,
      rating: 5,
      username: 'HoldenBourg',
      dateRated: '2023-12-06'
    },
    {
      postId: 'se3eaaed56bf05',
      poster: 'https://m.media-amazon.com/images/M/MV5BYTIxNjk3YjItYmYzMC00ZTdmLTk0NGUtZmNlZTA0NWFkZDMwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Demon Slayer: Kimetsu no Yaiba',
      releaseDate: '2021-01-22',
      rated: 'TV-MA',
      seasons: 5, 
      episodes: 62,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 8,
      visuals: 6,
      story: 5,
      length: 9,
      pacing: 3,
      ending: 7,
      rating: 6.3,
      username: 'HoldenBourg',
      dateRated: '2023-12-05'
    },
    {
      postId: 's1a0a11a13629d',
      poster: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      title: 'Bleach',
      releaseDate: '2006-09-09',
      rated: 'TV-14',
      seasons: 3, 
      episodes: 396,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 8,
      visuals: 6,
      story: 3,
      length: 5,
      pacing: 9,
      ending: 4,
      rating: 5.8,
      username: 'HoldenBourg',
      dateRated: '2023-12-04'
    },
    {
      postId: 's4d9733f005bf1',
      poster: 'https://m.media-amazon.com/images/M/MV5BODFmYTUwYzMtM2M2My00NGExLWIzMDctYmRjNTNhZDc4MGI2XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
      title: 'Bleach: Thousand-Year Blood War',
      releaseDate: '2022-10-10',
      rated: 'TV-MA',
      seasons: 2, 
      episodes: 26,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 5,
      visuals: 6,
      story: 3,
      length: 7,
      pacing: 8,
      ending: 9,
      rating: 6.3,
      username: 'HoldenBourg',
      dateRated: '2023-12-03'
    },
    {
      postId: 's0c0a652725a69',
      poster: 'https://m.media-amazon.com/images/M/MV5BZGFiMWFhNDAtMzUyZS00NmQ2LTljNDYtMmZjNTc5MDUxMzViXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Naruto: Shippuden',
      releaseDate: '2009-10-28',
      rated: 'TV-PG',
      seasons: 21, 
      episodes: 503,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 7,
      visuals: 4,
      story: 1,
      length: 8,
      pacing: 5,
      ending: 2,
      rating: 4.5,
      username: 'HoldenBourg',
      dateRated: '2023-12-02'
    },
    {
      postId: 'sb866077598854',
      poster: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      title: 'Naruto',
      releaseDate: '2005-09-10',
      rated: 'TV-PG',
      seasons: 5, 
      episodes: 225,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 8,
      visuals: 5,
      story: 3,
      length: 7,
      pacing: 2,
      ending: 7,
      rating: 5.3,
      username: 'HoldenBourg',
      dateRated: '2023-12-01'
    }
  ];
  public rawMockPostsDatabase: RawUserPostModel[] = [
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-20'
    },
    {
      postId: 'mc64a0e2ed49d7',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-19'
    },
    {
      postId: 'm08c9ee59315b7',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-18'
    },
    {
      postId: 'm2b7950d28e018',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-17'
    },
    {
      postId: 'mb79abc0e36da9',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-16'
    },
    {
      postId: 'ma480047d8bc6b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAyMDIyNzA4NV5BMl5BanBnXkFtZTgwMDgxNzE0ODE@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-15'
    },
    {
      postId: 'm297bcedc228ff',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-14'
    },
    {
      postId: 'maf9fa739dcc3f',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BODM2ODgyOGYtYzYwMC00ZTEwLTg2MmItZDI2OTdhMTdiMGFiL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-13'
    },
    {
      postId: 'md20fca600e5f7',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BNGMyZjM5YWUtMjVmMC00NmQ2LTgyMWEtNjYzZDFkYTIyMjFhXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-12'
    },
    {
      postId: 'm0ea021a14bc3c',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BNTk2NjU1MjMyNV5BMl5BanBnXkFtZTcwMzc5NjE0MQ@@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-11'
    },
    {
      postId: 'sca316788b32b3',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-10'
    },
    {
      postId: 'se21b5fdcc060e',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-09'
    },
    {
      postId: 's4af79f404ab75',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BNGM0YTk3MWEtN2JlZC00ZmZmLWIwMDktZTMxZGE5Zjc2MGExXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-08'
    },
    {
      postId: 's9bf8d9f4ec4d5',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BY2IyMDA0NGEtZjIyOS00NjU0LThlOTctODA0OTZmMDU2ZTMxXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-07'
    },
    {
      postId: 's2ddf16037acbc',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BNzgwY2QwYjItYTM1NS00OTZmLThlMjUtNmE0Mzg0OGE0NzE3XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-06'
    },
    {
      postId: 'se3eaaed56bf05',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BYTIxNjk3YjItYmYzMC00ZTdmLTk0NGUtZmNlZTA0NWFkZDMwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-05'
    },
    {
      postId: 's1a0a11a13629d',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-04'
    },
    {
      postId: 's4d9733f005bf1',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BODFmYTUwYzMtM2M2My00NGExLWIzMDctYmRjNTNhZDc4MGI2XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-03'
    },
    {
      postId: 's0c0a652725a69',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BZGFiMWFhNDAtMzUyZS00NmQ2LTljNDYtMmZjNTc5MDUxMzViXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-02'
    },
    {
      postId: 'sb866077598854',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-12-01'
    },
    {
      postId: 'm77b8e730b1597',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-11-11'
    },
    {
      postId: 'm2e872b0b5fe1c',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-10-11'
    },
    {
      postId: 'm64de727bc325a',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      poster: 'https://m.media-amazon.com/images/M/MV5BY2UxMWVlNmMtYzM0Zi00YTQzLTk2N2ItM2Y1NmNmMDk4MDFjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-09-11'
    },
    {
      postId: 'mf5b3417fd47a7',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'CalebHaralson',
      poster: 'https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @EnriqueLeal`,
      likes: [
        'LukasGocke',
        'HoldenBourg',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-08-11'
    },
    {
      postId: 'm4ee49fbf13c86',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'EnriqueLeal',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjZmYjg0ODctOTIyYy00YzhkLTgyMzEtNjUyY2JiZjVmYzI2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'HoldenBourg'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg'
      ],
      postDate: '2023-07-11'
    },
    {
      postId: 'm6e1657aa83a9a',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'LukasGocke',
      poster: 'https://m.media-amazon.com/images/M/MV5BN2YzYjI0MWYtYWUyZS00ZDQ4LWEzN2EtMDU4NDJmNjA2ZWFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      caption: `caption's are amazing @EnriqueLeal @CalebHaralson`,
      likes: [
        'HoldenBourg',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-06-11'
    },
    {
      postId: 'mffab7fbeb34f9',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'AshlynnDang',
      poster: 'https://m.media-amazon.com/images/M/MV5BYWNiNjBhZjAtMzVkNi00MTJiLWI0NGQtODE2NmIyNmU2OTQwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-05-11'
    },
    {
      postId: 'm30500143dac36',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'OliverQueen',
      poster: 'https://m.media-amazon.com/images/M/MV5BM2RmMGY2Y2UtNjA1NS00NGE4LThiNzItMmE1NTk5NzI5NmE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg',
      caption: `caption's are amazing @LukasGocke @CalebHaralson`,
      likes: [
        'LukasGocke',
        'CalebHaralson',
        'EnriqueLeal'
      ],
      taggedUsers: [
        'LukasGocke',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::CalebHaralson',
        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::EnriqueLeal'
      ],
      postDate: '2023-04-11'
    }
  ];
  public rawMockCommentsDatabase: RawCommentModel[] = [
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'LukasGocke',
      comment: 'Comment number 1',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-01'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'EnriqueLeal',
      comment: 'Comment number 2',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-02'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'CalebHaralson',
      comment: 'Comment number 3',
      likes: [
        'HoldenBourg',
        'LukasGocke'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-03'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'AshlynnDang',
      comment: 'Comment number 4',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-04'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'OliverQueen',
      comment: 'Comment number 5',
      likes: [
        'HoldenBourg'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-05'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'TommyMerlin',
      comment: 'Comment number 6, Comment number 6, Comment number 6, Comment number 6, Comment number 6, Comment number 6, Comment number 6',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::NarutoUzumaki::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-06'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'FelicitySmoak',
      comment: 'Comment number 7',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-07'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'JohnDiggle',
      comment: 'Comment number 8',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-08'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'MalcomMerlin',
      comment: 'Comment number 9',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-09'
    },
    {
      postId: 'm1b114fbe2525b',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'NarutoUzumaki',
      comment: 'Comment number 10',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-10'
    },
    {
      postId: 'mc64a0e2ed49d7',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'NarutoUzumaki',
      comment: 'Comment number 10',
      likes: [
        'HoldenBourg',
        'LukasGocke',
        'CalebHaralson'
      ],
      replies: [
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::HoldenBourg::::Reply number 1::::LukasGocke,CalebHaralson::::2023-11-01`,
        `https://cdn-icons-png.flaticon.com/512/1144/1144760.png::::SasukeUchiha::::Reply number 2::::LukasGocke,CalebHaralson::::2023-11-02`
      ],
      commentDate: '2023-12-10'
    }
  ];

  ngOnInit() {
    if(this.currentUser != undefined) {
      this.loginObject = {
        username: this.currentUser.username,
        password: this.currentUser.password
      }
    }

    //if(this.localStorageService.getInformation('rememberMe') == true) {
    //  this.onLogin();
    //}

    //resets the mock databases in local storage - 
    // this.localStorageService.clearInformation('rawUsers');
    // this.localStorageService.setInformation('rawUsers', this.rawMockUsersDatabase);
    // this.localStorageService.clearInformation('ratedMovies');
    // this.localStorageService.setInformation('ratedMovies', this.mockRatedMoviesDatabase);
    // this.localStorageService.clearInformation('ratedSeries');
    // this.localStorageService.setInformation('ratedSeries', this.mockRatedSeriesDatabase);
    // this.localStorageService.clearInformation('rawPosts');
    // this.localStorageService.setInformation('rawPosts', this.rawMockPostsDatabase);
    this.localStorageService.clearInformation('rawComments');
    this.localStorageService.setInformation('rawComments', this.rawMockCommentsDatabase);
  }

  onTerms() {
    throw new Error('Method not implemented.');
  }
  onForgotPassword() {
    throw new Error('Method not implemented.');
  }

  toggleTerms() {
    this.termsChecked = !this.termsChecked;
  }
  toggleRememberMe() {
    this.rememberMeChecked = !this.rememberMeChecked;

    this.localStorageService.clearInformation('rememberMe');

    if(this.rememberMeChecked) {
      this.localStorageService.setInformation('rememberMe', true);
    } else {
      this.localStorageService.setInformation('rememberMe', false);
    }
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
    } else if (!this.termsChecked) {
      this.warning = `Must agree to terms & conditions`;
      setTimeout(() => {this.warning = ``;}, 3000);
      return;
    }
    
    let newAccount: RawAccountInformationModel = {
      profilePicture: '',
      username: this.registerObject.username,
      password: this.registerObject.password,
      email: this.registerObject.email,
      firstName: this.registerObject.firstName,
      lastName: this.registerObject.lastName,
      bio: '',
      followers: [],
      following: [],
      requests: [],
      blocked: [],
      postIds: [],
      taggedPostIds: [],
      archivedPostIds: [],
      dateJoined: new Date().toJSON().slice(0, 10), //current day date
      private: false
    }

    let users: RawAccountInformationModel[] = this.localStorageService.getInformation('users');
    users.push(newAccount);

    //adds user to the users database
    this.localStorageService.clearInformation('users');
    this.localStorageService.setInformation('users', users);

    //sets the currentUser so it'll keep the information populated for sign in
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', this.convertRawUserToUser(newAccount));

    this.routingService.navigateToLogin();
  }
  //Login if user/password exist in database, else warning
  onLogin() {
    //run database call to see if a user with the given user/password exists
    let user: AccountInformationModel;
    let rawUsers: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');

    for(let i = 0; i < rawUsers.length; i++) {
      if(rawUsers.at(i)!.username == this.loginObject.username && rawUsers.at(i)!.password == this.loginObject.password) user = this.convertRawUserToUser(rawUsers.at(i)!);
    }

    //if they exist store username for later and route to home page, else show warning
    if(user! != null) {
      this.localStorageService.clearInformation('currentUser');
      this.localStorageService.setInformation('currentUser', user);
      this.routingService.navigateToHome();

    } else {
      this.warning = 'That username or password does not exist';
      setTimeout(() => {this.warning = ``;}, 3000);
    }
  }

  //checks if username already exists in users table
  checkUniqueUsername(input: string) {
    let unique: boolean = true;
    let users: RawAccountInformationModel[] = this.localStorageService.getInformation('users');

    for(let i = 0; i < users.length; i++) {
      if(users.at(i)!.username == input) unique = false;
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
      followers: this.convertRawFollowersToFollowers(rawUser.followers),
      following: this.convertRawFollowersToFollowers(rawUser.following),
      requests: this.convertRawFollowersToFollowers(rawUser.requests),
      blocked: this.convertRawFollowersToFollowers(rawUser.blocked),
      postIds: rawUser.postIds,
      taggedPostIds: rawUser.taggedPostIds,
      archivedPostIds: rawUser.archivedPostIds,
      dateJoined: rawUser.dateJoined,
      private: rawUser.private
    }

    return user;
  }
  //rawFollower: profilePicture.jpg::::HoldenBourg
  convertRawFollowersToFollowers(rawFollowers: string[]) {
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
  //converts the posts db raw output into UserPostModel
  convertRawPostToPost(rawPost: RawUserPostModel) {
    let post: UserPostModel = {
      postId: rawPost.postId,
      profilePicture: rawPost.profilePicture,
      username: rawPost.username,
      poster: rawPost.poster,
      caption: rawPost.caption,
      likes: rawPost.likes,
      taggedUsers: this.convertRawFollowersToFollowers(rawPost.taggedUsers),
      postDate: rawPost.postDate
    }

    return post;
  }
  //converts the comments db raw output into CommentModel
  convertRawCommentToComment(rawComment: RawCommentModel) {
    let comment: CommentModel = {
      postId: rawComment.postId,
      profilePicture: rawComment.profilePicture,
      username: rawComment.username,
      comment: rawComment.comment,
      likes: rawComment.likes,
      replies: this.convertRawRepliesToReplies(rawComment.replies),
      commentDate: rawComment.commentDate
    }

    return comment;
  }
  //rawReply: profilePicture.jpg::::HoldenBourg::::I love replying::::22::::04-10-2003
  convertRawRepliesToReplies(rawReplies: string[]) {
    let returnArray: ReplyModel[] = [];

    rawReplies.forEach((rawReplyString) => {
      let splitArray = rawReplyString.split('::::');

      let reply: ReplyModel = {
        profilePicture: splitArray.at(0)!,
        username: splitArray.at(1)!,
        comment: splitArray.at(2)!,
        likes: splitArray.at(3)!.split(','),
        commentDate: splitArray.at(4)!
      }

      returnArray.push(reply);
    })

    return returnArray;
  }

  
  //switch between login/register form
  toggleLoginRegister() {
    const themeClass = document.querySelector('.wrapper');
    themeClass?.classList.toggle('active');

    this.warning = '';
  }
}
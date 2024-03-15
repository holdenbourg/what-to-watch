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
import { RatedMovieModel } from '../services/models/rated-films/rated-movie-model';
import { RatedSeriesModel } from '../services/models/rated-films/rated-series-model';
import { CaptionModel } from '../services/models/database-objects/caption-model';

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
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
      username: 'HoldenBourg',
      password: 'Captain$47',
      email: 'holden.bourg@gmail.com',
      firstName: 'Holden',
      lastName: 'Bourg',
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
      posts: [
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-20-2024::::LukasGocke,CalebHaralson,EnriqueLeal,HoldenBourg::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-19-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-18-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-17-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-16-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMjAyMDIyNzA4NV5BMl5BanBnXkFtZTgwMDgxNzE0ODE@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-15-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-14-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BODM2ODgyOGYtYzYwMC00ZTEwLTg2MmItZDI2OTdhMTdiMGFiL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-13-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BNGMyZjM5YWUtMjVmMC00NmQ2LTgyMWEtNjYzZDFkYTIyMjFhXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-12-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BNTk2NjU1MjMyNV5BMl5BanBnXkFtZTcwMzc5NjE0MQ@@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-11-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-10-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-09-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BNGM0YTk3MWEtN2JlZC00ZmZmLWIwMDktZTMxZGE5Zjc2MGExXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-08-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BY2IyMDA0NGEtZjIyOS00NjU0LThlOTctODA0OTZmMDU2ZTMxXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-07-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BNzgwY2QwYjItYTM1NS00OTZmLThlMjUtNmE0Mzg0OGE0NzE3XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BYTIxNjk3YjItYmYzMC00ZTdmLTk0NGUtZmNlZTA0NWFkZDMwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-05-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-04-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BODFmYTUwYzMtM2M2My00NGExLWIzMDctYmRjNTNhZDc4MGI2XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-03-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BZGFiMWFhNDAtMzUyZS00NmQ2LTljNDYtMmZjNTc5MDUxMzViXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-02-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`,
        `https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-01-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Series`
      ],
      postsComments: [
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`
      ],
      postsTaggedIn: [
        `https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMjZmYjg0ODctOTIyYy00YzhkLTgyMzEtNjUyY2JiZjVmYzI2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BN2YzYjI0MWYtYWUyZS00ZDQ4LWEzN2EtMDU4NDJmNjA2ZWFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BYWNiNjBhZjAtMzVkNi00MTJiLWI0NGQtODE2NmIyNmU2OTQwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BM2RmMGY2Y2UtNjA1NS00NGE4LThiNzItMmE1NTk5NzI5NmE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,EnriqueLeal::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::Movie`
      ],
      taggedComments: [
        `https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||AshlynnDang||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BMjZmYjg0ODctOTIyYy00YzhkLTgyMzEtNjUyY2JiZjVmYzI2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BMjZmYjg0ODctOTIyYy00YzhkLTgyMzEtNjUyY2JiZjVmYzI2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BN2YzYjI0MWYtYWUyZS00ZDQ4LWEzN2EtMDU4NDJmNjA2ZWFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||AshlynnDang||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BN2YzYjI0MWYtYWUyZS00ZDQ4LWEzN2EtMDU4NDJmNjA2ZWFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BYWNiNjBhZjAtMzVkNi00MTJiLWI0NGQtODE2NmIyNmU2OTQwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BYWNiNjBhZjAtMzVkNi00MTJiLWI0NGQtODE2NmIyNmU2OTQwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BM2RmMGY2Y2UtNjA1NS00NGE4LThiNzItMmE1NTk5NzI5NmE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BM2RmMGY2Y2UtNjA1NS00NGE4LThiNzItMmE1NTk5NzI5NmE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`
      ],
      archivedPosts: [
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BY2UxMWVlNmMtYzM0Zi00YTQzLTk2N2ItM2Y1NmNmMDk4MDFjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::HoldenBourg||||caption's are amazing @LukasGocke @CalebHaralson||||LukasGocke,CalebHaralson::::12-06-2024::::LukasGocke,CalebHaralson,HoldenBourg,EnriqueLeal::::LukasGocke,EnriqueLeal::::Movie`
      ],
      archivedComments: [
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BY2UxMWVlNmMtYzM0Zi00YTQzLTk2N2ItM2Y1NmNmMDk4MDFjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg||||LukasGocke||||comments are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson||||04-10-2003`,
        `https://m.media-amazon.com/images/M/MV5BY2UxMWVlNmMtYzM0Zi00YTQzLTk2N2ItM2Y1NmNmMDk4MDFjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg||||CalebHaralson||||comments are amazing @LukasGocke @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003`
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
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg::::LukasGocke||||caption's are amazing @HoldenBourg @CalebHaralson||||HoldenBourg,CalebHaralson::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg::::CalebHaralson||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg,EnriqueLeal::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BOTNkMzNlNmQtMWRlYS00MTExLWExNjgtODc0MGRjNjE1OGQwXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg::::EnriqueLeal||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg::::AshlynnDang||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg::::OliverQueen||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg::::TommyMerlin||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BN2U1MWE1NTMtYjQ2ZC00MTFmLWFmYjItODMyNGYxOTAyZmEzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg::::JohnDiggle||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
        `https://m.media-amazon.com/images/M/MV5BMzdlOGU2ODUtODk1YS00M2ZmLWEwNjEtODJhOGE5N2Y4ZTQyXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg::::FelicitySmoak||||caption's are amazing @LukasGocke @HoldenBourg||||LukasGocke,HoldenBourg::::12-06-2024::::HoldenBourg,CalebHaralson,LukasGocke,EnriqueLeal::::HoldenBourg::::Movie`,
      ],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
      private: false
    }
  ];
  public mockUsersDatabase: AccountInformationModel[] = this.rawMockUsersDatabase.map((rawUser) => this.convertRawUserToUser(rawUser));

  public mockRatedMoviesDatabase: RatedMovieModel[] = [
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      title: 'Avatar',
      releaseDate: 'December 08, 2009',
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
      dateRated: 'December 20, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
      title: 'Avatar: The Way of Water',
      releaseDate: 'December 16, 2022',
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
      dateRated: 'December 19, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg',
      title: 'Avatar:The Last Airbender - The Legend So Far',
      releaseDate: 'November 18, 2005',
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
      dateRated: 'December 18, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg',
      title: `The King's Avatar: For the Glory`,
      releaseDate: 'August 16, 2019',
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
      dateRated: 'December 17, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg',
      title: 'Avatar Spirits',
      releaseDate: 'June 22, 2010',
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
      dateRated: 'December 16, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAyMDIyNzA4NV5BMl5BanBnXkFtZTgwMDgxNzE0ODE@._V1_SX300.jpg',
      title: 'The Last Avatar',
      releaseDate: 'December 06, 2014',
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
      dateRated: 'December 15, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg',
      title: 'Catch Me If You Can',
      releaseDate: 'December 25, 2002',
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
      dateRated: 'December 14, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BODM2ODgyOGYtYzYwMC00ZTEwLTg2MmItZDI2OTdhMTdiMGFiL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
      title: 'To Catch a Thief',
      releaseDate: 'December 08, 2009',
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
      dateRated: 'December 13, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BNGMyZjM5YWUtMjVmMC00NmQ2LTgyMWEtNjYzZDFkYTIyMjFhXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_SX300.jpg',
      title: 'To Catch a Killer',
      releaseDate: 'April 06, 2023',
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
      dateRated: 'December 12, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BNTk2NjU1MjMyNV5BMl5BanBnXkFtZTcwMzc5NjE0MQ@@._V1_SX300.jpg',
      title: 'Catch and Release',
      releaseDate: 'January 26, 2007',
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
      dateRated: 'December 11, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BZjIyMjE5ZDYtMTQxNC00NTEzLTgwYzYtMmM0NDg3OWFlYWM5XkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_SX300.jpg',
      title: 'Avatar',
      releaseDate: 'December 08, 2009',
      rated: 'PG-13',
      runTime: 162,
      genres: ['Action', 'Adventure', 'Fantasy'],
      acting: 9,
      visuals: 9,
      story: 9,
      climax: 5,
      pacing: 5,
      ending: 5,
      rating: 7,
      username: 'AshlynnDang',
      dateRated: 'December 22, 2024'
    }
  ];
  public mockRatedSeriesDatabase: RatedSeriesModel[] = [
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_SX300.jpg',
      title: 'Attack on Titan',
      releaseDate: 'December 18, 2009',
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
      dateRated: 'December 10, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Death Note',
      releaseDate: 'October 21, 2007',
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
      dateRated: 'December 9, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BNGM0YTk3MWEtN2JlZC00ZmZmLWIwMDktZTMxZGE5Zjc2MGExXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Hunter x Hunter',
      releaseDate: 'April 17, 2016',
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
      dateRated: 'December 8, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BY2IyMDA0NGEtZjIyOS00NjU0LThlOTctODA0OTZmMDU2ZTMxXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg',
      title: 'Fire Force',
      releaseDate: 'July 05, 2019',
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
      dateRated: 'December 7, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BNzgwY2QwYjItYTM1NS00OTZmLThlMjUtNmE0Mzg0OGE0NzE3XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Berserk',
      releaseDate: 'May 28, 2002',
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
      dateRated: 'December 6, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BYTIxNjk3YjItYmYzMC00ZTdmLTk0NGUtZmNlZTA0NWFkZDMwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Demon Slayer: Kimetsu no Yaiba',
      releaseDate: 'January 22, 2021',
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
      dateRated: 'December 5, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      title: 'Bleach',
      releaseDate: 'September 09, 2006',
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
      dateRated: 'December 4, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BODFmYTUwYzMtM2M2My00NGExLWIzMDctYmRjNTNhZDc4MGI2XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
      title: 'Bleach: Thousand-Year Blood War',
      releaseDate: 'October 10, 2022',
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
      dateRated: 'December 3, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BZGFiMWFhNDAtMzUyZS00NmQ2LTljNDYtMmZjNTc5MDUxMzViXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      title: 'Naruto: Shippuden',
      releaseDate: 'October 28, 2009',
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
      dateRated: 'December 2, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      title: 'Naruto',
      releaseDate: 'September 10, 2005',
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
      dateRated: 'December 1, 2024'
    },
    {
      poster: 'https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_SX300.jpg',
      title: 'Attack on Titan 11',
      releaseDate: 'December 08, 2009',
      rated: 'TV-MA',
      seasons: 5, 
      episodes: 124,
      genres: ['Animation', 'Action', 'Adventure'],
      acting: 9,
      visuals: 9,
      story: 9,
      length: 5,
      pacing: 5,
      ending: 5,
      rating: 7,
      username: 'AshlynnDang',
      dateRated: 'December 21, 2024'
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
    // this.localStorageService.clearInformation('users');
    // this.localStorageService.setInformation('users', this.mockUsersDatabase);
    // this.localStorageService.clearInformation('ratedMovies');
    // this.localStorageService.setInformation('ratedMovies', this.mockRatedMoviesDatabase);
    // this.localStorageService.clearInformation('ratedSeries');
    // this.localStorageService.setInformation('ratedSeries', this.mockRatedSeriesDatabase);
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
      posts: [],
      postsComments: [],
      postsTaggedIn: [],
      taggedComments: [],
      archivedPosts: [],
      archivedComments: [],
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
    let users: AccountInformationModel[] = this.localStorageService.getInformation('users');

    for(let i = 0; i < users.length; i++) {
      if(users.at(i)!.username == this.loginObject.username && users.at(i)!.password == this.loginObject.password) user = users.at(i)!;
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
      followers: this.convertRawFollowerToFollower(rawUser.followers),
      following: this.convertRawFollowerToFollower(rawUser.following),
      requests: this.convertRawFollowerToFollower(rawUser.requests),
      blocked: this.convertRawFollowerToFollower(rawUser.blocked),
      posts: this.convertRawPostsToPosts(rawUser),
      postsTaggedIn: this.convertRawTaggedPostsToPosts(rawUser),
      archivedPosts: this.convertRawArchivedPostsToPosts(rawUser),
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
  //rawPost: postUrl.jpg::::HoldenBourg||||Loved being there with @LukasGocke||||LukasGocke::::12-06-2024::::CalebHaralson,EnriqueLeal::::LukasGocke,EnriqueLeal,CalebHaralson::::Movie
  convertRawPostsToPosts(rawUser: RawAccountInformationModel) {
    let returnArray: UserPostModel[] = [];

    rawUser.posts.forEach((rawPostString) => {
      let splitArray = rawPostString.split('::::');

      let postsComments: string[] = rawUser.postsComments.filter((comment) => comment.split('||||').at(0) == splitArray.at(0));

      let post: UserPostModel = {
        postUrl: splitArray.at(0)!,
        caption: this.convertRawCaptionToCaption(splitArray.at(1)!),
        postDate: splitArray.at(2)!,
        comments: this.convertRawCommentsToComments(postsComments),
        likes: splitArray.at(3)!.split(','),
        tagged: splitArray.at(4)!.split(','),
        filmType: splitArray.at(5)!
      }

      returnArray.push(post);
    })

    return returnArray;
  }
  convertRawTaggedPostsToPosts(rawUser: RawAccountInformationModel) {
    let returnArray: UserPostModel[] = [];

    rawUser.postsTaggedIn.forEach((rawPostString) => {
      let splitArray = rawPostString.split('::::');

      let postsComments: string[] = rawUser.taggedComments.filter((comment) => comment.split('||||').at(0) == splitArray.at(0));

      let post: UserPostModel = {
        postUrl: splitArray.at(0)!,
        caption: this.convertRawCaptionToCaption(splitArray.at(1)!),
        postDate: splitArray.at(2)!,
        comments: this.convertRawCommentsToComments(postsComments),
        likes: splitArray.at(3)!.split(','),
        tagged: splitArray.at(4)!.split(','),
        filmType: splitArray.at(5)!
      }

      returnArray.push(post);
    })

    return returnArray;
  }
  convertRawArchivedPostsToPosts(rawUser: RawAccountInformationModel) {
    let returnArray: UserPostModel[] = [];

    rawUser.archivedPosts.forEach((rawPostString) => {
      let splitArray = rawPostString.split('::::');

      let postsComments: string[] = rawUser.archivedComments.filter((comment) => comment.split('||||').at(0) == splitArray.at(0));

      let post: UserPostModel = {
        postUrl: splitArray.at(0)!,
        caption: this.convertRawCaptionToCaption(splitArray.at(1)!),
        postDate: splitArray.at(2)!,
        comments: this.convertRawCommentsToComments(postsComments),
        likes: splitArray.at(3)!.split(','),
        tagged: splitArray.at(4)!.split(','),
        filmType: splitArray.at(5)!
      }

      returnArray.push(post);
    })

    return returnArray;
  }
  //rawCaption: HoldenBourg||||Loved being there with @LukasGocke||||LukasGocke
  convertRawCaptionToCaption(rawCaption: string) {
    let splitArray = rawCaption.split('||||');

    let caption: CaptionModel = {
      username: splitArray.at(0)!,
      caption: splitArray.at(1)!,
      tagged: splitArray.at(2)!.split(',')
    }

    return caption;
  }
  //rawComments: postUrl.jpg||||HoldenBourg||||Looks kinda like @LukasGocke or @EnriqueLeal||||LukasGocke,EnriqueLeal||||04-10-2003
  convertRawCommentsToComments(rawComment: string[]) {
    let returnArray: CommentModel[] = [];

    rawComment.forEach((rawCommentString) => {
      let splitArray = rawCommentString.split('||||');

      let comment: CommentModel = {
        postUrl: splitArray.at(0)!,
        username: splitArray.at(1)!,
        comment: splitArray.at(2)!,
        tagged: splitArray.at(3)!.split(','),
        commentDate: splitArray.at(4)!
      }

      returnArray.push(comment);
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

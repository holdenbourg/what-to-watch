import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { UserInformationService } from '../services/user/user-information.service';
import { RegisterModel } from '../services/models/login-register/register-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent  implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public userInformationService: UserInformationService = inject(UserInformationService);
  public username: string = this.userInformationService.username;
  public password: string = this.userInformationService.password;

  public changeUsername: string = '';
  public changePassword: string = '';
  public confirmChangePassword: string = '';

  public usernameWarning: string = '';
  public passwordWarning: string = '';

  public registerModel: RegisterModel = {
    firstName: 'Holden',
    lastName: 'Bourg',
    email: 'holden.bourg@gmail.com',
    username: 'HoldenBourg',
    password: 'Captain$47'
  }

  public passwordHidden: boolean = true;
  public thisPassword: string = this.registerModel.password;

  
  ngOnInit() {
    this.toggleActive()
  }

  onChangeUsername() {
    //need another if to run for unique username
    if(this.username == this.changeUsername) {
      this.usernameWarning = `That already is your username`;
      setTimeout(() => {this.usernameWarning = ``;}, 3000);
      return;
    } else if(!this.checkUsernameLengthMinimum(this.changeUsername)) {
      this.usernameWarning = `Username must be above 6 characters`;
      setTimeout(() => {this.usernameWarning = ``;}, 3000);
      return;
    } else if(!this.checkUsernameLengthMaximum(this.changeUsername)) {
      this.usernameWarning = `Username must be below 14 characters`;
      setTimeout(() => {this.usernameWarning = ``;}, 3000);
      return;
    } else if(!this.checkAllSpecialCharacters(this.changeUsername)) {
      this.usernameWarning = `Username can't contain special characters`;
      setTimeout(() => {this.usernameWarning = ``;}, 3000);
      return;
    }

    //if username passes all the checks change the username in the accounts db
    //then change all movies rated by the old username to the new one
  }
  onChangePassword() {
    if(this.password == this.changePassword) {
      this.passwordWarning = `That already is your password`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    } else if(this.changePassword != this.confirmChangePassword) {
      this.passwordWarning = `These two passwords aren't equal`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordLengthMinimum(this.changePassword)) {
      this.passwordWarning = `Password must be above 8 characters`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordLengthMaximum(this.changePassword)) {
      this.passwordWarning = `Password must be below 24 characters`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    } else if(!this.checkSpecialCharactersPassword(this.changePassword)) {
      this.passwordWarning = `Password can't contain certain characters`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordContainsCapitalLetter(this.changePassword)) {
      this.passwordWarning = `Password must contain a capital letter`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordContainsOneNumber(this.changePassword)) {
      this.passwordWarning = `Password must contain a number`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    } else if(!this.checkPasswordContainsOneSpecialCharacter(this.changePassword)) {
      this.passwordWarning = `Password must contain !,@,#,$,%,^,&,*`;
      setTimeout(() => {this.passwordWarning = ``;}, 3000);
      return;
    }

    //if password passes all the checks change the users password in teh accounts db
  }

  hidePassword(password: string) {
    let returnString: string = '';

    for(let i = 0; i < password.length; i++) {
      returnString = returnString + '*';
    }

    return returnString;
  }
  changePasswordVisibility() {
    this.thisPassword = this.registerModel.password;
    this.passwordHidden = !this.passwordHidden;
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

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
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
    this.routingService.navigateToMovies(this.username);
  }
  navigateToShows() {
    this.routingService.navigateToShows(this.username);
  }
  navigateToNews() {
    this.routingService.navigateToNews();
  }
  navigateToSummary() {
    this.routingService.navigateToSummary(this.username);
  }
  navigateToAccount() {
    this.routingService.navigateToAccount(this.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }
}

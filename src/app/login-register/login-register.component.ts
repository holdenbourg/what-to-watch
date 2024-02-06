import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingService } from '../services/routing/routing.service';
import { UserInformationService } from '../services/user/user-information.service';
import { RegisterModel } from '../services/models/login-register/register-model';
import { LoginModel } from '../services/models/login-register/login-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  private routingService: RoutingService = inject(RoutingService);
  private userInformationService: UserInformationService = inject(UserInformationService);

  public warning: string = '';
  signupUsers: any[] = [];

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
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
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

    //need another if to run for unique username
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
    
    //add user to the database
    this.signupUsers.push(this.registerObject);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
  }
  //Login if user/password exist in database, else warning
  onLogin() {
    //run database call to see if a user with the given user/password exists
    const userExists = this.signupUsers
    .find(user => user.userName == this.loginObject.username && user.password == this.loginObject.password);

    //if they exist store username for later and route to home page, else show warning
    if(userExists != undefined) {
      this.userInformationService.username = this.loginObject.username;
      this.userInformationService.password = this.loginObject.password;
      this.routingService.navigateToHome();
    } else {
      this.warning = 'That username or password does not exist';
      setTimeout(() => {this.warning = ``;}, 3000);
    }
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

  //switch between login/register form
  toggleLoginRegister() {
    const themeClass = document.querySelector('.wrapper');
    themeClass?.classList.toggle('active');

    this.warning = '';
  }
}

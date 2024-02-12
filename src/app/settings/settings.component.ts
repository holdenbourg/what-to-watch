import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { FormsModule } from '@angular/forms';
import { AccountInformationModel } from '../services/models/account-information-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public username: string = this.localStorageService.getInformation('currentUser').username;

  //pull all this info from the db using username on page initialization
  public accountInformation: AccountInformationModel = {
    //username: this.userInformationService.username,
    username: 'HoldenBourg',
    password: 'Captain$47',
    email: 'holden.bourg@gmail.com',
    firstName: 'Holden',
    lastName: 'Bourg',
    bio: '',
    followers: [],
    following: [],
    requests: [],
    blocked: [],
    private: false
  }

  public changeUsername: string = this.accountInformation.username;
  public changePassword: string = this.accountInformation.password;
  public confirmChangePassword: string = this.accountInformation.password;
  public changeFirstName: string = this.accountInformation.firstName;
  public changeLastName: string = this.accountInformation.lastName;
  public changeEmail: string = this.accountInformation.email;
  public changeBio: string = this.accountInformation.bio;

  public usernameWarning: string = '';
  public passwordWarning: string = '';
  public firstNameWarning: string = '';
  public lastNameWarning: string = '';
  public emailWarning: string = '';
  public bioWarning: string = '';

  public usernameSpecialCharactersString: string = `* . , [ ] { } ( ) < > _ - + = ! @ # $ % ^ & : ; ' " ? | ~ / \\`;
  public passwordSpecialCharactersString: string = `! @ # $ % ^ & *`;

  
  ngOnInit() {
    this.toggleActive()

    this.onChangeUsername();
    this.onChangePassword();
    this.onChangeEmail();
    this.onChangeFirstName();
    this.onChangeLastName();
    this.onChangeBio();
  }

  onChangeUsername() {
    //check database to see if another user with that name exists
    if(this.accountInformation.username == this.changeUsername) {
      const usersUnique = document.querySelector('.users-unique');

      if(!usersUnique?.classList.contains('red')) {
        usersUnique?.classList.toggle('white');
        usersUnique?.classList.toggle('red');
      }

    } else {
      const usersUnique = document.querySelector('.users-unique');

      if(!usersUnique?.classList.contains('white')) {
        usersUnique?.classList.toggle('red');
        usersUnique?.classList.toggle('white');
      }
    }

    if(!this.checkUsernameLengthMinimum(this.changeUsername) || !this.checkUsernameLengthMaximum(this.changeUsername)) {
      const userCharacterMinimum = document.querySelector('.user-character-min-max');

      if(!userCharacterMinimum?.classList.contains('red')) {
        userCharacterMinimum?.classList.toggle('white');
        userCharacterMinimum?.classList.toggle('red');
      }

    } else {
      const userCharacterMinimum = document.querySelector('.user-character-min-max');

      if(!userCharacterMinimum?.classList.contains('white')) {
        userCharacterMinimum?.classList.toggle('red');
        userCharacterMinimum?.classList.toggle('white');
      }
    }

    if(this.accountInformation.username == this.changeUsername) {
      const usersEqual = document.querySelector('.users-equal');

      if(!usersEqual?.classList.contains('red')) {
        usersEqual?.classList.toggle('white');
        usersEqual?.classList.toggle('red');
      }

    } else {
      const usersEqual = document.querySelector('.users-equal');

      if(!usersEqual?.classList.contains('white')) {
        usersEqual?.classList.toggle('red');
        usersEqual?.classList.toggle('white');
      }
    }

    if(!this.checkAllSpecialCharacters(this.changeUsername)) {
      const userSpecialCharacters = document.querySelector('.user-special-characters');
      const userSpecialCharacter = document.querySelector('.user-special-character');


      if(!userSpecialCharacters?.classList.contains('red')) {
        userSpecialCharacters?.classList.toggle('white');
        userSpecialCharacters?.classList.toggle('red');
        userSpecialCharacter?.classList.toggle('white');
        userSpecialCharacter?.classList.toggle('red');
      }

    } else {
      const userSpecialCharacters = document.querySelector('.user-special-characters');
      const userSpecialCharacter = document.querySelector('.user-special-character');

      if(!userSpecialCharacters?.classList.contains('white')) {
        userSpecialCharacters?.classList.toggle('red');
        userSpecialCharacters?.classList.toggle('white');
        userSpecialCharacter?.classList.toggle('red');
        userSpecialCharacter?.classList.toggle('white');
      }
    }
  }
  onChangeUsernameSubmit() {
    const usersUnique = document.querySelector('.users-unique');
    const usersEqual = document.querySelector('.users-equal');
    const userCharacterMinMax = document.querySelector('.user-character-min-max');
    const userSpecialCharacters = document.querySelector('.user-special-characters');
    const userSpecialCharacter = document.querySelector('.user-special-character');

    if(usersUnique?.classList.contains('white') &&
       usersEqual?.classList.contains('white') &&
       userCharacterMinMax?.classList.contains('white') &&
       userSpecialCharacters?.classList.contains('white') &&
       userSpecialCharacter?.classList.contains('white')) {
      console.log('username changed');

      //if username passes all the checks change the username in the accounts db
      //then change all movies rated by the old username to the new one
    }
  }

  onChangePassword() {
    if(!this.checkPasswordLengthMinimum(this.changePassword) || !this.checkPasswordLengthMaximum(this.changePassword)) {
      const passwordCharacterMinMax = document.querySelector('.password-character-min-max');

      if(!passwordCharacterMinMax?.classList.contains('red')) {
        passwordCharacterMinMax?.classList.toggle('white');
        passwordCharacterMinMax?.classList.toggle('red');
      }

    } else {
      const passwordCharacterMinMax = document.querySelector('.password-character-min-max');

      if(!passwordCharacterMinMax?.classList.contains('white')) {
        passwordCharacterMinMax?.classList.toggle('red');
        passwordCharacterMinMax?.classList.toggle('white');
      }
    }

    if(this.accountInformation.password == this.changePassword || this.accountInformation.password == this.confirmChangePassword) {
      const passwordsEqual = document.querySelector('.passwords-equal');

      if(!passwordsEqual?.classList.contains('red')) {
        passwordsEqual?.classList.toggle('white');
        passwordsEqual?.classList.toggle('red');
      }

    } else {
      const passwordsEqual = document.querySelector('.passwords-equal');

      if(!passwordsEqual?.classList.contains('white')) {
        passwordsEqual?.classList.toggle('red');
        passwordsEqual?.classList.toggle('white');
      }
    }
    
    if(this.changePassword != this.confirmChangePassword) {
      const passwordConfirmEqual = document.querySelector('.password-confirm-equal');

      if(!passwordConfirmEqual?.classList.contains('red')) {
        passwordConfirmEqual?.classList.toggle('white');
        passwordConfirmEqual?.classList.toggle('red');
      }

    } else {
      const passwordConfirmEqual = document.querySelector('.password-confirm-equal');

      if(!passwordConfirmEqual?.classList.contains('white')) {
        passwordConfirmEqual?.classList.toggle('red');
        passwordConfirmEqual?.classList.toggle('white');
      }
    }

    if(!this.checkPasswordContainsCapitalLetter(this.changePassword) || !this.checkPasswordContainsOneNumber(this.changePassword)) {
      const passwordCapitalNumber = document.querySelector('.password-capital-number');

      if(!passwordCapitalNumber?.classList.contains('red')) {
        passwordCapitalNumber?.classList.toggle('white');
        passwordCapitalNumber?.classList.toggle('red');
      }

    } else {
      const passwordCapitalNumber = document.querySelector('.password-capital-number');

      if(!passwordCapitalNumber?.classList.contains('white')) {
        passwordCapitalNumber?.classList.toggle('red');
        passwordCapitalNumber?.classList.toggle('white');
      }
    }

    if(!this.checkPasswordContainsOneSpecialCharacter(this.changePassword) || !this.checkSpecialCharactersPassword(this.changePassword)) {
      const passwordSpecialCharacter = document.querySelector('.password-special-character');

      if(!passwordSpecialCharacter?.classList.contains('red')) {
        passwordSpecialCharacter?.classList.toggle('white');
        passwordSpecialCharacter?.classList.toggle('red');
      }

    } else {
      const passwordSpecialCharacter = document.querySelector('.password-special-character');

      if(!passwordSpecialCharacter?.classList.contains('white')) {
        passwordSpecialCharacter?.classList.toggle('red');
        passwordSpecialCharacter?.classList.toggle('white');
      }
    }

    //if password passes all the checks change the users password in the accounts db
  }
  onChangePasswordSubmit() {
    const passwordCharacterMinMax = document.querySelector('.password-character-min-max');
    const passwordsEqual = document.querySelector('.passwords-equal');
    const passwordConfirmEqual = document.querySelector('.password-confirm-equal');
    const passwordCapitalNumber = document.querySelector('.password-capital-number');
    const passwordSpecialCharacter = document.querySelector('.password-special-character');

    if(passwordCharacterMinMax?.classList.contains('white') &&
       passwordsEqual?.classList.contains('white') &&
       passwordConfirmEqual?.classList.contains('white') &&
       passwordCapitalNumber?.classList.contains('white') &&
       passwordSpecialCharacter?.classList.contains('white')) {
      console.log('password changed');

      //if password passes all the checks change the username in the accounts db
    }
  }

  onChangeEmail() {
    if(!this.checkEmailLengthMinimum(this.changeEmail) || !this.checkEmailLengthMaximum(this.changeEmail)) {
      const emailCharacterMinMax = document.querySelector('.email-character-min-max');

      if(!emailCharacterMinMax?.classList.contains('red')) {
        emailCharacterMinMax?.classList.toggle('white');
        emailCharacterMinMax?.classList.toggle('red');
      }

    } else {
      const emailCharacterMinMax = document.querySelector('.email-character-min-max');

      if(!emailCharacterMinMax?.classList.contains('white')) {
        emailCharacterMinMax?.classList.toggle('red');
        emailCharacterMinMax?.classList.toggle('white');
      }
    }

    if(this.accountInformation.email == this.changeEmail) {
      const emailEqual = document.querySelector('.email-equal');

      if(!emailEqual?.classList.contains('red')) {
        emailEqual?.classList.toggle('white');
        emailEqual?.classList.toggle('red');
      }

    } else {
      const emailEqual = document.querySelector('.email-equal');

      if(!emailEqual?.classList.contains('white')) {
        emailEqual?.classList.toggle('red');
        emailEqual?.classList.toggle('white');
      }
    }
    
    if(!this.checkEmailContainsAt(this.changeEmail) || !this.checkEmailContainsPeriod(this.changeEmail)) {
      const emailAtPeriod = document.querySelector('.email-at-period');

      if(!emailAtPeriod?.classList.contains('red')) {
        emailAtPeriod?.classList.toggle('white');
        emailAtPeriod?.classList.toggle('red');
      }

    } else {
      const emailAtPeriod = document.querySelector('.email-at-period');

      if(!emailAtPeriod?.classList.contains('white')) {
        emailAtPeriod?.classList.toggle('red');
        emailAtPeriod?.classList.toggle('white');
      }
    }

    if(!this.checkSpecialCharactersEmail(this.changeEmail)) {
      const emailSpecialCharacters = document.querySelector('.email-special-characters');
      const emailSpecialCharacter = document.querySelector('.email-special-character');

      if(!emailSpecialCharacters?.classList.contains('red')) {
        emailSpecialCharacters?.classList.toggle('white');
        emailSpecialCharacters?.classList.toggle('red');
        emailSpecialCharacter?.classList.toggle('white');
        emailSpecialCharacter?.classList.toggle('red');
      }

    } else {
      const emailSpecialCharacters = document.querySelector('.password-capital-number');
      const emailSpecialCharacter = document.querySelector('.email-special-character');

      if(!emailSpecialCharacters?.classList.contains('white')) {
        emailSpecialCharacters?.classList.toggle('red');
        emailSpecialCharacters?.classList.toggle('white');
        emailSpecialCharacter?.classList.toggle('white');
        emailSpecialCharacter?.classList.toggle('red');
      }
    }

  }
  onChangeEmailSubmit() {
    const emailCharacterMinMax = document.querySelector('.email-character-min-max');
    const emailEqual = document.querySelector('.email-equal');
    const emailAtPeriod = document.querySelector('.email-at-period');
    const emailSpecialCharacters = document.querySelector('.email-special-characters');
    const emailSpecialCharacter = document.querySelector('.email-special-character');

    if(emailCharacterMinMax?.classList.contains('white') &&
       emailEqual?.classList.contains('white') &&
       emailAtPeriod?.classList.contains('white') &&
       emailSpecialCharacters?.classList.contains('white') &&
       emailSpecialCharacter?.classList.contains('white')) {
      console.log('email changed');

      //if email passes all the checks change the username in the accounts db
    }
  }

  onChangeFirstName() {
    if(!this.checkNameLengthMinimum(this.changeFirstName) || !this.checkNameLengthMaximum(this.changeFirstName)) {
      const firstCharacterMin = document.querySelector('.first-character-min-max');

      if(!firstCharacterMin?.classList.contains('red')) {
        firstCharacterMin?.classList.toggle('white');
        firstCharacterMin?.classList.toggle('red');
      }

    } else {
      const firstCharacterMin = document.querySelector('.first-character-min-max');

      if(!firstCharacterMin?.classList.contains('white')) {
        firstCharacterMin?.classList.toggle('red');
        firstCharacterMin?.classList.toggle('white');
      }
    }

    if(this.accountInformation.firstName == this.changeFirstName) {
      const firstEqual = document.querySelector('.first-equal');

      if(!firstEqual?.classList.contains('red')) {
        firstEqual?.classList.toggle('white');
        firstEqual?.classList.toggle('red');
      }

    } else {
      const firstEqual = document.querySelector('.first-equal');

      if(!firstEqual?.classList.contains('white')) {
        firstEqual?.classList.toggle('red');
        firstEqual?.classList.toggle('white');
      }
    }

    if(!this.checkAllSpecialCharacters(this.changeFirstName)) {
      const firstSpecialCharacters = document.querySelector('.first-special-characters');
      const firstSpecialCharacter = document.querySelector('.first-special-character');


      if(!firstSpecialCharacters?.classList.contains('red')) {
        firstSpecialCharacters?.classList.toggle('white');
        firstSpecialCharacters?.classList.toggle('red');
        firstSpecialCharacter?.classList.toggle('white');
        firstSpecialCharacter?.classList.toggle('red');
      }

    } else {
      const firstSpecialCharacters = document.querySelector('.first-special-characters');
      const firstSpecialCharacter = document.querySelector('.first-special-character');

      if(!firstSpecialCharacters?.classList.contains('white')) {
        firstSpecialCharacters?.classList.toggle('red');
        firstSpecialCharacters?.classList.toggle('white');
        firstSpecialCharacter?.classList.toggle('red');
        firstSpecialCharacter?.classList.toggle('white');
      }
    }
  }
  onChangeFirstNameSubmit() {
    const firstCharacterMinMax = document.querySelector('.first-character-min-max');
    const firstEqual = document.querySelector('.first-equal');
    const firstSpecialCharacters = document.querySelector('.first-special-characters');
    const firstSpecialCharacter = document.querySelector('.first-special-character');

    if(firstCharacterMinMax?.classList.contains('white') &&
       firstEqual?.classList.contains('white') &&
       firstSpecialCharacters?.classList.contains('white') &&
       firstSpecialCharacter?.classList.contains('white')) {
      console.log('first name changed');

      //if first name passes all teh checks change in users db
    }
  }

  onChangeLastName() {
    if(!this.checkNameLengthMinimum(this.changeLastName) || !this.checkNameLengthMaximum(this.changeLastName)) {
      const lastCharacterMin = document.querySelector('.last-character-min-max');

      if(!lastCharacterMin?.classList.contains('red')) {
        lastCharacterMin?.classList.toggle('white');
        lastCharacterMin?.classList.toggle('red');
      }

    } else {
      const lastCharacterMin = document.querySelector('.last-character-min-max');

      if(!lastCharacterMin?.classList.contains('white')) {
        lastCharacterMin?.classList.toggle('red');
        lastCharacterMin?.classList.toggle('white');
      }
    }

    if(this.accountInformation.lastName == this.changeLastName) {
      const lastEqual = document.querySelector('.last-equal');

      if(!lastEqual?.classList.contains('red')) {
        lastEqual?.classList.toggle('white');
        lastEqual?.classList.toggle('red');
      }

    } else {
      const lastEqual = document.querySelector('.last-equal');

      if(!lastEqual?.classList.contains('white')) {
        lastEqual?.classList.toggle('red');
        lastEqual?.classList.toggle('white');
      }
    }

    if(!this.checkAllSpecialCharacters(this.changeLastName)) {
      const lastSpecialCharacters = document.querySelector('.last-special-characters');
      const lastSpecialCharacter = document.querySelector('.last-special-character');


      if(!lastSpecialCharacters?.classList.contains('red')) {
        lastSpecialCharacters?.classList.toggle('white');
        lastSpecialCharacters?.classList.toggle('red');
        lastSpecialCharacter?.classList.toggle('white');
        lastSpecialCharacter?.classList.toggle('red');
      }

    } else {
      const lastSpecialCharacters = document.querySelector('.last-special-characters');
      const lastSpecialCharacter = document.querySelector('.last-special-character');

      if(!lastSpecialCharacters?.classList.contains('white')) {
        lastSpecialCharacters?.classList.toggle('red');
        lastSpecialCharacters?.classList.toggle('white');
        lastSpecialCharacter?.classList.toggle('red');
        lastSpecialCharacter?.classList.toggle('white');
      }
    }
  }
  onChangeLastNameSubmit() {
    const lastCharacterMinMax = document.querySelector('.last-character-min-max');
    const lastEqual = document.querySelector('.last-equal');
    const lastSpecialCharacters = document.querySelector('.last-special-characters');
    const lastSpecialCharacter = document.querySelector('.last-special-character');

    if(lastCharacterMinMax?.classList.contains('white') &&
       lastEqual?.classList.contains('white') &&
       lastSpecialCharacters?.classList.contains('white') &&
       lastSpecialCharacter?.classList.contains('white')) {
      console.log('last name changed');

      //if last name passes all teh checks change in users db
    }
  }

  onChangeBio() {
    if(!this.checkBioLengthMaximum(this.changeBio)) {
      const bioCharacterMax = document.querySelector('.bio-character-max');

      if(!bioCharacterMax?.classList.contains('red')) {
        bioCharacterMax?.classList.toggle('white');
        bioCharacterMax?.classList.toggle('red');
      }

    } else {
      const bioCharacterMax = document.querySelector('.bio-character-max');

      if(!bioCharacterMax?.classList.contains('white')) {
        bioCharacterMax?.classList.toggle('red');
        bioCharacterMax?.classList.toggle('white');
      }
    }

    if(this.accountInformation.bio == this.changeBio) {
      const bioEqual = document.querySelector('.bio-equal');

      if(!bioEqual?.classList.contains('red')) {
        bioEqual?.classList.toggle('white');
        bioEqual?.classList.toggle('red');
      }

    } else {
      const bioEqual = document.querySelector('.bio-equal');

      if(!bioEqual?.classList.contains('white')) {
        bioEqual?.classList.toggle('red');
        bioEqual?.classList.toggle('white');
      }
    }
  }
  onChangeBioSubmit() {
    const bioCharacterMax = document.querySelector('.bio-character-max');
    const bioEqual = document.querySelector('.bio-equal');
    
    if(bioCharacterMax?.classList.contains('white') && bioEqual?.classList.contains('white')) {
      console.log('bio changed');

      //if bio passes the checks change it in the accounts db
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

  checkBioLengthMinimum(input: string) {
    if (input.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  checkBioLengthMaximum(input: string) {
    if (input.length > 150) {
      return false;
    } else {
      return true;
    }
  }

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const accountInfo = document.querySelector('.account-info-icon');
    accountInfo?.classList.toggle('active');
    const privacy = document.querySelector('.privacy-icon');
    privacy?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
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
  navigateToAccount() {
    this.routingService.navigateToAccount();
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }
  navigateToPrivacy() {
    this.routingService.navigateToPrivacy();
  }
}

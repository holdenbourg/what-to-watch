import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent  implements OnInit {
showFollowing() {
throw new Error('Method not implemented.');
}
showFollowers() {
throw new Error('Method not implemented.');
}
  private routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public username: string = '';

  public isCurrentUserResult: boolean = false;
  public userBlockedCurrentUserResult: boolean = false;
  public currentUserBlockedUserResult: boolean = false;
  public currentUserFollowsUserResult: boolean = false;
  public userFollowsCurrentUserPublicResult: boolean = false;
  public userRequestedCurrentUserResult: boolean = false;
  public privateUserNotFollowedByCurrentUserResult: boolean = true;
  public publicUserNotFollowedByCurrentUserResult: boolean = true;


  ngOnInit() {
    //sets the username from the url parameter
    this.username = this.activatedRoute.snapshot.params['username'];

    this.toggleActive();

    this.isCurrentUser();
    this.userBlockedCurrentUser();
    this.currentUserBlockedUser();
    this.currentUserFollowsUser();
    this.userFollowsCurrentUserPublic();
    this.userRequestedCurrentUser();
    this.publicUserNotFollowedByCurrentUser();
    this.privateUserNotFollowedByCurrentUser();    
  }

  //account is current user
  isCurrentUser() {
    if(this.currentUser.username === this.username) {
      this.isCurrentUserResult = true;
    }

    //edit profile
    //view archive (maybe in future)
  }
  //account blocked current user
  userBlockedCurrentUser() {
    //pull user from users db using username
    //loop through the users blocked accounts list for the current users username
    /*for(let blockedUser of this.users.blocked) {
      if(blockedUser.username === this.currentUser.username) {
        this.userBlockedCurrentUserResult = true;
      } 
    }*/

    //no buttons
    //no posts
    //can't click followers/following
    //"this user has you blocked"
  }
  //account is blocked by current user
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
  //account is followed by current user/mutual following
  currentUserFollowsUser() {
    for(let followedUser of this.currentUser.following) {
      if(followedUser.username === this.username) {
        this.currentUserFollowsUserResult = true;
      } 
    }

    //unfollow
    //message
  }

  //account is following public current user
  userFollowsCurrentUserPublic() {
    if(this.currentUser.private == false) {
      for(let follower of this.currentUser.followers) {
        if(follower.username === this.username) {
          this.userFollowsCurrentUserPublicResult = true;
        } 
      }
    }


    //follow back
    //message
  }
  //account requested to follow private current user
  userRequestedCurrentUser() {
    if(this.currentUser.private == true) {
      for(let requestedUser of this.currentUser.requests) {
        if(requestedUser.username === this.currentUser.username) {
          this.userRequestedCurrentUserResult = true;
        } 
      }
    }


    //accept request
  }
  //current user doesn't follow private user
  privateUserNotFollowedByCurrentUser() {
    //pull user from users db using username
    /*if(user.private == true) {
      for(let followedUser of this.currentUser.following) {
        if(followedUser.username === this.username) {
          this.privateUserNotFollowedByCurrentUserResult = false;
        } 
      }
    }*/ 

    //request
  }
  //current user doesn't follow public user
  publicUserNotFollowedByCurrentUser() {
    //pull user from users db using username
    /*if(user.private == false) {
      for(let followedUser of this.currentUser.following) {
        if(followedUser.username === this.username) {
          this.publicUserNotFollowedByCurrentUserResult = false;
        } 
      }
    }*/

    //follow
    //message
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
    this.routingService.navigateToAccount(this.currentUser.username);
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

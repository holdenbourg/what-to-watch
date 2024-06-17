import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { RatedSeriesModel } from '../services/models/database-objects/rated-series-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RoutingService } from '../services/routing/routing.service';
import { CombinedFilmApiResponseModel } from '../services/models/combined-film-api-response';

@Component({
  selector: 'app-rate-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-series.component.html',
  styleUrl: './rate-series.component.scss'
})
export class RateSeriesComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private routingService: RoutingService = inject(RoutingService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  public imdbId: string = '';
  public filmDetails: CombinedFilmApiResponseModel = {}

  public ratingAverage: number = 0;
  public ratings = {
    acting: 0,
    visuals: 0,
    story: 0,
    pacing: 0,
    length: 0,
    ending: 0
  }
  public seasons: string = '';
  public episodes: string = '';
  public numSeasons: number = 0;
  public numEpisodes: number = 0;


  ngOnInit() {
    //sets the title for the look up from the url parameter
    this.imdbId = this.activatedRoute.snapshot.params['imdbId'];

    this.filmDetails = this.localStorageService.getInformation('currentRateSeries');

    this.filmDetails.seasons?.forEach((season) => {
      this.numEpisodes = this.numEpisodes + season.episode_count;

      if(season.episode_count != 0) this.numSeasons++;
    });

    if(this.numSeasons == 1) {
      this.seasons = `${this.numSeasons} Season`;
      this.episodes = `${this.numEpisodes} Episodes`;
    } else {
      this.seasons = `${this.numSeasons} Seasons`;
      this.episodes = `${this.numEpisodes} Episodes`;
    }
  }

  onRate() {
    //if any of the rating criteria haven't been selected show warning
    if(this.ratings.acting == 0 || this.ratings.visuals == 0 || this.ratings.story == 0 ||
       this.ratings.pacing == 0 || this.ratings.length == 0 || this.ratings.ending == 0) {
      const warningMessage = document.querySelector('.warning');
      warningMessage?.classList.toggle('active');
      setTimeout(function() {warningMessage?.classList.toggle('active');}, 3500);

    //else submit the rating
    } else {


      let currentPostSeries: RatedSeriesModel = {
        postId: this.generateUniqueSeriesPostId(),
        poster: this.filmDetails.poster!,
        title: this.filmDetails.title!,
        releaseDate: this.alterReleaseForDatabase(this.filmDetails.released!),
        rated: this.filmDetails.rated!,
        seasons: this.numSeasons,
        episodes: this.numEpisodes,
        genres: this.filmDetails.genre!.split(', '),
        acting: this.ratings.acting,
        visuals: this.ratings.visuals,
        story: this.ratings.story,
        length: this.ratings.length,
        pacing: this.ratings.pacing,
        ending: this.ratings.ending,
        rating: this.ratingAverage,
        username: this.currentUser.username,
        dateRated: new Date().toJSON().slice(0, 10)
      }

      this.localStorageService.setInformation('currentPostSeries', currentPostSeries);
      this.routingService.navigateToPostSeries(currentPostSeries.postId);
    }
  }

  //shifts specific elements to the right when dashboard is opened
  toggleSidebarActive() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.rating-questions');
    ratingQuestions?.classList.toggle('active');
    const actingExplanation = document.querySelector('.acting-explanation');
    actingExplanation?.classList.toggle('moved');
    const visualsExplanation = document.querySelector('.visuals-explanation');
    visualsExplanation?.classList.toggle('moved');
    const storyExplanation = document.querySelector('.story-explanation');
    storyExplanation?.classList.toggle('moved');
    const pacingExplanation = document.querySelector('.pacing-explanation');
    pacingExplanation?.classList.toggle('moved');
    const lengthExplanation = document.querySelector('.length-explanation');
    lengthExplanation?.classList.toggle('moved');
    const endingExplanation = document.querySelector('.ending-explanation');
    endingExplanation?.classList.toggle('moved');
  }

  //shows explanation for each criteria when said criteria is hovered over
  onHoverActing() {
    const sidebar = document.querySelector('.acting-title');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.acting-explanation');
    ratingQuestions?.classList.toggle('active');
  }
  onHoverVisuals() {
    const sidebar = document.querySelector('.visuals-title');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.visuals-explanation');
    ratingQuestions?.classList.toggle('active');
  }
  onHoverStory() {
    const sidebar = document.querySelector('.story-title');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.story-explanation');
    ratingQuestions?.classList.toggle('active');
  }
  onHoverPacing() {
    const sidebar = document.querySelector('.pacing-title');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.pacing-explanation');
    ratingQuestions?.classList.toggle('active');
  }
  onHoverLength() {
    const sidebar = document.querySelector('.length-title');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.length-explanation');
    ratingQuestions?.classList.toggle('active');
  }
  onHoverEnding() {
    const sidebar = document.querySelector('.ending-title');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.ending-explanation');
    ratingQuestions?.classList.toggle('active');
  }

  //selects rating for the chosen criteria
  toggleActingChoice(querySelector: string) {
    const acting = document.querySelector(querySelector);
    const isActingAlreadySelected = this.actingRatingAlreadySelected();
    
    if(isActingAlreadySelected === querySelector) {
      acting?.classList.toggle('active');
      this.ratings.acting = 0;
      this.ratingAverage = this.getRatingsAverage();
    } else if(isActingAlreadySelected.length == 0) {
      acting?.classList.toggle('active');
      this.ratings.acting = this.checkDoubleDigitRating(querySelector.substring(8,10));
      this.ratingAverage = this.getRatingsAverage();
    } else {
      const oneAlreadySelected = document.querySelector(`${isActingAlreadySelected}`);
      oneAlreadySelected?.classList.toggle('active');

      acting?.classList.toggle('active');
      this.ratings.acting = this.checkDoubleDigitRating(querySelector.substring(8,10));
      this.ratingAverage = this.getRatingsAverage();
    }
  }
  toggleVisualsChoice(querySelector: string) {
    const visuals = document.querySelector(querySelector);
    const isVisualsAlreadySelected = this.visualsRatingAlreadySelected();
    
    if(isVisualsAlreadySelected === querySelector) {
      visuals?.classList.toggle('active'); 
      this.ratings.visuals = 0;
      this.ratingAverage = this.getRatingsAverage();  
    } else if(isVisualsAlreadySelected.length == 0) {
      visuals?.classList.toggle('active');
      this.ratings.visuals = this.checkDoubleDigitRating(querySelector.substring(9,11));
      this.ratingAverage = this.getRatingsAverage();
    } else {
      const oneAlreadySelected = document.querySelector(`${isVisualsAlreadySelected}`);
      oneAlreadySelected?.classList.toggle('active');

      visuals?.classList.toggle('active');
      this.ratings.visuals = this.checkDoubleDigitRating(querySelector.substring(9,11));
      this.ratingAverage = this.getRatingsAverage(); 
    }
  }
  toggleStoryChoice(querySelector: string) {
    const story = document.querySelector(querySelector);
    const isStoryAlreadySelected = this.storyRatingAlreadySelected();
    
    if(isStoryAlreadySelected === querySelector) {
      story?.classList.toggle('active');  
      this.ratings.story = 0;
      this.ratingAverage = this.getRatingsAverage();
    } else if(isStoryAlreadySelected.length == 0) {
      story?.classList.toggle('active');
      this.ratings.story = this.checkDoubleDigitRating(querySelector.substring(7,9));
      this.ratingAverage = this.getRatingsAverage();
    } else {
      const oneAlreadySelected = document.querySelector(`${isStoryAlreadySelected}`);
      oneAlreadySelected?.classList.toggle('active');

      story?.classList.toggle('active');
      this.ratings.story = this.checkDoubleDigitRating(querySelector.substring(7,9));
      this.ratingAverage = this.getRatingsAverage(); 
    }
  }
  togglePacingChoice(querySelector: string) {
    const pacing = document.querySelector(querySelector);
    const isPacingAlreadySelected = this.pacingRatingAlreadySelected();
    
    if(isPacingAlreadySelected === querySelector) {
      pacing?.classList.toggle('active'); 
      this.ratings.pacing = 0;  
      this.ratingAverage = this.getRatingsAverage();
    } else if(isPacingAlreadySelected.length == 0) {
      pacing?.classList.toggle('active');
      this.ratings.pacing = this.checkDoubleDigitRating(querySelector.substring(8,10));
      this.ratingAverage = this.getRatingsAverage();
    } else {
      const oneAlreadySelected = document.querySelector(`${isPacingAlreadySelected}`);
      oneAlreadySelected?.classList.toggle('active');

      pacing?.classList.toggle('active');
      this.ratings.pacing = this.checkDoubleDigitRating(querySelector.substring(8,10)); 
      this.ratingAverage = this.getRatingsAverage();
    }
  }
  toggleLengthChoice(querySelector: string) {
    const length = document.querySelector(querySelector);
    const isLengthAlreadySelected = this.lengthRatingAlreadySelected();
    
    if(isLengthAlreadySelected === querySelector) {
      length?.classList.toggle('active');  
      this.ratings.length = 0;
      this.ratingAverage = this.getRatingsAverage();  
    } else if(isLengthAlreadySelected.length == 0) {
      length?.classList.toggle('active');
      this.ratings.length = this.checkDoubleDigitRating(querySelector.substring(8,10));
      this.ratingAverage = this.getRatingsAverage();
    } else {
      const oneAlreadySelected = document.querySelector(`${isLengthAlreadySelected}`);
      oneAlreadySelected?.classList.toggle('active');

      length?.classList.toggle('active');
      this.ratings.length = this.checkDoubleDigitRating(querySelector.substring(8,10)); 
      this.ratingAverage = this.getRatingsAverage();
    }
  }
  toggleEndingChoice(querySelector: string) {
    const ending = document.querySelector(querySelector);
    const isEndingAlreadySelected = this.endingRatingAlreadySelected();
    
    if(isEndingAlreadySelected === querySelector) {
      ending?.classList.toggle('active');
      this.ratings.ending = 0;
      this.ratingAverage = this.getRatingsAverage();  
    } else if(isEndingAlreadySelected.length == 0) {
      ending?.classList.toggle('active');
      this.ratings.ending = this.checkDoubleDigitRating(querySelector.substring(8,10));
      this.ratingAverage = this.getRatingsAverage();
    } else {
      const oneAlreadySelected = document.querySelector(`${isEndingAlreadySelected}`);
      oneAlreadySelected?.classList.toggle('active');

      ending?.classList.toggle('active');
      this.ratings.ending = this.checkDoubleDigitRating(querySelector.substring(8,10)); 
      this.ratingAverage = this.getRatingsAverage(); 
    }
  }

  //checks whether or not a rating has already been selected for the chosen criteria
  actingRatingAlreadySelected() {
    const acting1 = document.querySelector('.acting-1 .rating-choice');
    const acting2 = document.querySelector('.acting-2 .rating-choice');
    const acting3 = document.querySelector('.acting-3 .rating-choice');
    const acting4 = document.querySelector('.acting-4 .rating-choice');
    const acting5 = document.querySelector('.acting-5 .rating-choice');
    const acting6 = document.querySelector('.acting-6 .rating-choice');
    const acting7 = document.querySelector('.acting-7 .rating-choice');
    const acting8 = document.querySelector('.acting-8 .rating-choice');
    const acting9 = document.querySelector('.acting-9 .rating-choice');
    const acting10 = document.querySelector('.acting-10 .rating-choice');

    if (acting1?.classList.contains('active') ||
        acting2?.classList.contains('active') ||
        acting3?.classList.contains('active') ||
        acting4?.classList.contains('active') ||
        acting5?.classList.contains('active') ||
        acting6?.classList.contains('active') ||
        acting7?.classList.contains('active') ||
        acting8?.classList.contains('active') ||
        acting9?.classList.contains('active') ||
        acting10?.classList.contains('active')) {

      for (let i = 1; i < 11; i++) {
        const current = document.querySelector(`.acting-${i} .rating-choice`);

        if(current?.classList.contains('active')) {
          console.log(`.acting-${i} .rating-choice`);
          return `.acting-${i} .rating-choice`;
        }
      }
      return '';
    } else {
      return '';
    }
  }
  visualsRatingAlreadySelected() {
    const visuals1 = document.querySelector('.visuals-1 .rating-choice');
    const visuals2 = document.querySelector('.visuals-2 .rating-choice');
    const visuals3 = document.querySelector('.visuals-3 .rating-choice');
    const visuals4 = document.querySelector('.visuals-4 .rating-choice');
    const visuals5 = document.querySelector('.visuals-5 .rating-choice');
    const visuals6 = document.querySelector('.visuals-6 .rating-choice');
    const visuals7 = document.querySelector('.visuals-7 .rating-choice');
    const visuals8 = document.querySelector('.visuals-8 .rating-choice');
    const visuals9 = document.querySelector('.visuals-9 .rating-choice');
    const visuals10 = document.querySelector('.visuals-10 .rating-choice');

    if (visuals1?.classList.contains('active') ||
        visuals2?.classList.contains('active') ||
        visuals3?.classList.contains('active') ||
        visuals4?.classList.contains('active') ||
        visuals5?.classList.contains('active') ||
        visuals6?.classList.contains('active') ||
        visuals7?.classList.contains('active') ||
        visuals8?.classList.contains('active') ||
        visuals9?.classList.contains('active') ||
        visuals10?.classList.contains('active')) {

      for (let i = 1; i < 11; i++) {
        const current = document.querySelector(`.visuals-${i} .rating-choice`);

        if(current?.classList.contains('active')) {
          console.log(`.visuals-${i} .rating-choice`);
          return `.visuals-${i} .rating-choice`;
        }
      }
      return '';
    } else {
      return '';
    }
  }
  storyRatingAlreadySelected() {
    const story1 = document.querySelector('.story-1 .rating-choice');
    const story2 = document.querySelector('.story-2 .rating-choice');
    const story3 = document.querySelector('.story-3 .rating-choice');
    const story4 = document.querySelector('.story-4 .rating-choice');
    const story5 = document.querySelector('.story-5 .rating-choice');
    const story6 = document.querySelector('.story-6 .rating-choice');
    const story7 = document.querySelector('.story-7 .rating-choice');
    const story8 = document.querySelector('.story-8 .rating-choice');
    const story9 = document.querySelector('.story-9 .rating-choice');
    const story10 = document.querySelector('.story-10 .rating-choice');

    if (story1?.classList.contains('active') ||
        story2?.classList.contains('active') ||
        story3?.classList.contains('active') ||
        story4?.classList.contains('active') ||
        story5?.classList.contains('active') ||
        story6?.classList.contains('active') ||
        story7?.classList.contains('active') ||
        story8?.classList.contains('active') ||
        story9?.classList.contains('active') ||
        story10?.classList.contains('active')) {

      for (let i = 1; i < 11; i++) {
        const current = document.querySelector(`.story-${i} .rating-choice`);

        if(current?.classList.contains('active')) {
          console.log(`.story-${i} .rating-choice`);
          return `.story-${i} .rating-choice`;
        }
      }
      return '';
    } else {
      return '';
    }
  }
  pacingRatingAlreadySelected() {
    const pacing1 = document.querySelector('.pacing-1 .rating-choice');
    const pacing2 = document.querySelector('.pacing-2 .rating-choice');
    const pacing3 = document.querySelector('.pacing-3 .rating-choice');
    const pacing4 = document.querySelector('.pacing-4 .rating-choice');
    const pacing5 = document.querySelector('.pacing-5 .rating-choice');
    const pacing6 = document.querySelector('.pacing-6 .rating-choice');
    const pacing7 = document.querySelector('.pacing-7 .rating-choice');
    const pacing8 = document.querySelector('.pacing-8 .rating-choice');
    const pacing9 = document.querySelector('.pacing-9 .rating-choice');
    const pacing10 = document.querySelector('.pacing-10 .rating-choice');

    if (pacing1?.classList.contains('active') ||
        pacing2?.classList.contains('active') ||
        pacing3?.classList.contains('active') ||
        pacing4?.classList.contains('active') ||
        pacing5?.classList.contains('active') ||
        pacing6?.classList.contains('active') ||
        pacing7?.classList.contains('active') ||
        pacing8?.classList.contains('active') ||
        pacing9?.classList.contains('active') ||
        pacing10?.classList.contains('active')) {

      for (let i = 1; i < 11; i++) {
        const current = document.querySelector(`.pacing-${i} .rating-choice`);

        if(current?.classList.contains('active')) {
          console.log(`.pacing-${i} .rating-choice`);
          return `.pacing-${i} .rating-choice`;
        }
      }
      return '';
    } else {
      return '';
    }
  }
  lengthRatingAlreadySelected() {
    const length1 = document.querySelector('.length-1 .rating-choice');
    const length2 = document.querySelector('.length-2 .rating-choice');
    const length3 = document.querySelector('.length-3 .rating-choice');
    const length4 = document.querySelector('.length-4 .rating-choice');
    const length5 = document.querySelector('.length-5 .rating-choice');
    const length6 = document.querySelector('.length-6 .rating-choice');
    const length7 = document.querySelector('.length-7 .rating-choice');
    const length8 = document.querySelector('.length-8 .rating-choice');
    const length9 = document.querySelector('.length-9 .rating-choice');
    const length10 = document.querySelector('.length-10 .rating-choice');

    if (length1?.classList.contains('active') ||
        length2?.classList.contains('active') ||
        length3?.classList.contains('active') ||
        length4?.classList.contains('active') ||
        length5?.classList.contains('active') ||
        length6?.classList.contains('active') ||
        length7?.classList.contains('active') ||
        length8?.classList.contains('active') ||
        length9?.classList.contains('active') ||
        length10?.classList.contains('active')) {

      for (let i = 1; i < 11; i++) {
        const current = document.querySelector(`.length-${i} .rating-choice`);

        if(current?.classList.contains('active')) {
          console.log(`.length-${i} .rating-choice`);
          return `.length-${i} .rating-choice`;
        }
      }
      return '';
    } else {
      return '';
    }
  }
  endingRatingAlreadySelected() {
    const ending1 = document.querySelector('.ending-1 .rating-choice');
    const ending2 = document.querySelector('.ending-2 .rating-choice');
    const ending3 = document.querySelector('.ending-3 .rating-choice');
    const ending4 = document.querySelector('.ending-4 .rating-choice');
    const ending5 = document.querySelector('.ending-5 .rating-choice');
    const ending6 = document.querySelector('.ending-6 .rating-choice');
    const ending7 = document.querySelector('.ending-7 .rating-choice');
    const ending8 = document.querySelector('.ending-8 .rating-choice');
    const ending9 = document.querySelector('.ending-9 .rating-choice');
    const ending10 = document.querySelector('.ending-10 .rating-choice');

    if (ending1?.classList.contains('active') ||
        ending2?.classList.contains('active') ||
        ending3?.classList.contains('active') ||
        ending4?.classList.contains('active') ||
        ending5?.classList.contains('active') ||
        ending6?.classList.contains('active') ||
        ending7?.classList.contains('active') ||
        ending8?.classList.contains('active') ||
        ending9?.classList.contains('active') ||
        ending10?.classList.contains('active')) {

      for (let i = 1; i < 11; i++) {
        const current = document.querySelector(`.ending-${i} .rating-choice`);

        if(current?.classList.contains('active')) {
          console.log(`.ending-${i} .rating-choice`);
          return `.ending-${i} .rating-choice`;
        }
      }
      return '';
    } else {
      return '';
    }
  }

  //generates ratedSeriesId and makes sure it's unique
  generateUniqueSeriesPostId() {
    let allRatedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');

    let ratedSeriesId: string = 's' + Math.random().toString(16).slice(2);
    let isUnique: boolean = false;

    while(!isUnique) {
      for(let i = 0; i < allRatedSeries.length; i++) {
        if(allRatedSeries[i].postId == ratedSeriesId) {
          ratedSeriesId = 's' + Math.random().toString(16).slice(2);
          break;
        } else if(i == (allRatedSeries.length - 1) && allRatedSeries[i].postId != ratedSeriesId) {
          isUnique = true;
        }
      }
    }

    return ratedSeriesId;
  }
  
  //gets the average of the ratings
  getRatingsAverage() {
    return Number(((this.ratings.acting + this.ratings.visuals + 
            this.ratings.story + this.ratings.pacing + 
            this.ratings.length + this.ratings.ending) / 6).toFixed(1));
  }
  //checks if the rating selected is 10
  checkDoubleDigitRating(number: string) {
    if(number.slice(-1) == ' ') {
      return Number(number.substring(0,1));
    } else {
      return Number(number);
    }
  }

  //turns the given date (18 Dec 2009) into (December 18, 2009)
  fixRelease(releaseDate: string) {
    const day = releaseDate.substring(0,2);
    let month = releaseDate.substring(3,6);
    const year = releaseDate.substring(7);
  
    switch(month) {
      case 'Jan':
        month = 'January'
        break;
      case 'Feb':
        month = 'February'
        break;
      case 'Mar':
        month = 'March'
        break;
      case 'Apr':
        month = 'April'
        break;
      case 'May':
        month = 'May'
        break;
      case 'Jun':
        month = 'June'
        break;
      case 'Jul':
        month = 'July'
        break;
      case 'Aug':
        month = 'August'
        break;
      case 'Sep':
        month = 'September'
        break;
      case 'Oct':
        month = 'October'
        break;
      case 'Nov':
        month = 'November'
        break;
      case 'Dec':
        month = 'December'
        break;
    }
      
    return `${month} ${day}, ${year}`
  }

    //turns the given date (18 Dec 2009) into (2009-12-18)
    alterReleaseForDatabase(releaseDate: string) {
      const day = releaseDate.substring(0,2);
      let month = releaseDate.substring(3,6);
      const year = releaseDate.substring(7);
    
      switch(month) {
        case 'Jan':
          month = '01'
          break;
        case 'Feb':
          month = '02'
          break;
        case 'Mar':
          month = '03'
          break;
        case 'Apr':
          month = '04'
          break;
        case 'May':
          month = '05'
          break;
        case 'Jun':
          month = '06'
          break;
        case 'Jul':
          month = '07'
          break;
        case 'Aug':
          month = '08'
          break;
        case 'Sep':
          month = '09'
          break;
        case 'Oct':
          month = '10'
          break;
        case 'Nov':
          month = '11'
          break;
        case 'Dec':
          month = '12'
          break;
      }
        
      return `${year}-${month}-${day}`
    }
  
  //changes film type from movie to Movie
  fixFilmType(filmType: string) {
    return filmType.charAt(0).toUpperCase() + filmType.slice(1).toLowerCase();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { RateFilmTemplateComponent } from '../rate-film-template/rate-film-template.component';

@Component({
  selector: 'app-rate-movie',
  standalone: true,
  imports: [CommonModule, RateFilmTemplateComponent],
  templateUrl: './rate-movie.component.html',
  styleUrl: './rate-movie.component.scss'
})
export class RateMovieComponent implements OnInit {
  private apiService: ApiService = inject(ApiService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public imdbId: string = '';
  public filmDetails: ExtensiveSearchFilmModel[] =[];

  public ratingAverage: number = 0;
  public ratings = {
    acting: 0,
    visuals: 0,
    story: 0,
    pacing: 0,
    climax: 0,
    ending: 0
  }


  ngOnInit() {
    //sets the title for the look up from the url parameter
    this.imdbId = this.activatedRoute.snapshot.params['imdbId'];

    this.filmDetails = this.apiService.search1FilmOmdb(this.imdbId);
  }

  onRate() {
    //if any of the rating criteria haven't been selected show warning
    if(this.ratings.acting == 0 || this.ratings.visuals == 0 || this.ratings.story == 0 ||
       this.ratings.pacing == 0 || this.ratings.climax == 0 || this.ratings.ending == 0) {
      const warningMessage = document.querySelector('.warning');
      warningMessage?.classList.toggle('active');
      setTimeout(function() {warningMessage?.classList.toggle('active');}, 3500);

    //else submit the rating
    } else {
      //enter the rating into the users database
      console.log(this.ratings);
    }
  }

  //shifts specific elements to the right when dashboard is opened
  toggleSidebarActive() {
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
    const climaxExplanation = document.querySelector('.climax-explanation');
    climaxExplanation?.classList.toggle('moved');
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
  onHoverClimax() {
    const sidebar = document.querySelector('.climax-title');
    sidebar?.classList.toggle('active');
    const ratingQuestions = document.querySelector('.climax-explanation');
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
  toggleClimaxChoice(querySelector: string) {
    const climax = document.querySelector(querySelector);
    const isClimaxAlreadySelected = this.climaxRatingAlreadySelected();
    
    if(isClimaxAlreadySelected === querySelector) {
      climax?.classList.toggle('active');  
      this.ratings.climax = 0;
      this.ratingAverage = this.getRatingsAverage();  
    } else if(isClimaxAlreadySelected.length == 0) {
      climax?.classList.toggle('active');
      this.ratings.climax = this.checkDoubleDigitRating(querySelector.substring(8,10));
      this.ratingAverage = this.getRatingsAverage();
    } else {
      const oneAlreadySelected = document.querySelector(`${isClimaxAlreadySelected}`);
      oneAlreadySelected?.classList.toggle('active');

      climax?.classList.toggle('active');
      this.ratings.climax = this.checkDoubleDigitRating(querySelector.substring(8,10)); 
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
  climaxRatingAlreadySelected() {
    const climax1 = document.querySelector('.climax-1 .rating-choice');
    const climax2 = document.querySelector('.climax-2 .rating-choice');
    const climax3 = document.querySelector('.climax-3 .rating-choice');
    const climax4 = document.querySelector('.climax-4 .rating-choice');
    const climax5 = document.querySelector('.climax-5 .rating-choice');
    const climax6 = document.querySelector('.climax-6 .rating-choice');
    const climax7 = document.querySelector('.climax-7 .rating-choice');
    const climax8 = document.querySelector('.climax-8 .rating-choice');
    const climax9 = document.querySelector('.climax-9 .rating-choice');
    const climax10 = document.querySelector('.climax-10 .rating-choice');

    if (climax1?.classList.contains('active') ||
        climax2?.classList.contains('active') ||
        climax3?.classList.contains('active') ||
        climax4?.classList.contains('active') ||
        climax5?.classList.contains('active') ||
        climax6?.classList.contains('active') ||
        climax7?.classList.contains('active') ||
        climax8?.classList.contains('active') ||
        climax9?.classList.contains('active') ||
        climax10?.classList.contains('active')) {

      for (let i = 1; i < 11; i++) {
        const current = document.querySelector(`.climax-${i} .rating-choice`);

        if(current?.classList.contains('active')) {
          console.log(`.climax-${i} .rating-choice`);
          return `.climax-${i} .rating-choice`;
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

  //gets the average of the ratings
  getRatingsAverage() {
    return Number(((this.ratings.acting + this.ratings.visuals + 
            this.ratings.story + this.ratings.pacing + 
            this.ratings.climax + this.ratings.ending) / 6).toFixed(1));
  }

  //checks if the rating selected is 10
  checkDoubleDigitRating(number: string) {
    if(number.slice(-1) == ' ') {
      return Number(number.substring(0,1));
    } else {
      return Number(number);
    }
  }
}

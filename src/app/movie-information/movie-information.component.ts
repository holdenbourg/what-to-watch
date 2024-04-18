import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamingServiceTemplateComponent } from '../streaming-service-template/streaming-service-template.component';
import { CombinedFilmApiResponseModel } from '../services/models/combined-film-api-response';
import { RoutingService } from '../services/routing/routing.service';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-movie-information',
  standalone: true,
  imports: [CommonModule, StreamingServiceTemplateComponent],
  templateUrl: './movie-information.component.html',
  styleUrl: './movie-information.component.scss'
})
export class MovieInformationComponent implements OnInit {
  private apiService: ApiService = inject(ApiService);
  private routingService: RoutingService = inject(RoutingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public streamingServices: string[] = [];
  public imdbId: string = '';

  combinedApiResult: CombinedFilmApiResponseModel = {
    title: '',
    year: 0,
    rated: '',
    released: '',
    runTime: 0,
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    poster: '',
    ratings: [],
    metascore: 0,
    imdbRating: 0,
    imdbVotes: 0,
    imdbId: '',
    type: '',
    dvd: '',
    boxOffice: '',
    production: '',
    website: '',
    response: '',
    watch_providers: [],
    trailer: '',
    seasons: []
  }
  public streamingServiceLogos: Map<string, string> = new Map<string, string>([
    ['Netflix', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/330px-Netflix_2015_N_logo.svg.png?20221130064001'],
    ['Disney Plus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/800px-Disney%2B_logo.svg.png?20221217204017'],
    ['Max', 'https://play-lh.googleusercontent.com/1iyX7VdQ7MlM7iotI9XDtTwgiVmqFGzqwz10L67XVoyiTmJVoHX87QtqvcXgUnb0AC8'],
    ['Amazon Prime Video', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Amazon_Prime_Video_blue_logo_1.svg/640px-Amazon_Prime_Video_blue_logo_1.svg.png'],
    ['Paramount Plus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Paramount_Plus.svg/640px-Paramount_Plus.svg.png'],
    ['DIRECTV', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/2011_Directv_logo.svg/1280px-2011_Directv_logo.svg.png'],
    ['Hulu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hulu_Japan_logo.svg/640px-Hulu_Japan_logo.svg.png'],
    ['Crunchyroll', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Crunchyroll_Logo.svg/640px-Crunchyroll_Logo.svg.png'],
    ['Adult Swim', 'https://variety.com/wp-content/uploads/2014/02/adult-swim1.jpg?crop=178px%2C100px%2C666px%2C371px&resize=1000%2C563'],
    ['Spectrum On Demand', 'https://ondemand.spectrum.net/images/spectrum-seo.png'],
    ['Funimation Now', 'https://www.pennlive.com/resizer/N1SXHzwQv-JKgqRv0t9zUKxSvLU=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/BKI5IVWMTJF3RFKUSHQ75STYZI.jpeg'],
    ['Cinemax Amazon Channel', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cinemax_%28Yellow%29.svg/640px-Cinemax_%28Yellow%29.svg.png'],
    ['Boomerang', 'https://theme.zdassets.com/theme_assets/1479875/05def54c3c42b02ca64136ec40d361c1c0823a08.svg'],
    ['Hoopla', 'https://www.johnjermain.org/wp-content/uploads/2018/10/hoopla-logo-blue-black_for_blog.png'],
    ['Comedy Central', 'https://paramountshop.com/cdn/shop/files/CC-Mobile-min.png?v=1673463272'],
    ['fuboTV', 'https://images.axios.com/bx06TsOh1eCxRZvYQjakuph5hUo=/0x233:1280x953/1920x1080/2020/10/01/1601561561305.png'],
    ['Peacock Premium', 'https://photos5.appleinsider.com/gallery/55450-112618-headepeacock-xl.jpg'],
    ['Apple TV Plus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/AppleTVLogo.svg/2048px-AppleTVLogo.svg.png'],
    ['Discovery', 'https://seeklogo.com/images/D/discovery-logo-853C219A76-seeklogo.com.png'],
    ['The Roku Channel', 'https://www.tvweek.com/wp-content/uploads/2015/09/roku.png']
  ]);


  ngOnInit() {
    this.imdbId = this.activatedRoute.snapshot.params['imdbId'];

    this.getStraightMovie();
  }


  goToTrailer(trailerUrl: string) {
    window.open(trailerUrl, "_blank");
  }

  async getStraightMovie() {
    let omdbMovie = await this.apiService.search1FilmOmdbStraight(this.imdbId);
    let mdbMovie = await this.apiService.search1MovieMdbStraight(this.imdbId);

    let combinedDetails: CombinedFilmApiResponseModel = {
      title: omdbMovie?.Title,
      year: omdbMovie?.Year,
      rated: omdbMovie?.Rated,
      released: omdbMovie?.Released,
      runTime: mdbMovie?.runtime,
      genre: omdbMovie?.Genre,
      director: omdbMovie?.Director,
      writer: omdbMovie?.Writer,
      actors: omdbMovie?.Actors,
      plot: omdbMovie?.Plot,
      language: omdbMovie?.Language,
      country: omdbMovie?.Country,
      awards: omdbMovie?.Awards,
      poster: omdbMovie?.Poster,
      ratings: omdbMovie?.Ratings,
      metascore: omdbMovie?.Metascore,
      imdbRating: omdbMovie?.imdbRating,
      imdbVotes: omdbMovie?.imdbVotes,
      imdbId: omdbMovie?.imdbID,
      type: omdbMovie?.Type,
      dvd: omdbMovie?.DVD,
      boxOffice: omdbMovie?.BoxOffice,
      production: omdbMovie?.Production,
      website: omdbMovie?.Website,
      response: omdbMovie?.Response,
      watch_providers: mdbMovie?.watch_providers,
      trailer: mdbMovie?.trailer,
      seasons: []
    }

    this.combinedApiResult = combinedDetails;

    //fix streaming services
    this.combinedApiResult.watch_providers?.forEach((element) => {
      let logo = this.streamingServiceLogos.get(element.name);

      if(!this.streamingServices.includes(logo!) && logo != undefined) {
        this.streamingServices.push(logo);
      }
    });
  }

  //if the film is a movie route to rate-movie, else rate-series
  onRateThisFilm() {
    this.localStorageService.setInformation('currentRateMovie', this.combinedApiResult);

    this.routingService.navigateToRateMovie(this.combinedApiResult.imdbId);
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
    
    return `${month} ${day}, ${year}`;
  }

  //if director and writer are same person change info to Director/Writer
  checkDirectorWriterForDirector(director: string, writer: string) {
    if(director == writer) {
      return `Director/Writer: ${director}`;
    } else {
      return `Director: ${director}`;
    }
  }
  checkDirectorWriterForWriter(director: string, writer: string) {
    if(director == writer) {
      return '';
    } else {
      return `Writer: ${writer}`
    }
  }

  //check if any of the 3 ratings are empty if so put N/A
  checkIfRatingsEmpty(rating?: string) {
    if(rating != undefined && rating.length > 1) {
      return rating;
    } else {
      return 'N/A';
    }
  }

  //changes film type from movie to Movie
  fixFilmType(filmType: string) {
    return filmType.charAt(0).toUpperCase() + filmType.slice(1).toLowerCase();
  }

  fixBoxOffice(filmType: string, boxOffice: string) {
    if(filmType == 'movie') {
      return `Box Office: ${boxOffice}`;
    } else {
      return '';
    }
  }

  //if there is no poster give "no image available" poster
  fixNoPoster(poster: string) {
    if(poster == 'N/A') {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    } else {
      return poster;
    }
  }

  //turn runtime 150 to 2 HR 30 MIN
  fixRuntime(runtime: number) {
    let hours = Math.floor(runtime/60);
    let minutes = runtime - (hours * 60);

    return `${hours} HR ${minutes} MIN`
  }
}

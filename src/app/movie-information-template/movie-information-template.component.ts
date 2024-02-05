import { Component, Input, OnInit } from '@angular/core';
import { MovieResponseModel } from '../services/models/mdb-list-api/movie-response-model';
import { CommonModule } from '@angular/common';
import { StreamingServiceTemplateComponent } from '../streaming-service-template/streaming-service-template.component';
import { StreamModel } from '../services/models/mdb-list-api/stream-model';

@Component({
  selector: 'app-movie-information-template',
  standalone: true,
  imports: [CommonModule, StreamingServiceTemplateComponent],
  templateUrl: './movie-information-template.component.html',
  styleUrl: './movie-information-template.component.scss'
})
export class MovieInformationTemplateComponent implements OnInit {
  @Input()
  public mdbMovieDetails: MovieResponseModel = {
    title: '',
    year: 0,
    released: '',
    released_digital: '',
    description: '',
    runtime: 0,
    score: 0,
    score_average: 0,
    imdbid: '',
    traktid: 0,
    tmdbid: 0,
    type: '',
    ratings: [],
    streams: [],
    watch_providers: [],
    reviews: [],
    keywords: [],
    language: '',
    spoken_language: '',
    country: '',
    certification: '',
    commonsense: 0,
    age_rating: 0,
    status: '',
    trailer: '',
    poster: '',
    backdrop: '',
    response: false,
    apiused: 0
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

  public streamingServices: string[] = [];


  ngOnInit() {
    //fix streaming services
    this.mdbMovieDetails.watch_providers.forEach((element) => {
      let logo = this.streamingServiceLogos.get(element.name);

      if(logo != undefined) {
        this.streamingServices.push(logo);
      }
    });

    console.log(this.mdbMovieDetails);
  }

  //changes film type from movie to Movie
  fixFilmType(filmType: string) {
    return filmType.charAt(0).toUpperCase() + filmType.slice(1).toLowerCase();
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

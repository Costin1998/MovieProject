import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';  // Assume you have a MovieService to fetch movies

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  genreId: number = 0;
  genreMovies: any[] = [];
  loading: boolean = true;
  genreName: string = '';
  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navText: ['<', '>'],
      navSpeed: 600,
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        760: {
          items: 4
        },
        1000: {
          items: 7
        },
        1700: {
          items: 9
        },
        2400: {
          items: 11
        }
      },
      nav: true
    };
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    const initialGenreId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if (initialGenreId) {
      this.fetchMoviesByGenre(initialGenreId);
      this.fetchGenreDetails(initialGenreId);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const genreId = +this.activatedRoute.snapshot.paramMap.get('id')!;
        this.fetchMoviesByGenre(genreId);
        this.fetchGenreDetails(genreId); 
      }
    });
  }

  fetchGenreDetails(genreId: number): void {
    this.genreService.getGenreById(genreId).subscribe(
      (genre: any) => {
        this.genreName = genre.name;  // Assuming API returns the genre name in the `name` field
      },
      (error) => {
        console.error('Error fetching genre details', error);
      }
    );
  }

  fetchMoviesByGenre(genreId: number): void {
    this.movieService.getMoviesByGenre(genreId).subscribe(
      (movies: any) => {
        this.genreMovies = movies.results;
        this.loading = false;
        console.log(this.genreMovies);
      },
      (error) => {
        console.error('Error fetching movies for genre', error);
        this.loading = false;
      }
    );
  }
}

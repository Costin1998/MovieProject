import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latestMovies: any[] = [];
  topMovies: any[] = [];
  searchResults: any[] = [];
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
    private movieService: MovieService,
    private searchService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLatestMovies();
    this.getTopMovies();
    this.searchService.searchResults$.subscribe((results) => {
      this.searchResults = results;  // Update the local searchResults array
    });
  }

  getLatestMovies(): void {
    this.movieService.getLatestMovies().subscribe((response: any) => {
      this.latestMovies = response.results;
    });
  }

  getTopMovies(): void {
    this.movieService.getTopRatedMovies().subscribe((response: any) => {
      this.topMovies = response.results;
    });
  }

  openDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification.service';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  genres: any[] = [];
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  searchResults: any[] = [];
  constructor(
    private router: Router, 
    private genreService: GenreService,
    private movieService: MovieService,
    private searchService: SharedService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.genreService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  openMenu(trigger: any): void {
    trigger.openMenu();
  }
  
  closeMenu(trigger: any): void {
    setTimeout(() => {
      if (!this.isMenuOpen) {
        trigger.closeMenu();
      }
    }, 100);
  }

  onMenuEnter(menuTrigger: any): void {
    this.isMenuOpen = true;
    menuTrigger.openMenu();
  }

  onMenuLeave(menuTrigger: any): void {
    this.isMenuOpen = false;
    menuTrigger.closeMenu();
  }

  navigateToGenre(genreId: number): void {
    this.router.navigate(['/genre', genreId]);
  }

  searchMovie(input: any){
    this.movieService.searchMovies(input).subscribe(
      (response: any) => {
        if(this.router.url != '/' && this.router.url != 'home'){
          this.router.navigate(['/']);
        }
        this.searchService.setSearchResults(response.results); 
      },
      (error) => {
        console.error('Error searching movies', error);
      }
    );
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  logOut(){
    this.authService.logout();
  }
}
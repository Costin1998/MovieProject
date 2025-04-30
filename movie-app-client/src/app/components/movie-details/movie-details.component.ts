import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentification.service';
import { CommentService } from 'src/app/services/comment.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  cast: any[] = [];
  posters: any[] = [];
  userId: any = "";
  userName: any = "";
  isLoggedIn: boolean = false;
  newComment: any;
  comments: any;
  movieId: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.movieId = this.route.snapshot.paramMap.get('id');

    if (this.movieId) {
      this.loadMovieDetails(this.movieId);
      this.loadMovieCredits(this.movieId);
      this.loadMovieImages(this.movieId);
      this.loadComments(this.movieId);
    }
  }

  loadMovieDetails(id: string): void {
    this.movieService.getMovieDetails(id).subscribe((data) => {
      this.movie = data;
    });
  }

  loadMovieCredits(id: string): void {
    this.movieService.getMovieCredits(id).subscribe((data: any) => {
      this.cast = data.cast.slice(0, 10);
    });
  }

  loadMovieImages(id: string): void {
    this.movieService.getMovieImages(id).subscribe((data: any) => {
      this.posters = data.posters.slice(0, 10);
    });
  }

  loadComments(id: number): void {
    this.commentService.getComments(id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  postComment() {
    if (!this.newComment.trim()) return;
    const comment = {
      movieId: this.movieId,
      userId: this.authService.getUserId(),
      userName: this.authService.getUsername(),
      content: this.newComment.trim()
    };

    this.commentService.addComment(comment).subscribe({
      next: () => {
        this.comments.push(comment);
      },
      error: (err: any) => console.error('Error posting comment', err)
    });
  }
}

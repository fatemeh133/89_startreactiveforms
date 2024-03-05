import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AppError } from '../error/app-error';
import { NotFound } from '../error/not-found';
import { BadInputError } from '../error/badInputError';

@Injectable({
  providedIn: 'root',
})
export class HttpRequstService {
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  delete(post: any) {
    return this.http.delete(this.url + '/' + post.id).pipe(
      catchError((error: any) => {
        if (error.status === 404) {
          return throwError(() => {
            new NotFound(error);
          });
        } else {
          return throwError(() => {
            new AppError(error);
          });
        }
      })
    );
  }
  get() {
    return this.http.get<any[]>(this.url);
  }

  update(post: any) {
    return this.http.patch(
      this.url + '/' + post.id,
      JSON.stringify({ title: 'Fateme Aghaahmadi' }),
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    );
  }

  post(post: any) {
    return this.http.post(this.url, JSON.stringify(post)).pipe(
      catchError((error: any) => {
        if (error.status === 400) {
          return throwError(() => {
            new BadInputError(error);
          });
        } else {
          return throwError(() => {
            new AppError(error);
          });
        }
      })
    );
  }
}

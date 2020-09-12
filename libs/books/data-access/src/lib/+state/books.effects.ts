import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as BooksActions from './books.actions';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from '@tmo/shared/models';
import { AppConstants } from '../../constants/appconstants';

@Injectable()
export class BooksEffects {
  searchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      fetch({
        run: action => {
          return this.http
            .get<Book[]>(`${AppConstants.bookSearchApi}?q=${action.term}`)
            .pipe(
              map(data => BooksActions.searchBooksSuccess({ books: data }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return BooksActions.searchBooksFailure({ error });
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}

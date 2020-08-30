import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Update } from '@ngrx/entity';

export const loadReadingList = createAction('[Reading List] Load list');

export const loadReadingListSuccess = createAction(
  '[Reading List] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Reading List] Add to list',
  props<{ book: Book }>()
);

export const UndoAddToReadingList = createAction(
  '[Reading List] Undo add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const UndoremoveFromReadingList = createAction(
  '[Reading List]  Undo Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const markedAsFinished = createAction(
  '[Reading List]  Marked As Finish',

  props<{ item: Update<ReadingListItem> }>()
);

export const confirmedMarkAsFinshed = createAction(
  '[Reading List] Confirmed mark as Finsised',
  props<{ item: Update<ReadingListItem> }>()
);

export const failedMArkAsFinshed = createAction(
  '[Reading List] Confirmed mark as Finsised',
  props<{ item: Update<ReadingListItem> }>()
);

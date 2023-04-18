import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { FilesService } from '../../../services/files.service';
import {
  getFoldersAction,
  getFoldersFailureAction,
  getFoldersSuccessAction,
} from '../actions/sidenav-actions';

@Injectable()
export class GetTasksEffect {
  getFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFoldersAction),
      switchMap(() => {
        return this.folderService.getHomeFolders().pipe(
          map((folders: string[]) => {
            return getFoldersSuccessAction({ folders });
          }),

          catchError(() => {
            return of(getFoldersFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private folderService: FilesService) {}
}

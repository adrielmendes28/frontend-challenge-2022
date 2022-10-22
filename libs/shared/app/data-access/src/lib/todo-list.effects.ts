import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as TodoListActions from './todo-list.actions';
import * as SnackBarActions from './snack-bar.actions';
import { TodoListService } from './todo-list.service';
import { of } from 'rxjs';

@Injectable()
export class TodoListEffects {
  loadTodoList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.loadTodoList),
      exhaustMap(() =>
        this.service.list().pipe(
          map((tasks) => TodoListActions.loadTodoListSuccess({ tasks })),
          catchError((error) => of(TodoListActions.loadTodoListError(error)))
        )
      )
    );
  });

  loadTodoListError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.loadTodoListError),
      map(() =>
        SnackBarActions.openSnackBar({
          message: "Houve uma falha ao carregar a lista de todos.",
          action: "Erro"
        })
      ),
    )
  });

  createTodoList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.createTodoList),
      exhaustMap(({ task }) =>
        this.service.create(task).pipe(
          map((task) => TodoListActions.createTodoListSuccess({ task })),
          catchError((error) => of(TodoListActions.createTodoListError(error)))
        )
      )
    );
  });

  createTodoListSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.createTodoListSuccess),
      map(() =>
        SnackBarActions.openSnackBar({
          message: "Todo cadastrado com sucesso!",
          action: "Sucesso"
        })
      ),
    )
  });

  createTodoListError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.createTodoListError),
      map(() =>
        SnackBarActions.openSnackBar({
          message: "Houve uma falha ao criar o novo todo.",
          action: "Erro"
        })
      ),
    )
  });

  removeTodoList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.removeTodoList),
      exhaustMap(({ taskId }) =>
        this.service.remove(taskId).pipe(
          map(() => TodoListActions.removeTodoListSuccess({ taskId })),
          catchError((error) => of(TodoListActions.removeTodoListError(error)))
        )
      )
    );
  });

  removeTodoListSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.removeTodoListSuccess),
      map(() =>
        SnackBarActions.openSnackBar({
          message: "Todo removido com sucesso!",
          action: "Sucesso"
        })
      ),
    )
  });

  removeTodoListError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.removeTodoListError),
      map(() =>
        SnackBarActions.openSnackBar({
          message: "Houve uma falha ao remover o todo.",
          action: "Erro"
        })
      ),
    )
  });

  updateTodoList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.updateTodoList),
      exhaustMap(({ task }) =>
        this.service.update(task).pipe(
          map(() => TodoListActions.updateTodoListSuccess({ task })),
          catchError((error) => of(TodoListActions.updateTodoListError(error)))
        )
      )
    );
  });

  updateTodoListSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.updateTodoListSuccess),
      map(() =>
        SnackBarActions.openSnackBar({
          message: "Lista de todos atualizada com sucesso!",
          action: "Sucesso"
        })
      ),
    )
  });

  updateTodoListError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.updateTodoListError),
      map(() =>
        SnackBarActions.openSnackBar({
          message: "Houve uma falha ao atualizar um todo na lista de todos.",
          action: "Erro"
        })
      ),
    )
  });


  constructor(private actions$: Actions, private service: TodoListService) { }
}

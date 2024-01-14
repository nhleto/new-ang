import { Observable, UnaryFunction, catchError, map, of, pipe, scan, startWith } from "rxjs";

export function wrap<T, E = any>(mapError?: (error: any) => E): UnaryFunction<Observable<T>, Observable<Wrapped<T>>> {
  return pipe(
    map(response => ({data: response, loading: false})),
    catchError(error => of({
      error: mapError ? mapError(error) : error,
      loading: false
    })),
    startWith({loading: true}),
    scan((acc, obj) => ({...acc, ...obj}))
  )
}


export function mapWrapData<T, U>(mapper: (incoming: T) => U): UnaryFunction<Observable<Wrapped<T>>, Observable<Wrapped<U>>> {
  return pipe(
    map((incoming) => {
      if (incoming.data === undefined) {
        return incoming as unknown as Wrapped<U>
      }

      return {
        ...incoming,
        data: mapper(incoming.data),
      };
    })
  );
} 

export interface Wrapped<T> {
  data?: T,
  error?: any,
  loading: boolean
}
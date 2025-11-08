export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends (...args: any[]) => any
      ? T[K]
      : DeepPartial<T[K]>
    : T[K]
};

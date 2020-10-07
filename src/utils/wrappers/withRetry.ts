/**
 * function which calls the wrapped function and runs it again one time if an error is caught
 */
export const withRetry = <R extends ReturnType<T>, T extends () => any>(logic: T) => {
  return async (): Promise<R> => {
    try {
      return await logic();
    } catch (error) {
      return logic();
    }
  };
};

type ApiLoadingListener = (count: number) => void;

let pending = 0;
let listener: ApiLoadingListener | null = null;

export const setApiLoadingHandler = (next: ApiLoadingListener | null): void => {
  listener = next;
  listener?.(pending);
};

export const beginApiLoading = (): void => {
  pending += 1;
  listener?.(pending);
};

export const endApiLoading = (): void => {
  pending = Math.max(0, pending - 1);
  listener?.(pending);
};

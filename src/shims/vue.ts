export const ref = () => ({ value: undefined });
export const watch = () => {};
export const onUnmounted = () => {};
export const computed = (fn: () => unknown) => ({ value: fn() });
export const onMounted = () => {};

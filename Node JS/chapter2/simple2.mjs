let count = 0;
export const next = () => ++count;
const squared = () => Math.pow(count, 2);
export const hello = () => "Hello world!";

export default () => count;

export const meaning = 42;
export let nocount = -1;
export { squared };

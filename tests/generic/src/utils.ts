const array: string[] = [];
const array2: Array<string> = [];

console.info(array, array2);

export async function fetchData() {
  var ciao = 1;
  console.info(ciao);
  // Missing `await` for the promise returned by `fetch`
  return fetch('/data');
}

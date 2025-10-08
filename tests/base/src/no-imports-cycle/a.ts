// biome-ignore lint/style/noExportedImports: testing cycle
import { B } from './b.ts';

const btype = typeof B;
btype.slice();

export const A = 'a';

export { B };

// biome-ignore lint/style/noExportedImports: testing cycle
import { B } from './b.ts';

typeof B;

export const A = 'a';

export { B };

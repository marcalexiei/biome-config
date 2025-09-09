// should return no error
function importOriginal<T>(): Promise<T> {
  return Promise.resolve({} as T);
}

function mock(s: string, f: () => unknown): void {
  typeof s;
  typeof f;
}

const ThemeContextProvider = 'a';
const useThemeContext = 'a';

importOriginal<{
  ThemeContextProvider: typeof ThemeContextProvider;
  useThemeContext: typeof useThemeContext;
}>().catch(() => {});

mock('../../components/App/AppPage404', () => ({
  AppPage404: '',
}));

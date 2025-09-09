# `@marcalexiei/biome-config`

[![CI][CIBadge]][CIURL]
[![Formatted with Biome][CodeStyleBadge]][CodeStyleURL]
[![npm version][npmVersionBadge]][npmVersionURL]
[![issues][issuesBadge]][issuesURL]

[CIBadge]: https://img.shields.io/github/actions/workflow/status/marcalexiei/biome-config/ci.yml?style=for-the-badge&logo=github&event=push&label=CI
[CIURL]: https://github.com/marcalexiei/biome-config/actions/workflows/ci.yml
[CodeStyleBadge]: https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=for-the-badge&logo=biome
[CodeStyleURL]: https://biomejs.dev/
[npmVersionBadge]: https://img.shields.io/npm/v/@marcalexiei/biome-config.svg?style=for-the-badge&logo=npm
[npmVersionURL]: https://www.npmjs.com/package/@marcalexiei/biome-config
[issuesBadge]: https://img.shields.io/github/issues/marcalexiei/biome-config.svg?style=for-the-badge
[issuesURL]: https://github.com/marcalexiei/biome-config/issues

## Getting started

1. Install required dependencies

   ```sh
   npm install --save-dev @biomejs/biome @marcalexiei/biome-config
   ```

2. Create a `biome.json` configuration file

   ```json
   {
     "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
     "extends": ["@marcalexiei/biome-config/base"]
   }
   ```

> [!NOTE]
> It turns out that when you “extend” a base config that only supplies linter.rules,
> you end up dropping the default `linter.domains: { project: "all" }`,
> so your `useImportExtensions` never actually runs on your files.
>
> Be sure to override them on your end
>
> ```json
> {
>   "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
>   "extends": ["@marcalexiei/biome-config/base"],
>   "linter": {
>     "domains": {
>       "project": "all"
>     }
>   }
> }
> ```

## Additional configs

There additional configs that can be used:

- `react`
- `css`

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    "@marcalexiei/biome-config/base",
    "@marcalexiei/biome-config/react",
    "@marcalexiei/biome-config/css",
  ]
}
```

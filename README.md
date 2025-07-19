# `@marcalexiei/biome-config`

[![CI][CIBadge]][CIURL]
[![Formatted with Biome][CodeStyleBadge]][CodeStyleURL]
[![npm version][npmVersionBadge]][npmVersionURL]
[![issues][issuesBadge]][issuesURL]

[CIBadge]: https://github.com/marcalexiei/biome-config/actions/workflows/CI.yml/badge.svg
[CIURL]: https://github.com/marcalexiei/biome-config/actions/workflows/CI.yml/badge.svg
[CodeStyleBadge]: https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome
[CodeStyleURL]: https://biomejs.dev/
[npmVersionBadge]: https://img.shields.io/npm/v/@marcalexiei/biome-config.svg?style=flat-square
[npmVersionURL]: https://www.npmjs.com/package/@marcalexiei/biome-config
[issuesBadge]: https://img.shields.io/github/issues/marcalexiei/biome-config.svg
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
     "extends": ["./node_modules/@marcalexiei/biome-config/configs/base.json"],
   }
   ```

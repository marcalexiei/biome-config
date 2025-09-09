import fs from 'node:fs/promises';
import process from 'node:process';

/**
 * ```sh
 * node ./scripts/get-rules.ts Nursery
 * ```
 */

const availableGroups = [
  'A11y',
  'Complexity',
  'Correctness',
  'Nursery',
  'Performance',
  'Security',
  'Style',
  'Suspicious',
];

const [, , groupName] = process.argv;

if (typeof groupName !== 'string' || !availableGroups.includes(groupName)) {
  throw new Error(
    ['Invalid group. Available groups:', ...availableGroups].join('\n'),
  );
}

const configSchema = JSON.parse(
  await fs.readFile(
    'node_modules/@biomejs/biome/configuration_schema.json',
    'utf-8',
  ),
);

const configBase = JSON.parse(await fs.readFile('configs/base.json', 'utf-8'));
const configCSS = JSON.parse(await fs.readFile('configs/css.json', 'utf-8'));
const configReact = JSON.parse(
  await fs.readFile('configs/react.json', 'utf-8'),
);

const rules = Object.keys(
  configSchema.definitions[groupName].properties,
).filter((it) => !['recommended'].includes(it));

const missingRuleNames: Array<string> = [];

const ignoredRules = [
  // Correctness
  'noChildrenProp',
  'noNodejsModules',
  'noPrivateImports',
  'noProcessGlobal',
  'noRenderReturnValue',
  'useIsNan', // default enabled
  'noVoidTypeReturn', // default enabled
  'noSolidDestructuredProps', // solid

  // Nursery
  'useSortedClasses', // WIP https://biomejs.dev/linter/rules/use-sorted-classes/
  'noNestedComponentDefinitions',
  'noNoninteractiveElementInteractions',
  'noRestrictedElements',
  'useReadonlyClassProperties',
  'noUnresolvedImports', // typescript already handle this
  'useSolidForComponent', // solid

  // identify `swaggerObject` and `createJsonSchemaTransformObject - OpenAPI 2.0 is not supported` as potential secrets
  // https://github.com/biomejs/biome/issues/4113
  'noSecrets',

  'noVueReservedProps',
  'noVueDataObjectDeclaration',
  'noVueReservedKeys',
  'useVueMultiWordComponentNames',

  'noNextAsyncClientComponent', // next
  'noUnwantedPolyfillio', // next
  'useGoogleFontPreconnect', // next

  'noDestructuredProps', // solid
  'useForComponent', // solid

  'useNamedOperation', // graphql

  'useUniqueElementIds', // react

  'noQwikUseVisibleTask', // qwik
  'useImageSize', // qwik
  'useQwikClasslist', // qwik

  // Style
  'noDoneCallback',
  'noEnum',
  'noHeadElement',
  'noImgElement', // next
  'noParameterProperties',
  'noProcessEnv',
  'noRestrictedGlobals',
  'noRestrictedImports',
  'noRestrictedTypes',
  'useDeprecatedReason',
  'useComponentExportOnlyModules', // react
  'useNodeAssertStrict',

  // Suspicious
  'useDefaultSwitchClauseLast', // default enabled
  'noMisrefactoredShorthandAssign', // default enabled
  'noOctalEscape', // default enabled
  'noMisleadingCharacterClass', // default enabled
  'noIrregularWhitespace', // default enabled
  'noLabelVar', // default enabled
  'noImportAssign', // default enabled
  'noImplicitAnyLet', // default enabled
  'noGlobalIsFinite', // default enabled
  'noFallthroughSwitchClause', // default enabled
  'noExtraNonNullAssertion', // default enabled
  'noEmptyInterface', // default enabled
  'noEmptyBlock', // default enabled
  'noWith', // default enabled
  'noSelfCompare', // default enabled
  'noQuickfixBiome', // not needed

  'noDocumentImportInPage', // next
  'noHeadImportInDocument', // next

  'noDuplicateFields', // graphql

  'noReactSpecificProps', // solid

  'noImportantInKeyframe', // css default enabled
];

for (const ruleName of rules) {
  const configGroupBase = configBase.linter.rules[groupName.toLowerCase()];
  const configGroupCSS = configCSS.linter.rules[groupName.toLowerCase()];
  const configGroupReact = configReact.linter.rules[groupName.toLowerCase()];

  if (!(configGroupBase || configGroupCSS || configGroupReact)) {
    console.error(`Rules group ${groupName} not found`);
    process.exit();
  }

  if (ignoredRules.includes(ruleName)) {
    continue;
  }

  const configGroup = {
    ...configGroupBase,
    ...configGroupCSS,
    ...configGroupReact,
  };

  if (!configGroup[ruleName]) {
    missingRuleNames.push(ruleName);
  }
}

if (missingRuleNames.length === 0) {
  console.info(`All rules has been configured for ${groupName}`);
} else {
  console.info(
    [
      `The following ${groupName} rules are not configured`,
      ...missingRuleNames,
    ].join('\n'),
  );
}

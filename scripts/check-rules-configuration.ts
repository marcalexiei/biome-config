import fs from 'node:fs/promises';
import process from 'node:process';

/**
 * ```sh
 * node ./scripts/check-rules-group-configuration.ts GROUP
 * ```
 */

function log(
  type: 'info' | 'error' | 'success' | (string & {}),
  ...others: Array<unknown>
) {
  let icon: string | undefined;
  switch (type) {
    case 'info':
      icon = 'ℹ️';
      break;

    case 'error':
      icon = '❌';
      break;

    case 'success':
      icon = '✅';
      break;

    default:
      throw new Error('Invalid type for log');
  }

  // biome-ignore lint/suspicious/noConsole: logger function
  console.log(icon, ...others);
  return;
}

const [, , groupName] = process.argv;

const availableGroups = [
  // 'A11y',
  'Complexity',
  'Correctness',
  'Nursery',
  'Performance',
  'Security',
  'Style',
  'Suspicious',
] as const;

async function checkRulesGroupConfiguration(
  groupName: (typeof availableGroups)[number],
): Promise<boolean> {
  if (typeof groupName !== 'string' || !availableGroups.includes(groupName)) {
    log(
      'error',
      ['Invalid group. Available groups:', ...availableGroups].join('\n'),
    );
    return false;
  }

  const configSchemaContent = await fs.readFile(
    'node_modules/@biomejs/biome/configuration_schema.json',
    'utf-8',
  );

  const configSchema = JSON.parse(configSchemaContent);

  const configBase = JSON.parse(
    await fs.readFile('configs/base.json', 'utf-8'),
  );
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
    'noNodejsModules', // should be set by user
    'noSolidDestructuredProps', // solid

    // Nursery
    'useSortedClasses', // WIP https://biomejs.dev/linter/rules/use-sorted-classes/
    'noNestedComponentDefinitions',
    'noNoninteractiveElementInteractions',
    'noRestrictedElements',
    'useReadonlyClassProperties',
    'noUnresolvedImports', // typescript already handle this

    // identify `swaggerObject` and `createJsonSchemaTransformObject - OpenAPI 2.0 is not supported` as potential secrets
    // https://github.com/biomejs/biome/issues/4113
    'noSecrets',

    'noVueReservedProps', // vue
    'noVueDataObjectDeclaration', // vue
    'noVueReservedKeys', // vue
    'useVueMultiWordComponentNames', // vue

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

    'useSolidForComponent', // solid

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
    'noDocumentImportInPage', // next
    'noHeadImportInDocument', // next

    'noDuplicateFields', // graphql

    'noReactSpecificProps', // solid
  ];

  for (const ruleName of rules) {
    const configGroupBase = configBase.linter.rules[groupName.toLowerCase()];
    const configGroupCSS = configCSS.linter.rules[groupName.toLowerCase()];
    const configGroupReact = configReact.linter.rules[groupName.toLowerCase()];

    if (!(configGroupBase || configGroupCSS || configGroupReact)) {
      log('error', `Rules group ${groupName} not found`);
      process.exit(1);
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
    log('success', `All rules has been configured for ${groupName}`);
    return true;
  }

  log(
    'error',
    [
      `The following ${groupName} rules are not configured`,
      ...missingRuleNames.map((it) => `  - ${it}`),
    ].join('\n'),
  );
  return false;
}

for (const group of availableGroups) {
  const result = await checkRulesGroupConfiguration(group);
  if (!result) {
    process.exit(1);
  }
}

process.exit(0);

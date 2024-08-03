# Contributing

## Feedback

If you would like to leave a review for the extension in the marketplace, leave it [here](https://marketplace.visualstudio.com/items?itemName=SixPivot.sixpivot-release-dashboard&ssr=false#review-details)

### Reporting bugs

Please report bugs in GitHub.  

Include:

- Reproduction steps.
- Any relevant information about your project's pipelines and setup.
- Browser, preferably with a version number.
- Screenshots or capture if applicable.

### Contributing Code

Code contributions can be made via pull requests, and we prefer the [shared repository model](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models#shared-repository-model). Just make a branch in this repo, name it after the topic, and create a PR.

For a background on contributing to open source, you can read the [github guide](https://opensource.guide/how-to-contribute/).

#### Pull Requests

A few disclaimers: We might not have time to review and merge your pull request 😐 Our review might have feedback that we can't help with - but we will try!

If you do make a PR:

- Make it as small as possible.
- Keep it focussed around a single feature or bug.
- Include a screenshot if applicable.
- PR should contain a summary of the changes.
- PR should explain any new packages, configuration and in general note any technical decisions that were made.

## Practices and Principles

Be pragmatic, keep it as simple as possible (but no simpler), and keep to the following practices unless there is a very good reason not to.

### Code style and format

- eslint (recommend to use the vscode extension)
- prettier (use the git hook provided)

### Naming guidelines

- Use `.ts` for TypeScript files, `.tsx` for TypeScript files that include JSX.
- Use PascalCase for components (eg. `UserProfile` should be in a file named `UserProfile.tsx`).
- For styles and test files, use the same name as the component with the appropriate suffixes (eg. `UserProfile.scss` for style, `UserProfile.test.tsx` for tests).
- User camelCase for utility and helper files (eg. existing `utilities.ts` file).

### Directory structure

- The source code for the project is in the `extension\src` folder.
  - `api` contains the code for interacting with the Azure DevOps API.
  - `dashboard` contains the dashboard feature component of the extension.
  - `settings` contains the settings feature component.
  - `components` contains other components.
  - `telemetry` contains the code for tracking telemetry.
  - `types.ts` contains types used throughout the extension.
  - `utilities.ts` contains utility functions.

### Typescript

- Avoid using `any`.
- Avoid using `var`.
- Use interfaces.
- Write tests.
- Encouraged to use functional React components.

### UI

Microsoft have a set of [guidelines](https://developer.microsoft.com/en-gb/azure-devops/) for developing UIs for Azure DevOps. It's a good idea to familiarise yourself with it so that you can keep the user experience consistent and high quality.

There is a [colour system](https://developer.microsoft.com/en-gb/azure-devops/design-basics/color) which has a clear meaning for the use of colours, and there are a set of SASS variables you can use to keep the colours consistent.

There are also many pre-defined css classes you can use for the various components. Look for details on those in the usage guidelines for the specific component. For example the [table component styles](https://developer.microsoft.com/en-gb/azure-devops/components/table#styles).

- Follow the design guidelines for [colour](https://developer.microsoft.com/en-gb/azure-devops/design-basics/color), [content](https://developer.microsoft.com/en-gb/azure-devops/design-basics/content), [depth](https://developer.microsoft.com/en-gb/azure-devops/design-basics/depth), [shell](https://developer.microsoft.com/en-gb/azure-devops/design-basics/shell), [spacing](https://developer.microsoft.com/en-gb/azure-devops/design-basics/spacing), and [typography](https://developer.microsoft.com/en-gb/azure-devops/design-basics/typography).
- Follow the usage guidelines for all components.

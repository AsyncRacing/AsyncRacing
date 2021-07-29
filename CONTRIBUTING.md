# Configuring your Environment

To contribute to this project, you first must configure your environment.
To do so, follow these steps:

1. `git clone` the repo into your preferred directory
1. `cd` into the repo
1. run `npm install --save-dev`

If you are using VSCode, you can configure the ESLint extention to auto-format your files on save.
Do this to set it up:

1. Install <kbd>ESLint</kbd> from https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

- _\*If your ESLint is not formatting on save correctly within VSCode, check this post: https://stackoverflow.com/a/65071048_

<!-- These philosophies need updating. --->

# Philosophies

## Focus on React component design

- All components must be within their own folder (1 folder per component).
  - A subcomponent is permitted to be within a subfolder of a component folder if it is not used in any other component.
- Each component should have a working storyboard file.
- Each component should have a test file (even if there is no tests in it).
- Each component should link to a CSS file (even if there are no styles in it).

## Maintain an organized directory structure

- The `src/` folder must have a few subfolders to categorize components and other code:
  - pages
  - components
  - assets (such as shared images and shared json)
  - models (for parsing GPS data / GPX and consuming them)

## Pull Requests are required to merge to `master`

- Pull Requests to `master` must have at least reviewer before it can be accepted.
- Pull Requests to `master` must check that all tests are passing before it can be accepted.

## Each Pull Request has its own task on the Projects board

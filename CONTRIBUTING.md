# Configuring your Environment

To contribute to this project, you first must configure your environment.
To do so, follow these steps:

1. `git clone` the repo into your preferred directory
1. `cd` into the repo
1. run `npm install --save-dev`

If you are using VSCode, you can configure the Prettier extention to auto-format your files on save.
Do this to set it up:

1. Install <kbd>Prettier</kbd> from https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
1. With the default configurations from install, Prettier will now use the project rules to format on-save.
1. Git Hooks will watch for Prettier formatting issues on-commit for .ts and .tsx files.

# Philosophies

## Focus on React component design

- All components must be within their own folder (1 folder per component).
  - A subcomponent is permitted to be within a subfolder of a component folder if it is not used in any other component.
  - Subcomponents are not permitted to be nested further than this.
- Each component should have a working storyboard file.

## Maintain an organized directory structure

- The `src/` folder must have a few subfolders to categorize components and other code:
  - pages
  - components
  - assets (such as shared images and shared json)
  - models (for parsing GPS data / GPX and consuming them)
  - examples (for data used only within tests and other dev-related tasks)

## Pull Requests are required to merge to `master`

- Pull Requests to `master` must have at least reviewer before it can be accepted.
- Pull Requests to `master` must check that all tests are passing before it can be accepted.

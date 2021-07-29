# Focus on React component design

- All components must be within their own folder (1 folder per component).
  - A subcomponent is permitted to be within a subfolder of a component folder if it is not used in any other component.
- Each component should have a working storyboard file.
- Each component should have a test file (even if there is no tests in it).
- Each component should link to a CSS file (even if there are no styles in it).

# Maintain an organized directory structure

- The `src/` folder must have a few subfolders to categorize components and other code:
  - pages
  - components
  - assets (such as shared images and shared json)
  - models (for parsing GPS data / GPX and consuming them)

# Pull Requests are required to merge to `master`

- Pull Requests to `master` must have at least reviewer before it can be accepted.
- Pull Requests to `master` must check that all tests are passing before it can be accepted.

# Each Pull Request has its own task on the Projects board

## Project Structure

- `main` branch is the root branch of the project which is intentionally empty. All the playground branches should be created from the `main` branch.
- `playground` branches are the branches that their purpose is to provide the clean code.

## Creating New Playground Instructions

- Checkout the `main` branch.
- Make sure `git status` is clean.
- Create a new branch from the `main` branch with the following naming convention: `playground/XYZ`. For instance, if you're creating a Rect/Next.js playground, you can name the branch `playground/react-next`.
- Now create the new project for `XYZ` for instance if you're creating a React/Next.js playground, you can run `npx create-next-app@latest` to create a new Next.js project.
- Make sure the new folder is created for the new project and the project's files are not in the root of the repository.
- If there are some common changes that you'd like to apply to the playground branches, you can apply them now. For instance for a Next.js playground you might want to apply the following changes:
  - Add some empty directories for instance `_actions`, `_components`, `_types` and so on. To ensure that git will track the directories, you can add an empty `.gitkeep` file to each directory.
  - Remove the default styles from the `globals.css` file.
  - Remove the default template from the main `page.tsx` file and add a simple template instead.
  - Add a `.editorconfig` file to the root of the project to ensure that the code style is consistent. 
- Push the changes to the new branch.

## General Instructions
- `main` branch is meant to be empty and should not be used for development.
- `playground/XYZ` branches usually should not be changed unless there's a common change that you'd want to apply to all the future working branching or if you'd want to upgrade the playground to a different version.
- If you're upgrading the playground to a different version, you can delete the playground branch on git and locally and follow the instructions above to create a new playground.
- In order to use a playground, you can create a new branch from the playground branch for instance if you want to use `playgroun/XYZ`, create `XYZ/some-subject` branch and start working on the new branch.
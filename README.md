## Project Structure

- `main` branch is the root branch of the project which is intentionally empty. All the playground branches should be created from the `main` branch.
- `playground` branches are the branches that their purpose is to provide the clean code.

## Creating New Playground Branch
**Note: Before creating a new playground branch, make sure that you're on the `main` branch and run `git status` to make sure that the working directory is clean.**

---
**Vite Playground - React, Vue, Vanilla JS, Svelte, etc. Assuming the playground is for React:**
  - `git checkout -b react/some-subject`
  - `npm create vite@latest` - https://vite.dev/guide/ - Answer the questions and create the project. For consistency choose `react-playground` as the project name.
  - `cd react-playground`
  - `npm install`
  - `npm run dev`
  - Apply the necessary changes to the project.
  - `git add .`
  - Make sure the `.gitignore` file is filtering out the unnecessary files and folders properly.
  - `git commit -m "Initial commit"`
  - `git push -u origin react/some-subject`

---
**Next.js Playground:**
  - `git checkout -b next/some-subject`
  - `npx create-next-app@latest` - https://nextjs.org/docs - Answer the questions and create the project. For consistency choose `next-playground` as the project name.
  - `cd next-playground`
  - Dependencies will be installed automatically during the project creation.
  - `npm run dev`
  - Apply the necessary changes to the project.
  - `git add .`
  - Make sure the `.gitignore` file is filtering out the unnecessary files and folders properly.
  - `git commit -m "Initial commit"`
  - `git push -u origin next/some-subject`

---
**Python Playground:**
  - `git checkout -b python/some-subject` or if you want it to be more specific: `git checkout -b fastapi/some-subject`
  - Create a new Virtual Environment the same name as the branch name. For instance using conda:
    - `conda create --name python-some-subject`
    - `conda activate python-some-subject`
  - In the root of the repository, create a new subdirectory for the playground. For instance:
    - `mkdir python-playground` or `mkdir fastapi-playground`
  - `cd python-playground` or `cd fastapi-playground`
  - Make sure the correct Virtual Environment is activated.
  - Install python: `conda install python`
  - If you want to install a package, for instance FastAPI, you can use either conda or pip. Check the package documentation for the installation instructions. 
    - For FastAPI: `pip install "fastapi[standard]"` https://fastapi.tiangolo.com/#installation 
  - Anytime that you install a new package, run both of the following commands:
    - `conda env export > environment.yml`
    - `pip list --format=freeze > requirements.txt`
  - Open the app in PyCharm.
  - In the bottom right corner of the PyCharm, set the Python Interpreter to the newly created Virtual Environment.
  - Right-click on the `python-playground` directory and create a new Python File named `main.py` and continue with the development.
  - To run the server `fastapi dev main.py`
  - Although there's a `.gitignore` file in the root but since you shouldn't modify that one you need to create another `.gitignore` file in the `python-playground` directory and make sure it's filtering out the unnecessary files and folders properly.
  - `git add .`
  - `git commit -m "Initial commit"`
  - `git push -u origin python/some-subject`
  - If you want to remove the Virtual Environment:
    - `conda deactivate`
    - `conda remove --name python-some-subject --all`
  - After cloning the repository, you can create the Virtual Environment by running the following command:
    - `conda env create -f environment.yml`
    - In case the above command didn't install the packages: `pip install -r requirements.txt`
    - Make sure to activate the Virtual Environment before running the server.
  - More info: https://hamidbehnam.atlassian.net/wiki/spaces/IN/pages/129400856/FastAPI+Cloud+SQL+Secret+Manager+Auth0


## Creating New Playground Template Branch
### Note: This is for cases that you want to remove a lot of default templates and have a clean codebase. In most cases the deletion is so minimal, you can just create the branch off of the main branch and run the proper command to create the new project and apply those minimal deletions before you commit the code. The advantage is that you won't get stuck with an outdated codebase.

---
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

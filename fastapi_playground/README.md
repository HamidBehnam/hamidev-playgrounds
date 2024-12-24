## FastAPI, GraphQL Playground Template

**Tech Stack:**
- FastAPI
- GraphQL, Strawberry
- Auth0
- Docker
- Google Cloud Run
- Google Cloud SQL
- PostgreSQL
- SQLModel
- Google Secret Manager
  - Note: This project is providing 2 different ways to load the project secret values. One is for the local environment which is loading the secret values from a private repository. The other one is for the Google Cloud Run environment which is loading the secret values from the Secret Manager (Make sure you've exported the path to the service account).

## Creating a new playground from `playground/fastapi` branch:
  - `git checkout playground/fastapi`
  - `git checkout -b fastapi/some-subject`
  - Update the `name` in the `environment.yml` file to the new branch name without `/`, for instance `name: fastapi-some-subject`.
  - cd into the `fastapi_playground` directory and run `conda env create -f environment.yml` to create the Virtual Environment.
  - Make sure to activate the Virtual Environment before running the server.
  - In case the above command didn't install the packages: `pip install -r requirements.txt`
  - Set the Python Interpreter to the newly created Virtual Environment in PyCharm.
  - Go to core/db.py and set the "db" property to the new database name which should be based on the branch name plus `-db` for instance `fastapi-some-subject-db`.
  - Go to the Cloud SQL Instance and create this new database e.g. `fastapi-some-subject-db`. 
  - Use either `make run-local` or `make run` to download the `.env` file and run the server. Note: you can set the `DB_ACTION` param to reset or seed the database before running the server. See the Makefile for more info.
  - The playground also includes the GraphQL integration. You can go to the `<SERVER_URL>/graphql` to see the GraphQL Playground and since it's using the Auth0, you need to pass a valid token in the url as the query param. For instance: `<SERVER_URL>/graphql?token=eyJHsdrfj...`.
  - In order to authenticate or to get the token, you can go directly to the Auth0 dashboard of `dev-5938` tenant, and you can use the `Test` tab of the api to get the token.
    - Since I've created a Postman workspace with the correct Auth0 setting, you can also use the Postman to get the token. The workspace is called `dev-5938`: https://web.postman.co/workspace/dev-5938~00f9cbb5-6e89-41ef-8572-4fa01c26f611/overview
    - In Postman select the environment in the left and then go to the `Authorization` tab and click on the `Get New Access Token` button. This will open a new window where you can get the token. Check the `Current Token` section of the `Authorization` tab, a token might be already available from your previous tests.

## Checking out a previously created playground branch:
  - `git checkout fastapi/some-subject`
  - cd into the `fastapi_playground` directory 
    - run `conda env create -f environment.yml` to create the Virtual Environment, or if the Virtual Environment is already created, activate it.
  - Make sure to activate the Virtual Environment before running the server.
  - In case the above command didn't install the packages: `pip install -r requirements.txt`
  - Set the Python Interpreter to the newly created Virtual Environment in PyCharm.
  - Go to the Cloud SQL Instance and make sure the database that you're using in `db.py` in the `"db"` property exists, if not create it.
  - Use either `make run-local` or `make run` to download the `.env` file and run the server.

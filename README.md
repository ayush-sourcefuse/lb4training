# lb4training

## Install dependencies

You will require a running postgresql service to run the APIs other than the `/role` APIs which is based on in-memory datasource

Once postgresql is available, copy the contents of `.env.defaults` to `.env`

Run `yarn` to install all dependencies.

Run `yarn premigrate` and `yarn migrate` to make the required tables from the Model schemas.

## Run the application

```sh
yarn start
```

Open http://127.0.0.1:3000 in your browser.

## Training topics covered till now

- API to do CRUD operations on Roles model which has an in-memory datasource `db/memodb.json`
- API to do CRUD operations on Customers and Users models, where the relation between these two entities is made as per the task desciption (User belongs to Customer). APIs are available to fetch joined table data.
- Made a custom sequence for the application which logs details of request and response and has the logic to restrict API access to ALLOWED_ORIGINS which we get from the env file. Type definitions for env file are also made in `global.d.ts`
- Implemented winston logger as a provider in a component which is used to log request and response as mentioned above.
- Modified the boot options to load controllers from a different directory (\_controllers)

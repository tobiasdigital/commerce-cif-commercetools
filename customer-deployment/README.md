# CCIF example customer deployment

This folder contains an example customer deployment project. It shows how a customer can create package bindings and packages with web actions/sequences that use the shared action packages available in the [src](../src) folder.

## Quick start

Copy the file `credentials-example.json` and name it `credentials.json`, add your Commercetools credentials in that file, make sure that you currently have a `~/.wskprops` file with the credentials of a user/namespace meant to deploy customer actions (= different than the namespace of the shared action packages), and simply run

`npm install; npm run deploy`

This will create one package for each micro-service (`carts`, `categories`, `customers`, `orders`, and `products`) and will also deploy all the web actions/sequences for each micro-service in a common `commerce` package.

For example, for `products` it will:
* create the package `/ccif-customer/commercetools-products-actions@latest` (in the default `ccif-customer` customer namespace). This is a package binding to the shared package implementing the `products` Commercetools actions. Note that this binding will be configured with the Commercetools credentials defined in `credentials.json`.
* deploy the `products` actions in the `/ccif-customer/commerce` package.

We use the `latest` version for the package binding so that this example customer deployment project always uses the latest available versions of the shared actions. In a real project, a customer should rather point to a particular version to make sure that future changes do not break their deployment. The versions of the package bindings are defined in the `bindings` object in `package.json`. 

To remove all the customer packages and actions, just run `npm run clean`.

## The package.json file

The `package.json` file contains a list of all the package `bindings` that will be deployed. Each binding entry consists of:
* a `namespace`: this is the name of the provider namespace containing the shared (target) package that will be used for the binding
* a `target`: this is the name of the shared (target) package used for the binding

The `package.json` also has:
* a `namespace` property that defines the default namespace of the customer, in which each binding will be deployed. The default value is `ccif-customer`.
* a `package` property that defines the default package that will be created to deploy all the sequences and web actions.

When running the deployment, it is possible to override the customer namespace with `npm run deploy -- --namespace my-namespace`. Note that it is not possible to pass this option to `npm run clean` due to the way `npm` handles extra arguments: if required, one should run `serverless remove --namespace my-namespace; npm run delete-package; npm run unbind-all` to remove all actions and packages in a different namespace than the default namespace defined in `package.json`.

It is also possible to override the target namespace of the bindings without having to edit them in `package.json`, but in this case, the deployment should be done with:
* `npm run bind-all -- --target-namespace the-shared-namespace`
* `npm run create-package`
* `serverless deploy --namespace my-namespace`

## The credentials.json file

This file contains the Commercetools credentials of the customer's project. Simply copy the file `credentials-example.json` and name it `credentials.json`, and add your Commercetools credentials to the file.

## Deployment

The `package.json` file contains a number of scripts that can be used to deploy all package bindings or just one particular binding. This uses a small nodejs program available in the file `index.js`. First install all dependencies with

`npm install`

and then install all bindings and actions with

`npm run deploy`

To remove all bindings, simply use

`npm run clean`

## The serverless.yml file

The `serverless.yml` file contains an example deployment project for the customer. It creates all the web actions/sequences for all the micro-services and actions currently implemented in the shared packages. The `serverless.yml` extracts the `namespace` information and all the `bindings` information from the `package.json` file.

Simply run `serverless deploy` to deploy all actions, and `serverless remove` to remove all actions.

It is also possible to create one deployment file for each micro-service. In this case, one can simply remove all unneeded/unwanted entries from the `serverless.yml` file, for example, to only deploy the actions for the `products` micro-service.

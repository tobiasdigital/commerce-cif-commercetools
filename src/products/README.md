# CCIF products services for commercetools

This package contains the actions of the `/products` API endpoints.

To deploy all the actions in a shared Openwhisk package, make sure that you currently have a `.wskprops` file with the credentials of a user/namespace meant to deploy shared packages, and simply call `npm run deploy-package`.

This will create a shared package called `name@version` where the name and version fields are taken from the current `package.json` file. For example, it would create a shared package called `commercetools-products-actions@0.1.10` at the time of writing this documentation.

It will also create a shared package called `commercetools-products-actions@latest` which always points to the latest version of the actions. This concept is borrowed from the `latest` [tag concept of npm](https://docs.npmjs.com/cli/dist-tag). The `latest` package is used by the [customer-deployment](../../customer-deployment) example project.

To remove all the actions and packages, simply call `npm run remove-package`.

**Important**: the actions in the shared package are not meant to be used directly. A customer should create a package binding with the right Commercetools credentials, and a package with web actions/sequences. See the [customer-deployment](../../customer-deployment) example project to see how a customer would typically use that shared package.

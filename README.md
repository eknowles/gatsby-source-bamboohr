# gatsby-source-bamboohr

A Gatsby source plugin for sourcing data into your Gatsby application
from [bamboohr](https://www.bamboohr.com/).

The plugin creates `BambooEmployee` nodes from files.

## Install

`yarn add gatsby-source-bamboohr`

## How to use

In your gatsby-config.js

```
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-bamboohr`,
      options: {
        subdomain: process.env.BAMBOO_HR_SUBDOMAIN,
        apiKey: process.env.BAMBOO_HR_API_KEY
      },
    },
  ],
}
```

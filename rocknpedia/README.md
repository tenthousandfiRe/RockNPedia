This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Prerequisites

This project needs the following platforms installed and configured in order to work:

1. **Node.js**: This platform has been tested with the version `12.13.0` 
2. **MySQL**: This platform has been tested with the version `8.0` 

#### Database creation
Please execute the commands included in the file [rocknpediaDB.sql](\rocknpedia\server\config).
The default connection parameters are as follows:
````
host: 'localhost',
user: 'root',
password: 'root',
database: 'rocknpedia'
````

### Installing

1. **Server**

Go to the folder `server` and run the following commands

```
npm install
set PORT=3003
npm start
```

The server should be running then.

1. **Client**

Go to the folder `client` and run the following commands

```
npm install
npm start
```

The client should then be running on the default port _(localhost://3000)_

## Built With

### Client

* [CRA](https://github.com/facebook/create-react-app) - Create React Application
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps.
* [Bootstrap](https://getbootstrap.com/) - an open source toolkit for developing with HTML, CSS, and JS.
* [ckEditor](https://ckeditor.com/ckeditor-4/) - an open source toolkit adding Rich Text Format text.
* [starRating](https://www.npmjs.com/package/react-star-ratings) - an open source toolkit that allows to implement a typical stars based rating.
* [immer](https://www.npmjs.com/package/immer) - an open source toolkit that allows to work with immutable state in a more convenient way.
* [sweetalert2](https://sweetalert2.github.io/) - an open source toolkit for nicer windows alerts.
* [Youtube](https://developers.google.com/youtube/v3) - Youtube API for including videos in the App.



### Server
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [JWT](https://jwt.io/) - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.


## Authors

**Emilio Sánchez Cuadros**(https://github.com/Emilio-Sanchez-Cuadros)
**Álvaro Martín Jiménez**(https://github.com/tenthousandfiRe)


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

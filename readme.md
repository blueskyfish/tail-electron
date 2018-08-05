
![Electron With Angular](logo.png)

# Electron With Angular

> A small application using electron and angular. It is a scaffolding example.


## Requirement

* **OS**: Windows, Linux, Mac OSX
* **Node JS** 8 or higher
* **Angular Cli** 6 or higher.
* **Electron** 2 or higher.
* **Typescript** 2.8 or higher.
* **NPM** 5.6 or higher

## Global Install

This nodejs modules must be installed globally

* electron
* electron-builder
* typescript
* wait-on
* npm-run-all

## Develop

There are two possiblies to start the application. Both methods have the live reload of the frontend.

### Separately

Open two terminal windows in the project root directory

**Terminal 1** (Frontend)

```bash
$ npm run start:frontend
```

**Terminal 2** (Backend)

```bash
$ npm run start:backend
```

> Wait to start the backend until the frontend is finish to start.

### All Together

Starting the both parts together

```bash
$ npm start
```



## Application Layout

The application has two parts. The backend is execute with the electron and the frontend is the ui of the application.

The two parts are separated by the source codes. The backend is in the folder `src`. All configuration of the electron building is directly use on the project root directory. The frontend source code is in the directory `frontend`. It is the standard directory and component layout.

### Backend

The backend source code is directly under the project root directory in the folder `src`.

### Frontend

The angular frontend is in the folder `frontend`. It contains the whole things for the ui.

```bash
$ ng new electron-with-angular-frontend --directory=./frontend --prefix=elan -g --skip-install -S --style=scss -v
```

## License

```text
Copyright 2018 BlueSkyFish

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

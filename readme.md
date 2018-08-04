
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

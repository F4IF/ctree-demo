# Collaboration Tree Site Demo

This project is intended to show how the Collaboration Tree hosting site will
work.  The core Collaboration Tree (cTree) framework, which the site is based
on, will be able to function as independent sites or as part of other sites.
Even though this is a demo, the components developed for it should be clean and
complete enough to use for the fully functional site.

This project is based on Google's [Polymer Project](https://www.polymer-project.org/1.0/),
which is a collection of highly polished [web components](https://www.webcomponents.org/).
We chose web components because we want people to be able to easily integrate
cTree elements into existing sites, and Polymer does a lot of the heavy lifting
for creating a modern responsive site.

One aspiration of this project is to follow the "PRPL pattern".  This pattern
allows fast first delivery and interaction with the content at the initial route
requested by the user, along with fast subsequent navigation by pre-caching the
remaining components required by the app and progressively loading them
on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

We've set up a page to showcase the latest code for the demo site at
innovativeFuture.org/ctree-demo.  This is just for development testing purposes
and may not always include the latest code.  If you want to see the latest code
working your best bet is to clone this project and run it on your local machine.

If you're interested in doing more than minor changes, a video introduction to
the project may be helpful.  To request one please email
[contact@innovativeFuture.org](mailto:contact@innovativeFuture.org). If an up to
date video isn't available, a video call may be arranged.

## License
Copyright (c) 2017 Foundation For an Innovative Future (InnovativeFuture.org)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any
later version.

Foundation For an Innovative Future reserves the right to release the
covered work, in part or in whole, under a different open source
license and/or with specific copyleft exclusions.  Such a release
would not invalidate the license for this project, although the
project released with a modified license would not be considered
part of this covered work or subject to the copyleft portions of this
license even if the projects are identical.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Please email contact@innovativeFuture.org for inquiries related to
this license.

## Usage

### Setup

#### Prerequisites

#####  Install Git

	https://git-scm.com/downloads

#####  Install the current LTS version (4.x) of Node.js or newer

	https://nodejs.org/en/download/

#####  Install the latest version of Bower

	npm install -g bower

_**Note:** if you're having trouble installing on Mac, try this:_

> ssudo bower install --allow-root

##### Install [polymer-cli](https://github.com/Polymer/polymer-cli):

	npm install -g polymer-cli

#### Checkout project

##### Open workspace folder in command prompt where you want the project

	cd <WORKSPACE>

##### Clone from GitHub

	git clone https://github.com/F4IF/ctree-demo.git

##### Open command prompt to folder of project

	cd ctree-demo

##### Insall 3rd party dependencies

	bower install

#### Recommended development environment

##### Install Atom

	https://atom.io

##### Install packages (File > Settings > Install)

* atom-ternjs
* minimap
* auto-detect-indentation
* autoclose-html
* lint checking
** linter
** linter-eslint
** linter-csslint
** linter-flow
* other favorite packages
** https://www.sitepoint.com/10-essential-atom-add-ons/
** https://medium.com/@satya164/supercharged-javascript-development-in-atom-ea034e22eabc


### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve


### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a service-worker.js file with code to pre-cache the
dependencies based on the entrypoint and fragments specified in `polymer.json`.
The minified files are output to the `build/unbundled` folder, and are suitable
for serving from a HTTP/2+Push compatible server.

In addition the command also creates a fallback `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

    polymer build

### Test the build

This command serves the minified version of the app in an unbundled state, as it would
be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app generated using fragment bundling:

    polymer serve build/bundled

### Extend

We can extend the app by adding more elements that will be demand-loaded
e.g. based on the route, or to progressively render non-critical sections
of the application.  Each new demand-loaded fragment should be added to the
list of `fragments` in the included `polymer.json` file.  This will ensure
those components and their dependencies are added to the list of pre-cached
components (and will have bundles created in the fallback `bundled` build).

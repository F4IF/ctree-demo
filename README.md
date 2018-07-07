# Collaboration Tree

The Collaboration Tree (cTree) is a new web technology aimed at facilitating
more productive discussions around a specific topic, usually a goal or problem
to solve.  Initially the goal is to help nonprofits communicate more effectively
with their communities, but the potential uses stretch far beyond that.  Other
community based web technologies like forums and wikis can be used at small
scales, but are less useful for larger topics or groups.  Collaboration Trees
will allow the quick interactions most users are accustomed to, while maximizing
the usefulness of their interaction and organizing the larger discussion.

With Collaboration Trees, all points are tied together, and by default can all
be traced back to a core point, like a specific topic or problem to solve.  Each
point can be updated and improved by the community, similar to a wiki, but
unlike most wikis, the highest rated version wins and is shown by default.
Alternate versions are easily available and can be individually discussed and
rated.  The type of data in each point is pluggable, with initial defaults of
text and images.  Feedback with supporting content like quotes or links to
supporting information are ranked higher by default.

Eventually the project will leverage AI to intelligently suggest things for
users to interact with that interest them, match their stated and observed
strengths, and can have a meaningful impact on the discussion.  For example,
users who often provide useful feedback on new ideas may be more likely to see a
new idea nobody has given feedback on.  Another example would be if a user tends
to rate things in a way that matches most other users or users of a specific
group, their ratings would be more valuable and they'd be more likely to see
something which hasn't been rated before it's potentially shown to other users.

While the project is open source and can be integrated into any website, the
goal is to also create a hub site where all public cTrees can be found.  This
will help with discovery as well as evangelize the use of the technology both on
the hub site and on unaffiliated sites.  At its peak, the largest cTrees will
likely develop their own sub-communities with their own input plugin sets.

## Site Demo

This specific project is intended to show how the Collaboration Tree hub site
will work.  The goal is to have a functional front-end demo where users can put
in real data and give feedback on what works and what doesn't about the
structure.  Broad browser support, the intelligent suggestion backend, and some
other low priority features are out of scope for this demo.  Even though this is
a demo, the components developed for it will be the foundation for the full hub
site and should be clean and complete enough to use in production.

## Technology (Polymer Web Components & beyond)

This project is based on Google's [Polymer Project](https://www.polymer-project.org/1.0/),
which is a collection of highly polished [web components](https://www.webcomponents.org/).
We chose web components because we want people to be able to easily integrate
cTree elements into existing sites, and Polymer does a lot of the heavy lifting
for creating a modern responsive site.  Web components have also grown to be a
true web standard, with broad native browser support.

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

# Getting Started

We've set up a page to showcase the latest code for the demo site at
http://demo.ctree.org.  This is just for development testing purposes
and may not always include the latest code.  If you want to see the latest code
in action, your best bet is to clone this project and run it on your local
machine.  Keep in mind that it's a work in progress, with lots of randomly
generated data and bugs on some platforms.  Try not to be thrown off by the
random data, and instead focus on the features and structure of the web app.

### Verified Configurations Working

#### Windows

Chrome

#### Android

Chrome

## Community

The preferred method of communication for the community is our
[Slack group](slack.ctree.org).  There are also regular events held in
[Los Angeles, CA](meetup.ctree.org) and [online](eventbrite.com/e/37789071129)
to encourage contributors to set aside time to work on the project.  If you're
interested in starting events in your area please email
[contact@innovativeFuture.org](mailto:contact@innovativeFuture.org).  There are
also [Facebbok](facebook.ctree.org) and [Twitter](twitter.ctree.org) sites where
you can keep up with the project, as well as a [LinkedIn](linkedin.ctree.org)
organization you can list on your profile if you're a regular contributor.

## Teams

Because of the size of the project, issues are broken down into teams.
Contributors looking to bolster their resume may find it more useful to pick a
team to work with so they can point to that specific work rather than specific
changes or the project as a whole, though there's no requirement to work on
issues for a single team.  The current teams are:

### Landing Page

This team is responsible for implementing a new landing page will be shown to
users when first opening the site.  It's a way to introduce the technology to
people who aren't familiar with it and help them get started with the site.
This is a high priority part of the project, required before we can start alpha
testing.

### Backend

This team is responsible for implementing the database to hold and access all
user and collaboration tree data.  For the alpha version this means duplicating
the randomly generated data structures and interfaces and backing them with a
real online database, likely Firebase due to native Polymer support.  This is a
high priority part of the project, required before we can start alpha testing.

### Visualization

One of the core ideas behind Collaboration Trees is that contributors can
quickly contribute by skimming suggested elements.  This makes reviewing the
most popular elements and overall structure of the tree more difficult for
anyone trying to watch the progress of the tree or check for an answer if a
question or problem was used as the seed for the tree.  This team is responsible
for creating and integrating different visualizations of the overall data.  This
will aid alpha testing, but is not yet a requirement before it begins.

### Element

Elements are the individual pieces which make up all Collaboration Trees,
similar to comments in a forum or pages on a wiki. Because of this, elements
require more work, which has been divided into sub-teams.

#### New Element

This team is responsible for implementing everything required to create new
elements, whether they're the first element for a new Collaboration Tree, a new
element related to another element, or a new element which needs to be linked to
another element.  This also includes the important task of looking for other
existing elements which may be similar and suggesting them to the user to try
and reduce duplicates.  Because this is required for building cTrees, the core
functionality is required before we can start alpha testing.

#### Element Details

This team is responsible for the core details screen of the element dialog.  The
core functionality is already implemented, but can be improved to be more
intuitive.  This team is also responsible for adding additional types of input
for elements via the pluggable structure.

#### Element Feedback

Feedback is a core component for Collaboration Trees, being supported for each
element variation as well as each variation of each piece of an element.  This
team is responsible for making the element dialog's feedback screen fully
functional, including listing, sorting, and adding feedback.  One unique feature
of cTree comments is that supporting data, like images, quotes, or studies, is
encouraged by increasing their visibility when included.  This team is also
responsible for the up/down vote functionality supported both on the feedback
screen and details screen of the element dialog.

#### Element Contributors

Elements list a summary of top contributors on their preview and details screen,
which takes the user to a summary of all contributors and their contributions to
the element.  This team is responsible for both the summary and page listing all
contributors.

### User Dialog

This team is responsible for the dialog listing information for and about users.
The dialog will contain information to allow users to review a summary of their
contributions as well as update their public and private account information.
This team will not be responsible for implementing the temporary accounts used
for alpha testing, but may build on it to implement the dialog.

## Usage

### Setup

#### Prerequisites

#####  Install Git

	https://git-scm.com/downloads

#####  Install the current LTS version (4.x) of Node.js or newer

	https://nodejs.org/en/download/

#####  Install the latest version of Bower

	npm install -g bower

##### Install [polymer-cli](https://github.com/Polymer/polymer-cli):

	npm install -g polymer-cli

_**Note:** if you're having trouble installing on Mac, try this:_

> sudo npm i -g polymer-cli --force --unsafe-perm=true --allow-root

#### Checkout project

##### Open workspace folder in command prompt where you want the project

	cd <WORKSPACE>

##### Clone from GitHub

	git clone https://github.com/F4IF/ctree-demo.git

##### Open command prompt to folder of project

	cd ctree-demo

##### Insall 3rd party dependencies

	bower install

_**Note:** if you're having trouble installing on Mac, try this:_

> sudo bower install --allow-root

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

This command serves the app at `http://localhost:8081` and provides basic URL
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

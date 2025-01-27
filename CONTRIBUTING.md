Hello! Thanks for taking an interest in contributing to our OSRS DPS calculator. This document serves as some general guidelines on how to contribute.

## What can you contribute?
✅ We're looking for these types of contributions:
* Changes to incorrect calculator logic (preferably with some evidence)
* New additions to calculator logic (preferably with some evidence)
* CSS improvements, provided they don't change the core user experience

❌ Generally, we're not going to accept these types of contributions:
* Major changes to the core user experience and user interface
* Code style changes, or any kind of Prettier-esque automated change
* Additions or changes to code comments
* Changes to text in this file, the README, or the LICENSE file

## How to contribute
* Create a fork of this repository and make your changes on a new branch
* Create a pull request against the `main` branch of this repo
* Provide justification in your PR for your change

By contributing to this repository, you agree that your code will be available under this project's [license](/LICENSE).

### Project structure
The web app is contained inside the `src/app` directory. This project uses [Next.js 13's app routing structure](https://nextjs.org/docs). We opt to use TailwindCSS heavily in this project rather than writing CSS, but there is a `src/styles/global.css` file containing some styling.

The `src/lib` directory contains the "core" code for the calculator itself. This code is heavily based on [some psuedocode](https://oldschool.runescape.wiki/w/RuneScape:Sandbox/combat_pseudocode) written collaboratively by the community.

### Scripts
The `scripts` directory contains several Python 3 scripts that are used for generating the dataset required by this appliocation.

* `generateEquipment.py` fetches applicable equipment from the OSRS Wiki and saves the output as JSON. It also downloads each equipment image to the local directory.
* `generateMonsters.py` fetches monsters from the OSRS Wiki and saves the output as JSON. It also downloads each NPC image to the local directory.

Where possible, we prefer serving images direct from the web app instead of the wiki for a few reasons. The main reason is that because the wiki can be edited by users, it is very easy for a user editing the wiki to break the functionality of this app by renaming or changing a file.

### Running locally
First, install dependencies with `yarn` (our package manager of choice). Then, run the development Next.js server running `yarn dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building the app
This web app is written with the intention of being statically exported as HTML, and served from Google Cloud Storage. As a result, the use of some Next.js functionality such as `next/image` is avoided.

To build the app, run `yarn build`. It will export static HTML to the `out` directory.

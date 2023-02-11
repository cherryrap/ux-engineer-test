# UX Engineering Test

## A challenge for UX engineers

While this app does technically work it is lacking in both UI design and UX. That's where you come in!

For this test you will be updating the design and applying whatever CSS wizardry you think would make it better.

We will be looking specifically at what you choose to do and how you choose to do it. 

Feel free to use libraries like Tailwind. You might also want to move some of the components into their own files/folders.

## Submitting your solution

Clone this repository and set up your own, new repository as the origin remote. 

Once your remote repository is ready, add @ckortekaas and @nathanhoad and let us know that you've completed the challenge.

## Your comments

----

Given that I had tight time restraints 
1) a have only a few hours a day after work,
2) this test should to be handed over as soon as possible.

That is why I chose the practices that are in my current habit / active memory (scss, hooks, class, lodash, Typescript for props and data from APIs) -> quicker for me to dive in with

Given my intentions:
1) to "show-off" my coding skills,
2) to show that I'm flexible and I don't have ego or prejudices about using any of coding practices.

That is why, I used not a single approach / practice in the project, but a variety of such:
- some hooks,
- some Class components (Input),
- some plain functional components (in "components" folder mostly),
- some sorting of data (with lodash),
- some css and also some scss (I used BEM, but I'm also worked with styled Components, bootstrap, antd library),
- usage of mixins, flex, concuting style classes, modifiers, some animation (Input, Loader),
- usage of refs and cross-browser/device optimization (focus/blur/refs in Input),
- some animation (Loader and ShowCards scaling),
- some cross-browser stuff (Input),
- mixins and constants in scss.

For instance, I did not chose Tailwind / bootstrap / antd because 
1) time, for me it's quicker to use plain scss (as I've been working that way in my current job),
2) bundle sizes, my choice was comparably not that heavy (I chose to import lodash, sass, b_, className instead). 

If given some background and goal -> what this App intends to achieve and what are our limitations, I'd prioratise the below mentioned improvements in a certain way. It could be SEO visibility or a selling landing with call to action or smth else or zero bugs.

As for UX:
- store sorter preferences in LS and use them for a user's next visit,
- add extra sorter (for instance bultiple select with genres or languages) or change the existing one,
- add dynamic filtering of data along with adding a filter / filters
- add pagination -> infinate scroll or "show more button" 
- add breadcrumbs,

As for UI:
- improve the error screen and show the error code,
- improve the choice of colors / fonts / shadows / borders -> (I was doing on the go w/o UI kit, but here could be a well thought through typography / brand indentity / etc) 
- improve cross-browser/device appearance (for instance, right now there are ugle default scrolls)
- replace dynamically a few photos (at least 2 mobile/sesktop) depending on screen size 

As for code:
- improve error handling in API calls,
- move Single, Plural, Error into "pages" folder along with making them as separate pages,
- add some eslint rules and babel plugins (code much prettier, Dx would be better, and w/o extra time spend),
- improve basic staff (logos, reset css in the route index.js)
- make further impovements on folder tree and modularity of code base,
- add helpers (helper functions) for repetative use (2+ times) of some functionality,
- have different URI for each content / use router,
- add useEffect in App.js with API call when ComponentDidMount, so that user would see some cards upon the first entry
_...feel free to add any comments or thoughts in this section..._

----

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


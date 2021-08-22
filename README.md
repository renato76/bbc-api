# bbc-api

BBC API Demo


## Instructions

To get started:
* Install dependencies `npm i`
* Start The App `npm start`


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Separately whilst app is running, 
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cy:open`

This launches Cypress End-to-End testing
It will initially launch a pop upo window which should contain a link called "todo.spec.js"
Clicking that will start the cypress test which will open up a browser windiw and run the test.


## **My Approach:** 

* Use create react app
* Build mobile first, then extend to laptops and larger screens
* Used single stylesheet for ease 
* Add some unit tests
* Add some E2E Testing 



## **Challenges:** 

Filtering data as per requirements was challenging. I managed to eventually get it to filter results based on words contained in the post decriptions. 

It would be great to also be able to filter by tags and by user first names etc.


## **Wins:** 

We do have some search functionality which is good.

Displaying each user search term was good, I would also like to add functionality that re runs that search onClick, I think given a bit more time this would not be difficult. 

I am happy with the UI in general and with getting some unit tests and cypress end 2 end test to work.


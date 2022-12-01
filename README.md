# journal-your-heart

## story-board

### Story

As a user I would like to create a new session with a selected number of random prompts from different session-types. I can change the choosen prompts, that I don't want to use. When all prompts are ok, I can save and start the session

#### Scenario: Choosing number of Prompts per Session-Type

GIVEN: that I navigate to the / route page
WHEN: I enter the page
THEN: a listing of session-types with the number of available prompts in this session-type
AND: there will be an imput field for each session-type, where I can choose a number between 0 and the available number of prompts for this session-type.
AND: the sum of choosen prompts is displayed
AND: there is a button to create the session
AND until the sum of choosen prompts is 0 the button is disabled.

#### Scenario: Choose Prompts

GIVEN: that that I navigate to the / route page and have choosen at least 1 prompt
WHEN: I click the button to create the session
THEN: the choosen number of prompts for the session-types is shown as cards
AND: I can decide if I don't want to use them and click on a small x-button to replace this prompt-card with a new random one of the same session-type.
AND: when I like the choosen prompts I can save the session with the actual date and the state of notFinished

#### Scenario: Start Session

GIVEN: that that I navigate to the / route page and have saved the session
WHEN: I enter the page
THEN: I see a bigger card of the first prompt of the session
AND: when I have answered it, I can click on a small ok-button and the next prompt will be displayed and the state of the question will be set to answered
AND: when I want to skip the question, I can click on a small skip-buton and the next prompt will be displayed
AND: when I want to stop the session for now I can click on a button and the state of the session will be saved as notFinished
AND: when I have finished the session with all prompts, the session will be saved as finished.

#### Scenario: Restart a saved session, print a saved session

GIVEN: that that I navigate to the / route page and have saved sessions
WHEN: I enter the page
THEN: I see a button "Saved Sessions"
AND: when I click this button I see a list of all saved sessions with the date, number of prompts in this session and how many are not answered.
AND: I can choose a session by click on this session
AND: if there are not answered prompts I can decide if I want to restart the session or only want to the unanswered ones.
AND: there is button that I can save the session as pdf to print the session

### Story: Manage Journal your Heart

As a registered user I want to delete finished sessions, create new session-types and add new prompts to session. I also want to import prompt-lists to the data-store.

#### Scenario: Manage finished sessions

#### Scenario: Add new session-types

#### Scenario: Add new prompts

#### Scenario: Import new prompts for a specific session-type

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

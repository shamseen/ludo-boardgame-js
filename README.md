# Ludo - In Your Browser!

*inspired by the game [Ludo](https://en.wikipedia.org/wiki/Ludo_(board_game)), derived from Pachisi - originally developed in India circa 6th century C.E.*

___
## Game summary
 
 Ludo is a strategy board game for 2 - 4 players (here, we will have 2). Each player has 4 tokens and rolls two dice.
 
 1. Sequence of turns: Red - Yellow - Green - Blue
 2. All tokens stay in player bases. Players can add a piece to the board by rolling a 6 on one die face.
 3. If a player has multiple pieces on the board, they will get to choose which piece to move.

 **Win condition:** The first that gets all four tokens to home!

 **Features:** a button to roll the dice, a card with buttons for Rule 3, notifications at the bottom for each new move from every player.

<details>
    <summary>Rules to be implemented</summary>
    4. If player A's token lands on the space of player B's token, token B must return to the base :(
    5. Players can split their rolls by die face: if it is a 6 + 2, players can choose which piece moves 2, which moves 6 (or enters the board). 
</details>

___
## App specs
- First refactored the whole thing to be a react app (copy/pasting HTML)

- Then followed the `boardgame.io` tutorial for a simple 2-player, local game.

- Finally, extracted HTML to JSX and reorganized component structure (involving a lot of not-so-great practices 😬) <= this is where most of my time went

### Planning:
- Feature / bug tracking through Github Projects / Issues
- CSS grid mockup using [Layoutit Grid](https://grid.layoutit.com/)
     <details>
    <summary> diagram </summary>
    ![Grid diagram](/markdown/img/ludo-grid.png?raw=true)
    </details>

- Game state setup

    ![Grid diagram](https://camo.githubusercontent.com/8dac142d04660d400c30e061be7a0674a5f8b77bde4f11a34f40e8a89bdd40f3/68747470733a2f2f6d65726d6169642e696e6b2f696d672f65794a6a6232526c496a6f695a334a686347676756455263626941674943424857317769523246745a53426b5a575a70626d6c306157397549436877624746706269424b55796c63496c30674c53302d49464e6258434a545a584a325a5849674b48427359576c75494570544b5677695856787549434167494563674c53302d49454e6258434a47636d39756443316c626d51675932396b5a53416f6257463549476c75593278315a475567536c4e594b56776958534973496d316c636d3168615751694f6e73696447686c625755694f694a6b5a575a6864577830496e3073496e56775a4746305a55566b61585276636949365a6d467363325639)

### Technologies used:
- SCSS: CSS Grid, Flexbox, animation, media query, mixins, variables
- React / Node: components, array methods, custom classes, callbacks, event listeners, esm node server
- [Material-UI](https://material-ui.com/): component library that supplied the cards, buttons, alerts, and icons.
- [`notistack`](https://www.iamhosseindhv.com/notistack): library that pushes multiple snackbar notifications on top of each other
- [`boardgame.io`](https://boardgame.io/): API/framework that manages game state and integrates multiplayer functionality
- [Websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API): API that allows for two-way communications between clients via a server.

___


## Lessons/Ongoing Issues
[] Notifications are showing the wrong player name

[] Showing the choice card shifts the board rightward

### Pride
- While this isn't how they *want* us to use it, I used the `bgio` framework's handling of possible moves to be almost a method for their game state

- w e b s o c k e t

# Pandemic
*inspired by the board game Pandemic by Matt Leacock, &copy; 2019, Z-Man Games*  
___
![Pandemic Box](https://www.boardgameresource.com/wp-content/uploads/2018/11/pandemic-box.jpg)
___
Pandemic is a cooperative strategy game where multiple players work to cure four dangerous diseases before they take over the world. In this adaptation, two players are up against four deadly diseases. With each turn, they draw a new card which offers potential for treating or curing disease, but they also confront a new disease infection site.

**Link to site:** https://janenath.github.io/pandemic

### Game summary:
48 worldwide cities are displayed on a central console. Four diseases are endemic in the game universe, each represented by a different color (yellow, blue, black, and red). The goal of the game is to cure all four diseases before one of them takes over the world. Players work together to accomplish this goal: humanity's fate is in the balance!

Players are dealt a random starting hand of four cards each. Each card represents a city. Toggling headers and button texts cue gameplay. On each turn, the player clicks the "Draw Cards" button to draw a new random card to add to their hand. Next, they click the "Infect" button to infect a new city. If either player has the card for the infected city in their hand, they turn this card in to treat the disease (indicated by doctor symbol). Otherwise, the infected city remains infected (indicated by a biohazard symbol). Randomly inserted throughout the player deck are Epidemic cards, which create a bonus triple infection instead of supplying a new city card. The game ends when one of the following conditions is met:
**Win Condition:** each disease (yellow, blue, black, and red) is cured. This is accomplished by players collecting sets of five city cards in the respective colors
**Lose Conditions:** the 12 countries afflicted by any single disease are all wiped out, leaving this disease to take over the world, OR the players run out of player cards.

### Technologies used:
- HTML
- CSS: Grid, Flexbox, modals, animation, and media query
- JavaScript: loops, math methods/randomization, array methods, combined datatypes, event listeners, callback and recursive functions, manipulating DOM with jQuery
___
## Lessons/Ongoing Issues:
### Creating a responsive, interactive map in the browser
  - At first, I tried using media queries to adjust event handler locations for each city over a static map background. This was nearly impossible with 48 different locations!
  - Next, I created a static diagram of the city locations with a gigantic table underneath to store the data. I realized that tables are the WORST and my page was too busy/cluttered.
  - Then I spent many hours trying to create an interactive map from scratch with the Google Developer Data Visualization tools. If I had unlimited time to devote to this project, I would have continued, but I decided to take a step back to focus more on my gameplay logic with the time remaining.
  - Final compromise: I created a map with "Snazzy Maps" online repository which provides a simpler visual representation of city locations. Unfortunately, interacting with this map does not affect gameplay.
  
 ### Focusing on user experience
  - At first I approached this project as a strict adaptation of the Pandemic board game. Over time I came to realize that this was not a good idea. Even after eliminating some of the trickier elements, trying to literally translate a complex strategy game onto the computer screen didn't make sense: the page was completely cluttered, and even someone who had played the board game before would not have understood how to interact with the site. It was as though I was trying to adapt a book into a movie, and shot each scene as a literal transcript of the written page: it was exhausting to make and exhausting for the user. 
  - Lesson learned: when you are adapting something into an application, whether it's a board game or a client's desired specifications, don't try to translate it line-by-line. Consider user experience first, and adapt from there.
  - Current status: I'm not 100% happy with how my user experience turned out: I think I could simplify gameplay and the user interface a lot more in the future. Incorporating an interactive map (see above) would help a lot.

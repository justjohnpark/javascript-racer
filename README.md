# JavaScript Racer

## Summary

A simple JavaScript racer game using Sinatra application.  The game still runs in a single browser instance, i.e., two players don't play each other across different browsers, but rather on a single browser. It also has a database that records game results.

The flow goes like this:

1. Two people get on a computer and visit the application
2. The application prompts each player to enter their name
3. The players fill out the form and this creates a new game
4. The new game starts, and each player smashes their respective key until one
   of them wins
5. After one of them wins, the winning player and amount of time it took to win is sent to the server and the game is recorded as being "done"
6. The players can choose to start another game using their same initials, or
   restart using different initials
7. After a game is finished the players are given a unique URL at which they
   can view the results of that particular game

##Instructions:
1. clone this directory
2. run 'bundle install' in the terminal from the root directory
3. run 'be rake db:create' in the terminal from the root directory
4. run 'be rake db:migrate' in the terminal from the root directory
5. run 'be rake db:seed' in the terminal from the root directory
6. run 'be shotgun' in the terminal from the root directory
7. open 'http://localhost:9393/' in your browser

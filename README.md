A clone of Wordle!

The game currently runs in the browser at 'https://wordlnt.herokuapp.com/'. If you're feeling tech-savvy, it can also be downloaded and run offline as a Node.js app on a local web server, although the words won't be synced up with the global version for obvious reasons. I actively encourage people to fork, clone, copy and improve upon this.

I have two separate heroku apps running, one for staging and one for 'deployment' - the code on here will always pertain to the app as it is being developed, so it's possible that if it's forked at any given moment, I'll be in the middle of working on it and it'll have some game-breaking bugs - My github etc workflow is a work in progress. If you can deduce the staging url you're welcome to try and play the game on that, but as mentioned, it will probably be broken.

Credit to Josh Wardle for this, and big respect for keeping it classy, free, and for only permitting one puzzle per day. I couldn't resist making the puzzles a bit more frequent - They'll generate once every three hours (12:00, 3:00, 6:00, 9:00 GMT), just in time for various breaks throughout the day. I'll probably reduce this in future, but it'll do for now. 

I assume Josh created this, given that Wordle and Wardle are basically the same word. With that being said, in the interest of exonerating myself from any legal business (looking at you NYT), the original game is more or less the same as Jotto, with a techny spin and very slightly altered game mechanics. As such, given that my 'version' has a completely different code-base, and uses server-side logic to generate the daily word (the original is exclusively client-side) I think I'm in the clear in terms of whether or not it's acceptable for me to make this freely available. I'd like to note that the purpose of the 'similar' name is to ensure that any users are aware that I am crediting the original creator, and that I am not trying to sneakily copy the concept and pass it off as my own under a different name. I'll reiterate the credit due to Josh for this - it's a neat game, relevant links below:

Josh's Github: https://github.com/powerlanguage?tab=overview&from=2017-12-01&to=2017-12-31

OG Wordle: https://www.powerlanguage.co.uk/wordle/

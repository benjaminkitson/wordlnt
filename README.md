A clone of Wordle!

The game more or less works as you'd expect (assuming you're familiar with the original) - the only notable difference if the handling of double letters. The 'hint' at the end of each turn doesn't reflect the number of the given letter in the final word. If, for example, the guess is 'LULLS', and the final word is to be 'DIMLY', the first two L's will flag as 'correct letter, wrong place', while the third will be 'correct and right place'. This arguably suggests that the final word would have three Ls in, even though it actually only has one. I'd like to 'correct' this at some point, but given that it's a valid (albeit slightly unintuitive) game mechanic, and requires fairly significant shaking up of the game's basic code, I'll work on other tweaks first.

Many of the statistics and social features of Wordle aren't in place - (disclaimer) the game currently stores the completed word in local storage and uses that to determine whether a new word has been generated, I will potentially expand upon this local storage concept and implement some game stats in the future. I also reserve the right to randomly push new versions of the game to Heroku - this shouldn't have any effect other than to generate a new word and to implement any features I have been developing.

The game currently runs in the browser at 'https://wordlnt.herokuapp.com/'. If you're feeling tech-savvy, it can also be downloaded and run offline as a Node.js app on a local web server, although the words won't be synced up with the global version for obvious reasons. I actively encourage people to fork, clone, copy and improve upon this.

Credit to Josh Wardle for this, and big respect for keeping it classy, free, and for only permitting one puzzle per day. I couldn't resist making the puzzles a bit more frequent - They'll generate once every three hours (12:00, 3:00, 6:00, 9:00 GMT), just in time for various breaks throughout the day. I'll probably reduce this in future, but it'll do for now. 

I assume Josh created this, given that Wordle and Wardle are basically the same word. With that being said, in the interest of exonerating myself from any legal business (looking at you NYT), the original game is more or less the same as Jotto, with a techny spin and very slightly altered game mechanics. As such, given that my 'version' has a completely different code-base, uses server-side logic to generate the daily word (the original is exclusively client-side), and the difference in game mechanics, I think I'm in the clear in terms of whether or not it's acceptable for me to make this freely available. I'd like to note that the purpose of the 'similar' name is to ensure that any users are aware that I am crediting the original creator, and that I am not trying to sneakily copy the concept and pass it off as my own under a different name. I'll reiterate the credit due to Josh for this - it's a neat game, relevant links below:

Josh's Github: https://github.com/powerlanguage?tab=overview&from=2017-12-01&to=2017-12-31

OG Wordle: https://www.powerlanguage.co.uk/wordle/

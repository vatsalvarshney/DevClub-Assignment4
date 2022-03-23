# Wordle+
[Wordle](https://www.nytimes.com/games/wordle/index.html) is a game where the computer has fixed a 5 letter word, let's call that the `SECRET`, and the user has to guess that word. Let's say the user makes a guess, then the computer gives a feedback for each letter in the guess: 
* Green if that letter is in the same position in the `SECRET`
* Yellow if that letter is in some other position in the `SECRET`
* Black if that letter is not in the `SECRET`

The current implementation of [Wordle](https://www.nytimes.com/games/wordle/index.html) is based completely on the front-end javascript code, so it is possible to find the answer by looking at the main javascript file of that page. Try doing this yourself!

This is not a secure way, so this is a simple API where the user can only make requests to our server with the guess, and the server returns the feedback response. This way, the user cannot directly hack the secret out of the program.

Example: If the user makes a `GET` request `http://localhost:8080/wordle?q=CRANE` and if the `SECRET` was `CIGAR`, then the response should be `gyybb` (We are adopting this convention to give feedback as green for 1st letter, yellow for 2nd and so on...)

### Demonstration

The `SECRET` word can be entered in the `index.js` file. This server can be started by running `node index.js`.
Suppose, the `SECRET` word was `CIGAR`:

![INPUT-1](https://user-images.githubusercontent.com/97669734/159750405-5a97e074-23d4-4373-9b86-77e0fea63d44.png)


And if the user makes a `GET` request `http://localhost:8080/wordle?q=CRANE`, then the respose should be `gyybb`:

![OUTPUT 1.1](https://user-images.githubusercontent.com/97669734/159750751-27781b16-854e-4fed-8622-5b7bdd304705.png)


If the guess is not the same length as `SECRET` word, then this error is displayed:

![OUTPUT 1.2](https://user-images.githubusercontent.com/97669734/159751072-e8629494-7cfb-40be-b1de-bb7012084418.png)


The case of repeating letters is also handled. If a letter appers more often in the `GUESS` than in the `SECRET`, then only as many `g` or `y` are shown as in the `SECRET`. Like if the `SECRET` is `NASTY` and the `GUESS` is `TRYST`, then only the first `T` is `y` and the second is `b`

![INPUT 2](https://user-images.githubusercontent.com/97669734/159751727-e14d92cd-e808-4409-9669-9fa0b69ff15e.png)
![OUTPUT2.1](https://user-images.githubusercontent.com/97669734/159751764-1f9b34ba-0574-4019-bb3a-bf86610bb107.png)


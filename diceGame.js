const prompt = require('prompt-sync')();

// Log author info and date
console.log(`
    Author: Jonathan
    Date: 20.04.26
`)

// Tracks dice rolls and amount of rolls
let rolls = []
let numberOfRolls = 0



// Single dice roll - called by diceGame 
const singleRoll = () => {
    numberOfRolls++
    return Math.floor(Math.random() * 6) + 1
}



// Double dice roll - called by diceGame if a 1 is rolled
const doubleRoll = () => {
    prompt('Du har rullat en etta (Tryck enter)')

    const double = [singleRoll(), singleRoll()]
    double.map((roll) => {
        if (roll !== 1) {
            rolls.push(roll)
        }
    })

    if (double.includes(1)) {
        doubleRoll()
    }
}



// Runs the program. The super advanced game engine, if you will
const diceGame = () => {
    // Reset roll trackers for each new game
    rolls = []
    numberOfRolls = 0

    // Axe user for number of rolls
    let rollOptions
    while (!rollOptions || rollOptions < 1 || rollOptions > 4) {
        rollOptions = parseInt(prompt('Hur många kast? (Ange nummer mellan 1 - 4) '))
    }

    // Roll dice as many times as user input
    for (let i = 0; i < rollOptions; i++) {
        let roll = singleRoll()

        // if roll doesn't result in a 1, push result of roll to rolls array, else a double roll is granted
        if (roll !== 1) {
            rolls.push(roll)
        } else {
            doubleRoll()
        }
    }

    // Logs score and rolls. 
    console.log(`
        Rullade tärningar:  ${rolls}
        Totalsumma:         ${rolls.reduce((acc, curr) => acc + curr)}
        Tärningsslag:       ${numberOfRolls}
    `)

    // Axe user to restart game or not. If input is j(for yes), diceGame is called and runs the game once more
    let restart = prompt('Börja om? (j/n) ')
    if (restart === 'j') {
        diceGame()
    }
};
// Calls diceGame to actually run the game
diceGame()









/*
Reduce is an array method that "reduces" all values stored in an array (in this case "rolls") into one value, by looping through the values and adding them and then returning the sum.
acc represents the "accumulator", which is a variable that stores the current total sum, which initially is 0.
curr represents the current value(that the method loops through) that will be added to the accumulator.

example. 
const rolls = [1, 2, 3, 4]
rolls.reduce((acc, curr) => acc + curr) // returns 10. Explanation below.

before first iteration: 
acc = 0

first iteration:
acc = 1
because curr is 1, and is added to acc

second iteration:
acc = 3
because curr is 2, and is added to acc

third iteration:
acc = 6
because curr is 3, and is added to acc

last iteration:
acc = 10
because curr is 4, and is added to acc

the value of acc is then returned, in this case 10.
*/
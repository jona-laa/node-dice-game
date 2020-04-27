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
    prompt(`Kasta tärningen! (Enter)`)
    numberOfRolls++
    console.log(`Kast ${numberOfRolls}`)
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
            console.log(`Totala summan är: ${rolls.reduce((roll, nextRoll) => roll + nextRoll)}`)
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
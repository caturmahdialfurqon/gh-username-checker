const axios = require('axios');
const readline = require('readline');

let ClrPrinted = false;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const color = {
    ul: '\x1b[4m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
};

function clr() {
    if (!ClrPrinted) {
        console.log(`
╭━━━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━┳╮
┃╭━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱┃╭━━┫┃${color.blue}Github${color.green}
┃╰━━┳╮╭┳━┳━━┳━━┳━╮┃╰━━┫┃╭╮╱╭┳━╮╭━╮
┃╭━━┫┃┃┃╭┫╭╮┃╭╮┃╭╮┫╭━━┫┃┃┃╱┃┃╭╮┫╭╮╮
┃┃╱╱┃╰╯┃┃┃╰╯┃╰╯┃┃┃┃┃╱╱┃╰┫╰━╯┃┃┃┃┃┃┃
╰╯╱╱╰━━┻╯╰━╮┣━━┻╯╰┻╯╱╱╰━┻━╮╭┻╯╰┻╯╰╯
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱╭━╯┃${color.reset}Username
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╱╱╱╱╱╰━━╯${color.yellow}Checker
\n[+]${color.green} Type "cl" to clear the screen${color.reset}
        `);
        ClrPrinted = true;
    }
}

async function checkUsername(username) {
    try {
        // https://api.github.com/users/ (has limitations)
        const response = await axios.get(`https://github.com/${username}`, {
            headers: {
                'User-Agent': 'Node.js'
            }
        });
        console.log(color.red + `Username "${username}" is already taken.` + color.reset);
        askForUsername();
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(color.green + `Username "${username}" is available.` + color.reset);
            rl.question('Enter another username or type "exit" to quit: ', (newUsername) => {
                if (newUsername.toLowerCase() === 'exit') {
                    rl.close();
                } else {
                    checkUsername(newUsername);
                }
            });
        } else {
            console.log(color.yellow + `Error: ${error.message}` + color.reset);
            askForUsername();
        }
    }
}

function askForUsername() {
    clr();
    rl.question('Enter a GitHub username to check: ', (input) => {
        if (input.toLowerCase() === 'cl') {
            console.clear();
            askForUsername();
        } else {
            checkUsername(input);
        }
    });
}

askForUsername();
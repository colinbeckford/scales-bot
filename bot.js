require('dotenv').config()

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ["MESSAGE"]
})


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), getTechRank);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function getTechRank(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1khIDjZMeSWGb102OJkya598yVJRQk_JShpbjAu9bWc0',
    range: 'Sorted tech!A2:C',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    let rank = "";
    if (rows.length) {
        console.log("Current Tech Standings:")
        rank += "Current Tech Standings:"
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
          rank += `${row[0]} - ${row[1]} - ${row[2]}`
        console.log(`${row[0]} - ${row[1]} - ${row[2]}`);
      });
      return rank;
    } else {
      console.log('No data found.');
    }
  });
}

const BOT_PREFIX = '!'
const MOD_ME_COMMAND = 'mod'

client.on('ready', () => {
    console.log('Our bot is ready to go!!!')
})

client.on("messageDelete", msg => {
    msg.channel.send("Stop deleting messages")
})

client.on('message', msg => {
    if (msg.content === '!ping') {
        msg.channel.send('Pong!')
    }
    else if (msg.content == "I love Scales") {
        msg.react('❤')
    }
    else if (msg.content == "!tech") {
        msg.channel.send(getTechRank())
    }
    else if (msg.content === `${BOT_PREFIX}${MOD_ME_COMMAND}`) {
        modUser(msg.member)
    }
})

function modUser(member) {
    member.roles.add("812775078357630977")
}

client.login(process.env.BOT_TOKEN)
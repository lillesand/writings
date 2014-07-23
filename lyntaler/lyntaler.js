var request = require('request'),
    _ = require('lodash'),
    stdin = process.stdin;


const peoples = _.shuffle([
    'Alexander "Lex" Hansen',
    'Eirik "The Wang" Wang',
    'Henrik "Hellboy" Hellerøy',
    'Ken "Glenn" Grønnbeck',
    'Lars "G-Plug" Eliassen',
    'Maguns "Stubmæn" Stubman',
    'Mats "Mirakelmats" Knutsen',
    'Thomas "Tønna" Andresen',
    'Vegard "Veggen" Veiset',
    'Jøran "me" Øran'
])

var assignments = []

request('https://trello.com/1/lists/5396fd2652489c9b9c16ec76/cards?key=fa54df2c19bd51c91a69363402f6996a', function(err, res, body) {
    if (err) {
        console.log('wtf, ' + err);
        return;
    }

    var cards = JSON.parse(body);

    var entries =_.map(cards, function(entry) {
        return {
            name: entry.name,
            votes: entry.badges.votes
        }
    })

    entries = _.sortBy(entries, function(entry) {
        return entry.votes;
    }).reverse()

    entries = entries.slice(0, peoples.length);
    var sortedEntries = entries.slice(0, entries.length)

    _.shuffle(entries)

    peoples.forEach(function(person) {
        var index = _.random(0, entries.length)
        var topic = entries.splice(index - 1, 1)[0]

        assignments.push({person: person, topic: topic.name})
    })

    console.info('Ready to roll!');
    console.info('Aktuelle temas:');
    sortedEntries.forEach(function(entry) {
        console.info(entry.name + '(' + entry.votes + ' stemmer)')
    })



    stdin.on('data', function() {
        if(assignments.length == 0) {
            process.exit();
        }

        var assignment = assignments.pop()
        console.info(assignment.person + ':')
        console.info(assignment.topic)
        console.info('')

    })

});
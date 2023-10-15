const prompt = require('prompt-sync')({ sigint: true });
const data = require('./dataIn.json')
const fs = require('fs')


// Projektet-----------------------

let running = true

while (running) {
  console.log(`

H U S D J U R S T E S T E T !
  
Vilken husse- eller matte-typ är du?
Är du hund-, katt- eller kaninmänniska, eller föredrar du rent av akvariefiskar?
`);
  const svar = prompt('Tryck "GO" för starta testet eller "Q" för att avsluta: ').trim().toUpperCase();

  switch (svar) {

    case "GO":
      // Inmatning: namn, datum, tid -------------

      console.log(data[0].who.name);
      data[0].who.name = prompt();

      console.log(data[0].who.date);
      data[0].who.date = prompt();

      console.log(data[0].who.time);
      data[0].who.time = prompt('kl: ');

      if (data[0].who.time.length === 0) {
        console.log(`Skriv in dina uppgifter: `);
      }
      // Testet -------------
      else {
        for (let i = 1; i <= 15; i++) {
          console.log(data[i].id.quest);
          data[i].id.val = prompt().toLowerCase().trim();
          console.log(`
            
            Du svarade; ${data[i].id.val}!
            
            `);
        }
      }
      /* Tanken var att jag skulle läst in en "Ja" och en "Nej"-arrey med viktade svar för varje fråga, men fick det inte alls att fungera. Har vridit vänt på att bara försöka läsa tillbaks Ja eller Nej-svaret från prompten, men hela datapaketet skriver in varje gång. Slutade med att jag nu endast läser Ja- eller Nej-svaret till "data[i].id.val" för att åtminstone registrera svaren. Och lät en array ligga kvar under "viktning". Tänkte att jag då skulle representera ja-svar och att jag kunde gjort en beräkning för nej någon slags lop, men det blev väldigt komplicerat*/

      fs.writeFile('./dataUt.json', JSON.stringify(data, null, 2), (err) => { if (err) throw err; console.log('data written to file'); });

      //Resultat -----------

      // const data = require('./dataUt.json')

      /* Här var min tanke att jag skulle hämtat in resultatet från testet, men jag får inte insparningen att ske till "dataUt-filen med mindre än att programmet avslutas, hm... */

      prompt(`Bäste användare. Jag ber om ursäkt!
      Här skulle ditt resultatet ha presenterats, men istället måste programmet stänga för svaren ska kunna sparas till dataUt.json-filen. Inte mycket till test.
      
      No cigar, not even close...`)

      running = false;

      break;

    case "Q":
      console.log("Q");
      running = false;
      break;

    default:
      console.log('Tryck "GO" för att börja eller Q för att avsluta');
      break;

  }
}


Jeg begynte å jobbe som programmerer i 2008. Det var omtrent samtidig som fokuset på craftsmanship, parprogrammering og
enhetstesting virkelig etablerte seg i den mer enterprisey utviklingsverdenen. Og jeg omfavnet det med åpne armer.
Flasket opp på high-fives, hyppig utrulling og enorm stolthet over alt jeg jobbet med var jeg ikke i tvil om at dette
var _måten_ å utvikle software på. For meg var testdriving religionen og enhetstesten alteret. Testene skulle drive
arkitekturen og sørge for modulær kode, solid testdekning og høy kodekvalitet.

Jeg var fullstendig klar over at det fantes andre, komplementære måter å gjøre testing på. Integrasjonstesting,
akseptansetesting, ende til ende-testing og – gud forby – manuell testing. Vi dabbet litt borti alt sammen: CubicTest,
Selenium, Cucumber, WebDriver, SoapUI og alt annet seriøse testere skal kunne. Men ingenting funket skikkelig.
Ingenting gikk så glatt som enhetstester i JUnit!

Debatten
--------

Denne posten havner i etterkant av debatten mellom
<a href="http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html">David Heinemeier Hansson</a>,
<a href="http://martinfowler.com/articles/is-tdd-dead/">Martin Fowler</a> og mange andre – som til slutt
<a href="https://www.youtube.com/watch?v=z9quxZsLcfo">kuliminerte med fem live-debatter mellom de to og
Kent Beck</a>. Dersom du har fulgt denne debatten tett vil ikke denne blogposten inneholde så mye nytt for deg,
men heller gi en vinkling på norsk.

Noen definisjoner
-----------------

Jeg kommer til å skrive mye om enhetstester og ende til ende-testing i denne blogposten.

Med enhetstester mener jeg spissede tester som tester isolerte komponenter – gjerne klasser i språk som Java eller
C#, eller funksjoner i språk som JavaScript. I forbindelse med enhetstesting brukes gjerne mocker eller spies til å
isolere komponenten som testes fra resten av systemet.

Jeg bruker ende til ende-testing i en løsere forstand. Snarere enn en spesifikk teknisk definisjon,
legger jeg i det at man tester koden på et hensiktsmessig nivå sett opp mot hvordan den skal brukes. Med
hensiktsmessig mener jeg at man ikke nødvendigvis trenger å teste alt som det oppleves fra
sluttbrukeren; det vil nesten alltid være nødvendig å isolere systemer fra hverandre og gjøre forenklinger. For
eksempel vil det være meningsfylt å teste en frontend-applikasjon, et rammeverk/bibliotek og en MVC-applikasjon vidt
forskjellig. Fokuset er på å teste at koden henger sammen og som helhet gjør det den skal.

Problemet med enhetstesten
--------------------------

Så hva er egentlig problemet med enhetstester? Egentlig ingenting. Gode enhetstester dokumenterer hva kode skal gjøre
og går langt i å bevise at den faktisk gjør det. For problemer med mye oppførsel og en algoritme-liknende natur – kode
som rett og slett kan være litt kjelkete å få riktig – er de glimrende.

Problemet er den dritten her:

    @Test
    public void check_privileges_when_finding_user() {
        when(userService.findUser(5L)).thenReturn(user);
        when(userResponseMapper.map(user)).thenReturn(responseUser);

        userFinder.find(5L);

        verify(privilegeChecker).checkPrivileges(user);
    }

"Men det var jo ikke så ille!" kan du si. Og du har et poeng. Det der er ikke ille i det hele tatt. Problemet er at det
koden som testes er fullstendig triviell. Vi sjekker at tre komponenter henger sammen, men
ingenting om de faktisk henger sammen på rett måte og fungerer som forventet med virkelig input. Og det er jo der
feilene faktisk oppstår; i hvordan komponenter spiller sammen.

Og en slik test kommer sjelden alene. Hvis man først enhetstester på dette nivået vil en kodebase av litt størrelse
gjerne innholde mange tusen tester. Og det er da det begynner å gjøre vondt.

Disse endringene, disse jævla endringene…
-----------------------------------------

<img src="https://bekkopen.blob.core.windows.net/attachments/9e2e3e08-f772-4e6b-b248-9102d181a74a"
    alt="Illustrasjonsbilde av en sommerfugl" />

Gode tester er godt for mye. For meg er det ett aspekt som trumfer alt: trygghet til å gjøre endringer i koden med
visshet om at det ikke brekker eksisterende funksjonalitet.

En god metafor på tester er for meg sikringstauet til en fjellklatrer. Det er litt jobb med det, men stort
sett merker du ikke så mye til det med mindre du faktisk faller. Da kjenner du et kraftig rykk, før du trygt kan fire
deg ned til bakken og prøve på nytt.

Sånn føles ikke en svær samling enhetstester. Med fare for å trekke analogien for langt, føles det mer som å klatre opp
en fjellvegg med et fiskegarn rundt kroppen. Du klarer alltids å komme deg fremover. Du faller ikke nødvendigvis ned.
Men det går forferdelig trått. Og det er fortsatt fullstendig mulig å gjøre feil som skader deg.

Hvis det å flytte en kodelinje fra én komponent til en annen – uten å endre funksjonalitet – knekker flerfoldige tester
og krever 10-15 endrede linjer testkode – da er det noe som har gått feil. Du henger fast i et fiskegarn.

En god testsuite gjør det lett å gjøre endringer, samtidig som den klasker deg på lanken når du gjør noe feil.

Programmér for testbarhet
-------------------------

<img src="https://bekkopen.blob.core.windows.net/attachments/7910c159-2554-4e5e-a208-9d66d76d2e90"
    alt="Illustrasjonsbilde av fjellklatrer" />

Et mye brukt argument for testdriving er at det driver frem et testbart design med god isolasjon. Det er sant.
Problemet er at testdriving _med bare enhetstester_ har en tendens til å gi et _dårlig_ design: overdrevent små
komponenter, unaturlig tilgjengeliggjøring av variabler og funksjonalitet, og overdrevent fokus på injiserbarhet. Å
bruke testdrevet utvikling som et verktøy for å skrive testbar kode er en god idé; å bruke enhetstester som den eneste
teknikken for dette er en tilsvarende dårlig idé.

Jeg tror grunnen til at vi lener mot enhetstester er at det, relativt sett, er lett. Konseptene er lette å forstå, det
er et begrenset sett med teknikker involvert og verktøystøtten er god. Å introdusere ende til ende-tester på en stor
applikasjon som ikke er bygd for det er smertefullt: en bråte komplekse integrasjoner som det ikke er støtte for å
bytte ut, treg oppstart av applikasjonen, sideeffekter og masse tilstand.

Hvis du er så heldig at du starter opp en ny applikasjon i dag vil jeg påstå at det grenser mot uansvarlig å ikke
allerede fra starten av bygge applikasjonen for ende til ende-testing. Rigg det for automatisert kjøring fra dag 1.
Sørg for at alle eksterne avhengigheter kan byttes ut med dummies hvor du styrer tilstanden, hold oppstartstiden lav,
ha kontroll på sideeffekter som skriving til database og ha støtte for automatisk lasting av testdata.

Dette gir en applikasjon som _virkelig_ er bygd for testbarhet. Dersom applikasjonen er strukturert slik at en
datamaskin klarer å teste mot den er det lett å sette den i en tilstand der mennesker enkelt kan teste alle tilstandene
den kan komme i også. Det er lett å isolere enkeltavhengigheter, og oppstartstiden er lav. Det er det testbare
designet vi ønsker å oppnå!

Programmer for mennesker
------------------------

<img src="https://bekkopen.blob.core.windows.net/attachments/57bc659b-dc0c-4bec-9d16-50173d67fc60"
    alt="Illustrasjonsbilde: Sint legomann som programmerer"/>

Testdriving styrer virkelig designet. For at enhetstester ikke skal bli svære beist med et gigantisk, uforståelig
oppsett må komponentene være små. Bittesmå. Da jeg var på høyden av troen min på
enhetstesting forankret jeg denne tanken i Single Responsibility Principle. Det føltes som jeg gjorde Det Rette og var
en skikkelig craftsman. Senere har jeg reflektert en del over hvor riktig det egentlig er. Disse
komponentene blir fort så små at de egentlig ikke løser et stykke arbeid som gir mening for noe annet enn testene.

Programmering handler om kommunikasjon. I sin enkleste form handler det om å forklare en datamaskin hva den
skal gjøre. Men nesten like viktig er det å kommunisere med andre utviklere. De aller fleste kodebaser skal i løpet av
livssyklusen sin besøkes av mange titalls, om ikke hundretalls, utviklere. At koden passer inn i hodet og
virkelighetsoppfatningen til andre utviklere er derfor ekstremt viktig. Utviklere som skal gjøre endringer på et
system de ikke skjønner vil veldig fort gjøre feil. Og hvis koden primært er strukturert for å passe til enhetstester
har du da et problem. Lag komponenter som gir mening for mennesker, ikke tester!

Med tester som sjekker at applikasjonen din overordnet gjør det den skal står du fritt til å fokusere noe av det aller
viktigste når du programmerer; at koden du skriver formidler dine tanker og din kontekst til den neste utvikleren som
skal inn og gjøre en endring. I tillegg vil ende til ende-tester gi ham beskjed dersom han har tråkket feil ved en
endring.

Testing har en kontekst
----------------------

<img src="https://bekkopen.blob.core.windows.net/attachments/599e5fb7-0b3c-45ff-9735-06e2b26205d1"
    alt="Illustrasjonsbilde: Rykende pistol" />

Testing foregår alltid i en kontekst. Ingen applikasjoner er like, og det begynner virkelig å se ut som vi ikke har noen
sølvkuler. Å teste mobilklienter, JavaScript-frontends og tunge Java-backends på samme måte er i beste fall naivt.

I en mobilklient (app) med lite forretningslogikk kan den beste formen for testing være at applikasjonen lett kan sette
seg i en tilstand som viser de viktigste bruksmønstrene uten å være avhengig av å laste ekte data, slik at et menneske
kan verifisere at det ser ut som det skal. For en JavaScript-klientapplikasjon kan det viktigste være å sjekke at koden
fungerer likt i alle nettlesere. For en svær Java-applikasjon kan det være masse tung forretningslogikk som fortjener å
bli enhetstestet ned i den minste detalj for å sikre seg mot feil.

Poenget er at dette varierer. Derfor bør vi ikke velge enhetstest som verktøy uten å tenke oss om, men snarere tenke
grundig gjennom hvordan vi rigger oss for å lettest mulig verifisere at en applikasjon gjør det den skal.

Er enhetstesten virkelig død?
-----------------------------

<img src="https://bekkopen.blob.core.windows.net/attachments/a9e89b67-0d95-463c-951e-a0c8100046c1"
    alt="Illustrasjonsbilde: død cowboy" />

Enhetstesten er selvsagt ikke død. Enhetstester er glimrende til det de gjør best: å teste ting som er litt vanskelig
eller kronglete. Hvis du er litt usikker på hvordan en algoritme skal implementeres, hvordan matching av
noe tekst blir riktig, hvordan utregning av en pris som inneholder mye forretningslogikk skal foregå – da passer
enhetstesten perfekt! Dette fordi du har et _problem_ som er en enhet arbeid. Det er ikke noe vits å enhetsteste noe
det er åpenbart om er riktig eller feil.

Hvis du er usikker på hvordan noe skal virke eller du kjenner at du virkelig må tenke deg om for å løse det, da passer
det bra med en enhetstest. Når du derimot vet at controlleren skal kalle servicen før den returnerer navnet på viewet,
da bør du faktisk få slippe.

Hva kan du gjøre?
-----------------

Å introdusere ende til ende-tester er ikke kampen du bør ta hvis du sitter på et stort gammelt beist av en applikasjon.
For det kan virkelig være vanskelig. Først og fremst har vi som utviklere et ansvar for å sørge for at nye applikasjoner
vi lager har skikkelige tester som verifiserer at applikasjonene virker som de skal.

Utfordre antakelser om hva testing skal være, og tenk gjennom hva applikasjonen skal løse, hvor lenge den skal
leve og hvilke feil du kan tåle. Ha enhetstester som et verktøy i verktøykassa di,
men sørg for at de ikke blir liggende der alene.

Bilder
------

Forsidebilde: <a href="https://www.flickr.com/photos/williammarlow/">Will Marlow</a> (flickr).<br/>
Sommerfugl: <a href="https://www.flickr.com/photos/axlefoley/">Axel.Foley</a> (flickr).<br/>
Fjellklatrer: <a href="https://www.flickr.com/photos/xevivarela/">Xevi V</a> (flickr).<br/>
Legomann: <a href="https://www.flickr.com/photos/cyol/">Cyol Ternyan</a> (flickr).<br/>
Rykende pistol: <a href="https://www.flickr.com/photos/theknowlesgallery/">Charles Knowles</a> (flickr).<br/>
Død cowboy: <a href="https://www.flickr.com/photos/bbcworldservice/">BBC World Service</a> (flickr).<br/>
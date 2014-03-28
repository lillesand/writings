Jeg har hatt gleden av å se mine egne applikasjoner bli legacy.

Jeg begynte å jobbe som programmerer i 2008. Det var omtrent samtidig som fokuset på craftmanship, parprogrammering og enhetstesting virkelig etablerte seg i den mer enterprisey utviklingsverdenen. Og jeg omfavnet det med åpne armer. Flasket opp på high-fives, hyppig utrulling og enorm stolthet over alt jeg jobbet med var jeg ikke i tvil om at dette var _måten_ å utvikle software på.

Jeg var fullstendig klar over at det fantes andre, komplementære måter å gjøre testing på. Integrasjonstesting, akseptansetesting, ende til ende-testing og – gud forby – manuell testing. Vi dabbet litt borti alt sammen. CubicTest, Selenium, WebDriver, SoapUI og hva det enn heter alt sammen. Men ingenting funket skikkelig. Ingenting gikk så glatt som enhetstester i JUnit!

Problemet med enhetstesten
--------------------------

Så hva er egentlig problemet med enhetstester? Egentlig ingenting. Gode enhetstester dokumenterer hva kode skal gjøre og går langt i å bevise at den faktisk gjør det. For problemer med mye oppførsel og en algoritme-liknende natur – kode som rett og slett kan være litt kjelkete å få riktig – er det glimrende.

Problemet er den dritten her:

    @Test
    public void find_user_and_check_privileges() {
        when(userService.findUser(5L)).thenReturn(user);
        when(userResponseMapper.map(user)).thenReturn(responseUser);

        userFinder.find(5L);

        verify(privilegeChecker).checkPrivileges(user);
    }

"Men det var jo ikke så ille!" kan du si. Og du har et poeng. Det der er ikke ille i det hele tatt. Problemet er at det koden det tester er fullstendig triviell. Vi sjekker at tre komponenter vi vet veldig lite om henger sammen, men ingenting om de faktisk henger sammen på rett måte. Og det er jo der feilene faktisk oppstår; i hvordan komponentene spiller sammen.

Og en slik test kommer sjelden alene. Hvis man først enhetstester på dette nivået vil en kodebase av litt størrelse gjerne innholde flere tusen tester. Og det er da det begynner å gjøre vondt.

Disse endringene, disse jævla endringene…
-----------------------------------------

For gode tester er godt for mye. For meg er det ett aspekt som trumfer alt: at det gir trygghet til å gjøre endringer i koden med visshet om at det ikke brekker eksisterende funksjonalitet.

Den perfekte metaforen på gode tester er for meg sikringstauet til en fjellklatrer. Det er litt jobb med det, men stort sett holder det seg på siden med mindre du faktisk faller. Da kjenner du et kraftig rykk, før du trygt kan fire deg ned til bakken og prøve på nytt.

Sånn føles ikke en svær samling enhetstester. Med fare for å trekke analogien for langt, føles det det mer som å klatre opp en fjellvegg med et fiskegarn rundt kroppen. Du klarer alltids å komme deg fremover, men det går trått. Du tenker hvertfall over hver eneste bevegelse du gjør!

Hvis det å flytte en kodelinje fra én komponent til en annen (uten å endre funksjonalitet) knekker flerfoldige tester og krever 10-15 endrede linjer testkode – da er det noe som har gått feil.

En god testsuite gjør det lett å gjøre endringer, samtidig som den klasker deg på lanken når du gjør noe feil.

Programmér for testbarhet
-------------------------
Mye av appellen i enhetstesting ligger nok i at det, relativt sett, er jævla enkelt. Å introdusere ende til ende-tester på en stor applikasjon som ikke er bygd for det kan være smertefullt: en bråte komplekse integrasjoner som det ikke er støtte for å bytte ut, treg oppstart av applikasjonen, sideeffekter og tilstander.

Hvis du er så heldig at du starter opp en ny applikasjon i dag vil jeg påstå at det grenser mot uansvarlig å ikke allerede fra starten av bygge applikasjonen for enhetstesting. Rigg det med automatisert kjøring fra dag 1. Hold et veldig tett øye på oppstartstiden på applikasjonen og trege tester. I den applikasjonen jeg jobber på nå timer vi tiden det tar å starte applikasjonen. Hvis det tar mer enn seks sekunder feiler testene. Vi kan øke grensen for hva som får det til å feile, men det tvinger oss til å være bevisste på hvor lang tid det faktisk tar.

Etter min erfaring har arkitekturen til applikasjonen en del å si for testbarheten. Single Page Applications har et REST-grensesnitt du kan kjøre testene dine mot, og på den måten få testet alt fra fra webserveren og inn. MVC kan av og til være litt tøffere å få gjort skikkelig. Trikset her er å gå tilbake til røttene og faktisk jobbe med å rendyrke skillet mellom modeller, visninger og oppførsel (controllers). Controllere skal nærmest per definisjon være ganske gode å teste mot.

Programmér for mennesker
------------------------
Noe av det første var nettopp det. Å programmere for testbarhet. Det ble etterhvert ensbetydende med bittesmå moduler. Jeg forankret denne tanken i Single Responsibility Princple, og det føltes som jeg gjorde Det Rette og var en skikkelig craftsman. I det siste har jeg reflektert en del over hvor riktig det egentlig er. Å navngi en del av disse komponentene er vanskelig. Veldig vanskelig. Og det er ikke så rart, for det ender med at du sitter og bryter opp ting i mye mindre deler enn det som egentlig er <<cohesive>>. Og da ender du veldig fort med et system som ikke passer inn i hodet til folk. Koden er modularisert til det smertefulle, og komponentene er for små til å løse noe som helst problem på egenhånd.

Med tester som sjekker at applikasjonen din overordnet gjør det den skal står du fritt til å fokusere noe av det aller viktigste når du programmerer; at koden du skriver formidler dine tanker og din kontekst til den neste programmereren som skal inn og gjøre en endring. Heller enn å fokusere på kode som er strukturert på en måte som passer å gjøre ting på.

Veien fremover
--------------

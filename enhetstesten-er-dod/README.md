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

"Men det var jo ikke så ille!" kan du si. Og du har et poeng. Det der er ikke ille i det hele tatt. Problemet er at det koden det tester er fullstendig triviell. Vi sjekker at tre komponenter vi vet veldig lite om henger sammen, men ingenting om de faktisk henger sammen på rett måte. Og det er der feilene faktisk oppstår; i hvordan komponentene spiller sammen.

Og en slik test kommer sjelden alene. Hvis man først enhetstester på dette nivået vil en kodebase av litt størrelse gjerne innholde flere tusen tester. Og det er da det begynner å gjøre vondt.

Disse endringene, disse jævla endringene…
-----------------------------------------

Gode tester er godt for mye. Men for meg er det ett aspekt som trumfer alt: trygghet til å gjøre endringer i koden med visshet om at du ikke brekker eksisterende funksjonalitet.

Den perfekte metaforen på gode tester er for meg sikringstauet til en fjellklatrer. Det er litt jobb med det, men stort sett holder det seg på siden med mindre du faktisk faller. Da kjenner du et kraftig rykk, før du trygt kan fire deg ned til bakken og prøve på nytt.

Sånn føles ikke en svær samling enhetstester. Med fare for å trekke analogien for langt, føles det av og til litt som å prøve å klatre opp en fjellvegg med et fiskegarn rundt kroppen. Du klarer alltids å komme deg fremover, men det går trått.

Hvis det å flytte en kodelinje fra én komponent til en annen (uten å endre funksjonalitet) knekker flerfoldige tester og krever 10-15 endrede linjer testkode – da er det noe som har gått feil.

En god testsuite gjør det lett å gjøre endringer, samtidig som den klasker deg på lanken når du gjør noe feil.

Programmér for testbarhet
-------------------------

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



Testen som sikkerhetsnett. Bør være som sikringstauet når du klatrer i et fjell, ikke som et fiskegarn som ikke lar deg bevege armene.


Programmér for testbarhet
-------------------------

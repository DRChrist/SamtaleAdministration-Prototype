Mockup af system til administration af samtaleforløb med runder
===============================================================

Introduktion
------------
Dette er et forsøg på opstille en version af MUS-systemets samtaleforløbsadministration med en tilføjet feature til runder og med indholdstyper opdelt i mindre elementer. Dette for at undersøge hvilke problemstillinger, der opstår i forbindelse med ændring og lagring af samtaledata, samt for at teste de nye features.
	
	
Modeldefinitioner
-----------------

Samtale/Meeting: Det centrale objekt i systemet. Udgør en kobling mellem ressource og bruger.
	

Samtaleforløb/Agenda: Det højeste niveau i ressource-hierarkiet. Det niveau som samtale bruger.
	

Runde/Round: En samling af samtaler. Én samtale for hver bruger i organisationen.
	

Bruger/User: En medarbejder i organisationen.
	

Organisation: En relevant opdeling af brugere. Det kan være en større afdeling, eller en hel virksomhed.
	

Stillingskategori/Job: Udgør sammen med afdeling en medarbejderkategori.


Afdeling/Department: Udgør sammen med stillingskategori en medarbejderkategori.
	

Medarbejderkategori (kun konceptuelt)	: En art ID, som kobler en bruger sammen med et samtaleforløb.
	

Content, ContentFrame, ContentRow: Forskellige niveauer af ressourcer.
	

ResourceText, ResourcePercent: Eksempler på det laveste niveau af ressourcer.
	
	
Problemformulering
------------------

**Overgangsproblemer**

Administration af samtaleforløb gav anledning til en række svært definerbare edge-cases som krævede en afklaring.
Et centralt eksempel er situationen hvor et samtaleforløb bliver ændret. Et par spørgsmål melder sig når man overvejer hvordan systemet skal opføre sig i den situation:
	
1. Hvordan og hvornår skal nye samtaler opdateres til at bruge det nye samtaleforløb?
	
2. Hvordan sørger vi for at vi ikke mister samtaledata i skiftet til det nye samtaleforløb?
			
Ikke bare er det vigtigt at have klare regler for hvordan systemet skal forholde sig, så man undgår uforudsigelig opførsel, det er også vigtigt at disse regler giver intuitiv mening, så man ikke gør det sværere end nødvendigt for brugeren at forudse konsekvenserne. 
Vi ønsker desuden at kode det så dynamisk så muligt, så vi begrænser mængden af kode der skal skrives og gør det nemmere at vedligeholde og ændre fremover.

**Ressourcer**

Uafhængigt af ovennævnte problemstilling, er det også værd at overveje om det er muligt at organisere og lagre ressourcer på en dynamisk måde.
Det vi håber at opnå er (1) mulighed for at en bruger relativt frit kan designe deres egne samtaleforløb og (2) på længere sigt at opbygge et bibliotek af ressourcer som brugerne kan vælge imellem og kombinere som de ønsker.
Lagringen af dataen må ikke glemmes i disse overvejelser. At bevare integriteten af lagret data er højeste prioritet.
	
---	
		
**Runder**
	
For at afhjælpe nogle af overgangsproblemerne og for at afprøve det som feature har jeg tilføjet runder til denne prototype.
	
Hvad er en runde? I en lille organisation vil man muligvis få overstået alle musamtalerne over en kort periode, på måske et par uger. Dette vil så være en runde.
I en stor organisation kan rundens afgrænsning være sværere at få øje på, men princippet er det samme: En omgang samtaler med alle medarbejderne, hvor ingen medarbejder får mere end en samtale. Der er ikke som sådan noget der forhindrer to på hinanden følgende runder i at overlappe tidsmæssigt, men det vil generelt ikke være ønskværdigt, da det betyder at en medarbejder har fået to samtaler, mens en anden ikke har fået nogen.
	
Givet ovenstående definition er det nemt at se at Runde-modellen naturligt vil have en en-til-mange relation med Samtale.

Det er mere uklart hvad rundens forhold til samtaleforløb skal være. På den ene side giver det mening, at den aktive runde indeholder de aktive samtaleforløb og at den kommende runde indeholder de kommende samtaleforløb. Hvis man vil ændre et samtaleforløb kan man finde den kommende runde og de samtaleforløb der er forbundet med den og ændre i dem:

	Round.find({state: 'upcoming'})
	.populate('agendas')
	.exec(function(err, upcomingRounds) {
		_.forEach(upcomingRounds, function(round) {
			console.log(round.agendas);
		}) 
	} 
   
På den anden side er det altid værd at have så lav coupling som muligt og det er en relativt lille mængde objekter som der er tale om. Dette vil blive angivet ved en variabel på agenda. Så hvis man vil printe de kommende samtaleforløb med denne model:

	Agenda.find({state: 'upcoming'})
	.exec(function(err, upcomingAgendas) {
		console.log(upcomingAgendas);
		})  

Ulempen ved denne metode er man skal opdatere de to modeller separat, selvom de skifter state samtidig, fx når en ny runde starter. Jeg er usikker på hvilken variant der fungerer bedst, og det kan nok kun afgøres ved at udvikle systemet til en højere detaljegrad.


**Ressourcer**
	
*Ressource-hierarkiet*:

-	Samtaleforløb

- Content - Et skema med spørgsmål, en titel og en overskrift

-	ContentFrame - En mindre samling af spørgsmål med en titel

-	ContentRow - Et enkelt spørgsmål, med plads til ressourcer i en spørgsmålsside og en svarside

-	Basisressource (tekst, checkbox, tal, billede)


Som set ovenfor har jeg opstillet et hierarki af beholdere. Og nederst i dette hierarki finder man de egentlige ressourcer. Resten er organiseringen af disse.

Som det ser ud nu, ligger der et stort arbejde i at kode en funktion der bygger ContentRows, ud fra et input af forskellige basisressourcer på både svar- og spørgsmålsside.
	

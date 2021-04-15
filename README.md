# AttendanceApp

Ett verktyg för en lärare att ta närvaro i en klass. Applikationen består av 2 
applikationer; ett REST API (backend) i SpringBoot och en webbapplikation 
(frontend) i React. Webbapplikationen ska presentera ett användargränssnitt i 
vilket en lärare kan skapa elever, ta närvaro i en kurs (markera som närvarande 
eller inte) och ta bort elever från en kurs. Webbapplikationen ska tala med ett 
REST API i bakgrunden för att skapa, läsa, uppdatera och ta bort data från en 
databas.


## Specifikation REST API

REST API som ger tillgång till en studentdatabas. Databasen 
ska ha endast en tabell (students). En student har följande attribut: 
- id: (ett numeriskt värde) 
- student_id: (en text/sträng) 
- name: (en text/sträng) 
- last_name: (en text/sträng) 
- age: (ett numeriskt värde) 
- present: (en boolean) 

## Gränssnittet

Gränssnittet ska bara visa en vy till skillnad från tidigare inlämning. Den 
funktionalitet som stöds är att visa samtliga studenter i klassen i en lista, med en 
checkbox vid sidan som indikerar om studenten är närvarande eller inte, samt 
en knapp för att ta bort en student. Nedanför listan finns ett formulär för att 
skapa en ny användare. När användaren har fyllt i användaren och klickat på 
”Create” knappen så syns nu den nya studenten i listan ovan. Samtliga 
funktioner; uppdatera närvaro (checkbox), ta student (delete knapp) och skapa 
student (formulär) ska göra anrop till REST API:et för att persistera 
förändringarna i databas tabellen. 

## Databas

```mysql

CREATE DATABASE attendance_app;

CREATE USER 'attendance_app_user'@'localhost' IDENTIFIED BY 'attendance_app_password';

GRANT ALL PRIVILEGES ON attendance_app.* TO 'attendance_app_user'@'localhost';

FLUSH PRIVILEGES;
```

## Grupp 2
Susanne J.H, Sofie J, Ermin K, Emil I, Michael E

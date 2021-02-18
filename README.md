# Willkommen bei Todont!
Dieses Projekt wurde im Rahmen des Moduls *Cloud Computing* im Wirtschaftsinformatik-Master an der *Hochschule der Medien* erstellt. Es handelt sich dabei um eine simple, cloud-basierte **To-Do-App**, die die wesentlichen Bestandteile einer CRUD-Applikation realisiert. 

Projektteilnehmer:
 - Niklas Fuchs
 - Bruno Herceg
 - Sebastian Hermann
 - Jan Zimpfer

# Verzeichnisse

Es befinden sich zwei Kernverzeichnisse im Repo, die separat zu betrachten sind:

 
|Verzeichnis|  Beschreibung|
|--|--|
| *API* | Enthält den Quellcode der Express-API, sowie deren Anbindung an die Mongo-DB (Treiber, Schema, ...) |
| *Frontend* | Enthält den Quellcode des React-Frontends |
## Installation
#### Clone das Projekt
    git clone https://github.com/SebastianHermann/CloudComputingWS2021.git

Die API und das Frontend wurden als separate Module realisiert, weshalb jedes Verzeichnis über seine eigenen Dependencies verfügt. Wir betrachten zunächst das **API-Verzeichnis**.

### API

    cd /API
Nachdem das Projekt erfolgreich geclont ist, navigiere in der Konsole in das API-Verzeichnis (im Zielverzeichnis müsste sich das File ***package.json*** befinden. Von hier aus müssen nun die notwendigen Bibliotheken installiert werden:

    npm install

Für die Installation sind im Vorfeld weitere Schritte notwendig, die außerhalb des Verzeichnisses ausgeführt werden müssen. Da die API mit einer MongoDB kommunizieren soll, ist das Aufsetzen der Datenbank notwendig. Für das Aufsetzen der Datenbank gibt es zahlreiche Möglichkeiten. Eine einfache Möglichkeit für einen quick-start bietet der von MongoDB zur Verfügung gestellte Cloud-Datenbankdienst [Atlas](https://www.mongodb.com/cloud/atlas).

Für die Erstellung einer Datenbank mit Atlas empfiehlt sich das Durchlesen der offiziellen Dokumentation oder ein Blick auf YouTube. Ganz grob können die Schritte wie folgt zusammengefasst werden:

 1. Erstellung eines neuen Clusters (-->*Create New Cluster*)
 2. Auswahl des Anbieters (z.B. AWS) und der Region (z.B. Frankfurt)
 3. Auswahl des Tiers (z.B. M0 Sandbox für den kostenlosen Service)
 4. Auswahl bestätigen und Cluster erstellen
 5. Security>Database Access: Add New Database User (z.B. dbAdmin)
 6. Security>Network Access: Add IP Adress (aktuelle IP-Adresse)
 7. Klick auf das Cluster > Connect > Connect your application
	 7a. Treiber: Node.js
	 7b. **Connection String kopieren**

Nachdem der **Connection String** in der Zwischen-Ablage sollte ein neues ***.env***-File innerhalb des API-Verzeichnisses erstellt werden, der diesen Connection-String enthält. Dieses File wird von *git* ignoriert, was den Verbindungs-String vor der Öffentlichkeit schützt.

Im **.env**-File, gebe in die erste Zeile die Variablenbezeichnung sowie den Connection-String aus der Zwischenablage ein:

    DB_CONNECTION= <CONNECTION-STRING>
Ist dieser Schritt erfolgt, so kann die API durch folgenden Befehl gestartet werden:

    npm start

## Architektur
Für die Realisierung wurde auf den beliebten **M-E-R-N**-Stack zurückgegriffen. Dieser besteht aus:

 - **M**ongoDB (NoSQL-Datenbank)
 - **E**xpress (Node.js-basiertes Framework zur Erstellung von API's)
 - **R**eact.js (Node.js-basiertes Frontend-Framework)
 - **N**ode (Javascript-Laufzeitumgebung)

# AP2-Tracker

Lern-Tracker für den schriftlichen Teil der IHK-Abschlussprüfung AP2
(Fachinformatiker Systemintegration). Er hält fest, welche Lerninhalte
abgehakt sind, gemessen an einem wochenweisen Lernplan bis zum Prüfungstermin.

## Language

**Bereich**:
Eine der drei Prüfungssäulen: GA1 (Konzeption und Administration von
IT-Systemen), GA2 (Analyse und Entwicklung von Netzwerken), WiSo. Oberste
Gliederungsebene.
_Avoid_: Kategorie, Themenbereich, Prüfungsbereich, Fach

**Themengruppe**:
Ein terminierter Lernblock mit fester Kalenderwoche, z. B. „Block 1 – Server-,
Client- und Hardwarekonzeption". Die Einheit, die **der Plan** chronologisch
einsortiert. Gehört genau zu einem Bereich und bündelt mehrere Kernthemen.
_Avoid_: Block, Thema, Topic, Themenblock, Woche

**Kernthema**:
Ein einzelner, abhakbarer Lerninhalt innerhalb einer Themengruppe, z. B.
„Serverdimensionierung aus Anforderungen ableiten und begründen". Die
kleinste Einheit, an der Fortschritt gemessen wird.
_Avoid_: Item, Lernpunkt, Punkt, Stichpunkt, Aufgabe

**Der Plan**:
Die verbindliche Reihenfolge und Terminierung aller Themengruppen bis zur
Prüfung, plus der feste Wochenrhythmus (welcher Bereich an welchem Wochentag).
Lebt auf der Übersicht-Seite, nicht als Dokument.
_Avoid_: Roadmap, Zeitplan, Lernplan (uneindeutig), Gesamtplan

**Aktuell geplant**:
Eigenschaft einer Themengruppe, deren Kalenderwoche jetzt läuft oder als
nächstes ansteht — das, was laut Plan „gerade dran" ist.
_Avoid_: fällig, aktiv

**Rückstand**:
Zustand einer Themengruppe, deren Kalenderwoche vorbei ist und die noch nicht
zu 100 % abgehakt ist. Wird getrennt von den aktuell geplanten Themengruppen
ausgewiesen.
_Avoid_: überfällig, verpasst, offen

**Wiederholungsmarkierung**:
Eine vom Nutzer gesetzte Markierung an einem Kernthema („zur Wiederholung
markieren"), unabhängig vom Abhaken.
_Avoid_: Flag, Merker, Lesezeichen

**Lerngruppe**:
Alle Konten, die den Tracker nutzen, als eine Gruppe gesehen — und der
Abschnitt auf der Übersicht, der sie als Rangliste zeigt. Jedes Konto ist
standardmäßig dabei (Opt-out über den Konto-Dialog). Sichtbar nur eingeloggt;
zu sehen sind ausschließlich Anzeigename und Zählwerte.
_Avoid_: Leaderboard, Rangliste (als Name des Features), Team, Klasse

**Anzeigename**:
Der Name, unter dem ein Konto in der Lerngruppe erscheint. Bei der
Registrierung aus dem E-Mail-Teil vor dem `@` vorbelegt, im Konto-Dialog frei
änderbar (1–32 Zeichen). Die E-Mail selbst sehen andere nie.
_Avoid_: Nickname, Username, Benutzername, Profilname

**Wochenwertung**:
Die Zahl der Kernthemen, die ein Konto in den letzten 7 Tagen abgehakt hat und
die keine Wiederholungsmarkierung tragen. Standardansicht der Lerngruppe;
„Gesamt" (Prozent aller Kernthemen) ist die zweite Ansicht.
_Avoid_: Wochenscore, Punkte, Streak (das ist etwas anderes)

# GA1: Karteikarten und verteilte Wiederholung

Stand 03.10.2026. Kernthema ga1-12__3, Website /lernen/karteikarten-abruf-und-verteilte-wiederholung/. CURATED_DRAFT bis menschliche Fachfreigabe.

## Quellen und Grenzen

Private Buchquelle europa-integratoren-2026:00031, Zeilen 395–398 direkt gelesen: betriebliche schriftliche Aufgaben nur als Themenanker. docs/AUSBILDUNG_IT_SOURCE_REVIEW.md berücksichtigt. Keine fremden Aufgaben, Abbildungen oder Handouts übernommen.

Direkt gelesene Primärquellen:
- [IES-Praxisleitfaden, 2007](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), Empfehlungen 1 und 5b: verteiltes Lernen und aktiver Abruf. Keine universell optimalen Intervalle abgeleitet.
- [NIST RTO](https://csrc.nist.gov/glossary/term/recovery_time_objective) und [NIST RPO](https://csrc.nist.gov/glossary/term/recovery_point_objective): Glossardefinitionen aus SP 800-34 Rev. 1.
- [NIST SP 800-145](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-145.pdf), Service Models, Druckseiten 2–3.
- [NetApp Windows Server environment](https://docs.netapp.com/us-en/ontap-apps-dbs/microsoft/win_environment.html), Provisioning: Dateifreigaben gegenüber Block-LUNs.
- [Red Hat RHEL 10 RAID](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/managing_storage_devices/managing-raid), 16.3: Redundanz und Layouts.
- [Microsoft Failover Clustering](https://learn.microsoft.com/en-us/windows-server/failover-clustering/failover-clustering-overview), Rollenübernahme und Neustart.
- [AWS ELB](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html), Verteilung auf Ziele und Health Checks.

Noras Fall, 80/20-Minuten-Anforderungen, Karten und Kalender eigenständig erfunden. Wiedererkennen, unterstützter und eigenständiger Abruf getrennt. Beispieltermine sind keine amtlichen oder optimalen AP2-Intervalle. Karten ersetzen keine betriebliche Auswahlbegründung. RAID 10 ausdrücklich klassisches Spiegelpaar-Modell; keine allgemeine Garantie für beliebige zwei Ausfälle. Keine automatische fachliche Freitextbenotung, kein Karteneditor, Wiederholungsalgorithmus oder Kalender implementiert. Bestehende Karten-Selbstkontrolle ist kein geprüfter Leistungsnachweis.

## Gestaltung und Umsetzung

Refero-Skill und Visual-Workflow vollständig gelesen; vorhandener Deep-Space-Referenz-Lock und Screenshot der vorherigen Einheit als Build-Target. Bestehende Panels und Leseflächen weiterverwendet, gemeinsame Styles unverändert. Native technische Ablauf-SVG trennt Frage, Antwort, Kriterienvergleich, späteren Abruf und Anwendung. Keine dekorativen Rasterbilder, kein ASCII-Ersatz und keine künstliche Formel.

Unbewertete Diagnose, drei Pflichtquiz mit differenziertem Feedback, freier Transfer vor Musterfreigabe und sieben technische Karten. Browserprüfung in Gesamtlauf und als retrieval-cards registriert.

## Tatsächlich geprüfter Abschluss

- npm run build bestanden, 817 Dateien; vollständiges npm test nach Inhaltskorrektur bestanden. Buchimportprüfung im Worktree mangels Importdaten übersprungen; privater Themenanker separat im Hauptrepo gelesen.
- Gezielte Chromium-Prüfung AP2_BROWSER_ONLY=retrieval-cards bestanden: falsche/richtige Antworten und Feedback, Reset, Diagnose ohne Pflichtfreigabe, Transfer-Mindestlänge und Muster, Enter/Space auf allen sieben Karten, Reload-Persistenz, Abschluss/Rücknahme, erneute Sperre nach Pflichtquiz-Reset.
- 390/1440 Pixel jeweils Dark/Light: Einstieg, Quiz, Transfer, Kartenvorderseite, ausgewählte Rückseiten und Diagramm aufgenommen. Einstieg mobil Dark, Quiz/Transfer mobil Light, Karten mobil/Desktop, Cloud-Rückseite mobil Light, Cluster-Rückseite mobil Dark und Diagramm Desktop Dark/Light visuell kontrolliert.
- Zusätzlicher Test erkannte zu lange Cloud-Rückseite; Cloud- und Clusterantworten gekürzt. Finaler Test prüft alle sieben Vorder-/Rückseiten auf Textüberlappung mit Label, Hinweis und Kartenrand und besteht in allen vier Varianten.
- Keine seitlichen Seitenüberläufe oder JavaScript-Seitenfehler in geprüften Zuständen. SVG-Texte innerhalb Canvas; mobile Grafikverschiebung mit Fokus und rechter Pfeiltaste geprüft.
- Evidenz: C:/Users/timed/AppData/Local/Temp/ap2-cards-20261003/. Signed-in-Testfixture, keine echten Kontoschreibvorgänge. Keine Behauptung eines erneut vollständig geprüften globalen Bewegungs-/Navigationssystems.

Abdeckung insgesamt 262/380, GA1 154/164; ga1-12: 4/6 Lernentwürfe. Keine menschliche Fachfreigabe, kein Push, keine Veröffentlichung.

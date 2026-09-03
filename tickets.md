# Tickets: UI-Hierarchie-Kur

Übersicht der Tracer-Bullet-Tickets zur Spec [#5](https://github.com/timedelmann37/ap2-tracker/issues/5).
Quelle der Wahrheit sind die GitHub-Issues; diese Datei ist nur die Landkarte.

## Abhängigkeitsgraph

```
#7  T1 Bottom-Tab-Bar ─────────────► #9  T2 Suche ──────────────┐
                                                                 ▼
#8  T3 Übersicht ──┬──► #10 T4 Hub ──┐                          #13 T7 Abschluss
                   ├──► #11 T5 Themenseiten ──┼──► #12 T6 Interaktionen ─┘
                   └───────────────────────────┘
```

**Start-Frontier (sofort bearbeitbar, parallel): #7 und #8.**

| # | Ticket | Blocked by |
|---|---|---|
| [#7](https://github.com/timedelmann37/ap2-tracker/issues/7)  | T1 — Shell: Mobile-Bottom-Tab-Bar | — |
| [#8](https://github.com/timedelmann37/ap2-tracker/issues/8)  | T3 — Übersicht wird „Zoom-out"-Seite | — |
| [#9](https://github.com/timedelmann37/ap2-tracker/issues/9)  | T2 — Bereichsübergreifende Suche | #7 |
| [#10](https://github.com/timedelmann37/ap2-tracker/issues/10) | T4 — Hub: „Diese Woche"-Hero + Kachel-Wand raus | #8 |
| [#11](https://github.com/timedelmann37/ap2-tracker/issues/11) | T5 — Themenseiten: Kopf entschlacken | #8 |
| [#12](https://github.com/timedelmann37/ap2-tracker/issues/12) | T6 — Interaktionsschicht | #8, #10, #11 |
| [#13](https://github.com/timedelmann37/ap2-tracker/issues/13) | T7 — Abschluss: v3.6.0 + Changelog + ADR 0001 | #9, #12 |

---

## #7 · T1 — Shell: Mobile-Bottom-Tab-Bar

**Blocked by:** — (sofort)

Auf allen fünf Seiten (Hub, Übersicht, Konzeption & Administration, Netzwerke, SoWi) bekommt die kopierte UI-Shell eine feste Bottom-Tab-Bar für ≤ 820 px: **Übersicht · GA1 · GA2 · WiSo · Suche**. Desktop-Top-Nav unverändert.

- Flach: Haarlinie oben, kein Schatten.
- Aktive Seite markiert. Kein Inhalt wird verdeckt. Hub übers Logo.
- „Suche"-Eintrag vorhanden, öffnet die (bis #9 leere) Suchfläche ohne zu brechen.
- `/simulation/` unberührt.

---

## #8 · T3 — Übersicht wird die „Zoom-out"-Seite

**Blocked by:** — (sofort)

Die Übersicht nimmt das komplette Fortschrittsbild auf, das bisher nur auf dem Hub lag.

- **Fortschrittsbild oben:** Gesamt + je ein Balken pro Bereich, Aktivitäts-Heatmap, Streaks, „zuletzt bearbeitet". Heatmap auf schmalem Bildschirm horizontal scrollbar.
- **Zeitverlauf:** alle Themengruppen als vertikale Timeline nach Kalenderwoche, je Mini-Fortschritt. Vergangene Wochen eingeklappt, „jetzt" beim Laden angesprungen, Rückstand markiert, Klick öffnet den Block. Ersetzt die 31-Zeilen-Tabelle.
- **Wochenrhythmus:** ein-/ausklappbare Referenzkarte am Seitenende.
- Führt die abgeleiteten Plan-Begriffe **aktuell geplant** und **Rückstand** in der Inline-Status-Logik ein.
- Kein Schema-Change, Cloud-Sync läuft weiter.

---

## #9 · T2 — Bereichsübergreifende Suche

**Blocked by:** #7

Suche über die Titel aller Themengruppen und alle Kernthemen der drei Bereiche.

- **Desktop:** immer sichtbares Suchfeld in der Nav; „Nachschlagewerk – bald"-Platzhalter bleibt daneben.
- **Mobil:** „Suche"-Tab öffnet dieselbe Fläche.
- Treffer zeigt Bereich + Themengruppe, springt per Deep-Link in den Block (bestehende Highlight-/Jump-Hilfen wiederverwenden).
- „Keine Treffer"-Zustand; leeren/schließen.
- Vollständiges „Nachschlagewerk" bleibt außen vor.

---

## #10 · T4 — Hub: „Diese Woche"-Hero + Kachel-Wand raus

**Blocked by:** #8 (Dashboard muss erst auf der Übersicht angekommen sein)

- **Hero „Diese Woche":** bis zu 3 aktuell geplante Themengruppen (je Bereich), Fortschrittsbalken + „weitermachen" (Block öffnen, aufklappen, zum ersten offenen Kernthema scrollen). Heutiger Bereich laut Wochenrhythmus hervorgehoben.
- **Rückstand-Zeile:** kompakt, aufklappbar zu den überfälligen Themengruppen.
- **Countdown** = 1 Zeile. **„Gesamt: X %"** = 1 Zeile mit Link zur Übersicht.
- **Entfernt:** Bento-Kachel-Gruppen + Dashboard-Panel.
- Nutzt die `aktuell geplant` / `Rückstand`-Herleitung aus #8.

---

## #11 · T5 — Themenseiten: Kopf entschlacken

**Blocked by:** #8 (geteilte `aktuell geplant`-Herleitung)

×3 quasi identische Seiten:

- Vier Stat-Tiles → **eine Fortschrittszeile** (X/Y Kernthemen · N markiert · M in Rückstand).
- Aktuell geplante Themengruppe beim Laden **aufgeklappt**, Rest zu; übrige frei auf-/zuklappbar.
- „Was ist dran?"-Tabelle → schmaler Hinweis.
- Unverändert: Live-Suche, „Markiert"-Filter, „alle auf/zu", Minispiele, Export/Import.

---

## #12 · T6 — Interaktionsschicht

**Blocked by:** #8, #10, #11

Alles respektiert `prefers-reduced-motion` und entfällt dort komplett.

- Kernthema abhaken → Haken-Draw + leichter Scale-Bounce.
- Fortschrittsbalken füllen animiert (Hub, Übersicht, Themenseiten).
- Themengruppe 100 % → dezente Feier: grüner Puls + Haken, **kein Konfetti**.
- View Transitions für Seitenwechsel + Accordion-Öffnen.
- **Keine Tastatur-Navigation.** Keine Schatten/Glows/Blur.

---

## #13 · T7 — Abschluss: v3.6.0 + Changelog + ADR 0001

**Blocked by:** #9, #12

- **v3.6.0:** `APP_VERSION`, `CHANGELOG`-Array (Hub-Script) und `CHANGELOG.md` konsistent, ein zusammenfassender Eintrag. Minor-Bump (keine URL-Änderungen).
- **ADR `docs/adr/0001-hub-fuehrt-mit-diese-woche.md`:** „Hub führt mit *Diese Woche*, Dashboard → Übersicht" — Kontext, Entscheidung, Trade-off (Fokus vs. Überblick auf einen Blick; der Hub war seit v3.0.0 bewusst ein Dashboard).

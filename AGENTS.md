# AGENTS.md

Hinweise für KI-Agenten, die an diesem Repo arbeiten.

Dieses Repo ist eine statische Lern-Website (HTML/CSS/JS, kein Build-Schritt),
die über Netlify ausgeliefert wird. Jeder Ordner mit eigener `index.html`
wird unter dem passenden Pfad veröffentlicht. Siehe `README.md` für die
Struktur und `CONTRIBUTING.md` für die Spielregeln bei der Zusammenarbeit
(insbesondere: `/simulation/` gehört einem anderen Entwickler und wird
nicht angefasst).

## Agent skills

### Issue tracker

Issues und Specs leben als GitHub Issues (`timedelmann37/ap2-tracker`),
Bedienung über die `gh` CLI. Siehe `docs/agents/issue-tracker.md`.

### Domain docs

Single-Context: `CONTEXT.md` + `docs/adr/` im Repo-Root (beide noch nicht
angelegt — werden bei Bedarf durch `/domain-modeling` erzeugt). Siehe
`docs/agents/domain.md`.

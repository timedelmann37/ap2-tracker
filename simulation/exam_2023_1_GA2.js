window.exam_2023_1_GA2 = {
  id: "2023_1_GA2",
  title: "Sommer 2023 - GA2",
  subtitle: "Abschlussprüfung Sommer 2023 – Fachinformatiker/Fachinformatikerin Systemintegration (AO 2020) – Teil 2: Analyse und Entwicklung von Netzwerken",
  duration: 90,
  totalPoints: 100,

  // Übergreifende Ausgangssituation (Seite 2 der Prüfung)
  ausgangssituation: {
    title: "Ausgangssituation (bezieht sich auf die Aufgaben 1 bis 4)",
    text: "Sie arbeiten als Fachinformatiker bei der 1234-IT-Systemhaus GmbH. Für Ihren Arbeitgeber beraten Sie u. a. ein Autohaus, die Fahrguth GmbH. Das Autohaus betreibt neben der Zentrale noch Filialen an drei Standorten. Den Netzwerkplan des Autohauses finden Sie in der perforierten Anlage.",
    anlageTitle: "Anlage 1: Netzwerkplan der Fahrguth GmbH",
    anlageDescription: "Topologie der Zentrale Essen und der drei Filialen (Bochum, Duisburg, Dortmund) mit IP-Netzen, Routern und Schnittstellen.",
    // Vektorgrafik des Netzwerkplans aus Anlage 1 (Seite 3 der Prüfung)
    anlageSvg: `
      <svg viewBox="0 0 900 620" class="network-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a5568"/>
            <stop offset="100%" stop-color="#2d3748"/>
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>

        <!-- Hintergrundbereich -->
        <rect width="900" height="620" rx="10" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="1.5"/>
        <text x="450" y="32" text-anchor="middle" font-weight="700" font-size="16" fill="var(--text-primary)" font-family="var(--font-body)">Anlage 1: Netzwerkplan der Fahrguth GmbH</text>

        <!-- VERBINDUNGSLINIEN -->
        <!-- Essen IF2 nach Bochum -->
        <line x1="430" y1="360" x2="330" y2="460" stroke="var(--cat-ga1)" stroke-width="3"/>
        <!-- Essen IF3 nach Duisburg -->
        <line x1="450" y1="350" x2="230" y2="280" stroke="var(--cat-ga1)" stroke-width="3"/>
        <!-- Essen IF4 nach Dortmund -->
        <line x1="470" y1="360" x2="410" y2="150" stroke="var(--cat-ga1)" stroke-width="3"/>
        <!-- Essen dsl ins Internet -->
        <line x1="480" y1="390" x2="600" y2="270" stroke="var(--text-muted)" stroke-width="2.5"/>
        <!-- Essen IF1 zur Zentrale Essen LAN -->
        <line x1="460" y1="410" x2="550" y2="470" stroke="var(--cat-ga1)" stroke-width="3"/>
        <!-- Zentrale Essen zu Fileserver -->
        <line x1="620" y1="485" x2="690" y2="485" stroke="var(--border-strong)" stroke-width="2"/>

        <!-- GESTRICHELTE LINIE (geplante Redundanzleitung Bochum - Duisburg) -->
        <line x1="330" y1="460" x2="230" y2="280" stroke="var(--status-warning)" stroke-width="2.5" stroke-dasharray="6,6"/>
        <text x="245" y="385" font-size="11.5" font-weight="600" fill="var(--status-warning)" transform="rotate(-60, 245, 385)">Geplante Standleitung (10 Gbit/s)</text>

        <!-- BESCHRIFTUNG DER LINKS -->
        <!-- Transfernetz Bochum - Essen -->
        <rect x="340" y="405" width="105" height="20" rx="3" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
        <text x="392" y="419" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="var(--text-primary)">192.168.0.0/30</text>

        <!-- Transfernetz Duisburg - Essen -->
        <rect x="290" y="300" width="105" height="20" rx="3" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
        <text x="342" y="314" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="var(--text-primary)">192.168.0.4/30</text>

        <!-- Transfernetz Dortmund - Essen -->
        <rect x="420" y="240" width="105" height="20" rx="3" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
        <text x="472" y="254" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="var(--text-primary)">192.168.0.8/30</text>

        <!-- ROUTER ESSEN -->
        <g transform="translate(425, 350)" filter="url(#shadow)">
          <circle cx="25" cy="25" r="28" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
          <path d="M12 25 L38 25 M25 12 L25 38 M18 18 L32 32 M18 32 L32 18" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
          <text x="25" y="68" text-anchor="middle" font-weight="700" font-size="13" fill="var(--text-primary)">Router Essen</text>
          <!-- Interfaces Beschriftung -->
          <text x="-12" y="10" font-size="11" font-family="var(--font-mono)" font-weight="600" fill="var(--cat-ga2)">IF2</text>
          <text x="-10" y="-8" font-size="11" font-family="var(--font-mono)" font-weight="600" fill="var(--cat-ga2)">IF3</text>
          <text x="18" y="-12" font-size="11" font-family="var(--font-mono)" font-weight="600" fill="var(--cat-ga2)">IF4</text>
          <text x="50" y="5" font-size="11" font-family="var(--font-mono)" font-weight="600" fill="var(--cat-ga2)">dsl</text>
          <text x="38" y="45" font-size="11" font-family="var(--font-mono)" font-weight="600" fill="var(--cat-ga2)">IF1</text>
        </g>

        <!-- FILIALE BOCHUM -->
        <g transform="translate(290, 430)">
          <!-- Router Bochum -->
          <circle cx="40" cy="30" r="22" fill="#64748b" stroke="#334155" stroke-width="2"/>
          <path d="M30 30 L50 30 M40 20 L40 40" stroke="#ffffff" stroke-width="2"/>
          <text x="40" y="68" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-secondary)">Router Bochum</text>
          <!-- Netz-Ellipse -->
          <ellipse cx="-100" cy="30" rx="65" ry="32" fill="var(--surface-2)" stroke="var(--cat-ga1)" stroke-width="2"/>
          <line x1="-35" y1="30" x2="18" y2="30" stroke="var(--cat-ga1)" stroke-width="2.5"/>
          <text x="-100" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-primary)">Filiale Bochum</text>
          <text x="-100" y="42" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="var(--cat-ga1)">10.2.0.0/16</text>
        </g>

        <!-- FILIALE DUISBURG -->
        <g transform="translate(190, 250)">
          <!-- Router Duisburg -->
          <circle cx="40" cy="30" r="22" fill="#64748b" stroke="#334155" stroke-width="2"/>
          <path d="M30 30 L50 30 M40 20 L40 40" stroke="#ffffff" stroke-width="2"/>
          <text x="40" y="68" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-secondary)">Router Duisburg</text>
          <!-- Netz-Ellipse -->
          <ellipse cx="-80" cy="-20" rx="65" ry="32" fill="var(--surface-2)" stroke="var(--cat-ga1)" stroke-width="2"/>
          <line x1="-35" y1="0" x2="20" y2="20" stroke="var(--cat-ga1)" stroke-width="2.5"/>
          <text x="-80" y="-26" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-primary)">Filiale Duisburg</text>
          <text x="-80" y="-8" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="var(--cat-ga1)">10.3.0.0/16</text>
        </g>

        <!-- FILIALE DORTMUND -->
        <g transform="translate(370, 120)">
          <!-- Router Dortmund -->
          <circle cx="40" cy="30" r="22" fill="#64748b" stroke="#334155" stroke-width="2"/>
          <path d="M30 30 L50 30 M40 20 L40 40" stroke="#ffffff" stroke-width="2"/>
          <text x="40" y="-8" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-secondary)">Router Dortmund</text>
          <!-- Netz-Ellipse -->
          <ellipse cx="-100" cy="30" rx="65" ry="32" fill="var(--surface-2)" stroke="var(--cat-ga1)" stroke-width="2"/>
          <line x1="-35" y1="30" x2="18" y2="30" stroke="var(--cat-ga1)" stroke-width="2.5"/>
          <text x="-100" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-primary)">Filiale Dortmund</text>
          <text x="-100" y="42" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="var(--cat-ga1)">10.4.0.0/16</text>
        </g>

        <!-- INTERNET -->
        <g transform="translate(600, 220)">
          <rect x="0" y="0" width="110" height="50" rx="25" fill="#475569" stroke="#334155" stroke-width="2"/>
          <text x="55" y="30" text-anchor="middle" font-size="13" font-weight="700" fill="#ffffff">Internet</text>
        </g>

        <!-- ZENTRALE ESSEN -->
        <g transform="translate(520, 445)">
          <ellipse cx="60" cy="40" rx="75" ry="38" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2.5"/>
          <text x="60" y="34" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text-primary)">Zentrale Essen</text>
          <text x="60" y="52" text-anchor="middle" font-size="11.5" font-family="var(--font-mono)" fill="var(--cat-ga1)">10.1.0.0/16</text>
        </g>

        <!-- FILESERVER -->
        <g transform="translate(690, 455)">
          <rect x="0" y="0" width="120" height="60" rx="6" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.5"/>
          <rect x="8" y="10" width="104" height="10" rx="2" fill="#334155"/>
          <circle cx="15" cy="15" r="2.5" fill="#10b981"/>
          <circle cx="23" cy="15" r="2.5" fill="#3b82f6"/>
          <rect x="8" y="25" width="104" height="10" rx="2" fill="#334155"/>
          <circle cx="15" cy="30" r="2.5" fill="#10b981"/>
          <circle cx="23" cy="30" r="2.5" fill="#3b82f6"/>
          <text x="60" y="47" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">Fileserver</text>
          <text x="60" y="76" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="var(--cat-ga2)">IP: 10.1.0.10</text>
        </g>
      </svg>
    `
  },

  tasks: [
    // ==========================================
    // 1. AUFGABE (26 PUNKTE)
    // ==========================================
    {
      id: "1",
      title: "1. Aufgabe",
      points: 26,
      context: "Am Hauptsitz der Fahrguth GmbH in Essen arbeiten rund 60 Mitarbeiter, die den Bereichen Verkauf, Verwaltung, Werkstatt und Administration zugeordnet sind. Für jeden Bereich wurde ein eigenes VLAN erstellt, zusätzlich existiert ein weiteres VLAN für die Server.",
      subtasks: [
        {
          id: "1aa",
          sectionTitle: "a) Switch-Verkabelung und VLAN-Einsatz",
          intro: "Das interne Netzwerk ist aus mehreren Switches aufgebaut, die wie abgebildet verbunden sind (dicke schwarze Linie). Der eingesetzte Gebäude-Verteiler im Serverraum ist ein Layer-3-Switch, der für jedes VLAN das Standardgateway darstellt. Die Geräte der Mitarbeiter sind an die beiden Layer-2-Switche über Patchfelder und -dosen angeschlossen.",
          diagramSvg: `
            <svg viewBox="0 0 760 320" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Gebäudeplan -->
              <rect x="20" y="20" width="720" height="280" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="2"/>
              <!-- Raumtrennwände -->
              <line x1="450" y1="20" x2="450" y2="300" stroke="var(--border-strong)" stroke-width="2"/>
              <line x1="20" y1="160" x2="450" y2="160" stroke="var(--border-strong)" stroke-width="2"/>

              <!-- Raumbeschriftungen -->
              <text x="235" y="90" text-anchor="middle" font-weight="600" font-size="15" fill="var(--text-secondary)">Verkaufsraum</text>
              <text x="235" y="275" text-anchor="middle" font-weight="600" font-size="15" fill="var(--text-secondary)">Serverraum</text>
              <text x="585" y="160" text-anchor="middle" font-weight="600" font-size="15" fill="var(--text-secondary)">Werkstatt</text>

              <!-- Dicke Verbindungslinien -->
              <line x1="210" y1="210" x2="100" y2="210" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="100" y1="210" x2="100" y2="110" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="260" y1="210" x2="400" y2="210" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="400" y1="210" x2="520" y2="210" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="520" y1="210" x2="520" y2="110" stroke="var(--text-primary)" stroke-width="5"/>

              <!-- Serverraum Switch & Server -->
              <g transform="translate(200, 190)">
                <rect width="60" height="36" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                <text x="30" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#60a5fa">L3-Switch</text>
              </g>
              <g transform="translate(275, 185)">
                <rect width="45" height="46" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
                <text x="22" y="28" text-anchor="middle" font-size="9" font-weight="600" fill="#34d399">Server</text>
              </g>

              <!-- Verkaufsraum L2 Switch -->
              <g transform="translate(70, 90)">
                <rect width="60" height="36" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                <text x="30" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e2e8f0">L2-Switch</text>
              </g>

              <!-- Werkstatt L2 Switch -->
              <g transform="translate(490, 90)">
                <rect width="60" height="36" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                <text x="30" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e2e8f0">L2-Switch</text>
              </g>
            </svg>
          `,
          text: "aa) Beschreiben Sie zwei Gründe, die die Fahrguth GmbH dazu bewogen haben könnten, VLANs zu verwenden.",
          points: 4,
          type: "textarea",
          solution: "- Mehr Sicherheit, da logische Trennung der Netzwerksegmente\n- Mehr Flexibilität, da neue Netzwerksegmente leicht erzeugt werden können\n- Weniger Hardware, da mehrere Netzwerksegmente auf einem Switch/Kabel laufen\n- Weniger Kosten, da weniger Hardware angeschafft werden muss\n- Weniger Verkabelung, da mehrere Netzwerksegmente auf einem Switch/Kabel laufen\n\n(Andere Lösungen sind möglich.)"
        },
        {
          id: "1ab",
          text: "ab) Zwischen den Switches werden Verbindungen nach Standard IEEE 802.1q eingesetzt. Auf diesen Verbindungen wird in jeden Frame ein 32 Bit großes Zusatzfeld (Q-Tag) eingefügt.\nErläutern Sie, weshalb dies geschieht, und nennen Sie eine der Informationen, die in diesem Zusatzfeld enthalten ist.",
          points: 3,
          type: "textarea",
          solution: "Zwischen den Switches muss die Information, zu welchem VLAN ein Frame gehört, mitgeschickt werden. Ein Standard-Frame hat dafür keine Felder in seinem Header vorgesehen.\nEine Information, die in diesen Tag geschrieben wird, ist die VLAN-ID.\n\n(Andere Lösungen sind möglich.)"
        },
        {
          id: "1ac",
          text: "ac) Eine Zuordnung zu einem VLAN kann z. B. statisch oder per IEEE 802.1X erfolgen.\nErläutern Sie jeweils anhand eines Beispiels, was man darunter versteht.",
          points: 4,
          type: "textarea",
          solution: "Statisch: Der Administrator ordnet die Ports manuell fest einem bestimmten VLAN zu.\nBeispiel: Ports in der Werkstatt werden dem VLAN „Werkstatt“ zugeordnet.\n\nIEEE 802.1X: Ein Gerät wird anhand der Anmeldedaten einem bestimmten VLAN zugeordnet.\nBeispiel: Der Useraccount „Chef“ wird immer dem VLAN-Verwaltung zugeordnet, egal an welchem PC des Unternehmens er sich anmeldet."
        },
        {
          id: "1ba",
          sectionTitle: "b) DHCP-Konfiguration und Relay",
          intro: "Sie sind für die PCs der Mitarbeiter zuständig. Diese sollen an das Netzwerk angeschlossen werden.",
          diagramSvg: `
            <svg viewBox="0 0 650 140" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="650" height="140" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="1"/>
              <!-- Client PC Icon -->
              <g transform="translate(50, 30)">
                <rect x="0" y="0" width="50" height="38" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                <rect x="5" y="5" width="40" height="28" fill="#0284c7"/>
                <rect x="18" y="38" width="14" height="12" fill="#94a3b8"/>
                <rect x="8" y="50" width="34" height="5" rx="2" fill="#64748b"/>
                <text x="25" y="72" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Client</text>
              </g>
              <!-- 4 Kommunikations-Pfeile -->
              <line x1="125" y1="35" x2="490" y2="35" stroke="var(--cat-ga1)" stroke-width="2.5"/>
              <polygon points="490,30 500,35 490,40" fill="var(--cat-ga1)"/>
              <text x="312" y="30" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">1. ──────────────────────────►</text>

              <line x1="490" y1="58" x2="135" y2="58" stroke="var(--cat-ga2)" stroke-width="2.5"/>
              <polygon points="135,53 125,58 135,63" fill="var(--cat-ga2)"/>
              <text x="312" y="54" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">◄────────────────────────── 2.</text>

              <line x1="125" y1="82" x2="490" y2="82" stroke="var(--cat-ga1)" stroke-width="2.5"/>
              <polygon points="490,77 500,82 490,87" fill="var(--cat-ga1)"/>
              <text x="312" y="78" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">3. ──────────────────────────►</text>

              <line x1="490" y1="106" x2="135" y2="106" stroke="var(--cat-ga2)" stroke-width="2.5"/>
              <polygon points="135,101 125,106 135,111" fill="var(--cat-ga2)"/>
              <text x="312" y="102" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">◄────────────────────────── 4.</text>

              <!-- Server Icon -->
              <g transform="translate(530, 30)">
                <rect x="0" y="0" width="55" height="52" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
                <line x1="5" y1="18" x2="50" y2="18" stroke="#334155" stroke-width="1.5"/>
                <line x1="5" y1="34" x2="50" y2="34" stroke="#334155" stroke-width="1.5"/>
                <circle cx="12" cy="9" r="2.5" fill="#10b981"/>
                <circle cx="12" cy="26" r="2.5" fill="#10b981"/>
                <circle cx="12" cy="43" r="2.5" fill="#10b981"/>
                <text x="28" y="72" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Server</text>
              </g>
            </svg>
          `,
          text: "ba) Nach der Anmeldung eines Clients soll dieser vom DHCP-Server per DHCP eine IP-Adresse aus dem Bereich des jeweiligen VLANs erhalten. Auf dem DHCP-Server wurde daher für jedes VLAN ein Adresspool eingerichtet.\nBenennen Sie die vier Kommunikationsschritte bei der erfolgreichen Zuteilung einer IP-Adresse via DHCP.",
          points: 4,
          type: "textarea",
          solutionDiagramSvg: `
            <svg viewBox="0 0 650 160" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="650" height="160" rx="8" fill="var(--surface-1)" stroke="var(--status-good)" stroke-width="1.5"/>
              <!-- Client PC Icon -->
              <g transform="translate(45, 35)">
                <rect x="0" y="0" width="50" height="38" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                <rect x="5" y="5" width="40" height="28" fill="#0284c7"/>
                <rect x="18" y="38" width="14" height="12" fill="#94a3b8"/>
                <rect x="8" y="50" width="34" height="5" rx="2" fill="#64748b"/>
                <text x="25" y="72" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Client</text>
              </g>
              <!-- 4 Kommunikations-Pfeile mit IHK-Lösung -->
              <!-- 1: Discover -->
              <line x1="125" y1="35" x2="490" y2="35" stroke="var(--cat-ga1)" stroke-width="2.5"/>
              <polygon points="490,30 500,35 490,40" fill="var(--cat-ga1)"/>
              <rect x="210" y="22" width="200" height="22" rx="3" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
              <text x="310" y="37" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-primary)">1. DHCP Discover</text>
              <!-- 2: Offer -->
              <line x1="490" y1="65" x2="135" y2="65" stroke="var(--cat-ga2)" stroke-width="2.5"/>
              <polygon points="135,60 125,65 135,70" fill="var(--cat-ga2)"/>
              <rect x="210" y="52" width="200" height="22" rx="3" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
              <text x="310" y="67" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-primary)">2. DHCP Offer</text>
              <!-- 3: Request -->
              <line x1="125" y1="95" x2="490" y2="95" stroke="var(--cat-ga1)" stroke-width="2.5"/>
              <polygon points="490,90 500,95 490,100" fill="var(--cat-ga1)"/>
              <rect x="210" y="82" width="200" height="22" rx="3" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
              <text x="310" y="97" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-primary)">3. DHCP Request</text>
              <!-- 4: Ack -->
              <line x1="490" y1="125" x2="135" y2="125" stroke="var(--cat-ga2)" stroke-width="2.5"/>
              <polygon points="135,120 125,125 135,130" fill="var(--cat-ga2)"/>
              <rect x="210" y="112" width="200" height="22" rx="3" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
              <text x="310" y="127" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-primary)">4. DHCP Ack</text>

              <!-- Server Icon -->
              <g transform="translate(525, 35)">
                <rect x="0" y="0" width="55" height="52" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
                <line x1="5" y1="18" x2="50" y2="18" stroke="#334155" stroke-width="1.5"/>
                <line x1="5" y1="34" x2="50" y2="34" stroke="#334155" stroke-width="1.5"/>
                <circle cx="12" cy="9" r="2.5" fill="#10b981"/>
                <circle cx="12" cy="26" r="2.5" fill="#10b981"/>
                <circle cx="12" cy="43" r="2.5" fill="#10b981"/>
                <text x="28" y="72" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Server</text>
              </g>
            </svg>
          `,
          solution: "DHCP Discover\nDHCP Offer\nDHCP Request\nDHCP Ack"
        },
        {
          id: "1bb",
          text: "bb) Der DHCP-Server befindet sich im Server-VLAN, der Client in einem der Benutzer-VLANs. An den Switches wurden bisher nur die VLAN-Konfigurationen fehlerfrei eingerichtet.\nErläutern Sie, warum der DHCP-Prozess zunächst fehlschlägt, und welche Einstellungen vom Admin am Layer-3-Switch zusätzlich vorzunehmen sind, sodass der DHCP-Server alle VLANs mit IP-Adressen versorgen kann.",
          points: 3,
          type: "textarea",
          solution: "DHCP arbeitet als Broadcast, dieser endet am Layer-3-Switch. DHCP-Relay für jedes VLAN-Interface konfigurieren, sodass der DHCP-Broadcast an den DHCP-Server weitergeleitet wird.\n\n(ip helper-address auch gültige Lösung)"
        },
        {
          id: "1ca",
          sectionTitle: "c) Redundanz & LWL-Module",
          intro: "Die Verbindung zwischen den Switches soll zukünftig wie abgebildet redundant ausgelegt werden (neue Verbindung: gestrichelte Linie). Dazu werden neue SFP+ Module für die Switche beschafft.",
          diagramSvg: `
            <svg viewBox="0 0 760 320" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="720" height="280" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="2"/>
              <line x1="450" y1="20" x2="450" y2="300" stroke="var(--border-strong)" stroke-width="2"/>
              <line x1="20" y1="160" x2="450" y2="160" stroke="var(--border-strong)" stroke-width="2"/>

              <text x="235" y="90" text-anchor="middle" font-weight="600" font-size="15" fill="var(--text-secondary)">Verkaufsraum</text>
              <text x="235" y="275" text-anchor="middle" font-weight="600" font-size="15" fill="var(--text-secondary)">Serverraum</text>
              <text x="585" y="160" text-anchor="middle" font-weight="600" font-size="15" fill="var(--text-secondary)">Werkstatt</text>

              <!-- Bestehende Verbindungen (durchgezogen) -->
              <line x1="210" y1="210" x2="100" y2="210" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="100" y1="210" x2="100" y2="110" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="260" y1="210" x2="400" y2="210" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="400" y1="210" x2="520" y2="210" stroke="var(--text-primary)" stroke-width="5"/>
              <line x1="520" y1="210" x2="520" y2="110" stroke="var(--text-primary)" stroke-width="5"/>

              <!-- NEUE REDUNDANTE VERBINDUNG (gestrichelt) -->
              <line x1="130" y1="110" x2="490" y2="110" stroke="var(--status-critical)" stroke-width="4" stroke-dasharray="8,6"/>
              <text x="310" y="100" text-anchor="middle" font-size="12" font-weight="700" fill="var(--status-critical)">Neue Verbindung (redundant)</text>

              <!-- Geräte -->
              <g transform="translate(200, 190)">
                <rect width="60" height="36" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                <text x="30" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#60a5fa">L3-Switch</text>
              </g>
              <g transform="translate(275, 185)">
                <rect width="45" height="46" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
                <text x="22" y="28" text-anchor="middle" font-size="9" font-weight="600" fill="#34d399">Server</text>
              </g>
              <g transform="translate(70, 90)">
                <rect width="60" height="36" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                <text x="30" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e2e8f0">L2-Switch</text>
              </g>
              <g transform="translate(490, 90)">
                <rect width="60" height="36" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                <text x="30" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e2e8f0">L2-Switch</text>
              </g>
            </svg>
          `,
          text: "ca) Erläutern Sie, was man unter einem SFP+ Modul versteht und worin sich SFP und SFP+ unterscheiden.",
          points: 3,
          type: "textarea",
          solution: "SFP-Module erweitern einen Switch um einen bestimmten Anschluss, bspw. um dort eine Glasfaser anschließen zu können. SFP+ bietet höhere Übertragungsrate als SFP (SFP+ 10 GBit/s, SFP nur bis 1 GBit/s)."
        },
        {
          id: "1cb",
          intro: `Im Datenblatt der bestellten Module finden Sie folgende Angaben:
Übertragungsrate:    1.000 Mbps
Typ:                 Duplex
Glasfaserart:        Multimode
Anschluss:           LC
LWL-Strecke:         2 km
Betriebswellenlänge: 1.310 nm`,
          text: "cb) Kreuzen Sie an, welchen Stecker ein Glasfaserkabel besitzen muss, um mit dem Modul zusammenzuarbeiten.",
          points: 1,
          type: "radio_visual",
          options: [
            {
              id: "LC",
              label: "LC-Stecker (Lucent Connector)",
              isCorrect: true,
              svg: `
                <svg viewBox="0 0 160 100" class="connector-svg" xmlns="http://www.w3.org/2000/svg">
                  <rect width="160" height="100" rx="4" fill="var(--surface-2)"/>
                  <!-- LC Duplex Stecker -->
                  <rect x="30" y="32" width="75" height="36" rx="3" fill="#475569" stroke="#334155" stroke-width="1.5"/>
                  <rect x="15" y="38" width="15" height="10" rx="1" fill="#cbd5e1"/>
                  <rect x="15" y="52" width="15" height="10" rx="1" fill="#cbd5e1"/>
                  <!-- Arretier-Hebel (Latch) -->
                  <path d="M50 32 L85 18 L95 24 L65 32 Z" fill="#64748b"/>
                  <!-- Kabeltülle -->
                  <rect x="105" y="42" width="30" height="16" rx="2" fill="#1e293b"/>
                  <text x="80" y="88" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-primary)">LC-Stecker</text>
                </svg>
              `
            },
            {
              id: "SC",
              label: "SC-Stecker (Subscriber Connector)",
              isCorrect: false,
              svg: `
                <svg viewBox="0 0 160 100" class="connector-svg" xmlns="http://www.w3.org/2000/svg">
                  <rect width="160" height="100" rx="4" fill="var(--surface-2)"/>
                  <!-- SC Duplex Stecker -->
                  <rect x="25" y="25" width="80" height="50" rx="2" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
                  <rect x="12" y="32" width="13" height="15" rx="1" fill="#cbd5e1"/>
                  <rect x="12" y="53" width="13" height="15" rx="1" fill="#cbd5e1"/>
                  <rect x="105" y="38" width="35" height="24" rx="2" fill="#1e293b"/>
                  <text x="80" y="90" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-primary)">SC-Stecker</text>
                </svg>
              `
            },
            {
              id: "ST",
              label: "ST-Stecker (Straight Tip)",
              isCorrect: false,
              svg: `
                <svg viewBox="0 0 160 100" class="connector-svg" xmlns="http://www.w3.org/2000/svg">
                  <rect width="160" height="100" rx="4" fill="var(--surface-2)"/>
                  <!-- ST Bajonett Stecker -->
                  <circle cx="55" cy="50" r="22" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
                  <circle cx="55" cy="50" r="14" fill="#cbd5e1"/>
                  <rect x="15" y="46" width="20" height="8" rx="1" fill="#f8fafc"/>
                  <rect x="77" y="40" width="45" height="20" rx="2" fill="#1e293b"/>
                  <text x="80" y="90" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-primary)">ST-Stecker</text>
                </svg>
              `
            }
          ],
          solutionDiagramSvg: `
            <svg viewBox="0 0 650 200" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="650" height="200" rx="8" fill="var(--surface-1)" stroke="var(--status-good)" stroke-width="1.5"/>

              <!-- 1. LC Stecker (Richtig: [X]) -->
              <g transform="translate(20, 15)">
                <rect width="185" height="115" rx="6" fill="var(--surface-2)" stroke="var(--status-good)" stroke-width="2"/>
                <rect x="55" y="38" width="75" height="34" rx="3" fill="#475569" stroke="#334155" stroke-width="1.5"/>
                <rect x="40" y="43" width="15" height="9" rx="1" fill="#cbd5e1"/>
                <rect x="40" y="56" width="15" height="9" rx="1" fill="#cbd5e1"/>
                <path d="M75 38 L110 25 L120 31 L90 38 Z" fill="#64748b"/>
                <rect x="130" y="47" width="30" height="16" rx="2" fill="#1e293b"/>
                <text x="92" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="var(--status-good)">LC-Stecker</text>
                <!-- Checkbox [X] -->
                <rect x="78" y="132" width="28" height="28" rx="3" fill="var(--surface-1)" stroke="var(--status-good)" stroke-width="2.5"/>
                <text x="92" y="152" text-anchor="middle" font-size="20" font-weight="900" fill="var(--status-good)">X</text>
                <text x="92" y="174" text-anchor="middle" font-size="11" font-weight="700" fill="var(--status-good)">[X] Richtig</text>
              </g>

              <!-- 2. SC Stecker ([ ]) -->
              <g transform="translate(232, 15)">
                <rect width="185" height="115" rx="6" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
                <rect x="52" y="30" width="80" height="48" rx="2" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
                <rect x="39" y="36" width="13" height="14" rx="1" fill="#cbd5e1"/>
                <rect x="39" y="56" width="13" height="14" rx="1" fill="#cbd5e1"/>
                <rect x="132" y="42" width="35" height="24" rx="2" fill="#1e293b"/>
                <text x="92" y="98" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-secondary)">SC-Stecker</text>
                <!-- Checkbox [ ] -->
                <rect x="78" y="132" width="28" height="28" rx="3" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="1.5"/>
                <text x="92" y="174" text-anchor="middle" font-size="11" fill="var(--text-muted)">[  ]</text>
              </g>

              <!-- 3. ST Stecker ([ ]) -->
              <g transform="translate(444, 15)">
                <rect width="185" height="115" rx="6" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
                <circle cx="92" cy="52" r="21" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
                <circle cx="92" cy="52" r="13" fill="#cbd5e1"/>
                <rect x="52" y="48" width="20" height="8" rx="1" fill="#f8fafc"/>
                <rect x="114" y="42" width="45" height="20" rx="2" fill="#1e293b"/>
                <text x="92" y="98" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-secondary)">ST-Stecker</text>
                <!-- Checkbox [ ] -->
                <rect x="78" y="132" width="28" height="28" rx="3" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="1.5"/>
                <text x="92" y="174" text-anchor="middle" font-size="11" fill="var(--text-muted)">[  ]</text>
              </g>
            </svg>
          `,
          solution: "LC-Stecker (gemäß Datenblatt: 'Anschluss: LC').\nIn der IHK-Lösung ist das Kästchen unter dem ersten Stecker (LC) mit einem Kreuz [X] markiert."
        },
        {
          id: "1cc",
          text: "cc) Sie schlagen vor, bei dieser Verkabelung zwischen den Switches entweder das Spanning-Tree-Protocol (STP) oder Link-Aggregation (IEEE 802.3ad) zu verwenden.\nErgänzen Sie dazu die folgende Tabelle.",
          points: 4,
          type: "table_input",
          tableConfig: {
            columns: [
              { title: "Protokoll", width: "25%" },
              { title: "Funktionsweise, solange beide Leitungen störungsfrei sind.", width: "40%" },
              { title: "Reaktion der Verbindung, wenn eine Leitung ausfällt.", width: "35%" }
            ],
            rows: [
              {
                id: "stp",
                name: "Spanning-Tree-Protocol",
                fields: [
                  { id: "1cc_stp_fkt", placeholder: "Funktionsweise im Normalbetrieb...", rows: 3 },
                  { id: "1cc_stp_reakt", placeholder: "Reaktion bei Leitungsausfall...", rows: 3 }
                ]
              },
              {
                id: "lacp",
                name: "Link-Aggregation",
                fields: [
                  { id: "1cc_lacp_fkt", placeholder: "Funktionsweise im Normalbetrieb...", rows: 3 },
                  { id: "1cc_lacp_reakt", placeholder: "Reaktion bei Leitungsausfall...", rows: 3 }
                ]
              }
            ]
          },
          solutionTable: {
            headers: ["Protokoll", "Funktionsweise, solange beide Leitungen störungsfrei sind", "Reaktion der Verbindung, wenn eine Leitung ausfällt"],
            rows: [
              {
                protocol: "Spanning-Tree-Protocol",
                normal: "STP lässt eine der beiden Leitungen ungenutzt liegen, weiß aber, dass diese Verbindung vorhanden ist.",
                failover: "Fällt die verwendete Leitung aus, so aktiviert der STP-Algorithmus die ungenutzte Leitung und überträgt die Daten über diese Leitung."
              },
              {
                protocol: "Link-Aggregation",
                normal: "Die beiden Leitungen werden „gebündelt“, sodass sich die Übertragungsrate zwischen den Switches verdoppelt.",
                failover: "Fällt eine der beiden Leitungen aus, so werden die Daten nur noch mit reduzierter Übertragungsrate über die verbleibende Leitung gesendet."
              }
            ]
          },
          solution: `Protokoll: Spanning-Tree-Protocol
- Funktionsweise, solange beide Leitungen störungsfrei sind:
  STP lässt eine der beiden Leitungen ungenutzt liegen, weiß aber, dass diese Verbindung vorhanden ist.
- Reaktion der Verbindung, wenn eine Leitung ausfällt:
  Fällt die verwendete Leitung aus, so aktiviert der STP-Algorithmus die ungenutzte Leitung und überträgt die Daten über diese Leitung.

Protokoll: Link-Aggregation
- Funktionsweise, solange beide Leitungen störungsfrei sind:
  Die beiden Leitungen werden „gebündelt“, sodass sich die Übertragungsrate zwischen den Switches verdoppelt.
- Reaktion der Verbindung, wenn eine Leitung ausfällt:
  Fällt eine der beiden Leitungen aus, so werden die Daten nur noch mit reduzierter Übertragungsrate über die verbleibende Leitung gesendet.`
        }
      ]
    },

    // ==========================================
    // 2. AUFGABE (25 PUNKTE)
    // ==========================================
    {
      id: "2",
      title: "2. Aufgabe",
      points: 25,
      context: "Die Fahrguth GmbH hat ihre Zentrale in Essen und betreibt zurzeit Filialen in Duisburg, Bochum und Dortmund. Die Filialen sind über Standleitungen an die Zentrale angebunden (siehe Netzwerkplan in Anlage 1).",
      subtasks: [
        {
          id: "2aa",
          sectionTitle: "a) Routingtabelle und Dynamisches Routing",
          intro: "In den drei Routing-Netzen hat der Router „Essen“ jeweils die niedrigste mögliche IPv4-Adresse.\nZurzeit wird zwischen den vier Routern mit statischem Routing gearbeitet.",
          text: "aa) Vervollständigen Sie hierzu folgende Tabelle des Routers in Essen.",
          points: 9,
          type: "table_input",
          tableConfig: {
            title: "IPv4-Routentabelle (Aktive Routen für: Router Essen)",
            columns: [
              { title: "Netzwerkziel", width: "25%" },
              { title: "Netzmaske", width: "25%" },
              { title: "Gateway/Next-Hop", width: "25%" },
              { title: "Interface", width: "25%" }
            ],
            rows: [
              { fields: [{value:"10.1.0.0", readonly:true}, {value:"255.255.0.0", readonly:true}, {value:"direct", readonly:true}, {value:"IF1", readonly:true}] },
              { fields: [{value:"10.2.0.0", readonly:true}, {value:"255.255.0.0", readonly:true}, {id:"2aa_r2_gw", placeholder:"?"}, {value:"-", readonly:true}] },
              { fields: [{value:"10.3.0.0", readonly:true}, {value:"255.255.0.0", readonly:true}, {id:"2aa_r3_gw", placeholder:"?"}, {value:"-", readonly:true}] },
              { fields: [{value:"10.4.0.0", readonly:true}, {value:"255.255.0.0", readonly:true}, {id:"2aa_r4_gw", placeholder:"?"}, {value:"-", readonly:true}] },
              { fields: [{id:"2aa_r5_net", placeholder:"?"}, {id:"2aa_r5_mask", placeholder:"?"}, {value:"direct", readonly:true}, {value:"IF2", readonly:true}] },
              { fields: [{id:"2aa_r6_net", placeholder:"?"}, {id:"2aa_r6_mask", placeholder:"?"}, {value:"direct", readonly:true}, {value:"IF3", readonly:true}] },
              { fields: [{id:"2aa_r7_net", placeholder:"?"}, {id:"2aa_r7_mask", placeholder:"?"}, {value:"direct", readonly:true}, {value:"IF4", readonly:true}] },
              { fields: [{value:"0.0.0.0", readonly:true}, {value:"0.0.0.0", readonly:true}, {value:"210.10.10.1", readonly:true}, {value:"-", readonly:true}] },
              { fields: [{value:"210.10.10.1", readonly:true}, {value:"255.255.255.255", readonly:true}, {value:"direct", readonly:true}, {value:"dsl", readonly:true}] }
            ]
          },
          solutionTable: {
            title: "IPv4-Routentabelle (Aktive Routen für: Router Essen)",
            headers: ["Netzwerkziel", "Netzmaske", "Gateway/Next-Hop", "Interface"],
            rows: [
              { target: "10.1.0.0", mask: "255.255.0.0", gw: "direct", iface: "IF1", filled: [] },
              { target: "10.2.0.0", mask: "255.255.0.0", gw: "192.168.0.2", iface: "-", filled: ["gw"] },
              { target: "10.3.0.0", mask: "255.255.0.0", gw: "192.168.0.6", iface: "-", filled: ["gw"] },
              { target: "10.4.0.0", mask: "255.255.0.0", gw: "192.168.0.10", iface: "-", filled: ["gw"] },
              { target: "192.168.0.0", mask: "255.255.255.252", gw: "direct", iface: "IF2", filled: ["target", "mask"] },
              { target: "192.168.0.4", mask: "255.255.255.252", gw: "direct", iface: "IF3", filled: ["target", "mask"] },
              { target: "192.168.0.8", mask: "255.255.255.252", gw: "direct", iface: "IF4", filled: ["target", "mask"] },
              { target: "0.0.0.0", mask: "0.0.0.0", gw: "210.10.10.1", iface: "-", filled: [] },
              { target: "210.10.10.1", mask: "255.255.255.255", gw: "direct", iface: "dsl", filled: [] }
            ]
          },
          solution: `Netzwerkziel   | Netzmaske       | Gateway/Next-Hop | Interface
10.1.0.0       | 255.255.0.0     | direct           | IF1
10.2.0.0       | 255.255.0.0     | 192.168.0.2      | -
10.3.0.0       | 255.255.0.0     | 192.168.0.6      | -
10.4.0.0       | 255.255.0.0     | 192.168.0.10     | -
192.168.0.0    | 255.255.255.252 | direct           | IF2
192.168.0.4    | 255.255.255.252 | direct           | IF3
192.168.0.8    | 255.255.255.252 | direct           | IF4
0.0.0.0        | 0.0.0.0         | 210.10.10.1      | -
210.10.10.1    | 255.255.255.255 | direct           | dsl`
        },
        {
          id: "2ab",
          intro: "Die aktuellen Standleitungen Bochum-Essen und Dortmund-Essen haben eine Bandbreite von 10 Gbit/s, die Standleitung Duisburg-Essen hat eine Bandbreite von nur 500 MBit/s. Da es hier immer wieder zu Problemen kommt, wird in Erwägung gezogen, das Netz durch eine weitere Leitung zwischen Bochum und Duisburg zu erweitern. Diese Leitung soll ebenfalls eine Bandbreite von 10 Gbit/s bereitstellen (siehe gestrichelte Linie im Netzwerkplan).\n\nDiese Maßnahme soll sowohl die Performanz als auch die Redundanz des Netzes erhöhen.",
          text: "ab) Begründen Sie, warum in diesem Fall dynamisches Routing empfehlenswert ist.",
          points: 4,
          type: "textarea",
          solution: "Nur mit dynamischem Routing kann das Netz selbstständig auf Störungen reagieren und somit redundant sein."
        },
        {
          id: "2ac",
          text: "ac) Für dynamisches Routing stehen sowohl Distance-Vector-Protokolle als auch Link-State-Protokolle zur Verfügung.\nGeben Sie an und begründen Sie, welche dieser beiden Protokoll-Familien hier zum Einsatz kommen muss, um die gewünschten Anforderungen zu erreichen.",
          points: 4,
          type: "textarea",
          solution: "Link-State, da bei DV die direkte Verbindung zwischen Duisburg und Essen weiterhin bevorzugt werden würde.\n\n(Hintergrund: Distance-Vector-Protokolle betrachten primär die Hop-Anzahl und würden die direkte, langsame 500-Mbit/s-Leitung mit 1 Hop der schnelleren 10-Gbit/s-Route über Bochum mit 2 Hops vorziehen. Link-State berücksichtigt die Bandbreite/Link-Kosten.)"
        },
        {
          id: "2ba",
          sectionTitle: "b) Fehleranalyse File-Server & ARP",
          intro: "Bei einem der File-Server in Essen kommt es wiederholt zu Problemen, da er nicht erreichbar ist. Die Netzwerkschnittstelle ist statisch auf die IPv4 Adresse 10.1.0.10/16 konfiguriert. Dies haben Sie überprüft. Sie analysieren das Problem zunächst mit dem Befehl ipconfig /all und erhalten folgende Ausgabe:",
          terminalOutput: `Ethernet-Adapter Ethernet:

  Verbindungsspezifisches DNS-Suffix:
  Beschreibung. . . . . . . . . . . : Universal Ethernet Controller
  Physische Adresse . . . . . . . . : 3C-E1-A1-BD-DF-E4
  DHCP aktiviert. . . . . . . . . . : Nein
  Autokonfiguration aktiviert . . . : Nein
  IPv4-Adresse  . . . . . . . . . . : 169.254.102.223(Bevorzugt)
  Subnetzmaske  . . . . . . . . . . : 255.255.0.0
  Standardgateway . . . . . . . . . :`,
          intro2: "Sie erneuern die Interface-Konfiguration mit dem Befehl ipconfig /renew und überwachen währenddessen die Schnittstelle mit einem Netzwerkanalyse-Tool. Dabei protokollieren Sie folgende Daten:",
          tableData: {
            title: "Protokollierte Pakete des Netzwerkanalyse-Tools (Wireshark-Mitschnitt)",
            headers: ["No.", "Time", "Source", "Destination", "Protocol", "Length", "Info"],
            rows: [
              ["1", "0.000000", "Universa_bd:df:e4", "Broadcast", "ARP", "42", "Who has 10.1.0.10? (ARP Probe)"],
              ["2", "0.000596", "PCEngine_57:11:05", "Universa_bd:df:e4", "ARP", "60", "10.1.0.10 is at 00:0d:b9:57:11:05"],
              ["3", "5.988916", "Universa_bd:df:e4", "Broadcast", "ARP", "42", "Who has 169.254.102.223? (ARP Probe)"],
              ["4", "6.989909", "Universa_bd:df:e4", "Broadcast", "ARP", "42", "Who has 169.254.102.223? (ARP Probe)"]
            ]
          },
          text: "ba) Erläutern Sie anhand der Analyse, warum der Server trotz statisch konfigurierter IP-Adresse nicht unter der gewünschten IPv4-Adresse erreichbar ist.",
          points: 5,
          type: "textarea",
          solution: "IP 10.1.0.10 wird bereits von einem anderen Gerät genutzt. Daher hat sich der File-Server die APIPA-Adresse 169.254.102.223 zugewiesen."
        },
        {
          id: "2bb",
          text: "bb) Wie müssen Sie vorgehen, um den File-Server unter der IPv4 Adresse 10.1.0.10 erreichbar zu machen?",
          points: 3,
          type: "textarea",
          solution: "Gerät mit der IP 10.1.0.10 identifizieren und diesem Gerät eine andere IP zuweisen. Anschließend IP-Konfiguration auf dem Fileserver aktualisieren."
        }
      ]
    },

    // ==========================================
    // 3. AUFGABE (20 PUNKTE)
    // ==========================================
    {
      id: "3",
      title: "3. Aufgabe",
      points: 20,
      context: "Die Fahrguth GmbH setzt an verschiedenen Stellen VPN-Verbindungen ein.",
      subtasks: [
        {
          id: "3aa",
          sectionTitle: "a) VPN-Arten und Zertifikate",
          text: "aa) Erläutern Sie jeweils anhand eines selbst gewählten Beispiels aus dem Arbeitsalltag der Fahrguth GmbH, wie diese die folgenden VPN-Arten sinnvoll einsetzen könnte:\n- End-to-Site\n- Site-to-Site",
          points: 4,
          type: "textarea",
          solution: `End-to-Site:
Die Fahrguth GmbH nutzt diese Variante, um den Außendienstmitarbeitern/Home-Office-Arbeitern Zugriff auf das Firmennetz zu gewähren.

Site-to-Site:
Die Fahrguth GmbH nutzt diese Variante, um die verschiedenen Filialen gesichert an die Zentrale anzubinden.

(Andere Beispielsituationen sind auch denkbar.)`
        },
        {
          id: "3ab",
          text: "ab) Zur Absicherung der VPN-Verbindungen setzt die Fahrguth GmbH Zertifikate nach Standard X.509 ein.\nNennen Sie drei der Bestandteile, die ein solches Zertifikat enthalten muss.",
          points: 3,
          type: "textarea",
          solution: `Mögliche Bestandteile (drei sind gefordert):
- Version
- Seriennummer
- Inhaber (Common Name, Orga etc.)
- Public Key des Inhabers
- Algorithmen-ID
- Aussteller (Zertifizierungsstelle)
- Gültigkeit
- Signatur-Algorithmus
- Signatur (verschlüsselter Hash-Wert)`
        },
        {
          id: "3b",
          sectionTitle: "b) Fehlerdiagnose Hotspot-VPN",
          text: "b) Bei einer WLAN-Verbindung an einem Hotspot funktioniert der Abruf von Internetseiten ohne Probleme. Beim Verbindungsaufbau eines VPNs vom selben Hotspot aus scheitert die VPN-Verbindung, obwohl die Einrichtung des VPNs am Client korrekt erfolgt ist.\nBeschreiben Sie eine mögliche Fehlerursache und machen Sie einen Vorschlag zur Fehlerbeseitigung.",
          points: 5,
          type: "textarea",
          solution: `Fehlerursache (3 Punkte):
- Der Hotspot verwendet NAT und evtl. PAT. Es werden IP und Ports verändert, dadurch kann die Integrität der Pakete verletzt werden und die Pakete werden verworfen.
- Bei IPsec mit ESP kann der Hotspot-Router die TCP bzw. UDP-Checksummen nicht überprüfen. Die Pakete werden als ungültig verworfen.

Fehlerbeseitigung (2 Punkte):
Einsatz von NAT-Traversal bei IPsec

oder:

Fehlerursache (3 Punkte):
Paketgröße (MTU) zu groß eingestellt. Die Pakete werden fragmentiert, dadurch wird die Integrität verletzt und die Pakete werden verworfen.

Fehlerbeseitigung (2 Punkte):
Paketgröße (MTU) im VPN-Client verringern

(Weitere Lösungen sind möglich.)`
        },
        {
          id: "3ca",
          sectionTitle: "c) Analyse des Internetverkehrs (Proxy & IPv6)",
          intro: "Nach Aufbau des VPNs soll der Internetverkehr ausschließlich über einen IPv4-Proxy in der Zentrale stattfinden. Einige Außendienstmitarbeiter berichten von Internetzugriffen, die nicht über den Proxy laufen.\nSie prüfen die Verbindungen mittels des Befehls tracert www.microsoft.com:",
          terminalOutput: `C:\\Users\\Vertreter1>tracert www.microsoft.com

Routenverfolgung zu e13678.dscb.akamaiedge.net [2a02:26f0:1300:19a::356e]
über maximal 30 Hops:

  1    1 ms    1 ms    2 ms  internetrouter.local [2001:db8:381c:21:7642:7fff:fe1c:62f8]
  2   10 ms    7 ms    6 ms  2001:db8:0:4000::1
  3    *       *      12 ms  2001:db8:1808::1
  4   56 ms  137 ms  305 ms  2001:db8:1808::1::2
  5   10 ms   10 ms    9 ms  g2a02-26f0-1300-019a-0000-0000-0000-356e.deploy.static.akamaitechnologies.com [2a02:26f0:1300:19a::356e]

Ablaufverfolgung beendet.

C:\\Users\\Vertreter1>`,
          text: "ca) Beschreiben Sie, warum ein ungefilterter Netzwerkverkehr ohne VPN-Einwahl möglich ist, obwohl der Internetverkehr nur über den Proxy der Zentrale stattfinden soll.",
          points: 5,
          type: "textarea",
          solution: "Der Laptop wird an einem Netz betrieben, das IPv4 und IPv6 unterstützt. Vom Router erhält der Laptop zusätzliche IPv6-Adressen. Diese IPv6-Adressen nutzt der Client, um Verbindung mit dem Internet herzustellen. Die VPN-Verbindung wird umgangen (IPv6 VPN Breakout)."
        },
        {
          id: "3cb",
          text: "cb) Machen Sie einen Vorschlag, wie der ungefilterte Netzwerkverkehr unterbunden werden kann.",
          points: 3,
          type: "textarea",
          solution: `- Auf den Laptops das IPv6-Protokoll in der Netzwerkkonfiguration auf disable setzen.
- Dual-Stack deaktivieren
- IPv6-Netzwerk in die Konfiguration des VPN-Client aufnehmen.

(Weitere Lösungen sind möglich.)`
        }
      ]
    },

    // ==========================================
    // 4. AUFGABE (29 PUNKTE)
    // ==========================================
    {
      id: "4",
      title: "4. Aufgabe",
      points: 29,
      context: "Der Provider der Fahrguth GmbH hat Änderungen am DNS-Server vorgenommen.",
      subtasks: [
        {
          id: "4aa",
          sectionTitle: "a) DNS-Grundlagen & Auflösung",
          text: "aa) Erläutern Sie, welche wesentlichen Aufgaben der DNS-Dienst im Internet übernimmt.",
          points: 2,
          type: "textarea",
          solution: "DNS übernimmt die Auflösung von Hostnamen bzw. URLs in IP-Adressen bzw. umgekehrt."
        },
        {
          id: "4ab",
          text: "ab) Im lokalen DNS-Dienst ist eine Weiterleitung auf einen DNS-Server des Providers eingetragen.\nErläutern Sie, warum diese Weiterleitung sinnvoll ist.",
          points: 3,
          type: "textarea",
          solution: "Durch die Einrichtung der Weiterleitung muss der lokale DNS-Server die Anfrage nicht selbst iterativ auflösen. Er sendet die komplette Anfrage an den DNS-Server des Providers weiter, dieser hat evtl. schon viele Einträge in seinem Cache liegen und kann die Anfrage schnell beantworten."
        },
        {
          id: "4ac",
          text: "ac) Erläutern Sie anhand der beispielhaften Anfrage nach www.ihk.de, wie der Nameserver des Providers die Anfrage auflöst, wenn dort keine Weiterleitung eingetragen ist und der Eintrag dort auch nicht im Cache vorhanden ist.",
          points: 6,
          type: "textarea",
          solution: `Der Nameserver löst die Anfrage iterativ auf:
1. Er befragt zunächst die Root-Server, wer für die DE-Zone zuständig ist.
2. Dort fragt er nach, wer in der Zone DE für den Bereich ihk.de verantwortlich ist.
3. Von dort holt er sich die IP-Adresse für www.ihk.de.`
        },
        {
          id: "4ba",
          sectionTitle: "b) Störungsanalyse DNS-Zone & SPF",
          intro: "Seit den Änderungen am DNS-Server kommt es zu Störungen in der Funktion. Um die Probleme mit dem DNS-System zu lokalisieren, lassen Sie sich die folgende Tabelle mit den DNS-Einträgen des Servers ausgeben:",
          tableData: {
            title: "DNS-Zonendatei der Domäne fahrguth.gmbh",
            headers: ["Recordname", "Record-Typ", "Ziel"],
            rows: [
              ["www.fahrguth.gmbh", "A", "217.70.165.122"],
              ["fahrguth.gmbh", "A", "217.70.165.122"],
              ["fahrguth.gmbh", "MX", "mail1.fahrguth.gmbh"],
              ["fahrguth.gmbh", "MX", "mail2.fahrguth.gmbh"],
              ["fahrguth.gmbh", "NS", "ns2.fahrguth.gmbh"],
              ["fahrguth.gmbh", "NS", "ns1.fahrguth.gmbh"],
              ["fahrguth.gmbh", "SOA", "ns1.fahrguth.gmbh. hostmaster.fahrguth.gmbh. 2021060100 86400 7200 3600000 900"],
              ["fahrguth.gmbh", "TXT", "\"v=spf1 a mx -all\""],
              ["ns1.fahrguth.gmbh", "A", "217.70.165.140"],
              ["ns2.fahrguth.gmbh", "A", "217.70.165.140"]
            ]
          },
          text: "ba) Erläutern Sie mithilfe der Tabelle, warum der E-Mail-Server des Unternehmens aktuell keine externen E-Mails empfangen kann.",
          points: 3,
          type: "textarea",
          solution: "Es fehlen die A-Records der beiden Mail-Server."
        },
        {
          id: "4bb",
          intro: "Die Fahrguth GmbH versendet wöchentliche Newsletter über einen externen Anbieter (Mailserver: mail.newsletterversand.de) mit der Absenderadresse newsletter@fahrguth.gmbh. Seit der Änderung erhalten einige Kunden den Newsletter nicht mehr.\nEin Mitarbeiter des Newsletter-Versenders teilt Ihnen mit, dass Ihr SPF-Eintrag im DNS-System vermutlich unvollständig ist.\n\nAuf Wikipedia finden Sie dazu folgenden Auszug:",
          quoteText: `The Simple Mail Transfer Protocol permits any computer to send email claiming to be from any source address. This is exploited by spammers and scammers who often use forged email addresses, making it more difficult to trace a message back to its source, and easy for spammers to hide their identity in order to avoid responsibility. It is also used in phishing techniques, where users can be duped into disclosing private information in response to an email purportedly sent by an organization such as a bank.

SPF allows the owner of an Internet domain to specify which computers are authorized to send mail with envelope-from addresses in that domain, using Domain Name System (DNS) records. Receivers verifying the SPF information in TXT records may reject messages from unauthorized sources before receiving the body of the message.`,
          text: "bb) Erläutern Sie anhand des Textes, welche Funktion SPF wahrnimmt und warum bei einigen Kunden der Newsletter nicht zugestellt wird.",
          points: 5,
          type: "textarea",
          solution: "Der Absender newsletter@fahrguth.gmbh kann nicht vom Newsletter-Anbieter verwendet werden, da der SPF-Eintrag dies nicht zulässt. Der korrekte SPF-Eintrag würde es dem Newsletter-Anbieter erlauben, Mails mit der Domäne fahrguth.gmbh als Absender zu versenden."
        },
        {
          id: "4c",
          sectionTitle: "c) DNS-Sicherheit & DNSSEC",
          text: "c) Bei Kunden der Fahrguth GmbH wurde der Aufruf der Seite http://www.fahrguth.gmbh mittels DNS ungewollt auf einen Server mit einer gefälschten Webseite umgeleitet.\nBeschreiben Sie eine Angriffsmethode, um den Datenverkehr auf die gefälschte Webseite umzuleiten.",
          points: 4,
          type: "textarea",
          solution: `- DNS-Spoofing: Dem beim Kunden eingetragenen DNS-Server wurden massenweise gefälschte DNS-Antworten gesendet. Bei Erneuern des DNS-Caches wurde ein gefälschter Eintrag (IP-Adresse) für die Seite www.fahrguth.gmbh gespeichert und als neue Antwort weitergegeben.
- DNS Injection: Im DNS-Server wurden gefälschte/falsche Daten konfiguriert.
- u. a.`
        },
        {
          id: "4d",
          intro: "Um sicherzustellen, dass DNS-Nachrichten nicht manipuliert wurden, wurde auf allen Root-Servern DNSSEC eingeführt. Ein validierender DNSSEC-Server kann empfangene DNS-Nachrichten auf Authentizität und Integrität überprüfen.",
          text: "d) Erklären Sie die beiden Begriffe Authentizität und Integrität in Bezug auf DNSSEC.",
          points: 6,
          type: "split_textarea",
          fields: [
            { id: "4d_auth", label: "Authentizität (3 Punkte):", placeholder: "Erklärung zur Authentizität bei DNSSEC...", rows: 4 },
            { id: "4d_integ", label: "Integrität (3 Punkte):", placeholder: "Erklärung zur Integrität bei DNSSEC...", rows: 4 }
          ],
          solution: `Authentizität (3 Punkte):
Der Absender der DNS-Auskunft ist der, für den er sich ausgibt. Hierzu wird eine digitale Signatur bzw. ein digitales Zertifikat benutzt.

Integrität (3 Punkte):
Die ausgelieferte DNS-Auskunft wurde auf ihrem Weg zum Empfänger nicht verändert. Dazu werden Hash-Werte des Inhalts gebildet, die vom Empfänger überprüft werden können.`
        }
      ]
    }
  ]
};

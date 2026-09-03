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
      context: `Am Hauptsitz der Fahrguth GmbH in Essen arbeiten rund 60 Mitarbeiter, die den Bereichen Verkauf, Verwaltung, Werkstatt und Administration zugeordnet sind. Für jeden Bereich wurde ein eigenes VLAN erstellt, zusätzlich existiert ein weiters VLAN für die Server.`,
      subtasks: [
        {
          id: "1aa",
          sectionTitle: "a) Switch-Verkabelung und VLAN-Einsatz",
          intro: `Das interne Netzwerk ist aus mehreren Switches aufgebaut, die wie abgebildet verbunden sind (dicke schwarze Linie). Der eingesetzte Gebäude-Verteiler im Serverraum ist ein Layer-3-Switch, der für jedes VLAN das Standardgateway darstellt. Die Geräte der Mitarbeiter sind an die beiden Layer-2-Switche über Patchfelder und -dosen angeschlossen.`,
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
          solution: "- Mehr Sicherheit, da logische Trennung der Netzwerksegmente\\n- Mehr Flexibilität, da neue Netzwerksegmente leicht erzeugt werden können\\n- Weniger Hardware, da mehrere Netzwerksegmente auf einem Switch/Kabel laufen\\n- Weniger Kosten, da weniger Hardware angeschafft werden muss\\n- Weniger Verkabelung, da mehrere Netzwerksegmente auf einem Switch/Kabel laufen\\n(Andere Lösungen sind möglich.)"
        },
        {
          id: "1ab",
          text: "ab) Zwischen den Switches werden Verbindungen nach Standard IEEE 802.1q eingesetzt. Auf diesen Verbindungen wird in jeden Frame ein 32 Bit großes Zusatzfeld (Q-Tag) eingefügt.\\nErläutern Sie, weshalb dies geschieht, und nennen Sie eine der Informationen, die in diesem Zusatzfeld enthalten ist.",
          points: 3,
          type: "textarea",
          solution: "Zwischen den Switches muss die Information, zu welchem VLAN ein Frame gehört, mitgeschickt werden. Ein Standard-Frame hat dafür keine Felder in seinem Header vorgesehen.\\nEine Information, die in diesen Tag geschrieben wird, ist die VLAN-ID (VLAN Identifier, 12 Bit) oder Priority Code Point (PCP, 3 Bit) oder Drop Eligible Indicator (DEI, 1 Bit).\\n(Andere Lösungen sind möglich.)"
        },
        {
          id: "1ac",
          text: "ac) Eine Zuordnung zu einem VLAN kann z. B. statisch oder per IEEE 802.1X erfolgen.\\nErläutern Sie jeweils anhand eines Beispiels, was man darunter versteht.",
          points: 4,
          type: "textarea",
          solution: "Statisch: Der Administrator ordnet die Ports manuell fest einem bestimmten VLAN zu.\\nBeispiel: Ports in der Werkstatt werden dem VLAN \\\"Werkstatt\\\" zugeordnet.\\n\\nIEEE 802.1X: Ein Gerät wird anhand der Anmeldedaten (dynamisch über Authentifizierungsserver wie RADIUS) einem bestimmten VLAN zugeordnet.\\nBeispiel: Der Useraccount \\\"Chef\\\" wird immer dem VLAN-Verwaltung zugeordnet, egal an welchem PC des Unternehmens er sich anmeldet."
        },
        {
          id: "1ba",
          sectionTitle: "b) DHCP-Konfiguration und Relay",
          intro: `Sie sind für die PCs der Mitarbeiter zuständig. Diese sollen an das Netzwerk angeschlossen werden.`,
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
              <!-- 1: Discover -->
              <line x1="125" y1="35" x2="500" y2="35" stroke="var(--cat-ga1)" stroke-width="2.5" marker-end="url(#arrow)"/>
              <text x="312" y="30" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">1. ──────────────────────────►</text>
              <!-- 2: Offer -->
              <line x1="500" y1="58" x2="125" y2="58" stroke="var(--cat-ga2)" stroke-width="2.5"/>
              <text x="312" y="54" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">◄────────────────────────── 2.</text>
              <!-- 3: Request -->
              <line x1="125" y1="82" x2="500" y2="82" stroke="var(--cat-ga1)" stroke-width="2.5"/>
              <text x="312" y="78" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)">3. ──────────────────────────►</text>
              <!-- 4: Ack -->
              <line x1="500" y1="106" x2="125" y2="106" stroke="var(--cat-ga2)" stroke-width="2.5"/>
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
          text: "ba) Nach der Anmeldung eines Clients soll dieser vom DHCP-Server per DHCP eine IP-Adresse aus dem Bereich des jeweiligen VLANs erhalten. Auf dem DHCP-Server wurde daher für jedes VLAN ein Adresspool eingerichtet.\\nBenennen Sie die vier Kommunikationsschritte bei der erfolgreichen Zuteilung einer IP-Adresse via DHCP.",
          points: 4,
          type: "textarea",
          solution: "1. DHCP Discover\\n2. DHCP Offer\\n3. DHCP Request\\n4. DHCP Ack\\n(Reihenfolge ist maßgebend: DORA-Prinzip)"
        },
        {
          id: "1bb",
          text: "bb) Der DHCP-Server befindet sich im Server-VLAN, der Client in einem der Benutzer-VLANs. An den Switches wurden bisher nur die VLAN-Konfigurationen fehlerfrei eingerichtet.\\nErläutern Sie, warum der DHCP-Prozess zunächst fehlschlägt, und welche Einstellungen vom Admin am Layer-3-Switch zusätzlich vorzunehmen sind, sodass der DHCP-Server alle VLANs mit IP-Adressen versorgen kann.",
          points: 3,
          type: "textarea",
          solution: "Ursache: DHCP-Anfragen (DHCP Discover) arbeiten mit Broadcasts. Ein Router bzw. Layer-3-Switch leitet Broadcasts standardmäßig nicht über Subnetz-/VLAN-Grenzen hinweg weiter, der Broadcast endet am Switch.\\nMaßnahme: DHCP-Relay (bzw. DHCP-Relay-Agent) für jedes VLAN-Interface auf dem Layer-3-Switch konfigurieren, sodass die DHCP-Broadcasts als Unicast gezielt an die IP des DHCP-Servers weitergeleitet werden.\\n(Hinweis: 'ip helper-address <IP-DHCP>' ist ebenfalls eine gültige Lösung)"
        },
        {
          id: "1ca",
          sectionTitle: "c) Redundanz & LWL-Module",
          intro: `Die Verbindung zwischen den Switches soll zukünftig wie abgebildet redundant ausgelegt werden (neue Verbindung: gestrichelte Linie). Dazu werden neue SFP+ Module für die Switche beschafft.`,
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
          solution: "SFP-Module (Small Form-factor Pluggable) sind modulare Transceiver, die einen Switch flexibel um physikalische Schnittstellen (z. B. Glasfaser / LWL oder Kupfer) erweitern.\\nUnterschied SFP vs. SFP+: SFP unterstützt Datenübertragungsraten bis zu 1 Gbit/s (1.000 Mbit/s), während SFP+ für bis zu 10 Gbit/s spezifiziert ist."
        },
        {
          id: "1cb",
          intro: `Im Datenblatt der bestellten Module finden Sie folgende Angaben:
Übertragungsrate:  1.000 Mbps
Typ:               Duplex
Glasfaserart:      Multimode
Anschluss:         LC
LWL-Strecke:       2 km
Betriebswellenlänge: 1.310 nm`,
          text: "cb) Kreuzen Sie an, welchen Stecker ein Glasfaserkabel besitzen muss, um mit dem Modul zusammenzuarbeiten.",
          points: 1,
          type: "radio_visual",
          options: [
            {
              id: "LC",
              label: "LC-Stecker (Lucent Connector, kleiner Duplex-Clip-Stecker)",
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
              label: "SC-Stecker (Subscriber Connector, eckiger Push-Pull Stecker)",
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
              label: "ST-Stecker (Straight Tip, runder Bajonett-Verschluss)",
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
          solution: "LC-Stecker (gemäß Datenblatt: 'Anschluss: LC')"
        },
        {
          id: "1cc",
          text: "cc) Sie schlagen vor, bei dieser Verkabelung zwischen den Switches entweder das Spanning-Tree-Protocol (STP) oder Link-Aggregation (IEEE 802.3ad) zu verwenden.\\nErgänzen Sie dazu die folgende Tabelle.",
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
                name: "Spanning-Tree-Protocol (STP)",
                fields: [
                  { id: "1cc_stp_fkt", placeholder: "Funktionsweise im Normalbetrieb...", rows: 3 },
                  { id: "1cc_stp_reakt", placeholder: "Reaktion bei Leitungsausfall...", rows: 3 }
                ]
              },
              {
                id: "lacp",
                name: "Link-Aggregation (IEEE 802.3ad)",
                fields: [
                  { id: "1cc_lacp_fkt", placeholder: "Funktionsweise im Normalbetrieb...", rows: 3 },
                  { id: "1cc_lacp_reakt", placeholder: "Reaktion bei Leitungsausfall...", rows: 3 }
                ]
              }
            ]
          },
          solution: "Spanning-Tree-Protocol (STP):\\n- Funktionsweise: STP lässt eine der beiden Leitungen ungenutzt liegen (Port wird in Blocking/Discarding-Zustand gesetzt), weiß aber, dass diese Verbindung vorhanden ist, um Loops (Netzwerkschleifen) zu verhindern.\\n- Reaktion bei Ausfall: Fällt die verwendete Leitung aus, so aktiviert der STP-Algorithmus die ungenutzte Leitung (Port wechselt auf Forwarding) und überträgt die Daten über diese Leitung.\\n\\nLink-Aggregation (LACP / IEEE 802.3ad):\\n- Funktionsweise: Die beiden Leitungen werden logisch zu einem Verbund (\\\"Trunk\\\" / LAG) gebündelt, sodass sich die Bandbreite / Übertragungsrate zwischen den Switches verdoppelt und Lastverteilung erfolgt.\\n- Reaktion bei Ausfall: Fällt eine der beiden Leitungen aus, bleibt die Verbindung bestehen, Daten werden mit reduzierter Übertragungsrate (halbe Bandbreite) über die verbleibende Leitung gesendet."
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
      context: `Die Fahrguth GmbH hat ihre Zentrale in Essen und betreibt zurzeit Filialen in Duisburg, Bochum und Dortmund. Die Filialen sind über Standleitungen an die Zentrale angebunden (siehe Netzwerkplan in Anlage 1).`,
      subtasks: [
        {
          id: "2aa",
          sectionTitle: "a) Routingtabelle und Dynamisches Routing",
          intro: `In den drei Routing-Netzen hat der Router „Essen“ jeweils die niedrigste mögliche IPv4-Adresse.\\nZurzeit wird zwischen den vier Routern mit statischem Routing gearbeitet.`,
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
          intro: `Die aktuellen Standleitungen Bochum-Essen und Dortmund-Essen haben eine Bandbreite von 10 Gbit/s, die Standleitung Duisburg-Essen hat eine Bandbreite von nur 500 MBit/s. Da es hier immer wieder zu Problemen kommt, wird in Erwägung gezogen, das Netz durch eine weitere Leitung zwischen Bochum und Duisburg zu erweitern. Diese Leitung soll ebenfalls eine Bandbreite von 10 Gbit/s bereitstellen (siehe gestrichelte Linie im Netzwerkplan).\\n\\nDiese Maßnahme soll sowohl die Performanz als auch die Redundanz des Netzes erhöhen.`,
          text: "ab) Begründen Sie, warum in diesem Fall dynamisches Routing empfehlenswert ist.",
          points: 4,
          type: "textarea",
          solution: "Nur mit dynamischem Routing kann das Netzwerk selbstständig und automatisch auf Leitungsstörungen oder -ausfälle reagieren (Failover) und alternative Routen berechnen. Dadurch wird echte Redundanz gewährleistet, ohne dass manuelle Eingriffe des Administrators bei Verbindungsproblemen erforderlich sind."
        },
        {
          id: "2ac",
          text: "ac) Für dynamisches Routing stehen sowohl Distance-Vector-Protokolle als auch Link-State-Protokolle zur Verfügung.\\nGeben Sie an und begründen Sie, welche dieser beiden Protokoll-Familien hier zum Einsatz kommen muss, um die gewünschten Anforderungen zu erreichen.",
          points: 4,
          type: "textarea",
          solution: "Protokoll-Familie: Link-State-Protokolle (z. B. OSPF).\\nBegründung: Link-State-Protokolle berücksichtigen bei der Metrik die Verbindungsqualität bzw. Bandbreite (Kosten/Cost). Distance-Vector-Protokolle (wie RIP) orientieren sich primär am Hop-Count; bei Distance-Vector würde daher die direkte, langsame Leitung zwischen Essen und Duisburg (1 Hop, 500 Mbit/s) gegenüber dem schnelleren Pfad über Bochum (2 Hops, jeweils 10 Gbit/s) bevorzugt werden. Nur Link-State wählt bandbreitenoptimierte Routen."
        },
        {
          id: "2ba",
          sectionTitle: "b) Fehleranalyse File-Server & ARP",
          intro: `Bei einem der File-Server in Essen kommt es wiederholt zu Problemen, da er nicht erreichbar ist. Die Netzwerkschnittstelle ist statisch auf die IPv4 Adresse 10.1.0.10/16 konfiguriert. Dies haben Sie überprüft. Sie analysieren das Problem zunächst mit dem Befehl ipconfig /all und erhalten folgende Ausgabe:`,
          terminalOutput: `Ethernet-Adapter Ethernet:

  Verbindungsspezifisches DNS-Suffix:
  Beschreibung. . . . . . . . . . . : Universal Ethernet Controller
  Physische Adresse . . . . . . . . : 3C-E1-A1-BD-DF-E4
  DHCP aktiviert. . . . . . . . . . : Nein
  Autokonfiguration aktiviert . . . : Nein
  IPv4-Adresse  . . . . . . . . . . : 169.254.102.223(Bevorzugt)
  Subnetzmaske  . . . . . . . . . . : 255.255.0.0
  Standardgateway . . . . . . . . . :`,
          intro2: `Sie erneuern die Interface-Konfiguration mit dem Befehl ipconfig /renew und überwachen währenddessen die Schnittstelle mit einem Netzwerkanalyse-Tool. Dabei protokollieren Sie folgende Daten:`,
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
          solution: "Die IP-Adresse 10.1.0.10 wird bereits von einem anderen Gerät im Netzwerk verwendet (IP-Adresskonflikt / Duplicate Address Detection).\\nDer Server sendet eine ARP-Probe für 10.1.0.10 (Paket 1), woraufhin ein anderes Gerät (PCEngine_57:11:05) mit einer ARP-Reply antwortet, dass es diese IP besitzt (Paket 2). Um den Adresskonflikt zu verhindern, deaktiviert das Betriebssystem die statische IP und weist sich selbst per APIPA eine Adresse aus dem Link-Local-Bereich (169.254.102.223) zu."
        },
        {
          id: "2bb",
          text: "bb) Wie müssen Sie vorgehen, um den File-Server unter der IPv4 Adresse 10.1.0.10 erreichbar zu machen?",
          points: 3,
          type: "textarea",
          solution: "1. Das Gerät mit der MAC-Adresse 00:0d:b9:57:11:05 identifizieren (z. B. über Switch-MAC-Table/CAM-Table oder DHCP-Leases) und diesem Gerät eine andere freie IP-Adresse zuweisen bzw. es vom Netz trennen.\\n2. Anschließend die IP-Konfiguration auf dem File-Server aktualisieren bzw. das Netzwerk-Interface neu starten/aktivieren."
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
      context: `Die Fahrguth GmbH setzt an verschiedenen Stellen VPN-Verbindungen ein.`,
      subtasks: [
        {
          id: "3aa",
          sectionTitle: "a) VPN-Arten und Zertifikate",
          text: "aa) Erläutern Sie jeweils anhand eines selbst gewählten Beispiels aus dem Arbeitsalltag der Fahrguth GmbH, wie diese die folgenden VPN-Arten sinnvoll einsetzen könnte:\\n- End-to-Site\\n- Site-to-Site",
          points: 4,
          type: "textarea",
          solution: "End-to-Site (Roadwarrior / Client-to-Site):\\nDie Fahrguth GmbH nutzt diese Variante, um Mitarbeitern im Home-Office oder Außendienstmitarbeitern unterwegs über einen Software-Client gesicherten Zugriff auf das Firmennetzwerk und interne Dienste der Zentrale zu ermöglichen.\\n\\nSite-to-Site (Gateway-to-Gateway / Lan-to-Lan):\\nDie Fahrguth GmbH nutzt diese Variante, um die Netzwerke der Filialen (Bochum, Duisburg, Dortmund) über Router/VPN-Gateways dauerhaft und transparent verschlüsselt an die Zentrale in Essen anzubinden.\\n(Andere praxisgerechte Beispiele sind ebenfalls denkbar.)"
        },
        {
          id: "3ab",
          text: "ab) Zur Absicherung der VPN-Verbindungen setzt die Fahrguth GmbH Zertifikate nach Standard X.509 ein.\\nNennen Sie drei der Bestandteile, die ein solches Zertifikat enthalten muss.",
          points: 3,
          type: "textarea",
          solution: "Mögliche Bestandteile (drei sind gefordert):\\n- Version des X.509-Standards\\n- Seriennummer des Zertifikats\\n- Inhaber / Subjekt (Common Name, Organisation, Land etc.)\\n- Öffentlicher Schlüssel (Public Key) des Inhabers\\n- Signaturalgorithmus / Algorithmen-ID (z. B. SHA256withRSA)\\n- Aussteller / Zertifizierungsstelle (Issuer / CA)\\n- Gültigkeitsdauer (Gültig von ... bis ...)\\n- Digitale Signatur der Zertifizierungsstelle (verschlüsselter Hash-Wert)"
        },
        {
          id: "3b",
          sectionTitle: "b) Fehlerdiagnose Hotspot-VPN",
          text: "b) Bei einer WLAN-Verbindung an einem Hotspot funktioniert der Abruf von Internetseiten ohne Probleme. Beim Verbindungsaufbau eines VPNs vom selben Hotspot aus scheitert die VPN-Verbindung, obwohl die Einrichtung des VPNs am Client korrekt erfolgt ist.\\nBeschreiben Sie eine mögliche Fehlerursache und machen Sie einen Vorschlag zur Fehlerbeseitigung.",
          points: 5,
          type: "textarea",
          solution: "Möglichkeit 1 (Häufigste Ursache):\\n- Fehlerursache: Der Hotspot-Router verwendet NAT bzw. PAT. Da IPsec ESP die IP-Pakete verschlüsselt und keine Ports vorsieht, verändern NAT-Router die IP-Header, wodurch Integritätsprüfungen fehlschlagen oder ESP-Pakete blockiert werden.\\n- Fehlerbeseitigung: Einsatz von NAT-Traversal (NAT-T) bei IPsec (Kapselung der IPsec-Pakete in UDP-Port 4500) oder Wechsel auf SSL/TLS-basiertes VPN (z. B. OpenVPN über TCP 443).\\n\\nMöglichkeit 2:\\n- Fehlerursache: Die maximale Paketgröße (MTU) ist zu groß gewählt. Durch den zusätzlichen VPN-Tunnel-Header werden Pakete zu groß und müssen fragmentiert werden; fragmentierte Pakete werden von Hotspot-Firewalls häufig verworfen.\\n- Fehlerbeseitigung: MTU-Wert bzw. MSS-Clamping in der VPN-Client-Konfiguration verringern.\\n(3 Punkte für Fehlerursache, 2 Punkte für Fehlerbeseitigung laut Korrekturhinweis.)"
        },
        {
          id: "3ca",
          sectionTitle: "c) Analyse des Internetverkehrs (Proxy & IPv6)",
          intro: `Nach Aufbau des VPNs soll der Internetverkehr ausschließlich über einen IPv4-Proxy in der Zentrale stattfinden. Einige Außendienstmitarbeiter berichten von Internetzugriffen, die nicht über den Proxy laufen.\nSie prüfen die Verbindungen mittels des Befehls tracert www.microsoft.com:`,
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
          solution: "Der Laptop wird an einem Netzwerk betrieben, das Dual-Stack (IPv4 und IPv6) unterstützt. Vom lokalen Hotspot/Router erhält der Laptop zusätzlich eine globale IPv6-Adresse. Da der VPN-Tunnel und der Firmen-Proxy rein auf IPv4 konfiguriert sind, greift der Client bei IPv6-fähigen Zielen direkt über den lokalen Router per IPv6 auf das Internet zu und umgeht den VPN-Tunnel vollständig (sog. IPv6 VPN Breakout / IPv6-Leak)."
        },
        {
          id: "3cb",
          text: "cb) Machen Sie einen Vorschlag, wie der ungefilterte Netzwerkverkehr unterbunden werden kann.",
          points: 3,
          type: "textarea",
          solution: "Mögliche Maßnahmen (eine ausführlich oder mehrere genannt):\\n- Auf den Laptops das IPv6-Protokoll in der Netzwerkadapter-Konfiguration deaktivieren (disable).\\n- Dual-Stack im gesamten Firmenkontext oder Client-Netz deaktivieren.\\n- Die VPN-Client-Konfiguration erweitern, sodass IPv6-Traffic ebenfalls durch den Tunnel geroutet wird (Full-Tunneling inkl. IPv6).\\n- Lokale Firewall auf dem Client so konfigurieren, dass ausgehende IPv6-Verbindungen außerhalb des VPN-Tunnels blockiert werden."
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
      context: `Der Provider der Fahrguth GmbH hat Änderungen am DNS-Server vorgenommen.`,
      subtasks: [
        {
          id: "4aa",
          sectionTitle: "a) DNS-Grundlagen & Auflösung",
          text: "aa) Erläutern Sie, welche wesentlichen Aufgaben der DNS-Dienst im Internet übernimmt.",
          points: 2,
          type: "textarea",
          solution: "DNS übernimmt die Namensauflösung im Netzwerk/Internet: Es löst menschenlesbare Rechner-/Domainnamen (FQDNs bz
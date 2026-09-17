window.exam_2023_1_GA1 = {
  id: "2023_1_GA1",
  title: "Sommer 2023 - GA1",
  subtitle: "Abschlussprüfung Sommer 2023 – Fachinformatiker/Fachinformatikerin Systemintegration (AO 2020) – Teil 2: Konzeption und Administration von IT-Systemen",
  duration: 90,
  totalPoints: 100,

  // Übergreifende Ausgangssituation (Seite 2 der Prüfung)
  ausgangssituation: {
    title: "Ausgangssituation (bezieht sich auf die Aufgaben 1 bis 4)",
    text: "Sie sind bei der Best-IT GmbH als Fachinformatiker Systemintegration beschäftigt. Die Best-IT GmbH ist ein in Köln ansässiges bedeutendes Systemhaus, welches überwiegend für mittelständische Betriebe im Bereich IT-Services agiert.\n\nDas Autohaus Schnellinger hat die Best-IT GmbH beauftragt, verschiedene Verbesserungen an ihren IT-Systemen vorzunehmen.\n\nBearbeiten Sie in diesem Zusammenhang die folgenden vier Aufgaben:\n1. Aufgabe: Server bereitstellen und administrieren\n2. Aufgabe: Systeme skalieren und aktualisieren\n3. Aufgabe: Programm zur Serverüberwachung erweitern\n4. Aufgabe: Datensicherung und Datenspeicher einrichten"
  },

  tasks: [
    // ==========================================
    // 1. AUFGABE (26 PUNKTE)
    // ==========================================
    {
      id: "1",
      title: "1. Aufgabe",
      points: 26,
      context: "In dieser Aufgabe sollen Sie die Bereitstellung von lokalen Servern unter besonderer Berücksichtigung der Systemsicherheit planen.",
      subtasks: [
        {
          id: "1a",
          intro: `a) Zur Vorbereitung der Installation und anschließenden Konfiguration soll eine Liste erstellt werden, welche – nach Bereichen gegliedert – sicherheitsrelevante Einstellungen an Servern beinhaltet.\n\nErgänzen Sie in der Liste 'Serverkonfiguration' die vier freien Bereiche mit jeweils zwei entsprechenden Einstellungen.`,
          text: `Ergänzen Sie die Liste 'Serverkonfiguration' (vier freie Bereiche mit je zwei Einstellungen).`,
          points: 8,
          type: "table_input",
          tableConfig: {
            title: "Liste 'Serverkonfiguration'",
            columns: [
              { title: "Bereiche", width: "30%" },
              { title: "Einstellungen", width: "70%" }
            ],
            rows: [
              {
                name: "Server-Hardware",
                fields: [
                  { value: "– Boot-Reihenfolge ändern\n– Secure-Boot aktivieren", readonly: true }
                ]
              },
              {
                name: "Installation und Konfiguration des Betriebssystems",
                fields: [
                  { id: "1a_bs_1", placeholder: "Einstellung 1...", rows: 2 },
                  { id: "1a_bs_2", placeholder: "Einstellung 2...", rows: 2 }
                ]
              },
              {
                name: "Dienste und Features des Servers",
                fields: [
                  { id: "1a_dienste_1", placeholder: "Einstellung 1...", rows: 2 },
                  { id: "1a_dienste_2", placeholder: "Einstellung 2...", rows: 2 }
                ]
              },
              {
                name: "Anmelden am Server",
                fields: [
                  { id: "1a_anmelden_1", placeholder: "Einstellung 1...", rows: 2 },
                  { id: "1a_anmelden_2", placeholder: "Einstellung 2...", rows: 2 }
                ]
              },
              {
                name: "Administrieren des Servers",
                fields: [
                  { id: "1a_admin_1", placeholder: "Einstellung 1...", rows: 2 },
                  { id: "1a_admin_2", placeholder: "Einstellung 2...", rows: 2 }
                ]
              }
            ]
          },
          solution: `Bereiche → Einstellungen (je 2 Einstellungen, 1 Punkt pro richtige Einstellung):

Installation und Konfiguration des Betriebssystems:
– Servernamen anonymisieren
– System-Updates planen
– Default-Konten umbenennen/deaktivieren
– Firewall-Regeln einschränken
– Partitionieren, Formatieren der Datenträger
– u. a.

Dienste/Features des Servers:
– Nicht benötigte Dienste deaktivieren
– Auto-Start-Programme selektieren/deaktivieren
– Nur sichere Programme zulassen/installieren
– Abschalten unsicherer Protokolle
– Sperren von bestimmten Skripten
– u. a.

Anmelden am Server:
– Sichere Passwortregeln festlegen
– Anmeldezeiten einschränken
– Anmelden nur mit 2FA/MFA zulassen
– Remoteverwaltung/-Zugriff einschränken
– u. a.

Administrieren des Servers:
– Berechtigungen vergeben für:
  – Ändern von Systemeinstellungen
  – Installieren von Anwendungen
  – Zugriff auf Verzeichnisse
  – Zugriff auf Systemressourcen
  – Systemeinstellungen sichern
  – Logs maximale Einstellungen aufzeichnen lassen
– u. a.

Hinweis: Wurden Einstellungen anderen Bereichen zugeordnet, ist dies auch als richtig zu werten, sofern fachlich nachvollziehbar.`
        },
        {
          id: "1ba",
          intro: "b) In IT-Systemen kommt an verschiedenen Stellen das asymmetrische Verschlüsselungsverfahren zum Einsatz.",
          text: "ba) Erläutern Sie die prinzipielle Funktionsweise dieses Verfahrens.",
          points: 4,
          type: "textarea",
          solution: "Bei dem asymmetrischen Verschlüsselungsverfahren gibt es grundsätzlich zwei Schlüssel: den öffentlichen Schlüssel und den privaten Schlüssel. Der öffentliche Schlüssel wird den Stellen zur Verfügung gestellt, die die Daten vertraulich verschlüsseln möchten. Nach der Übertragung der Daten an den Besitzer des entsprechenden privaten Schlüssels kann nur dieser die Daten entschlüsseln. Somit ist zwecks Austauschs von verschlüsselten Daten kein vorheriger Schlüsselaustausch nötig.\n\nAndere inhaltlich (kürzere) zutreffende Antworten sind als richtig zu werten."
        },
        {
          id: "1bb",
          text: "bb) Erläutern Sie einen Nachteil dieses Verfahrens gegenüber dem der symmetrischen Verschlüsselung.",
          points: 2,
          type: "textarea",
          solution: "– Das Entschlüsseln der Daten ist rechenintensiv, daher langsamer\n– Zum Datenaustausch werden zwei Schlüsselpaare benötigt\n– Schlüsselverwaltung aufwendiger\n– u. a."
        },
        {
          id: "1c",
          intro: "c) Zur Gewährleistung der IT-Sicherheit werden an verschiedenen Stellen digitale Zertifikate eingesetzt.",
          text: "Erläutern Sie in mindestens vier Schritten den Vorgang, einen Server mithilfe eines öffentlich bestätigten Zertifikats abzusichern.",
          points: 4,
          type: "textarea",
          solution: "– Ein digitales Zertifikat bei einer kommerziellen Zertifizierungsstelle beantragen\n– Das digitale Zertifikat mit einem Passwort schützen\n– Das digitale Zertifikat auf dem Server installieren\n– Notwendige übergeordnete Zertifikate installieren\n– u. a."
        },
        {
          id: "1d",
          intro: "d) Angriffe auf IT-Systeme erfolgen zu einem großen Teil im Rahmen der Kommunikation mit E-Mails.",
          text: "Beschreiben Sie zwei Sicherheitsmaßnahmen, die geeignet sind, solche Angriffe nicht wirksam werden zu lassen.",
          points: 4,
          type: "textarea",
          solution: "– Bestimmte Anlagen sperren\n– Text-Modus statt HTML benutzen\n– Benutzer wiederkehrend aufklären\n– u. a."
        },
        {
          id: "1e",
          intro: "e) Falls ein Angriff auf ein IT-System nicht verhindert werden konnte, ist es besonders wichtig, diesen anhand bestimmter Symptome frühzeitig zu erkennen.\n\nZum Beispiel könnte das Starten unbekannter Programme ein Hinweis auf eine Systemkompromittierung sein.",
          text: "Erläutern Sie zwei weitere mögliche Symptome einer Systemkompromittierung.",
          points: 4,
          type: "textarea",
          solution: "– Auf veränderte, insbesondere verzögerte Systemleistung achten\n– Erhöhte Aufforderungen zur Eingabe von Passwörtern\n– Eine erhöhte Netzwerkaktivität wahrnehmen\n– Erhöhte Aufforderungen zum Herunterladen von Software\n– Änderungen an der Startseite des Browsers\n– Senden einer großen Anzahl von E-Mails\n– Häufige Abstürze\n– Programme stellen automatisch eine Internetverbindung her\n– Ungewöhnliche Aktivitäten wie Änderung des Kennworts\n– u. a."
        }
      ]
    },

    // ==========================================
    // 2. AUFGABE (24 PUNKTE)
    // ==========================================
    {
      id: "2",
      title: "2. Aufgabe",
      points: 24,
      context: "Die neue CarConfigurator-App der Schnellinger GmbH ist das Aushängeschild des Unternehmens. Sie soll zuverlässig zur Verfügung stehen und auch bei Marketingaktionen in der Lage sein, mit großer Last umzugehen.\n\nDas Autohaus betreibt dazu eine Webservice-Umgebung und ein Datenbanksystem, die lokal gehostet sind und auf virtuellen Servern laufen.",
      subtasks: [
        {
          id: "2aa",
          intro: "a) Um eine hohe Verfügbarkeit sicherzustellen, werden die Server unter anderem mit einer USV ausgestattet.",
          text: "aa) Ordnen Sie den beiden Schaltskizzen die entsprechende Bezeichnung zu.",
          points: 2,
          type: "split_textarea",
          diagramSvg: `
            <svg viewBox="0 0 800 340" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="800" height="340" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="1"/>

              <!-- Auswahlbox oben links -->
              <rect x="20" y="12" width="170" height="62" rx="4" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1"/>
              <text x="30" y="30" font-size="12" font-weight="500" fill="var(--text-secondary)">Offline</text>
              <text x="30" y="46" font-size="12" font-weight="500" fill="var(--text-secondary)">Online</text>
              <text x="30" y="62" font-size="12" font-weight="500" fill="var(--text-secondary)">Line-Interactive</text>

              <!-- ====== LINKE SCHALTSKIZZE (Online) ====== -->
              <g transform="translate(30, 90)">
                <!-- Eingang -->
                <text x="40" y="0" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">Eingang</text>
                <rect x="15" y="8" width="50" height="38" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <path d="M25 22 C30 15, 35 15, 40 22 C45 29, 50 29, 55 22" stroke="var(--text-primary)" stroke-width="1.5" fill="none"/>
                <line x1="40" y1="46" x2="40" y2="65" stroke="var(--text-primary)" stroke-width="1.5"/>
                <!-- Gleichrichter -->
                <rect x="10" y="65" width="60" height="40" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="20" y1="72" x2="20" y2="98" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="50" y1="72" x2="50" y2="98" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="20" y1="85" x2="50" y2="72" stroke="var(--text-primary)" stroke-width="1"/>
                <text x="80" y="90" font-size="10" fill="var(--text-secondary)">Gleichrichter</text>

                <!-- Bypass -->
                <text x="195" y="0" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">Bypass</text>
                <line x1="40" y1="15" x2="140" y2="15" stroke="var(--text-primary)" stroke-width="1" stroke-dasharray="4,3"/>
                <path d="M140 10 L155 15 L140 20 Z" fill="var(--text-primary)"/>
                <line x1="155" y1="15" x2="320" y2="15" stroke="var(--text-primary)" stroke-width="1" stroke-dasharray="4,3"/>

                <!-- Ausgang -->
                <text x="320" y="0" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">Ausgang</text>
                <rect x="295" y="8" width="50" height="38" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="300" y1="20" x2="340" y2="20" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="310" y1="32" x2="330" y2="32" stroke="var(--text-primary)" stroke-width="1.5"/>

                <!-- Wechselrichter -->
                <rect x="280" y="65" width="80" height="40" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <text x="320" y="90" text-anchor="middle" font-size="10" fill="var(--text-secondary)">Wechselrichter</text>
                <line x1="320" y1="46" x2="320" y2="65" stroke="var(--text-primary)" stroke-width="1.5"/>

                <!-- Verbindung Gleichrichter → Wechselrichter -->
                <line x1="70" y1="85" x2="280" y2="85" stroke="var(--text-primary)" stroke-width="1.5" stroke-dasharray="4,3"/>

                <!-- Batterie -->
                <text x="100" y="135" font-size="10" fill="var(--text-secondary)">Batterie</text>
                <line x1="40" y1="105" x2="40" y2="140" stroke="var(--text-primary)" stroke-width="1.5"/>
                <rect x="15" y="140" width="50" height="40" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="30" y1="155" x2="50" y2="155" stroke="var(--text-primary)" stroke-width="2"/>
                <line x1="25" y1="168" x2="55" y2="168" stroke="var(--text-primary)" stroke-width="2"/>

                <!-- Legende -->
                <line x1="240" y1="130" x2="290" y2="130" stroke="var(--text-primary)" stroke-width="1.5"/>
                <text x="295" y="134" font-size="10" fill="var(--text-primary)">Normalfall</text>
                <line x1="240" y1="150" x2="290" y2="150" stroke="var(--text-primary)" stroke-width="1.5" stroke-dasharray="4,3"/>
                <text x="295" y="154" font-size="10" fill="var(--text-primary)">Fehlerfall</text>
              </g>

              <!-- ====== RECHTE SCHALTSKIZZE (Offline) ====== -->
              <g transform="translate(430, 90)">
                <!-- Eingang -->
                <text x="40" y="0" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">Eingang</text>
                <rect x="15" y="8" width="50" height="38" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <path d="M25 22 C30 15, 35 15, 40 22 C45 29, 50 29, 55 22" stroke="var(--text-primary)" stroke-width="1.5" fill="none"/>
                <line x1="40" y1="46" x2="40" y2="65" stroke="var(--text-primary)" stroke-width="1.5"/>
                <!-- Gleichrichter -->
                <rect x="10" y="65" width="60" height="40" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="20" y1="72" x2="20" y2="98" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="50" y1="72" x2="50" y2="98" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="20" y1="85" x2="50" y2="72" stroke="var(--text-primary)" stroke-width="1"/>
                <text x="80" y="90" font-size="10" fill="var(--text-secondary)">Gleichrichter</text>

                <!-- Umschalter statt Bypass -->
                <text x="195" y="0" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">Umschalter</text>
                <line x1="40" y1="15" x2="140" y2="15" stroke="var(--text-primary)" stroke-width="1.5"/>
                <path d="M140 10 L155 20 " stroke="var(--text-primary)" stroke-width="2"/>
                <line x1="155" y1="15" x2="320" y2="15" stroke="var(--text-primary)" stroke-width="1.5" stroke-dasharray="4,3"/>

                <!-- Ausgang -->
                <text x="320" y="0" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">Ausgang</text>
                <rect x="295" y="8" width="50" height="38" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="300" y1="20" x2="340" y2="20" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="310" y1="32" x2="330" y2="32" stroke="var(--text-primary)" stroke-width="1.5"/>

                <!-- Wechselrichter -->
                <rect x="280" y="65" width="80" height="40" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <text x="320" y="90" text-anchor="middle" font-size="10" fill="var(--text-secondary)">Wechselrichter</text>
                <line x1="320" y1="46" x2="320" y2="65" stroke="var(--text-primary)" stroke-width="1.5"/>

                <!-- Verbindung Gleichrichter → Wechselrichter -->
                <line x1="70" y1="85" x2="280" y2="85" stroke="var(--text-primary)" stroke-width="1.5" stroke-dasharray="4,3"/>

                <!-- Batterie -->
                <text x="100" y="135" font-size="10" fill="var(--text-secondary)">Batterie</text>
                <line x1="40" y1="105" x2="40" y2="140" stroke="var(--text-primary)" stroke-width="1.5"/>
                <rect x="15" y="140" width="50" height="40" rx="3" fill="var(--surface-2)" stroke="var(--text-primary)" stroke-width="1.5"/>
                <line x1="30" y1="155" x2="50" y2="155" stroke="var(--text-primary)" stroke-width="2"/>
                <line x1="25" y1="168" x2="55" y2="168" stroke="var(--text-primary)" stroke-width="2"/>

                <!-- Legende -->
                <line x1="240" y1="130" x2="290" y2="130" stroke="var(--text-primary)" stroke-width="1.5"/>
                <text x="295" y="134" font-size="10" fill="var(--text-primary)">Normalfall</text>
                <line x1="240" y1="150" x2="290" y2="150" stroke="var(--text-primary)" stroke-width="1.5" stroke-dasharray="4,3"/>
                <text x="295" y="154" font-size="10" fill="var(--text-primary)">Fehlerfall</text>
              </g>

              <!-- Bezeichnungsfelder -->
              <text x="200" y="325" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Bezeichnung: _______________</text>
              <text x="600" y="325" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Bezeichnung: _______________</text>
            </svg>
          `,
          fields: [
            { id: "2aa_links", label: "Bezeichnung linke Schaltskizze:", placeholder: "Online / Offline / Line-Interactive..." },
            { id: "2aa_rechts", label: "Bezeichnung rechte Schaltskizze:", placeholder: "Online / Offline / Line-Interactive..." }
          ],
          solution: "Linke Schaltskizze: Online\nRechte Schaltskizze: Offline\n\n(1 Punkt pro richtiger Zuordnung)"
        },
        {
          id: "2ab",
          intro: `Die USV-Typen 'Online, Offline und Line-Interactive' werden abgekürzt auch als VI, VFI und VFD bezeichnet.`,
          text: "ab) Ordnen Sie diese Abkürzungen in der Tabelle entsprechend zu und geben Sie die Bedeutung der Abkürzungen an.",
          points: 6,
          type: "table_input",
          tableConfig: {
            title: "USV-Typen und Abkürzungen",
            columns: [
              { title: "Bezeichnung", width: "25%" },
              { title: "Abkürzung", width: "25%" },
              { title: "Bedeutung (Abkürzung ausgeschrieben)", width: "50%" }
            ],
            rows: [
              {
                fields: [
                  { value: "Online", readonly: true },
                  { id: "2ab_online_abk", placeholder: "VFI / VFD / VI" },
                  { id: "2ab_online_bed", placeholder: "Bedeutung..." }
                ]
              },
              {
                fields: [
                  { value: "Offline", readonly: true },
                  { id: "2ab_offline_abk", placeholder: "VFI / VFD / VI" },
                  { id: "2ab_offline_bed", placeholder: "Bedeutung..." }
                ]
              },
              {
                fields: [
                  { value: "Line-Interactive", readonly: true },
                  { id: "2ab_li_abk", placeholder: "VFI / VFD / VI" },
                  { id: "2ab_li_bed", placeholder: "Bedeutung..." }
                ]
              }
            ]
          },
          solution: `Bezeichnung | Abkürzung | Bedeutung
Online       | VFI       | Voltage and Frequency Independent
Offline      | VFD       | Voltage and Frequency Dependent
Line-Inter.  | VI        | Voltage Independent

(2 Punkte pro richtige Zeile)`
        },
        {
          id: "2ac",
          text: "ac) Nennen Sie zwei Vorteile und zwei Nachteile einer Line-Interactive-USV im Vergleich zu einer Offline-USV.",
          points: 4,
          type: "split_textarea",
          fields: [
            { id: "2ac_vorteile", label: "Vorteile:", placeholder: "Vorteil 1...\nVorteil 2...", rows: 3 },
            { id: "2ac_nachteile", label: "Nachteile:", placeholder: "Nachteil 1...\nNachteil 2...", rows: 3 }
          ],
          solution: "Vorteile:\n– Schützt vor Spannungsschwankungen\n– Sehr kurze Umschaltzeit\n\nNachteile:\n– Teurer\n– Geringerer Wirkungsgrad\n\nWeitere Lösungen sind möglich. (1 Punkt pro richtigem Stichpunkt)"
        },
        {
          id: "2b",
          intro: "b) Um den Anforderungen nach einer bestmöglichen Verfügbarkeit gerecht zu werden, soll die Webserverarchitektur mögliche Lastspitzen durch Skalierung der Ressourcen kompensieren.",
          text: `Beschreiben Sie die Konzepte der Skalierungsmethoden 'Horizontale Skalierung' und 'Vertikale Skalierung'.`,
          points: 6,
          type: "split_textarea",
          fields: [
            { id: "2b_horizontal", label: "Horizontale Skalierung (Scale out):", placeholder: "Beschreibung...", rows: 4 },
            { id: "2b_vertikal", label: "Vertikale Skalierung (Scale up):", placeholder: "Beschreibung...", rows: 4 }
          ],
          solution: "Horizontale Skalierung (3 Punkte):\nHorizontale Skalierung ist die Fähigkeit, die Kapazität zu erhöhen, indem mehrere Komponenten gleichartige Anfragen erfüllen. Beim Skalieren werden weitere Komponenten hinzugefügt bzw. abgebaut. Die Idee ist, die Last zu verteilen. Dies kann dynamisch passieren, ohne Ausfallzeiten der bestehenden Systeme.\n\nVertikale Skalierung (3 Punkte):\nVertikale Skalierung wird durch Hinzufügen oder Entfernen von Ressourcen in einem System erreicht, z. B. RAM oder CPU. Das Ziel ist vor allem, prognostizierbare Lastspitzen durch ausreichende Performance bei einer festen Anzahl von Systemen bereitzustellen. Eine Bereitstellung bzw. ein Einbau ist oft mit einer Ausfallzeit verbunden.\n\nAndere inhaltlich (kürzere) zutreffende Antworten sind als richtig zu werten."
        },
        {
          id: "2c",
          intro: "c) Um unterbrechungsfrei kontinuierlich neue Updates veröffentlichen zu können, haben Sie sich für Blue Green Deployments entschieden.",
          text: "Erläutern Sie die Methode des Blue Green Deployments anhand des Schaubilds.",
          points: 6,
          type: "textarea",
          diagramSvg: `
            <svg viewBox="0 0 780 380" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="780" height="380" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="1"/>

              <!-- ====== BEFORE DEPLOYMENT (links) ====== -->
              <g transform="translate(30, 20)">
                <!-- Loadbalancer -->
                <rect x="95" y="0" width="150" height="36" rx="6" fill="#475569" stroke="#334155" stroke-width="1.5"/>
                <text x="170" y="23" text-anchor="middle" font-size="13" font-weight="700" fill="#ffffff">Loadbalancer</text>

                <!-- Pfeil nach rechts (zu Green/Umgebung 2) -->
                <line x1="170" y1="36" x2="240" y2="70" stroke="var(--text-primary)" stroke-width="2.5"/>
                <polygon points="238,65 245,72 235,72" fill="var(--text-primary)"/>

                <!-- Umgebung 1 (Blue - Staging) -->
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="155" height="210" rx="8" fill="var(--surface-2)" stroke="#3b82f6" stroke-width="2"/>
                  <!-- Server-Icon -->
                  <rect x="35" y="15" width="85" height="50" rx="5" fill="#64748b" stroke="#475569" stroke-width="1.5"/>
                  <text x="77" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="#ffffff">Umgebung 1</text>
                  <rect x="35" y="78" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="96" text-anchor="middle" font-size="11" font-weight="600" fill="#ffffff">Version 1.1</text>
                  <rect x="35" y="115" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Staging</text>
                  <rect x="35" y="155" width="85" height="30" rx="4" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
                  <text x="77" y="175" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">(Blue)</text>
                </g>

                <!-- Umgebung 2 (Green - Live) -->
                <g transform="translate(185, 65)">
                  <rect x="0" y="0" width="155" height="210" rx="8" fill="var(--surface-2)" stroke="#16a34a" stroke-width="2"/>
                  <rect x="35" y="15" width="85" height="50" rx="5" fill="#64748b" stroke="#475569" stroke-width="1.5"/>
                  <text x="77" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="#ffffff">Umgebung 2</text>
                  <rect x="35" y="78" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="96" text-anchor="middle" font-size="11" font-weight="600" fill="#ffffff">Version 1.0</text>
                  <rect x="35" y="115" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#10b981">Live</text>
                  <rect x="35" y="155" width="85" height="30" rx="4" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
                  <text x="77" y="175" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">(Green)</text>
                </g>

                <!-- Label -->
                <rect x="95" y="295" width="150" height="30" rx="4" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1"/>
                <text x="170" y="314" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-primary)">Before Deployment</text>
              </g>

              <!-- ====== AFTER DEPLOYMENT (rechts) ====== -->
              <g transform="translate(420, 20)">
                <!-- Loadbalancer -->
                <rect x="95" y="0" width="150" height="36" rx="6" fill="#475569" stroke="#334155" stroke-width="1.5"/>
                <text x="170" y="23" text-anchor="middle" font-size="13" font-weight="700" fill="#ffffff">Loadbalancer</text>

                <!-- Pfeil nach links (jetzt zu Blue/Umgebung 1) -->
                <line x1="170" y1="36" x2="100" y2="70" stroke="var(--text-primary)" stroke-width="2.5"/>
                <polygon points="102,65 95,72 105,72" fill="var(--text-primary)"/>

                <!-- Umgebung 1 (Blue - jetzt Live) -->
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="155" height="210" rx="8" fill="var(--surface-2)" stroke="#3b82f6" stroke-width="2"/>
                  <rect x="35" y="15" width="85" height="50" rx="5" fill="#64748b" stroke="#475569" stroke-width="1.5"/>
                  <text x="77" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="#ffffff">Umgebung 1</text>
                  <rect x="35" y="78" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="96" text-anchor="middle" font-size="11" font-weight="600" fill="#ffffff">Version 1.1</text>
                  <rect x="35" y="115" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#10b981">Live</text>
                  <rect x="35" y="155" width="85" height="30" rx="4" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
                  <text x="77" y="175" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">(Blue)</text>
                </g>

                <!-- Umgebung 2 (Green - jetzt Staging) -->
                <g transform="translate(185, 65)">
                  <rect x="0" y="0" width="155" height="210" rx="8" fill="var(--surface-2)" stroke="#16a34a" stroke-width="2"/>
                  <rect x="35" y="15" width="85" height="50" rx="5" fill="#64748b" stroke="#475569" stroke-width="1.5"/>
                  <text x="77" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="#ffffff">Umgebung 2</text>
                  <rect x="35" y="78" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="96" text-anchor="middle" font-size="11" font-weight="600" fill="#ffffff">Version 1.0</text>
                  <rect x="35" y="115" width="85" height="26" rx="4" fill="#475569"/>
                  <text x="77" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Staging</text>
                  <rect x="35" y="155" width="85" height="30" rx="4" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
                  <text x="77" y="175" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">(Green)</text>
                </g>

                <!-- Label -->
                <rect x="95" y="295" width="150" height="30" rx="4" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1"/>
                <text x="170" y="314" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-primary)">After Deployment</text>
              </g>
            </svg>
          `,
          solution: `Beim Blue Green Deployment existieren (mindestens) zwei Umgebungen. Im Schaubild sind das die Umgebungen Umgebung 1 und Umgebung 2. Eine der Umgebungen ist die Live-Umgebung. Im Schaubild 'before Deployment' ist das die Umgebung 2 (die grüne Umgebung). Die andere der Umgebungen wird mit der neuen Version vorbereitet (deployed). Im Schaubild 'before Deployment' ist das die Umgebung 1 (die blaue Umgebung). Dann wird unterbrechungsfrei ein Schwenk der Verbindungen durchgeführt, bis alle Nutzer auf der neuen Live-Umgebung (after Deployment/Blau) arbeiten. Die alte Umgebung kann kurzfristig als Fallback genutzt werden, und langfristig für einen neuerlichen Schwenk als Staging-Umgebung zur nächsten Version werden.

Andere inhaltlich (kürzere) zutreffende Antworten sind als richtig zu werten.`
        }
      ]
    },

    // ==========================================
    // 3. AUFGABE (26 PUNKTE)
    // ==========================================
    {
      id: "3",
      title: "3. Aufgabe",
      points: 26,
      context: "Im Rahmen der Serverüberwachung sollen Sie eine Programmerweiterung vornehmen.",
      subtasks: [
        {
          id: "3a",
          intro: `a) Das Programm 'MONCPU' dient der täglichen Überwachung der CPU-Last des Datenbank-Servers. Es speichert für jede zurückliegende volle Stunde den Mittelwert der CPU-Last. Die Mittelwerte werden als ganzzahliger Prozentwert in einem eindimensionalen Array gespeichert.`,
          text: `Vervollständigen Sie den vorliegenden Programmentwurf entsprechend der Anforderung.\n\nDas Programm soll so erweitert werden, dass die folgende Meldung ausgegeben wird, sofern die CPU-Last am vergangenen Tag an mehr als 18 Stunden den Wert von 80 % überschritten hat.\n\nOrientieren Sie sich dabei an den vorgegebenen Kommentaren und nutzen Sie die Anlage 'Syntax' (siehe Seite 7).`,
          points: 15,
          type: "textarea",
          tableData: {
            headers: ["Zeitraum", "0-1 Uhr", "1-2 Uhr", "2-3 Uhr", "3-4 Uhr", "4-5 Uhr", "5-6 Uhr", "...", "20-21 Uhr", "21-22 Uhr", "22-23 Uhr", "23-0 Uhr"],
            rows: [
              ["Array-Index", "0", "1", "2", "3", "4", "5", "...", "20", "21", "22", "23"],
              ["Array-Wert", "33", "44", "40", "52", "60", "56", "...", "40", "52", "60", "56"]
            ]
          },
          diagramSvg: `
            <svg viewBox="0 0 500 100" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <!-- Messagebox MONCPU -->
              <rect x="10" y="5" width="480" height="85" rx="6" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.5"/>
              <rect x="10" y="5" width="480" height="24" rx="6" fill="var(--surface-3)" stroke="var(--border-strong)" stroke-width="1"/>
              <text x="20" y="22" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">MONCPU</text>
              <text x="480" y="22" text-anchor="end" font-size="14" fill="var(--text-muted)">✕</text>
              <text x="20" y="52" font-size="11" fill="var(--text-primary)" font-family="var(--font-mono)">Die Systemauslastung war an mehr als 18 Stunden höher als 80 %.</text>
              <rect x="210" y="65" width="80" height="22" rx="3" fill="var(--surface-3)" stroke="var(--border-strong)" stroke-width="1"/>
              <text x="250" y="80" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-primary)">OK</text>
            </svg>
          `,
          quoteText: `Programmerweiterung MONCPU:

string message = "Die Systemauslastung war an mehr als 18 Stunden höher als 80 %."
                                                    //Text Messagebox
string title = "MONCPU";                            //Titel Messagebox
int cpuutil = 0;                                     //Systemauslastung
int cpulimit = 0;                                    //Grenzwert der Systemauslastung
int sumstd = 0;                                      //Summe Stunden

                                                     //Array mit Testdaten
int[] usedCPU = new int[24]
{33,44,40,52,60,56,33,44,40,52,60,56,33,44,40,52,60,56,33,44,40,52,60,56};`,
          solution: `string message = "Die Systemauslastung war an mehr als 18 Stunden höher als 80 %."
                                                    //Titel der Messagebox
string title = "MONCPU";                            //Systemauslastung Stunde
int cpuUtilHour = 0;                                //Grenzwert der Systemauslastung
int cpuLimit = 0;                                   //Anzahl Stunden
int sumstd = 0;

                                                    //Array mit Testdaten
int[] CpuUtilDay = new int[24]
{33,44,40,52,60,56,33,44,40,52,60,56,33,44,40,52,60,56,33,44,40,52,60,56};

for (int i = 0; i < 24; i++)

    if (CpuUtilDay[i] > 80) sumstd = sumstd + 1;

if (sumstd > 18) MessageBox.Show(message, title);

(15 Punkte, 3 x 5 Punkte: for-Schleife, if-Bedingung im Loop, if + MessageBox)`
        },
        {
          id: "3b",
          intro: "b) In der Programmdokumentation ist ein Klassendiagramm enthalten. Im Klassendiagramm sind die Beziehungstypen 'Aggregation' und 'Komposition' enthalten.",
          text: "Erläutern Sie die genannten Beziehungstypen und geben Sie zu jedem Beziehungstyp ein allgemeines Beispiel an.",
          points: 6,
          type: "split_textarea",
          fields: [
            { id: "3b_aggregation_erl", label: "Aggregation – Erläuterung:", placeholder: "Erläuterung...", rows: 3 },
            { id: "3b_aggregation_bsp", label: "Aggregation – Beispiel:", placeholder: "Beispiel...", rows: 2 },
            { id: "3b_komposition_erl", label: "Komposition – Erläuterung:", placeholder: "Erläuterung...", rows: 3 },
            { id: "3b_komposition_bsp", label: "Komposition – Beispiel:", placeholder: "Beispiel...", rows: 2 }
          ],
          solution: `Aggregation (3 Punkte):
Erläuterung:
Die Aggregation ist eine Form der Beziehung zwischen zwei Klassen, bei der eine sogenannte 'Teil-Ganzes-Beziehung' besteht.
Beispiel:
Die Klassen 'Gebäude' und 'Mieter', sofern auch nicht vermietete Gebäude berücksichtigt werden sollen.

Komposition (3 Punkte):
Erläuterung:
Bei der Komposition gilt zusätzlich gegenüber der Aggregation die Einschränkung, dass die 'Teil-Ganzes-Beziehung' an die Existenz des 'Ganzen' geknüpft ist.
Beispiel:
Die Klassen 'Gebäude' und 'Raum'. Ein Raum existiert nur, sofern auch das entsprechende Gebäude existiert.`
        },
        {
          id: "3c",
          intro: `c) Das Programm 'MONCPU.EXE', welches sich in dem Verzeichnis d:\\util befindet, soll mithilfe des Task-Schedulers täglich um 16:10 Uhr automatisiert gestartet werden. Dazu soll ein entsprechender Aufruf mit dem Namen CPUMON erstellt werden.

Informationen zu den Parametern des Task-Schedulers finden Sie in den Anlagen (siehe Seite 8).`,
          text: "Vervollständigen Sie den entsprechenden Programmaufruf:\n\nSCHTASKS ...",
          points: 5,
          type: "textarea",
          quoteText: `Parameter Task-Scheduler:
SCHTASKS /Parameter [Argumente]

Beschreibung:
Ermöglicht einem Administrator, geplante Aufgaben auf einem lokalen oder Remotecomputer zu erstellen, abzufragen, zu löschen, zu ändern, auszuführen und zu beenden.

Parameterliste:

/Create – Erstellt eine neue geplante Aufgabe.

/tn <taskname> – Specifies a name for the task. Each task on the system must have a unique name and must conform to the rules for file names, not exceeding 238 characters. Use quotation marks to enclose names that include spaces.

/sc <scheduletype> – Specifies the schedule type. The valid values include:
– HOURLY
– DAILY
– WEEKLY
– MONTHLY
– ONCE
– ONSTART

/tr <Taskrun> – Specifies the program or command that the task runs. Type the fully qualified path and file name of an executable file, script file, or batch file. The path name must not exceed 262 characters.

/st <Starttime> – Specifies the start time for the task, using the 24-hour time format, hh:mm. The default value is the current time on the local computer.`,
          solution: "SCHTASKS /Create /tn CPUMON /tr d:\\util\\moncpu.exe /sc DAILY /st 16:10"
        }
      ]
    },

    // ==========================================
    // 4. AUFGABE (24 PUNKTE)
    // ==========================================
    {
      id: "4",
      title: "4. Aufgabe",
      points: 24,
      context: "Im Zusammenhang mit der Datenspeicherung, Datensicherung und der Wiederherstellung der Daten bei der Schnellinger GmbH sollen Sie Verbesserungen vornehmen.",
      subtasks: [
        {
          id: "4a",
          intro: "a) Die Tagessicherungen der Schnellinger GmbH werden aktuell inkrementell durchgeführt.\n\nEine Vollsicherung wird sonntags durchgeführt. Die Datenvolumen der Tagessicherungen für die 21. Woche sind als Säulendiagramm dargestellt.",
          text: "Es wird überlegt, anstatt inkrementeller Datensicherungen differenzielle Datensicherungen durchzuführen.\n\nBerechnen Sie anhand der gegebenen Datenvolumen die sich daraus resultierenden Datenvolumen pro Tag und stellen Sie die Ergebnisse entsprechend in dem folgenden Wochenplan dar.",
          points: 6,
          type: "textarea",
          diagramSvg: `
            <svg viewBox="0 0 680 320" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="680" height="320" rx="8" fill="var(--surface-1)" stroke="var(--border)" stroke-width="1"/>

              <!-- Titel -->
              <text x="340" y="28" text-anchor="middle" font-size="16" font-weight="700" fill="var(--text-primary)">Tagessicherung</text>
              <text x="340" y="48" text-anchor="middle" font-size="13" fill="var(--text-secondary)">( inkrementell )</text>

              <!-- Y-Achse Label -->
              <text x="28" y="75" font-size="11" font-weight="600" fill="var(--text-secondary)">Datenvolumen</text>
              <text x="42" y="90" font-size="11" font-weight="600" fill="var(--text-secondary)">( GB )</text>

              <!-- Y-Achse Werte -->
              <text x="62" y="103" text-anchor="end" font-size="10" fill="var(--text-muted)">30</text>
              <text x="62" y="138" text-anchor="end" font-size="10" fill="var(--text-muted)">25</text>
              <text x="62" y="173" text-anchor="end" font-size="10" fill="var(--text-muted)">20</text>
              <text x="62" y="208" text-anchor="end" font-size="10" fill="var(--text-muted)">15</text>
              <text x="62" y="243" text-anchor="end" font-size="10" fill="var(--text-muted)">10</text>
              <text x="62" y="278" text-anchor="end" font-size="10" fill="var(--text-muted)">5</text>

              <!-- Achsen -->
              <line x1="70" y1="95" x2="70" y2="290" stroke="var(--border-strong)" stroke-width="1.5"/>
              <line x1="70" y1="290" x2="650" y2="290" stroke="var(--border-strong)" stroke-width="1.5"/>

              <!-- Rasterlinien -->
              <line x1="70" y1="100" x2="650" y2="100" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="135" x2="650" y2="135" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="170" x2="650" y2="170" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="205" x2="650" y2="205" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="240" x2="650" y2="240" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="275" x2="650" y2="275" stroke="var(--border)" stroke-width="0.5"/>

              <!-- Balken: Mo=25GB, Di=10GB, Mi=8GB, Do=9GB, Fr=10GB, Sa=5GB -->
              <!-- Mo: 25 GB -->
              <rect x="100" y="120" width="60" height="170" rx="3" fill="#94a3b8" opacity="0.7"/>
              <!-- Di: 10 GB -->
              <rect x="195" y="220" width="60" height="70" rx="3" fill="#94a3b8" opacity="0.7"/>
              <!-- Mi: 8 GB -->
              <rect x="290" y="234" width="60" height="56" rx="3" fill="#94a3b8" opacity="0.7"/>
              <!-- Do: 9 GB -->
              <rect x="385" y="227" width="60" height="63" rx="3" fill="#94a3b8" opacity="0.7"/>
              <!-- Fr: 10 GB -->
              <rect x="480" y="220" width="60" height="70" rx="3" fill="#94a3b8" opacity="0.7"/>
              <!-- Sa: 5 GB -->
              <rect x="575" y="255" width="60" height="35" rx="3" fill="#94a3b8" opacity="0.7"/>

              <!-- X-Achse Labels -->
              <text x="130" y="306" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Mo</text>
              <text x="225" y="306" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Di</text>
              <text x="320" y="306" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Mi</text>
              <text x="415" y="306" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Do</text>
              <text x="510" y="306" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Fr</text>
              <text x="605" y="306" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Sa</text>
            </svg>
          `,
          solutionDiagramSvg: `
            <svg viewBox="0 0 680 360" class="exam-diagram-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="680" height="360" rx="8" fill="var(--surface-1)" stroke="var(--status-good)" stroke-width="1.5"/>

              <!-- Titel -->
              <text x="340" y="28" text-anchor="middle" font-size="16" font-weight="700" fill="var(--status-good)">Tagessicherung</text>
              <text x="340" y="48" text-anchor="middle" font-size="13" fill="var(--text-secondary)">( differenziell ) – Musterlösung</text>

              <!-- Y-Achse Label -->
              <text x="28" y="78" font-size="11" font-weight="600" fill="var(--text-secondary)">Datenvolumen</text>
              <text x="42" y="93" font-size="11" font-weight="600" fill="var(--text-secondary)">( GB )</text>

              <!-- Y-Achse Werte: 0,10,20,30,40,50,60,70,80,90 -->
              <text x="62" y="105" text-anchor="end" font-size="9" fill="var(--text-muted)">90</text>
              <text x="62" y="130" text-anchor="end" font-size="9" fill="var(--text-muted)">80</text>
              <text x="62" y="155" text-anchor="end" font-size="9" fill="var(--text-muted)">70</text>
              <text x="62" y="180" text-anchor="end" font-size="9" fill="var(--text-muted)">60</text>
              <text x="62" y="205" text-anchor="end" font-size="9" fill="var(--text-muted)">50</text>
              <text x="62" y="230" text-anchor="end" font-size="9" fill="var(--text-muted)">40</text>
              <text x="62" y="255" text-anchor="end" font-size="9" fill="var(--text-muted)">30</text>
              <text x="62" y="280" text-anchor="end" font-size="9" fill="var(--text-muted)">20</text>
              <text x="62" y="305" text-anchor="end" font-size="9" fill="var(--text-muted)">10</text>

              <!-- Achsen -->
              <line x1="70" y1="98" x2="70" y2="320" stroke="var(--border-strong)" stroke-width="1.5"/>
              <line x1="70" y1="320" x2="650" y2="320" stroke="var(--border-strong)" stroke-width="1.5"/>

              <!-- Rasterlinien -->
              <line x1="70" y1="100" x2="650" y2="100" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="125" x2="650" y2="125" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="150" x2="650" y2="150" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="175" x2="650" y2="175" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="200" x2="650" y2="200" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="225" x2="650" y2="225" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="250" x2="650" y2="250" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="275" x2="650" y2="275" stroke="var(--border)" stroke-width="0.5"/>
              <line x1="70" y1="300" x2="650" y2="300" stroke="var(--border)" stroke-width="0.5"/>

              <!-- Differenzielle Balken: Mo=25, Di=35, Mi=43, Do=52, Fr=62, Sa=67 (kumulativ) -->
              <!-- Skalierung: 90GB = Pos 100, 0GB = Pos 320 → 1 GB = 2.44px → Faktor ~2.5 -->
              <!-- Mo: 25 GB → Höhe 62.5, y=257.5 -->
              <rect x="100" y="258" width="60" height="62" rx="3" fill="#e88080" opacity="0.8"/>
              <text x="130" y="250" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)">25</text>
              <!-- Di: 35 GB → Höhe 87.5, y=232.5 -->
              <rect x="195" y="232" width="60" height="88" rx="3" fill="#e88080" opacity="0.8"/>
              <text x="225" y="224" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)">35</text>
              <!-- Mi: 43 GB → Höhe 107.5, y=212.5 -->
              <rect x="290" y="212" width="60" height="108" rx="3" fill="#e88080" opacity="0.8"/>
              <text x="320" y="204" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)">43</text>
              <!-- Do: 52 GB → Höhe 130, y=190 -->
              <rect x="385" y="190" width="60" height="130" rx="3" fill="#e88080" opacity="0.8"/>
              <text x="415" y="182" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)">52</text>
              <!-- Fr: 62 GB → Höhe 155, y=165 -->
              <rect x="480" y="165" width="60" height="155" rx="3" fill="#e88080" opacity="0.8"/>
              <text x="510" y="157" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)">62</text>
              <!-- Sa: 67 GB → Höhe 167.5, y=152.5 -->
              <rect x="575" y="152" width="60" height="168" rx="3" fill="#e88080" opacity="0.8"/>
              <text x="605" y="144" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)">67</text>

              <!-- X-Achse Labels -->
              <text x="130" y="338" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Mo</text>
              <text x="225" y="338" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Di</text>
              <text x="320" y="338" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Mi</text>
              <text x="415" y="338" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Do</text>
              <text x="510" y="338" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Fr</text>
              <text x="605" y="338" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-primary)">Sa</text>
            </svg>
          `,
          solution: `Differenzielle Datensicherung (Datenvolumen pro Tag):
Mo: 25 GB (= 25 GB, identisch zur inkrementellen)
Di: 35 GB (= 25 + 10)
Mi: 43 GB (= 25 + 10 + 8)
Do: 52 GB (= 25 + 10 + 8 + 9)
Fr: 62 GB (= 25 + 10 + 8 + 9 + 10)
Sa: 67 GB (= 25 + 10 + 8 + 9 + 10 + 5)

Bei der differenziellen Sicherung werden alle Änderungen seit der letzten Vollsicherung gesichert, daher kumulieren sich die Datenvolumen.

(6 Punkte, 6 x 1 Punkt pro richtigem Wert)`
        },
        {
          id: "4ba",
          intro: "b) Die Daten der Schnellinger GmbH werden zurzeit auf einem SAN mit einer Nettospeicherkapazität von 8 TiB gespeichert. Aufgrund des Alters des SAN und einer Kapazitätsauslastung von 90 % wurde beschlossen, ein neues SAN zu beschaffen.\n\nIn dem neuen SAN können maximal 24 Festplatten vom Typ SAS 3200A mit einer Speicherkapazität von je 1 TiB verbaut werden. Der jährliche Datenzuwachs der Schnellinger GmbH beträgt 450 GiB.",
          text: "ba) Ermitteln Sie die benötigte Nettospeicherkapazität bei einer Übernahme des Altdatenbestands und einer geplanten Betriebszeit von fünf Jahren.\n\nDer Rechenweg ist anzugeben.",
          points: 4,
          type: "textarea",
          solution: `9,4 TiB

Altdatenbestand:       7.373 GiB = 8 TiB * 0,9 * 1.024
Datenzuwachs in 5 J.:  2.250 GiB = 450 GiB/Jahr × 5 Jahre
Benötigter Speicher:   9.623 GiB = 7.373 GiB + 2.250 GiB
Umrechnung in TiB:     9,4 TiB   = 9.623 GiB / 1.024`
        },
        {
          id: "4bb",
          intro: "Hinweis: Sollte ba) nicht bearbeitet worden sein, rechnen Sie mit dem alternativen Ausgangswert von 9,7 TiB weiter.",
          text: "bb) Ermitteln Sie die Anzahl der benötigten Festplatten des SAN, wenn ein RAID-6-Verbund eingerichtet wird.\n\nDer Rechenweg ist anzugeben.",
          points: 4,
          type: "textarea",
          solution: `12 Festplatten

10 × 1 TiB Festplatten für Daten
2 × 1 TiB Festplatten für Parität

Lösung zum alternativen Ausgangswert von 9,7 TiB ist identisch.`
        },
        {
          id: "4bc",
          intro: "bc) Das SAN im RAID-6-Verbund soll zusätzlich mit einer Hot-Spare-Festplatte betrieben werden.",
          text: "Erläutern Sie die Funktion einer Hot-Spare-Festplatte.",
          points: 4,
          type: "textarea",
          solution: "Eine Hot-Spare-Festplatte ist eine in einem RAID-Verbund nicht verwendete Festplatte. Fällt eine Festplatte im RAID-Verbund aus, übernimmt die Hot-Spare-Festplatte im laufenden Betrieb die Rolle der defekten Festplatte."
        },
        {
          id: "4c",
          intro: `c) Die Schnellinger GmbH hat für die Notfallwiederherstellung (Disaster Recovery) der Unternehmensdaten in ihren Service Level Agreements die Zielvorgaben Recovery Time Objective (RTO) und Recovery Point Objective (RPO) beschrieben.`,
          text: "Erläutern Sie anhand des Textes …\n\n– die Zielvorgabe Recovery Time Objective (RTO):\n– die Zielvorgabe Recovery Point Objective (RPO):",
          points: 6,
          type: "split_textarea",
          quoteText: `Recovery Time Objective and Recovery Point Objective

The recovery time objective (RTO) is the planned duration of time and a service level within. A business process must be restored after a disaster in order to avoid unacceptable disturbances associated with a break in business continuity. It can include the time for trying to find a solution, the time to fix the problem, the time for recovery itself and the communication of the solved problem to users.

The recovery point objective (RPO) measures the maximum time period in which recent data might have been permanently lost in the event of a major failure. For instance if the business continuity plan is 'restore up to last available backup', the RPO is the maximum interval between such a backup that has been safely stored offsite.`,
          fields: [
            { id: "4c_rto", label: "Zielvorgabe Recovery Time Objective (RTO):", placeholder: "Erläuterung...", rows: 4 },
            { id: "4c_rpo", label: "Zielvorgabe Recovery Point Objective (RPO):", placeholder: "Erläuterung...", rows: 4 }
          ],
          solution: `Recovery Time Objective (RTO) – 3 Punkte:
Bezeichnet die Zeitspanne, für die ein System ausfallen kann. Es handelt es sich um die Zeit, die vom Zeitpunkt des Schadens bis zur vollständigen Wiederherstellung vergehen darf.

Recovery Point Objective (RPO) – 3 Punkte:
Bezeichnet die Zeitspanne, für die ein Datenverlust in Kauf genommen werden kann. Bei der Recovery Point Objective handelt es sich um den Zeitraum, der zwischen zwei Datensicherungen liegen darf.

Andere inhaltlich zutreffende Antworten sind als richtig zu werten.`
        }
      ]
    }
  ]
};

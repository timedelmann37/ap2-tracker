window.AP2_LEARNING_TOPICS = Object.freeze([
  {
    "id": "server-leistungsindikatoren-cpu-ram-io",
    "slug": "server-leistungsindikatoren-cpu-ram-io",
    "title": "Serverleistung richtig lesen: CPU, RAM und I/O",
    "description": "Messwerte einem Engpass zuordnen und IOPS, Durchsatz und Latenz aus einem Lastprofil begründet unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__0",
    "week": "KW 35",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "cpu-ram",
      "io-metriken"
    ],
    "sources": [
      "server-cpu-intel",
      "server-memory-kingston",
      "server-io-dell"
    ],
    "contentHash": "0c7148b336730db131a8d88e9937bedf6f8563c18ad7d609c542cfdbdba6e84f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "serverdimensionierung-anforderungen-begruenden",
    "slug": "serverdimensionierung-anforderungen-begruenden",
    "title": "Server dimensionieren: vom Bedarf zur Entscheidung",
    "description": "Aus gemessenen Spitzenwerten, Reserven und Antwortzeitzielen eine nachvollziehbare Serverkonfiguration auswählen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__1",
    "week": "KW 35",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "bedarf",
      "entscheidung"
    ],
    "sources": [
      "sizing-aws-rightsize",
      "sizing-aws-metrics",
      "server-io-dell"
    ],
    "contentHash": "a8e1edadfa724d651bc1f2099dd45f3cf5c2e843796d7128bd180b4150576bfb",
    "sourceKind": "compact-spec"
  },
  {
    "id": "serverbauformen-tower-rack-blade",
    "slug": "serverbauformen-tower-rack-blade",
    "title": "Serverbauformen: Tower, Rack oder Blade?",
    "description": "Bauformen anhand des Einsatzorts wählen und einen Rackeinbau über Höhe, Tiefe, Schienen und Traglast prüfen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__2",
    "week": "KW 35",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "bauform",
      "einbau"
    ],
    "sources": [
      "europa-integratoren-2026",
      "server-form-hpe-rack",
      "server-form-hpe-blade",
      "server-form-dell-rails",
      "server-form-dell-u"
    ],
    "contentHash": "14750c0ff3c4f4afcbdf8e92b25055c9c8146a52d57b1f6eea2becc3eb124583",
    "sourceKind": "compact-spec"
  },
  {
    "id": "hardware-redundanz-hot-swap-hot-spare-bonding-ecc",
    "slug": "hardware-redundanz-hot-swap-hot-spare-bonding-ecc",
    "title": "Hardware-Redundanz: welcher Ausfall ist wirklich abgedeckt?",
    "description": "Netzteile, austauschbare Komponenten, Ersatzplatten, Netzwerkpfade und ECC nach ihrer tatsächlichen Schutzwirkung unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__3",
    "week": "KW 35",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "strom",
      "speicher",
      "netz"
    ],
    "sources": [
      "europa-integratoren-2026",
      "redundancy-dell-psu",
      "redundancy-dell-spare",
      "redundancy-linux-bond",
      "redundancy-kingston-ecc"
    ],
    "contentHash": "c991a241c93bc4ebccdf349a19998c61f31e113b73aadb5b26f8737977397544",
    "sourceKind": "compact-spec"
  },
  {
    "id": "clients-fat-thin-zero-vdi-daas",
    "slug": "clients-fat-thin-zero-vdi-daas",
    "title": "Client-Konzepte: lokal arbeiten oder Desktop streamen?",
    "description": "Fat, Thin und Zero Clients von VDI und DaaS trennen und anhand von Netzabhängigkeit und Betriebsverantwortung auswählen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__4",
    "week": "KW 35",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "endpunkt",
      "dienstmodell"
    ],
    "sources": [
      "itlf10-12-2023",
      "clients-hp-thin-zero",
      "clients-microsoft-avd",
      "clients-aws-daas",
      "clients-ibm-local-remote"
    ],
    "contentHash": "b383c8bc8e7eefcdcf74038a28b7b6b79e335122b2bc49005d620fe900d3bf3e",
    "sourceKind": "compact-spec"
  },
  {
    "id": "peripherie-appliances-rollen-und-grenzen",
    "slug": "peripherie-appliances-rollen-und-grenzen",
    "title": "Appliances und Peripherie: wer erledigt welche Aufgabe?",
    "description": "Hardware-Firewall, Load Balancer, NAS und Multifunktionsgerät einem Datenfluss zuordnen und falsche Sicherheitsannahmen erkennen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__5",
    "week": "KW 35",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rollen",
      "grenzen"
    ],
    "sources": [
      "appliance-fortinet-policy",
      "appliance-nginx-health",
      "appliance-synology-nas",
      "appliance-hp-mfp"
    ],
    "contentHash": "f9a8054fa6a817db1a169d91aa423407fc82eb306beaa17027437d38c4b29242",
    "sourceKind": "compact-spec"
  },
  {
    "id": "rechenzentrumsbetrieb-leistung-waerme-luftfuehrung",
    "slug": "rechenzentrumsbetrieb-leistung-waerme-luftfuehrung",
    "title": "Rechenzentrumsbetrieb: Strom, Wärme und Luftwege",
    "description": "IT-Leistung in Wärmelast und Tagesenergie übersetzen, Kalt- und Warmgang erklären und eine Kühlentscheidung begründen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__6",
    "week": "KW 35",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "leistung-waerme",
      "luftwege"
    ],
    "sources": [
      "dc-doe-design-guide",
      "dc-ashrae-airflow",
      "europa-integratoren-2026"
    ],
    "contentHash": "bc773288cfb829e2a64c6e20bc18a2d30c8f2fb9eb6e2a1fda89bbcb613c4ba7",
    "sourceKind": "compact-spec"
  },
  {
    "id": "usv-leistung-laufzeit-abschaltung",
    "slug": "usv-leistung-laufzeit-abschaltung",
    "title": "USV auslegen: VA, Watt und sichere Abschaltung",
    "description": "Leistungsfaktor, USV-Grenzen, Batterielaufzeit und Topologie in einer Beschaffungsentscheidung zusammenführen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__7",
    "week": "KW 35",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dimensionierung",
      "betriebsfall"
    ],
    "sources": [
      "ups-eaton-sizing",
      "ups-schneider-transfer",
      "ups-eaton-shutdown",
      "europa-integratoren-2026"
    ],
    "contentHash": "bff649bddc418e1688ef7ae6045b70530ee05369cea785e5cd6c4cc293fc0450",
    "sourceKind": "compact-spec"
  },
  {
    "id": "usv-klassen-vfd-vi-vfi-schaltbilder",
    "slug": "usv-klassen-vfd-vi-vfi-schaltbilder",
    "title": "USV-Klassen lesen: VFD, VI und VFI",
    "description": "Die drei Kürzel nach IEC 62040-3 auseinanderhalten und vereinfachte Funktionsschaltbilder richtig zuordnen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__8",
    "week": "KW 35",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "klassen",
      "schaltweg"
    ],
    "sources": [
      "ups-iec-62040-3-2021",
      "ups-doe-vfd-vi-vfi",
      "ups-eaton-topologies",
      "ihk-bonn"
    ],
    "contentHash": "5e539c28b6bc61aad55f1cfe220f384ce56771e097492817b5ff083023935e46",
    "sourceKind": "compact-spec"
  },
  {
    "id": "redundanzstufen-n-plus-eins-zwei-n-geo",
    "slug": "redundanzstufen-n-plus-eins-zwei-n-geo",
    "title": "Redundanzstufen: N+1, 2N und zwei Standorte",
    "description": "Kapazitätsreserve von unabhängigen Pfaden trennen und Georedundanz anhand eines Dienstes bewerten.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__9",
    "week": "KW 35",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kapazitaet",
      "standort"
    ],
    "sources": [
      "redundancy-schneider-ups-types",
      "redundancy-aws-dr-strategy",
      "redundancy-aws-dr-operations"
    ],
    "contentHash": "5fda1f680e83cbb3057e1f0ac9a3f4ea68175865759b9a6fc216803e9091e7aa",
    "sourceKind": "compact-spec"
  },
  {
    "id": "green-it-pue-lebenszyklus-refurbishing",
    "slug": "green-it-pue-lebenszyklus-refurbishing",
    "title": "Green IT: PUE und Beschaffung über den Lebenszyklus",
    "description": "RZ-Energiekennzahl rechnen und eine Geräteentscheidung mit Betrieb, Zweitnutzung und Eignung begründen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__10",
    "week": "KW 35",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "pue",
      "beschaffung"
    ],
    "sources": [
      "green-doe-datacenter-guide",
      "green-uba-refurbished-ict",
      "green-jrc-gpp-ict"
    ],
    "contentHash": "55ed43493beaef5b89226b1be9bcb1feac09035da81d6d5a060c614bcd061541",
    "sourceKind": "compact-spec"
  },
  {
    "id": "windows-server-core-cal-open-source-lizenzen",
    "slug": "windows-server-core-cal-open-source-lizenzen",
    "title": "Lizenzen planen: Cores, CALs und Open Source",
    "description": "Windows-Server-2025-Kernlizenzen und Zugriffsrechte im Fall trennen und Open-Source-Pflichten differenziert prüfen.",
    "domain": "GA1",
    "groupId": "ga1-1",
    "groupLabel": "Server-, Client- und Hardwarekonzeption",
    "itemId": "ga1-1__11",
    "week": "KW 35",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "cores",
      "zugriff",
      "offen"
    ],
    "sources": [
      "license-microsoft-ws2025",
      "license-osi-faq",
      "license-osi-mit",
      "license-gnu-gpl3"
    ],
    "contentHash": "93447810ff5d04511f2007c3547993fd8096432f22969cc755b775f4f2c00ca5",
    "sourceKind": "compact-spec"
  },
  {
    "id": "hypervisor-typ-eins-zwei-einsatzentscheidung",
    "slug": "hypervisor-typ-eins-zwei-einsatzentscheidung",
    "title": "Hypervisor Typ 1 oder Typ 2?",
    "description": "Die Schichten bis zur Hardware zeichnen, Hyper-V richtig einordnen und für Labor oder Serverbetrieb begründet entscheiden.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__0",
    "week": "KW 36",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "architektur",
      "entscheidung"
    ],
    "sources": [
      "hypervisor-oracle-virtualbox-hosted",
      "hypervisor-microsoft-architecture",
      "hypervisor-vmware-esxi-target"
    ],
    "contentHash": "d84cfea0aeebb4c0d84d519bffe1c0c51715f910b36429cce1bfb9865cfd4751",
    "sourceKind": "compact-spec"
  },
  {
    "id": "container-vs-vm-isolation-ressourcen-einsatz",
    "slug": "container-vs-vm-isolation-ressourcen-einsatz",
    "title": "Container oder VM? Die Grenze liegt beim Kernel",
    "description": "Isolation, Ressourcen und Startverhalten ohne Pauschalurteil vergleichen und drei Einsatzfälle begründet lösen.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__1",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "grenze",
      "einsatz"
    ],
    "sources": [
      "container-microsoft-vs-vm",
      "container-docker-concepts",
      "container-microsoft-isolation"
    ],
    "contentHash": "321a09b22d2020fd5ee79296cd346d1345514584631f32ab0bc05c7cae82180d",
    "sourceKind": "compact-spec"
  },
  {
    "id": "vorteile-nachteile-virtualisierung-konsolidierung-snapshots-isolation",
    "slug": "vorteile-nachteile-virtualisierung-konsolidierung-snapshots-isolation",
    "title": "Virtualisierung abwägen: vier VMs, ein Host",
    "description": "Konsolidierung, Prüfpunkte und Isolation nutzen, ohne Hostausfall, Ressourcenbedarf oder Lizenzen zu übersehen.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__2",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "konsolidierung",
      "entscheidung"
    ],
    "sources": [
      "virt-ms-checkpoints",
      "virt-ms-host-requirements",
      "virt-ms-dc-host-failure",
      "virt-nist-hypervisor-security",
      "license-microsoft-ws2025"
    ],
    "contentHash": "107aa02f42cbf5dd13d7f8c645a74769016828bc471ea7025cd6c623317d90c0",
    "sourceKind": "compact-spec"
  },
  {
    "id": "overcommitment-cpu-ram-ballooning-thin-thick",
    "slug": "overcommitment-cpu-ram-ballooning-thin-thick",
    "title": "Mehr versprochen als vorhanden? CPU, RAM und Speicher",
    "description": "Overcommitment, Ballooning und Thin/Thick Provisioning an drei Kapazitätsbudgets unterscheiden und sicher beurteilen.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__3",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "cpu-ram",
      "disk"
    ],
    "sources": [
      "overcommit-redhat-rhel9",
      "overcommit-microsoft-dynamic-memory",
      "overcommit-broadcom-disk-types"
    ],
    "contentHash": "b6e8ddb9b86bc8526bf1961e9be6c11cf57f09f8c52787f44ffbc789edd0cfa6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "live-migration-voraussetzungen-wartung-shared-nothing",
    "slug": "live-migration-voraussetzungen-wartung-shared-nothing",
    "title": "Live-Migration: Wartung ohne VM-Neustart planen",
    "description": "Hosts, CPU, Netz und Storage-Muster prüfen; geplanten Umzug von automatischem Failover unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__4",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "voraussetzungen",
      "wartung"
    ],
    "sources": [
      "migration-ms-overview",
      "migration-ms-with-storage",
      "migration-ms-cpu-compat",
      "migration-ms-network"
    ],
    "contentHash": "4587262f32ca9b28c1888ebaff78643807b76d0d36650cb37e2030b2403c93ab",
    "sourceKind": "compact-spec"
  },
  {
    "id": "cluster-arten-failover-load-balancing-aktiv-aktiv-passiv",
    "slug": "cluster-arten-failover-load-balancing-aktiv-aktiv-passiv",
    "title": "Cluster wählen: verteilen oder übernehmen?",
    "description": "Failover, Load Balancing und Aktiv-Aktiv/Aktiv-Passiv anhand von Ausfällen und Restkapazität unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__5",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "muster",
      "kapazitaet"
    ],
    "sources": [
      "cluster-ms-failover-overview",
      "cluster-aws-elb-routing",
      "cluster-ms-fault-domains"
    ],
    "contentHash": "68303583d9199665f163137017889de11e88fe747b7000f855c29b96e9484819",
    "sourceKind": "compact-spec"
  },
  {
    "id": "quorum-split-brain-fencing-witness-tiebreaker",
    "slug": "quorum-split-brain-fencing-witness-tiebreaker",
    "title": "Wer darf weiterschreiben? Quorum und Fencing",
    "description": "Netztrennung im Zwei-Knoten-Cluster sicher entscheiden: Stimmenmehrheit, Witness und Ausschluss des alten Schreibers.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__6",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "abstimmung",
      "schutz"
    ],
    "sources": [
      "quorum-ms-witness",
      "quorum-redhat-overview",
      "quorum-redhat-device"
    ],
    "contentHash": "97f7b7df8e9a64061e58c97844df1865356cc55af46a4c22a3dfc9238e439482",
    "sourceKind": "compact-spec"
  },
  {
    "id": "snapshot-ist-kein-backup",
    "slug": "snapshot-ist-kein-backup",
    "title": "Snapshot ist kein Backup – den Ausfall mitdenken",
    "description": "Rücksprungpunkt und unabhängige Sicherung anhand von Patchfehler, Speicherdefekt und Restore-Test sauber abgrenzen.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__7",
    "week": "KW 36",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "abgrenzung",
      "entscheidung"
    ],
    "sources": [
      "snapshot-ms-checkpoints",
      "snapshot-vmware-overview",
      "snapshot-ms-troubleshooting"
    ],
    "contentHash": "75f9019d038fc714ef22a42dae0444fc2cd6eeaf15b6984c9b45d80df275308c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "verfuegbarkeit-ausfallzeit-jahr-monat",
    "slug": "verfuegbarkeit-ausfallzeit-jahr-monat",
    "title": "99,9 % klingt viel – wie lange darf es ausfallen?",
    "description": "Verfügbarkeitsziele in Ausfallminuten pro Jahr und 30-Tage-Monat umrechnen und die Messperiode sauber benennen.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__8",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rechnen",
      "einordnen"
    ],
    "sources": [
      "availability-google-table",
      "availability-google-risk"
    ],
    "contentHash": "d451c724de7793cefc4b835ce5170b1b4d4f4c9cb895634e43bbc322df85feb1",
    "sourceKind": "compact-spec"
  },
  {
    "id": "mtbf-mttr-verfuegbarkeit",
    "slug": "mtbf-mttr-verfuegbarkeit",
    "title": "MTBF und MTTR: seltener ausfallen, schneller zurück sein",
    "description": "Aus Betriebs- und Ausfallzeit Kennzahlen berechnen und mit der Verfügbarkeitsformel Entscheidungen begründen.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__9",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kennzahlen",
      "verfuegbarkeit"
    ],
    "sources": [
      "mtbf-aws-availability",
      "mtbf-ibm-metrics"
    ],
    "contentHash": "5e3ff7da6f2315be4831e87d384155f5e35844801e9b8352be66f7c407a1338c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "reihen-und-parallelschaltung-verfuegbarkeit",
    "slug": "reihen-und-parallelschaltung-verfuegbarkeit",
    "title": "Reihe oder parallel? Verfügbarkeit der Dienstkette",
    "description": "Harte Abhängigkeiten und unabhängige Redundanz unterscheiden, Gesamtverfügbarkeit berechnen und gemeinsame Ausfälle erkennen.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__10",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rechnen",
      "grenzen"
    ],
    "sources": [
      "availability-aws-reliability-pillar",
      "availability-aws-dependencies",
      "availability-aws-redundancy"
    ],
    "contentHash": "f2ba08b20bbd20ed4b2006af2e5cdc72820a48558387bfa4274d209bd78fd856",
    "sourceKind": "compact-spec"
  },
  {
    "id": "sla-servicezeiten-reaktion-wiederherstellung",
    "slug": "sla-servicezeiten-reaktion-wiederherstellung",
    "title": "SLA lesen: Antwort ist noch keine Lösung",
    "description": "Reaktions- und Wiederherstellungszeit, Servicefenster, Messdefinitionen und vertragliche Folgen an einem Störfall unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__11",
    "week": "KW 36",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zeiten",
      "vertrag"
    ],
    "sources": [
      "sla-ms-overview",
      "sla-ibm-business-hours",
      "sla-aws-ec2"
    ],
    "contentHash": "e7f49b8958aba153d1b18c14f7b41fe254c8cad4345a2129a3ecf6f78a8ce309",
    "sourceKind": "compact-spec"
  },
  {
    "id": "kubernetes-pod-deployment-service",
    "slug": "kubernetes-pod-deployment-service",
    "title": "Kubernetes: Wer startet Pods, wer findet sie?",
    "description": "Pod, Deployment, Service und Replikate an einem Ausfall verstehen, ohne Erreichbarkeit mit Datensicherung zu verwechseln.",
    "domain": "GA1",
    "groupId": "ga1-2",
    "groupLabel": "Virtualisierung, Cluster und Verfügbarkeit",
    "itemId": "ga1-2__12",
    "week": "KW 36",
    "estimatedMinutes": 28,
    "relevance": "mittel",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rollen",
      "ausfall"
    ],
    "sources": [
      "k8s-pods",
      "k8s-deployments",
      "k8s-services"
    ],
    "contentHash": "1391719076ffd343eaaf2dc794369b7feb1a34aa1836293f31888beaa29ab1a1",
    "sourceKind": "compact-spec"
  },
  {
    "id": "storage-types",
    "slug": "storage-types",
    "title": "DAS, NAS und SAN sicher unterscheiden",
    "description": "Datei- und Blockspeicher einordnen, Protokolle zuordnen und eine Speicherarchitektur für ein Szenario begründet auswählen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Block 3 · Speicherlösungen",
    "itemId": "ga1-3__0",
    "week": "KW 37",
    "estimatedMinutes": 18,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "access-level",
      "architecture-selection"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "itlf6-9-2022"
    ],
    "contentHash": "5dfdf32eb1fed8b53580627a3b729dbffe93c09c823f8f6579da91aa86337dfa",
    "sourceKind": "legacy-markdown"
  },
  {
    "id": "auswahlentscheidung-nas-vs-san-einem-szenario-begrunden",
    "slug": "auswahlentscheidung-nas-vs-san-einem-szenario-begrunden",
    "title": "NAS oder SAN: eine Auswahl begründen",
    "description": "Aus Zugriff, Arbeitslast und Betrieb eine Speicherentscheidung ableiten, statt NAS und SAN pauschal nach Geschwindigkeit zu sortieren.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__1",
    "week": "KW 37",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "auswahl",
      "begruendung"
    ],
    "sources": [
      "storage-access-model",
      "storage-windows-cases",
      "ihk-bonn",
      "itlf6-9-2022"
    ],
    "contentHash": "75e87bc2a774642f4a362fbfa77b7fe6081347a569adffc6a7291c1add288c85",
    "sourceKind": "compact-spec"
  },
  {
    "id": "objektspeicher-s3-kompatibel-buckets-keys-versionierung-object-lock",
    "slug": "objektspeicher-s3-kompatibel-buckets-keys-versionierung-object-lock",
    "title": "Objektspeicher: Versionen verstehen und schützen",
    "description": "Buckets, Keys und Versionen unterscheiden und ein Backup-Ziel mit Löschschutz begründet auswählen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__2",
    "week": "KW 37",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "versionen",
      "schutz"
    ],
    "sources": [
      "s3-overview",
      "s3-versioning",
      "s3-object-lock"
    ],
    "contentHash": "33fb1154dda638ef8942b4d362a76e1710a41c56c97b6816d4248d9da3c3167b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "raid-level",
    "slug": "raid",
    "title": "RAID-Level sicher auswählen und berechnen",
    "description": "RAID-Level vergleichen, Nutzkapazität berechnen und eine begründete Auswahl für AP2-Aufgaben treffen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Block 3 · Speicherlösungen",
    "itemId": "ga1-3__3",
    "week": "KW 37",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "capacity",
      "selection"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "itlf6-9-2022",
      "it-basiswissen-2012"
    ],
    "contentHash": "cb8348c9c5a9cc0223dba0c9a071870165745da6c850bf2c5156d9df32789a4e",
    "sourceKind": "legacy-markdown"
  },
  {
    "id": "write-penalty-raid-level-auswirkung-auf-iops",
    "slug": "write-penalty-raid-level-auswirkung-auf-iops",
    "title": "RAID Write Penalty: IOPS richtig einordnen",
    "description": "Physische I/O-Arbeit aus Lese- und Schreiblast ableiten und die Grenzen des vereinfachten RAID-Modells erkennen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__4",
    "week": "KW 37",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rechnen",
      "grenzen"
    ],
    "sources": [
      "dell-raid-penalty"
    ],
    "contentHash": "37e24d4f091981a73bf3c021d6acbf1428562aded40debd12bf835d272074e2f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "raid-operations",
    "slug": "raid-operations",
    "title": "Hardware- und Software-RAID betriebssicher planen",
    "description": "RAID-Implementierungen vergleichen, Hot Spare und Hot Swap trennen und einen sicheren Wiederherstellungsablauf begründen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Block 3 · Speicherlösungen",
    "itemId": "ga1-3__5",
    "week": "KW 37",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "architecture",
      "recovery"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "itlf6-9-2022"
    ],
    "contentHash": "6964d7172518d6cac08e4c25744586b951e678116d65c08fa54c1628eb898849",
    "sourceKind": "legacy-markdown"
  },
  {
    "id": "storage-media",
    "slug": "ssd-vs-hdd-vs-nvme-iops-latenz",
    "title": "SSD, HDD und NVMe passend auswählen",
    "description": "Speicher anhand von Zugriffsmuster, Latenz, IOPS, Kapazität und Endurance vergleichen und eine belastbare Auswahl treffen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Block 3 · Speicherlösungen",
    "itemId": "ga1-3__6",
    "week": "KW 37",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "media-selection",
      "endurance-planning"
    ],
    "sources": [
      "ihk-bonn",
      "itlf6-9-2022",
      "itlf10-12-2023"
    ],
    "contentHash": "c558d53975f2b4b8ddf02e6d91089951713b32d2a3ecb1ed9df5f4e7d5e8e5f6",
    "sourceKind": "legacy-markdown"
  },
  {
    "id": "dateisysteme-ntfs-refs-ext4-xfs-zfs-btrfs",
    "slug": "dateisysteme-ntfs-refs-ext4-xfs-zfs-btrfs",
    "title": "Dateisysteme: passend auswählen und Daten schützen",
    "description": "NTFS, ReFS, ext4, XFS, ZFS und Btrfs einordnen; Journal, Prüfsumme, Snapshot und Quota unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__7",
    "week": "KW 37",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "auswahl",
      "schutz"
    ],
    "sources": [
      "fs-refs",
      "fs-ext4",
      "fs-xfs",
      "fs-btrfs",
      "fs-zfs-concepts",
      "fs-zfs-scrub",
      "fs-ntfs-quota"
    ],
    "contentHash": "0031ba903092f8b07a6747fc23853608cde12a8b74da2847b4c4bec39fbe0fa6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "lvm-volumes-partitionierung-online-erweiterung-volume-groups",
    "slug": "lvm-volumes-partitionierung-online-erweiterung-volume-groups",
    "title": "LVM: Speicher verteilen und sicher erweitern",
    "description": "Physical Volume, Volume Group und Logical Volume unterscheiden; Kapazität planen und Dateisysteme auf der richtigen Ebene erweitern.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__8",
    "week": "KW 37",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kapazitaet",
      "ebenen"
    ],
    "sources": [
      "lvm-vg",
      "lvm-lv",
      "lvm-ext4-grow",
      "lvm-xfs-grow"
    ],
    "contentHash": "22fe291d02dcd2e6fbf09d8bfde2dd6318821feefd470a16edbb914e4ee780d0",
    "sourceKind": "compact-spec"
  },
  {
    "id": "deduplizierung-komprimierung-thin-provisioning-nutzen-risiken",
    "slug": "deduplizierung-komprimierung-thin-provisioning-nutzen-risiken",
    "title": "Speicher sparen: Deduplizierung, Komprimierung und Thin Provisioning",
    "description": "Drei unterschiedliche Verfahren auseinanderhalten, Einsparungen berechnen und Überbelegung rechtzeitig erkennen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__9",
    "week": "KW 37",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "einsparung",
      "risiko"
    ],
    "sources": [
      "storage-dedupe",
      "storage-compression",
      "lvm-lv"
    ],
    "contentHash": "ea22066d5ab1a5d7b94b4d17bfd4044f07734db2c2bfda30349e2446ea4343e0",
    "sourceKind": "compact-spec"
  },
  {
    "id": "software-defined-storage-verteilte-systeme-replikation-vs-erasure",
    "slug": "software-defined-storage-verteilte-systeme-replikation-vs-erasure",
    "title": "Verteilte Speicher: Kopien, Erasure Coding und Ausfallbereiche",
    "description": "Speicherbedarf und Ausfalltoleranz gemeinsam beurteilen, statt die Anzahl der Server mit Sicherheit gleichzusetzen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__10",
    "week": "KW 37",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kapazitaet",
      "ausfall"
    ],
    "sources": [
      "sds-ceph-ec",
      "sds-ceph-arch"
    ],
    "contentHash": "3fcc47efdbb0bffcfc77e8d124130016d95720387729e2dd3562973086dc0dcb",
    "sourceKind": "compact-spec"
  },
  {
    "id": "kapazitatsplanung-wachstum-reservekapazitat-bruttokapazitat-vs-nutzkapaz",
    "slug": "kapazitatsplanung-wachstum-reservekapazitat-bruttokapazitat-vs-nutzkapaz",
    "title": "Kapazitätsplanung: Wachstum, Reserve und TB/TiB",
    "description": "Vom Datenbestand zur begründeten Speicherkapazität rechnen, ohne Einheiten und Reserve zu vermischen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__11",
    "week": "KW 37",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kapazitaet",
      "einheiten"
    ],
    "sources": [
      "capacity-nist-binary",
      "capacity-ceph-reserve"
    ],
    "contentHash": "81a0f4238d15063fd4f36589f2496d85677512d20f8d843583f27883ea146966",
    "sourceKind": "compact-spec"
  },
  {
    "id": "archivierung-revisionssichere-ablage-aufbewahrungsfristen-hsm",
    "slug": "archivierung-revisionssichere-ablage-aufbewahrungsfristen-hsm",
    "title": "Archivierung: nachvollziehbar aufbewahren und wiederfinden",
    "description": "Archiv, Backup und HSM unterscheiden, Fristen sauber einordnen und einen Archivierungsprozess auf Lücken prüfen.",
    "domain": "GA1",
    "groupId": "ga1-3",
    "groupLabel": "Speicherlösungen",
    "itemId": "ga1-3__12",
    "week": "KW 37",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "verfahren",
      "hsm"
    ],
    "sources": [
      "archive-ao147",
      "archive-gobd",
      "archive-hsm"
    ],
    "contentHash": "4e9773f879b7a6716d2c74af6889a11df5035eb961473765daf1d0e662c5db4b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "backup-methods",
    "slug": "backup-methods",
    "title": "Sicherungsarten auswählen und Restore-Ketten beherrschen",
    "description": "Voll-, differenzielle und inkrementelle Sicherungen vergleichen, Speicherbedarf berechnen und die passende Restore-Kette bestimmen.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Block 4 · Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__0",
    "week": "KW 38",
    "estimatedMinutes": 31,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "backup-selection",
      "restore-chain"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "itlf10-12-2023"
    ],
    "contentHash": "93b5122ef1212e1e6c0846c4e2261ba391fedcc4651f76b3041a50c0767e773f",
    "sourceKind": "legacy-markdown"
  },
  {
    "id": "szenario-passende-kombination-wahlen-begrunden",
    "slug": "szenario-passende-kombination-wahlen-begrunden",
    "title": "Backup-Verfahren im Szenario begründet auswählen",
    "description": "Sicherungsfenster, Restore-Kette und Wiederanlaufziel gemeinsam prüfen statt pauschal ein Verfahren zu bevorzugen.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__1",
    "week": "KW 38",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "auswahl",
      "grenzen"
    ],
    "sources": [
      "backup-choice-ibm"
    ],
    "contentHash": "9a7f39bcfe91754a10439f6f951b66d00e5903983ff562d308916fb32b688283",
    "sourceKind": "compact-spec"
  },
  {
    "id": "generationenprinzip-grossvater-vater-sohn-medienrotation-benotigte-medie",
    "slug": "generationenprinzip-grossvater-vater-sohn-medienrotation-benotigte-medie",
    "title": "Generationenprinzip: Medienrotation richtig zählen",
    "description": "Aufbewahrungsstufen planen und Medienbedarf aus klaren Regeln ableiten.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__2",
    "week": "KW 38",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zaehlen",
      "rotation"
    ],
    "sources": [
      "gfs-veeam-tape",
      "gfs-veeam-retention"
    ],
    "contentHash": "ebbe2dcf8f4365d9affd0bfeb3ca02a781e83c7853603a78e9dc1b96a2297671",
    "sourceKind": "compact-spec"
  },
  {
    "id": "backup-3-2-1-1-0-offsite-airgap-immutable",
    "slug": "backup-3-2-1-1-0-offsite-airgap-immutable",
    "title": "3-2-1-1-0: Kopien gegen denselben Angriff trennen",
    "description": "Backup-Kopien, Offsite-Lagerung, Air Gap, Unveränderbarkeit und Restore-Prüfung an einem Ransomware-Fall planen.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__3",
    "week": "KW 38",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kopien",
      "angriff"
    ],
    "sources": [
      "backup-cisa-ransomware-guide",
      "backup-veeam-32110",
      "backup-acsc-321"
    ],
    "contentHash": "9a0a5bb3ad380167f6dedbda50e51736bf04fbf3b172b9d2033117127808d2f5",
    "sourceKind": "compact-spec"
  },
  {
    "id": "rto-rpo-definition-abgrenzung-zuordnung-anforderungen",
    "slug": "rto-rpo-definition-abgrenzung-zuordnung-anforderungen",
    "title": "RTO und RPO: Ausfallzeit und Datenstand getrennt planen",
    "description": "Wiederanlaufziele in messbare Anforderungen übersetzen und mit einem Ausfallprotokoll vergleichen.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__4",
    "week": "KW 38",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-18.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zuordnen",
      "pruefen"
    ],
    "sources": [
      "recovery-nist-rto",
      "recovery-nist-rpo"
    ],
    "contentHash": "fbd9c82e17488dcce3188fdd6f27f08e32a2b615c93e2395c2ab2650199e8003",
    "sourceKind": "compact-spec"
  },
  {
    "id": "backup-window",
    "slug": "backup-window",
    "title": "Backup-Fenster mit Datenrate und Engpass berechnen",
    "description": "Datenmenge und Übertragungsrate sicher umrechnen, den realen Engpass erkennen und beurteilen, ob eine Sicherung in das verfügbare Zeitfenster passt.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Block 4 · Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__5",
    "week": "KW 38",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rate-conversion",
      "window-decision"
    ],
    "sources": [
      "ihk-bonn",
      "europa-integratoren-2026"
    ],
    "contentHash": "f42a7b7eef9af015f3626a57bef0a01faa620ac2ea1a1e6c7b55d38f37711a4d",
    "sourceKind": "legacy-markdown"
  },
  {
    "id": "backup-ziele-lto-d2d2t-cloud",
    "slug": "backup-ziele-lto-d2d2t-cloud",
    "title": "Backup-Ziele wählen: Disk, Band und Cloud",
    "description": "LTO-Kapazität ohne Werbefaktor planen, D2D2T verstehen und Backup-Server sowie Cloud-Kopie in einem Restore-Pfad verorten.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__6",
    "week": "KW 38",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kapazitaet",
      "architektur"
    ],
    "sources": [
      "lto-ibm-capacity",
      "d2d2t-veeam-tape",
      "cloud-aws-backup-copy",
      "backup-ms-dpm-recovery"
    ],
    "contentHash": "2a97dd09f1948f5efa0cea14765f96da15ea3f0556364bfba372de4a29ed7554",
    "sourceKind": "compact-spec"
  },
  {
    "id": "restore-test-wiederanlauf-notfallhandbuch",
    "slug": "restore-test-wiederanlauf-notfallhandbuch",
    "title": "Restore beweisen: vom Backup zum Notbetrieb",
    "description": "Restore-Test, Wiederanlaufplan und Notfallhandbuch an einem Ausfall eines Bestellsystems mit BSI-BCM-Begriffen unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__7",
    "week": "KW 38",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "nachweis",
      "plan"
    ],
    "sources": [
      "bsi-200-4-bcm",
      "bsi-200-4-glossar",
      "bsi-der4-notfall",
      "ms-backup-recovery-test"
    ],
    "contentHash": "125e1e16b6d05a889d484da8cf792d89ab03ec2fa52752b51ef175d800e4c6fc",
    "sourceKind": "compact-spec"
  },
  {
    "id": "backup-replikation-spiegelung-archivierung",
    "slug": "backup-replikation-spiegelung-archivierung",
    "title": "Vier Kopien, vier verschiedene Aufgaben",
    "description": "Backup, Replikation, Spiegelung und Archivierung anhand von Ausfall, Fehlbedienung und Aufbewahrung unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__8",
    "week": "KW 38",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "abgrenzen",
      "kombinieren"
    ],
    "sources": [
      "ms-redundancy-replication-backup",
      "ms-storage-spaces-mirror",
      "aws-s3-replication-deletes",
      "aws-data-archiving"
    ],
    "contentHash": "15de4e7a9d147fb213190dc45df695245f36169b0ab3a8e5d38a4ed2e359200f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "backup-konzept-planen-pruefen-testen",
    "slug": "backup-konzept-planen-pruefen-testen",
    "title": "Ein Backup-Konzept, das den Ernstfall besteht",
    "description": "Für einen fiktiven Betrieb Umfang, Takt, Ziel, Aufbewahrung, Zuständigkeit und Restore-Prüfung in einem schriftlichen Plan verbinden.",
    "domain": "GA1",
    "groupId": "ga1-4",
    "groupLabel": "Backup, Recovery und Notfallvorsorge",
    "itemId": "ga1-4__9",
    "week": "KW 38",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "anforderungen",
      "konzept"
    ],
    "sources": [
      "bsi-con3-backup-concept",
      "ms-backup-recovery-test",
      "ms-redundancy-replication-backup"
    ],
    "contentHash": "265a6f26b80f4275b42c513557dda96b253cc2244f9d362a244a576756cecb7c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "iaas-paas-saas-verantwortung",
    "slug": "iaas-paas-saas-verantwortung",
    "title": "Cloud-Modelle: Wer betreibt welche Schicht?",
    "description": "IaaS, PaaS und SaaS anhand von Hardware, Gast-OS, Runtime, Anwendung und Daten zuordnen – mit Shared-Responsibility-Fallstricken.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__0",
    "week": "KW 39",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "schichten",
      "transfer"
    ],
    "sources": [
      "cloud-nist-sp800145",
      "cloud-ms-shared-responsibility",
      "cloud-ncsc-shared-responsibility"
    ],
    "contentHash": "fc29ac083aee7bd480cec0534553a095864e8ab44b49a5a25bd8405ca396ba0f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "cloud-bereitstellungsmodelle",
    "slug": "cloud-bereitstellungsmodelle",
    "title": "Wo läuft die Cloud – und für wen?",
    "description": "Public, Private, Community, Hybrid und Multi-Cloud sicher auseinanderhalten; On-Premises als Standort, nicht automatisch als Cloud-Modell, einordnen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__1",
    "week": "KW 39",
    "estimatedMinutes": 29,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zuordnen",
      "kombination"
    ],
    "sources": [
      "cloud-nist-sp800145",
      "cloud-ncsc-deployment-models"
    ],
    "contentHash": "fbda66ed3c1643005b47156e5070db6ab7539d8b6ddbb8b703abc1082e4a5d32",
    "sourceKind": "compact-spec"
  },
  {
    "id": "cloud-vorteile-nachteile-entscheiden",
    "slug": "cloud-vorteile-nachteile-entscheiden",
    "title": "Cloud oder eigener Betrieb? Sechs Hebel statt Bauchgefühl",
    "description": "CapEx/OpEx, Elastizität, Lock-in, Datenschutz, Latenz und Betriebsaufwand anhand eines konkreten Falls gegeneinander abwägen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__2",
    "week": "KW 39",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "hebel",
      "fall"
    ],
    "sources": [
      "cloud-nist-sp800145",
      "cloud-ms-cost-efficiency",
      "cloud-ncsc-shared-responsibility",
      "cloud-edpb-controller-processor",
      "cloud-aws-portability",
      "cloud-ms-hybrid-latency"
    ],
    "contentHash": "cfd5b9a011429f6afe6b107c75b92d0270466eec2b42f6643b77214fa76c7472",
    "sourceKind": "compact-spec"
  },
  {
    "id": "skalierung-elastizitaet-autoscaling-load-balancer",
    "slug": "skalierung-elastizitaet-autoscaling-load-balancer",
    "title": "Skalieren, ohne den Engpass zu verschieben",
    "description": "Vertikale und horizontale Skalierung, Elastizität, Autoscaling und Load Balancing an einer Ticketplattform sicher unterscheiden und zusammendenken.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__3",
    "week": "KW 39",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "skalierungsart",
      "regelkreis"
    ],
    "sources": [
      "cloud-ms-autoscale-overview",
      "cloud-ms-lb-health",
      "cloud-aws-autoscaling-lb"
    ],
    "contentHash": "cb54815479b8aabb036e7270ff3fac7303152fecf63a499df0a6bf12d8c42381",
    "sourceKind": "compact-spec"
  },
  {
    "id": "load-balancer-algorithmen-auswaehlen",
    "slug": "load-balancer-algorithmen-auswaehlen",
    "title": "Wohin mit der nächsten Anfrage?",
    "description": "Round Robin, Least Connections und IP-Hashing anhand kurzer Anfragen, langer Verbindungen und Sitzungstreue auswählen und Grenzen erklären.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__4",
    "week": "KW 39",
    "estimatedMinutes": 29,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "verfahren",
      "wahl"
    ],
    "sources": [
      "nginx-http-load-balancing",
      "nginx-session-persistence-limits",
      "cloud-ms-lb-health"
    ],
    "contentHash": "5015af07e75e84e4c774f80a9cb860ad6d8d48c28ae2dee4959ee8b1e32048fc",
    "sourceKind": "compact-spec"
  },
  {
    "id": "cloud-dsgvo-avv-transfer-tom",
    "slug": "cloud-dsgvo-avv-transfer-tom",
    "title": "Cloud und DSGVO: vier Prüfspuren",
    "description": "Auftragsverarbeitung, Datenorte, mögliche Drittlandübermittlung und technische sowie organisatorische Maßnahmen an einem Cloud-CRM unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__5",
    "week": "KW 39",
    "estimatedMinutes": 31,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rollen-avv",
      "datenwege-tom"
    ],
    "sources": [
      "gdpr-eurlex-2016-679",
      "cloud-edpb-controller-processor",
      "edpb-international-transfers",
      "edpb-secure-personal-data"
    ],
    "contentHash": "c0ad1637a8f95f1794f2b3f1fa339d1908261fd35749553cd9193591e31f96f6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "cloud-migrationsstrategien-einordnen",
    "slug": "cloud-migrationsstrategien-einordnen",
    "title": "Cloud-Migration: Rehost, Replatform oder Refactor?",
    "description": "Drei Migrationsstrategien am selben Anwendungssystem unterscheiden, auswählen und ihre Grenzen begründen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__6",
    "week": "KW 39",
    "estimatedMinutes": 29,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "strategien-unterscheiden",
      "strategie-begruenden"
    ],
    "sources": [
      "aws-migration-strategies-7r",
      "ms-cloud-modernization-strategies"
    ],
    "contentHash": "58cc11aef5175b2754b89ceb31d15d0eddc79f729921366827eb3c1c594d2aa1",
    "sourceKind": "compact-spec"
  },
  {
    "id": "blue-green-deployment-traffic-switch",
    "slug": "blue-green-deployment-traffic-switch",
    "title": "Blue-Green Deployment: Verkehr sicher umschalten",
    "description": "Zwei parallele Anwendungsumgebungen am Schaubild erklären, testen, umschalten und einen begrenzten Rollback begründen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__7",
    "week": "KW 39",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "verkehrsweg-erklaeren",
      "release-absichern"
    ],
    "sources": [
      "aws-blue-green-whitepaper",
      "ms-blue-green-deployment"
    ],
    "contentHash": "b5cc3ba76c924aeb0aa6cde9ddd6d42dd1201453a12faf37f61a5dac5d99f6e9",
    "sourceKind": "compact-spec"
  },
  {
    "id": "tco-vierjahresrechnung-kostenarten",
    "slug": "tco-vierjahresrechnung-kostenarten",
    "title": "TCO über vier Jahre sauber aufstellen",
    "description": "Einmalige und laufende IT-Kosten abgrenzen, eine Vierjahresrechnung aufstellen und Annahmen prüfen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__8",
    "week": "KW 39",
    "estimatedMinutes": 34,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kostenarten-trennen",
      "tco-berechnen"
    ],
    "sources": [
      "itlf10-12-2023",
      "aws-it-tco-cost-components",
      "ibm-total-cost-ownership"
    ],
    "contentHash": "f9af6db90edd90adc29952463a0b8115c2984456f467394d4ba7d8142ff77848",
    "sourceKind": "compact-spec"
  },
  {
    "id": "break-even-cloud-onprem-kostenvergleich",
    "slug": "break-even-cloud-onprem-kostenvergleich",
    "title": "Cloud oder eigener Server: Kosten-Break-even",
    "description": "Zwei kumulierte Kostenfunktionen aufstellen, ihren Schnittpunkt berechnen und die Aussagegrenzen erklären.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__9",
    "week": "KW 39",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kostenfunktionen-aufstellen",
      "schnittpunkt-deuten"
    ],
    "sources": [
      "aws-cloud-onprem-comparison-model",
      "aws-it-tco-cost-components",
      "ibm-total-cost-ownership"
    ],
    "contentHash": "4117eab1ba7ca82751b9557cbbeee6aea940838f5fc531b99f72e4151ea5e70d",
    "sourceKind": "compact-spec"
  },
  {
    "id": "amortisation-roi-kostenvergleich-it-investition",
    "slug": "amortisation-roi-kostenvergleich-it-investition",
    "title": "IT-Investition: Kosten, Amortisation und ROI",
    "description": "Drei Kennzahlen am selben IT-Fall getrennt berechnen, deuten und ihre Grenzen erklären.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__10",
    "week": "KW 39",
    "estimatedMinutes": 36,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kosten-und-amortisation-rechnen",
      "roi-einordnen"
    ],
    "sources": [
      "itlf10-12-2023",
      "microsoft-azure-business-case-metrics",
      "aws-directional-business-case"
    ],
    "contentHash": "3cff57415858aeeb42ae2ee65d6ecad608cba214a8691009935e3628e7b67248",
    "sourceKind": "compact-spec"
  },
  {
    "id": "nutzwertanalyse-kriterien-gewichten-entscheiden",
    "slug": "nutzwertanalyse-kriterien-gewichten-entscheiden",
    "title": "Nutzwertanalyse: gewichten und begründen",
    "description": "Eine Bewertungsmatrix für IT-Alternativen aufstellen, Teilnutzen rechnen und das Ergebnis kritisch prüfen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__11",
    "week": "KW 39",
    "estimatedMinutes": 34,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "matrix-rechnen",
      "entscheidung-pruefen"
    ],
    "sources": [
      "ihk-bonn",
      "ihk-regensburg-ideenbewertung-nutzwertanalyse",
      "vmodell-bund-bewertungsmatrix"
    ],
    "contentHash": "1422269a6231438bce8079ebd7ec57c4e150e369a437f42f01136334a617dff3",
    "sourceKind": "compact-spec"
  },
  {
    "id": "angebotsvergleich-rabatt-skonto-bezugspreis",
    "slug": "angebotsvergleich-rabatt-skonto-bezugspreis",
    "title": "Angebote vergleichen: Rabatt, Skonto, Fracht",
    "description": "Netto-Bezugspreise aus zwei IT-Angeboten stufenweise berechnen und Zahlungsbedingungen einordnen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__12",
    "week": "KW 39",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "bezugspreis-rechnen",
      "konditionen-deuten"
    ],
    "sources": [
      "ihk-bonn",
      "ihk-bergische-bezugspreis-beispiel"
    ],
    "contentHash": "9d047cfca418ff5970adb78e78595a3f21b5e7e6eeff604313ddd72f1023e6c6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "make-or-buy-kauf-leasing-miete",
    "slug": "make-or-buy-kauf-leasing-miete",
    "title": "Make-or-Buy und Kauf, Leasing, Miete",
    "description": "Eigenentwicklung und Fertiglösung getrennt von Finanzierungs- und Nutzungsformen vergleichen.",
    "domain": "GA1",
    "groupId": "ga1-5",
    "groupLabel": "Cloud und Wirtschaftlichkeit",
    "itemId": "ga1-5__13",
    "week": "KW 39",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "make-or-buy-abwaegen",
      "nutzungsform-vergleichen"
    ],
    "sources": [
      "europa-integratoren-2026",
      "vmodell-bund-make-or-buy",
      "ihk-koeln-leasing-grundlagen"
    ],
    "contentHash": "89dedfd9cc49721e695cbdbe00e232f08f2832db219a49e0e6ef9d4fbb2ffe11",
    "sourceKind": "compact-spec"
  },
  {
    "id": "windows-server-active-directory-struktur-dns-dc",
    "slug": "windows-server-active-directory-struktur-dns-dc",
    "title": "Windows Server und Active Directory: Struktur, DNS, Redundanz",
    "description": "Rollen und Features einordnen, Forest, Domain, OU und Site unterscheiden und einen DC-Ausfall mit DNS-Abhängigkeit durchdenken.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__0",
    "week": "KW 40",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ad-struktur-unterscheiden",
      "dns-dc-ausfall-pruefen"
    ],
    "sources": [
      "itlf10-12-2023",
      "microsoft-ad-logical-model",
      "microsoft-ad-site-replication",
      "microsoft-dc-locator",
      "microsoft-server-roles-features"
    ],
    "contentHash": "47d85a6f417dfe8fbf73ef255939e98296913b89870fc9e56d0479d4395c161c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "gruppenrichtlinien-lsdou-loopback",
    "slug": "gruppenrichtlinien-lsdou-loopback",
    "title": "Gruppenrichtlinien: LSDOU, Vererbung und Loopback",
    "description": "GPOs verknüpfen, Standardreihenfolge und Ausnahmen auflösen und Benutzerregeln für Spezial-PCs prüfen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__1",
    "week": "KW 40",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "gpo-reihenfolge-aufloesen",
      "gpo-ausnahmen-begruenden"
    ],
    "sources": [
      "itlf10-12-2023",
      "microsoft-group-policy-processing",
      "microsoft-group-policy-scope"
    ],
    "contentHash": "b2870d2dae920cb13d98bf538b0fda5e6e7aa131a253ccf9766686ec6f8b7c36",
    "sourceKind": "compact-spec"
  },
  {
    "id": "patch-updatemanagement-wsus-testring-rollback",
    "slug": "patch-updatemanagement-wsus-testring-rollback",
    "title": "Patchmanagement: WSUS, Testring und Rückfallplan",
    "description": "Updates risikobewusst freigeben, im Wartungsfenster prüfen und eine realistische Rückfallstrategie festlegen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__2",
    "week": "KW 40",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "patch-ringe-planen",
      "wartung-rueckfall-pruefen"
    ],
    "sources": [
      "microsoft-wsus-deprecation",
      "microsoft-wsus-computer-groups",
      "microsoft-wsus-operations"
    ],
    "contentHash": "98757ab558baa3bfaadc259cf7d58746ab69a863623339a8db4a02174db9a030",
    "sourceKind": "compact-spec"
  },
  {
    "id": "clientbereitstellung-images-deployment-mdm",
    "slug": "clientbereitstellung-images-deployment-mdm",
    "title": "Clientbereitstellung: Image, Deployment und MDM",
    "description": "Passende Bereitstellungswege für Schulungs-PCs und mobile Geräte wählen, testen und betreiben.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__3",
    "week": "KW 40",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-26.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "bereitstellungsweg-waehlen",
      "rollout-absichern"
    ],
    "sources": [
      "itlf10-12-2023",
      "microsoft-autopilot-overview",
      "microsoft-configmgr-osd",
      "microsoft-intune-ios-guide"
    ],
    "contentHash": "9a7f360bf5bade46e98e44afeeaad61abb727f908aa25cda908eab7c919bda15",
    "sourceKind": "compact-spec"
  },
  {
    "id": "linux-verzeichnisse-dienste-pakete-logs",
    "slug": "linux-verzeichnisse-dienste-pakete-logs",
    "title": "Linux-Server prüfen: Pfade, Dienste, Pakete und Logs",
    "description": "Eine Dienststörung auf einem Linux-Server systematisch eingrenzen und Änderungen am Paketbestand sicher einordnen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__4",
    "week": "KW 40",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dateipfade-einordnen",
      "dienst-stoerung-analysieren",
      "paket-aenderung-planen"
    ],
    "sources": [
      "itlf10-12-2023",
      "linux-fhs-3",
      "systemd-systemctl-man",
      "systemd-journalctl-man",
      "debian-reference-packages"
    ],
    "contentHash": "6486577e5b4609debacba156f6e9ee803fe57aa69f8da7bf38f5f5c44a46dbe2",
    "sourceKind": "compact-spec"
  },
  {
    "id": "zeitgesteuerte-ausfuehrung-cron-systemd-timer-schtasks",
    "slug": "zeitgesteuerte-ausfuehrung-cron-systemd-timer-schtasks",
    "title": "Zeitgesteuerte Jobs mit Cron, systemd und Windows",
    "description": "Cron-Ausdrücke lesen, systemd-Timer samt Service einordnen und einen täglichen Windows-Auftrag mit schtasks prüfen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__5",
    "week": "KW 40",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "cron-zeitfelder",
      "timer-service",
      "windows-auftrag"
    ],
    "sources": [
      "itlf10-12-2023",
      "debian-crontab-5",
      "debian-systemd-timer-5",
      "debian-systemd-time-7",
      "systemd-systemctl-man",
      "microsoft-schtasks-create",
      "microsoft-schtasks-query"
    ],
    "contentHash": "760319492c169bcb2e6955dd7a11cd3e75eee4081fa7678e462771989affabba",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ssh-schluessel-sudo-root-login",
    "slug": "ssh-schluessel-sudo-root-login",
    "title": "SSH-Zugang absichern: Schlüssel, sudo und Root-Login",
    "description": "Einen individuellen SSH-Zugang ohne Aussperren einführen und Anmeldung von administrativen Rechten trennen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__6",
    "week": "KW 40",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "schluessel-zuordnen",
      "ssh-zugang-umstellen",
      "sudo-begrenzen"
    ],
    "sources": [
      "itlf10-12-2023",
      "openssh-ssh-keygen",
      "openssh-sshd-config",
      "openssh-sshd",
      "ubuntu-openssh-server",
      "debian-sudoers",
      "debian-visudo"
    ],
    "contentHash": "04ce84e6a532ed71d250c4f05c17e53f3a154bd389996754e57becbc27c85483",
    "sourceKind": "compact-spec"
  },
  {
    "id": "linux-befehle-sicher-waehlen",
    "slug": "linux-befehle-sicher-waehlen",
    "title": "Linux-Befehle sicher auswählen und prüfen",
    "description": "Bei einer Dienststörung passende Beobachtungsbefehle wählen, Eingriffe abgrenzen und deren Ergebnis verifizieren.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__7",
    "week": "KW 40",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "diagnosebefehle-waehlen",
      "seiteneffekte-einordnen",
      "aenderung-kontrollieren"
    ],
    "sources": [
      "itlf10-12-2023",
      "gnu-coreutils-man",
      "gnu-grep-man",
      "gnu-findutils-man",
      "procps-ps-man",
      "procps-top-man",
      "iproute2-ss-man",
      "iproute2-ip-man",
      "systemd-systemctl-man",
      "rsync-man",
      "gnu-tar-man",
      "util-linux-kill-man"
    ],
    "contentHash": "4a909cf0e5f16239dee586694b4291388922cbef931a5ae47e4d2a0eba577f21",
    "sourceKind": "compact-spec"
  },
  {
    "id": "prozesse-kontrolliert-beenden",
    "slug": "prozesse-kontrolliert-beenden",
    "title": "Prozesse kontrolliert beenden: Signal, Task und Nachweis",
    "description": "Einen hängenden Prozess eindeutig zuordnen, den schonendsten Stopp wählen und Betrieb sowie Daten danach prüfen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__8",
    "week": "KW 40",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "prozess-eindeutig-zuordnen",
      "stoppwirkung-abwaegen",
      "betrieb-nachweisen"
    ],
    "sources": [
      "util-linux-kill-man",
      "linux-signal-man",
      "procps-ps-man",
      "systemd-systemctl-man",
      "systemd-service-man",
      "microsoft-taskkill",
      "microsoft-tasklist",
      "microsoft-process-id"
    ],
    "contentHash": "cc4d689a63a3176057fbbafe80fb718bb5d24482f29a7107fefe41b12a9852b7",
    "sourceKind": "compact-spec"
  },
  {
    "id": "linux-dateirechte-umask-spezialbits",
    "slug": "linux-dateirechte-umask-spezialbits",
    "title": "Linux-Dateirechte: rwx, umask und Spezialbits",
    "description": "Datei- und Verzeichnisrechte lesen, neue Modi aus der umask ableiten und Spezialbits in einem Admin-Fall sicher einordnen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__9",
    "week": "KW 40",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "datei-verzeichnis-modus",
      "umask-bitweise",
      "spezialbits-sicher"
    ],
    "sources": [
      "itlf10-12-2023",
      "gnu-coreutils-permissions",
      "gnu-coreutils-mode-structure",
      "linux-chmod-man",
      "linux-umask-man",
      "linux-inode-man"
    ],
    "contentHash": "3bfc519b8e51689de07848552f230f9f6fd32b8a1862d5f5e024d129735596e5",
    "sourceKind": "compact-spec"
  },
  {
    "id": "benutzer-gruppenverwaltung-passwortrichtlinien-kontosperrung",
    "slug": "benutzer-gruppenverwaltung-passwortrichtlinien-kontosperrung",
    "title": "Benutzer, Gruppen und Kontozugänge verwalten",
    "description": "Zusatzgruppen ohne Rechteverlust ergänzen, Passwortrichtlinien bewerten und Passwort-, Konto- und PAM-Sperren unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__10",
    "week": "KW 40",
    "estimatedMinutes": 45,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "gruppen-sicher-aendern",
      "passwortregel-bewerten",
      "sperrwirkung-pruefen"
    ],
    "sources": [
      "europa-integratoren-2026",
      "linux-useradd-man",
      "linux-usermod-man",
      "linux-passwd5-man",
      "linux-shadow5-man",
      "linux-passwd1-man",
      "linux-chage-man",
      "linux-faillock-conf-man",
      "linux-pam-faillock-man",
      "nist-sp80063b4-passwords"
    ],
    "contentHash": "4ade1fbb7bab9ba5dbe28935839c97c47b9386d5c18fe80bd6bb657166ef6f7c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "systemhartung-benotigte-dienste-deaktivieren-lokale-firewall-minimale",
    "slug": "systemhartung-benotigte-dienste-deaktivieren-lokale-firewall-minimale",
    "title": "Linux-Server gezielt härten",
    "description": "Nicht benötigte Dienste kontrolliert abschalten, eine lokale Firewall ohne SSH-Selbstsperre planen und Pakete nur nach Abhängigkeitsprüfung minimieren.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__11",
    "week": "KW 40",
    "estimatedMinutes": 45,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dienste-wirksam-deaktivieren",
      "firewall-ohne-selbstsperre",
      "installation-bedarfsorientiert-minimieren"
    ],
    "sources": [
      "itlf6-9-2022",
      "systemd-systemctl-man",
      "iproute2-ss-man",
      "ubuntu-ufw-firewall",
      "ubuntu-unnecessary-packages",
      "debian-apt-get-man"
    ],
    "contentHash": "50901c1e20d9c5590c249ee0ee8495f24f764617a9e9fbca605e5a111a5d506a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "uefi-bios-haertung-secure-boot-tpm-bootreihenfolge-schnittstellen",
    "slug": "uefi-bios-haertung-secure-boot-tpm-bootreihenfolge-schnittstellen",
    "title": "UEFI-Härtung mit sicherem Rückweg",
    "description": "Secure Boot, TPM und BitLocker auseinanderhalten und Firmware-Zugänge, Bootmedien sowie Schnittstellen ohne Verlust des Recovery-Wegs absichern.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__12",
    "week": "KW 40",
    "estimatedMinutes": 45,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "secure-boot-korrekt-pruefen",
      "tpm-bitlocker-trennen",
      "firmware-mit-rueckweg-haerten"
    ],
    "sources": [
      "itlf10-12-2023",
      "uefi-secure-boot-spec",
      "microsoft-surface-uefi-settings",
      "microsoft-bitlocker-overview",
      "microsoft-bitlocker-faq",
      "microsoft-tpm-troubleshooting",
      "microsoft-confirm-secureboot",
      "microsoft-bitlocker-operations"
    ],
    "contentHash": "0fc46cc860582f8f1a15dc3b2b85e93f9b7318056274beb27d73137f36f41d31",
    "sourceKind": "compact-spec"
  },
  {
    "id": "grub-bootloader-bootvorgang-menue-kernel-auswahl-rescue",
    "slug": "grub-bootloader-bootvorgang-menue-kernel-auswahl-rescue",
    "title": "GRUB: Bootweg und sichere Fehlersuche",
    "description": "GRUB zwischen Firmware und Linux-Kernel einordnen, einen vorhandenen Kernel im Menü testen und bei grub rescue erst den Bootpfad lesen, bevor eine plattformgerechte Reparatur erfolgt.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__13",
    "week": "KW 40",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "grub-startkette-erklaeren",
      "grub-rescue-lesend-diagnostizieren",
      "grub-reparaturziel-absichern"
    ],
    "sources": [
      "gnu-grub-manual",
      "gnu-grub-rescue",
      "gnu-grub-install",
      "debian-update-grub",
      "debian-reference-rescue",
      "ubuntu-secure-boot"
    ],
    "contentHash": "e9d7a7e802c95955291eabb7cbcc46621ea757583764ee499148087ef54957b1",
    "sourceKind": "compact-spec"
  },
  {
    "id": "verzeichnisdienste-authentifizierung-ldap-kerberos-radius-sso-mfa",
    "slug": "verzeichnisdienste-authentifizierung-ldap-kerberos-radius-sso-mfa",
    "title": "Identität ist nicht gleich Zugriff",
    "description": "LDAP, Kerberos, RADIUS/AAA und Web-SSO nach ihrer Aufgabe unterscheiden und MFA sowie Tokenprüfung für konkrete Zugänge begründen.",
    "domain": "GA1",
    "groupId": "ga1-6",
    "groupLabel": "Betriebssysteme und Administration",
    "itemId": "ga1-6__14",
    "week": "KW 40",
    "estimatedMinutes": 45,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "verzeichnis-und-tickets-trennen",
      "radius-aaa-im-netz-zuordnen",
      "federation-token-mfa-bewerten"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026",
      "identity-rfc4511",
      "identity-rfc4513",
      "identity-rfc4120",
      "identity-rfc2865",
      "identity-rfc2866",
      "identity-rfc3579",
      "identity-saml-core",
      "identity-oauth6749",
      "identity-oidc-core",
      "identity-nist-sso",
      "identity-nist-mfa"
    ],
    "contentHash": "e32a8c74275b7d8bf32047d068867a775bdfa0ca9b8ab0d9e759eebd50c1b5f3",
    "sourceKind": "compact-spec"
  },
  {
    "id": "berechtigungsgrundprinzipien-least-privilege-need-to-know-vier-augen",
    "slug": "berechtigungsgrundprinzipien-least-privilege-need-to-know-vier-augen",
    "title": "Wer darf was – und wer prüft es?",
    "description": "Least Privilege und Need-to-know anwenden und Funktionstrennung, Antragsfreigabe sowie technische Zwei-Personen-Ausführung unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__0",
    "week": "KW 41",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rechte-und-information-eingrenzen",
      "trennung-und-freigabe-unterscheiden",
      "zugriff-kontrolliert-planen"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026",
      "access-nist-sp80053r5",
      "access-bsi-orp4-2023",
      "access-nist-sp800192"
    ],
    "contentHash": "177357721fbcee660690357fa3a7bce79784a436fcec721f7a6cee5153ad1617",
    "sourceKind": "compact-spec"
  },
  {
    "id": "zugriffsmodelle-dac-mac-rbac-abac",
    "slug": "zugriffsmodelle-dac-mac-rbac-abac",
    "title": "Wer entscheidet über den Zugriff?",
    "description": "DAC, MAC, RBAC und ABAC am selben Zugriffsfall unterscheiden, kombinierte Regeln prüfen und eine passende Umsetzung begründen.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__1",
    "week": "KW 41",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "vier-modelle-unterscheiden",
      "zugriffsentscheidung-ableiten",
      "kombination-begruenden"
    ],
    "sources": [
      "itlf10-12-2023",
      "access-nist-dac-glossary",
      "access-nist-mac-glossary",
      "access-nist-rbac-faq",
      "access-nist-sp800162"
    ],
    "contentHash": "97c60f6830aacaed685e94833c45a8b12b45a09809ef543ef569d851fead2212",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ntfs-freigabeberechtigungen-effektive-rechte",
    "slug": "ntfs-freigabeberechtigungen-effektive-rechte",
    "title": "NTFS und Freigabe: Welches Recht gilt wirklich?",
    "description": "Lokalen und SMB-Zugriff unterscheiden, Gruppenrechte auf beiden Ebenen auswerten sowie Vererbung und Besitzübernahme bei einer Berechtigungsstörung richtig einordnen.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__2",
    "week": "KW 41",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zugriffsweg-unterscheiden",
      "effektiven-zugriff-ableiten",
      "vererbung-besitz-einordnen"
    ],
    "sources": [
      "itlf10-12-2023",
      "windows-share-ntfs-permissions",
      "windows-access-control-overview",
      "windows-effective-access-remote",
      "windows-file-security-access-rights",
      "windows-dacl-access-check",
      "windows-ntfs-ownership",
      "windows-owner-rights"
    ],
    "contentHash": "124decd952b5988bcf944003f4dec9612647941ae563446ee18318b56456fdc0",
    "sourceKind": "compact-spec"
  },
  {
    "id": "agdlp-agudlp-gruppenverschachtelung",
    "slug": "agdlp-agudlp-gruppenverschachtelung",
    "title": "AGDLP und AGUDLP: Gruppenwege für Berechtigungen",
    "description": "Konten, globale, universelle und domänenlokale Sicherheitsgruppen korrekt verschachteln und den passenden Berechtigungsweg begründen.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__3",
    "week": "KW 41",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "gruppen-scope-pruefen",
      "agdlp-aufbauen",
      "agudlp-entscheiden"
    ],
    "sources": [
      "itlf10-12-2023",
      "microsoft-ad-security-groups",
      "microsoft-ad-nesting-native",
      "microsoft-ad-group-scope",
      "microsoft-ad-trust-concepts",
      "microsoft-ad-gc-replication"
    ],
    "contentHash": "8c069e3ae9f08f0105778c99140d18b28dc40f5760795cece4b1e4e26092ea7b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "berechtigungsmatrix-rollen-ressourcen-rechte",
    "slug": "berechtigungsmatrix-rollen-ressourcen-rechte",
    "title": "Berechtigungsmatrix: Rolle × Ressource × Recht",
    "description": "Aus konkreten Arbeitsaufträgen drei Rollen-Ressourcen-Matrizen mit exakten Rechten erstellen und Grenzen des Plans erkennen.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__4",
    "week": "KW 41",
    "estimatedMinutes": 42,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "aufgaben-in-matrix-uebersetzen",
      "rechte-und-funktionstrennung-pruefen",
      "matrix-transfer-und-grenzen"
    ],
    "sources": [
      "itlf10-12-2023",
      "access-nist-ir7316-matrix",
      "access-nist-rbac-faq",
      "access-nist-sp80053r5",
      "access-bsi-orp4-2023",
      "windows-dacl-access-check"
    ],
    "contentHash": "c17ea1fdfe3064db8ef2380eabd2ab8cc7399566f8728db36800b1a4bccc5926",
    "sourceKind": "compact-spec"
  },
  {
    "id": "rollenkonzept-rezertifizierung-berechtigungen",
    "slug": "rollenkonzept-rezertifizierung-berechtigungen",
    "title": "Rollenrechte prüfen und erneut bestätigen",
    "description": "Rollenbasierte Rechte von direkten Benutzerrechten unterscheiden und bestehende Berechtigungen anhand aktueller Aufgaben nachvollziehbar überprüfen.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__5",
    "week": "KW 41",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rollenweg-und-direktrecht",
      "rollenprofil-pruefen",
      "rechte-rezertifizieren"
    ],
    "sources": [
      "access-nist-rbac-faq",
      "access-nist-sp80053r5",
      "access-bsi-orp4-2023"
    ],
    "contentHash": "eddaef694207ef47ae311a9dfa5f43b612bd454fd570788335b5c819ec68cf2e",
    "sourceKind": "compact-spec"
  },
  {
    "id": "berechtigungsprozesse-personalwechsel-vertretung",
    "slug": "berechtigungsprozesse-personalwechsel-vertretung",
    "title": "Rechte bei Personalwechsel sicher ändern",
    "description": "Onboarding, Rollenwechsel, Offboarding und Vertretung mit Freigaben, klaren Zeitgrenzen und wirksamen Zugriffstests planen.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__6",
    "week": "KW 41",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "eintritt-freigeben",
      "rollenwechsel-abgleichen",
      "austritt-wirksam-pruefen",
      "vertretung-begrenzen"
    ],
    "sources": [
      "access-nist-personnel-lifecycle",
      "microsoft-entra-lifecycle-workflows",
      "microsoft-entra-revoke-access"
    ],
    "contentHash": "5d4667baa45e3cecceffb16e8c810a6ab10c481ecb8bed56bfb549c946a73669",
    "sourceKind": "compact-spec"
  },
  {
    "id": "privilegierte-zugaenge-admin-tier-jit-pam",
    "slug": "privilegierte-zugaenge-admin-tier-jit-pam",
    "title": "Privilegierte Zugänge sicher begrenzen",
    "description": "Adminkonten, Vertrauensgrenzen und zeitlich begrenzte Aktivierung anhand eines Wartungsfalls prüfen.",
    "domain": "GA1",
    "groupId": "ga1-7",
    "groupLabel": "Berechtigungskonzepte",
    "itemId": "ga1-7__7",
    "week": "KW 41",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-10-02.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "adminpfad",
      "vertrauensgrenze",
      "aktivierung"
    ],
    "sources": [
      "privileged-ad-tier-model",
      "privileged-enterprise-access-model",
      "privileged-entra-pim-activation",
      "privileged-security-levels"
    ],
    "contentHash": "4485e6e549d500cdad12110a0b9bba8cb1c57aeb37d3c24ddf698c1321114ebd",
    "sourceKind": "compact-spec"
  },
  {
    "id": "struktogramm-nassi-shneiderman-programmablaufplan-lesen-zeichnen",
    "slug": "struktogramm-nassi-shneiderman-programmablaufplan-lesen-zeichnen",
    "title": "Struktogramm und Programmablaufplan",
    "description": "Eine Verzweigung in zwei Darstellungen lesen und zeichnen; bei Schleifen die Bedingung, den Rumpf und das Ende unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__0",
    "week": "KW 43",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "lesen",
      "zeichnen"
    ],
    "sources": [
      "ns-if",
      "ns-while",
      "pap-symbols",
      "it-basiswissen-2012"
    ],
    "contentHash": "921da13f2976db57670459c1e9bd82ec17f418639f9913ab2a69f64ba382ae15",
    "sourceKind": "compact-spec"
  },
  {
    "id": "pseudocode-schreiben-ohne-sprachkenntnis-verstandlich",
    "slug": "pseudocode-schreiben-ohne-sprachkenntnis-verstandlich",
    "title": "Pseudocode: einen Ablauf eindeutig beschreiben",
    "description": "Eingaben, Bedingungen und Ausgaben eines Algorithmus ohne Programmiersprache festlegen und mit Testfällen prüfen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__1",
    "week": "KW 43",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-15.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "eindeutig",
      "randfall"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "083ad6e454d86655ac981a3e849edc9482f2e9dacc1797869b227826815ec9b7",
    "sourceKind": "compact-spec"
  },
  {
    "id": "schreibtischtest-trace-table-variablenbelegung-algorithmus-schritt-schri",
    "slug": "schreibtischtest-trace-table-variablenbelegung-algorithmus-schritt-schri",
    "title": "Schreibtischtest: Algorithmen Schritt für Schritt prüfen",
    "description": "Variablenzustände in einer Trace-Tabelle verfolgen, Grenzwerte prüfen und die erste falsche Zustandsänderung begründen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__2",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-15.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "trace",
      "grenze"
    ],
    "sources": [
      "it-basiswissen-2012",
      "ihk-bonn"
    ],
    "contentHash": "1fb90c9c44a5a7ef42e86e40b2ebbe8a4b261fec383ff0dd5192e85b7e4d3942",
    "sourceKind": "compact-spec"
  },
  {
    "id": "kontrollstrukturen-sequenz-verzweigung-else-case-schleifen-for",
    "slug": "kontrollstrukturen-sequenz-verzweigung-else-case-schleifen-for",
    "title": "Kontrollstrukturen: auswählen, wiederholen und beenden",
    "description": "Sequenz, Verzweigung und Schleifen passend wählen und den ersten, letzten und ausbleibenden Durchlauf prüfen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__3",
    "week": "KW 43",
    "estimatedMinutes": 31,
    "relevance": "hoch",
    "contentRevision": "2026-09-15.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "auswahl",
      "schleife"
    ],
    "sources": [
      "itlf6-9-2022"
    ],
    "contentHash": "caa0371a3e7e02ec82c6c7ab288ea26df239f6b471c9096dbbfc70636cf8030b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "variablen-datentypen-arrays-listen-funktionen-parametern-ruckgabewert",
    "slug": "variablen-datentypen-arrays-listen-funktionen-parametern-ruckgabewert",
    "title": "Variablen, Listen und Funktionen sicher unterscheiden",
    "description": "Index, Wert, Zähler und Summe auseinanderhalten und eine Funktion mit Parametern und Rückgabewert nachvollziehen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__4",
    "week": "KW 43",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "daten",
      "funktion"
    ],
    "sources": [
      "it-basiswissen-2012"
    ],
    "contentHash": "15b7c7b3eaa8379da0d95000893f734d29856320bd6cad05038b34049a32ebdd",
    "sourceKind": "compact-spec"
  },
  {
    "id": "klassendiagramm-beziehungstypen-aggregation-lose-hat-teile-leben-unabhan",
    "slug": "klassendiagramm-beziehungstypen-aggregation-lose-hat-teile-leben-unabhan",
    "title": "Aggregation und Komposition richtig lesen",
    "description": "Die Raute am Ganzen erkennen, Multiplizitäten lesen und Lebensdauerregeln anhand eines ausdrücklich beschriebenen Modells begründen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__5",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "notation",
      "lebensdauer"
    ],
    "sources": [
      "uml-2-5-1"
    ],
    "contentHash": "10dc3f1ed9f2e98c0371698a7a162b157ffc5c72b2d4f50e72dbf3990579cda6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "bash-shebang-variablen-parameter-bedingungen-schleifen-exit-codes",
    "slug": "bash-shebang-variablen-parameter-bedingungen-schleifen-exit-codes",
    "title": "Bash: Argumente, Ausgabe und Exit-Status lesen",
    "description": "Argumentgrenzen erhalten, eine Schleife nachvollziehen und Standardausgabe von Fehlerausgabe und Exit-Status unterscheiden.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__6",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "argumente",
      "status"
    ],
    "sources": [
      "itlf10-12-2023",
      "bash-parameters",
      "bash-scripts",
      "bash-streams",
      "bash-pipelines"
    ],
    "contentHash": "2257bc8fa00363873636f22319bab766d857d9824851e47d1eb6a726f5823125",
    "sourceKind": "compact-spec"
  },
  {
    "id": "powershell-verb-noun-cmdlets-pipeline-import-csv-foreach-ad-cmdlets-mass",
    "slug": "powershell-verb-noun-cmdlets-pipeline-import-csv-foreach-ad-cmdlets-mass",
    "title": "PowerShell: Objekte und CSV-Daten verarbeiten",
    "description": "Eine Objektpipeline lesen, CSV-Datensätze filtern und die Vorbereitung einer Benutzeranlage von ihrer Ausführung trennen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__7",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "objekte",
      "anlage"
    ],
    "sources": [
      "ps-pipelines",
      "ps-csv",
      "ps-foreach",
      "ps-verbs",
      "ps-aduser"
    ],
    "contentHash": "c00e19150ef26b7cba19a7cc5bf165531be8c4370971e801c7b32cebcbf5220e",
    "sourceKind": "compact-spec"
  },
  {
    "id": "typische-aufgabenstellungen-selbst-schreiben-logdateien-loschen-backup-s",
    "slug": "typische-aufgabenstellungen-selbst-schreiben-logdateien-loschen-backup-s",
    "title": "Verwaltungsskripte: vom Auftrag zum sicheren Ablauf",
    "description": "Aus einer Anforderung einen prüfbaren Ablauf für Logdateien, Backups, CSV-Konten und Dienststatus entwickeln.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__8",
    "week": "KW 43",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "auswahl",
      "kontrolle"
    ],
    "sources": [
      "ps-comparisons",
      "ps-date",
      "ps-service",
      "ps-foreach"
    ],
    "contentHash": "f1be1b7286b855f1b645e27024f472233d011177ef00fe26a5dc11118522e00b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "gegebenes-skript-analysieren-tut-ausgabe-entsteht-welcher",
    "slug": "gegebenes-skript-analysieren-tut-ausgabe-entsteht-welcher",
    "title": "Skripte analysieren: Ausgabe, Fehler und Ergänzung",
    "description": "Ein fremdes Skript Zeile für Zeile verfolgen, eine falsche Zählung erklären und eine gezielte Korrektur mit Grenzfällen absichern.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__9",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "trace",
      "korrektur"
    ],
    "sources": [
      "ps-foreach",
      "ps-comparisons"
    ],
    "contentHash": "31b55d39c1850699ba77c59f55e289c755296eb2f05d1dbc1f64717c164d4dbd",
    "sourceKind": "compact-spec"
  },
  {
    "id": "idempotenz-deklarativ-vs-imperativ-erklaren",
    "slug": "idempotenz-deklarativ-vs-imperativ-erklaren",
    "title": "Idempotenz: Zielzustand statt wiederholter Nebenwirkung",
    "description": "Deklarative und imperative Beschreibung unterscheiden und Wiederholungen am tatsächlichen Zielzustand beurteilen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__10",
    "week": "KW 43",
    "estimatedMinutes": 26,
    "relevance": "hoch",
    "contentRevision": "2026-09-15.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "modell",
      "wiederholung"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "34472ea5e94d0a53ca280dddf3e77486f6940fc14f6525e510228b5a1f7306c3",
    "sourceKind": "compact-spec"
  },
  {
    "id": "konfigurationsmanagement-iac-ansible-inventory-playbook-modul-rolle",
    "slug": "konfigurationsmanagement-iac-ansible-inventory-playbook-modul-rolle",
    "title": "Ansible und IaC: Ziele und Sollzustände trennen",
    "description": "Inventory, Playbook, Task, Modul und Rolle zuordnen und einen begrenzten Konfigurationslauf beurteilen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__11",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "bausteine",
      "grenzen"
    ],
    "sources": [
      "itlf10-12-2023",
      "ansible-concepts",
      "ansible-check",
      "terraform-intro",
      "puppet-architecture",
      "chef-overview"
    ],
    "contentHash": "ba01458b13d9f3d0c49050fde57bfa5a942465a6c59a1008455b2a0d364ce2da",
    "sourceKind": "compact-spec"
  },
  {
    "id": "yaml-json-lesen-syntaxfehler-finden",
    "slug": "yaml-json-lesen-syntaxfehler-finden",
    "title": "YAML und JSON lesen und Fehler eingrenzen",
    "description": "Datenstruktur, Syntax und fachliche Gültigkeit trennen und Konfigurationsfehler gezielt korrigieren.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__12",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "struktur",
      "fehler"
    ],
    "sources": [
      "rfc8259",
      "yaml-1-2-2"
    ],
    "contentHash": "ef0b99ec0407227cedca1c5d450e99c0981ebad2a5a77330f71c863d39f68523",
    "sourceKind": "compact-spec"
  },
  {
    "id": "versionsverwaltung-git-repository-commit-branch-merge-warum",
    "slug": "versionsverwaltung-git-repository-commit-branch-merge-warum",
    "title": "Git: Änderungen nachvollziehbar sichern",
    "description": "Repository, Commit, Branch und Merge unterscheiden und den tatsächlich gesicherten Skriptstand bestimmen.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__13",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "stand",
      "merge"
    ],
    "sources": [
      "itlf10-12-2023",
      "git-book-basics",
      "git-book-merge"
    ],
    "contentHash": "4caf2e9dc258177bca464ec5ec1aeb5b42123cb022d41882a0648c2f3701ba35",
    "sourceKind": "compact-spec"
  },
  {
    "id": "cd-grundbegriffe-pipeline-stage-runner-automatisiertes-deployment",
    "slug": "cd-grundbegriffe-pipeline-stage-runner-automatisiertes-deployment",
    "title": "CI/CD: vom Commit zur geprüften Bereitstellung",
    "description": "Pipeline, Stage, Job und Runner zuordnen und entscheiden, wann ein Deployment starten darf.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__14",
    "week": "KW 43",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-17.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ablauf",
      "freigabe"
    ],
    "sources": [
      "gitlab-pipelines",
      "gitlab-delivery"
    ],
    "contentHash": "052f27d8ac3a3155f23d79978f9144965e6fc5b9bf6769c454628618c2b55ea6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "qualitat-skripten-kommentare-fehlerbehandlung-logging-test-vor",
    "slug": "qualitat-skripten-kommentare-fehlerbehandlung-logging-test-vor",
    "title": "Administrationsskripte sicher prüfen und betreiben",
    "description": "Eingaben, Fehlerbehandlung, Logging und Wiederholungstests für eine begrenzte Automatisierung beurteilen und nachvollziehbar dokumentieren.",
    "domain": "GA1",
    "groupId": "ga1-9",
    "groupLabel": "Programme zur automatisierten Systemverwaltung",
    "itemId": "ga1-9__15",
    "week": "KW 43",
    "estimatedMinutes": 34,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "sicherer-ablauf",
      "nachweis"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "2cac855173ad7ce1839b9bff6b690aee69d655495f2d5242110f19e200bd4f0a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "osi-model",
    "slug": "osi-model",
    "title": "Das OSI-Schichtenmodell sicher anwenden",
    "description": "Die sieben OSI-Schichten ordnen, ihre Aufgaben unterscheiden und Geräte sowie Protokolle anhand der tatsächlich ausgewerteten Information einordnen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__0",
    "week": "KW 35",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "layer-order",
      "layer-classification"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023",
      "ihk-bonn"
    ],
    "contentHash": "b1ca959ebaee6a5b490c9dcb353c62a4e350803ae142958ffe45bbb3341583a3",
    "sourceKind": "legacy-markdown"
  },
  {
    "id": "tcp-ip-osi-mapping",
    "slug": "tcp-ip-osi-zuordnung",
    "title": "TCP/IP- und OSI-Modell sicher zuordnen",
    "description": "Die vier Schichten des TCP/IP-Modells funktional den sieben OSI-Schichten zuordnen und Protokolle anhand ihrer Aufgabe einordnen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__1",
    "week": "KW 35",
    "estimatedMinutes": 18,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "model-mapping",
      "functional-reasoning"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "84e143c8848f1d2d2a3b9f691a359c40bab4c9da5df42aef5cf503ad6aac87f2",
    "sourceKind": "compact-spec"
  },
  {
    "id": "kapselung-pdu-mtu",
    "slug": "kapselung-pdu-mtu",
    "title": "Kapselung, PDU und MTU sicher anwenden",
    "description": "Den Weg von Anwendungsdaten über Segment, Paket und Frame nachvollziehen und die maximale Nutzlast aus einer MTU begründet bestimmen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__2",
    "week": "KW 35",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "pdu-order",
      "mtu-calculation"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "e78112c2766f07ec7c45d354fbd715caa0ae01bdfea66abffa16ef0f941de816",
    "sourceKind": "compact-spec"
  },
  {
    "id": "tcp-udp-handshake",
    "slug": "tcp-udp-handshake",
    "title": "TCP, UDP und den Handshake sicher unterscheiden",
    "description": "TCP und UDP aus Anforderungen auswählen, den TCP-Drei-Wege-Handshake aus Paketmerkmalen rekonstruieren und typische Fehlannahmen vermeiden.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__3",
    "week": "KW 35",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "transport-selection",
      "handshake-analysis"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "f77d88a7d5a5be6fe11d4859f4adf5cf75a945b912cb7f386b1eb9c9c10f704c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzwerkports",
    "slug": "netzwerkports",
    "title": "Netzwerkports und Sockets sicher auswerten",
    "description": "Quell- und Zielports in Kommunikationsbeziehungen lesen sowie passende Portregeln für Dienste begründet ableiten.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__4",
    "week": "KW 35",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "socket-direction",
      "service-rule"
    ],
    "sources": [
      "ihk-bonn",
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "9fea41edc29191e964d317ef3cd456043b1c3f51ccfcea2b8ba21e57624849b8",
    "sourceKind": "compact-spec"
  },
  {
    "id": "anwendungsprotokolle",
    "slug": "anwendungsprotokolle",
    "title": "Anwendungsprotokolle passend auswählen",
    "description": "Anwendungsprotokolle nach ihrem Zweck unterscheiden, sicher einsetzen und von Transportprotokoll, Port und Schutzmechanismus abgrenzen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__5",
    "week": "KW 35",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "service-selection",
      "protocol-reasoning"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "itlf10-12-2023"
    ],
    "contentHash": "eaef7d6cdc947d9117f655573040f3c97bca5f67b5deb2e52b4eda463c75edb1",
    "sourceKind": "compact-spec"
  },
  {
    "id": "kupferverkabelung",
    "slug": "kupferverkabelung",
    "title": "Kupferverkabelung sicher planen",
    "description": "Twisted-Pair-Schirmungsangaben lesen und eine Kupferstrecke anhand von Datenrate, Kanallänge, Umgebung und Komponentenklasse begründet auswählen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__6",
    "week": "KW 35",
    "estimatedMinutes": 26,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "shielding-reading",
      "link-selection"
    ],
    "sources": [
      "it-basiswissen-2012",
      "itlf6-9-2022"
    ],
    "contentHash": "6e9c8869a3e3cd2fba7ae5b90a18591e9086269fc2b6e925eec8f5022b2140e0",
    "sourceKind": "compact-spec"
  },
  {
    "id": "lichtwellenleiter",
    "slug": "lichtwellenleiter",
    "title": "Lichtwellenleiter passend auswählen",
    "description": "Singlemode und Multimode an Anforderungen unterscheiden, eine vollständige optische Verbindung planen und ihr Dämpfungsbudget prüfen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__7",
    "week": "KW 35",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "fiber-type-selection",
      "link-budget-check"
    ],
    "sources": [
      "ihk-bonn",
      "itlf10-12-2023",
      "it-basiswissen-2012"
    ],
    "contentHash": "6961b4089dbabb0aa3a4ba25fddacbc3b0ef8b6eca3d8ca512348d8dda7e1934",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ethernet-standards",
    "slug": "ethernet-standards",
    "title": "Ethernet-Standards nach Anforderungen auswählen",
    "description": "Ethernet-PHY-Bezeichnungen lesen und eine passende Kombination aus Datenrate, Medium, Strecke, Ports und Infrastruktur begründet auswählen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__8",
    "week": "KW 35",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "designation-decoding",
      "requirement-selection"
    ],
    "sources": [
      "itlf6-9-2022",
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "43fe0f7f9776ba748455aec2b72a55d114d320662406d0053d201ca0e44a1bc3",
    "sourceKind": "compact-spec"
  },
  {
    "id": "sfp-transceiver",
    "slug": "sfp-transceiver",
    "title": "SFP- und SFP+-Transceiver passend auswählen",
    "description": "Transceiver-Datenblätter lesen und für beide Enden eines Kupfer- oder Glasfaser-Uplinks eine kompatible Kombination bestimmen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__9",
    "week": "KW 35",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "datasheet-check",
      "compatible-link"
    ],
    "sources": [
      "itlf6-9-2022",
      "itlf10-12-2023"
    ],
    "contentHash": "4a8dadaf938beca3be7813e37c175227fe2f4ee60bc0cfa2bad343e8e75ca4b2",
    "sourceKind": "compact-spec"
  },
  {
    "id": "poe-leistungsbudget",
    "slug": "poe-leistungsbudget",
    "title": "PoE-Standard und Leistungsbudget sicher planen",
    "description": "PSE und PD unterscheiden, PoE-Typen zuordnen und ein Switchbudget mit Portgrenzen und 20 Prozent Reserve berechnen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__10",
    "week": "KW 35",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "poe-roles-types",
      "poe-budget"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022",
      "itlf10-12-2023",
      "ihk-bonn"
    ],
    "contentHash": "ed6f83c3dcf68170a0b8957492923ea8ef977bfaafbee92e77a9208f233c612b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "strukturierte-verkabelung",
    "slug": "strukturierte-verkabelung",
    "title": "Strukturierte Verkabelung vom Standort bis zur Datendose",
    "description": "Primär-, Sekundär- und Tertiärbereich sicher zuordnen sowie Patchfeld, Rangierung und Verteilerschrank wartbar planen und dokumentieren.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__11",
    "week": "KW 35",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "cabling-hierarchy",
      "rack-traceability"
    ],
    "sources": [
      "itlf10-12-2023",
      "itlf6-9-2022",
      "ihk-bonn"
    ],
    "contentHash": "638c1de4aa4e152b067d4f741b652fbadb8d53aa98b3e7078b76ed2725c4e0ce",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzwerktopologien",
    "slug": "netzwerktopologien",
    "title": "Netzwerktopologien erkennen und Ausfälle beurteilen",
    "description": "Stern, Baum, Ring und vermaschte Netze anhand ihrer Verbindungen unterscheiden sowie physische und logisch aktive Pfade bei Ausfällen analysieren.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__12",
    "week": "KW 35",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "topology-identification",
      "failure-analysis"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023",
      "it-basiswissen-2012"
    ],
    "contentHash": "725990e2a8571789cd76ef388b0ccb30de4fdccf004d4c1cf90d233b91e0c92f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "kollisions-broadcastdomaenen",
    "slug": "kollisions-broadcastdomaenen",
    "title": "Kollisions- und Broadcastdomänen sicher zählen",
    "description": "Hub-, Switch-, VLAN- und Layer-3-Grenzen unterscheiden und Domänen in Netzplänen mit ausdrücklich genannten Prüfungsannahmen korrekt bestimmen.",
    "domain": "GA2",
    "groupId": "ga2-1",
    "groupLabel": "Block N1 · Grundlagen, Medien und Verkabelung",
    "itemId": "ga2-1__13",
    "week": "KW 35",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "collision-boundaries",
      "broadcast-boundaries"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "itlf6-9-2022"
    ],
    "contentHash": "cddb8c45448669a3a42001ac02f28fc45e3d208ccc30f91fa58544d86522e789",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ipv4-adressaufbau-cidr",
    "slug": "ipv4-adressaufbau-cidr",
    "title": "IPv4-Adressen und CIDR-Präfixe sicher lesen",
    "description": "IPv4-Adressen als 32 Bit verstehen, CIDR-Präfixe in Netz- und Hostanteil übersetzen und die zugehörige Netzadresse bestimmen.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4-Adressierung und Subnetting",
    "itemId": "ga2-2__0",
    "week": "KW 36",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "prefix-mask",
      "network-split"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "096760c6fc6d8bac6a0e59d9ff9b04eab919a8ae3c5a1eb51a0e249cc61789b3",
    "sourceKind": "compact-spec"
  },
  {
    "id": "private-ipv4-adressen",
    "slug": "private-ipv4-adressen",
    "title": "Private und besondere IPv4-Adressen unterscheiden",
    "description": "RFC-1918-Adressen sicher erkennen und sie von IPv4-Link-Local, Loopback, Multicast und öffentlich nutzbaren Adressen abgrenzen.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4-Adressierung und Subnetting",
    "itemId": "ga2-2__1",
    "week": "KW 36",
    "estimatedMinutes": 18,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "address-classification",
      "scenario-selection"
    ],
    "sources": [
      "itlf6-9-2022",
      "europa-integratoren-2026"
    ],
    "contentHash": "53c9a8a85e951d0ae9a3b7acb4c29f280d58e4308122406ac25e71fb9619f96e",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netz-broadcast-hostadressen",
    "slug": "netz-broadcast-hostadressen",
    "title": "IPv4-Netzgrenzen sicher berechnen",
    "description": "Aus IPv4-Adresse und Präfix Netzadresse, Broadcastadresse sowie erste und letzte nutzbare Hostadresse schrittweise bestimmen.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4 und Subnetting",
    "itemId": "ga2-2__2",
    "week": "KW 36",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "network-broadcast",
      "host-boundaries"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "3919fe90ba538858d2235f45a98d7cc32164d8b949d18e11b67da01e3f92912b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "hostanzahl-subnetze",
    "slug": "hostanzahl-subnetze",
    "title": "Hostanzahl und gleich große Subnetze berechnen",
    "description": "Aus Präfix und Bedarf die nutzbare Hostanzahl bestimmen sowie ein IPv4-Netz schrittweise in gleich große Subnetze aufteilen.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4 und Subnetting",
    "itemId": "ga2-2__3",
    "week": "KW 36",
    "estimatedMinutes": 26,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "usable-host-count",
      "equal-subnet-splitting"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022",
      "ihk-bonn"
    ],
    "contentHash": "784e3f504b7d9bb57390c54da6e4efa8182db591aa6b32ff674bc136649a87a3",
    "sourceKind": "compact-spec"
  },
  {
    "id": "vlsm",
    "slug": "vlsm",
    "title": "VLSM sicher planen: vom Bedarf zum Adressraum",
    "description": "Ein IPv4-Ausgangsnetz mit VLSM bedarfsgerecht aufteilen, Blockgrößen und Präfixe berechnen sowie belegte und freie Adressbereiche lückenlos dokumentieren.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4 und Subnetting",
    "itemId": "ga2-2__4",
    "week": "KW 36",
    "estimatedMinutes": 32,
    "relevance": "sehr hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "block-prefix",
      "vlsm-plan"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "it-basiswissen-2012"
    ],
    "contentHash": "61b3f3f1df6d0cf924998ea31fedae52d01cd451c80cf5674fb715e40b41b744",
    "sourceKind": "compact-spec"
  },
  {
    "id": "supernetting-routenaggregation",
    "slug": "supernetting-routenaggregation",
    "title": "Routen mit Supernetting zusammenfassen",
    "description": "Benachbarte IPv4-Netze über ihr gemeinsames Binärpräfix aggregieren und prüfen, ob die Summenroute exakt oder bewusst weiter gefasst ist.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4 und Subnetting",
    "itemId": "ga2-2__5",
    "week": "KW 36",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "common-prefix",
      "aggregation-scope"
    ],
    "sources": [
      "itlf6-9-2022"
    ],
    "contentHash": "e7a1d655a8f07effa83bf011e08c3c1ac223b324ff3ab10946188c44ae67c19d",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ip-adresskonzept",
    "slug": "ip-adresskonzept",
    "title": "Ein belastbares IPv4-Adresskonzept entwerfen",
    "description": "Anforderungen für Standorte und VLANs in einen dokumentierten, erweiterbaren IPv4-Adressplan mit VLSM, Reserven und klaren Vergaberegeln übersetzen.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4 und Subnetting",
    "itemId": "ga2-2__6",
    "week": "KW 36",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "address-plan-design",
      "address-plan-documentation"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "a1dcfe3af947a235d05fa3b672aa349044bd8fd65b1fa746588ba1de96aa862b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "binaere-subnetzmasken",
    "slug": "binaere-subnetzmasken",
    "title": "Binäre Subnetzmasken schnell lesen",
    "description": "Oktette mit den acht Zweierpotenzen umrechnen und CIDR-Präfixe sicher zwischen Binär- und Dezimalschreibweise übertragen.",
    "domain": "GA2",
    "groupId": "ga2-2",
    "groupLabel": "Block N2 · IPv4 und Subnetting",
    "itemId": "ga2-2__7",
    "week": "KW 36",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "binary-octet-conversion",
      "cidr-mask-conversion"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn"
    ],
    "contentHash": "f06cda68fc0fe321756f01aa92f9472e9647f4df30d18575311dce28cf2a6bad",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ipv6-schreibweise",
    "slug": "ipv6-schreibweise",
    "title": "IPv6-Adressen fehlerfrei kürzen und expandieren",
    "description": "IPv6-Adressen als acht Hextets lesen, nach RFC 5952 eindeutig kürzen und komprimierte Schreibweisen sicher expandieren.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6 und automatische Adresskonfiguration",
    "itemId": "ga2-3__0",
    "week": "KW 37",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "canonical-compression",
      "safe-expansion"
    ],
    "sources": [
      "itlf6-9-2022",
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "5d03d62c2debd036b384fadf5259357ccdb7712be637c5d639537ee7728bb336",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ipv6-adresstypen",
    "slug": "ipv6-adresstypen",
    "title": "IPv6-Adresstypen und Gültigkeitsbereiche erkennen",
    "description": "IPv6-Adressen anhand ihres Präfixes und ihrer Zustellungsart als Global Unicast, ULA, Link-Local, Loopback, Multicast oder Anycast einordnen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6 und automatische Adresskonfiguration",
    "itemId": "ga2-3__1",
    "week": "KW 37",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "prefix-classification",
      "delivery-scope"
    ],
    "sources": [
      "itlf6-9-2022",
      "ihk-bonn",
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "3b11ae4f26bdd8065a85fc1c6bf3359df1d8db6fd070aba5129871cf11b5f8af",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ipv6-praefix-eui64",
    "slug": "ipv6-praefix-eui64",
    "title": "IPv6-/64-Präfixe und Modified EUI-64 einordnen",
    "description": "Aus einem Providerpräfix /64-LANs bilden, Modified EUI-64 nachvollziehen und moderne stabile sowie temporäre Interface-IDs berücksichtigen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6 und automatische Adresskonfiguration",
    "itemId": "ga2-3__2",
    "week": "KW 37",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "prefix-subnetting",
      "iid-strategy"
    ],
    "sources": [
      "ihk-bonn",
      "europa-integratoren-2026"
    ],
    "contentHash": "c31a72483cc2cb3050e3ac6fc155a1d07e113108885e5d8d35bd53865f91aba4",
    "sourceKind": "compact-spec"
  },
  {
    "id": "slaac-dhcpv6-ndp",
    "slug": "slaac-dhcpv6-ndp",
    "title": "SLAAC, DHCPv6 und NDP im Ablauf unterscheiden",
    "description": "IPv6-Autokonfiguration mit DAD, Router Solicitation und Router Advertisement erklären sowie SLAAC und DHCPv6 passend kombinieren.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6 und automatische Adresskonfiguration",
    "itemId": "ga2-3__3",
    "week": "KW 37",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "slaac-ndp-flow",
      "configuration-modes"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026",
      "ihk-bonn"
    ],
    "contentHash": "e10468837890ff3cd83b1790021477e9d7c05be048d0236e797dca7abaf4f4d6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dual-stack-transition",
    "slug": "dual-stack-transition",
    "title": "IPv4 und IPv6 kontrolliert parallel betreiben",
    "description": "Den Grund für die Übergangsphase erklären und Dual Stack, Tunnel sowie Protokollübersetzung anhand der Kommunikationspartner auswählen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__4",
    "week": "KW 37",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "coexistence-reasoning",
      "mechanism-selection"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022",
      "ihk-bonn"
    ],
    "contentHash": "bbd59ca1375b0f756a2ed83ba817e6a80767072ee30f9b0f5a1db523ff6d6dac",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dhcp-dora",
    "slug": "dhcp-dora",
    "title": "DHCP-DORA lesen und sicher erklären",
    "description": "Discover, Offer, Request und Acknowledge in die richtige Reihenfolge bringen und Broadcast- beziehungsweise Unicast-Beobachtungen fachlich einordnen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__5",
    "week": "KW 37",
    "estimatedMinutes": 18,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dora-sequence",
      "packet-behavior"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "d89b6bed6280228a3b0f2f09c9c4356f63c2b1ba83339ee1371690f0ffaabc6a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dhcp-scope-leases",
    "slug": "dhcp-scope-leases",
    "title": "DHCP-Scope und Lease-Zeiten planen",
    "description": "Adresspool, Ausschlüsse, Reservierungen und Optionen konfliktfrei planen sowie Lease-Dauer, T1 und T2 passend zum Einsatz einordnen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__6",
    "week": "KW 37",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "scope-design",
      "lease-strategy"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "f27c1a4b6f09eb8b27897c896a6e7297e94703f742e19f7338a259c82eb2622f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dhcp-relay-failover",
    "slug": "dhcp-relay-failover",
    "title": "DHCP über Netzgrenzen verfügbar planen",
    "description": "DHCP-Relay für entfernte Clientnetze platzieren und Split Scope klar von zustandssynchronisiertem DHCP-Failover unterscheiden.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__7",
    "week": "KW 37",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "relay-path",
      "redundancy-model"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "e60bf781bc1f14be326e123d8814a1ad8882cece49fbc399e8037946d721ce0a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dns-namensraum-zonen",
    "slug": "dns-namensraum-zonen",
    "title": "DNS-Namensraum, Zonen und Delegation verstehen",
    "description": "FQDNs im hierarchischen DNS-Namensraum lesen, Zonen von Domänen unterscheiden und eine Delegation fachlich korrekt zuordnen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__8",
    "week": "KW 37",
    "estimatedMinutes": 21,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "namespace-interpret",
      "zone-delegation"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "e3145708e51497e1bdb7eddac19c839984883442fd6e43b4b5db52c1a651b9ed",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dns-recordtypen",
    "slug": "dns-recordtypen",
    "title": "DNS-Recordtypen passend auswählen und prüfen",
    "description": "A, AAAA, CNAME, MX, PTR, NS, SOA, SRV und TXT anhand ihrer RDATA-Rolle auswählen und typische Zonendateifehler erkennen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__9",
    "week": "KW 37",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "record-select",
      "record-evaluate"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "795fe7b429e91b5814c5047bcb66c0ecacffa17965dabe830dcb818d08821b67",
    "sourceKind": "compact-spec"
  },
  {
    "id": "spf-record",
    "slug": "spf-record",
    "title": "SPF-Policies lesen, prüfen und sicher planen",
    "description": "SPF als TXT-Policy für MAIL-FROM- und HELO-Identitäten auswerten, typische Syntaxfehler erkennen und Grenzen gegenüber DKIM und DMARC erklären.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__10",
    "week": "KW 37",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "spf-parse",
      "spf-plan"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "2411bba1a13fe9c8680154a564a0e02a846615742afbc07fd343ecd8022f24e4",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dns-aufloesung-caching",
    "slug": "dns-aufloesung-caching",
    "title": "DNS-Auflösung und Caching nachvollziehen",
    "description": "Rekursive und iterative DNS-Auflösung unterscheiden, Forwarder einordnen sowie Cache, TTL und Reverse Lookup korrekt erklären.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__11",
    "week": "KW 37",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "resolution-roles",
      "cache-reverse"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "3949557e1ae20a9c103e1b0a6e8f3cc7cc069821f7fb5df3466f512c090ab1f6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dnssec-split-horizon",
    "slug": "dnssec-split-horizon",
    "title": "DNSSEC und Split-Horizon richtig einordnen",
    "description": "DNSSEC als prüfbare Vertrauenskette erklären und interne von externen DNS-Sichten trennen, ohne Verschlüsselung oder Zugriffsschutz vorzutäuschen.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__12",
    "week": "KW 37",
    "estimatedMinutes": 24,
    "relevance": "mittel",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dnssec-trust",
      "split-horizon-design"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "9cf59714544498559a1696345ce529c8106c749e9361c0ad82ae54bfda7082f5",
    "sourceKind": "compact-spec"
  },
  {
    "id": "arp-cache-spoofing",
    "slug": "arp-cache-spoofing",
    "title": "ARP-Cache und Spoofing verstehen",
    "description": "IPv4-Adressen im lokalen Netz auf MAC-Adressen abbilden, ARP-Cache-Einträge deuten und ARP-Spoofing samt wirksamer Gegenmaßnahmen erklären.",
    "domain": "GA2",
    "groupId": "ga2-3",
    "groupLabel": "Block N3 · IPv6, DHCP und DNS",
    "itemId": "ga2-3__13",
    "week": "KW 37",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "arp-resolution",
      "arp-spoofing-defense"
    ],
    "sources": [
      "itlf10-12-2023",
      "ihk-bonn"
    ],
    "contentHash": "c9c4e56f985bd19af7503292760d0949fea86872fc7422408c559fd451710894",
    "sourceKind": "compact-spec"
  },
  {
    "id": "routingtabelle",
    "slug": "routingtabelle",
    "title": "Routingtabellen sicher lesen",
    "description": "Routingeinträge aus Zielpräfix, Next Hop, Ausgangsinterface und Metrik lesen und den Weiterleitungsweg eines Pakets nachvollziehen.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__0",
    "week": "KW 38",
    "estimatedMinutes": 21,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "route-fields",
      "forwarding-path"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "ecbf3e9e3ca18e68cc1eb2bbb7b3c778dc8b33697552009bba34b7102602c855",
    "sourceKind": "compact-spec"
  },
  {
    "id": "longest-prefix-default-route",
    "slug": "longest-prefix-default-route",
    "title": "Longest Prefix Match und Default-Route",
    "description": "Passende IPv4-Routen ermitteln, die spezifischste Präfixroute auswählen und die Default-Route ausschließlich als Fallback verwenden.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__1",
    "week": "KW 38",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "matching-routes",
      "longest-prefix-choice"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023",
      "ihk-bonn"
    ],
    "contentHash": "ef889755fc9c2faa627d47b451256fbc08a5e9023d6eb6cc5a1263086d4a4f55",
    "sourceKind": "compact-spec"
  },
  {
    "id": "statisches-routing",
    "slug": "statisches-routing",
    "title": "Statische Routen planen und prüfen",
    "description": "Statisches Routing für überschaubare Netze begründet auswählen, fehlende Routen ergänzen und Next Hop sowie Rückweg kontrollieren.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__2",
    "week": "KW 38",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "static-fit",
      "static-route-plan"
    ],
    "sources": [
      "itlf6-9-2022",
      "europa-integratoren-2026"
    ],
    "contentHash": "5e1401746d5d0fb0b8d93f8163757924a25f33cbb074d17dcb91db4ef5eaad12",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dynamisches-routing",
    "slug": "dynamisches-routing",
    "title": "Dynamisches Routing und Konvergenz",
    "description": "Distanzvektor- und Link-State-Verfahren unterscheiden, Konvergenz nach Änderungen erklären und ein passendes Routingverfahren auswählen.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__3",
    "week": "KW 38",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "routing-models",
      "routing-selection"
    ],
    "sources": [
      "ihk-bonn",
      "europa-integratoren-2026"
    ],
    "contentHash": "b8f592964da7942022fe1d9eacffd1e090df10ac6a27c0d0a173908b38de9cbf",
    "sourceKind": "compact-spec"
  },
  {
    "id": "rip-ospf",
    "slug": "rip-ospf",
    "title": "RIP und OSPF im Netzplan unterscheiden",
    "description": "RIPv2 und OSPF nach Arbeitsweise, Metrik und Einsatzgrenzen vergleichen sowie OSPF-Kosten, Areas und DR/BDR grundlegend einordnen.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__4",
    "week": "KW 38",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "protocol-comparison",
      "ospf-structure"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "e6243f48a7029a7dea948695e51301c7bcbcb758ac47d3f483ac72d186ba4c4a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "administrative-distanz-metrik",
    "slug": "administrative-distanz-metrik",
    "title": "Administrative Distanz und Metrik trennen",
    "description": "Routen zuerst nach Präfixlänge, dann nach Quellenpräferenz und schließlich innerhalb eines Routingverfahrens nach Metrik auswählen.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__5",
    "week": "KW 38",
    "estimatedMinutes": 20,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "distance-vs-metric",
      "route-selection-order"
    ],
    "sources": [
      "itlf6-9-2022"
    ],
    "contentHash": "cf616a85663997b29616371505edfa0f5b144cb0b2b23e503e420569c347f7cb",
    "sourceKind": "compact-spec"
  },
  {
    "id": "bgp-autonome-systeme",
    "slug": "bgp-autonome-systeme",
    "title": "BGP und autonome Systeme einordnen",
    "description": "IGP und EGP nach ihrem Geltungsbereich unterscheiden sowie BGP-Routen anhand von autonomem System, AS_PATH und Richtlinie grundlegend beurteilen.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__6",
    "week": "KW 38",
    "estimatedMinutes": 21,
    "relevance": "mittel",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "as-igp-egp",
      "bgp-policy-path"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "cf44086f3ff26c722d72bec485dbeeaf3473a953063d06cb348a0268cb97ace1",
    "sourceKind": "compact-spec"
  },
  {
    "id": "nat-pat",
    "slug": "nat-pat",
    "title": "NAT- und PAT-Zuordnungen nachvollziehen",
    "description": "SNAT, DNAT und PAT anhand ihrer Übersetzungsrichtung unterscheiden, eine Socket-Zuordnungstabelle vervollständigen und Grenzen bewerten.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__7",
    "week": "KW 38",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "pat-mapping",
      "nat-selection-limits"
    ],
    "sources": [
      "itlf10-12-2023",
      "itlf6-9-2022"
    ],
    "contentHash": "698ff55db7cd27ca9a6bfb0c2f3200962b933df6bf21edcfba41845a80c7d209",
    "sourceKind": "compact-spec"
  },
  {
    "id": "port-forwarding-dnat",
    "slug": "port-forwarding-dnat",
    "title": "Port-Forwarding und DNAT kontrolliert planen",
    "description": "Eine öffentliche Ziel-IP-/Port-Kombination per DNAT einem Dienst in der DMZ zuordnen und Veröffentlichung, Filterung sowie Rückweg getrennt absichern.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__8",
    "week": "KW 38",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dnat-mapping",
      "publication-controls"
    ],
    "sources": [
      "itlf10-12-2023",
      "itlf6-9-2022"
    ],
    "contentHash": "29108598ab96852fa784b16a7c01ba9e802afbc685cf07079614eb38217387de",
    "sourceKind": "compact-spec"
  },
  {
    "id": "inter-vlan-routing",
    "slug": "inter-vlan-routing",
    "title": "Inter-VLAN-Routing passend entwerfen",
    "description": "Router-on-a-Stick und Layer-3-Switch anhand des Paketwegs, der Gateway-Rolle, Kapazität, Ausfallsicherheit und Sicherheitskontrollen vergleichen.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__9",
    "week": "KW 38",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "inter-vlan-path",
      "architecture-choice"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "02a8600f6b9eff025d50546eb77209155e38fe6add204287c71d9f0a6aebb6bb",
    "sourceKind": "compact-spec"
  },
  {
    "id": "routing-fehlersuche",
    "slug": "routing-fehlersuche",
    "title": "Routingfehler über Hin- und Rückweg eingrenzen",
    "description": "Routingstörungen anhand von Endpunktkonfiguration, Präfixentscheidung, Routingtabellen, Paketspuren und getrennten Hin- und Rückwegen systematisch diagnostizieren.",
    "domain": "GA2",
    "groupId": "ga2-4",
    "groupLabel": "Block N4 · Routing und NAT",
    "itemId": "ga2-4__10",
    "week": "KW 38",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "diagnostic-workflow",
      "path-faults"
    ],
    "sources": [
      "europa-integratoren-2026",
      "ihk-bonn",
      "it-basiswissen-2012"
    ],
    "contentHash": "8b30937ab646895bc0788a0ece707eb97f385320e7e537a0afd3f532c18c243a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "switch-mac-tabelle",
    "slug": "switch-mac-tabelle",
    "title": "MAC-Lernen, Fluten und Filtern am Switch",
    "description": "Die MAC-Adresstabelle eines Switches aus eingehenden Frames fortschreiben und bekannte, unbekannte sowie lokale Ziel-MAC-Adressen korrekt weiterleiten.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__0",
    "week": "KW 39",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "mac-learning",
      "frame-forwarding"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "ca809b1549f0b34214c71d718857a35d64f7e5b1189f592ac7556a21f2ba4164",
    "sourceKind": "compact-spec"
  },
  {
    "id": "switching-verfahren",
    "slug": "switching-verfahren",
    "title": "Store-and-Forward, Cut-Through und Management",
    "description": "Switching-Verfahren nach Latenz und Fehlerbehandlung vergleichen sowie Managed und Unmanaged Switches aus Betriebsanforderungen auswählen.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__1",
    "week": "KW 39",
    "estimatedMinutes": 23,
    "relevance": "mittel bis hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "forwarding-method",
      "management-choice"
    ],
    "sources": [
      "itlf6-9-2022"
    ],
    "contentHash": "38a8210b57483cf30639a73c4fb6bcf7341fc93187b40f3929fa0c3d16d9b34a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "vlan-access-trunk",
    "slug": "vlan-access-trunk",
    "title": "Access, Trunk, Native und Voice VLAN",
    "description": "Switchports herstellerneutral als Access oder 802.1Q-Trunk planen und Native- sowie Voice-VLAN-Sonderfälle sicher einordnen.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__2",
    "week": "KW 39",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "access-trunk-flow",
      "native-voice-plan"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "d1241e5b96f827fc334f082914c24a1560b45752abccaf20fa30ad1f4ebb28cf",
    "sourceKind": "compact-spec"
  },
  {
    "id": "vlan-konzept",
    "slug": "vlan-konzept",
    "title": "Ein belastbares VLAN-Konzept entwerfen",
    "description": "Geräte nach Funktion und Schutzbedarf segmentieren, VLANs mit eigenen IP-Netzen planen und notwendige Verbindungen ausdrücklich kontrollieren.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__3",
    "week": "KW 39",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "segmentation-design",
      "policy-and-ports"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "69d3ee4eaa834ca3751d47c3eb796de224e1c5d5c011f352468cd54eea6ede1f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "segmentierung-vorteile",
    "slug": "segmentierung-vorteile",
    "title": "Netze sinnvoll segmentieren",
    "description": "Broadcast-Grenzen, Sicherheitszonen, Verwaltbarkeit und QoS als getrennte Wirkungen einer Segmentierung beurteilen und für ein Firmenszenario priorisieren.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__4",
    "week": "KW 39",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "effects-and-limits",
      "segment-design"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "540023d853451405b1cd2ee9796fb52d649775173c254cb8aefc73b23e2dad12",
    "sourceKind": "compact-spec"
  },
  {
    "id": "spanning-tree",
    "slug": "spanning-tree",
    "title": "Spanning Tree vom Loop zum aktiven Pfad",
    "description": "Layer-2-Schleifen erklären, die Root Bridge und Pfadkosten bestimmen sowie Portrollen und Zustände von STP, RSTP und MSTP korrekt einordnen.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__5",
    "week": "KW 39",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "loop-and-variants",
      "tree-calculation"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "4b0fd1ed90b4df9fb599ebba4ca3eb230ab2d8fae197d3e8e237b3223000d75b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "portfast-bpdu-guard",
    "slug": "portfast-bpdu-guard",
    "title": "Edge-Ports mit BPDU-Schutz absichern",
    "description": "Layer-2-Loops als Ausfallkette erklären und Edge-/PortFast-Verhalten sowie BPDU Guard anhand der tatsächlichen Portrolle konservativ auswählen.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__6",
    "week": "KW 39",
    "estimatedMinutes": 23,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "loop-failure-chain",
      "edge-guard-decision"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "7ae9a2d9e4c43cc1082a4c1f3fcc908c5f84fe7dfa590c580dcfd449ab0a463a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "lacp-link-aggregation",
    "slug": "lacp-link-aggregation",
    "title": "LACP-Bündel realistisch dimensionieren",
    "description": "Link Aggregation als logische Verbindung erklären, Kapazität und Ausfallverhalten berechnen sowie den Unterschied zwischen Gesamtbündel und einzelnem Flow anwenden.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__7",
    "week": "KW 39",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "capacity-and-flow",
      "bundle-operation"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "907996d6552bf3c0d9138a23d9117be5e7d9a270bb74e311d807665af7904720",
    "sourceKind": "compact-spec"
  },
  {
    "id": "port-security",
    "slug": "port-security",
    "title": "Port Security als begrenzte Zugangskontrolle planen",
    "description": "Zulässige Quell-MAC-Adressen und Höchstzahlen pro Access-Port ableiten, Verstöße auswerten und die Grenzen einer reinen MAC-Bindung erklären.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__8",
    "week": "KW 39",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "port-policy",
      "security-boundary"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "6a35874589cf24e10e07c9be66ff7a63b13748efaa4d80e136dab4e34dc9ac2d",
    "sourceKind": "compact-spec"
  },
  {
    "id": "port-security-modi",
    "slug": "port-security-modi",
    "title": "Port-Security-Modi betriebssicher unterscheiden",
    "description": "Konfigurierte und sticky gelernte MAC-Adressen, Adresslimits sowie Protect-, Restrict- und Shutdown-Reaktionen anhand eines Betriebsfalls unterscheiden.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__9",
    "week": "KW 39",
    "estimatedMinutes": 24,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "address-mode-choice",
      "violation-response"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "afd9ded9826342037fe4a1068a5773fd11d9b20fbdaa4ca47970ce938d8f0769",
    "sourceKind": "compact-spec"
  },
  {
    "id": "qos-dscp",
    "slug": "qos-dscp",
    "title": "QoS und DSCP ohne falsche Garantien planen",
    "description": "Verkehr klassifizieren, DSCP als Kennzeichnung einem lokalen Per-Hop-Verhalten zuordnen und Priorisierung unter Engpassbedingungen samt Domänengrenzen beurteilen.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__10",
    "week": "KW 39",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dscp-treatment",
      "qos-policy"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "e3e6f4c94ecae0352d633f9cb0f7ca4cea5e69ea3f3223ef23eae602b81aa8e3",
    "sourceKind": "compact-spec"
  },
  {
    "id": "jumbo-frames-oversubscription",
    "slug": "jumbo-frames-oversubscription",
    "title": "Jumbo Frames und Oversubscription getrennt bewerten",
    "description": "Wirksame Path-MTU über alle beteiligten Komponenten bestimmen, Jumbo-Frame-Risiken prüfen und Access-zu-Uplink-Oversubscription samt gleichzeitiger Last berechnen.",
    "domain": "GA2",
    "groupId": "ga2-5",
    "groupLabel": "Block N5 · Switching und VLANs",
    "itemId": "ga2-5__11",
    "week": "KW 39",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "path-mtu",
      "oversubscription-load"
    ],
    "sources": [
      "itlf10-12-2023",
      "itlf6-9-2022"
    ],
    "contentHash": "4d8e5d919766b83cb4f06a53a15ad9c69ca2a726ca82880b40dd090d77cd17f6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "wlan-standards-frequenzen",
    "slug": "wlan-standards-frequenzen",
    "title": "WLAN-Standards und Frequenzbänder sicher auswählen",
    "description": "802.11-Generationen, Frequenzbänder und theoretische Datenraten einordnen und aus einer Anforderung eine belastbare WLAN-Auswahl ableiten.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__0",
    "week": "KW 40",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "standard-classification",
      "standard-selection"
    ],
    "sources": [
      "ihk-bonn",
      "itlf6-9-2022"
    ],
    "contentHash": "91b0f323e4ef65ebf1141102bff31a42634c7375a175bafebda4a624a636615a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "wlan-kanalplanung",
    "slug": "wlan-kanalplanung",
    "title": "WLAN-Kanäle planen, ohne 1/6/11 blind anzuwenden",
    "description": "Kanalbreite, Überlappung und Gleichkanalnutzung unterscheiden und einen belastbaren 2,4- und 5-GHz-Kanalplan entwickeln.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__1",
    "week": "KW 40",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "channel-overlap",
      "channel-plan"
    ],
    "sources": [
      "itlf6-9-2022"
    ],
    "contentHash": "708fff07cada1168a1a07a2663db7b900aa7310d2813fa9e6955947c8b2fc2c1",
    "sourceKind": "compact-spec"
  },
  {
    "id": "wlan-site-survey",
    "slug": "wlan-site-survey",
    "title": "WLAN-Site-Survey von der Prognose zum Lasttest",
    "description": "Virtuelle, passive und aktive Site Surveys unterscheiden, Messwerte korrekt lesen und AP-Positionen nachvollziehbar verbessern.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__2",
    "week": "KW 40",
    "estimatedMinutes": 26,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "survey-methods",
      "survey-decision"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "c3c943cb443365923fd43403a0199fbb125163c86c64df1407ac97c1bd779c96",
    "sourceKind": "compact-spec"
  },
  {
    "id": "wlan-controller",
    "slug": "wlan-controller",
    "title": "WLAN-Controller und Standalone-APs passend betreiben",
    "description": "Aufgaben von Access Point und WLAN-Controller trennen sowie für kleine und größere Funknetze eine begründete Betriebsarchitektur wählen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__3",
    "week": "KW 40",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "controller-functions",
      "controller-selection"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf6-9-2022"
    ],
    "contentHash": "39939b4093a13dc9dcb2ba3cbd402f9930c2c0c26aef30ba8b98eb15ec917402",
    "sourceKind": "compact-spec"
  },
  {
    "id": "wlan-sicherheit",
    "slug": "wlan-sicherheit",
    "title": "WLAN-Sicherheit als mehrschichtiges Profil entwerfen",
    "description": "WPA2 und WPA3, Personal und Enterprise, 802.1X, RADIUS, Gasttrennung und Captive Portal fachlich abgrenzen und kombinieren.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__4",
    "week": "KW 40",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "security-methods",
      "security-profile"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "d38be07543461c22c08ec508955ffe51fcd887f1408960bbfc3dfd40d5efdc3b",
    "sourceKind": "compact-spec"
  },
  {
    "id": "wan-zugangsarten",
    "slug": "wan-zugangsarten",
    "title": "WAN-Zugänge nach Bedarf und Betriebsrisiko auswählen",
    "description": "DSL, Kabel, Glasfaser, Standleitung, Mobilfunk und Richtfunk nicht nur nach Bandbreite, sondern nach Medium, SLA und Ausfallrisiko vergleichen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__5",
    "week": "KW 40",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "wan-access-compare",
      "wan-access-select"
    ],
    "sources": [
      "itlf6-9-2022",
      "it-basiswissen-2012",
      "europa-integratoren-2026"
    ],
    "contentHash": "41d66bb058f60912752de5319a77c41a5e27a4b5d407586f4e1f6ca72c040fce",
    "sourceKind": "compact-spec"
  },
  {
    "id": "mpls-sd-wan",
    "slug": "mpls-sd-wan",
    "title": "MPLS und SD-WAN als Betriebsmodelle vergleichen",
    "description": "Providerbasierte MPLS-Dienste und softwaregesteuerte WAN-Overlays anhand von Pfad, Steuerung, Sicherheit, SLA und Betrieb unterscheiden.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__6",
    "week": "KW 40",
    "estimatedMinutes": 29,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "mpls-sdwan-compare",
      "mpls-sdwan-design"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "46f02664ddd6dbb134a61b052ab9490b5219d6c9deccdee78858064b6f15f321",
    "sourceKind": "compact-spec"
  },
  {
    "id": "provider-redundanz",
    "slug": "provider-redundanz",
    "title": "Provider-Redundanz ohne gemeinsame Fehlerdomäne planen",
    "description": "Dual-WAN, Failover und Active-Active anhand physischer und logischer Abhängigkeiten entwerfen, testen und überwachen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__7",
    "week": "KW 40",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "redundancy-domains",
      "redundancy-validate"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "db8e441d5049255fcd603b8c43922b257419c53e2b5c23933bda16bdea548914",
    "sourceKind": "compact-spec"
  },
  {
    "id": "vpn-arten",
    "slug": "vpn-arten",
    "title": "VPN-Arten nach Endpunkten und Vertrauensgrenze unterscheiden",
    "description": "Site-to-Site, Remote-Access und End-to-End anhand von Tunnelendpunkten, erreichbaren Netzen, Identität und Betriebsverantwortung auswählen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__8",
    "week": "KW 40",
    "estimatedMinutes": 27,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "vpn-types-classify",
      "vpn-type-select"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023",
      "itlf6-9-2022"
    ],
    "contentHash": "e81e9d8b62cc8314510abdb2efffe9ff049b5ee2ceff017a4004ae2ae59fc550",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ipsec",
    "slug": "ipsec",
    "title": "IPsec mit IKE, AH, ESP und Security Associations verstehen",
    "description": "IPsec-Bausteine, Tunnel- und Transportmodus sowie den IKEv2-Aufbau so einordnen, dass Schutzversprechen und Fehlersuche nachvollziehbar werden.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__9",
    "week": "KW 40",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ipsec-components",
      "ipsec-design"
    ],
    "sources": [
      "itlf10-12-2023",
      "ihk-bonn"
    ],
    "contentHash": "da0fa7ebda9f5fd79fe4ada3e5ca1845c82aa3e593b0334e65183ff2208fcb37",
    "sourceKind": "compact-spec"
  },
  {
    "id": "x509-zertifikate",
    "slug": "x509-zertifikate",
    "title": "X.509-Zertifikate und Vertrauenskette prüfen",
    "description": "Zertifikat, privater Schlüssel, CSR, CA und Vertrauenskette auseinanderhalten und einen Zertifikatsfehler systematisch untersuchen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__10",
    "week": "KW 40",
    "estimatedMinutes": 31,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "x509-components",
      "x509-validation"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "4a1887bf2dc7f9db860cfd39c897d63282ee127dc738b7cc973aac70fd0b1413",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ssl-vpn-wireguard",
    "slug": "ssl-vpn-wireguard",
    "title": "TLS-VPN, OpenVPN und WireGuard fachlich vergleichen",
    "description": "Die unscharfe Bezeichnung SSL-VPN einordnen und OpenVPN sowie WireGuard nach Schicht, Identität, Kryptografie und Betriebsmodell auswählen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__11",
    "week": "KW 40",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "vpn-protocol-compare",
      "vpn-protocol-operate"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "b2966d16d56179ce5d3e4bc08c6617b30f9c1e4ce6a668ec21ef43422804f8b0",
    "sourceKind": "compact-spec"
  },
  {
    "id": "split-tunneling",
    "slug": "split-tunneling",
    "title": "Split Tunneling als Routing- und Sicherheitsentscheidung planen",
    "description": "Full Tunnel und Split Tunnel anhand von Routen, DNS, Kontrollpunkten, Bandbreite und lokalen Risiken vergleichen und prüfen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__12",
    "week": "KW 40",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "split-full-compare",
      "split-policy-design"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "474bd4d41faf5c3cc0c2d90ef6d5f5d42cee8ce79136fb1c2e55d807b280a5cf",
    "sourceKind": "compact-spec"
  },
  {
    "id": "sicheres-homeoffice",
    "slug": "sicheres-homeoffice",
    "title": "Sicheres Homeoffice als Ende-zu-Ende-Betrieb entwerfen",
    "description": "Verwaltetes Endgerät, starke Identität, VPN, minimale Rechte, Patchen, Datensicherung und Arbeitsumgebung zu einem prüfbaren Schutzkonzept verbinden.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__13",
    "week": "KW 40",
    "estimatedMinutes": 31,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "homeoffice-controls",
      "homeoffice-response"
    ],
    "sources": [
      "itlf10-12-2023",
      "europa-integratoren-2026"
    ],
    "contentHash": "c16d223ff3fb094130e82a768ea280f4512b9457258d2d867e0ae8897e063f3d",
    "sourceKind": "compact-spec"
  },
  {
    "id": "voip-bandbreite",
    "slug": "voip-bandbreite",
    "title": "VoIP-Bandbreite mit Paket-Overhead und Reserve dimensionieren",
    "description": "Codec-Nutzrate, Paketierungsintervall, RTP/UDP/IP- und Layer-2-Overhead, Gesprächszahl und Reserve in eine nachvollziehbare Bandbreitenplanung übersetzen.",
    "domain": "GA2",
    "groupId": "ga2-6",
    "groupLabel": "Block N6 · WLAN, WAN und VPN",
    "itemId": "ga2-6__14",
    "week": "KW 40",
    "estimatedMinutes": 33,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "voip-bandwidth-model",
      "voip-bandwidth-calculate"
    ],
    "sources": [
      "ihk-bonn",
      "itlf10-12-2023"
    ],
    "contentHash": "6923e3c02fb516e3eeb7f1dd7e03160a35afd21feeb74eeff3ae591c235e523c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "firewall-typen",
    "slug": "firewall-typen",
    "title": "Firewalltypen nach ihrer Prüftiefe auswählen",
    "description": "Paketfilter, Stateful Inspection, Application Gateway und NGFW anhand konkreter Sicherheitsfragen unterscheiden.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__0",
    "week": "KW 42",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "prueftiefe",
      "schutzgrenze"
    ],
    "sources": [
      "ihk-bonn",
      "itlf10-12-2023"
    ],
    "contentHash": "dcbca0a798c4546cc86657c58fdec9e8a20f7805b4141bacbe7083c1ae7c1a27",
    "sourceKind": "compact-spec"
  },
  {
    "id": "firewall-regelwerk",
    "slug": "firewall-regelwerk",
    "title": "Aus einer Kommunikationsmatrix Firewallregeln ableiten",
    "description": "Quelle, Ziel, Protokoll, Port und Aktion aus einem Szenario bestimmen und positive sowie negative Testfälle planen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__1",
    "week": "KW 42",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "regel-ableiten",
      "regel-pruefen"
    ],
    "sources": [
      "itlf10-12-2023",
      "ihk-bonn"
    ],
    "contentHash": "e72f5c69e06bdfb5275bf153ec74e5f10f1fdffa4232eed33ce79cb73db62437",
    "sourceKind": "compact-spec"
  },
  {
    "id": "default-deny-regelreihenfolge",
    "slug": "default-deny-regelreihenfolge",
    "title": "Default Deny und die erste passende Regel",
    "description": "First-Match-Regelwerke Schritt für Schritt auswerten, Verschattung erkennen und Änderungen nachvollziehbar pflegen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__2",
    "week": "KW 42",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "default-deny",
      "first-match"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "159fa56c504e4266be03c476f5d38071bb500ba24af1720f7c8791df7e699c0f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "dmz-architektur",
    "slug": "dmz-architektur",
    "title": "Eine DMZ über Vertrauensgrenzen entwerfen",
    "description": "Ein- und Zwei-Firewall-DMZ vergleichen, Dienste platzieren und einen kompromittierten DMZ-Host begrenzen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__3",
    "week": "KW 42",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "dmz-aufbau",
      "dmz-freigabe"
    ],
    "sources": [
      "europa-integratoren-2026",
      "itlf10-12-2023"
    ],
    "contentHash": "f8f3069b462aac956462c71dd0b240815afb3e2abf930d1138b66487dbe4e2d4",
    "sourceKind": "compact-spec"
  },
  {
    "id": "zero-trust-segmentierung",
    "slug": "zero-trust-segmentierung",
    "title": "Zero Trust und Mikrosegmentierung am Zugriff erklären",
    "description": "Schutzbedarf, Identität und Gerätezustand in eine minimale Zugriffsentscheidung übersetzen und Segmentierung richtig einordnen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__4",
    "week": "KW 42",
    "estimatedMinutes": 31,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zt-unterscheiden",
      "zt-entscheiden"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "d1983c76167fc29217f479842f209806712f71802cdc7d9d1cc5862f4b908ba5",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ids-ips",
    "slug": "ids-ips",
    "title": "IDS und IPS mit Fehlalarmen sinnvoll betreiben",
    "description": "Erkennung und Blockierung, Netz- und Hostsensoren sowie False Positives in einem Betriebsfall beurteilen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__5",
    "week": "KW 42",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "sensorwahl",
      "alarmbewertung"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "108f7a7622b684cbdf4396c9d5bd582698d442af8e63ea9bd589f34ea0a9e6f7",
    "sourceKind": "compact-spec"
  },
  {
    "id": "nac-8021x",
    "slug": "nac-8021x",
    "title": "Netzzugang mit NAC und 802.1X steuern",
    "description": "Supplicant, Switch und RADIUS unterscheiden und sichere Freigabe- und Quarantäneregeln begründen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__6",
    "week": "KW 42",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rollen",
      "zugangsentscheidung"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "e7c3444c43e65a0456f182a4f5a6bb307b58529157ae62df3099ac346857bf1a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "acl-vs-firewall",
    "slug": "acl-vs-firewall",
    "title": "ACLs und Firewalls am richtigen Prüfpunkt einsetzen",
    "description": "Paketfilter, Verbindungszustand und Richtung im Inter-VLAN-Verkehr unterscheiden.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__7",
    "week": "KW 42",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "kontrollziel",
      "filterpunkt"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "bd3ce414137ab25915094fdce6ff67b0242717bb7c4ac8aacd15a545f1beb436",
    "sourceKind": "compact-spec"
  },
  {
    "id": "reverse-proxy-waf",
    "slug": "reverse-proxy-waf",
    "title": "Reverse Proxy, WAF und Load Balancer unterscheiden",
    "description": "TLS-Grenzen, Inhaltsprüfung und Lastverteilung an einer Webarchitektur erklären.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__8",
    "week": "KW 42",
    "estimatedMinutes": 25,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "rollen",
      "vertrauensgrenzen"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "85b1e16501c2b9b08d85c1cfb65edaf448db8d07d657c97e2c02399fb4e28f2f",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzwerkangriffe",
    "slug": "netzwerkangriffe",
    "title": "Netzwerkangriffe anhand von Belegen unterscheiden",
    "description": "Sieben Angriffsarten nach Mechanismus, Voraussetzung und betroffener Sicherheitswirkung einordnen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__9",
    "week": "KW 42",
    "estimatedMinutes": 35,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "mechanismus",
      "beleg"
    ],
    "sources": [
      "itlf6-9-2022"
    ],
    "contentHash": "61db6c47b2daf647537496d95eb9666d1b9a144238ab3b82b6a061a3ff9c8f67",
    "sourceKind": "compact-spec"
  },
  {
    "id": "angriffsgegenmassnahmen",
    "slug": "angriffsgegenmassnahmen",
    "title": "Gegenmaßnahmen mit Wirkung und Restrisiko begründen",
    "description": "Zu jedem Netzwerkangriff einen passenden Kontrollpunkt, eine Gegenprobe und eine Grenze benennen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__10",
    "week": "KW 42",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zuordnung",
      "wirksamkeit"
    ],
    "sources": [
      "itlf6-9-2022",
      "itlf10-12-2023"
    ],
    "contentHash": "07b6b50f0c6ce3ab53686ed1004471270dac2f47abf0bea386f60e887346b9cf",
    "sourceKind": "compact-spec"
  },
  {
    "id": "sichere-netzprotokolle",
    "slug": "sichere-netzprotokolle",
    "title": "Unsichere Protokolle durch geprüfte sichere Verbindungen ersetzen",
    "description": "TLS, SSH, Zertifikatsprüfung und HSTS im Migrationsfall richtig einsetzen.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__11",
    "week": "KW 42",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ersatz",
      "validierung"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "762d4578467959b8875a5db6debb1f00be527933af9660c187e372b0ae7d7a4c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzwerk-logging-datenschutz",
    "slug": "netzwerk-logging-datenschutz",
    "title": "Netzwerkprotokollierung zweckgebunden planen",
    "description": "Ein Logging-Konzept mit Datenminimierung, Löschung, Zugriffsschutz und Mitbestimmungsprüfung entwickeln.",
    "domain": "GA2",
    "groupId": "ga2-7",
    "groupLabel": "Block N7 · Netzwerksicherheit",
    "itemId": "ga2-7__12",
    "week": "KW 42",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-12.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "konzept",
      "speicherbedarf"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "a59975d8083d2c0e5f49c39d2d5b1ce6d9b391ff10dc3d30c3eacbd5b9423a51",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzwerkredundanz",
    "slug": "netzwerkredundanz",
    "title": "Netzwerkredundanz bis zum Ausfallfall planen",
    "description": "Doppelte Uplinks, Ringstrukturen und N+1 nach verbleibender Kapazität und gemeinsamen Fehlern beurteilen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__0",
    "week": "KW 44",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ausfallwege",
      "restkapazitaet"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "b00993981e548433cd9bd42aa66b429ac77bd3a02ce09a76c7321747fd996219",
    "sourceKind": "compact-spec"
  },
  {
    "id": "vrrp-hsrp",
    "slug": "vrrp-hsrp",
    "title": "Gateway-Failover mit VRRP und HSRP erklären",
    "description": "Virtuelle IP/MAC, Priorität, Ausfallerkennung und Grenzen der Gateway-Redundanz nachvollziehen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__1",
    "week": "KW 44",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "failover",
      "grenzen"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "2bd7aa997dbb1df8d468f17d982b5f65ba28823e2de64f7780a94eace6709de6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "verfuegbarkeit-berechnen",
    "slug": "verfuegbarkeit-berechnen",
    "title": "Verfügbarkeit und Ausfallzeit sauber berechnen",
    "description": "Zeitanteile, Reihensysteme und unabhängige Parallelpfade mit klaren Annahmen berechnen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__2",
    "week": "KW 44",
    "estimatedMinutes": 38,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "modell",
      "ausfallzeit",
      "reihe",
      "parallel"
    ],
    "sources": [
      "itlf6-9-2022",
      "itlf10-12-2023"
    ],
    "contentHash": "3094689030e5477dc00cc44340da4cfa4dae564c67b1aa6cff72b65feaad36df",
    "sourceKind": "compact-spec"
  },
  {
    "id": "single-points-of-failure",
    "slug": "single-points-of-failure",
    "title": "Single Points of Failure im Netzplan finden",
    "description": "Dienstabhängigkeiten verfolgen und gemeinsame technische oder organisatorische Ausfallpunkte erkennen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__3",
    "week": "KW 44",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "spof",
      "massnahme"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "9f0274dab37886b600033669714938dc5ff86922dda223f44730215551862d3c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "usv-technikraum",
    "slug": "usv-technikraum",
    "title": "USV und Technikraum für den Dienst auslegen",
    "description": "Watt, VA, Laufzeit und Wärmeabfuhr zusammen betrachten, statt nur die USV-Nennzahl zu vergleichen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__4",
    "week": "KW 44",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "auslegung",
      "leistung"
    ],
    "sources": [
      "europa-integratoren-2026"
    ],
    "contentHash": "1da9756f4c637038b7c3ac564926ef31a2885ba5cee7c75e77ab90ecb18c422d",
    "sourceKind": "compact-spec"
  },
  {
    "id": "sla-netzdienste",
    "slug": "sla-netzdienste",
    "title": "Netzdienste mit messbaren SLA-Zielen vereinbaren",
    "description": "Verfügbarkeit, Reaktionszeit, Wiederherstellung und vereinbarte Folgen einer Abweichung getrennt beurteilen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__5",
    "week": "KW 44",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "zeiten",
      "budget"
    ],
    "sources": [
      "itlf6-9-2022",
      "europa-integratoren-2026"
    ],
    "contentHash": "8c48228725c973bcfb527063071b69f7231e08562b9e525acccb49b591842c21",
    "sourceKind": "compact-spec"
  },
  {
    "id": "snmp-netflow-syslog",
    "slug": "snmp-netflow-syslog",
    "title": "Monitoringquellen zu einer brauchbaren Alarmierung verbinden",
    "description": "SNMP, Flowdaten und Syslog nach Aussage, Grenzen und Alarmierungsaufgabe auswählen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__6",
    "week": "KW 44",
    "estimatedMinutes": 32,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "datenquellen",
      "alarmierung"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "cb176cefe74f3492584fb85e95d237124f614f6594d0c42992a9f0e7478aba1a",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzwerk-messwerte",
    "slug": "netzwerk-messwerte",
    "title": "Netzwerkmesswerte korrekt lesen und berechnen",
    "description": "Auslastung, Fehlerzähler, Latenz, Verlust und Jitter mit Messfenster und Aussagegrenzen einordnen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__7",
    "week": "KW 44",
    "estimatedMinutes": 40,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "interpretation",
      "auslastung",
      "verlust"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "e2d8c68c29798e14b34d367d2b00fbcd08d1fa7215bb3cf1eafc6d1a5e9fa0f2",
    "sourceKind": "compact-spec"
  },
  {
    "id": "monitoring-trendanalyse",
    "slug": "monitoring-trendanalyse",
    "title": "Kapazität aus Trends rechtzeitig planen",
    "description": "Vergleichbare Lastreihen beurteilen und den Zeitpunkt einer Kapazitätsmaßnahme berechnen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__8",
    "week": "KW 44",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "cfdbc1a885effb74f12fb4da8d5dd03e326fca7c89378538ab4d8348b116de20",
    "sourceKind": "compact-spec"
  },
  {
    "id": "systematische-netzfehlersuche",
    "slug": "systematische-netzfehlersuche",
    "title": "Netzfehler mit prüfbaren Hypothesen eingrenzen",
    "description": "Schichtenbezogene Tests auswählen und Beobachtung, Vermutung und bestätigte Ursache sauber trennen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__9",
    "week": "KW 44",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "30fc2c7152e89c73e44c8bbcce02d6ed99b9717f2438a9d4f6b03783bbab0ab7",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzwerk-diagnosewerkzeuge",
    "slug": "netzwerk-diagnosewerkzeuge",
    "title": "Für jede Netzwerkfrage das passende Werkzeug",
    "description": "Konfiguration, Namensauflösung, Pfad, Nachbarn und Dienstverbindungen mit passenden Werkzeugen untersuchen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__10",
    "week": "KW 44",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "it-basiswissen-2012"
    ],
    "contentHash": "35be828559ee9861d9d1df263ed46c94738283d89d97a69433d49a7f8d9c95a7",
    "sourceKind": "compact-spec"
  },
  {
    "id": "wireshark",
    "slug": "wireshark",
    "title": "Paketmitschnitte lesen, filtern und begründet auswerten",
    "description": "Capture- und Displayfilter unterscheiden und aus einer Paketfolge nur belegbare Aussagen ableiten.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__11",
    "week": "KW 44",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "64a4fdddbffa3f31fcf7a443aef48aaf8007c73fcc7ee72c5b3ce501e8ec296c",
    "sourceKind": "compact-spec"
  },
  {
    "id": "span-mirror-port",
    "slug": "span-mirror-port",
    "title": "Mit SPAN den richtigen Verkehr sichtbar machen",
    "description": "Spiegelquelle, Richtung und Analyseport auswählen und Grenzen eines Mitschnitts erkennen.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__12",
    "week": "KW 44",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "25bf2491d52b3635e8c9a13ac35063e5f9ad4f0233babb1637088d850d59ffff",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzdokumentation",
    "slug": "netzdokumentation",
    "title": "Netzdokumentation als verlässliche Betriebshilfe",
    "description": "Physische und logische Netzinformationen verknüpfen und Änderungen nachvollziehbar übergeben.",
    "domain": "GA2",
    "groupId": "ga2-8",
    "groupLabel": "Block N8 · Verfügbarkeit, Monitoring und Fehlersuche",
    "itemId": "ga2-8__13",
    "week": "KW 44",
    "estimatedMinutes": 30,
    "relevance": "hoch",
    "contentRevision": "2026-09-13.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "itlf10-12-2023"
    ],
    "contentHash": "6e37da92b01b056fe14d1959f85dc15884b02a8c9a532cf6ebdaed69b21bd346",
    "sourceKind": "compact-spec"
  },
  {
    "id": "netzplan-pruefungsanalyse",
    "slug": "netzplan-pruefungsanalyse",
    "title": "Netzpläne lesen und Annahmen sichtbar machen",
    "description": "Vorgaben, abgeleitete Aussagen und offene Annahmen in einem Netzplan unterscheiden; aus Netzplan und Aufgabenwortlaut einen passenden Lösungsansatz wählen.",
    "domain": "GA2",
    "groupId": "ga2-9",
    "groupLabel": "Prüfungstechnik GA2",
    "itemId": "ga2-9__0",
    "week": "KW 45–47",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "ihk-bonn"
    ],
    "contentHash": "e8beb51028de4a34b92121121eea431c04a5963031b6d06abfaf5a11a2362fe9",
    "sourceKind": "compact-spec"
  },
  {
    "id": "subnetting-rechenweg",
    "slug": "subnetting-rechenweg",
    "title": "Subnetting mit prüfbarem Rechenweg lösen",
    "description": "einen nachvollziehbaren IPv4-Subnetting-Ansatz samt Plausibilitätsprüfung beurteilen; für einen gegebenen Hostbedarf die kleinste passende Präfixlänge berechnen.",
    "domain": "GA2",
    "groupId": "ga2-9",
    "groupLabel": "Prüfungstechnik GA2",
    "itemId": "ga2-9__1",
    "week": "KW 45–47",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "ihk-bonn"
    ],
    "contentHash": "02a9e4cdd0d94283750e5fd786a09eba3003b9e200795359eb6d0c8691812276",
    "sourceKind": "compact-spec"
  },
  {
    "id": "konfiguration-beschreiben",
    "slug": "konfiguration-beschreiben",
    "title": "Konfigurationen aufgabengerecht beschreiben",
    "description": "das geforderte Antwortformat aus der Aufgabenstellung ableiten; eine vollständige nachvollziehbare Konfigurationsbeschreibung beurteilen.",
    "domain": "GA2",
    "groupId": "ga2-9",
    "groupLabel": "Prüfungstechnik GA2",
    "itemId": "ga2-9__2",
    "week": "KW 45–47",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "ihk-bonn"
    ],
    "contentHash": "3196f3d8ec604b46a9529867da43f4c35a219fda8a69df12148015b81cc3d3fe",
    "sourceKind": "compact-spec"
  },
  {
    "id": "alternativen-bewerten",
    "slug": "alternativen-bewerten",
    "title": "Alternativen anhand von Anforderungen bewerten",
    "description": "Musskriterien vor einer gewichteten Bewertung anwenden; eine Entscheidung mit fallbezogenen Vor- und Nachteilen begründen.",
    "domain": "GA2",
    "groupId": "ga2-9",
    "groupLabel": "Prüfungstechnik GA2",
    "itemId": "ga2-9__3",
    "week": "KW 45–47",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "ihk-bonn"
    ],
    "contentHash": "01927d924cd3c6d890f0b51c95bc9bea3eabd059366846c1e7082ae2e20928c6",
    "sourceKind": "compact-spec"
  },
  {
    "id": "ga2-zeitmanagement",
    "slug": "ga2-zeitmanagement",
    "title": "Prüfungszeit nach Aufgaben und Reserve planen",
    "description": "einen anpassbaren Zeitplan statt starrer Minutenregeln beurteilen; aus Gesamtzeit, Reserve und Aufgabengewicht ein Zeitbudget berechnen.",
    "domain": "GA2",
    "groupId": "ga2-9",
    "groupLabel": "Prüfungstechnik GA2",
    "itemId": "ga2-9__4",
    "week": "KW 45–47",
    "estimatedMinutes": 28,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.2",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "ihk-bonn"
    ],
    "contentHash": "dc3b4aab34e69131db3a8210e56a7e08c0fca0e9ae25e1c3398132b1a59d4b49",
    "sourceKind": "compact-spec"
  },
  {
    "id": "subnetting-priorisieren",
    "slug": "subnetting-priorisieren",
    "title": "Aufgabenreihenfolge bewusst wählen",
    "description": "eine Aufgabenreihenfolge nach Sicherheit, Aufwand und Abhängigkeiten auswählen; bei einer Blockade sinnvoll wechseln und den Wiedereinstieg sichern.",
    "domain": "GA2",
    "groupId": "ga2-9",
    "groupLabel": "Prüfungstechnik GA2",
    "itemId": "ga2-9__5",
    "week": "KW 45–47",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-14.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "ziel-0",
      "ziel-1"
    ],
    "sources": [
      "ihk-bonn"
    ],
    "contentHash": "6ed13b658edf93639c8812684cb3eec82778b88d1eb7c193c7ec49408d5636fb",
    "sourceKind": "compact-spec"
  },
  {
    "id": "company-goals",
    "slug": "company-goals",
    "title": "Unternehmensziele und Zielkonflikte sicher abwägen",
    "description": "Ökonomische, ökologische und soziale Unternehmensziele unterscheiden, ihre Wechselwirkungen analysieren und Zielkonflikte in betrieblichen Fällen begründet lösen.",
    "domain": "WiSo",
    "groupId": "wiso-6",
    "groupLabel": "W6 · Betrieb, Organisation und Rechtsformen",
    "itemId": "wiso-6__2",
    "week": "KW 40",
    "estimatedMinutes": 22,
    "relevance": "hoch",
    "contentRevision": "2026-09-11.1",
    "contentStatus": "CURATED_DRAFT",
    "learningObjectives": [
      "classify-goals",
      "resolve-conflicts"
    ],
    "sources": [
      "europa-integratoren-2026",
      "it-basiswissen-2012",
      "itlf10-12-2023"
    ],
    "contentHash": "23bdc02f641fdd26e9a4651a612a397c4e68435d45f13e812994b88b6d658593",
    "sourceKind": "legacy-markdown"
  }
]);

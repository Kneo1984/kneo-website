=========================================================
AUTO_DASH_CORALS    automatischer Pipeline-Output
=========================================================

 erzeugt durch     : auto_dash_monster.ps1
 Quelle            : MySQL-Datenbank 'abschlussprojekt'
 Workflow          :
  1. CSV-Export (MySQL CLI)
  2. Power BI Refresh & PDF-Export
  3. PDF  PNG (Ghostscript)
  4. PNG  PPTX (PowerPoint COM)

Alle Zwischenergebnisse (CSV/PDF/PNG/PPTX) liegen in
diesem Ordner und werden bei jedem Lauf überschrieben.

(Autor: Dennis Maier    Abschlussprojekt 2025)

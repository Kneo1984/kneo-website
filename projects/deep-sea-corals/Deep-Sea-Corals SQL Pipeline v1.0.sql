


-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 0 │ Datenbank bereitstellen            ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
CREATE DATABASE IF NOT EXISTS abschlussprojekt;   -- Falls noch nicht da: leeres Bühnenbild
USE abschlussprojekt;                             -- Ab hier spielen wir nur noch hier drin



-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 1 │ ERSTE ORIENTIERUNG – Wie groß ist der Ozean?             ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
SELECT COUNT(*) AS total_rows FROM corals;        -- Quick-Scan: Zeilen zählen, Größenordnung fühlen



-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 2 │ ROHREINIGUNG – Strings trimmen, Platzhalter setzen       ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
SET @OLD_SAFE := @@SQL_SAFE_UPDATES;              -- Aktuellen Safe-Update-Status merken
SET SQL_SAFE_UPDATES = 0;                         -- Bremse lösen (sonst Error 1175 bei Massen-Update)

UPDATE corals
SET
    -- Leere/blanke Strings bekommen sprechende Defaults,
    -- Trim() schneidet überzählige Leerzeichen weg.
    Station        = COALESCE(NULLIF(TRIM(Station)       , ''), 'Unknown Station'),
    SurveyID       = COALESCE(NULLIF(TRIM(SurveyID)      , ''), 'Unknown Survey'),
    Locality       = COALESCE(NULLIF(TRIM(Locality)      , ''), 'Unspecified'),
    EventID        = COALESCE(NULLIF(TRIM(EventID)       , ''), 'No Event'),
    ScientificName =               TRIM(ScientificName);

SET SQL_SAFE_UPDATES = @OLD_SAFE;                 -- Sicherheitsgurt wieder anlegen



-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 3 │ STAGE – Einmaliges Parsing & Casting                     ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
DROP TABLE IF EXISTS corals_stage;                -- Idempotent: alte Stage killen

CREATE TABLE corals_stage AS
SELECT
    /*──── Datum harmonisieren – drei Formate anerkennen ────*/
    CASE
        WHEN ObservationDate REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
             THEN STR_TO_DATE(ObservationDate,'%Y-%m-%d')                -- ISO
        WHEN ObservationDate REGEXP '^[0-9]{4}$'
             THEN STR_TO_DATE(CONCAT(ObservationDate,'-01-01'),'%Y-%m-%d')-- Nur Jahr → 1 Jan
        WHEN ObservationDate REGEXP '^[0-9]{2}/[0-9]{2}/[0-9]{4}$'
             THEN STR_TO_DATE(ObservationDate,'%m/%d/%Y')                -- US-Slashes
        ELSE NULL
    END                                AS parsed_date,

    /*──── Koordinaten & Tiefe validieren + in Zahl gießen ────*/
    CASE WHEN latitude  REGEXP '^-?[0-9]+(\\.[0-9]+)?$'                  THEN latitude  + 0 END AS lat_num,
    CASE WHEN longitude REGEXP '^-?[0-9]+(\\.[0-9]+)?$'                  THEN longitude + 0 END AS lon_num,
    CASE WHEN DepthInMeters REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
           AND DepthInMeters <> '-999.0'                                  THEN DepthInMeters + 0 END AS depth_num,

    /*──── Meta spalten-1:1 durchreichen ────*/
    Station, SurveyID, Locality, EventID, ScientificName
FROM corals
WHERE   -- Nur Zeilen mit brauchbarem Datum + Koordinaten
      (ObservationDate REGEXP '^[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?$'
       OR ObservationDate REGEXP '^[0-9]{2}/[0-9]{2}/[0-9]{4}$')
  AND latitude  REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
  AND longitude REGEXP '^-?[0-9]+(\\.[0-9]+)?$';



-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 4 │ CLEAN – Die goldene Faktentabelle für BI                 ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
DROP TABLE IF EXISTS corals_clean;                -- Sauberer Neubeginn

CREATE TABLE corals_clean AS
SELECT
    UUID()                               AS row_id,          -- Surrogat-PK  (weltweit eindeutig)
    parsed_date                          AS obs_date,
    YEAR(parsed_date)                    AS obs_year,        -- Zeit-Dimensionen
    MONTH(parsed_date)                   AS obs_month,
    (YEAR(parsed_date) DIV 10)*10        AS obs_decade,

    lat_num                              AS latitude,        -- bereits gecastet
    lon_num                              AS longitude,
    depth_num                            AS depth_m,

    /*──── Ozean-Tiefenzonen für schnelle Visuals ────*/
    CASE
        WHEN depth_num BETWEEN    0 AND    99.999 THEN '0–100 m'
        WHEN depth_num BETWEEN  100 AND   499.999 THEN '100–500 m'
        WHEN depth_num BETWEEN  500 AND   999.999 THEN '500–1000 m'
        WHEN depth_num BETWEEN 1000 AND  2999.999 THEN '1000–3000 m'
        WHEN depth_num BETWEEN 3000 AND  5999.999 THEN '3000–6000 m'
        WHEN depth_num BETWEEN 6000 AND 10999.999 THEN '6000–11000 m'
        ELSE NULL
    END                                   AS depth_zone,

    -- Original-Metadaten unverändert
    Station, SurveyID, Locality, EventID, ScientificName
FROM corals_stage
WHERE parsed_date IS NOT NULL                  -- Safety-Net: keine Null-Dates
  AND lat_num    IS NOT NULL
  AND lon_num    IS NOT NULL;



-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 5 │ TURBO – Indexe für blitzschnelles Dashboard              ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
ALTER TABLE corals_clean
    ADD PRIMARY KEY (row_id),                 -- Cluster-Key
    ADD INDEX idx_year       (obs_year),      -- Time-Slicing
    ADD INDEX idx_depth_zone (depth_zone),    -- Zonen-Filter
    ADD INDEX idx_species    (ScientificName(100)); -- Teil-Index reicht



-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 6 │ POWER-VIEWS – Vorgekaute Query-Snacks für Power BI       ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
CREATE OR REPLACE VIEW v_yearly_counts AS        -- 📈 Line-Chart: Beobachtungen pro Jahr
SELECT obs_year AS year, COUNT(*) AS observations
FROM corals_clean
GROUP BY obs_year
ORDER BY obs_year;

CREATE OR REPLACE VIEW v_depthzone_counts AS     -- 📊 Säulen: Vorkommen je Tiefenzone
SELECT depth_zone, COUNT(*) AS observations
FROM corals_clean
GROUP BY depth_zone
ORDER BY FIELD(depth_zone,
               '0–100 m','100–500 m','500–1000 m',
               '1000–3000 m','3000–6000 m','6000–11000 m');

CREATE OR REPLACE VIEW v_top10_species AS        -- 🏆 Hitliste der Arten
SELECT ScientificName, COUNT(*) AS observations
FROM corals_clean
GROUP BY ScientificName
ORDER BY observations DESC
LIMIT 10;

CREATE OR REPLACE VIEW v_top20_species_depth AS  -- 🎯 Box/Scatter-Basis: Tiefe vs. Top-20-Arten
WITH ranked AS (
    SELECT ScientificName
    FROM corals_clean
    GROUP BY ScientificName
    ORDER BY COUNT(*) DESC
    LIMIT 20
)
SELECT cc.*
FROM corals_clean cc
JOIN ranked r USING (ScientificName);

CREATE OR REPLACE VIEW v_map_sample AS           -- 🌎 1 000 Zufalls-Punkte für Karten-Plot
SELECT *
FROM corals_clean
ORDER BY RAND()
LIMIT 1000;



-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ 7 │ VALIDIERUNG – Schneller Smoke-Test                       ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
SELECT
    COUNT(*)                                           AS anzahl_zeilen,
    COUNT(*) - COUNT(Station)        AS fehlende_station,
    COUNT(*) - COUNT(SurveyID)       AS fehlende_surveyid,
    COUNT(*) - COUNT(Locality)       AS fehlende_locality,
    COUNT(*) - COUNT(EventID)        AS fehlende_eventid,
    COUNT(*) - COUNT(ScientificName) AS fehlende_art
FROM corals;                                          -- Blick zurück auf Raw: Wie viel Müll blieb?

SELECT COUNT(*) AS fehlende_art_final
FROM corals
WHERE ScientificName IS NULL OR TRIM(ScientificName)='';



/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EPILOG  –  Ab hier kann Power BI direkt andocken:
             corals_clean + alle Views laden, Visuals bauen,
             Kaffee holen – Dashboard fertig.

  Mission complete – der Tiefsee-Datensatz
                 glänzt wie eine frisch geputzte Perle.“ 🐚
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

-- Sicherheitsmodus kurzzeitig deaktivieren
SET SQL_SAFE_UPDATES = 0;

-- Update wie geplant durchführen
UPDATE corals
SET ScientificName = 'Unidentified sp.'
WHERE ScientificName IS NULL OR TRIM(ScientificName) = '';

-- Sicherheitsmodus wieder aktivieren (Best Practice)
SET SQL_SAFE_UPDATES = 1;

# Deep-Sea-Corals ist nun vollständig gereinigt, geprüft und einsatzbereit für BI, Forschung oder KI-Training.
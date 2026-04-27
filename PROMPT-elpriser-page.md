# Prompt: Byg forsiden (index.astro)

Læs CLAUDE.md først — den indeholder hele tech stacken, datamodellen, filstrukturen og performance-kravene.

## Opgaven

Byg forsiden (`src/pages/index.astro`) og alle nødvendige komponenter, layouts, mock-data og styles til Tjekelpris.dk. Forsiden er landingssiden og det primære konverteringspunkt — den skal vise en hero-sektion med prissammenligning integreret direkte, så brugeren ser elaftaler med det samme.

## Design-tilgang

Jeg vedhæfter to reference-billeder. Designet skal kombinere de to tilgange:

- **[Billede 1]** — Topliste-layout (forsikringssammenligning). Brug dette som reference for **resultatlisten**. Hver aftale vises som én horisontal række/kort med: udbydernavn + logo, nøgletal (øre/kWh + kr./md.), synlig CTA-knap ("Gå til udbyder ↗"), og en chevron til at ekspandere detaljer. CTA-knappen skal være synlig på HVER række uden interaktion.

- **[Billede 2]** — Filterbar-layout (energi-sammenligning). Brug dette som reference for **filtreringen**. Top-sektion med presets for boligtype (Lejlighed ~2.000 kWh / Hus ~4.000 kWh / Stort hus ~6.000 kWh) + postnummer-input. Herunder en horisontal filterbar med dropdowns (Pristype, Afregning, Binding, Tilbud). Filtrene er valgfrie — brugeren skal IKKE udfylde noget for at se resultater.

## CRO-krav (konverteringsoptimering)

Den primære KPI er **klik-volumen** (affiliate-klik til udbyder). Designet skal optimeres til dette:

1. **Resultater synlige med det samme** — Vis en default-liste baseret på 4.000 kWh (standardforbrug) ved page load, FØR brugeren interagerer med filtre. Postnummer og filtre raffinerer listen, men er ikke en forudsætning.

2. **CTA dominerer visuelt** — "Gå til udbyder ↗"-knappen skal være det mest fremtrædende element pr. række. Brug brand-accentfarven (lilla/violet). Knappen skal være stor nok til mobil-tryk.

3. **Boligtype-presets i stedet for kWh-input** — Vis 3 klikbare presets: Lejlighed (2.000 kWh), Hus (4.000 kWh, default/pre-selected), Stort hus (6.000 kWh). Vis også et lille "Indtast selv"-felt til custom kWh.

4. **Filtrering er valgfri raffinering** — Horizontal filterbar med dropdowns. De fleste brugere vil aldrig røre dem, og det er OK.

5. **Default-sortering: billigste først** — Sortér efter anslået månedspris (lavest først). Position bias giver flest klik på de øverste resultater.

6. **Detaljer er sekundære** — Chevron/accordion til at vise detaljer (strømomkostning, abonnement, introtilbud, features) pr. aftale. Aldrig vist by default.

7. **Minimal friktion** — Ingen "Beregn"-knap. Filtre opdaterer listen instant. Ingen modals eller multi-step flows.

## Resultat-kort (hver aftale-række)

Hver række skal indeholde:

```
[Logo]  Produktnavn              Spotpris        Anslået pris       [Gå til udbyder ↗]  [v]
        Udbydernavn              X,XX øre/kWh    XXX kr./md.
        [Verificeret] [Ingen binding] [Variabel] [Introtilbud]
```

- **Logo**: Udbyderens logo (brug placeholder i mock-data)
- **Produktnavn + udbydernavn**: Tydeligt hierarki (produkt = primær, udbyder = sekundær)
- **Spotpris**: øre/kWh, vises som sekundær metric
- **Anslået månedspris**: kr./md., vises som primær/stor metric (det brugeren sammenligner på)
- **Tags/badges**: Verificeret (grøn), Introtilbud, Ingen binding, Pristype (Variabel/Fast), Afregning (Aconto/Faktisk forbrug) — som små pills/badges
- **CTA**: "Gå til udbyder ↗" — accent-farvet knap, synlig uden scroll eller interaktion
- **Ekspander-chevron**: Klik for at vise detaljer

### Ekspanderet detalje-panel

Når brugeren klikker chevron:

```
Strøm (4.000 kWh × 1,29 kr.)          5.169 kr.
Abonnement (17 kr. × 12 md.)             204 kr.
Introtilbud                              −373 kr.
──────────────────────────────────────────────────
Anslået årspris                         5.000 kr.

Priserne er senest hentet d. XX. måned 2026.
                                    [Gå til udbyder ↗]
```

## Mock-data

Opret `src/lib/mock-data.ts` med mindst 10 realistiske danske elaftaler. Brug datamodellen fra CLAUDE.md (electricity_providers + electricity_products tabellerne). Eksempler på udbydere: OK, Modstrøm, DCC Energi, Vindstød, EWII, Norlys, Ørsted, Clever, NRGi, Andel Energi.

Variér data realistisk:
- Spotpris: 0,50 – 5,00 øre/kWh
- Abonnement: 0 – 39 kr./md.
- Binding: 0, 3, 6 eller 12 måneder
- Pristype: variabel og fast
- Afregning: aconto og faktisk forbrug
- Introtilbud: nogle har det, nogle har det ikke
- Grøn energi: blandet

## Tekniske krav

- Følg CLAUDE.md's arkitektur og filstruktur præcist
- **Zero client-side JS** undtagen til filtrering/sortering (brug vanilla JS `<script>` tag, ikke et framework)
- Server-render al HTML, enhancé med JS for interaktivitet
- Tailwind CSS v4 til styling
- Responsivt: Mobil-first. På mobil stacker kolonnerne vertikalt, CTA forbliver synlig
- Semantic HTML med korrekt heading-hierarki
- Dark mode via `prefers-color-scheme`
- Danish number formatting (komma som decimalseparator, punktum som tusindtalsseparator)
- Opret også BaseLayout.astro, Header.astro, Footer.astro og SEOHead.astro hvis de ikke eksisterer
- Tilføj JSON-LD `ItemList` af `Product` entries til siden
- Tilføj passende `<title>`, `<meta description>`, og OG tags

## Vigtigt

- Byg ALLE nødvendige filer for at siden fungerer (layout, komponenter, styles, mock-data, global CSS med font-face osv.)
- Siden skal kunne køre med `npm run dev` efter implementering
- Prioritér at det ser professionelt og tillidsfuldt ud — dette er en finansiel sammenligningstjeneste

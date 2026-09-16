# Circular economy: audience, evidence and editorial decisions

## Objective

Help a business sponsor recognize a specific operational problem, inspect a closely related implementation, and involve the right colleagues in a scoping conversation. FDTI sells custom software and integration work, not a packaged industry SaaS.

This is a working segmentation based on existing project functionality, the September 14, 2026 discussions, and the FDTI commercial doctrine. It is not customer research or a validated conversion study. Role-based reviews below are editorial simulations, not user testing.

## Buying roles

| Role                                                          | Trigger / job                                                           | Evidence needed                                                                      | Likely objection                                     | Editorial response                                                                           |
| ------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Recycling operations / site management                        | Incomplete declarations, collection preparation, handoffs and receiving | Battery data, package grouping, collector/site constraints, receiving status         | Another tool will add duplicate work                 | Describe the exact input, action and downstream record                                       |
| Manufacturer circular-economy program / business-unit sponsor | Operate a return network across owners and service providers            | Vehicle identification, role-specific workspaces, battery routing and common records | Is this a complete replacement project?              | Show bounded modules and existing-system boundaries                                          |
| Commercial / procurement                                      | Agree processing and logistics terms with providers                     | Separate price fields, proposal history, acceptance/refusal                          | A marketplace will not model our contracts           | Describe implemented battery offers; do not claim a general trading-contract engine          |
| Quality / waste-compliance lead                               | Connect material identification, documents and signatures               | EWC source/override, diagnostic documents, Trackdechets BSD status and reception     | Software cannot determine legal compliance by itself | Explain data handling and configured controls; avoid automatic legal-classification promises |
| IT / digital product owner                                    | Integrate partner systems and maintain access boundaries                | Public provider API, authenticated access, imports and outgoing status/offer events  | A new silo or a universal-connector promise          | Name actual exchanged business objects and scope integrations explicitly                     |

Primary business readers: operations and program owners. Commercial and quality can sponsor a narrower module. IT is an essential evaluator. RSE is not treated as the default operational buyer. Operators, garages and carriers are users but not automatically the purchasing decision-makers.

## Source interpretation

- Jean meeting: https://www.notion.so/3dbdd0f6002e813d8a0af7187b21d26c. At 21:50, retain the general homepage and add thematic depth. Transcript starts at 00:40; missing opening not explained.
- Umicore meeting: https://www.notion.so/3cddd0f6002e81f294c6c337dea10e9d. Olivier values domain-specific demonstrations and wants material he can forward. Existing logistics tools should not be duplicated. His trading discussion is a potential need, not evidence of a delivered FDTI trading product. Available transcript starts mid-discussion.
- Commercial doctrine: canonical `skills/commercial-fdti/references/doctrine-et-positionnement.md`, particularly the Hello Business audience and problem definitions.
- Source inspection is a local implementation check, not a fresh production verification. Public copy says “developed” and avoids unverified usage volumes, savings and deployment counts.

## Evidence ledger (internal; never rendered on the public site)

Paths below are relative to the multi-project workspace. Client identities and internal paths stay in this internal document.

| Claim                                                                                         | Inspected source                                                                                                                                  | Boundaries                                                                                  |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Plate/VIN identification, country-specific mode, lookup, missing fields and manual completion | `clients/valorauto/web-app-b2c/src/routes/[[locale]]/form/(step)/VehicleIdentification.svelte:39-44,157-243`                                      | No claim of universal country or data-provider coverage                                     |
| Vehicle collection and official document signatures                                           | `clients/valorauto/AGENTS.md:88-93`; public FDTI vehicle case study                                                                               | Do not publish customer document templates or promise legal validity for all countries      |
| Battery EWC default from battery/type and editable selection                                  | `clients/stla-elb/app/src/routes/(app)/requests/new/(step3)/Step3.svelte:25`; `BatteryWasteDropdown.svelte:37-65`                                 | Configured reference data, not an autonomous legal classifier                               |
| State-dependent ADR information, diagnostic/checklist documents                               | `clients/stla-elb/app/src/routes/(app)/requests/new/(step2)/Details.svelte:64-155`                                                                | Mention handling of ADR data; do not prescribe packaging instructions on the marketing site |
| Photos required according to declaring-party context                                          | `clients/stla-elb/app/src/routes/(app)/requests/new/(step3)/Step3.svelte:46-91`                                                                   | No real battery identifiers or images copied                                                |
| Package grouping and collector/delivery-site restrictions                                     | `clients/snam/app/src/routes/(app)/packing-lists/new/(components)/DeclarationsTable.svelte:68-106`                                                | Example of an implemented rule, not a universal logistics rule                              |
| Preliminary acceptance uses chemistry, sub-chemistry and typology                             | `clients/snam/app/src/routes/(app)/declarations/new/(components)/preliminary-acceptance/new-preliminary-acceptance/fields/DeclarationData.svelte` | No general promise of automatic acceptance                                                  |
| BSD creation, update, reception and treatment                                                 | `clients/snam/app/src/routes/(app)/declarations/new/(components)/bsd/mutations.ts:26-70`                                                          | Trackdechets is a French integration, not all-European compliance coverage                  |
| Missing producer/collector signature can block the configured reception action                | `clients/snam/app/src/routes/(app)/declarations/[id]/(components)/QuickActions/(actions)/DeclarationReceived.svelte:50-90,118-135`                | Business-system control, not a legal interpretation                                         |
| Processing/logistics prices, currency, proposal history and acceptance/refusal                | `clients/stla-elb/api/routes/public_sp.py:100-179`                                                                                                | Do not claim a general contract optimizer or Umicore implementation                         |
| Provider API, imports/exports and battery price operations                                    | `clients/stla-elb/api/README.md:83-96`; `routes/public_sp.py`                                                                                     | No claim of a ready-made SAP/Salesforce connector                                           |
| Status, new-offer and accepted-offer notifications                                            | `clients/stla-elb/api/functions/webhook/README.md:7-13,100-109`                                                                                   | Avoid blanket claims of exactly-once delivery or perfect synchronization                    |

## Architecture

1. `/economie-circulaire`: positioning, concrete examples, role-specific questions, three detailed entry points, engagement scope and buyer FAQ.
2. `/economie-circulaire/vehicules`: identify, complete, collect and document end-of-life vehicles; include exceptions rather than only a happy path.
3. `/economie-circulaire/batteries`: identify/classify, diagnose, group packages, agree prices, receive and follow treatment. Explicitly describe modules drawn from different projects, not one universal product.
4. `/economie-circulaire/documents-et-integrations`: EWC versus transport data, BSD and signatures, partner APIs and data ownership.

Client names are unnecessary in the new module descriptions. Existing public case studies elsewhere on the site remain outside this editorial rewrite. All new examples are labeled explanatory examples, never presented as screenshots of deployed client applications. No real plate, VIN, battery identifier, waste-code assignment or commercial price is fabricated.

## Editorial review criteria

- Within the first screen: what FDTI builds, for whom, and at least two concrete operations.
- Each deep-dive section: a recognizable situation, implemented behavior, meaningful data or rule, and the resulting work product.
- A domain term must explain an operation: EWC default/confirmation, VIN lookup/fallback, BSD signatures/status. No keyword decoration.
- Distinguish actual implementations from scoping recommendations and future adaptation.
- Reader can reach relevant detail without reading every page.
- Conversion asks for a concrete workflow/example and identifies what the first discussion should establish; no invented delivery duration or ROI.
- Simulated role review: operations can identify a handoff; quality can understand control limits; commercial can distinguish price components; IT can identify exchanged objects; sponsor can understand a bounded starting scope.

## V2 review outcome

The role-based editorial pass resulted in the following decisions:

- Operations: added collector and destination constraints to package grouping, rather than stopping at “coordinate collection.”
- Manufacturer/program sponsor: retained distinct individual/professional vehicle entry points and explained the boundary with existing systems.
- Commercial: included implemented processing/logistics price components and proposal history. Kept the potential multi-contract trading use case outside the delivered-feature claims.
- Quality: explained EWC default/selection, separate ADR information, and the difference between missing producer and collector BSD signatures. Added explicit exception examples.
- IT: identified battery data, price offers and status events as exchanged objects. Avoided claims of an existing universal SAP or logistics connector.
- All roles: replaced client-name dependence with implementation context, linked deep sections directly from the hub, and made a concrete operational example the starting point for contact.

The content remains text-led. Explanatory interaction and exception tables demonstrate behavior but are not screenshots, a live business simulator, or evidence of conversion performance. A later visual layer should use approved, sanitized application examples. Actual buyer feedback is still needed to validate the audience hypotheses and decide which detail matters most.

Verification: FR/EN content parity, Svelte checks (zero errors/warnings), ESLint, static build and whitespace checks passed. A temporary Playwright review completed 447 assertions over the eight localized pages at 320–1440 px, 34 distinct internal destinations, anchor targets, keyboard details, example switching, language navigation, sitemap/llms coverage and unknown-topic handling. No browser JavaScript errors were observed. Desktop/mobile screenshots and the expanded mobile exception table were inspected. These are implementation checks, not a marketing-effectiveness score or a comprehensive accessibility audit.

## Readability and navigation pass

Following operator feedback, the five audience entries and two essential buying answers are now always visible. Disclosures are reserved for the three secondary FAQ answers and the optional exception table (four disclosures instead of eleven). The example selector remains appropriate for comparing three parallel feature explanations without tripling the initial reading length.

A shared, persistent four-link topic navigation provides direct access to overview, vehicles, batteries and documents/APIs. All four destinations remain visible on mobile. Detailed guides use concise section labels and highlight the current section while scrolling; mobile readers have a return-to-contents link after each section. Anchor offsets account for both navigation bars. Guide cards distinguish full-guide entry from direct section links.

The revised browser review passed 601 assertions across the same eight localized pages and 40 internal destinations, including the new navigation, visible audience content, current-topic state, current-section tracking, mobile contents return and browser-back behavior. Svelte, i18n, ESLint, build and whitespace checks passed. Final desktop/mobile screenshots were inspected. Content depth is retained; the next improvement in demonstrative value remains verified application visuals rather than additional generic copy.

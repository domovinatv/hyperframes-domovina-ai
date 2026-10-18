---
format: 1920x1080
duration: 90s
message: "Glas i novac građana ne vrijede jednako — a postoji pravedno rješenje: 1 osoba = 1 glas i P2P likvidnost kao javna infrastruktura"
arc: Hook (0 ili 20 → 1) → Problem A (glas) → Lanac vlasti → Problem B (novac) → Dokaz izravnog puta → Rješenje 1 → Rješenje 2 → Od danas do sutra
audience: hrvatski građani, birači i štediše; bez stručnog predznanja
mode: autonomous
structure: story-explainer (dva problema → dokaz → dva rješenja)
music: calm hopeful minimal civic underscore, soft piano and pulse, no vocals
language: hr
source: /Users/ms/git/domovinatv/odds.domovina.ai/docs (iteracija 1, commit 58c7a1c)
---

Bez naracije: nosi tekst na ekranu. Pravilo čitljivosti: najviše ~2,5 riječi u
sekundi, svaka rečenica stoji najmanje 2 s nakon što se pojavi. Svaka brojka
nosi malu oznaku izvora ([S…] iz docs/05-izvori.md). Rješenja (okviri 6 i 7)
nose oznaku **PRIJEDLOG**: to je stav blueprinta, ne činjenica.

## Video direction

- **palette** (frame.md): svijetli okviri 2–7 na `bg` #FFFFFF s `text` #04101f; `primary` navy #002F6C nosi brojke, čvorove, strelice, eyebrow i pločice (`card-bg` / `border`). Crvena (`negative` #FF0000) SAMO za gubitak: „0", odbijeni glasovi, žig „ODBIJENO 2017.", grana dividende koja izlazi iz kruga. Zelena (`positive`) samo za „SUTRA"/kamata građanima u okvirima 5 i 7. Okviri 1 i 8 na tamnoj podlozi #04101f, bijeli tekst, svijetloplava #7fb2ff kao on-dark akcent (kao logo sting). Font svuda system-ui po ulogama iz frame.md (h1 / metric-value / stat-num / h4-eyebrow / body).
- **grafički motiv koji veže film**: tanka navy hairline mreža (vrlo niska opacity) kao pozadina svijetlih okvira; čvorovi lanaca su `card-tinted` pločice, veze su navy SVG linije koje se iscrtavaju. Isti jezik čvorova u okvirima 3, 4, 5 i 7, da se lanac novca u 7 čita kao zrcalo okvira 4.
- **oznaka izvora**: svaki okvir s brojkom ima mali `counter`-stil chip dolje desno (npr. „Izvor: DIP 2024. [S12][S21]"), unutar gornjih 83 %. Okviri 6 i 7: pill „PRIJEDLOG" gore lijevo kao `h4-eyebrow` u pill obrubu.
- **motion grammar**: `power3` long-tail settle, bez bouncea i overshoota. Bez naracije, pa se otkrivanje tempira na **ritam čitanja**: najviše ~2,5 riječi/s; svaka nova rečenica ili brojka stoji ≥2 s prije sljedeće. Nikad sve na t=0. Hold = mirno, najviše subtle jitter (niska amplituda), bez breathinga i bez spore kamere u drugoj polovici.
- **ritam / held beats**: okvir 1 drži „Trebao bi vrijediti 1." ~2 s; okvir 3 drži žig ODBIJENO ~2 s (napeta pauza prije novca); okvir 5 drži mosnu rečenicu ~2,5 s (okretna točka); okvir 8 drži domenu do kraja. Ostali okviri otkrivaju sadržaj kroz cijelo trajanje.
- **negativna lista**: bez bokeha, ljubičasto-plavih „AI" gradijenata, zastava, grbova, logotipa stranaka/banaka, lica, fotografija; bez slideshowa (sve odjednom pa freeze) i bez screensavera (elementi koji plutaju neovisno). Bez ikakve brojke koje nema u `on_screen` polju okvira.

## Frame 1 — 0 ili 20

- scene: Tamna podloga; „Tvoj glas vrijedi" + broj koji se izmjenjuje 0 ↔ 20, pa se smiri na 1
- voiceover: ""
- duration: 8s
- transition_in: cut
- status: animated
- src: compositions/frames/01-nula-ili-dvadeset.html
- type: hook
- persuasion: Counterintuitive claim + callback setup (0 / 20 → 1)
- beat: Surprise + tension
- blueprint: kinetic-type-beats (Adapt)
- focal: broj u slotu „Tvoj glas vrijedi [N]"
- roles: tamna podloga #04101f + vrlo slab navy radijalni swell = background · „Tvoj glas vrijedi" = supporting (h1, bijelo) · broj = foreground subject (golem, metric-value skala ~display) · „Trebao bi vrijediti 1." = payoff
- sfx: click-soft
- on_screen: "Tvoj glas vrijedi" · „0" (crveno) · „20" · … „Trebao bi vrijediti 1." (svijetloplavo)
- source: docs/02 Načelo („glas vrijedi 1, a ne 0 ili 20")

narrativeRole: Otvara jaz: isti glas u istom sustavu vrijedi ništa ili dvadeset puta više, a u istom dahu postavlja mjeru pravednosti (1), na koju se vraća okvir 6.
keyMessage: Glas danas ne vrijedi jednako; cilj je da vrijedi točno 1.

Adapt: zadrži in-place token swap (signature); slot se mijenja 0 → 20 → 0 → 20 tvrdim rezom pa se smiruje na 1; payoff je druga linija umjesto spring-popa.
Scene 1 (0.0–1.8s): centrirano, malo iznad sredine: „Tvoj glas vrijedi" ulazi per-word staggered reveal (`dynamic-content-sequencing`); slot je još prazan.
Scene 2 (1.8–4.6s): u slotu desno od fraze golem broj: „0" crveno (#FF0000) → hard-cut „20" bijelo → „0" → „20" (`discrete-text-sequence`), svaki token ~0,7 s; sfx tick na svakoj zamjeni.
Scene 3 (4.6–6.0s): broj se zadnji put mijenja u „1" svijetloplavo (#7fb2ff), glatki settle; ispod ulazi „Trebao bi vrijediti 1." (body-lede veličina, bijelo 80 %) per-word reveal.
Scene 4 (6.0–8.0s): hold, mirno; ambient glow bloom iza „1", jedan blagi nalet.

## Frame 2 — Matematika praga

- scene: Jedna izborna jedinica sa 14 mjesta. 20 stupaca glasova: jedan 1.000, devetnaest po 999; crta praga 5 % siječe ih; svih 14 mandata pada na jedan stupac. Zatim prijelaz na stvarnost 2024.: 20,7 % biračkog tijela → 40,4 % mandata
- voiceover: ""
- duration: 15s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/02-matematika-praga.html
- type: pain_point
- persuasion: Worked example with real numbers → statistical proof (teorija pa stvarnost)
- beat: Puzzlement → recognition
- blueprint: compose
- focal: 20 stupaca glasova presječenih crtom praga 5 %
- roles: hairline mreža = background · 20 stupaca (1 navy, 19 sivih text-light) = foreground subject (~55 % okvira, full-width strip) · crta praga = supporting (crvena isprekidana) · 14 mandata kao 14 malih kružića = supporting · panel stvarnosti 2024. = drugi foreground u Scene 4
- sfx: click-soft
- on_screen: "1 lista · 1.000 glasova · 5,0048 %" → "14 / 14 mandata" · "19 lista · po 999 glasova · 4,9997 %" → "0" · "Stvarnost, izbori 2024.:" "20,7 % biračkog tijela → 40,4 % mandata"
- source: docs/01 A2 (primjer olovkom), A3 [S12][S21]

narrativeRole: Pokazuje mehanizam (prag 5 % + D'Hondt unutar jedinice) na primjeru koji se može provjeriti olovkom, pa ga uzemljuje u stvarnom rezultatu 2024.
keyMessage: Prag i D'Hondt pretvaraju malu razliku u glasovima u sve ili ništa, a u stvarnosti petina birača daje dvije petine Sabora.

Compose (dataviz-countup bez push-through signaturea ne odgovara; ovo je bar chart + prijelaz).
Scene 1 (0.0–2.5s): eyebrow „JEDNA IZBORNA JEDINICA · 14 MANDATA" gore lijevo; 20 stupaca raste bar-height staggerom (`stat-bars-and-fills`) — gotovo jednake visine; iznad prvog „1.000", iznad ostalih „999" (stat-num manji).
Scene 2 (2.5–5.5s): vodoravna crvena isprekidana crta „prag 5 %" iscrta se slijeva (`svg-path-draw`) točno između 1.000 i 999; labelice: prvi stupac „5,0048 % ✓", ostali „4,9997 %" sive; 19 stupaca blijedi na ~35 %.
Scene 3 (5.5–8.5s): 14 mandat-kružića padne u prvi stupac (stagger po indeksu) i brojač iznad njega „14 / 14" (`counting-dynamic-scale`, navy); kod 19 stupaca crveno „0". Hold ~1 s.
Scene 4 (8.5–15.0s): velocity-matched cut ulijevo (`cut-catalog.md` cut-the-curve) na panel „Stvarnost · izbori 2024.": dva horizontalna bara jedan ispod drugog — „20,7 % biračkog tijela" (kratki bar, navy 50 %) i „40,4 % mandata" (dulji bar, navy) puni se (`stat-bars-and-fills`) s count-upom; strelica „→" između; chip izvora „DIP 2024. [S12][S21]". Hold od ~11,5 s.

## Frame 3 — Lanac vlasti

- scene: Vodoravni lanac čvorova koji se gradi slijeva: Birači → (prag 5 %, D'Hondt) → Sabor → (imenuje) → Savjet HNB-a → HNB → ZEF, zadružna banka građana; na zadnjoj vezi crveni žig „ODBIJENO 2017."
- voiceover: ""
- duration: 11s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/03-lanac-vlasti.html
- type: feature_showcase
- persuasion: Causal chain (A → B → C) + progressive disclosure
- beat: Comprehension + unease
- blueprint: spatial-pan-stations (Reproduce)
- focal: lanac čvorova Birači → Sabor → Savjet HNB-a → HNB → ZEF
- roles: hairline mreža na velikom .world platnu = background · 5 card-tinted čvorova = foreground subject · navy SVG veze s malim labelama („prag 5 %, D'Hondt", „imenuje", „nadzor") = supporting · crveni žig = payoff
- sfx: impact-bass-1
- on_screen: "Birači" · "Sabor" · "Savjet HNB-a" · "HNB" · "ZEF — banka građana, 1 član = 1 glas" · žig "ODBIJENO 2017."
- source: docs/01 lanac A, A4; [S1][S3]

narrativeRole: Povezuje nejednak glas s novcem: vlast izabrana tim pravilom imenuje Savjet HNB-a, a HNB je 2017. odbio zadružnu banku građana.
keyMessage: Pravilo glasanja ne ostaje na izborima; ono odlučuje i tko smije voditi banku.

Signature: jedna virtualna kamera (`viewport-change`) pan-a s postaje na postaju po širokom platnu; zadnja postaja se drži.
Scene 1 (0.0–2.0s): kamera na lijevoj postaji: čvor „Birači" spring-pop entrance (`spring-pop-entrance`, bez overshoota); eyebrow „TKO ODLUČUJE O NOVCU?".
Scene 2 (2.0–4.5s): veza se iscrta (`svg-path-draw`) s labelom „prag 5 % · D'Hondt", kamera pan-a udesno; „Sabor" ulazi.
Scene 3 (4.5–7.0s): veza „imenuje" → „Savjet HNB-a", pa kratka veza → „HNB"; kamera prati.
Scene 4 (7.0–9.0s): zadnja veza → čvor „ZEF · zadružna banka građana · 1 član = 1 glas"; veza postaje crvena; preko čvora crveni žig „ODBIJENO 2017." udari (scale 1.3→1 brzo, `press-release-spring` bez odskoka), sfx stamp; chip „[S1][S3]".
Scene 5 (9.0–11.0s): kamera se lagano povuče (jedan bookend pull) da se vidi cijeli lanac; hold mirno.

## Frame 4 — Lanac novca

- scene: Kružni tok na istoj pozornici kao okvir 3: Građani → porezi → Proračun → plaće, mirovine → računi u bankama → depoziti → Banke ~90 % u stranom vlasništvu → krediti uz kamatu natrag građanima; jedna grana izlazi iz kruga: dobit, dividenda → strani vlasnici; brojač 1,36 mlrd € (2023.)
- voiceover: ""
- duration: 13s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/04-lanac-novca.html
- type: feature_showcase
- persuasion: Causal chain + concretization (krug koji curi)
- beat: Recognition + concern
- blueprint: spatial-pan-stations (Adapt)
- focal: kružni tok novca s granom koja curi van
- roles: hairline mreža = background · 4 čvora na krugu (Građani, Proračun, Računi u bankama, Banke ~90 % strano) = foreground subject (~55 % okvira, centrirano-lijevo) · navy strelice toka = supporting · crvena grana „dividenda → strani vlasnici" + brojač 1,36 mlrd € = payoff desno (asimetrično 65/35)
- on_screen: "Građani" · "Proračun" · "Računi u bankama" · "Banke · ~90 % strano vlasništvo" · "Dobit banaka 2023.: 1,36 mlrd €" · "→ dividenda stranim vlasnicima"
- source: docs/01 lanac B, B3 [S13], dobit [S17]

narrativeRole: Pokazuje da novac građana kruži kroz banke koje su većinom u stranom vlasništvu i da dobit izlazi iz kruga.
keyMessage: Novac građana prolazi kroz posrednika, a kamata završava kod njegovih vlasnika.

Adapt: zadrži jednu kameru koja putuje postajama, ali postaje leže na krugu, a ne na liniji; kamera kruži pa se povuče na cijeli krug.
Scene 1 (0.0–2.5s): eyebrow „KAMO IDE NOVAC GRAĐANA?"; čvor „Građani"; strelica „porezi" se iscrta (`svg-path-draw`) do „Proračun".
Scene 2 (2.5–5.0s): kamera prati luk: „plaće, mirovine" → „Računi u bankama".
Scene 3 (5.0–7.5s): „depoziti" → „Banke · ~90 % strano vlasništvo" (navy, najveći čvor); strelica „krediti uz kamatu" zatvara krug natrag do „Građani"; kamera pull-back na cijeli krug (`multi-phase-camera`, jedan put).
Scene 4 (7.5–10.5s): iz čvora Banke desno izlazi crvena grana do čvora „Strani vlasnici" s labelom „dobit, dividenda"; iznad nje brojač count-up do „1,36 mlrd €" (`counting-dynamic-scale`) i ispod „dobit banaka 2023.".
Scene 5 (10.5–13.0s): hold; chip „[S13][S17]".

## Frame 5 — Izravni put postoji

- scene: Isti krug, ali posrednik nestaje: izravna strelica Građani → Država; tri brojke se odbrojavaju jedna za drugom; završna rečenica kao most prema rješenju
- voiceover: ""
- duration: 11s
- transition_in: crossfade
- status: animated
- src: compositions/frames/05-narodna-obveznica.html
- type: social_proof
- persuasion: Counterexample (ovdje sustav radi drukčije) + statistical proof
- beat: Surprise → hope
- blueprint: compose
- focal: izravna strelica Građani → Država i tri brojke
- roles: hairline mreža = background · dva čvora (Građani lijevo, Država desno) + debela zelena strelica = foreground (gornja trećina) · tri metrike u triptihu = foreground subject · mosna rečenica = payoff
- sfx: click-soft
- on_screen: "Narodna obveznica, 2023." · "44.843 građana" · "1,335 mlrd € izravno državi" · "48,7 mil. € kamate građanima" · "Ako građani mogu posuditi državi, mogu i jedni drugima."
- source: docs/01 B6 [S19]; docs/03 tablica „Izravan tok"

narrativeRole: Okretna točka: dokaz da izravni tok bez posrednika već postoji i da kamata tada ide građanima.
keyMessage: Izravni put već je isproban 2023.; može se proširiti s države na građane.

Compose (count-up triptih; bez push-through).
Scene 1 (0.0–2.2s): eyebrow „NARODNA OBVEZNICA · 2023."; čvorovi „Građani" i „Država"; između njih prigušeni sivi čvor „posrednik" koji izblijedi i nestane, a izravna strelica se iscrta (`svg-path-draw`, positive zelena).
Scene 2 (2.2–6.0s): triptih ispod (stagger po indeksu): „44.843 građana" → „1,335 mlrd € izravno državi" → „48,7 mil. € kamate građanima", svaka se count-upa (`counting-dynamic-scale`) ~1,2 s jedna za drugom.
Scene 3 (6.0–8.5s): mosna rečenica centrirano ispod (blockquote): „Ako građani mogu posuditi državi, mogu i jedni drugima." per-word reveal.
Scene 4 (8.5–11.0s): hold; chip „[S19]".

## Frame 6 — Rješenje 1: 1 osoba = 1 glas

- scene: Oznaka PRIJEDLOG. Vraća se brojač iz okvira 1 (0 / 20) i smiruje se na 1 kako se dodaju dva sloja: kompenzacijski mandati, rezervni glas; ispod tri pločice: eID · ZK dokaz · javna provjera
- voiceover: ""
- duration: 14s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/06-jedan-glas.html
- type: product_intro
- persuasion: Callback (brojač iz hooka) + rule of three
- beat: Clarity + resolve
- blueprint: kinetic-type-beats (Adapt)
- focal: brojač težine glasa (callback iz okvira 1) koji se smiruje na 1
- roles: hairline mreža = background · „1 osoba = 1 glas" = h1 · brojač = foreground subject (desno, 60/40) · dva sloja-pločice = supporting · tri pločice eID · ZK · javna provjera = triptih dolje
- sfx: click-soft
- on_screen: "PRIJEDLOG" · "1 osoba = 1 glas" · "Kompenzacijski mandati" · "Rezervni glas" · "težina glasa → 1" · "eID · ZK dokaz · javna provjera" · "svatko može sam prebrojati"
- source: docs/02 Sloj 1 (stav B + E), Sloj 2, Sloj 3

narrativeRole: Uvodi prvo rješenje kao odgovor na hook: pravilo koje vraća težinu glasa na 1, identitet bez duplikata i rezultat koji svatko može provjeriti.
keyMessage: Pravedno pravilo je mjerljivo: svaki glas vrijedi 1, a to se može provjeriti.

Adapt: zadrži in-place token swap — brojač počinje „0 / 20" kao u hooku, pa se sa svakim dodanim slojem mijenja dok ne sjedne na „1".
Scene 1 (0.0–2.5s): pill „PRIJEDLOG" gore lijevo; h1 „1 osoba = 1 glas" per-word reveal lijevo; desno brojač s labelom „težina glasa" pokazuje „0 · 20" (0 crveno).
Scene 2 (2.5–5.0s): ispod h1 pločica „+ Kompenzacijski mandati" uđe; brojač: „20" se smanji i posivi (prvi sloj ublažava nerazmjer), bez nove brojke.
Scene 3 (5.0–7.5s): pločica „+ Rezervni glas: glas nikad ne propada"; brojač → „1" navy, glow bloom.
Scene 4 (7.5–11.0s): triptih pločica ispod (stagger po indeksu): „eID · stvarna osoba" · „ZK dokaz · tajni glas" · „Javna provjera · svatko može sam prebrojati".
Scene 5 (11.0–14.0s): hold mirno.

## Frame 7 — Rješenje 2: P2P likvidnost

- scene: Oznaka PRIJEDLOG. Podijeljen ekran DANAS | SUTRA. Lijevo: depozit → banka → kamata → dioničari (1 dionica = 1 glas). Desno: ulog → javna P2P infrastruktura → kamata natrag zajmodavcima + dio u pričuvni fond (1 član = 1 glas)
- voiceover: ""
- duration: 13s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/07-p2p-likvidnost.html
- type: feature_showcase
- persuasion: Before/after (comparison of two options)
- beat: Comprehension + conviction
- blueprint: comparison-split (Reproduce)
- focal: dvije kartice DANAS | SUTRA
- roles: hairline mreža = background · lijeva kartica (DANAS, siva/crvena grana) i desna kartica (SUTRA, navy/zelena) = foreground subject (split-screen, ~45 % svaka) · mini-tok čvorova unutar svake = supporting · donja linija načela = payoff
- on_screen: "PRIJEDLOG" · "DANAS" / "SUTRA" · "Kamata → dioničari" / "Kamata → zajmodavci + pričuvni fond" · "1 dionica = 1 glas" / "1 član = 1 glas" · "Likvidnost kao javna infrastruktura, kao cesta"
- source: docs/03 Načelo, dijagram „Danas i blueprint", kriteriji 1–2

narrativeRole: Uvodi drugo rješenje kao zrcalo lanca novca: isti tok, ali kamata ostaje kod onih koji nose rizik, a upravljaju članovi.
keyMessage: Kad likvidnost postane javna infrastruktura, kamata ostaje građanima, a ne odlazi dioničarima.

Signature: dvije kartice ulaze s suprotnih krila sa zrcalnim rotateY tiltom (`split-tilt-cards`), pa se poravnaju.
Scene 1 (0.0–2.0s): pill „PRIJEDLOG"; kartice DANAS (lijevo) i SUTRA (desno) uđu split-tilt; u njima samo naslovi.
Scene 2 (2.0–5.5s): DANAS: mini-tok „depozit → banka → kamata → dioničari" iscrta se (`svg-path-draw`), zadnja grana crvena; ispod „1 dionica = 1 glas".
Scene 3 (5.5–9.0s): SUTRA: „ulog → javna P2P infrastruktura → kamata → zajmodavci + pričuvni fond", grane zelene; ispod „1 član = 1 glas".
Scene 4 (9.0–11.0s): centrirano ispod obje kartice: „Likvidnost kao javna infrastruktura, kao cesta." per-word reveal.
Scene 5 (11.0–13.0s): hold.

## Frame 8 — Od danas do sutra

- scene: Tamna podloga kao u hooku; „od danas" → „do sutra" se slaže u liniju, pa domena odds.domovina.ai i poziv na otvorene izvore
- voiceover: ""
- duration: 7s
- transition_in: crossfade
- status: animated
- src: compositions/frames/08-od-danas-do-sutra.html
- type: cta
- persuasion: Distillation + callback (tamna podloga iz hooka)
- beat: Resolve + inspiration
- blueprint: logo-assemble-lockup (Adapt)
- focal: lockup „od danas → do sutra" + domena odds.domovina.ai
- roles: tamna podloga #04101f + slab navy radijalni swell = background · „od danas" / „do sutra" = foreground subject (h1, bijelo) · „odds.domovina.ai" = URL badge (svijetloplavo #7fb2ff) · zadnja linija = supporting
- on_screen: "od danas" · "do sutra" · "odds.domovina.ai" · "Svaka brojka s izvorom. Otvoreno za provjeru."
- source: README odds.domovina.ai

narrativeRole: Sažima put od problema do rješenja u jednu liniju i šalje gledatelja na otvoreni blueprint gdje se sve može provjeriti.
keyMessage: Blueprint je javan i provjerljiv: odds.domovina.ai.

Adapt: lockup nastaje iz dviju fraza (letters cascade) umjesto loga; bez CTA push-through jer okvir drži dulje mirno čitanje.
Scene 1 (0.0–2.0s): „od danas" ulazi lijevo (per-word / letters cascade, `dynamic-content-sequencing`).
Scene 2 (2.0–3.5s): svijetloplava linija se iscrta udesno (`svg-path-draw`) i „do sutra" ulazi na njenom kraju.
Scene 3 (3.5–5.0s): fraze se sliju u centrirani lockup (glatko skupljanje u centar), ispod uđe URL badge „odds.domovina.ai".
Scene 4 (5.0–7.0s): ispod sitno „Svaka brojka s izvorom. Otvoreno za provjeru."; hold, pa jedini pravi izlaz filma: fade na tamno u zadnjih 0,6 s.

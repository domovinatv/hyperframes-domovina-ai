# Obrada domovina.ai za yD9r0grKCkA (Thompson, „Kralj Tomislav”)

Izvor: lokalni izlaz pipelinea domovina.ai, generiran 2026-10-19. Sve vrijednosti vremena u sekundama punog spota (424 s).
Tekst stihova se ovdje NE prepisuje; redci su označeni s 2–3 riječi. Službeni tekst je u `.description` (v. dolje).

## 0. Pronađene datoteke

Direktorij: `/Volumes/DOMOVINA2TB/fetch_domovina_tv_output/_unlisted/`
Prefiks: `20250613_m_p_thompson_kralj_tomislav_official_video_yt_yD9r0grKCkA` (u tablici `P`).
Kanal je `_unlisted` (nije u nekoj tematskoj mapi). Ostali kandidati (~/git, ~/Downloads, repoi) nisu imali ništa po ID-u.

| Datoteka (`P` + sufiks) | Veličina | Sadržaj |
|---|---|---|
| `.description` | 4,5 KB | YouTube opis: ZAVRŠNI SLUŽBENI TEKST pjesme, krediti, hashtagovi (najpouzdaniji izvor teksta) |
| `.info.json` | 135 KB | yt-dlp metapodaci, 100-binni heatmap gledanosti (replay), views/likes, tagovi |
| `.mp3.speechmatics.json` | 90 KB | Speechmatics: word-level (start/end/confidence) za cijeli spot |
| `.words.json` | 5 KB | kompaktni word-timing po cueu (ms), `a` = prosjek sigurnosti cuea |
| `.mp3.speechmatics.gemini.diarized.srt` | 3 KB | Gemini-rafinirani segmenti + govornici (28 cueva), najbolji tekst |
| `.segments.jsonl` | 8 KB | isti 28 segmenata kao JSONL (start_sec/end_sec/speaker/text) |
| `.wav.canary.word_ts.json`, `.wav.canary.csv`, `.wav.canary.srt` | 2,4 KB / 0,8 KB | Canary ASR: slab (101 riječ, mnogo nerazumljivog, npr. „Naduvajskom”) |
| `.wav.canary.summary.md` / `.summary.json` | 2,5 / 3,3 KB | sažetak (Opus): teme, osobe, mjesta, zaključci |
| `.wav.canary.diarized_2026-10-19_opus.outline.json` | 2 KB | 11 poglavlja s vremenima |
| `.wav.canary.diarized_2026-10-19_opus.article.json` | 12,5 KB | članak po sekcijama (naslov, tekst, keywords, entities, screenshot) |
| `.wav.canary.diarized_2026-10-19_opus.article.name_audit.json` | 0,3 KB | audit imena: 0 označenih |
| `_screenshots/` + `_manifest.json` | 8 PNG (1920x816), 3 KB | 8 stillova: 95, 125, 178, 200, 260, 287, 325, 390 s |
| `.og-sections/` (og-t-{95,125,178,200,260,287,325,390}.jpg) + `manifest.json` | 8 JPG | OG slike za dijeljenje po sekcijama |
| `.og-share.jpg`, `.png`, `.webp`, `.thumb-{320,640,1280}.webp` | 4–380 KB | naslovnica / thumbnaili |
| `.rag_chunks.jsonl`, `.rag_combined.jsonl`, `.rag_import.jsonl` | 2 / 21 / 17 KB | RAG chunkovi (19 zapisa: topic_transcript + članak) |
| `.epub` | 765 KB | e-knjiga članka |
| `.mkv` 18,9 MB, `.f396.mp4` 12 MB (640x272, 25 fps), `.f251.webm`, `.mp3`, `.wav` | | medij (video je niske rezolucije) |
| `.gemini_usage.json`, `.mp3.speechmatics.gemini.meta.json`, `.sponsors_in_video.json` | | trošak (0,34 USD ukupno), 0 sponzora |

Nije pronađeno: scene detection / shot boundaries, vizualni opisi kadrova, OCR, engleski prijevod (`sections_en` prazan), Magisterium izlaz (v. sekciju 5).
Posebno: `screenshot_description` u manifestu je TEKSTUALNO izveden iz stihova, ne iz slike. Pravi sadržaj stillova opisan je dolje (pregledano ručno).

## 1. Vremena redaka (84–148 s i 297–368 s)

Kvaliteta: Speechmatics ima točne granice riječi i dobar tekst u 89–145 s i 257–310 s (većina riječi confidence 1,0); 122–135 s ima par pogrešaka („Forum Tomislavove”, „doba Vatrenima” = početak refrena, 0,66–0,76). Od 322 s nadalje tekst je SMEĆE (cueovi `a` = 0,35 / 0,35 / 0,15; npr. „pršut”, „rasplodnih”), ali VREMENSKE granice riječi vjerojatno ostaju korisne kao okvir stiha. Canary je gori i na svemu. Gemini ispravlja tekst gdje je Speechmatics dobar, ali ne dira vremena; njegovi cueovi su grubi (cijele strofe u jednom cueu). Kad god se Gemini i Speechmatics razlikuju, vjerovati Speechmatics vremenima.
Napomena: govornici SPEAKER_00/02 („Mi.”, „Od ostatka Hrvatske”, „A plan je da se”, „Danas u sedam i po…”, „…profesor povijesnih…”) su halucinacije ASR-a nad instrumentalom/zborom; u spotu nema govora. Ne koristiti kao natpise.

### Isječci A/B (krunidba + 1. refren)
Vremena poklapaju se s tvojim: A počinje ~5,6 s prije prve riječi (instrumentalni uvod), B ~1,8 s prije „Žezlo i kruna”.

| Redak (oznaka) | Početak | Kraj | Pouzdanost |
|---|---|---|---|
| S1.1 „Na Duvanjskom polju…” | 89,78 | 94,10 | 1,0 |
| S1.2 „Tomislava hrabrog…” | 95,18 | 99,68 | 1,0 (zadnja riječ 0,78) |
| S1.3 „Pročulo se nadaleko…” | 100,70 | 105,62 | 1,0 |
| S1.4 „…(što) voli, čuva…” | 105,62 | 109,61 | visoka (voli 0,55) |
| R „Žezlo i kruna” | 111,86 | 114,68 | 1,0 |
| R „Povijesti puna” | 117,38 | 120,20 | 1,0 |
| R „Kralju Tomislave…” | 122,13 | ~127,53 | početak ASR-pogreška, kraj dobar |
| R „Od Jadranskog mora…” | 127,65 | 133,05 | 1,0 (Drave 131,67–133,05) |
| R „Još u nama (vatre ima)” | 133,38 | 135,69 | 0,65–0,76 |
| R „Još je živa (domovina)” | 136,11 | 138,42 | 1,0 |
| R „Branili je vitezovi…” | 138,45 | 144,00 | 1,0 (zadnja „vremena” 142,26–144,0) |

Zaključak: A završava 147,54, ~3,5 s nakon zadnje riječi (ostatak je instrumentalni izlaz); B isto. Sljedeći vokal (2. strofa) počinje tek 155,34.

### Isječak C (297–368 s)

| Redak (oznaka) | Početak | Kraj | Pouzdanost |
|---|---|---|---|
| „Od Osijeka…” (+ „čuvaru na Dravi”) | 284,58 | 293,16 | 1,0 (Gemini cue) |
| „o junaštvu tvom” | 294,39 | 296,64 | 1,0 |
| „A u našem Splitu…” | 298,26 | 303,87 | 1,0 (val 302,88–303,87) |
| „Blagoslov od Pape…” | 305,07 | 306,90 | 1,0 |
| „Tomislav je kralj” | 308,01 | 310,41 | 1,0 (kralj 0,6) |
| (pauza / instrumental) | 310,41 | ~322,7 | halucinacija „Od ostatka Hrvatske” 317,04–321,60 |
| Str.3 „Još zemlja se mrvi…” | 322,77 | 327,78 | vrijeme OK, tekst smeće |
| Str.3 „Još mokra od krvi…” | 328,17 | 333,18 | isto |
| Str.3 „Još Hrvat tvoj…” | 333,60 | 338,64 | isto |
| Str.3 „Ko ratnik na grudi…” | 339,12 | 343,41 | isto |
| „Kroz Bosnu još tutnji” | 344,58 | ~348,0 | „Bosnu” 344,91–345,54 pouzdano |
| „Drži se ponosno…” + „Hercegovina” | ~348,3 | 355,08 | „Hercegovina” držana nota 352,35–355,08; „ponosno” 351,36–352,32 |
| „Još crven, još bijeli…” | ~355,5 | ~360,5 | nisko |
| „Uz Boga, tri boje…” | 360,96 | 366,01 | „Uz Boga” 361,26–361,95 |
| Prijelaz u refren: „Još barjak tvoj vije” / „Žezlo i kruna” / „Tu sivi soko kliče” | 367,75 | 380,41 | Gemini cue; „Žezlo i kruna” stvarno; ostalo se pogrešno tumačilo kao govor |
| Završni refren (s gusalama) | 382,39 | 404,59 | `a` 0,79–0,82 |

Strofa 3 (Još zemlja… do Uz Boga) = 322,77–366,01; tj. C 297,1–~367 zahvaća „Split/Papa” (298–310), pauzu (310–322) i cijelu zadnju strofu. Preporuka: gornje granice stihova u strofi 3 uzimati iz Speechmatics granica riječi, a tekst iz `.description`.
Dodatni orijentiri izvan A/B/C: 2. strofa („Prolazili/Dolazili osvajači”) 155,34–~166; „Ime tvoje, Tomislave” 177,09–186,37 (po Gemini); 2. refren 188,26–222,64; strofa Zagreb 257,01–282,60 (Kad s perona 257,01–265,50; „zbori sad” 266,85–268,98; „Hrvatska je tvoja” 270,81–276,09; „na tebe računa” 277,59–282,60).

## 2. Vizualni sadržaj spota

Obrada NE sadrži rezove ni opise kadrova. Jedino što postoji su 8 stillova, koje sam pregledao (1920x816). Što se u njima vidi:

| Vrijeme | Što se vidi | Napomena za storyboard |
|---|---|---|
| 95 s | Gudački orkestar (violine, dvije violinistice u prvom planu), svijećnjak sa svijećama, stalci, Marshall pojačalo u pozadini, tamna crkvena/dvoranska atmosfera | snimano uživo; podudara se s prvom strofom |
| 125 s | AI prizor: ratnik u šljemu s nosnikom i kolobarnom košuljom, desna ruka podiže buzdovan; iza njega zaprašena vojska i barjaci bordo/zlatne boje | refren, „Kralju Tomislave”; odlična za B |
| 178 s | AI prizor: jurišna konjica, ovalni štitovi s crveno-plavim križem na bijelom, jako zamućenje pokretom | 2. strofa („osvajači”, bitka) |
| 200 s | AI prizor: okrunjena figura s leđa na zidinama, pogled na Jadran i crvene krovove (izgled kao Dubrovnik/Split-sličan grad), uz oklopnike | 2. refren; vizualno „od Jadranskog mora”. Prikaz s krunom na glavi s leđa = vrlo prikladan za bistu |
| 260 s | zračni snimak Zagreba (katedrala, Trg kralja Tomislava/Strossmayerov okoliš, Maksimirsko-sljemenski obronci), toplo jesensko svjetlo; vjerojatno AI/dron | strofa „Kad s perona…”; najgledaniji dio spota (v. heatmap) |
| 287 s | AI zračni prizor srednjovjekovnog naselja s drvenim palisadama uz široku rijeku, ljudi sitni na putu | „Od Osijeka… čuvaru na Dravi” |
| 325 s | zbor u crnom (oko 20 pjevača, nekoliko u habitima), drvena stijena u pozadini, pogled u kameru | strofa 3 („Još zemlja se mrvi…”) |
| 390 s | AI prizor: flota ladja uz grad s tornjevima, jedra s crveno-bijelom šahovnicom i grbom; veslači i štitnici | završni refren (s gusalama) |

Iz kredita (opis): spot je kombinacija snimljenog materijala (utvrda Ribnik kod Karlovca, kovač Nikola Vudrag, orkestar i zbor, dron i kran) i AI generiranih scena (AION – Red Shoes Production Group LA; „AI created by Domagoj Mažuran”; alati: Luma, Midjourney, Veo 3, Higgsfield, Runway, ChatGPT, Krea, Kling AI). Redatelj/montažer Sandra Mihaljević, Karpo Media.
Sekcijski OG-stillovi (iste vrijednosti 95/125/178/200/260/287/325/390) postoje kao JPG u `.og-sections/` i spremni su za ovlaštene naslovnice/kartice.
Ono što NIJE poznato: prikaz kralja kao lika (kruna, žezlo), krunidba na Duvanjskom polju, kip na konju, papa, zastave u pokretu — treba ih tražiti u samom videu (`.mkv`/`.f396.mp4`) vlastitim skokom po vremenu; ova obrada ih ne indeksira.

## 3. Povijesne činjenice, entiteti, teme (iz obrade)

Obrada je tekstualna, bez izvora. Popis entiteta (summary.md): kralj Tomislav, „papa” (bez imena), Duvanjsko polje, Jadransko more, rijeka Drava, Zagreb, Osijek, Split, Hrvatska, Bosna, Posavina, Hercegovina. Teme: kralj Tomislav, krunidba na Duvanjskom polju, hrvatska povijest, domoljublje, obrana domovine, hrvatski gradovi i krajevi. Sentiment: positive.
Nema imena Ivan X., godine 925. ni sabora u Splitu u obradi. To je izvana znanje i treba biti potvrđeno (Magisterium analiza je za to namijenjena, v. 5). Samo kao podsjetnik, NE iz obrade: tradicionalno datiranje krunidbe oko 925., papa Ivan X., splitski crkveni sabori 925. i 928.; Duvanjsko polje je predaja (Ljetopis popa Dukljanina / Kronika), ne potvrđeno izvorima.
Poglavlja (outline, vremena iz Gemini cueova):
- 0:49 uvodni govorni isječak (lažni)
- 1:29 1. strofa: krunidba, prva kruna u Hrvata
- 1:51 refren „Žezlo i kruna” / Jadran – Drava
- 2:35 2. strofa: osvajači, obrana doma, vječni sjaj imena
- 3:08 ponovljeni refren
- 4:17 Zagreb, spomenik Tomislavu na konju
- 4:44 Osijek, čuvar na Dravi; Split i papin blagoslov
- 5:17 upadica (lažna)
- 5:22 sloboda izborena borbom; Bosna, Posavina, Hercegovina
- 5:59 govorni umetak (lažan)
- 6:22 završni refren uz gusle
Ključne tvrdnje iz članka usklađene sa stihovima: Tomislav je trojno („knez, ratnik i vladar”); refren zaokružuje prostor „od Jadrana do Drave”; strofa Zagreb prenosi odgovornost na pojedinca; Osijek – junaštvo kao obiteljska predaja (majka → sin); Split – crkveni blagoslov krune; strofa 3 – obnova kroz krv, Bosna/Posavina/Hercegovina, nasljeđe oca na sina.
Pogreške obrade (članak/sažetak): stihovi se citiraju iz ASR-a, pa se razlikuju od službenog teksta („Prolazili” umjesto „Dolazili osvajači”, „voli” umjesto „vodi”, „poratnik na grudi” umjesto „ratnik na grudi desnicu stavi”; strofa 3 je u članku većinom parafrazirana pogrešno). Za titlove koristiti `.description`.

## 4. Ostalo korisno za natpise, poglavlja, dijeljenje

**Metapodaci**: objavljeno 2025-06-13 (kanal Marko Perković Thompson, @MPThompson, 233 tis. pratitelja); 3 573 447 pregleda, 21 497 lajkova, 2 900 komentara. Hashtagovi iz opisa: `#mpthompson #hodočasnik #kraljtomislav #new #novo39`. Tagovi: kralj tomislav, kralj, thompson, domovina, premijera…
**Krediti za natpis na kraju** (točni iz opisa): glazba M. P. Thompson / Ante Padovan; tekst M. P. Thompson / Neno Ninčević; produkcija Karpo Media, režija Sandra Mihaljević; snimano na utvrdi Ribnik; AI produkcija AION / Domagoj Mažuran; gudači Major Strings Orchestra; solo violončelo Martin Kutnar; solo flauta Mia Zeljković; zbor 23 pjevača (npr. Šimun Perković).
**Heatmap (YouTube replay, 100 binova po ~4,24 s, 0–100)** — korisno za izbor isječka:
- najgledaniji dio: 259 s = 100, širi vrh 242–290 s (59 → 100 → 80); to je točno strofa „Kad s perona… Zagreb” i Osijek
- drugi plato 314–348 s = 84–91 (strofa 3, „Još zemlja se mrvi…” do „Hercegovina”)
- C (297–367 s) je kroz cijeli opseg 60–91, tj. daleko gledaniji od A/B (89–148 s = 34–46; refren 123 s = 46, 127 s = 45)
- 1. strofa/uvod (0–85 s) 17–34, vrlo slabo
- Zaključak: za share-reel najjači je dio 242–290 (Zagreb) i 314–348; refren sam ne hvata pažnju.
**Opisi za dijeljenje** (nisu u obradi; mogu se izvesti iz članka): „Od Jadranskog mora do rijeke Drave” (središnja poruka refrena), „Kad s perona siđeš…” (najpoznatija slika), Split/Papa kao povijesna kuka.
**Boje/emocija po dijelovima** (iz stillova): strofa 1 – topla, svijeće, tamne drvene i crkvene boje; refren – prašnjava bež-zlatna, bordo barjaci; strofa 2 – hladna, siva, bitka; Zagreb – narančasti krovovi, jesenje svjetlo; zbor – crno-smeđa, hladna; finale – plavo-zelena rijeka, crveno-bijela šahovnica. Zajednička paleta s tvojom bistom: bronca/zlato + crvena + bež.

## 5. Magisterium HR/EN analiza

U ovoj mapi ne postoji nijedna datoteka s „magisterium” za yD9r0grKCkA (za druge videe postoje `*.article.magisterium.json`, `*.article.magisterium_full*.json`, `*_full_prompt.md`, i to npr. u `/Volumes/DOMOVINA2TB/fetch_domovina_tv_output/mladi_za_domovinu/` ili uz sam video). Ni proces s imenom „magisterium” nije pokrenut. Najnovije datoteke za ovaj ID su iz 13:50–13:58 (sam pipeline). Sekcija `sections_en` u `og-sections/manifest.json` je prazna, tj. EN još nije generiran. Stanje: NIJE započeta ili još nije zapisana. Kad završi, očekivati ju kao `P.wav.canary.diarized_2026-10-19_opus.article.magisterium*.json` u istoj mapi.

## 6. Prijedlozi za storyboard A/B/C

Opći prijedlog: upotrijebiti `.description` (službeni tekst) kao izvor titlova, ne ASR; vremena riječi iz Speechmatics.

### A (84,13–147,54: krunidba + 1. refren)
- A @84,1–89,8: uvodni instrumental, bista fade-in iz tame; natpis „Duvanjsko polje, ~925.” (činjenica označena „predaja – potvrditi”).
- A @89,8: titl prvog stiha; natpis lokacije „Duvanjsko polje”.
- A @95,2: „Tomislava hrabrog…” – titl + rotacija bi na kruni; prva pojava natpisa „knez · ratnik · vladar” (trojna uloga, članak) u ritmu riječi „kneza” 96,7 i „ratnika” 97,9.
- A @103,4: „prvoj kruni u Hrvata” – zlatni prsten oko krune biste (riječ „kruni” 103,76–104,33), natpis „Prva kruna u Hrvata”.
- A @111,9 (Žezlo i kruna): bronca → zlatno; @117,4 „Povijesti puna”: rez na patinu ili kamen.
- A @127,65–133,05: natpis „Od Jadranskog mora…” s Jadran/Drava prikazom (potvrđeno: „Drave” 131,67), na „Jadranskog” 127,9 i „Drave” 131,7 jednostavna karta s dva markera.
- A @136,1–144,0 „Još je živa domovina… vitezovi iz novih vremena”: kamera na zadnju fazu zumiranja; finalni natpis „Vitezovi iz novih vremena”.
- A @144,0–147,54: odjava, bez glasa; ne dodavati natpis.

### B (110,04–147,54: samo 1. refren)
- B @110,0–111,86: tišina prije refrena; bista u mraku, ulaz svjetla točno na „Žezlo” 111,86.
- B @111,86 / 117,38 / 122,13: tri „udarca” (Žezlo i kruna / Povijesti puna / Kralju Tomislave), promjena materijala po udarcu.
- B @124,8–127,5 „sve je zemlja tvoje slave” – natpis „Zemlja tvoje slave”.
- B @127,9–133,05 Jadran → Drava: horizontalni sweep (zapad-jug → sjever); „rijeke” 130,2.
- B @133,4–135,7 „Još u nama vatre ima”: topli ton / vatreni zlatni rim; @136,1 „Još je živa domovina” na vrhunac, ostaje do 144,0.
- Refren je u heatmapu slabiji (36–46); za share kuka „Od Jadrana do Drave”.

### C (297,1–~367: Split/Papa + strofa 3)
- C @297,1–298,3: odjeljak počinje na „A u našem Splitu” 298,26; natpis „Split”; šum vala (zvuk) uz riječ „val” 302,88.
- C @305,07 „Blagoslov od Pape”: natpis „Papin blagoslov” (kontekst: papa nije imenovan u pjesmi; ime Ivan X. samo uz potvrdu); zlatni prsten pulsira.
- C @308,01–310,41 „Tomislav je kralj”: puni kadar biste, bez titla preko lica; finale prve polovice.
- C @310,4–322,7: instrumentalna pauza; ostavite je; nemojte staviti titl (ASR halucinira „Od ostatka Hrvatske”).
- C @322,77 „Još zemlja se mrvi” / 328,17 „Još mokra od krvi” / 333,6 „Još Hrvat tvoj…” / 339,12 „Ko ratnik na grudi”: četiri titla (iz `.description`, ne ASR); crvenkasta patina → bronca; bista okretana sporo; heatmap platoa 84–91 pa je to „sigurni” dio.
- C @339,12: „desnicu stavi” – gesta ruke na grudi; natpis „Himna” ako se želi povezati, nije u obradi.
- C @344,58–355,08 „Kroz Bosnu… Hercegovina”: natpisi tri regije kao sekvenca: „Bosna” 344,9, „Posavina” (ako je u tekstu; službeni tekst ima samo Bosna i Hercegovina, a „Posavina” je ASR), „Hercegovina” 352,35 (držana nota do 355,08).
- C @360,96–366,01 „Uz Boga, tri boje”: crveno–bijelo–plavo (tri boje) na kruni/postolju; natpis „Uz Boga · tri boje · Kraljevstvo tvoje”.
- C @366,01–367,75: rez/fade na „Još barjak tvoj vije” (zadnji aktivni vokal u C); preporuka kraj C na ~367,0–367,7.
- C: heatmap pokazuje da je cijeli C najgledaniji dio spota (60–91); ne skraćivati, ako je moguće.

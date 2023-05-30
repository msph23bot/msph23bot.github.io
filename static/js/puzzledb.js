var puzzleDbRounds = {
    1: { "slug": "math", "title": "Mathematics", "meta": 48, "interlude": 155, "total": 8 },
    2: { "slug": "econ", "title": "Economics", "meta": 63, "interlude": 153, "total": 10 },
    3: { "slug": "history", "title": "History", "meta": 60, "interlude": 149, "total": 7 },
    4: { "slug": "english", "title": "English", "meta": 49, "interlude": 150, "total": 7 },
    5: { "slug": "classics", "title": "Classics", "meta": 52, "interlude": 156, "total": 11 },
    6: { "slug": "music", "title": "Music", "meta": 80, "interlude": 154, "total": 9 },
    7: { "slug": "sociology", "title": "Sociology", "meta": 54, "interlude": 157, "total": 11 },
    8: { "slug": "computer-science", "title": "Computer Science", "meta": 61, "interlude": 151, "total": 5 },
    10: { "slug": "placement-test", "title": "Placement Test", "total": 22, "meta": 10013},
    11: { "slug": "interludes", "title": "Interludes", "total": 8 },
    1000: { "slug": "metameta", "title": "Metameta", "meta": 1000000, "total": 1 }
};

var puzzleDbPuzzles = {
    "1": {
        "slug": "writing-complementary-characters",
        "answers": ["OX", "PI"],
        "round": 4,
        "prerequisites": [150],
        "unlock_local": 1,
        "partials": {
            "PRIVATEEYEABBR": "Good progress. Keep going...",
            "BUNYANSBEAST": "Good progress. Keep going...",
            "PRIVATEEYEABBRBUNYANSBEAST": "Good progress. Keep going..."
        },
        "display_name": "Writing Complementary Characters"
    },
    "3": {
        "slug": "mercantile-exchanges",
        "answers": ["NIKE"],
        "round": 2,
        "unlock_global": 0,
        "prerequisites": [153],
        "unlock_local": 0,
        "partials": {
            "VICTORY": "That's half of what you need.",
            "GODDESS": "That's half of what you need.",
            "VICTORYGODDESS": "Keep going..."
        },
        "display_name": "Mercantile Exchanges"
    },
    "4": {
        "slug": "macroeconomics",
        "answers": ["CARDINAL"],
        "round": 2,
        "prerequisites": [153],
        "unlock_local": 1,
        "partials": {
            "OBFUSCATING": "Keep going...",
            "FINDSHORTINTNAMEFORSIZEOFSETWHILEATMATHCLASS": "Keep going...",
            "CARDINALITY": "Check the enumeration length.",
            "CARDINALNUMBER": "Check the enumeration length.",
            "MUDDYING": "We're not looking for a synonym here.",
            "COVERING": "We're not looking for a synonym here.",
            "CLOUDING": "We're not looking for a synonym here."
        },
        "display_name": "Macroeconomics"
    },
    "5": {
        "slug": "point-of-view",
        "answers": ["CHERUB", "GIF"],
        "round": 4,
        "prerequisites": [150],
        "unlock_local": 4,
        "partials": {
            "SPLITPUZZLESAPART": "Good progress. Keep going...",
            "READONEBYONEBLOCKS": "Good progress. Keep going..."
        },
        "display_name": "Point of View"
    },
    "6": {
        "slug": "supply-and-demand",
        "answers": ["MICRON"],
        "round": 2,
        "unlock_global": 0,
        "prerequisites": [153],
        "unlock_local": 0,
        "partials": {
            "AMILLIONTHMETER": "Keep going...",
            "MICROMETER": "Yes, but you need the shorter word here."
        },
        "display_name": "Supply and Demand"
    },
    "39": {
        "slug": "historic-preservation",
        "answers": ["BAKERSTARTSPLAYINGDOCTOR"],
        "round": 3,
        "prerequisites": [149],
        "unlock_local": 2,
        "partials": {
            "NOWFINDSOMEABANDONEDHUTS": "Good progress. Keep going..."
        },
        "display_name": "Historic Preservation"
    },
    "40": {
        "slug": "greens-theorem",
        "answers": ["SADFACE"],
        "round": 1,
        "unlock_global": 23,
        "prerequisites": [155],
        "partials": {
            "ALPHASORTNINEGREENSANDRESCOREFORATHREEFOURPIC": "Good progress. Keep going..."
        },
        "display_name": "MATH 7 Practical Applications of Green's Theorem"
    },
    "41": {
        "slug": "regular-numbers",
        "answers": ["ADAKING"],
        "round": 1,
        "prerequisites": [155],
        "unlock_local": 2,
        "display_name": "MATH 39.166666 Regular Numbers"
    },
    "42": {
        "slug": "cs-clues",
        "io": { "BORN": "HUNT", "FIRM": "HAFT", "LOCK": "SALT", "ROLE": "PEST" },
        "initial_inputs": ["BORN","FIRM"],
        "round": 8,
        "unlock_global": 19,
        "prerequisites": [151],
        "display_name": "Crafting Linux User Error Strings"
    },
    "43": {
        "slug": "cs-list",
        "io": { "CORD": "COMPLETE", "GARTER": "HELM", "GUSH": "ROLE", "LOVER": "BLOAT" },
        "initial_inputs": ["GARTER","LOVER"],
        "round": 8,
        "unlock_global": 19,
        "prerequisites": [151],
        "display_name": "Log In Security Testing"
    },
    "44": {
        "slug": "cs-logic",
        "io": {
            "CANDLE": "FLUE",
            "QUAYD": "CORD",
            "SLOAN": "OUTRO",
            "UPON": "CONTROL"
        },
        "round": 8,
        "initial_inputs": ["CANDLE","SLOAN"],
        "unlock_global": 19,
        "prerequisites": [151],
        "display_name": "Locally Operating Globally Interconnected Computers"
    },
    "45": {
        "slug": "cs-empty",
        "io": {
            "CYST": "ASSIST",
            "FRAYED": "AFRAID",
            "GNU": "ANEW",
            "PAWN": "UPON",
            "SALT": "ASSAULT"
        },
        "round": 8,
        "initial_inputs":['CYST', 'FRAYED', 'GNU'],
        "unlock_global": 19,
        "prerequisites": [151],
        "display_name": "Effective Mac Process Thread Yielding"
    },
    "46": {
        "slug": "counterpoint",
        "answers": ["URBANHEAT"],
        "round": 6,
        "prerequisites": [154],
        "unlock_local": 2,
        "partials": {
            "RURALCOLD": "Good progress. Keep going..."
        },
        "display_name": "Counterpoint"
    },
    "47": {
        "slug": "caesar-studies",
        "answers": ["GOOFY"],
        "round": 5,
        "prerequisites": [156],
        "unlock_local": 2,
        "partials": {
            "SEMICIRCLE": "Yes, that's an answer to one of the minipuzzles.",
            "SAWFLIES": "Yes, that's an answer to one of the minipuzzles.",
            "MAFIA": "Yes, that's an answer to one of the minipuzzles.",
            "LINDSAY": "Yes, that's an answer to one of the minipuzzles.",
            "COMEDYDUO": "Yes, that's an answer to one of the minipuzzles."
        },
        "display_name": "Caesar Studies"
    },
    "48": {
        "slug": "mathematics-meta",
        "answers": ["RAMALPHAWOLF"],
        "round": 1,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [155],
        "unlock_local": 4,
        "display_name": "Mathematics Meta"
    },
    "49": {
        "slug": "english-meta",
        "answers": ["LETEMHALVEIT"],
        "round": 4,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [150],
        "unlock_local": 6,
        "display_name": "English Meta"
    },
    "50": {
        "slug": "the-crommyonian-sow",
        "answers": ["STATELY"],
        "round": 5,
        "is_meta": true,
        "prerequisites": [156],
        "unlock_local": 5,
        "display_name": "The Crommyonian Sow"
    },
    "51": {
        "slug": "the-aloadae",
        "answers": ["SYMBOLIC"],
        "round": 5,
        "is_meta": true,
        "prerequisites": [156],
        "unlock_local": 5,
        "display_name": "The Aloadae"
    },
    "52": {
        "slug": "classics-meta",
        "answers": ["THESEUSOFFENSE"],
        "round": 5,
        "is_meta": true,
        "is_round_meta": true,
        "unlock_local": 5,
        "prerequisites": [50, 51],
        "display_name": "Classics Meta"
    },
    "53": {
        "slug": "dis-legomena",
        "answers": ["CHUCK"],
        "round": 5,
        "unlock_global": 30,
        "prerequisites": [156],
        "partials": {
            "XHADTOXTHEROTTENGROUNDX": "Good progress, keep going..."
        },
        "display_name": "Dis Legomena"
    },
    "54": {
        "slug": "sociology-meta",
        "answers": ["CLIQUEBAIT"],
        "round": 7,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [157],
        "unlock_local": 5,
        "display_name": "Sociology Meta"
    },
    "55": {
        "slug": "classical-influences-on-modern-architecture",
        "answers": ["PLUNDER"],
        "round": 5,
        "prerequisites": [156],
        "unlock_local": 2,
        "display_name": "Classical Influences on Modern Architecture"
    },
    "57": {
        "slug": "its-all-greek-to-me",
        "answers": ["VIN"],
        "round": 5,
        "prerequisites": [156],
        "unlock_local": 1,
        "partials": {
            "IIIRMNLXIXNGRXVIPL": "Good progress. Keep going...",
            "CRIMINALSINGERAPPLE": "Good progress. Keep going...",
            "FIONA": "Good progress. Keep going..."
        },
        "display_name": "It's All Greek To Me"
    },
    "58": {
        "slug": "royal-society",
        "answers": ["SHIITAKE"],
        "round": 7,
        "unlock_global": 26,
        "prerequisites": [157],
        "partials": {
            "NEXTWORD": "Good progress. Keep going..."
        },
        "display_name": "Royal Society"
    },
    "60": {
        "slug": "history-meta",
        "answers": ["ACLERICALERA"],
        "round": 3,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [149],
        "unlock_local": 3,
        "display_name": "History Meta"
    },
    "61": {
        "slug": "cs-meta",
        "answers": ["PESTCONTROLASSAULTCOMPLETE"],
        "round": 8,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [151],
        "unlock_local": 5,
        "display_name": "Computer Science Meta"
    },
    "63": {
        "slug": "economics-meta",
        "answers": ["SHUTELECTRICALDOWN"],
        "round": 2,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [153],
        "unlock_local": 4,
        "display_name": "Economics Meta"
    },
    "65": {
        "slug": "human-capital",
        "answers": ["MANPOWER"],
        "round": 2,
        "prerequisites": [153],
        "unlock_local": 3,
        "partials": {
            "GROWNUPDUDE": "Keep going...",
            "MAN": "Keep going...",
            "WORKOVERTIME": "Keep going...",
            "POWER": "Keep going..."
        },
        "display_name": "Human Capital"
    },
    "66": {
        "slug": "category-theory",
        "answers": ["SESAMECHICKEN"],
        "round": 1,
        "unlock_global": 23,
        "prerequisites": [155],
        "partials": {
            "CHNSDSHS": "Good progress. Keep going...",
            "CHINESEDISHES": "Good progress. Keep going...",
            "SESAME": "Good progress. Keep going...",
            "CHICKEN": "Good progress. Keep going..."
        },
        "display_name": "MATH 15 Category Theory"
    },
    "67": {
        "slug": "pyramid-schemes",
        "answers": ["DELTA"],
        "round": 2,
        "unlock_global": 0,
        "prerequisites": [153],
        "unlock_local": 0,
        "partials": {
            "FIFTHLAYER": "Keep going..."
        },
        "display_name": "Pyramid Schemes"
    },
    "68": {
        "slug": "fibonacci-sequence",
        "answers": ["MADAMEBLANCHE"],
        "round": 1,
        "prerequisites": [155],
        "unlock_local": 1,
        "partials": {
            "SHRIMP": "Yes, that's an answer to one of the minipuzzles.",
            "ELEVATOR": "Yes, that's an answer to one of the minipuzzles.",
            "SCOLDING": "Yes, that's an answer to one of the minipuzzles.",
            "BESWARMS": "Yes, that's an answer to one of the minipuzzles.",
            "NANOMITES": "Yes, that's an answer to one of the minipuzzles.",
            "ANIME": "Yes, that's an answer to one of the minipuzzles.",
            "THISBE": "Yes, that's an answer to one of the minipuzzles.",
            "ANGELO": "Yes, that's an answer to one of the minipuzzles.",
            "PASCAL": "Yes, that's an answer to one of the minipuzzles.",
            "VIGENERE": "Yes, that's an answer to one of the minipuzzles.",
            "SENECA": "Yes, that's an answer to one of the minipuzzles.",
            "FIFTH": "Yes, that's an answer to one of the minipuzzles.",
            "LETTERS": "Yes, that's an answer to one of the minipuzzles.",
            "MADAMEBLANC": "That's the right idea, but you should use all thirteen answers."
        },
        "display_name": "MATH 122 The Fibonacci Sequence"
    },
    "69": {
        "slug": "key-changes",
        "answers": ["MACTAYLOR"],
        "round": 6,
        "unlock_global": 0,
        "prerequisites": [154],
        "unlock_local": 0,
        "partials": {
            "GARYSINISEONCSI": "Good progress. Keep going..."
        },
        "display_name": "Key Changes"
    },
    "70": {
        "slug": "alternative-orthographonology",
        "answers": ["DEN", "TOOTH"],
        "round": 4,
        "unlock_global": 9,
        "prerequisites": [150],
        "partials": {
            "AWORDOFLENGTHFIVEAFTEREMORBEFORECUEZEE": "Good progress. Keep going...",
            "AWORDOFLENGTHFIVEAFTERIORBEFOREDK": "Good progress. Keep going...",
            "AWORDOFLENGTHFIVEAFTEREYEORBEFOREDECAY": "Good progress. Keep going..."
        },
        "display_name": "Alternative Orthographonology"
    },
    "71": {
        "slug": "the-twelve-knights-of-the-round-table",
        "answers": ["COLTSWINTHESUPERBOWL"],
        "round": 3,
        "unlock_global": 14,
        "prerequisites": [149],
        "display_name": "The Twelve Knights of the Round Table"
    },
    "72": {
        "slug": "xnynzn",
        "answers": ["DEADLABEL"],
        "round": 1,
        "prerequisites": [155],
        "unlock_local": 3,
        "partials": {
            "FINDTHELASTWORDS": "Good progress. Keep going..."
        },
        "display_name": "MATH 0.9 xⁿ + yⁿ = zⁿ"
    },
    "73": {
        "slug": "the-british-invasion",
        "answers": ["DECKROOF"],
        "round": 6,
        "prerequisites": [154],
        "unlock_local": 3,
        "display_name": "The British Invasion"
    },
    "74": {
        "slug": "tour-management",
        "answers": ["CLUBSODA"],
        "round": 6,
        "unlock_global": 0,
        "prerequisites": [154],
        "unlock_local": 0,
        "display_name": "Tour Management"
    },
    "77": {
        "slug": "set-theory",
        "answers": ["SEALANE"],
        "round": 1,
        "prerequisites": [155],
        "unlock_local": 3,
        "partials": {
            "SIXONEFOUR": "Yes, that's an answer to one of the minipuzzles.",
            "SIXHUNDREDFOURTEEN": "Yes, that's an answer to one of the minipuzzles.",
            "SIXHUNDREDANDFOURTEEN": "Yes, that's an answer to one of the minipuzzles.",
            "SIXFOURTEEN": "Yes, that's an answer to one of the minipuzzles.",
            "TWOOHFIVE": "Yes, that's an answer to one of the minipuzzles.",
            "TWOZEROFIVE": "Yes, that's an answer to one of the minipuzzles.",
            "TWOHUNDREDFIVE": "Yes, that's an answer to one of the minipuzzles.",
            "TWOHUNDREDANDFIVE": "Yes, that's an answer to one of the minipuzzles.",
            "THREEOHONE": "Yes, that's an answer to one of the minipuzzles.",
            "THREEZEROONE": "Yes, that's an answer to one of the minipuzzles.",
            "THREEHUNDREDONE": "Yes, that's an answer to one of the minipuzzles.",
            "THREEHUNDREDANDONE": "Yes, that's an answer to one of the minipuzzles.",
            "FOURONETWO": "Yes, that's an answer to one of the minipuzzles.",
            "FOURTWELVE": "Yes, that's an answer to one of the minipuzzles.",
            "FOURHUNDREDTWELVE": "Yes, that's an answer to one of the minipuzzles.",
            "FOURHUNDREDANDTWELVE": "Yes, that's an answer to one of the minipuzzles.",
            "ONEONENINE": "Yes, that's an answer to one of the minipuzzles.",
            "ONENINETEEN": "Yes, that's an answer to one of the minipuzzles.",
            "ONEHUNDREDNINETEEN": "Yes, that's an answer to one of the minipuzzles.",
            "ONEHUNDREDANDNINETEEN": "Yes, that's an answer to one of the minipuzzles.",
            "FIVEOHONE": "Yes, that's an answer to one of the minipuzzles.",
            "FIVEZEROONE": "Yes, that's an answer to one of the minipuzzles.",
            "FIVEHUNDREDONE": "Yes, that's an answer to one of the minipuzzles.",
            "FIVEHUNDREDANDONE": "Yes, that's an answer to one of the minipuzzles.",
            "MAYDAY": "Yes, that's an answer to one of the minipuzzles.",
            "SEVENOHFIVE": "Yes, that's an answer to one of the minipuzzles.",
            "SEVENZEROFIVE": "Yes, that's an answer to one of the minipuzzles.",
            "SEVENHUNDREDFIVE": "Yes, that's an answer to one of the minipuzzles.",
            "SEVENHUNDREDANDFIVE": "Yes, that's an answer to one of the minipuzzles."
        },
        "display_name": "MATH -34012208 Set Theory"
    },
    "80": {
        "slug": "music-meta",
        "answers": ["DRUMKITS"],
        "round": 6,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [154],
        "unlock_local": 4,
        "display_name": "Music Meta"
    },
    "81": {
        "slug": "lie-groups",
        "answers": ["MASSCLAIM"],
        "round": 1,
        "prerequisites": [155],
        "unlock_local": 1,
        "display_name": "MATH 200 Lie Groups"
    },
    "83": {
        "slug": "the-history-of-crossword-puzzles",
        "answers": ["JOHNGLENNFLIESOUTTOSPACE"],
        "round": 3,
        "prerequisites": [149],
        "unlock_local": 1,
        "display_name": "The History of Crossword Puzzles"
    },
    "85": {
        "slug": "the-music-of-rascal-flatts",
        "answers": ["ROYCHIAO"],
        "round": 6,
        "prerequisites": [154],
        "unlock_local": 1,
        "partials": {
            "HEPLAYEDLAOCHE": "Good progress. Keep going...",
            "LAOCHEHEPLAYED": "Good progress. Keep going..."
        },
        "display_name": "The Music of Rascal Flatts"
    },
    "87": {
        "slug": "the-middle-class",
        "answers": ["BUSINESS"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "partials": {
            "RISKY": "Good progress. Keep going...",
            "MODEL": "Good progress. Keep going...",
            "RISKYMODEL": "Good progress. Keep going..."
        },
        "display_name": "The Middle Class"
    },
    "89": {
        "slug": "guns-and-butter",
        "answers": ["VISA"],
        "round": 2,
        "prerequisites": [153],
        "unlock_local": 3,
        "display_name": "Guns and Butter"
    },
    "91": {
        "slug": "the-telescope",
        "answers": ["SEATTLECOUNTYNAMESAKEDIES"],
        "round": 3,
        "prerequisites": [149],
        "unlock_local": 1,
        "display_name": "The Telescope"
    },
    "92": {
        "slug": "cryptocurrency",
        "answers": ["INTUIT"],
        "round": 2,
        "unlock_global": 0,
        "prerequisites": [153],
        "unlock_local": 0,
        "display_name": "Cryptocurrency"
    },
    "93": {
        "slug": "how-the-other-half-lives",
        "answers": ["SCHEMA", "STOOL"],
        "round": 4,
        "prerequisites": [150],
        "unlock_local": 2,
        "display_name": "How the Other Half Lives"
    },
    "94": {
        "slug": "the-music-of-taylor-swift",
        "answers": ["BRUTIMPERIAL"],
        "round": 6,
        "prerequisites": [154],
        "unlock_local": 3,
        "display_name": "The Music of Taylor Swift"
    },
    "95": {
        "slug": "choreography",
        "answers": ["MODERNCHIC"],
        "round": 6,
        "unlock_global": 0,
        "prerequisites": [154],
        "unlock_local": 0,
        "partials": {
            "INDEXUSINGBALLETFOOTPOSITIONS": "Good progress. Keep going..."
        },
        "display_name": "Choreography"
    },
    "128": {
        "slug": "the-social-ladder-through-the-ages",
        "answers": ["EARLYCAMBRIAN"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "partials": {
            "FINDEACHSPOTWITHSAMECHARFROMBOTHWORDTHENREADINTOYEAR": "Good progress. Keep going..."
        },
        "display_name": "The Social Ladder through the Ages"
    },
    "129": {
        "slug": "sociology-of-education",
        "answers": ["YOUNGATHEART"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "partials": {
            "AIRY": "Yes, that's an answer to one of the minipuzzles.",
            "MONKMCFAY": "Yes, that's an answer to one of the minipuzzles.",
            "SLUG": "Yes, that's an answer to one of the minipuzzles.",
            "PINT": "Yes, that's an answer to one of the minipuzzles.",
            "WING": "Yes, that's an answer to one of the minipuzzles.",
            "ABRA": "Yes, that's an answer to one of the minipuzzles.",
            "RETILE": "Yes, that's an answer to one of the minipuzzles.",
            "FISHY": "Yes, that's an answer to one of the minipuzzles.",
            "TUNE": "Yes, that's an answer to one of the minipuzzles.",
            "AREA": "Yes, that's an answer to one of the minipuzzles.",
            "ROSEDALE": "Yes, that's an answer to one of the minipuzzles.",
            "TENTH": "Yes, that's an answer to one of the minipuzzles."
        },
        "display_name": "Sociology of Education"
    },
    "130": {
        "slug": "social-pathology",
        "answers": ["DEEPEND"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "display_name": "Social Pathology"
    },
    "131": {
        "slug": "recognition-on-a-first-name-basis",
        "answers": ["ARRIVAL"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "partials": {
            "LOUBEGA": "Good progress. Keep going..."
        },
        "display_name": "Recognition on a First-Name Basis"
    },
    "133": {
        "slug": "transformative-social-change",
        "answers": ["WRACKZONE"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "partials": {
            "SHIFTMIDDLETWICE": "Good progress. Keep going..."
        },
        "display_name": "Transformative Social Change"
    },
    "135": {
        "slug": "the-eurozone",
        "answers": ["ADOBE"],
        "round": 2,
        "prerequisites": [153],
        "unlock_local": 1,
        "display_name": "The Eurozone"
    },
    "136": {
        "slug": "socio-logical-inquiry-into-commerce",
        "answers": ["WILDORCHIDS"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "partials": {
            "ANSWILDORCHIDS": "Good progress. Keep going..."
        },
        "display_name": "Socio-logical Inquiry Into Commerce"
    },
    "137": {
        "slug": "c-is-for-closing-bell",
        "answers": ["PROGRESSIVE"],
        "round": 2,
        "prerequisites": [153],
        "unlock_local": 2,
        "display_name": "C is for Closing Bell"
    },
    "138": {
        "slug": "ozymandias",
        "answers": ["RUST"],
        "round": 5,
        "prerequisites": [156],
        "unlock_local": 4,
        "display_name": "Ozymandias"
    },
    "139": {
        "slug": "learningfromouroldmistakes",
        "answers": ["MISSISSIPPIADMITTEDTOUNION"],
        "round": 3,
        "unlock_global": 14,
        "prerequisites": [149],
        "partials": {
            "SEEWRONGANSWERSFINDSHIFTFOREACHLETTERTHENSHIFTTITLEOFTHIS": "Good progress. Keep going..."
        },
        "display_name": "Learning from Our Old Mistakes"
    },
    "140": {
        "slug": "the-olympics",
        "answers": ["BEAU"],
        "round": 5,
        "unlock_global": 30,
        "prerequisites": [156],
        "partials": {
            "CROSSBAR": "Yes, that's an answer to one of the minipuzzles.",
            "JOEGIBBS": "Yes, that's an answer to one of the minipuzzles.",
            "OLDFLAME": "Yes, that's an answer to one of the minipuzzles.",
            "NUMERALS": "Yes, that's an answer to one of the minipuzzles.",
            "REUNIONS": "Yes, that's an answer to one of the minipuzzles."
        },
        "display_name": "The Olympics"
    },
    "141": {
        "slug": "lesser-labors",
        "answers": ["BENDER"],
        "round": 5,
        "prerequisites": [156],
        "unlock_local": 3,
        "partials": {
            "GOSUBMITBENDER": "Good progress. Keep going..."
        },
        "display_name": "Lesser Labors"
    },
    "142": {
        "slug": "articles-of-incorporation",
        "answers": ["HYPOTHESIS", "RAM"],
        "round": 4,
        "prerequisites": [150],
        "unlock_local": 5,
        "partials": {
            "SCIENTIFICGUESS": "Good progress. Keep going..."
        },
        "display_name": "Articles of Incorporation"
    },
    "143": {
        "slug": "transposition",
        "answers": ["CHOKEKNOBS"],
        "round": 6,
        "unlock_global": 0,
        "prerequisites": [154],
        "unlock_local": 0,
        "display_name": "Transposition"
    },
    "145": {
        "slug": "cryptosociology",
        "answers": ["THELISTENER"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "display_name": "Cryptosociology"
    },
    "146": {
        "slug": "differences-in-emotional-expression",
        "answers": ["TALKBACK"],
        "round": 7,
        "unlock_global": 36,
        "prerequisites": [157],
        "display_name": "Differences in Emotional Expression"
    },
    "147": {
        "slug": "themesandcounterthemes",
        "answers": ["PARIS", "SHELF"],
        "round": 4,
        "unlock_global": 9,
        "prerequisites": [150],
        "display_name": "Themes and Counterthemes"
    },
    "148": {
        "slug": "the-hundred-years-war",
        "answers": ["JOHNSONASSUMESPRESIDENCY"],
        "round": 3,
        "prerequisites": [149],
        "unlock_local": 2,
        "display_name": "The Hundred Years' War"
    },
    "149": {
        "slug": "interlude-history",
        "answers": ["UNHOLYPREDATERS"],
        "round": 11,
        "unlock_global": 14,
        "prerequisites": [10013],
        "display_name": "Interlude: History"
    },
    "150": {
        "slug": "interlude-english",
        "answers": ["NEGATIVEDOUBLES"],
        "round": 11,
        "unlock_global": 9,
        "prerequisites": [10013],
        "display_name": "Interlude: English"
    },
    "151": {
        "slug": "interlude-computer-science",
        "answers": ["BUGS"],
        "round": 11,
        "unlock_global": 19,
        "prerequisites": [10013],
        "display_name": "Interlude: Computer Science"
    },
    "153": {
        "slug": "interlude-econ",
        "answers": ["DATATRADING"],
        "round": 11,
        "unlock_global": 0,
        "prerequisites": [10013],
        "display_name": "Interlude: Economics"
    },
    "154": {
        "slug": "interlude-music",
        "answers": ["TAMAMONOMAEWEST"],
        "round": 11,
        "unlock_global": 0,
        "prerequisites": [10013],
        "display_name": "Interlude: Music"
    },
    "155": {
        "slug": "interlude-math",
        "answers": ["WERENUMBERONE"],
        "round": 11,
        "unlock_global": 23,
        "prerequisites": [10013],
        "display_name": "Interlude: Mathematics"
    },
    "156": {
        "slug": "interlude-classics",
        "answers": ["MYTHCHIEF"],
        "round": 11,
        "prerequisites": [10013],
        "unlock_global": 30,
        "partials": {
            "DUSIMODUO": "Good progress, but those letters need to go in the correct spots."
        },
        "display_name": "Interlude: Classics"
    },
    "157": {
        "slug": "interlude-sociology",
        "answers": ["SCHOOLBULLIES"],
        "round": 11,
        "prerequisites": [10013],
        "unlock_global": 36,
        "display_name": "Interlude: Sociology"
    },
    "2019": {
        "slug": "lernaeanhydra",
        "answers": ["BOOGER"],
        "round": 5,
        "prerequisites": [156],
        "unlock_local": 3,
        "partials": {
            "POPCORNBALL": "Huh. Weird, when you submit this answer, no new heads appear.",
            "CINDERBLOCK": "Huh. Weird, when you submit this answer, no new heads appear.",
            "STEAMWHISTLE": "Huh. Weird, when you submit this answer, no new heads appear.",
            "MAGMAR": "Huh. Weird, when you submit this answer, no new heads appear.",
            "BREADNUT": "Huh. Weird, when you submit this answer, no new heads appear.",
            "GLASSLIZARD": "Huh. Weird, when you submit this answer, no new heads appear."
        },
        "display_name": "The Lernaean Hydra"
    },
    "2027": {
        "slug": "proxy_hydra_1",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "is_hidden": true,
        "partials": {
            "BREADNUT": "Huh. Weird, when you submit this answer, no new heads appear."
        },
        "display_name": "Hydra 1 Proxy"
    },
    "2029": {
        "slug": "proxy_hydra_2",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "is_hidden": true,
        "partials": {
            "GLASSLIZARD": "Huh. Weird, when you submit this answer, no new heads appear."
        },
        "display_name": "Hydra 2 proxy"
    },
    "2032": {
        "slug": "proxy_hydra_3",
        "answers": ["STONER"],
        "round": 9,
        "is_hidden": true,
        "partials": {
            "MAGMAR": "Huh. Weird, when you submit this answer, no new heads appear."
        },
        "display_name": "Hydra 3 proxy"
    },
    "2033": {
        "slug": "proxy_hydra_4",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "is_hidden": true,
        "partials": {
            "STEAMWHISTLE": "Huh. Weird, when you submit this answer, no new heads appear."
        },
        "display_name": "Hydra 4 proxy"
    },
    "2034": {
        "slug": "proxy_hydra_5",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "is_hidden": true,
        "partials": {
            "CINDERBLOCK": "Huh. Weird, when you submit this answer, no new heads appear."
        },
        "display_name": "Hydra 5 proxy"
    },
    "2035": {
        "slug": "proxy_hydra_0",
        "answers": ["CORNBALL"],
        "round": 9,
        "is_hidden": true,
        "partials": {
            "POPCORNBALL": "Huh. Weird, when you submit this answer, no new heads appear."
        },
        "display_name": "Hydra 0 proxy"
    },
    "2036": {
        "slug": "hydra0",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2037": {
        "slug": "hydra1",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2038": {
        "slug": "hydra2",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2039": {
        "slug": "hydra3",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2040": {
        "slug": "hydra4",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2041": {
        "slug": "hydra5",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2042": {
        "slug": "hydra6",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2043": {
        "slug": "hydra7",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2044": {
        "slug": "hydra8",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2045": {
        "slug": "hydra9",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2046": {
        "slug": "hydra10",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2047": {
        "slug": "hydra11",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2048": {
        "slug": "hydra12",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2049": {
        "slug": "hydra13",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2050": {
        "slug": "hydra14",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2051": {
        "slug": "hydra15",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2052": {
        "slug": "hydra16",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2053": {
        "slug": "hydra17",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2054": {
        "slug": "hydra18",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2055": {
        "slug": "hydra19",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2056": {
        "slug": "hydra20",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2057": {
        "slug": "hydra21",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2058": {
        "slug": "hydra22",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2059": {
        "slug": "hydra23",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2060": {
        "slug": "hydra24",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2061": {
        "slug": "hydra25",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2062": {
        "slug": "hydra26",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2063": {
        "slug": "hydra27",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2064": {
        "slug": "hydra28",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2065": {
        "slug": "hydra29",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2066": {
        "slug": "hydra30",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2067": {
        "slug": "hydra31",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2068": {
        "slug": "hydra32",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2069": {
        "slug": "hydra33",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2070": {
        "slug": "hydra34",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2071": {
        "slug": "hydra35",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2072": {
        "slug": "hydra36",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2073": {
        "slug": "hydra37",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2074": {
        "slug": "hydra38",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2075": {
        "slug": "hydra39",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2076": {
        "slug": "hydra40",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2077": {
        "slug": "hydra41",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2078": {
        "slug": "hydra42",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2079": {
        "slug": "hydra43",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2080": {
        "slug": "hydra44",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2081": {
        "slug": "hydra45",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2082": {
        "slug": "hydra46",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2083": {
        "slug": "hydra47",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2084": {
        "slug": "hydra48",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2085": {
        "slug": "hydra49",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2086": {
        "slug": "hydra50",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2087": {
        "slug": "hydra51",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2088": {
        "slug": "hydra52",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2089": {
        "slug": "hydra53",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2090": {
        "slug": "hydra54",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2091": {
        "slug": "hydra55",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2092": {
        "slug": "hydra56",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2093": {
        "slug": "hydra57",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2094": {
        "slug": "hydra58",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2095": {
        "slug": "hydra59",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2096": {
        "slug": "hydra60",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2097": {
        "slug": "hydra61",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2098": {
        "slug": "hydra62",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2099": {
        "slug": "hydra63",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2100": {
        "slug": "hydra64",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2101": {
        "slug": "hydra65",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2102": {
        "slug": "hydra66",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2103": {
        "slug": "hydra67",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2104": {
        "slug": "hydra68",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2105": {
        "slug": "hydra69",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2106": {
        "slug": "hydra70",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2107": {
        "slug": "hydra71",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2108": {
        "slug": "hydra72",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2109": {
        "slug": "hydra73",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2110": {
        "slug": "hydra74",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2111": {
        "slug": "hydra75",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2112": {
        "slug": "hydra76",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2113": {
        "slug": "hydra77",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2114": {
        "slug": "hydra78",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2115": {
        "slug": "hydra79",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2116": {
        "slug": "hydra80",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2117": {
        "slug": "hydra81",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2118": {
        "slug": "hydra82",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2119": {
        "slug": "hydra83",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2120": {
        "slug": "hydra84",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2121": {
        "slug": "hydra85",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2122": {
        "slug": "hydra86",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2123": {
        "slug": "hydra87",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2124": {
        "slug": "hydra88",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2125": {
        "slug": "hydra89",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2126": {
        "slug": "hydra90",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2127": {
        "slug": "hydra91",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2128": {
        "slug": "hydra92",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2129": {
        "slug": "hydra93",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2130": {
        "slug": "hydra94",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2131": {
        "slug": "hydra95",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2132": {
        "slug": "hydra96",
        "answers": ["CORNBALL"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2133": {
        "slug": "hydra97",
        "answers": ["DOUGHNUT"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2134": {
        "slug": "hydra98",
        "answers": ["SANDLIZARD"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2135": {
        "slug": "hydra99",
        "answers": ["STONER"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2136": {
        "slug": "hydra100",
        "answers": ["WATERWHISTLE"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "2137": {
        "slug": "hydra101",
        "answers": ["WOODBLOCK"],
        "round": 9,
        "display_name": "Hydra Head"
    },
    "10001": {
        "slug": "ph1",
        "answers": ["MANOVERBOARD"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "SAYOSCARONBOAT": "Good progress. Keep going..."
        },
        "display_name": "PH1: Vexillology"
    },
    "10002": {
        "slug": "ph2",
        "answers": ["PERISH"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "display_name": "PH2: They're Coming to Attack Your Village!"
    },
    "10003": {
        "slug": "ph3",
        "answers": ["WITCHY"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "DONHENLEYTYPEOFWOMAN": "Good progress. Keep going..."
        },
        "display_name": "PH3: Mr. Tambourine Man"
    },
    "10004": {
        "slug": "ph4",
        "answers": ["MURDER"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "HAMLETREVENGEHISFOULANDMOSTUNNATURAL": "Good progress. Keep going..."
        },
        "display_name": "PH4: Inspector Clue D'oh"
    },
    "10005": {
        "slug": "ph5",
        "answers": ["DIRE"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "display_name": "PH5: Mission: Langley Heist"
    },
    "10006": {
        "slug": "ph6",
        "answers": ["GRIM"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "THISVOLUMINOUSUNHOLYDOGHAUNTSCHURCHYARDS": "Good progress. Keep going...",
            "CHURCHGRIM": "Just submit 'GRIM'.",
            "CHURCHYARDGRIM": "Just submit 'GRIM'."
        },
        "display_name": "PH6: Time Frame"
    },
    "10007": {
        "slug": "ph7",
        "answers": ["BOO"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "EIGHTHUNDRED": "Good progress. 'Calculate' that answer."
        },
        "display_name": "PH7: Numerator, Denominator, Fascinator"
    },
    "10008": {
        "slug": "ph8",
        "answers": ["DEADMANSHAND"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "HOLDINGBLACKACESANDEIGHTS": "Good progress. Keep going..."
        },
        "display_name": "PH8: Poker Table"
    },
    "10009": {
        "slug": "ph9",
        "answers": ["CHANGELING"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "display_name": "PH9: Dynamic Duos"
    },
    "10010": {
        "slug": "ph10",
        "answers": ["THALASSOPHOBIA"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "THEFEAROFDEEPWATER": "Good progress. Keep going..."
        },
        "display_name": "PHA: Water Beds"
    },
    "10011": {
        "slug": "ph11",
        "answers": ["DOOM"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "display_name": "PH11: Breakout"
    },
    "10012": {
        "slug": "ph12",
        "answers": ["THESEWORDSAREOMINOUS"],
        "round": 10,
        "is_meta": true,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "HEARD": "Yes, that is part of the puzzle.",
            "MOOSE": "Yes, that is part of the puzzle.",
            "TORUS": "Yes, that is part of the puzzle.",
            "WINES": "Yes, that is part of the puzzle."
        },
        "display_name": "PH123: Final Jeopardy"
    },
    "10013": {
        "slug": "ph13",
        "answers": ["DEANMARTIAN"],
        "round": 10,
        "is_meta": true,
        "is_round_meta": true,
        "unlock_global": 0,
        "unlock_local": 0,
        "prerequisites": [10012],
        "partials": {
            "MARS": "Good progress. Keep going...",
            "DEANMARTIN": "Check your work."
        },
        "display_name": "PH123: Web of Lies"
    },
    "10014": {
        "slug": "ph14",
        "answers": ["TERMINAL"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "display_name": "PH14: Making Tracks"
    },
    "10015": {
        "slug": "ph15",
        "answers": ["NIGHTOFTHELIVINGDEAD"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "DAYOFTHEDEADALIVE": "Good progress. Keep going..."
        },
        "display_name": "PH15: The Bad, the Good, and the Beautiful"
    },
    "10016": {
        "slug": "ph16",
        "answers": ["WAR"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "THEARTOFANDPEACE": "Good progress. Keep going..."
        },
        "display_name": "PH16: Intermediate Compositions"
    },
    "10017": {
        "slug": "ph17",
        "answers": ["HURT"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "JOHNNYCASHANDNINEINCHNAILS": "Good progress. Keep going..."
        },
        "display_name": "PH17: Juke Box Hero"
    },
    "10018": {
        "slug": "ph18",
        "answers": ["CASUALTY"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "CASUALTEA": "Good progress. Keep going..."
        },
        "display_name": "PH18: To Serve Man"
    },
    "10019": {
        "slug": "ph19",
        "answers": ["POSSESSED"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "display_name": "PH19: Better Off Ned"
    },
    "10020": {
        "slug": "ph20",
        "answers": ["WICKED"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "AMUSICALABOUTELPHABA": "Good progress. Keep going..."
        },
        "display_name": "PH20: There's No Business Like Show Business"
    },
    "10021": {
        "slug": "ph21",
        "answers": ["DARKNESS"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "display_name": "PH21: Introduction to Sprite Design"
    },
    "10022": {
        "slug": "ph22",
        "answers": ["MELANCHOLY"],
        "round": 10,
        "unlock_global": 0,
        "unlock_local": 0,
        "partials": {
            "COUNTBYPI": "Good progress. Keep going...",
            "FIFTHLETTERS": "Good progress. Keep going...",
            "MELON": "Good progress. Keep going...",
            "COLLIE": "Good progress. Keep going...",
            "MELONCOLLIE": "Good progress. Keep going..."
        },
        "display_name": "PH22: Blue Moons"
    },
    "1000000": {
        "slug": "major-monster-mash",
        "answers": ["BACKALORRYATHIMTHENEARNAMONSTERSDEBRIS"],
        "round": 1000,
        "unlock_global": 999,
        "unlock_local": 999,
        "is_meta": true,
        "is_round_meta": true,
        "prerequisites": [48, 49, 52, 54, 60, 61, 63, 80, 10013],
        "display_name": "Major Monster Mash"
    }
}
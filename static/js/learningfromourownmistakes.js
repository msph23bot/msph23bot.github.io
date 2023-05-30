/* NOTE TO THOSE INSPECTING THE SOURCE CODE:
The source code here contains plaintext spoilers for the Interludes puzzles.
Please don't read any further if you want to try the puzzles without being spoiled.
You have been warned!




































*/

learning_clue_phrase = 'SEEWRONGANSWERSFINDSHIFTFOREACHLETTERTHENSHIFTTITLEOFTHIS'
learning_clue_phrase_len = learning_clue_phrase.length
learning_clue_map = {
    'AE':['Craftsman who works with bricks','Particle with an equal number of quarks and antiquarks'],
    'AF':['Festivus activity','Giving a pink slip to'],
    'AI':['Divert the attention of','&ldquo;The ____ Sleeps Alone Tonight&rdquo;'],
    'AL':['Cardigan, e.g.','Suffer from the heat'],
    'AN':['One who consumes food','It&apos;s between shift and backslash'],
    'AO':['Wheat or barley','Protective cup location'],
    'AR':['Very skinny','Weightlifter noise'],
    'AS':['Up above','Podcast hosted by Sarah Koenig'],
    'AW':['8th letter','Sorceress'],
    'BF':['Image puzzles, or certain crossword squares','Says &ldquo;no way&rdquo;'],
    'BG':['Churned cream result','Bowling groove'],
    'BL':['Partial discount','Empathize'],
    'BO':['Canterbury wife&apos;s home','Solemn vow'],
    'BS':['Grow, as a new bud','What Weird Al is like, in a Madonna parody'],
    'BT':['Wipe with a Q-Tip','Hit a fly'],
    'BW':['Kind of cyclone or squad','Where babies develop'],
    'CA':['Flaw','Vanquish'],
    'CE':['Rugby formation','Solute component of blood'],
    'CG':['Dasher follower','Peril'],
    'CH':['Disperse in many directions','Break like porcelain'],
    'CN':['Ride for a child','Where children might store money'],
    'CR':['Easily identifiable','&ldquo;Isn&apos;t it ____, dontcha think?&rdquo;'],
    'CT':['Actor with six degrees','It&apos;s passed at a relay'],
    'CW':['Rascal','Land that gives black mana, in Magic: The Gathering'],
    'DA':['Dry like a desert','Solo vocal piece'],
    'DE':['Befuddle','Singer with albums <i>21</i> and <i>25</i>'],
    'DF':['Toward the pillow, maybe','Make look small comparatively'],
    'DH':['Worked in a short-term job','Tofu alternative popular in Indonesia'],
    'DI':['Hummed like a refrigerator','Pressed clothes smooth'],
    'DL':['Tragedy plus time','Good-looking'],
    'DN':['Tranquilize','100-person legislative body'],
    'DO':['Target of a long, conical hat of ineptitude','1/16 of a pound'],
    'DR':['Award for a Scout&apos;s sash','Large ship'],
    'DS':['Like a roll of the dice','Payment made to a blackmailer'],
    'EA':['It&apos;s not a dichotomy for an enby','Male goose'],
    'EF':['By a nose or the skin of one&apos;s teeth','Tavern regular'],
    'EG':['City in Orange County','Composer Berlin'],
    'EI':['Quantity with direction and magnitude','It comes between Uniform and Whiskey'],
    'EO':['His 350+-year-old last theorem was proven in the 1990s','Convert a hard disk to NTFS, e.g.'],
    'ER':['Force of gravity','<i>SimCity</i> developer Will'],
    'ES':['Fragments','Zodiacal fish'],
    'ET':['Attempt to communicate with spirits','Position on a topic'],
    'EW':['Where loafers might hang out','Seattle music venue founded in 1939'],
    'FA':['<i>Che!</i> actor Omar','Islamic law'],
    'FG':['Communion item','Bet'],
    'FH':['One that might fall in the fall','Rachel&apos;s sister and Reuben&apos;s mother'],
    'FN':['Parody','The dish&apos;s elopement partner'],
    'FS':['<i>____ in Socks</i>','Red or White baseball team'],
    'FT':['Cat-loving sitcom alien','Mtn. measurement'],
    'FW':['Avow','Superior skill or ability'],
    'GA':['Quagmire','It&apos;s long and can be feathered or scaled'],
    'GE':['Make point the same way','Xenomorph, for one'],
    'GH':['&ldquo;You&apos;re the man now, ____&rdquo;','Homer interjection'],
    'GI':['Dune spice','<i>Working Girl</i> actress Griffith'],
    'GL':['Divine Alanis movie','Wrapped grape leaf snack'],
    'GO':['Avoids, like a ball in gym class','Extinct birds'],
    'GR':['Smash Bros. character featured in Home Run Contest','Shoal'],
    'GT':['Workplace for a blacksmith','Loud, in music'],
    'HE':['Like one despised by Holden Caulfield','State flower of Indiana'],
    'HF':['A.A. Milne&apos;s Winnie','Sound of something vanishing'],
    'HI':['Rhetorical appeal to emotion','Paved outdoor dining areas'],
    'HL':['Game bird','Nice and charming'],
    'HR':['Capital of Iran','Earthling, in sci-fi settings'],
    'HS':['Car, train, or plane, e.g.','Sac or cyst'],
    'HW':['<i>So You ____ You Can Dance?</i>','Young, thin gay man'],
    'IA':['Come to a conclusion','Ten year stretch'],
    'IE':['App where you swipe left or right','Delicate'],
    'IF':['Lower than a tenor, for short','Lose one&apos;s lunch'],
    'IG':['Spongebob dwelling, with Bottom','Exercise that might need gear?'],
    'IN':['Chinese dog breed known for its wrinkles','Hone'],
    'IS':['Tissue abnormality','Structured class period'],
    'IT':['Less challenging','It&apos;s 47 days after Mardi Gras'],
    'IW':['Zombie aim','Muscley strength'],
    'JA':['Timberlake or Bieber, for two','It&apos;s kept &ldquo;weird&rdquo; in Texas'],
    'JE':['Unsettling','Lobe ornament'],
    'JF':['Give a shot with a syringe','Get someone sick'],
    'JG':['Kind of shrimp, oxymoronically','Creole stew'],
    'JH':['Plane driven by turbines','Elijah or Muhammad, e.g.'],
    'JL':['Ice/psychic-type pokémon','Bobcat'],
    'JN':['<i>The ____ Game</i> (1954 musical)','Central American country'],
    'JO':['Disturb or container','Rower&apos;s implement'],
    'JR':['Daily anagram puzzle in some newspapers','&ldquo;Let&apos;s get ready to ____!&rdquo;'],
    'JT':['&ldquo;Don&apos;t Stop Believin&apos;&rdquo; band','Bracketed competition, for short'],
    'JW':['It may begin with &ldquo;Knock knock&rdquo;','Politically aware'],
    'KE':['Therapist, informally','One of many <i>Breath of the Wild</i> locations'],
    'KF':['He had a bad fur day','Bestow'],
    'KG':['Citadel in Moscow','Mogwai fed after midnight'],
    'KH':['Engage in melee','Connect'],
    'KI':['Unhealthy','Italian island'],
    'KL':['Milk option','Thin'],
    'KO':['Feijão-de-porco','Era after Elizabethan'],
    'KS':['Fee that restaurants charge to open the wine that you brought','Small bouquet worn on a dress'],
    'LA':['Soundgarden frontman','Related to the clear outer eye layer'],
    'LF':['Complete loss on a ledger sheet','Wayne Manor butler'],
    'LG':['Fish with a spear-like snout','Border around a page'],
    'LH':['Feature of some bucks','Pollen bearer'],
    'LI':['Senior','Cuddy&apos;s duck'],
    'LN':['A scarecrow is out standing in his','Demon or fanatic'],
    'LT':['&ldquo;The ____ did it!&rdquo;','Churned cream result'],
    'LW':['Bacteria responsible for many food poisoning cases','Lane on <i>Desperate Housewives</i>'],
    'MA':['<i>____ Kombat</i>','Related to a heart chamber'],
    'ME':['<i>The Office</i> actress Ellie','Quidditch goaltender'],
    'MG':['Fishy guy','Language in Munich'],
    'MH':['Pork or beef, e.g.','Schwarzenegger and Belushi movie'],
    'MI':['Vilify','Remove charged particles'],
    'MN':['Prisoner','Congenital or natural'],
    'MO':['Fish used to make lox','Bar in the old west'],
    'MR':['Latex intimacy barrier','California vulture'],
    'MW':['&ldquo;How You ____ Me&rdquo; (Nickelback song)','Be kind to future video renters'],
    'NA':['Partner of McCartney, Harrison, and Starr','&ldquo;____ me, when you&apos;re not strong&rdquo;'],
    'NE':['Invalidate, like a court ruling','Orchestral introduction'],
    'NF':['&ldquo;____ Gonna Give You Up&rdquo;','High internal body temperature'],
    'NH':['Carrot-nosed construct','<i>The Greatest ____</i> (Hugh Jackman film)'],
    'NI':['Motherly','Physical'],
    'NL':['What Madonna is like','<i>The Aeneid</i> author'],
    'NO':['Breathe noisily','Baked egg dish'],
    'NR':['Time separator','Rainbow element'],
    'NS':['Not near the ocean','Place surrounded by ocean'],
    'OF':['&ldquo;Roots&rdquo; storyteller','Swindle'],
    'OG':['<i>Ocean&apos;s Eleven</i> setting','Sausage feature'],
    'OI':['Reindeer after Cupid','Evening meal'],
    'OL':['Silly sort','Tee time club target'],
    'OS':['Dickens boy with a Twist','Thin fragment'],
    'OT':['Andean grain','<i>Abbott Elementary</i> creator Brunson'],
    'OW':['Greasy','Crafty like a Mega Man villain'],
    'PA':['<i>Gravity Falls</i> boy','Baby butt covering'],
    'PE':['Jane Goodall subject','Ring like a grandfather clock'],
    'PG':['Bird said to collect shiny objects','Bart&apos;s youngest sister'],
    'PH':['Substance &ldquo;discovered&rdquo; by Nikolai Fedyakin','Liquid that&apos;s harmful to vampires'],
    'PL':['<i>The Great ____</i> (James Earl Jones film)','Hypothetical singularity that cannot be entered'],
    'PN':['Large, spotted cat','Composer Bernstein'],
    'PR':['Idea','Musical performance'],
    'PT':['Pardon','Fetch'],
    'QA':['Page with answers to common inquiries','Airplane regulatory group'],
    'QE':['African tea plant, or a tool useful for word puzzles','Have, as a snack'],
    'QF':['Calmed, like a rebellion','Put gas into'],
    'QH':['Leave a job or program','Nice eight'],
    'QI':['<i>Kazaam</i> actor, informally','&ldquo;If I Ever Fall in Love&rdquo; group'],
    'QL':['Sine ____ non','Programming language created by Roberto Ierusalimschy'],
    'QN':['Baghdad&apos;s country','Mashhad&apos;s country'],
    'QO':['African tea plant, or a tool useful for word puzzles','Bran'],
    'QR':['African tea plant, or a tool useful for word puzzles','Remy or Splinter, e.g.'],
    'QS':['Leave a job or program','Spades or zoot, e.g.'],
    'RE':['Less cowardly','Producer of a flavorful castoreum'],
    'RF':['One who rides waves','Undergo pain'],
    'RG':['Extremely mad','Betrothed'],
    'RI':['Negatively charged particle','Candidate voting event'],
    'RL':['Alternative type','Very brave'],
    'RN':['Submerge','Extremely big'],
    'RO':['Hoosegow','Bret Michaels&apos;s band'],
    'RS':['Tree cover','Soak, as in sunlight or glory'],
    'RT':['<i>Maverick</i> star James','January birthstone'],
    'RW':['Using an awl or dull','Bending over to show respect'],
    'SA':['Louisiana&apos;s version of a county','Outcast'],
    'SF':['Is dependent','Alleviation'],
    'SG':['Pain pills','Wanting to achieve'],
    'SH':['Shape of a pizza slice','Trojan warrior'],
    'SN':['Ice on a windshield','Back opposite'],
    'SO':['Backbone','Express one&apos;s views'],
    'ST':['Move a king past a rook','Cows'],
    'SW':['Santa Maria or Larry Stylinson, e.g.','Indiana Jones&apos;s weapon'],
    'TE':['Shoot out water','Assistant to a knight'],
    'TG':['Extremely dissimilar','Belittle, as one&apos;s character'],
    'TH':['Respond too strongly','Attempt too much'],
    'TI':['Relating to teeth','Prohibition'],
    'TL':['Behavior','Answer to &ldquo;how high?&rdquo;'],
    'TN':['Pitiful person','Tool used for turning bolts'],
    'TO':['Substance finer than sand but coarser than clay','Structure for storing grain or missiles'],
    'TR':['Whiskey or tape','Sear'],
    'UC':['Yellowcake component','Game with Creative Cat, Data Head, et al.'],
    'UE':['Twentieth letter of the Greek alphabet','Fifth letter of the Greek alphabet'],
    'UF':['Retired Supreme Court justice David','More downy'],
    'UH':['&ldquo;The Manassa ____&rdquo;','Composer Gustav'],
    'UI':['With childlike simplicity, not cunning','Really clever'],
    'UL':['Sherpa, for one','Coast without thrust'],
    'UO':['Frisbee-like saucer','Dancehalls'],
    'UR':['Cause to last indefinitely','Commit, as a crime'],
    'US':['Button indicated by || on a remote','Old hat'],
    'UW':['Had a head-to-head match','Stayed for a while, or lived there'],
    'VA':['Handcrafted blade','Actor LaBeouf'],
    'VD':['You, right now, e.g.', 'Alloy used to fuse metallic surfaces'],
    'VF':['Not standard','Boldly resistant'],
    'VG':['Sell off, as a stock','<i>Reader&apos;s ____</i>'],
    'VI':['Starts a point, in tennis','Sum of a sequence'],
    'VN':['Interval from do to do','Compound with the formula C₈H₁₈'],
    'VR':['Remove one&apos;s beard','Split with others'],
    'VS':['Graffiti artist, perhaps','Teva or Birkenstock'],
    'VT':['Squalid home','It&apos;s between India and golf'],
    'VW':['Venomous snake','Blade on a windshield'],
    'WA':['&ldquo;My, how tall you&apos;ve ____&rdquo;','Response to a pun'],
    'WE':['Bending over to show respect','Aircraft manufacturer founded in Seattle'],
    'WG':['Bounty','Esteem'],
    'WH':['Gulp down','Superficial'],
    'WL':['Sorceror','Lounge devotee or skink'],
    'WN':['Fine dust','Contemplate'],
    'WO':['Farfalle shape','Covering for a baby&apos;s foot'],
    'WR':['Adult female','Friend or countryman of Mark Antony'],
    'WS':['Infinity Stone found by Star-Lord','Pretender'],
    'WT':['Fix an electrical system','Stop working'],
    'XF':['Scan used to view bones','Come apart, like a knot'],
    'XH':['Curses from a witch, maybe','Laughs'],
    'XI':['Fly scientist who created the Mousers','One applying a worm to a hook'],
    'XL':['Anglo-____','Spot for barbers or poets'],
    'XO':['It&apos;s between echo and golf','<i>____ Flats: The Dog&apos;s Tale</i> (1986)'],
    'XR':['Joe ____, tiger enthusiast','Sensual'],
    'XS':['Chat via SMS','Exam'],
    'XT':['Give off, as an odor','Piano exercise piece'],
    'YA':['Cornish pie','Spaghetti or fusilli, e.g.'],
    'YG':['Corn product used to make grits','Zeroing (in on)'],
    'YI':['City with a famous opera house','Actor Poitier'],
    'YL':['&ldquo;... gentlemen, let nothing you ____&rdquo;','Gloomy'],
    'YN':['Inter','Hot sauce feeling'],
    'YS':['Part of a cake or outfit','Pointer that entertains cats'],
    'YT':['Grand Arizona feature','Switzerland region'],
    'YW':['Place for a home garden or cookout','Regressive'],
    'ZA':['A cracker, or a hotel','Power Rangers villain Repulsa'],
    'ZE':['Autoharp','&ldquo;I don&apos;t care which -  ____ one is fine&rdquo;'],
    'ZH':['Popular brand of lighters','Hungry, hungry animal in a children&apos;s game'],
    'ZN':['Fidget spinners or Beanie Babies, once','Water bird or construction vehicle'],
    'ZO':['<i>Age of __</i> (Sufjan Stevens album)','<i>Much ____ About Nothing</i>'],
    'ZR':['&ldquo;____ of Glory&rdquo; (Jon Bon Jovi song)','Sound loudly, as an alert'],
    'ZT':['Man of the apes','Plaid cloth'],
    'ZW':['Lemon rind','Batman actor Adam'],
    'BC':['Attorney/judge private conference','Cognac, orange liqueur, and lemon juice with a sugar rim'],
    'AC':['Not held in silently','FFVII large-sworded protagonist'],
    'YC':['Unwavering in support','From the neighborhood, say'],
    'XC':['Lumberjack tool or body spray','High card in a royal flush'],
    'SC':['High ____, high reward','Morty&apos;s reckless grandfather'],
    'RC':['Hallucinating, maybe','Very yummy'],
    'PC':['Truncate, as an image','Fashionable (?) clog'],
    'OC':['Way to release creativity','Sliced section of meat'],
    'NC':['Great ____ National Park (Nevada)','Language in the opening of Look Around You'],
    'LC':['Analyze, as a situation','Get out quickly'],
    'KC':['Similar','Wonderland explorer'],
    'IC':['Turncoat','Large farm machinery'],
    'HC':['Levitate','Duck&apos;s partner in a PSA'],
    'GC':['Cold symptom','Sofa'],
    'FC':['<i>It&apos;s a Wonderful ____</i>','Reason to shave one&apos;s head?'],
    'EC':['Yarn','1 on the Mohs scale'],
    'CD':['Unit of distance or, to Han Solo, time','Divided into grammatical parts'],
    'BD':['&ldquo;I ____ you into this world - I can take you out of it&rdquo;','Dry spell'],
    'ZD':['Slothful','Tramp&apos;s partner'],
    'YD':['<i>30 Rock</i> star Tina','Central bank of the US, with &ldquo;the&rdquo;'],
    'TD':['Prestigious','Remove, as a sound when speaking'],
    'SD':['Betty White role','Travelled by horse, maybe'],
    'QD':['Excellence rating','Dichotomy'],
    'PD':['Actor Dinklage','Prevent, as unwanted behavior'],
    'OD':['Actor Mickey','Comedian Dangerfield'],
    'MD':['16-year-old Veronan loverboy','&ldquo;This ain&apos;t my first ____&rdquo;'],
    'LD':['Giggles, chortles, and others','Female offspring'],
    'JD':['Stiller or Seinfeld','<i>____ Girls</i>: sitcom set in Northern Ireland'],
    'ID':['Eastern European or Russian pancake','Afflicted with anopia'],
    'HD':['One who carries out a bris','One who may pose for an art class'],
    'GD':['&ldquo;Charlie bit my __!&rdquo;','&ldquo;____&apos;s keepers&rdquo;'],
    'FD':['Couch','Pop which may come from a jerk']}

function learning_errata()
{
    // get all the wrong answers
    wrong_submissions = []
    for (const [id, puz] of Object.entries(puzzleDbPuzzles)) {
        let wrong = localStorage.getItem("incorrect-" + id);
        if (!wrong)
        {
            continue;
        }
        
        let incorrectList = wrong.split("|").sort();
        for (i = 0; i < incorrectList.length; i++)
        {
            dg = incorrectList[i]
            timestampString = dg.substring(0, dg.indexOf(","))
            timestamp = Date.parse(timestampString)
            wrongSubmission = dg.substring(dg.indexOf(",") + 1);
            wrong_submissions.push([timestampString, wrongSubmission, puz.display_name])
        }
    }
    wrong_submissions.sort(function(a,b) {return Date.parse(a[0]) - Date.parse(b[0])})
    // console.log(wrong_submissions)

    idx = 0
    ans =  'MISSISSIPPIADMITTEDTOUNION'
    clue = 'LEARNINGFROMOUROLDMISTAKES'
    retval = []
    for (i = 0; i < wrong_submissions.length; i++)
    {
        if (wrong_submissions[i][2].substring(0,5) == 'hydra')
        {
            continue;
        }

        errata = []

        submission = wrong_submissions[i][1];
        if (wrong_submissions[i][1].indexOf("\u2794") > 0)
        {
            // handle i/o
            submission = wrong_submissions[i][1].substring(wrong_submissions[i][1].indexOf("\u2794") + 1)
        }

        re = /[^A-Z]/g
        submission = submission.toUpperCase().replace(re,'')

        // console.log('submission',submission)
        for (j = 0; j < submission.length; j++)
        {
            c = submission[j]
            x = c.toUpperCase()
            y = learning_clue_phrase[idx % learning_clue_phrase_len].toUpperCase()
            d = x.charCodeAt(0) - 'A'.charCodeAt(0)
            // console.log('c',c,'x',x,'y',y,'d',d,'ans[d]',ans[d],'clue[d]',clue[d])
            shift = ans[d].charCodeAt(0) - clue[d].charCodeAt(0)
            if (shift < 0) shift += 26
            w = y.charCodeAt(0) - shift - 'A'.charCodeAt(0)
            if (w < 0)
            {
                w += 26
            }
            w = String.fromCharCode(w + 'A'.charCodeAt(0))
            key = w + y
            e = learning_clue_map[key]
            // console.log('erratum',e[0],e[1])
            cur_erratum = [e[0], e[1]]
            errata.push(cur_erratum)
            idx += 1
        }
        retval.push([wrong_submissions[i][0], wrong_submissions[i][2], errata])
    }

    div = document.getElementById("learning");
    for (i = 0; i < retval.length; i++)
    {
        errorTitle = document.createElement("div")
        errorTitle.className = "puzzle-erratum"
        ertime = new Date(retval[i][0])
        errorTitle.innerHTML = 'Errata <time datetime="' + retval[i][0] + '" data-format="M j, H:i">'+ertime.toString()+'</time> In the puzzle ' + retval[i][1] + ', ' + retval[i][2].length + ' clues were incorrect:<br>'
        div.appendChild(errorTitle)
        for (j = 0; j < retval[i][2].length; j++)
        {
            erratum = document.createElement("span")
            erratum.innerHTML = 'The clue [' + retval[i][2][j][0] + '] has been changed to [' + retval[i][2][j][1] + '] <br />'
            div.appendChild(erratum)

        }
        if (retval[i][2].length > 0)
        {
            div.appendChild(document.createElement("br"))
        }
    }
    return retval
}



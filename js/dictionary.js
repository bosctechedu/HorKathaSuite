/* ═══════════════════════════════════════════════════════════════════════
   📚 DICTIONARY MODULE — Hor Katha Suite v3.7.4
   Languages: English · हिन्दी (Hindi) · Santali (Roman only)
   Permanent entries always visible at top
   ═══════════════════════════════════════════════════════════════════════ */
(function setupDictionary() {
    'use strict';

    /* ═══════════════════════════════════════════════════════════════════
       📖 WORD DATA
       Extend any array freely — UI, search, and copy work with any size.
       ═══════════════════════════════════════════════════════════════════ */

    const DICTIONARY = {

        /* ─────────────────────────────────────────────────────────────
           🇬🇧 ENGLISH
           ───────────────────────────────────────────────────────────── */
        english: [
            // Pronouns & Articles
            'I','you','he','she','it','we','they','me','him','her','us','them',
            'my','your','his','its','our','their','mine','yours','hers','ours','theirs',
            'myself','yourself','himself','herself','itself','ourselves','themselves',
            'this','that','these','those','who','whom','whose','which','what',
            'the','a','an','some','any','all','every','each','both','either','neither',
            'nobody','somebody','anybody','everybody','nothing','something','anything','everything',

            // Greetings & Courtesy
            'hello','hi','hey','goodbye','bye','farewell','thanks','thank you','welcome',
            'please','sorry','excuse me','pardon','yes','no','okay','alright','sure',
            'maybe','perhaps','help','good','best','great','congratulations','cheers',
            'good morning','good afternoon','good evening','good night',
            'how are you','nice to meet you','see you soon','take care','well done',

            // Be / Have / Do
            'be','am','is','are','was','were','been','being',
            'have','has','had','having','do','does','did','done','doing',
            'will','would','shall','should','can','could','may','might','must','ought',

            // Common Verbs (A–Z)
            'accept','achieve','add','admire','admit','advise','agree','allow','answer',
            'appear','apply','argue','arrange','arrive','ask','attack','attend','avoid',
            'bake','bark','battle','bear','beat','become','begin','behave','believe',
            'belong','bend','bet','bind','bite','blame','bless','blow','boil','borrow',
            'bother','bounce','bow','break','breathe','breed','bring','broadcast','build',
            'burn','burst','bury','buy','calculate','call','cancel','care','carry',
            'catch','cause','celebrate','change','chase','cheat','check','cheer','chew',
            'choose','clap','clean','climb','close','collect','combine','come','command',
            'compare','compete','complain','complete','concern','confirm','connect',
            'consider','consist','contain','continue','cook','copy','correct','cough',
            'count','cover','crack','crash','crawl','create','cross','crush','cry','cut',
            'damage','dance','dare','deal','decide','declare','decorate','delay','deliver',
            'demand','deny','depend','describe','deserve','design','desire','destroy',
            'detect','develop','die','dig','disagree','disappear','discover','discuss',
            'divide','do','doubt','drag','draw','dream','dress','drink','drive','drop',
            'drown','dry','eat','earn','educate','elect','embarrass','employ','empty',
            'enable','encourage','enjoy','enter','escape','examine','exchange','excite',
            'excuse','exercise','exist','expand','expect','explain','explode','explore',
            'express','extend','fail','fall','fasten','feed','feel','fetch','fight',
            'fill','find','finish','fit','fix','flee','float','flow','fly','fold',
            'follow','forbid','force','forget','forgive','freeze','frighten','gain',
            'gather','get','give','go','govern','grab','greet','grow','guess','guide',
            'hang','happen','hate','have','heal','hear','help','hide','hit','hold',
            'hope','hug','hunt','hurry','hurt','identify','ignore','imagine','imitate',
            'improve','include','increase','indicate','inform','injure','insist','inspect',
            'inspire','install','intend','interrupt','introduce','invent','invite','involve',
            'join','joke','judge','jump','keep','kick','kill','kiss','kneel','knock','know',
            'lack','land','last','laugh','launch','lay','lead','leak','lean','learn',
            'leave','lend','let','lie','lift','light','like','limit','listen','live',
            'load','lock','look','lose','love','lower','maintain','make','manage','march',
            'mark','marry','match','matter','mean','measure','meet','melt','mention',
            'mix','move','murder','name','need','notice','obey','observe','obtain',
            'occur','offer','open','operate','order','organize','own','pack','paint',
            'park','part','pass','paste','pay','perform','permit','persuade','pick',
            'plan','plant','play','please','point','pollute','post','pour','practise',
            'pray','prefer','prepare','present','preserve','press','pretend','prevent',
            'print','produce','promise','protect','protest','prove','provide','publish',
            'pull','punish','push','put','question','quit','race','rain','raise','reach',
            'read','realize','receive','recognize','record','reduce','refuse','regret',
            'relax','release','remember','remove','repair','repeat','replace','reply',
            'report','rescue','respect','rest','retire','return','review','ride','ring',
            'rise','risk','rob','roll','rub','ruin','rule','run','rush','sail','save',
            'say','scare','scatter','scold','search','see','seem','sell','send','separate',
            'serve','settle','shake','share','shave','shine','shoot','shop','shout',
            'show','shut','sing','sink','sit','sleep','slide','smell','smile','smoke',
            'sneeze','snore','solve','sort','sound','speak','spend','spill','spin',
            'spit','split','spoil','spot','spread','stand','stare','start','stay',
            'steal','steer','stick','sting','stir','stop','stretch','strike','study',
            'submit','succeed','suffer','suggest','supply','support','suppose','surprise',
            'surround','survive','swallow','swear','sweep','swim','swing','switch','take',
            'talk','taste','teach','tear','tell','tend','test','thank','think','threaten',
            'throw','tick','tie','touch','trade','train','translate','travel','treat',
            'tremble','trust','try','turn','twist','type','understand','undo','unite',
            'unlock','urge','use','vanish','visit','voice','vote','wait','wake','walk',
            'wander','want','warn','wash','waste','watch','wave','wear','weep','weigh',
            'welcome','whisper','win','wipe','wish','wonder','work','worry','wrap','write','yell',

            // Common Nouns
            'time','year','month','week','day','hour','minute','second','moment','century',
            'morning','afternoon','evening','night','midnight','noon','dawn','dusk','today',
            'tomorrow','yesterday','weekend','holiday','birthday','anniversary','future','past','present',
            'people','person','man','woman','child','baby','kid','boy','girl','adult',
            'friend','family','mother','father','brother','sister','son','daughter',
            'grandfather','grandmother','uncle','aunt','cousin','nephew','niece',
            'husband','wife','partner','neighbor','colleague','boss','employee','employer',
            'student','teacher','doctor','nurse','engineer','lawyer','soldier','police',
            'farmer','worker','driver','pilot','artist','writer','singer','dancer','actor',
            'world','country','nation','city','town','village','community','society',
            'school','college','university','hospital','library','museum','park','zoo',
            'market','shop','store','mall','bank','office','factory','restaurant','hotel',
            'home','house','apartment','room','kitchen','bedroom','bathroom','garden',
            'door','window','wall','floor','ceiling','roof','stairs','gate','yard',
            'water','food','bread','rice','milk','tea','coffee','juice','sugar','salt',
            'oil','butter','cheese','egg','meat','fish','fruit','vegetable','grain','wheat',
            'apple','banana','mango','orange','grape','lemon','strawberry','watermelon',
            'potato','tomato','onion','garlic','carrot','spinach','cabbage','pepper',
            'tea','spice','honey','cake','cookie','sweet','dessert','soup','salad','sandwich',
            'plate','cup','glass','bowl','spoon','fork','knife','pan','pot','bottle',
            'table','chair','bed','sofa','desk','shelf','drawer','cupboard','mirror','clock',
            'book','pen','pencil','paper','notebook','bag','box','key','lock','map',
            'computer','phone','television','radio','camera','watch','speaker','screen',
            'car','bus','train','plane','ship','boat','bicycle','motorcycle','truck','taxi',
            'road','street','highway','bridge','station','airport','port','tunnel','traffic',
            'tree','flower','grass','leaf','branch','root','seed','wood','forest','jungle',
            'animal','dog','cat','cow','horse','goat','sheep','pig','chicken','duck',
            'lion','tiger','elephant','monkey','bear','wolf','fox','deer','rabbit','snake',
            'bird','eagle','parrot','crow','sparrow','peacock','owl','pigeon','hen','cock',
            'insect','butterfly','bee','ant','mosquito','fly','spider','worm','snail','frog',
            'sun','moon','star','sky','cloud','rain','snow','storm','wind','thunder',
            'lightning','rainbow','weather','climate','season','summer','winter','spring','autumn',
            'river','lake','sea','ocean','pond','stream','waterfall','wave','beach','shore',
            'mountain','hill','valley','desert','plain','field','rock','stone','sand','soil',
            'fire','smoke','ash','flame','heat','cold','light','dark','shadow','sound',
            'color','red','blue','green','yellow','black','white','orange','pink','brown',
            'purple','gray','gold','silver','bronze',
            'money','coin','note','price','cost','profit','loss','wage','salary','tax',
            'business','company','industry','trade','product','service','customer','market',
            'government','law','rule','right','duty','vote','election','leader','minister','president',
            'war','peace','conflict','victory','defeat','army','navy','soldier','weapon','gun',
            'health','disease','medicine','doctor','hospital','pain','cure','wound','fever','cold',
            'education','knowledge','skill','lesson','class','exam','result','degree','study','practice',
            'art','music','dance','song','poem','story','novel','film','movie','drama',
            'game','sport','football','cricket','tennis','chess','hockey','basketball','race','match',
            'news','story','report','article','book','magazine','newspaper','letter','message','email',
            'language','word','sentence','meaning','grammar','speech','voice','sound','name','title',
            'love','hate','fear','hope','joy','sadness','anger','surprise','worry','stress',
            'dream','goal','plan','idea','thought','mind','heart','soul','spirit','body',
            'head','face','eye','ear','nose','mouth','lip','tooth','tongue','chin',
            'neck','shoulder','arm','hand','finger','nail','chest','back','stomach','waist',
            'leg','knee','foot','toe','skin','hair','blood','bone','muscle','brain',
            'clothes','shirt','pant','dress','skirt','jacket','coat','sweater','shoe','sandal',
            'hat','cap','sock','glove','scarf','tie','belt','ring','necklace','bracelet',

            // Adjectives
            'good','bad','great','excellent','poor','best','worst','better','worse',
            'big','small','large','little','huge','tiny','tall','short','long','wide',
            'narrow','thick','thin','heavy','light','fast','slow','quick','early','late',
            'new','old','young','ancient','modern','fresh','stale','clean','dirty','neat',
            'hot','cold','warm','cool','wet','dry','soft','hard','smooth','rough',
            'strong','weak','healthy','sick','tired','fresh','sleepy','awake','alive','dead',
            'happy','sad','angry','calm','afraid','brave','proud','ashamed','confused','sure',
            'honest','dishonest','kind','cruel','polite','rude','friendly','hostile','gentle','violent',
            'rich','poor','wealthy','expensive','cheap','valuable','worthless','rare','common','usual',
            'beautiful','ugly','pretty','handsome','cute','plain','elegant','smart','clever','foolish',
            'wise','stupid','intelligent','dumb','bright','dull','serious','funny','quiet','loud',
            'easy','difficult','simple','complex','possible','impossible','certain','doubtful','clear','unclear',
            'safe','dangerous','useful','useless','helpful','harmful','important','trivial','necessary','unnecessary',
            'true','false','real','fake','right','wrong','correct','incorrect','full','empty',
            'open','closed','free','busy','ready','unprepared','early','delayed','public','private',
            'sweet','sour','bitter','salty','spicy','tasty','delicious','bland','fresh','rotten',
            'red','blue','green','yellow','black','white','orange','pink','brown','purple',
            'golden','silver','colorful','pale','bright','dark','shiny','dull',
            'first','last','next','previous','middle','final','initial','early','late','recent',
            'many','few','several','some','all','none','both','each','every','most',
            'much','little','more','less','enough','plenty','abundant','scarce','enough','insufficient',

            // Adverbs
            'very','really','quite','extremely','too','so','such','absolutely','totally','completely',
            'always','usually','often','sometimes','rarely','never','frequently','occasionally','constantly','seldom',
            'now','then','soon','later','already','yet','still','just','recently','lately',
            'here','there','everywhere','nowhere','somewhere','anywhere','inside','outside','above','below',
            'up','down','left','right','forward','backward','near','far','close','away',
            'well','badly','quickly','slowly','carefully','carelessly','easily','hardly','honestly','seriously',
            'probably','possibly','certainly','definitely','perhaps','maybe','surely','obviously','clearly','apparently',
            'together','alone','apart','instead','rather','otherwise','however','therefore','moreover','meanwhile',
            'once','twice','thrice','again','also','too','either','neither','so','thus',
            'yes','no','not','never','none','nothing','nobody','neither','nor',

            // Prepositions
            'in','on','at','by','for','with','about','against','between','among',
            'through','during','before','after','above','below','under','over','to','from',
            'into','onto','upon','within','without','beyond','behind','beside','besides','around',
            'across','along','toward','towards','until','since','except','despite','regarding','concerning',
            'throughout','against','versus','via','per','plus','minus',

            // Conjunctions
            'and','but','or','so','because','although','though','unless','until','while',
            'whereas','since','if','when','whenever','wherever','whether','as','than','like',

            // Numbers
            'zero','one','two','three','four','five','six','seven','eight','nine','ten',
            'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty',
            'twenty-one','twenty-two','twenty-three','twenty-four','twenty-five',
            'thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand',
            'million','billion','trillion','first','second','third','fourth','fifth','sixth','seventh',
            'eighth','ninth','tenth','half','quarter','double','triple','single',

            // Days & Months
            'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
            'January','February','March','April','May','June','July','August',
            'September','October','November','December',

            // Technology
            'computer','software','hardware','internet','website','email','password','account','profile','login',
            'download','upload','click','scroll','type','save','delete','copy','paste','share',
            'social media','chat','message','video','audio','image','photo','picture','file','folder',
            'app','application','browser','search','engine','network','connection','server','database','cloud',

            // Emotions
            'happy','sad','angry','afraid','scared','excited','bored','curious','confused','surprised',
            'jealous','grateful','hopeful','hopeless','proud','ashamed','embarrassed','lonely','loved','hated',
            'worried','anxious','calm','peaceful','relaxed','stressed','tired','energetic','joyful','depressed',

            // Common Phrases
            'thank you','you are welcome','excuse me','I am sorry','how much','how many','what time','see you later',
            'good luck','best wishes','take care','have a nice day','how are you','I am fine','never mind','no problem',
            'of course','by the way','in fact','as well','at least','at most','in general','for example','such as','in order to',

            // Animals & Nature (additional)
            'butterfly','dragonfly','beetle','caterpillar','grasshopper','cricket','moth','scorpion','centipede','jellyfish',
            'whale','dolphin','shark','octopus','crab','lobster','prawn','turtle','tortoise','crocodile',
            'giraffe','zebra','kangaroo','panda','koala','hippo','rhino','camel','donkey','mule',
            'otter','badger','squirrel','hedgehog','raccoon','skunk','mole','bat','mouse','rat',
            'coconut','peanut','cashew','almond','walnut','pistachio','chestnut','hazelnut','date','fig',

            // School & Education
            'study','learn','teach','read','write','spell','count','solve','memorize','practice',
            'assignment','homework','project','test','exam','grade','mark','score','pass','fail',
            'question','answer','problem','solution','example','exercise','lesson','chapter','page','book',

            // Business & Money
            'buy','sell','trade','bargain','discount','offer','price','cost','profit','loss',
            'invest','loan','interest','credit','debit','bank','cash','check','receipt','invoice',
            'customer','client','supplier','partner','contract','agreement','meeting','schedule','deadline','report',

            // Travel
            'travel','journey','trip','tour','destination','passport','visa','ticket','luggage','suitcase',
            'reservation','booking','check-in','check-out','boarding','arrival','departure','delay','transfer','connection',
            'hotel','motel','resort','hostel','suite','room','bed','key','reception','lobby',

            // Health & Body
            'health','healthy','sick','ill','disease','illness','fever','cough','cold','headache',
            'stomachache','pain','injury','wound','bruise','burn','cure','heal','treatment','medicine',
            'pill','tablet','syrup','injection','vaccine','doctor','nurse','patient','hospital','clinic',

            // Time expressions
            'moment','instant','second','minute','hour','day','week','month','year','decade',
            'century','millennium','morning','noon','afternoon','evening','night','midnight','dawn','dusk',
            'today','tomorrow','yesterday','tonight','nowadays','currently','recently','soon','later','immediately'
        ],

        /* ─────────────────────────────────────────────────────────────
           🇮🇳 हिन्दी (HINDI)
           ───────────────────────────────────────────────────────────── */
        hindi: [
            // Pronouns
            'मैं','तू','तुम','आप','वह','वे','यह','ये','हम','मुझे','तुझे','तुम्हें','आपको','उसे','इसे','हमें',
            'मेरा','तेरा','तुम्हारा','आपका','उसका','इसका','हमारा','उनका','अपना','अपनी','अपने',
            'कौन','क्या','कहाँ','कब','क्यों','कैसे','कितना','कितनी','कितने','कौनसा','कौनसी','कौनसे',
            'कोई','कुछ','सब','सभी','हर','प्रत्येक','दोनों','ना','नहीं','हाँ','जी हाँ',
            'स्वयं','खुद','स्वयं ही','आपस में','सब कुछ','कुछ भी','कोई भी',

            // Greetings & Courtesy
            'नमस्ते','नमस्कार','जय श्री राम','जय हिन्द','धन्यवाद','शुक्रिया','स्वागत','स्वागत है','कृपया',
            'माफ़ी','सॉरी','क्षमा','ठीक','अच्छा','हाँ','नहीं','हैलो','बाय','अलविदा','फिर मिलेंगे',
            'सुप्रभात','शुभ संध्या','शुभ रात्रि','शुभ दिन','शुभ कामनाएं','बधाई हो','बहुत बढ़िया',
            'कैसे हैं आप','मैं ठीक हूँ','आपसे मिलकर खुशी हुई','अपना ध्यान रखें','फिर मिलते हैं',

            // Common Verbs
            'होना','हूँ','है','हैं','था','थी','थे','करना','करता हूँ','करते हैं','जाना','जाता हूँ',
            'आना','आता हूँ','खाना','खाता हूँ','पीना','पीता हूँ','सोना','सोता हूँ','उठना','उठता हूँ',
            'बैठना','बैठता हूँ','बोलना','बोलता हूँ','सुनना','सुनता हूँ','देखना','देखता हूँ',
            'पढ़ना','पढ़ता हूँ','लिखना','लिखता हूँ','समझना','समझता हूँ','जानना','जानता हूँ',
            'देना','देता हूँ','लेना','लेता हूँ','रखना','रखता हूँ','चलना','चलता हूँ','दौड़ना','दौड़ता हूँ',
            'हँसना','हँसता हूँ','रोना','रोता हूँ','गाना','गाता हूँ','नाचना','नाचता हूँ','सीखना','सीखता हूँ',
            'सिखाना','सिखाता हूँ','काम करना','काम करता हूँ','खेलना','खेलता हूँ','सोचना','सोचता हूँ',
            'मिलना','मिलता हूँ','बनाना','बनाता हूँ','खरीदना','खरीदता हूँ','बेचना','बेचता हूँ',
            'पूछना','पूछता हूँ','बताना','बताता हूँ','मदद करना','मदद करता हूँ','प्यार करना','प्यार करता हूँ',
            'रहना','रहता हूँ','मरना','मरता हूँ','जीना','जीता हूँ','पीना','खाना','पकाना','धोना',
            'साफ़ करना','सजाना','ढूंढना','पाना','खोना','दौड़ना','चढ़ना','उतरना','गिरना','फेंकना',
            'पकड़ना','छोड़ना','तोड़ना','जोड़ना','मिलाना','बदलना','सीखना','भूलना','याद रखना','याद करना',
            'सोना','जागना','स्नान करना','कपड़े पहनना','तैयार होना','सफ़र करना','यात्रा करना','घूमना',
            'देखभाल करना','बात करना','चर्चा करना','विचार करना','निर्णय लेना','चुनना','शुरू करना',
            'समाप्त करना','जारी रखना','रुकना','इंतज़ार करना','वापस आना','वापस जाना','आना-जाना',
            'काम करना','आराम करना','मुस्कुराना','हिलाना','घूमना','उड़ना','तैरना','दौड़ना','कूदना',
            'पकाना','परोसना','खिलाना','नहलाना','सुलाना','जगाना','बुलाना','भेजना','लिखना','पढ़ना',
            'गिनना','तोलना','मापना','काटना','सिलना','बुनना','रंगना','चित्र बनाना','गाना','बजाना',
            'समझाना','सीखाना','पढ़ाना','प्रशिक्षण देना','परीक्षा देना','उत्तीर्ण होना','असफल होना',

            // Common Nouns
            'समय','साल','वर्ष','महीना','माह','सप्ताह','हफ़्ता','दिन','घंटा','मिनट','सेकंड','पल','शताब्दी',
            'सुबह','दोपहर','शाम','रात','आधी रात','दोपहर','भोर','संध्या','आज','कल','परसों',
            'सप्ताहांत','छुट्टी','जन्मदिन','सालगिरह','भविष्य','अतीत','वर्तमान','अभी','अब',
            'लोग','व्यक्ति','आदमी','औरत','बच्चा','शिशु','लड़का','लड़की','वयस्क','बूढ़ा','बुजुर्ग',
            'दोस्त','मित्र','सखा','परिवार','माँ','पिता','भाई','बहन','बेटा','बेटी','पोता','पोती',
            'दादा','दादी','नाना','नानी','चाचा','चाची','मामा','मामी','मौसा','मौसी','फूफा','बुआ',
            'पति','पत्नी','साथी','जीवनसाथी','पड़ोसी','सहकर्मी','मालिक','कर्मचारी','नौकर','सेवक',
            'छात्र','शिक्षक','अध्यापक','गुरु','डॉक्टर','नर्स','इंजीनियर','वकील','सैनिक','पुलिस',
            'किसान','मज़दूर','ड्राइवर','पायलट','कलाकार','लेखक','गायक','नर्तक','अभिनेता','निर्माता',
            'दुनिया','संसार','देश','राष्ट्र','राज्य','शहर','नगर','गाँव','समाज','समुदाय','जनता',
            'स्कूल','विद्यालय','कॉलेज','विश्वविद्यालय','अस्पताल','पुस्तकालय','संग्रहालय','उद्यान','चिड़ियाघर',
            'बाज़ार','दुकान','मॉल','बैंक','कार्यालय','दफ़्तर','कारखाना','रेस्टोरेंट','होटल','सराय',
            'घर','मकान','अपार्टमेंट','कमरा','रसोई','शयनकक्ष','स्नानघर','बगीचा','आँगन','छत',
            'दरवाज़ा','खिड़की','दीवार','फर्श','छत','सीढ़ी','फाटक','गेट','दालान',
            'पानी','जल','भोजन','खाना','रोटी','चावल','दूध','चाय','कॉफी','रस','शर्बत','चीनी','नमक',
            'तेल','घी','मक्खन','पनीर','अंडा','मांस','मछली','फल','सब्ज़ी','अनाज','गेहूँ','चावल','दाल',
            'सेब','केला','आम','संतरा','अंगूर','नींबू','स्ट्रॉबेरी','तरबूज़','खरबूज़ा','अनानास',
            'आलू','टमाटर','प्याज़','लहसुन','गाजर','पालक','पत्तागोभी','मिर्च','अदरक','धनिया',
            'मसाला','शहद','केक','बिस्किट','मिठाई','मिठाई','हलवा','खीर','सूप','सलाद','सैंडविच',
            'थाली','प्लेट','कप','गिलास','कटोरा','चम्मच','काँटा','चाकू','तवा','कड़ाही','बोतल','जग',
            'मेज़','कुर्सी','बिस्तर','सोफ़ा','डेस्क','आलमारी','दराज़','शीशा','दर्पण','घड़ी',
            'किताब','पुस्तक','कलम','पेंसिल','कागज़','कॉपी','बस्ता','डिब्बा','चाबी','ताला','नक्शा',
            'कंप्यूटर','फ़ोन','टेलीविज़न','रेडियो','कैमरा','घड़ी','स्पीकर','स्क्रीन','मोबाइल','लैपटॉप',
            'कार','गाड़ी','बस','ट्रेन','हवाई जहाज़','जहाज़','नाव','साइकिल','मोटरसाइकिल','ट्रक','टैक्सी',
            'सड़क','मार्ग','राजमार्ग','पुल','स्टेशन','हवाई अड्डा','बंदरगाह','सुरंग','यातायात',
            'पेड़','पौधा','फूल','घास','पत्ता','शाखा','जड़','बीज','लकड़ी','जंगल','वन',
            'जानवर','पशु','कुत्ता','बिल्ली','गाय','घोड़ा','बकरी','भेड़','सूअर','मुर्गी','बत्तख',
            'शेर','बाघ','हाथी','बंदर','भालू','भेड़िया','लोमड़ी','हिरण','खरगोश','साँप',
            'पक्षी','चिड़िया','बाज','तोता','कौआ','गौरैया','मोर','उल्लू','कबूतर','मुर्गा',
            'कीट','तितली','मधुमक्खी','चींटी','मच्छर','मक्खी','मकड़ी','केंचुआ','घोंघा','मेंढक',
            'सूरज','सूर्य','चाँद','चंद्रमा','तारा','आसमान','आकाश','बादल','बारिश','बर्फ़','तूफ़ान','हवा','बिजली',
            'इंद्रधनुष','मौसम','जलवायु','ऋतु','गर्मी','सर्दी','बसंत','शरद','वर्षा',
            'नदी','झील','समुद्र','सागर','तालाब','धारा','झरना','लहर','समुद्र तट','किनारा',
            'पहाड़','पहाड़ी','घाटी','रेगिस्तान','मैदान','खेत','चट्टान','पत्थर','रेत','मिट्टी',
            'आग','धुआँ','राख','लौ','गर्मी','ठंड','रोशनी','प्रकाश','अंधेरा','छाया','आवाज़','ध्वनि',
            'रंग','लाल','नीला','हरा','पीला','काला','सफ़ेद','नारंगी','गुलाबी','भूरा','बैंगनी','धूसर','सुनहरा','चाँदी','कांस्य',
            'पैसा','रुपया','सिक्का','नोट','कीमत','लागत','लाभ','हानि','वेतन','मज़दूरी','कर','बजट',
            'व्यापार','कंपनी','उद्योग','व्यापार','उत्पाद','सेवा','ग्राहक','बाज़ार','बिक्री','खरीद',
            'सरकार','कानून','नियम','अधिकार','कर्तव्य','वोट','चुनाव','नेता','मंत्री','राष्ट्रपति','प्रधानमंत्री',
            'युद्ध','शांति','संघर्ष','जीत','हार','सेना','नौसेना','सैनिक','हथियार','बंदूक',
            'स्वास्थ्य','बीमारी','दवा','डॉक्टर','अस्पताल','दर्द','इलाज','घाव','बुखार','सर्दी',
            'शिक्षा','ज्ञान','कौशल','पाठ','कक्षा','परीक्षा','परिणाम','डिग्री','अध्ययन','अभ्यास',
            'कला','संगीत','नृत्य','गीत','कविता','कहानी','उपन्यास','फ़िल्म','नाटक','अभिनय',
            'खेल','फुटबॉल','क्रिकेट','टेनिस','शतरंज','हॉकी','बास्केटबॉल','दौड़','मैच','प्रतियोगिता',
            'समाचार','खबर','रिपोर्ट','लेख','पत्रिका','अखबार','पत्र','संदेश','ईमेल','संचार',
            'भाषा','शब्द','वाक्य','अर्थ','व्याकरण','भाषण','आवाज़','ध्वनि','नाम','शीर्षक',
            'प्रेम','प्यार','घृणा','नफ़रत','डर','भय','आशा','उम्मीद','खुशी','आनंद','दुख','क्रोध','गुस्सा','आश्चर्य','चिंता','तनाव',
            'सपना','लक्ष्य','योजना','विचार','मन','हृदय','दिल','आत्मा','शरीर','जीवन',
            'सिर','सर','चेहरा','आँख','कान','नाक','मुँह','होठ','दाँत','जीभ','ठोड़ी',
            'गर्दन','कंधा','बाज़ू','हाथ','उँगली','नाखून','छाती','पीठ','पेट','कमर',
            'पैर','घुटना','पंजा','त्वचा','बाल','रक्त','खून','हड्डी','मांसपेशी','मस्तिष्क','दिमाग',
            'कपड़े','कमीज़','पतलून','पोशाक','स्कर्ट','जैकेट','कोट','स्वेटर','जूता','चप्पल',
            'टोपी','मोज़ा','दस्ताना','दुपट्टा','टाई','बेल्ट','अंगूठी','हार','कंगन','झुमका',

            // Adjectives
            'अच्छा','बुरा','शानदार','बढ़िया','गरीब','सर्वोत्तम','सबसे खराब','बेहतर','खराब',
            'बड़ा','छोटा','विशाल','विशाल','लंबा','ऊँचा','नीचा','चौड़ा','संकरा','मोटा','पतला',
            'भारी','हल्का','तेज़','धीमा','जल्दी','देर','नया','पुराना','युवा','प्राचीन','आधुनिक','ताज़ा','बासी',
            'साफ़','गंदा','स्वच्छ','गर्म','ठंडा','गीला','सूखा','मुलायम','सख़्त','चिकना','खुरदुरा',
            'मज़बूत','कमज़ोर','स्वस्थ','बीमार','थका','नींद','जागता','जीवित','मृत',
            'खुश','दुखी','गुस्सा','शांत','डरा','बहादुर','गर्व','शर्मिंदा','भ्रमित','निश्चित',
            'ईमानदार','बेईमान','दयालु','क्रूर','विनम्र','अभद्र','मिलनसार','शत्रुतापूर्ण','सज्जन','हिंसक',
            'अमीर','गरीब','धनी','महँगा','सस्ता','कीमती','बेकार','दुर्लभ','सामान्य','सामान्य',
            'सुंदर','बदसूरत','सुंदर','आकर्षक','प्यारा','सादा','सुरुचिपूर्ण','स्मार्ट','चतुर','मूर्ख',
            'बुद्धिमान','बुद्धिमान','समझदार','मूर्ख','तेज़','धीमा','गंभीर','मज़ाकिया','शांत','ज़ोरदार',
            'आसान','कठिन','सरल','जटिल','संभव','असंभव','निश्चित','संदिग्ध','स्पष्ट','अस्पष्ट',
            'सुरक्षित','खतरनाक','उपयोगी','बेकार','सहायक','हानिकारक','महत्वपूर्ण','मामूली','आवश्यक','अनावश्यक',
            'सच्चा','झूठा','असली','नकली','सही','गलत','पूर्ण','खाली','खुला','बंद','मुक्त','व्यस्त','तैयार','अतैयार',
            'मीठा','खट्टा','कड़वा','नमकीन','मसालेदार','स्वादिष्ट','स्वादिष्ट','फीका','ताज़ा','सड़ा',
            'पहला','अंतिम','अगला','पिछला','मध्य','अंतिम','प्रारंभिक','देर','हाल का','बहुत',
            'कई','कुछ','कई','सब','कोई नहीं','दोनों','हर','सबसे','बहुत','थोड़ा','अधिक','कम','पर्याप्त','बहुतायत','कमी',

            // Adverbs
            'बहुत','वास्तव में','काफ़ी','अत्यंत','भी','इतना','ऐसा','बिल्कुल','पूरी तरह','पूर्णतः',
            'हमेशा','आमतौर पर','अक्सर','कभी-कभी','शायद ही कभी','कभी नहीं','बार-बार','कभी-कभार','लगातार','कभी-कभी',
            'अब','तब','जल्दी','बाद में','पहले से','अभी भी','बिल्कुल','हाल ही में','हाल में',
            'यहाँ','वहाँ','हर जगह','कहीं नहीं','कहीं','कहीं भी','अंदर','बाहर','ऊपर','नीचे',
            'ऊपर','नीचे','बाएँ','दाएँ','आगे','पीछे','पास','दूर','निकट','दूर',
            'अच्छी तरह','बुरी तरह','जल्दी से','धीरे-धीरे','सावधानी से','लापरवाही से','आसानी से','मुश्किल से','ईमानदारी से','गंभीरता से',
            'शायद','संभवतः','निश्चित रूप से','निश्चित रूप से','शायद','स्पष्ट रूप से','जाहिर तौर पर','स्पष्ट रूप से',
            'एक साथ','अकेले','अलग','इसके बजाय','बल्कि','अन्यथा','हालांकि','इसलिए','इसके अलावा','इस बीच',
            'एक बार','दो बार','तीन बार','फिर से','भी','भी','या तो','न तो','इसलिए','इस प्रकार',
            'हाँ','नहीं','नहीं','कभी नहीं','कोई नहीं','कुछ नहीं','कोई नहीं','न तो','न',

            // Prepositions
            'में','पर','पर','से','के लिए','के साथ','के बारे में','के खिलाफ','के बीच','में से',
            'के माध्यम से','के दौरान','से पहले','के बाद','के ऊपर','के नीचे','के नीचे','के ऊपर','को','से',
            'में','पर','पर','के भीतर','के बिना','से परे','के पीछे','के बगल में','के अलावा','चारों ओर',
            'पार','साथ में','की ओर','तक','से','को छोड़कर','के बावजूद','के संबंध में','के बारे में',
            'भर में','के खिलाफ','बनाम','के माध्यम से','प्रति','प्लस','माइनस','के साथ','के बिना',

            // Conjunctions
            'और','लेकिन','या','इसलिए','क्योंकि','हालांकि','यद्यपि','जब तक','जब तक','जबकि',
            'जहां','चूंकि','अगर','जब','जब भी','जहाँ भी','क्या','के रूप में','की तुलना में','की तरह',

            // Numbers
            'शून्य','एक','दो','तीन','चार','पाँच','छह','सात','आठ','नौ','दस',
            'ग्यारह','बारह','तेरह','चौदह','पंद्रह','सोलह','सत्रह','अठारह','उन्नीस','बीस',
            'इक्कीस','बाईस','तेईस','चौबीस','पच्चीस','छब्बीस','सत्ताईस','अट्ठाईस','उनतीस','तीस',
            'इकतीस','बत्तीस','तैंतीस','चौंतीस','पैंतीस','छत्तीस','सैंतीस','अड़तीस','उनतालीस','चालीस',
            'इकतालीस','बयालीस','तैंतालीस','चवालीस','पैंतालीस','छियालीस','सैंतालीस','अड़तालीस','उनचास','पचास',
            'इक्यावन','बावन','तिरपन','चौवन','पचपन','छप्पन','सत्तावन','अट्ठावन','उनसठ','साठ',
            'इकसठ','बासठ','तिरसठ','चौंसठ','पैंसठ','छियासठ','सड़सठ','अड़सठ','उनहत्तर','सत्तर',
            'इकहत्तर','बहत्तर','तिहत्तर','चौहत्तर','पचहत्तर','छिहत्तर','सतहत्तर','अठहत्तर','उनासी','अस्सी',
            'इक्यासी','बयासी','तिरासी','चौरासी','पचासी','छियासी','सत्तासी','अट्ठासी','नवासी','नब्बे',
            'इक्यानवे','बानवे','तिरानवे','चौरानवे','पचानवे','छियानवे','सत्तानवे','अट्ठानवे','निन्यानवे','सौ',
            'हज़ार','दस हज़ार','लाख','करोड़','अरब','खरब','पहला','दूसरा','तीसरा','चौथा','पाँचवाँ',
            'छठा','सातवाँ','आठवाँ','नौवाँ','दसवाँ','आधा','चौथाई','दोगुना','तिगुना','एकल',

            // Days & Months
            'सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार','रविवार',
            'जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त',
            'सितंबर','अक्टूबर','नवंबर','दिसंबर',

            // Family
            'माँ','माता','पिता','पिताजी','भाई','बहन','बेटा','बेटी','पोता','पोती','नाती','नातिन',
            'दादा','दादी','नाना','नानी','चाचा','चाची','ताऊ','ताई','मामा','मामी','मौसा','मौसी',
            'फूफा','बुआ','ससुर','सास','जेठ','जेठानी','देवर','देवरानी','ननद','ननदोई','साला','साली',
            'पति','पत्नी','पत्नी','प्रेमी','प्रेमिका','मंगेतर','मंगेतर','सगा','सगी','सौतेला','सौतेली',

            // Time expressions
            'क्षण','पल','सेकंड','मिनट','घंटा','दिन','सप्ताह','महीना','साल','दशक','शताब्दी','सहस्राब्दी',
            'सुबह','दोपहर','शाम','रात','आधी रात','भोर','संध्या','आज','कल','परसों',
            'आजकल','वर्तमान में','हाल ही में','जल्दी','बाद में','तुरंत','अभी','फिर','पहले','पहले',

            // Emotions
            'खुशी','दुख','गुस्सा','डर','उत्साह','ऊब','जिज्ञासा','भ्रम','आश्चर्य','ईर्ष्या',
            'आभार','आशा','निराशा','गर्व','शर्म','लज्जा','अकेलापन','प्यार','नफरत','चिंता','बेचैनी',
            'शांति','सुकून','आराम','तनाव','थकान','ऊर्जा','आनंद','अवसाद',

            // Common phrases
            'धन्यवाद','आपका स्वागत है','क्षमा करें','मुझे माफ़ करें','कितना','कितने','कितनी','क्या समय है',
            'फिर मिलेंगे','शुभकामनाएं','अपना ख्याल रखें','आपका दिन शुभ हो','कैसे हैं आप','मैं ठीक हूँ',
            'कोई बात नहीं','कोई समस्या नहीं','बिल्कुल','वैसे','वास्तव में','इसके अलावा','कम से कम',
            'अधिक से अधिक','सामान्य तौर पर','उदाहरण के लिए','जैसे कि','ताकि','की ओर','के कारण'
        ],

        /* ─────────────────────────────────────────────────────────────
           🌿 SANTALI (ROMAN ONLY — no Ol Chiki)
           ───────────────────────────────────────────────────────────── */
        santali: [
            // Greetings & Courtesy
            'Johar','Juhar','Sarhaw','Sagun','Khatir','Dohray','Bhal','Joto','Alam','Mapko','Heh','Bang',
            'Salam','Namaskar','Dhanyabad','Swagat','Kripya','Maaf','Theek','Achha','Hã','Bai','Alvida',
            'Suprbhat','Shubh Ratri','Shubh Din','Shubh Kamna','Badhai','Bahut Bhal','Keman Achho',
            'In Bhal Achho','Aapse Milke Khushi Hoi','Nijor Khayal Rakhben','Abar Milbo',

            // Pronouns & Demonstratives
            'In','Am','Uni','Ale','Ape','Nowa','Unag','Ched','Jahañ','Tuluj','Iñ','Nij','Ora','Benu',
            'Ini','Amak','Uniak','Alek','Apek','Nijor','Marang','Hudiñ','Setak','Hana','Hic','Hini',
            'Noy','Noyak','Se','Sen','Sek','Tahẽ','Ne','Nek',

            // Family & Relationships
            'Baba','Ayo','Apa','Ai','Dada','Misra','Kaka','Kaki','Mama','Mami','Masi','Fufa','Bua',
            'Beta','Beti','Nati','Natini','Nana','Nani','Sasur','Sasu','Sangi','Sangat','Sathi','Sakhi',
            'Dost','Maa','Pita','Bhai','Behen','Bahu','Damaad','Susur','Sasum','Haram','Ayo Haram',
            'Baba Haram','Marang Haram','Kaka Haram','Apa','Ayo','Tiriya','Kora','Gidra','Kuri','Baba',

            // People & Roles
            'Hor','Kuri','Kora','Gidra','Ayo','Apat','Sobha','Mardi','Naike','Pandit','Manjhi','Kisku',
            'Marandi','Hansda','Murmu','Soren','Tudu','Besra','Hembram','Baske','Baski','Majhi',
            'Mahato','Sardar','Pargana','Baba','Guru','Shikshak','Chhatra','Doctor','Nurse','Sipahi',

            // Body Parts
            'Bohok','Khopa','Mukh','Moti','Chokh','Kan','Nak','Mukh','Mui','Dant','Jibh','Gala',
            'Bahu','Hath','Kathi','Angutha','Nokh','Buk','Pithi','Pet','Kamar','Paw','Hath Pao',
            'Chamra','Sohor','Soha','Rakta','Lahu','Harhi','Ham','Sora','Dudh','Horma',

            // Common Verbs
            'Hoy','Chalag','Hej','Dej','Chikag','Paṛhaw','Ñam','Em','Jom','Ñu','Gum','Duruj',
            'Tahin','Midal','Rakab','Saot','Kam Korg','Bhal Lagis','Bhal Sune','Dekh','Sune',
            'Bol','Chol','Dour','Hañs','Roi','Gai','Nachi','Sikh','Sikha','Soche','Mil',
            'Banaw','Kinar','Bece','Puch','Bat','Madad Kor','Pyar Kor','Rahi','Mar','Jiy',
            'Pani','Kha','Pakaw','Dho','Safai Kor','Saja','Dhundh','Pa','Kho','Chadh','Utr',
            'Gir','Phek','Pakad','Chhod','Tor','Jod','Mila','Badal','Sikh','Bhul','Yaad Rakh',
            'Yaad Kor','Sut','Jag','Naha','Leka Pahin','Taiyar Ho','Safar Kor','Yatra Kor','Ghuma',
            'Dekhbhal Kor','Katha Kor','Bichar Kor','Nirnay Le','Chun','Suru Kor','Shesh Kor',
            'Jari Rakh','Ruk','Intezar Kor','Wapas A','Wapas Ja','Aana Jaana','Kam Kor','Aram Kor',
            'Muskura','Hila','Ghuma','Ur','Tair','Dour','Kud','Pakaw','Paras','Khila','Nahla',
            'Sula','Jaga','Bula','Peth','Lekh','Padh','Gin','Tol','Map','Kat','Sil','Bun','Rang',
            'Chitra Banaw','Gai','Bajaw','Samjha','Sikha','Padha','Prashikshan De','Pariksha De',

            // Common Nouns (Village Life)
            'Orak','Hasa','Atu','Disom','Sohor','Bir','Jangal','Buru','Bahar','Doroya','Gaṛa','Sil',
            'Sardi','Chando','Engel','Hip','Bati','Seta','Tuyu','Haku','Dare','Baha','Sakam','Potob',
            'Kalam','Dela','Mati','Dak','Jomag','Kami','Taka','Din','Nida','Setag','Lo','Sah',
            'Bazar','Dukan','Mall','Bank','Daftar','Karkhana','Restaurant','Hotel','Ghar','Ghar',
            'Kamra','Rasoi','Sona Kamra','Snan Ghar','Bagan','Aangan','Chhat','Darwaza','Khirki',
            'Diwar','Farsh','Chhat','Sirhi','Phatak','Gate','Dalán','Pani','Jol','Bhojon','Khana',
            'Roti','Chawal','Dudh','Cha','Coffee','Ras','Sharbat','Chini','Laban','Tel','Ghi',
            'Makhon','Panir','Dimer','Mangsho','Haku','Phal','Sabji','Anaj','Gehun','Chawal','Dal',
            'Seb','Kela','Aam','Santara','Angur','Nimbu','Strawberry','Tarbuj','Kharbooja','Ananas',
            'Alu','Tamatar','Piyaz','Lahsun','Gajar','Palak','Patta Gobi','Mirch','Adrak','Dhania',
            'Masala','Madhu','Cake','Biscuit','Mithai','Halwa','Kheer','Soup','Salad','Sandwich',
            'Thali','Plate','Cup','Gilas','Katora','Chammach','Kanta','Chaku','Tawa','Kadhai','Botal','Jug',
            'Mez','Kursi','Bistar','Sofa','Desk','Almari','Daraz','Sheesha','Darpan','Ghadi',
            'Kitab','Potob','Kalam','Pencil','Kagaz','Copy','Basta','Dibba','Chabi','Tala','Naksha',
            'Computer','Phone','Television','Radio','Camera','Speaker','Screen','Mobile','Laptop',
            'Car','Gadi','Bus','Train','Hawai Jahaz','Jahaz','Naav','Cycle','Motorcycle','Truck','Taxi',
            'Sadak','Marg','Rajmarg','Pul','Station','Hawai Adda','Bandargah','Surang','Yatayat',
            'Dare','Paudha','Baha','Ghas','Sakam','Shakha','Jar','Beej','Lakdi','Jangal','Ban',
            'Pashu','Kutta','Billi','Gai','Ghoda','Bakri','Bhed','Suar','Murgi','Battakh',
            'Sher','Bagh','Hathi','Bandar','Bhalu','Bhediya','Lomdi','Hiran','Khargosh','Saanp',
            'Pakshi','Chidiya','Baaz','Tota','Kauwa','Gauraiya','Mor','Ullu','Kabutar','Murga',
            'Keet','Titli','Madhumakkhi','Cheenti','Machhar','Makkhi','Makdi','Kenchua','Ghungha','Mendhak',
            'Suruj','Suruj Dev','Chando','Tara','Akash','Aasman','Badal','Barsat','Baraf','Toofan','Hawa','Bijli',
            'Indradhanush','Mausam','Jalwayu','Ritu','Garmi','Sardi','Basant','Sharad','Varsha',
            'Gara','Jheel','Samundar','Sagar','Talab','Dhara','Jharna','Lehar','Samundar Tat','Kinara',
            'Buru','Pahadi','Ghati','Registan','Maidaan','Khet','Chattan','Patthar','Ret','Mati',
            'Aag','Dhuwan','Rakh','Lau','Garmi','Thand','Roshni','Prakash','Andhera','Chhaya','Aawaz','Dhwani',
            'Rang','Lal','Nila','Sabuj','Holde','Kalo','Dhola','Narangi','Gulabi','Bhura','Baingani','Dhusar','Sunhara','Chandi','Kansya',
            'Taka','Paisa','Rupaya','Sikka','Note','Keemat','Lagat','Labh','Hani','Vetan','Majduri','Kar','Budget',
            'Vyapar','Company','Udyog','Utpad','Seva','Grahak','Bazar','Bikri','Kharid',
            'Sarkar','Kanoon','Niyam','Adhikar','Kartavya','Vote','Chunav','Neta','Mantri','Rashtrapati','Pradhanmantri',
            'Juddh','Shanti','Sangharsh','Jeet','Haar','Sena','Nausena','Sipahi','Hathiyar','Banduk',
            'Swasthya','Bimari','Dawa','Doctor','Hospital','Dard','Ilaaj','Ghaav','Bukhar','Sardi',
            'Shiksha','Gyan','Kaushal','Paath','Kaksha','Pariksha','Parinam','Degree','Adhyayan','Abhyas',
            'Kala','Sangeet','Nritya','Geet','Kavita','Kahani','Upanyas','Film','Natak','Abhinay',
            'Khel','Football','Cricket','Tennis','Shatranj','Hockey','Basketball','Dour','Match','Pratiyogita',
            'Samachar','Khabar','Report','Lekh','Patrika','Akhbar','Patra','Sandesha','Email','Sanchar',
            'Bhasha','Shabd','Vakya','Arth','Vyakaran','Bhashan','Aawaz','Dhwani','Naam','Shirshak',
            'Pyar','Ghrina','Nafrat','Dar','Bhay','Aasha','Umeed','Khushi','Anand','Dukh','Krodh','Gussa','Aashcharya','Chinta','Tanav',
            'Sapna','Lakshya','Yojana','Vichar','Man','Hriday','Dil','Aatma','Sharir','Jeevan',
            'Sir','Sar','Chehra','Aankh','Kan','Naak','Muh','Hoth','Daant','Jeebh','Thodi',
            'Gardan','Kandha','Bazu','Hath','Ungli','Nakhun','Chhati','Peeth','Pet','Kamar',
            'Pair','Ghutna','Panja','Twacha','Baal','Rakta','Khoon','Haddi','Manspeshi','Mastishk','Dimag',
            'Kapde','Kameez','Patalun','Poshak','Skirt','Jacket','Coat','Sweater','Juta','Chappal',
            'Topi','Moza','Dastana','Dupatta','Tie','Belt','Anguthi','Haar','Kangan','Jhumka',

            // Adjectives
            'Marang','Hudiñ','Nawa','Mare','Napay','Barij','Sapha','Dos','Harryaṛ','Sagen',
            'Hende','Paṇḍe','Kusi','Duk','Dulaṛ','Bhal','Bura','Saru','Jadi','Loti',
            'Achha','Bura','Shandar','Badhiya','Garib','Sarvoattam','Sabse Kharab','Behtar','Kharab',
            'Bada','Chhota','Vishal','Vishal','Lamba','Uncha','Nicha','Chauda','Sankra','Mota','Patla',
            'Bhari','Halka','Tez','Dheema','Jaldi','Der','Naya','Purana','Yuva','Prachin','Aadhunik','Taza','Basi',
            'Saf','Ganda','Swachh','Garam','Thanda','Geela','Sukha','Mulayam','Sakht','Chikna','Khuradra',
            'Mazboot','Kamzor','Swasth','Bimar','Thaka','Neend','Jagta','Jeevit','Mrit',
            'Khush','Dukhi','Gussa','Shant','Dara','Bahadur','Garv','Sharminda','Bhramit','Nishchit',
            'Imandar','Beiman','Dayalu','Kroor','Vinamra','Abhadra','Milansar','Shatrutapurna','Sajjan','Hinsak',
            'Ameer','Garib','Dhani','Mehnga','Sasta','Keemti','Bekar','Durlabh','Samanya','Samanya',
            'Sundar','Badsurat','Sundar','Aakarshak','Pyara','Saada','Suruchipurna','Smart','Chatur','Moorkh',
            'Budhiman','Budhiman','Samajhdar','Moorkh','Tez','Dheema','Gambhir','Mazakiya','Shant','Zordaar',
            'Aasan','Kathin','Saral','Jatil','Sambhav','Asambhav','Nishchit','Sandigdh','Spasht','Aspasht',
            'Surakshit','Khatarnak','Upyogi','Bekar','Sahayak','Hanikarak','Mahatvapurna','Mamuli','Aavashyak','Anavashyak',
            'Sachcha','Jhootha','Asli','Nakli','Sahi','Galat','Purna','Khali','Khula','Band','Mukt','Vyast','Taiyar','Ataiyar',
            'Meetha','Khatta','Kadwa','Namkeen','Masaledar','Swadisht','Swadisht','Feeka','Taza','Sada',
            'Pehla','Antim','Agla','Pichla','Madhya','Antim','Prarambhik','Der','Hal Ka','Bahut',
            'Kayi','Kuch','Kayi','Sab','Koi Nahi','Dono','Har','Sabse','Bahut','Thoda','Adhik','Kam','Paryapt','Bahutayat','Kami',

            // Adverbs
            'Bahut','Vastav Mein','Kafi','Atyant','Bhi','Itna','Aisa','Bilkul','Poori Tarah','Purnatah',
            'Hamesha','Aamtaur Par','Aksar','Kabhi-Kabhi','Shayad Hi Kabhi','Kabhi Nahi','Baar-Baar','Kabhi-Kabhar','Lagatar','Kabhi-Kabhi',
            'Ab','Tab','Jaldi','Baad Mein','Pehle Se','Abhi Bhi','Bilkul','Hal Hi Mein','Hal Mein',
            'Yahan','Wahan','Har Jagah','Kahin Nahi','Kahin','Kahin Bhi','Andar','Bahar','Upar','Neeche',
            'Upar','Neeche','Baayein','Daayein','Aage','Peechhe','Paas','Door','Nikat','Door',
            'Achhi Tarah','Buri Tarah','Jaldi Se','Dheere-Dheere','Savdhani Se','Laparwahi Se','Aasani Se','Mushkil Se','Imandari Se','Gambhirta Se',
            'Shayad','Sambhavtah','Nishchit Roop Se','Nishchit Roop Se','Shayad','Spasht Roop Se','Jahir Taur Par','Spasht Roop Se',
            'Ek Saath','Akele','Alag','Iske Bajay','Balki','Anyatha','Halanki','Isliye','Iske Alawa','Is Beech',
            'Ek Baar','Do Baar','Teen Baar','Phir Se','Bhi','Bhi','Ya To','Na To','Isliye','Is Prakar',
            'Hã','Nahi','Nahi','Kabhi Nahi','Koi Nahi','Kuch Nahi','Koi Nahi','Na To','Na',

            // Prepositions & Conjunctions
            'Mein','Par','Par','Se','Ke Liye','Ke Saath','Ke Bare Mein','Ke Khilaf','Ke Beech','Mein Se',
            'Ke Madhyam Se','Ke Dauran','Se Pehle','Ke Baad','Ke Upar','Ke Neeche','Ke Neeche','Ke Upar','Ko','Se',
            'Mein','Par','Par','Ke Bhitar','Ke Bina','Se Pare','Ke Peechhe','Ke Bagal Mein','Ke Alawa','Charon Or',
            'Paar','Saath Mein','Ki Or','Tak','Se','Ko Chhodkar','Ke Bawajood','Ke Sambandh Mein','Ke Bare Mein',
            'Bhar Mein','Ke Khilaf','Banam','Ke Madhyam Se','Prati','Plus','Minus','Ke Saath','Ke Bina',
            'Aur','Lekin','Ya','Isliye','Kyunki','Halanki','Yadyapi','Jab Tak','Jab Tak','Jabki',
            'Jahan','Chunki','Agar','Jab','Jab Bhi','Jahan Bhi','Kya','Ke Roop Mein','Ki Tulna Mein','Ki Tarah',

            // Numbers
            'Mid','Bar','Pe','Pun','Moṇe','Turuy','Eyay','Roh','Are','Gel','So','Hazar','Lakh','Koti',
            'Zero','Ek','Do','Teen','Chaar','Paanch','Chhah','Saat','Aath','Nau','Das',
            'Gyarah','Barah','Terah','Chaudah','Pandrah','Solah','Satrah','Atharah','Unnis','Bees',
            'Ikkees','Baees','Teis','Chaubis','Pachchis','Chhabbis','Sattaees','Atthaees','Untees','Tees',
            'Ikatis','Battis','Taintis','Chauntis','Paintees','Chhattis','Saintis','Adtis','Untalis','Chalis',
            'Iktalis','Bayalis','Taintalis','Chawalis','Paintalis','Chhiyalis','Saintalis','Adtalis','Unchas','Pachas',
            'Ikyavan','Bavan','Tirpan','Chauvan','Pachpan','Chhappan','Sattavan','Atthavan','Unsath','Saath',
            'Iksath','Basath','Tirsath','Chaunsath','Painsath','Chhiyasath','Sarsath','Arsath','Unhattar','Sattar',
            'Ikhattar','Bahattar','Tihattar','Chauhattar','Pachhattar','Chhihattar','Sat'hattar','Athhattar','Unasi','Assi',
            'Ikyasi','Bayasi','Tirasi','Chaurasi','Pachasi','Chhiyasi','Sattasi','Atthasi','Navasi','Nabbe',
            'Ik'yanave','Banave','Tiranave','Chauranave','Pachanave','Chhiyanave','Sattanave','Atthanave','Ninyanave','Sau',
            'Hazar','Das Hazar','Lakh','Karod','Arab','Kharab','Pehla','Doosra','Teesra','Chautha','Paanchvan',
            'Chhatha','Saatvan','Aathvan','Nauvan','Dasvan','Aadha','Chauthai','Doguna','Tiguna','Ekal',

            // Days & Months
            'Sombaar','Mongalbaar','Budhbaar','Brihaspatibaar','Sukrabaar','Sanibaar','Robibaar',
            'January','February','March','April','May','June','July','August',
            'September','October','November','December',
            'Poh','Magh','Fagun','Chait','Baisakh','Jeth','Asarh','Sawan','Bhadar','Kati','Aghan','Pus',

            // Animals & Birds
            'Kutta','Billi','Gai','Ghoda','Bakri','Bhed','Suar','Murgi','Battakh','Sher','Bagh','Hathi','Bandar',
            'Bhalu','Bhediya','Lomdi','Hiran','Khargosh','Saanp','Pakshi','Chidiya','Baaz','Tota','Kauwa',
            'Gauraiya','Mor','Ullu','Kabutar','Murga','Keet','Titli','Madhumakkhi','Cheenti','Machhar','Makkhi',
            'Makdi','Kenchua','Ghungha','Mendhak','Machhli','Whale','Dolphin','Shark','Octopus','Crab',
            'Lobster','Prawn','Turtle','Tortoise','Crocodile','Giraffe','Zebra','Kangaroo','Panda','Koala',
            'Hippo','Rhino','Camel','Donkey','Mule','Otter','Badger','Squirrel','Hedgehog','Raccoon',

            // Food & Kitchen
            'Khana','Jomag','Roti','Chawal','Dal','Sabji','Phal','Dudh','Cha','Coffee','Ras','Sharbat',
            'Chini','Laban','Tel','Ghi','Makhon','Panir','Dimer','Mangsho','Haku','Anaj','Gehun',
            'Alu','Tamatar','Piyaz','Lahsun','Gajar','Palak','Patta Gobi','Mirch','Adrak','Dhania',
            'Masala','Madhu','Cake','Biscuit','Mithai','Halwa','Kheer','Soup','Salad','Sandwich',
            'Thali','Plate','Cup','Gilas','Katora','Chammach','Kanta','Chaku','Tawa','Kadhai','Botal','Jug',

            // Household items
            'Mez','Kursi','Bistar','Sofa','Desk','Almari','Daraz','Sheesha','Darpan','Ghadi',
            'Kitab','Potob','Kalam','Pencil','Kagaz','Copy','Basta','Dibba','Chabi','Tala','Naksha',
            'Computer','Phone','Television','Radio','Camera','Speaker','Screen','Mobile','Laptop',

            // Nature
            'Suruj','Chando','Tara','Akash','Aasman','Badal','Barsat','Baraf','Toofan','Hawa','Bijli',
            'Indradhanush','Mausam','Jalwayu','Ritu','Garmi','Sardi','Basant','Sharad','Varsha',
            'Gara','Jheel','Samundar','Sagar','Talab','Dhara','Jharna','Lehar','Kinara',
            'Buru','Pahadi','Ghati','Registan','Maidaan','Khet','Chattan','Patthar','Ret','Mati',
            'Aag','Dhuwan','Rakh','Lau','Roshni','Prakash','Andhera','Chhaya','Aawaz','Dhwani',

            // Colors
            'Rang','Lal','Nila','Sabuj','Holde','Kalo','Dhola','Narangi','Gulabi','Bhura','Baingani','Dhusar','Sunhara','Chandi','Kansya',

            // Emotions
            'Kusi','Duk','Dulaṛ','Pyar','Ghrina','Nafrat','Dar','Bhay','Aasha','Umeed','Khushi','Anand','Krodh','Gussa','Aashcharya','Chinta','Tanav',
            'Sapna','Lakshya','Yojana','Vichar','Man','Hriday','Dil','Aatma','Sharir','Jeevan',

            // Time expressions
            'Kshan','Pal','Second','Minute','Ghanta','Din','Saptah','Mahina','Saal','Dashak','Shatabdi','Sahasrabdi',
            'Subah','Dopahar','Shaam','Raat','Aadhi Raat','Bhor','Sandhya','Aaj','Kal','Parso',
            'Aajkal','Vartaman Mein','Hal Hi Mein','Jaldi','Baad Mein','Turant','Abhi','Phir','Pehle','Pehle',

            // Common phrases
            'Johar','Sarhaw','Sagun','Khatir','Dohray','Bhal','Joto','Alam','Mapko','Heh','Bang',
            'Dhanyabad','Aapka Swagat Hai','Kshama Karein','Mujhe Maaf Karein','Kitna','Kitne','Kitni','Kya Samay Hai',
            'Phir Milenge','Shubhkamnayein','Apna Khayal Rakhein','Aapka Din Shubh Ho','Keman Achho','In Bhal Achho',
            'Koi Baat Nahi','Koi Samasya Nahi','Bilkul','Waise','Vastav Mein','Iske Alawa','Kam Se Kam',
            'Adhik Se Adhik','Samanya Taur Par','Udaharan Ke Liye','Jaise Ki','Taki','Ki Or','Ke Karan'
        ]
    };

    /* ═══════════════════════════════════════════════════════════════════
       🎨 RENDER FUNCTIONS
       ═══════════════════════════════════════════════════════════════════ */

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    window.renderDictionary = function () {
        const langSelect = document.getElementById('dictLangSelect');
        const listEl = document.getElementById('dictionaryList');
        const countEl = document.getElementById('dictWordCount');
        const labelEl = document.getElementById('dictLangLabel');
        if (!langSelect || !listEl) return;

        const lang = langSelect.value || 'english';
        const words = DICTIONARY[lang] || [];
        const searchQuery = (document.getElementById('dictSearchInput')?.value || '').toLowerCase().trim();

        const filtered = searchQuery
            ? words.filter(function (w) { return w.toLowerCase().includes(searchQuery); })
            : words;

        if (countEl) countEl.textContent = filtered.length;

        const labels = { english: 'English', hindi: 'हिन्दी', santali: 'Santali (Roman)' };
        if (labelEl) labelEl.textContent = labels[lang] || lang;

        if (filtered.length === 0) {
            listEl.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:24px; color:#94a3b8; font-size:0.8rem; font-weight:600;">🔍 No words match your search</div>';
            return;
        }

        // Chunk-render for performance (3000+ words can lag)
        const CHUNK = 300;
        listEl.innerHTML = '';
        let i = 0;
        function renderChunk() {
            const end = Math.min(i + CHUNK, filtered.length);
            const html = filtered.slice(i, end).map(function (w) {
                const safeAttr = w.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                return '<div class="dict-word-chip" onclick="copyDictWord(\'' + safeAttr + '\')" title="Click to copy">' + escapeHtml(w) + '</div>';
            }).join('');
            listEl.insertAdjacentHTML('beforeend', html);
            i = end;
            if (i < filtered.length) setTimeout(renderChunk, 0);
        }
        renderChunk();
    };

    window.filterDictionary = function () { window.renderDictionary(); };

    window.copyDictWord = function (word) {
        if (!word) return;
        const clean = word.replace(/\s*\([^)]*\)\s*$/, '').trim();
        function fallback() {
            try {
                const ta = document.createElement('textarea');
                ta.value = clean;
                ta.style.position = 'fixed';
                ta.style.top = '-9999px';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                if (typeof showToast === 'function') showToast('📋 Copied: ' + clean, 'success');
            } catch (e) {
                if (typeof showToast === 'function') showToast('Copy failed', 'error');
            }
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(clean).then(function () {
                if (typeof showToast === 'function') showToast('📋 Copied: ' + clean, 'success');
            }).catch(fallback);
        } else {
            fallback();
        }
    };

    /* ═══════════════════════════════════════════════════════════════════
       🔒 PERMANENT ENTRIES — always visible at top
       ═══════════════════════════════════════════════════════════════════ */

    let _permVocabRendering = false;

    window.renderPermanentVocabEntry = function () {
        if (_permVocabRendering) return;
        _permVocabRendering = true;
        try {
            const container = document.getElementById('vocabListContainer');
            if (!container) return;

            let el = container.querySelector('[data-permanent-vocab="true"]');
            if (!el) {
                el = document.createElement('div');
                el.setAttribute('data-permanent-vocab', 'true');
                el.className = 'vocab-permanent-entry';
                container.insertBefore(el, container.firstChild);
            }

            // Merge admin-saved text (if any) with hard-coded defaults
            let text = 'The quick brown fox jumps over the lazy dog.\nHello Bro\nThanks\nWelcome\nPlease\nGood\nBest\nGreat';
            try {
                const adminText = localStorage.getItem('hk_permanent_vocab_text');
                if (adminText && adminText.trim()) text = adminText;
            } catch (e) {}

            const lines = text.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);

            el.innerHTML =
                '<div style="flex:1;min-width:0;">' +
                    '<div class="vocab-permanent-header">🔒 PERMANENT — Always Visible</div>' +
                    lines.map(function (line) {
                        return '<div class="vocab-permanent-line">✓ ' + escapeHtml(line) + '</div>';
                    }).join('') +
                '</div>' +
                '<span class="vocab-permanent-label">Permanent</span>';
        } finally {
            _permVocabRendering = false;
        }
    };

    /* ═══════════════════════════════════════════════════════════════════
       🪝 HOOKS — wrap openVocabManagerModal
       ═══════════════════════════════════════════════════════════════════ */

    function wrapModalOpener() {
        const origOpen = window.openVocabManagerModal;
        if (typeof origOpen !== 'function' || origOpen._dictWrapped) return;

        window.openVocabManagerModal = function () {
            origOpen.apply(this, arguments);
            setTimeout(window.renderDictionary, 80);
            setTimeout(window.renderDictionary, 250);
            setTimeout(window.renderPermanentVocabEntry, 120);
        };
        window.openVocabManagerModal._dictWrapped = true;
    }

    /* ═══════════════════════════════════════════════════════════════════
       🚀 INIT
       ═══════════════════════════════════════════════════════════════════ */

    function init() {
        wrapModalOpener();
        // Fallback: retry wrapping if modals.js loaded late
        let tries = 0;
        const interval = setInterval(function () {
            tries++;
            if (window.openVocabManagerModal && window.openVocabManagerModal._dictWrapped) {
                clearInterval(interval);
                return;
            }
            wrapModalOpener();
            if (tries > 30) clearInterval(interval);
        }, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    window.addEventListener('app-ready', init);

    // Expose for debugging
    window.__DICTIONARY__ = DICTIONARY;
    window.__dictStats = function () {
        console.log('📖 Dictionary word counts:', {
            english: DICTIONARY.english.length,
            hindi: DICTIONARY.hindi.length,
            santali: DICTIONARY.santali.length,
            total: DICTIONARY.english.length + DICTIONARY.hindi.length + DICTIONARY.santali.length
        });
    };

    console.log('✅ Dictionary module loaded');
})();
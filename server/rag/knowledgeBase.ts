export interface KnowledgeItem {
  id: string;
  category: 'puberty_basics' | 'period_essentials' | 'hygiene_and_products' | 'cramps_and_comfort' | 'cycle_rhythms_and_hormones' | 'hormonal_patterns_and_pcos' | 'emotions_and_relationships' | 'school_emergencies';
  question: string;
  aliases: string[];
  answer: string;
  keyTakeaway: string;
  doctorNote?: string;
  tags: string[];
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // ─── 1. PUBERTY BASICS ───
  {
    id: 'puberty-changes-timeline',
    category: 'puberty_basics',
    question: 'What are the first signs of puberty and when does it start?',
    aliases: ['how do I know puberty started', 'changes during puberty', 'when will I hit puberty'],
    answer: 'Puberty usually starts between ages 9 and 14. Common first signs include tiny tender lumps under your nipples called breast buds, growing taller quickly, soft hair appearing under your arms and around your pubic area, and discovering clear or milky discharge in your underwear. Every single body follows its own clock, so starting earlier or later than your classmates is completely normal.',
    keyTakeaway: 'Puberty happens between 9–14 at your body’s unique pace. Breast buds and light discharge are typical early signs.',
    tags: ['puberty', 'breast buds', 'timeline', 'growth', 'normal']
  },
  {
    id: 'puberty-vaginal-discharge',
    category: 'puberty_basics',
    question: 'What is this white or clear stuff in my underwear? Is it an infection?',
    aliases: ['white discharge in underwear', 'clear sticky fluid', 'is discharge normal', 'wet spot in panties'],
    answer: 'That clear, white, or pale yellowish fluid is called vaginal discharge, and it is a wonderful sign that your body is healthy and cleaning itself naturally! Discharge usually appears 6 to 12 months before your very first period. As long as it is clear or whitish and doesn\'t itch, burn, or smell foul like spoiled fish, you do not have an infection — it\'s just your vagina\'s built-in self-cleaning mechanism.',
    keyTakeaway: 'Clear or milky discharge is your body\'s natural way of cleaning itself and often means your first period is coming soon.',
    doctorNote: 'If discharge becomes bright green/yellow, smells very strong, or causes intense itching, show a doctor or tell an adult.',
    tags: ['discharge', 'vaginal fluid', 'underwear', 'infection check', 'cleaning']
  },
  {
    id: 'puberty-breast-tenderness-uneven',
    category: 'puberty_basics',
    question: 'Why are my breasts sore and one is bigger than the other?',
    aliases: ['uneven breasts', 'one boob bigger', 'sore breast buds', 'painful lump in breast puberty'],
    answer: 'It is super common for breasts to feel sore, tingly, or lumpy when breast buds first develop. What surprises almost every girl is that one breast almost always starts growing before the other! They might look uneven for a couple of years. This is completely harmless and very normal. As hormones balance out, they tend to even up, though almost all adult women still have one side slightly different.',
    keyTakeaway: 'Breasts frequently grow at different speeds and feel tender during puberty. Asymmetry is entirely normal.',
    tags: ['breasts', 'breast buds', 'uneven', 'soreness', 'body changes']
  },
  {
    id: 'puberty-body-odor-sweat',
    category: 'puberty_basics',
    question: 'Why do I suddenly smell sweaty and how do I manage it?',
    aliases: ['armpit odor teen', 'puberty sweat smell', 'body odor puberty'],
    answer: 'During puberty, new sweat glands called apocrine glands wake up under your arms and in your groin. The sweat itself has no smell, but harmless natural bacteria on your skin break it down, which causes body odor. You can easily manage it by showering daily with gentle soap, wearing breathable cotton clothes, and using an aluminum-free deodorant or roll-on if you like.',
    keyTakeaway: 'New sweat glands activate in puberty. Daily washing and cotton clothes keep you fresh and comfortable.',
    tags: ['sweat', 'body odor', 'hygiene', 'armpits', 'deodorant']
  },
  {
    id: 'puberty-body-hair',
    category: 'puberty_basics',
    question: 'Is it normal to grow hair on my stomach, thighs, or around my nipples?',
    aliases: ['hair on belly', 'hair around nipples', 'pubic hair spreading', 'body hair normal girl'],
    answer: 'Yes! Hormones called androgens (which every girl naturally produces in small amounts) cause hair to grow on legs, underarms, pubic area, and even fine hair on your belly or around your nipples. Having body hair is completely healthy and human. Whether you choose to remove it, trim it, or leave it completely natural is 100% your personal choice.',
    keyTakeaway: 'Fine body hair in various places is a normal response to puberty hormones. How you style or leave it is your choice.',
    tags: ['body hair', 'hair growth', 'hormones', 'shaving']
  },
  {
    id: 'puberty-weight-hips-change',
    category: 'puberty_basics',
    question: 'Why are my hips wider and why did I gain weight around my tummy and thighs?',
    aliases: ['gaining weight puberty', 'wider hips', 'body shape changing', 'fat on thighs puberty'],
    answer: 'Puberty is designed to prepare your body for adulthood, which requires your skeleton to widen at the pelvis and your body to naturally store healthy fat on your hips, thighs, and lower abdomen. This is not "bad weight" — it is estrogen doing its job to protect your bones and reproductive organs. Restrictive dieting during puberty can stop periods and harm growth, so focus on nourishing your body with balanced meals instead.',
    keyTakeaway: 'Wider hips and soft curves are natural signs of healthy estrogen at work. Your growing body needs steady fuel.',
    tags: ['body shape', 'hips', 'weight gain', 'nutrition', 'curves']
  },

  // ─── 2. PERIOD ESSENTIALS ───
  {
    id: 'period-first-period-what-to-expect',
    category: 'period_essentials',
    question: 'What does a first period look like? Will it be a sudden flood of blood?',
    aliases: ['what does menarche look like', 'first period signs', 'will blood gush out', 'first time bleeding'],
    answer: 'A first period (menarche) is rarely a dramatic flood. More often, you will just notice a brownish smudge or rusty reddish spot in your underwear or on toilet paper after wiping. The total amount of blood lost over an entire period is only about 2 to 3 tablespoons! You might feel mild cramps or feel a little bloated, but some girls feel nothing at all before seeing that first spot.',
    keyTakeaway: 'A first period usually starts as a small brown or red stain, not a sudden flood. Total blood is only 2–3 tablespoons.',
    tags: ['first period', 'menarche', 'blood', 'what to expect', 'spotting']
  },
  {
    id: 'period-blood-colors-brown-black-red',
    category: 'period_essentials',
    question: 'Why is my period blood brown, dark, or black instead of bright red?',
    aliases: ['brown period blood', 'black period blood', 'dark blood in pad', 'is brown blood bad'],
    answer: 'Brown or dark period blood is totally normal! Blood contains iron. When blood leaves the uterus slowly or takes longer to exit your body, the iron reacts with air (oxidizes), turning it brown or dark rust-colored. You will often see brown blood at the very beginning of your period or during the last few days when the flow is slow. Bright red blood simply means the flow is faster and fresh.',
    keyTakeaway: 'Brown or dark blood is just older blood that oxidized with air. It is very common at the start and end of your cycle.',
    tags: ['blood color', 'brown blood', 'dark blood', 'oxidation', 'normal flow']
  },
  {
    id: 'period-blood-clots-jelly',
    category: 'period_essentials',
    question: 'I noticed small jelly-like clumps in my pad. Are blood clots dangerous?',
    aliases: ['jelly clumps in period', 'blood clots normal', 'thick clumps on pad', 'clotted period blood'],
    answer: 'Small, jelly-like clots (around the size of a coin or smaller) are very common on heavier flow days. When your uterine lining sheds, your body produces natural anti-clotting agents. On days when your flow is heavy, those agents can\'t keep up, so small clumps form. However, if you are passing clots larger than a 5-rupee coin / golf ball, or soaking through a pad every hour, that is a reason to visit a doctor.',
    keyTakeaway: 'Small coin-sized jelly clots on heavy days are normal. Clots larger than a golf ball or extreme bleeding need medical review.',
    doctorNote: 'Consistently passing very large clots (golf-ball sized) accompanied by weakness or dizziness warrants medical advice.',
    tags: ['clots', 'heavy flow', 'jelly', 'pad', 'safety check']
  },
  {
    id: 'period-cycle-length-teen-normal',
    category: 'period_essentials',
    question: 'How long should a normal menstrual cycle be for teenagers?',
    aliases: ['normal cycle length', 'how many days between periods', 'teen cycle days', 'period frequency'],
    answer: 'For teenagers, a normal cycle length is generally between 21 and 45 days (counted from Day 1 of one period to Day 1 of the next period). The period bleeding itself usually lasts 3 to 7 days. Because your brain-to-ovary communication system (the HPO axis) is still maturing, cycle lengths can fluctuate quite a bit during the first 2 to 3 years after your very first period.',
    keyTakeaway: 'For teens, a healthy cycle ranges from 21 to 45 days, with 3–7 days of bleeding. Fluctuation is common early on.',
    tags: ['cycle length', '21 to 45 days', 'teen rhythm', 'bleeding days']
  },
  {
    id: 'period-missing-periods-skipping-month',
    category: 'period_essentials',
    question: 'My period skipped 2 or 3 months. Am I sick?',
    aliases: ['missed period teen', 'period skipped 2 months', 'irregular period virgin', 'why did my period stop'],
    answer: 'If you have only had your period for 1 to 3 years, skipping a month or two is very common. In young teens, ovaries don\'t always release an egg every single cycle (called an anovulatory cycle). Major stress (like school board exams), catching a viral fever, sudden travel, poor sleep, or rapid weight changes can also temporarily pause your cycle. While occasional skips are common, if your period is consistently absent for more than 90 days, checking with a gynecologist is a smart, gentle step.',
    keyTakeaway: 'Occasional skipped periods in the first 2-3 years are usually due to an immature hormonal axis or stress. Gaps over 90 days should be checked.',
    doctorNote: 'If periods are consistently missing for 3+ months in a row, a doctor can run gentle hormonal checks.',
    tags: ['missed period', 'skipped month', 'exam stress', 'irregularity', 'anovulatory']
  },
  {
    id: 'period-swim-sports-exercise',
    category: 'period_essentials',
    question: 'Can I play sports, dance, or swim when I have my period?',
    aliases: ['can I swim on my period', 'sports during period', 'exercise on period', 'running with period'],
    answer: 'Yes, 100%! You can do any sport, PE class, dance, or exercise you feel up to. Exercise actually releases endorphins (your body’s natural mood-lifters and pain-relievers) which can ease cramps. For swimming, you would use a tampon or menstrual cup since pads absorb pool water. If you feel tired on Day 1 or 2, gentle walking or stretching is wonderful too.',
    keyTakeaway: 'You can participate in all sports and activities. Exercise often relieves cramps. For swimming, use a tampon or cup.',
    tags: ['sports', 'swimming', 'exercise', 'PE class', 'activity']
  },

  // ─── 3. HYGIENE & PRODUCTS ───
  {
    id: 'hygiene-how-often-change-pad',
    category: 'hygiene_and_products',
    question: 'How often should I change my sanitary pad?',
    aliases: ['how long can I wear a pad', 'changing pad time', 'pad hygiene hours', 'when to change pad'],
    answer: 'You should change your sanitary pad every 4 to 6 hours, even if your flow is very light! Trapped moisture, warm body heat, and blood can allow bacteria to multiply if a pad stays on too long, which can cause skin chafing, irritation, and odor. Changing it regularly keeps your delicate skin healthy, dry, and fresh.',
    keyTakeaway: 'Change pads every 4–6 hours, regardless of whether it looks full. This prevents bacteria and skin irritation.',
    tags: ['pad change', 'hygiene', 'hours', 'skin chafing', 'odor prevention']
  },
  {
    id: 'hygiene-dispose-pad-school',
    category: 'hygiene_and_products',
    question: 'How do I dispose of a used pad discreetly, especially in a school bathroom?',
    aliases: ['how to throw away pad', 'dispose pad school toilet', 'flushing pad down toilet', 'wrapping pad'],
    answer: 'Never flush a pad down the toilet — it absorbs water, expands, and clogs the plumbing completely! Here is the clean, discreet way: take your fresh pad out of its wrapper, peel off the used pad, roll the used pad tightly like a burrito, wrap it inside the wrapper of the new pad or in a piece of newspaper / toilet paper, and drop it into the waste bin / sanitary bin. Wash your hands with soap after.',
    keyTakeaway: 'Never flush pads. Roll the used pad tightly, wrap it in the new pad wrapper or paper, and place it in the waste bin.',
    tags: ['disposal', 'school bathroom', 'hygiene', 'do not flush', 'discreet']
  },
  {
    id: 'hygiene-washing-intimate-area',
    category: 'hygiene_and_products',
    question: 'How should I wash my private parts? Do I need special feminine washes or soap?',
    aliases: ['how to wash vagina', 'intimate wash necessary', 'soap down there', 'cleaning private area'],
    answer: 'You do NOT need perfumed intimate washes, vaginal douches, or harsh soaps! In fact, perfumed products can disrupt your natural vaginal pH and cause yeast infections or burning. Your vagina (the inside tube) cleans itself. For your vulva (the outside area with hair and skin), plain warm water is the safest and best cleanser. If using soap, use only a mild, unscented soap on the outer groin and rinse thoroughly.',
    keyTakeaway: 'Wash only the outside area with plain warm water. Avoid perfumed washes and never wash inside the vagina.',
    tags: ['washing', 'intimate wash', 'soap', 'pH balance', 'vulva care']
  },
  {
    id: 'hygiene-wiping-front-to-back',
    category: 'hygiene_and_products',
    question: 'Why do adults say to wipe from front to back after using the toilet?',
    aliases: ['wiping front to back', 'how to wipe toilet', 'wiping direction girl'],
    answer: 'Always wipe from front (your urethra and vaginal opening) towards the back (your anus). Wiping from back to front can drag bacteria from your bowel towards your urinary opening, which is the number one cause of painful Urinary Tract Infections (UTIs). Wiping front-to-back keeps you safe and healthy every single time.',
    keyTakeaway: 'Always wipe front to back to prevent bowel bacteria from causing painful urinary tract infections (UTIs).',
    tags: ['wiping', 'UTI prevention', 'toilet hygiene', 'front to back']
  },
  {
    id: 'hygiene-pads-vs-tampons-cups',
    category: 'hygiene_and_products',
    question: 'Can teenagers use tampons or menstrual cups, or will it hurt or ruin virginity?',
    aliases: ['can a 13 year old use tampons', 'menstrual cup for teens', 'does tampon break virginity', 'hymen and tampons'],
    answer: 'Yes, teenagers can safely use pads, tampons, or menstrual cups! Using a tampon or cup does NOT take away your virginity. Virginity is a social/personal concept about sexual experience, not a piece of tissue. A tampon or cup simply slips into your vaginal canal past the flexible hymen. If you want to try tampons, start with a "mini" or "light" size with a smooth applicator and relax your pelvic muscles.',
    keyTakeaway: 'Tampons and cups are completely safe for teens and have nothing to do with virginity. Start with a mini size if you want to try.',
    tags: ['tampons', 'menstrual cups', 'virginity myth', 'hymen', 'products']
  },
  {
    id: 'hygiene-tampon-tss-safety',
    category: 'hygiene_and_products',
    question: 'What is Toxic Shock Syndrome (TSS) and how do I prevent it?',
    aliases: ['tampon sickness', 'what is TSS', 'tampon left in too long', 'toxic shock symptoms'],
    answer: 'Toxic Shock Syndrome (TSS) is a very rare but serious bacterial infection linked to leaving a tampon in for too long. You can prevent it easily: never leave a tampon in for more than 8 hours (change every 4 to 8 hours), use the lowest absorbency you need for your flow, and switch to pads at night when sleeping. If you ever develop a sudden high fever, vomiting, and a sunburn-like rash while using a tampon, remove it immediately and seek emergency medical care.',
    keyTakeaway: 'TSS is rare and preventable by changing tampons within 4–8 hours and using pads at night. Sudden fever with a tampon needs emergency care.',
    doctorNote: 'Sudden high fever, confusion, and rash during tampon use is an emergency — seek urgent medical attention.',
    tags: ['TSS', 'tampon safety', 'fever', 'emergency signs', 'hygiene']
  },

  // ─── 4. CRAMPS & COMFORT ───
  {
    id: 'cramps-why-do-they-hurt',
    category: 'cramps_and_comfort',
    question: 'Why do menstrual cramps hurt so much and where does the pain come from?',
    aliases: ['why do cramps happen', 'period pain cause', 'stomach cramps period', 'prostaglandins period'],
    answer: 'Period cramps happen because your uterus is a strong muscle! To shed its lining each month, your uterus produces natural hormone-like chemicals called prostaglandins. Prostaglandins make the uterine muscle tighten and contract, similar to squeezing a fist. When the muscle squeezes, it temporarily limits blood flow to the tissue, causing the crampy ache in your lower tummy, lower back, or thighs.',
    keyTakeaway: 'Cramps are caused by prostaglandins making your uterine muscle contract to shed its lining.',
    tags: ['cramps', 'period pain', 'prostaglandins', 'muscle contraction', 'stomach ache']
  },
  {
    id: 'cramps-natural-remedies-home',
    category: 'cramps_and_comfort',
    question: 'What natural home remedies can soothe bad cramps quickly?',
    aliases: ['cramp relief home remedies', 'hot water bag cramps', 'how to stop period pain without medicine', 'food for cramps'],
    answer: 'Here are trusted remedies that genuinely help: 1) Heat: Place a hot water bag or heating pad on your lower tummy or back — heat relaxes the uterine muscle as effectively as some painkillers! 2) Sip warm liquids like ginger tea, peppermint tea, or warm water. 3) Gentle movement: Child\'s pose yoga stretch or a slow walk. 4) Stay well-hydrated to reduce bloating. 5) Avoid very salty snacks or excess caffeine on cramp days.',
    keyTakeaway: 'Heat therapy (hot water bag) is the gold standard for cramps. Combine with warm ginger tea and gentle stretching.',
    tags: ['home remedies', 'hot water bag', 'heat therapy', 'ginger tea', 'cramp relief']
  },
  {
    id: 'cramps-painkillers-safe-use',
    category: 'cramps_and_comfort',
    question: 'Can I take medicine for period cramps? Is it safe?',
    aliases: ['meftal spas for cramps', 'paracetamol period', 'ibuprofen for cramps teen', 'pain medicine safety'],
    answer: 'Yes, taking mild, doctor-approved pain relievers (like Ibuprofen or Mefenamic Acid / Paracetamol) is safe for most teens when taken according to the package or doctor\'s advice. Because these medications block prostaglandin production, they work best when taken at the very first hint of cramp pain rather than waiting until it becomes unbearable. Always take pain medicine with food or milk, never on an empty stomach, and check with a parent or doctor first.',
    keyTakeaway: 'Doctor-approved pain relievers are safe when taken with food at the earliest sign of cramps. Always check with an adult.',
    doctorNote: 'If you have asthma, stomach ulcers, or allergies, always ask a doctor before taking NSAID painkillers.',
    tags: ['painkillers', 'medicine', 'ibuprofen', 'meftal', 'safety']
  },
  {
    id: 'cramps-when-is-pain-not-normal',
    category: 'cramps_and_comfort',
    question: 'When is period pain abnormal? How do I know if my cramps are too severe?',
    aliases: ['severe period cramps', 'cramps making me vomit', 'fainting from period pain', 'missing school period cramps'],
    answer: 'Mild to moderate cramps that ease with a hot water bag or a standard painkiller are normal. Period pain is NOT normal if: 1) The pain makes you vomit or faint. 2) You regularly have to miss school, exams, or social events. 3) Standard painkillers do not touch the pain at all. 4) You have deep pelvic pain even when you do not have your period. Severe pain like this can point to conditions like endometriosis or hormonal imbalances, and you deserve a doctor\'s support.',
    keyTakeaway: 'Pain that causes vomiting, fainting, or missing school is not something you have to silently endure — talk to a doctor.',
    doctorNote: 'Debilitating period pain that interrupts daily school activities warrants a thorough evaluation by an adolescent gynecologist.',
    tags: ['severe pain', 'endometriosis check', 'vomiting', 'fainting', 'doctor warning']
  },

  // ─── 5. CYCLE RHYTHMS & HORMONES ───
  {
    id: 'cycle-first-few-years-irregular',
    category: 'cycle_rhythms_and_hormones',
    question: 'Why are teenage periods so irregular in the first two or three years?',
    aliases: ['irregular period teen years', 'why is my cycle not 28 days', 'unpredictable period puberty'],
    answer: 'When you start menstruating, the control center in your brain (hypothalamus and pituitary gland) is still learning how to coordinate with your ovaries. This communication link takes about 2 to 3 years to fully mature. Because ovulation (releasing an egg) doesn\'t happen predictably yet, your cycle might be 24 days one month, 42 days the next, and then skip a month. This natural adjustment period is expected and very common.',
    keyTakeaway: 'The brain-ovary link takes 2–3 years to mature. Irregular cycle intervals during this learning window are typical.',
    tags: ['irregular cycles', 'brain ovary link', 'puberty rhythm', 'adjustment', 'normal']
  },
  {
    id: 'cycle-stress-exams-influence',
    category: 'cycle_rhythms_and_hormones',
    question: 'Can exam stress or emotional anxiety delay my period?',
    aliases: ['exam stress late period', 'anxiety delaying period', 'can stress stop period', 'late period not pregnant'],
    answer: 'Absolutely! When you are deeply stressed, anxious, or not sleeping well during exams, your brain releases the stress hormone cortisol. High cortisol can temporarily signal your reproductive system that "now is not a safe time," which delays ovulation. Once ovulation is delayed, your period arrives later than usual. As your stress eases and you rest, your cycle usually returns to its normal pace.',
    keyTakeaway: 'Cortisol from exam stress or emotional worry frequently delays ovulation and shifts your period date.',
    tags: ['stress', 'exam stress', 'cortisol', 'late period', 'anxiety']
  },
  {
    id: 'cycle-how-to-count-days',
    category: 'cycle_rhythms_and_hormones',
    question: 'How exactly do I count my cycle days? What is Day 1?',
    aliases: ['how to count cycle', 'what is day 1 of cycle', 'counting menstrual cycle days', 'cycle length formula'],
    answer: 'Day 1 of your cycle is always the very first day of full, red bleeding (not light brown spotting before). You count from that Day 1 all the way through the month until the day BEFORE your next period starts. For example: if your period started on October 1st and your next period started on October 30th, your cycle length was 29 days! Keeping track in this app makes it completely effortless.',
    keyTakeaway: 'Day 1 is the first day of full bleeding. The cycle length is the total number of days until the day before your next period begins.',
    tags: ['day 1', 'counting cycle', 'cycle tracking', 'calendar', 'formula']
  },
  {
    id: 'cycle-heavy-bleeding-how-much',
    category: 'cycle_rhythms_and_hormones',
    question: 'How do I know if my period bleeding is too heavy?',
    aliases: ['heavy bleeding signs teen', 'menorrhagia teen', 'soaking pads too fast', 'bleeding through clothes'],
    answer: 'A period is considered unusually heavy if you are completely soaking through one or more thick pads every hour for 2 or more consecutive hours, needing to wake up multiple times at night to change pads, or feeling lightheaded, pale, and unusually exhausted. If this happens, your body could be losing iron, and you should visit a doctor so they can help balance your flow.',
    keyTakeaway: 'Soaking a pad every hour for 2+ hours or feeling faint from bleeding is too heavy. A doctor can easily help.',
    doctorNote: 'Heavy menstrual bleeding in teens can cause iron deficiency anemia and should be evaluated by a healthcare professional.',
    tags: ['heavy flow', 'soaking pads', 'anemia', 'dizziness', 'doctor evaluation']
  },

  // ─── 6. HORMONAL PATTERNS & PCOS/PCOD ───
  {
    id: 'pcos-what-is-it-simple-terms',
    category: 'hormonal_patterns_and_pcos',
    question: 'What is PCOS / PCOD in simple words? Is it a dangerous disease?',
    aliases: ['what is pcos', 'what is pcod', 'is pcos dangerous', 'polycystic ovary syndrome teen'],
    answer: 'PCOS (Polycystic Ovary Syndrome) is NOT a dangerous or life-threatening disease. It is simply a very common hormonal imbalance where the ovaries produce slightly more androgens (hormones) than usual, which can make ovulation irregular. The word "cysts" can sound scary, but they are actually just tiny, harmless immature egg follicles that didn\'t fully release. With healthy sleep, good food, stress care, and sometimes simple doctor guidance, girls with PCOS live vibrant, completely healthy lives.',
    keyTakeaway: 'PCOS is a very common hormonal imbalance, not a dangerous disease. Harmless tiny egg sacs simply need support to balance.',
    doctorNote: 'PCOS is manageable with lifestyle and medical support. Only a medical doctor can diagnose it through tests.',
    tags: ['pcos', 'pcod', 'hormonal imbalance', 'what is pcos', 'comfort']
  },
  {
    id: 'pcos-early-warning-signs-teens',
    category: 'hormonal_patterns_and_pcos',
    question: 'What are the early warning signs of hormonal patterns like PCOS in teenagers?',
    aliases: ['pcos symptoms in teens', 'how to know if I have pcos', 'pcos warning signs', 'signs of pcod'],
    answer: 'Early signs that are worth discussing with a doctor include: 1) Consistently irregular periods where cycles are longer than 45 days or absent for months (after the first 2-3 years of puberty). 2) Stubborn, deep cystic acne on your jawline, chin, or back that doesn\'t respond to normal skincare. 3) Noticeable, coarse hair growth on your upper lip, chin, chest, or stomach. 4) Unexplained hair thinning on your scalp. 5) Difficulty managing weight despite healthy habits. Having one sign doesn\'t mean you have PCOS, but a combination is worth checking with a doctor.',
    keyTakeaway: 'Gaps over 45 days combined with jawline acne or coarse facial hair are patterns worth discussing with a doctor.',
    doctorNote: 'A pattern of prolonged cycle gaps paired with androgenic symptoms is worth discussing with an adolescent endocrinologist or gynecologist.',
    tags: ['pcos signs', 'facial hair', 'cystic acne', 'irregular cycles', 'early warning']
  },
  {
    id: 'pcos-puberty-vs-pcos-difference',
    category: 'hormonal_patterns_and_pcos',
    question: 'How can I tell the difference between normal puberty acne/irregularity and PCOS?',
    aliases: ['puberty vs pcos', 'is it puberty or pcos', 'normal teenage acne or pcos'],
    answer: 'This is the most important question! Normal puberty causes temporary acne, mild cycle irregularity, and mood shifts as hormones surge. The difference is that normal puberty irregularities usually begin to smooth out after 2 to 3 years. With PCOS, the irregularity persists, cycles remain consistently very long (45 to 90+ days), and acne tends to be cystic and stubborn. Because the symptoms overlap so much, doctors avoid rushing to diagnose PCOS in young teens until they see a persistent multi-year pattern.',
    keyTakeaway: 'Normal puberty symptoms smooth out after 2–3 years. Persistent long gaps (>45 days) and cystic acne over time suggest getting a checkup.',
    doctorNote: 'International guidelines caution against diagnosing PCOS within 2 years of menarche due to normal developmental overlap.',
    tags: ['puberty vs pcos', 'diagnosis difference', 'teen hormones', 'acne', 'timeline']
  },
  {
    id: 'pcos-doctor-visit-what-to-expect',
    category: 'hormonal_patterns_and_pcos',
    question: 'What happens at a doctor appointment for PCOS? Will it be painful or scary?',
    aliases: ['what does gynecologist do pcos', 'pcos ultrasound teen', 'pcos test for girls', 'doctor visit pcos'],
    answer: 'A doctor visit is gentle and safe! For teenagers, a gynecologist will first just sit and talk with you about your cycle dates, symptoms, and lifestyle. They might order a simple, routine blood test to check your hormone and sugar levels. If an ultrasound is needed, in teenagers it is almost always done over your tummy (transabdominal ultrasound) with cool gel, exactly like looking at a baby — it is completely external and does not hurt at all.',
    keyTakeaway: 'Teen PCOS checkups involve friendly conversation, gentle blood tests, and an external tummy ultrasound. It is not painful.',
    doctorNote: 'Pelvic exams are generally not performed on young adolescent virgins; external ultrasound and blood panels are standard.',
    tags: ['doctor visit', 'ultrasound', 'blood test', 'gynecologist', 'what to expect']
  },
  {
    id: 'pcos-food-lifestyle-hormone-care',
    category: 'hormonal_patterns_and_pcos',
    question: 'Can food, sleep, and exercise help balance teen hormones naturally?',
    aliases: ['pcos diet for teens', 'how to balance hormones naturally', 'food for regular periods', 'lifestyle pcos'],
    answer: 'Yes, your everyday habits have a huge, empowering impact on your hormones! 1) Sleep: Getting 8 to 9 hours of quality sleep helps your brain regulate reproductive signals. 2) Nourishing meals: Eat steady proteins (dal, eggs, paneer, nuts), fiber-rich veggies, and whole grains to keep blood sugar stable. 3) Movement: 30 minutes of fun movement you enjoy (dancing, walking, sports) helps your body use insulin effectively. 4) Stress care: Deep breathing or journaling lowers cortisol, letting your ovaries thrive.',
    keyTakeaway: '8–9 hours of sleep, steady protein, fun daily movement, and stress relief naturally encourage balanced hormone rhythms.',
    tags: ['lifestyle', 'sleep', 'nutrition', 'blood sugar', 'natural balance']
  },

  // ─── 7. SCHOOL EMERGENCIES & PRACTICAL HACKS ───
  {
    id: 'school-period-started-suddenly',
    category: 'school_emergencies',
    question: 'My period started unexpectedly at school and I don’t have a pad! What do I do?',
    aliases: ['emergency period at school', 'no pad at school', 'started bleeding in class', 'school period emergency'],
    answer: 'First, take a deep breath — this has happened to literally every woman and girl on earth! Here is your quick emergency game plan: 1) Fold a thick wad of clean toilet paper or tissues (around 6–8 layers) and place it in your underwear as a temporary buffer. 2) Discreetly whisper to a female friend, classmate, or the school nurse — girls always help each other with pads. 3) If there\'s no friend nearby, visit the female teacher or school infirmary; schools keep emergency supplies.',
    keyTakeaway: 'Fold 6-8 layers of toilet paper as a temporary shield, then ask a friend, female teacher, or school nurse for an emergency pad.',
    tags: ['school emergency', 'no pad', 'toilet paper hack', 'sisterhood', 'teacher']
  },
  {
    id: 'school-blood-stain-on-uniform',
    category: 'school_emergencies',
    question: 'There is a blood stain on my school uniform or pants. How do I hide and clean it?',
    aliases: ['blood stain uniform', 'leaked on pants at school', 'how to wash period blood out', 'period stain clothes'],
    answer: 'Here is how to handle a uniform leak with zero panic: 1) Cover it: Tie your school sweater, jacket, or cardigan around your waist — it looks stylish and covers the back completely. 2) To wash the stain: ALWAYS use cold water, never hot water! Hot water cooks the protein in blood and permanently sets the stain. Dab the stain with cold water and hand soap in the restroom sink. If at home, a little baking soda or hydrogen peroxide lifts blood right out.',
    keyTakeaway: 'Tie a sweater or jacket around your waist. To remove stains, always use cold water and soap — never hot water.',
    tags: ['stain', 'uniform', 'leak', 'cold water', 'sweater hack']
  },
  {
    id: 'school-emergency-kit-backpack',
    category: 'school_emergencies',
    question: 'What should I pack in an emergency period kit for my school bag?',
    aliases: ['period pouch school', 'emergency period kit', 'what to carry in school bag period'],
    answer: 'Keep a small, cute cosmetic pouch in your school bag that looks like pencil or lip balm storage. Pack: 1) Two regular pads and one pantyliner. 2) A spare pair of cotton underwear. 3) A small ziplock bag (to store soiled underwear or wrap used pads if needed). 4) A small pack of wet wipes or pocket tissues. 5) A couple of wrapped candies or ginger mints. Having this in your bag gives you total peace of mind all day!',
    keyTakeaway: 'Pack 2 pads, a spare pair of panties, a ziplock bag, and wipes in a discreet little pouch for full peace of mind.',
    tags: ['kit', 'pouch', 'backpack', 'preparedness', 'school']
  },

  // ─── 8. EMOTIONS & RELATIONSHIPS ───
  {
    id: 'emotions-pms-crying-irritable',
    category: 'emotions_and_relationships',
    question: 'Why do I feel so angry, anxious, or tearful a few days before my period?',
    aliases: ['pms mood swings', 'crying before period', 'why am I so irritable before period', 'premenstrual mood'],
    answer: 'Those emotional waves are called PMS (Premenstrual Syndrome). About a week before your period, your estrogen and progesterone hormone levels drop sharply, which temporarily dips serotonin (your brain’s "happy and calm" chemical). You are not being "crazy" or "overdramatic" — your brain is responding to real chemical shifts. Give yourself extra kindness, get extra sleep, hug a pillow, and remember that the cloud will lift once your period arrives.',
    keyTakeaway: 'A drop in estrogen and serotonin right before your period causes temporary mood dips and tears. Be gentle with yourself.',
    tags: ['pms', 'mood swings', 'serotonin', 'crying', 'emotional changes']
  },
  {
    id: 'emotions-how-to-talk-to-mom',
    category: 'emotions_and_relationships',
    question: 'How do I talk to my mom or an elder sister about my period or cramps without feeling awkward?',
    aliases: ['how to tell mom period started', 'talking to mom about cramps', 'too embarrassed to tell mom'],
    answer: 'It is so normal to feel shy, but remember: your mom, aunt, or older sister has experienced every single one of these exact things! If saying it out loud feels too difficult, you can: 1) Send her a simple text message: "Hey Mom, my period started today / I\'ve been having bad cramps. Can you help me get some pads and a hot water bag?" 2) Show her the "Show Someone" summary card right here in this app! Handing her the phone removes all the pressure of finding the words.',
    keyTakeaway: 'Your mom or sister has lived through this too. If talking feels too awkward, send a quick text or hand her our Summary Card.',
    tags: ['talking to mom', 'communication', 'awkwardness', 'text message', 'summary card']
  },
  {
    id: 'emotions-body-comparison-peers',
    category: 'emotions_and_relationships',
    question: 'All my friends got their periods already and have curves. Why am I developing so late?',
    aliases: ['late bloomer', 'friends have periods not me', 'feeling behind in puberty', 'flat chested teen'],
    answer: 'It is so easy to compare yourself with classmates, but bodies follow their genetics, not a school calendar! Some girls experience a growth spurt at 10, while others do at 14 or 15. Neither is "better" or "healthier." If your mom, aunts, or sisters were late bloomers, you likely carry the same natural rhythm. As long as you are growing and nourishing yourself, your body will reach every milestone when it is fully ready.',
    keyTakeaway: 'Puberty is guided by your unique genetics. Being a "late bloomer" is healthy and completely normal.',
    tags: ['late bloomer', 'comparison', 'puberty timeline', 'body image']
  },

  // ─── 9. ADDITIONAL CRITICAL FAQS & MYTH BUSTING ───
  {
    id: 'myths-cold-water-ice-cream-cramps',
    category: 'cramps_and_comfort',
    question: 'Can drinking cold water or eating curd / ice cream worsen period cramps?',
    aliases: ['cold water bad for period', 'ice cream during cramps myth', 'eating sour food during periods'],
    answer: 'This is a very widespread cultural myth, especially across South Asia! Scientifically, what you eat or drink travels down your digestive esophagus into your stomach — it never touches your uterus or reproductive organs. Cold water will not freeze your blood or lock up your uterus. However, warm drinks (like ginger or cinnamon tea) can feel soothing and promote muscle relaxation, which is why warmth feels comforting.',
    keyTakeaway: 'Cold water or curd does not physically worsen menstrual blood or harm your uterus. Drink whatever brings you comfort!',
    tags: ['myth busting', 'cold water', 'curd', 'ice cream', 'indian traditions']
  },
  {
    id: 'pcos-future-fertility-fears',
    category: 'hormonal_patterns_and_pcos',
    question: 'If I have irregular periods or a PCOS pattern, does it mean I can never have children in the future?',
    aliases: ['can girls with pcos have babies', 'does pcos make you infertile', 'will I never have kids pcos'],
    answer: 'Deep breath: that is a complete myth and one of the biggest unnecessary fears teens carry! PCOS does NOT make you infertile or sterile. It simply means ovulation is irregular right now. When you are an adult and decide you want children, simple lifestyle support and safe medical treatments easily help your ovaries release eggs on schedule. Almost all women with PCOS who want children have healthy, happy families.',
    keyTakeaway: 'PCOS does NOT mean infertility. Ovulation timing can be easily supported with standard care when you are older.',
    doctorNote: 'Adolescent irregular cycles or polycystic patterns should never be interpreted as permanent infertility.',
    tags: ['fertility', 'pcos myth', 'future children', 'reassurance']
  },
  {
    id: 'period-age-15-not-started',
    category: 'period_essentials',
    question: 'I am 15 or 16 and I still haven’t had my first period. Should I see a doctor?',
    aliases: ['15 years old no period', '16 no period', 'when to worry about first period', 'primary amenorrhea'],
    answer: 'Most girls get their first period by age 15, or within 3 years of noticing their first breast buds. If you have reached 15 without a period, or if you are 13 with no signs of puberty at all (no breast development or growth), it is a good idea to visit an adolescent gynecologist or pediatrician for a friendly checkup. Most often it is just constitutional delay (late bloomer) or low body fat, but a doctor can easily confirm everything is healthy.',
    keyTakeaway: 'If you are 15 with no period, or 13 with no puberty signs, a friendly checkup with a pediatrician is recommended.',
    doctorNote: 'Lack of menarche by age 15 (or >3 years post-thelarche) warrants clinical evaluation for primary amenorrhea.',
    tags: ['age 15', 'late menarche', 'pediatrician', 'checkup', 'amenorrhea']
  },
  {
    id: 'hygiene-pad-wings-how-to-wear',
    category: 'hygiene_and_products',
    question: 'How do I put on a sanitary pad with wings correctly so it doesn’t leak?',
    aliases: ['how to use pad with wings', 'sticking pad in underwear', 'how to place pad', 'pad leaking sides'],
    answer: 'Here is the foolproof way: 1) Unwrap the pad and pull off the long sticky paper on the bottom. 2) Press the sticky side down into the middle gusset (crotch) of your underwear, centered between the front and back. 3) Peel the small paper backing off the two side wings. 4) Fold the wings firmly underneath the sides of your underwear so they stick together under the fabric. Make sure your underwear fits snugly so the pad stays firmly in place.',
    keyTakeaway: 'Center the pad on the underwear gusset, then wrap the wings snugly around the underside of the fabric.',
    tags: ['pad with wings', 'how to wear pad', 'leak prevention', 'underwear placement']
  },
  {
    id: 'hygiene-pad-rash-chafing',
    category: 'hygiene_and_products',
    question: 'My pad gave me an itchy, burning rash on my thighs. How do I heal it and prevent it?',
    aliases: ['pad rash on inner thighs', 'itchy pad rash', 'chafing from sanitary pads', 'pad allergy'],
    answer: 'Pad rashes usually happen from friction, sweat, or plastic top-sheets on certain synthetic pads. Here is how to heal and prevent it: 1) Switch to 100% pure organic cotton pads or bamboo pads (like Natchkin) which are breathable and chemical-free. 2) Change pads every 4 hours so dampness doesn\'t sit against your skin. 3) Wear loose 100% cotton underwear and loose shorts. 4) Apply a thin layer of pure coconut oil or a gentle zinc barrier cream to soothe the raw skin.',
    keyTakeaway: 'Heal pad rashes with pure coconut oil and switch to breathable, pure cotton pads like Natchkin with zero plastic top-sheets.',
    tags: ['pad rash', 'cotton pads', 'natchkin', 'chafing', 'coconut oil']
  },
  {
    id: 'period-smell-odor-normal',
    category: 'period_essentials',
    question: 'Does period blood have an odor? Is it normal for it to smell metallic or earthy?',
    aliases: ['period smell', 'does period blood smell', 'odor during period', 'metallic period smell'],
    answer: 'Yes, period blood naturally has a mild metallic or slightly earthy scent! The metallic smell comes directly from the iron inside your red blood cells. When blood mixes with the air and natural vaginal bacteria on a pad, it can develop a slightly stronger musky scent. This is 100% normal. Regular changing (every 4-6 hours) and daily warm water rinsing will keep you feeling totally clean and confident.',
    keyTakeaway: 'A mild metallic or earthy smell is normal because of the iron in blood. Regular pad changes keep you fresh.',
    tags: ['smell', 'odor', 'iron', 'metallic', 'freshness']
  },
  {
    id: 'cramps-lower-back-pain-reasons',
    category: 'cramps_and_comfort',
    question: 'Why does my lower back and inner thighs ache so much during my period?',
    aliases: ['back pain period', 'lower back cramps', 'thigh pain period', 'backache during menstrual cycle'],
    answer: 'The nerves that supply your uterus also pass right through your pelvis, lower spine, and down into your thighs! When your uterus contracts from prostaglandins, the pain signals radiate along that nerve network into your lower back and thighs (called referred pain). Placing a hot water bottle against your lower back, doing a gentle cat-cow yoga stretch, or having someone gently massage your sacrum provides huge relief.',
    keyTakeaway: 'Nerves connecting your uterus also pass through your lower back and legs, causing referred ache. Heat on the lower back works wonders.',
    tags: ['backache', 'referred pain', 'lower back', 'nerves', 'stretching']
  },
  {
    id: 'pcos-facial-hair-chin-androgens',
    category: 'hormonal_patterns_and_pcos',
    question: 'I noticed dark, coarse hairs on my chin and upper lip. Does that mean I have PCOS?',
    aliases: ['chin hair girl', 'facial hair on girls', 'hirsutism teen', 'mustache puberty girl'],
    answer: 'Having a few stray dark hairs on your chin or upper lip is actually very common for girls of many ethnic backgrounds (especially South Asian and Mediterranean) and does NOT automatically mean you have PCOS. However, if you notice a widespread pattern of thick, coarse hair growing across your jawline, neck, chest, or lower tummy (called hirsutism), especially combined with irregular periods, it is worth mentioning to a doctor to check your androgen hormone levels.',
    keyTakeaway: 'A few dark hairs are normal. A widespread pattern of coarse facial or body hair paired with irregular cycles is worth a doctor check.',
    doctorNote: 'Persistent moderate-to-severe hirsutism should be clinically scored via the Ferriman-Gallwey scale by an endocrinologist.',
    tags: ['chin hair', 'facial hair', 'hirsutism', 'androgens', 'ethnic variations']
  },
  {
    id: 'cycle-pantyliners-purpose',
    category: 'hygiene_and_products',
    question: 'What is the difference between a pantyliner and a sanitary pad?',
    aliases: ['what are pantyliners for', 'pad vs pantyliner', 'when to use pantyliner'],
    answer: 'A sanitary pad is thicker and designed to absorb full menstrual blood flow during your period. A pantyliner is super thin, small, and flexible — it is meant for very light days, like the day before your period might arrive, the tail end of your period with tiny brown spots, or days when you have heavier natural discharge. Pantyliners are not thick enough to handle regular period bleeding.',
    keyTakeaway: 'Pantyliners are ultra-thin shields for light discharge or the very last day of spotting. Pads are for full flow.',
    tags: ['pantyliner', 'pad vs liner', 'discharge', 'spotting']
  }
];

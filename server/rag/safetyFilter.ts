export interface SafetyResult {
  triggered: boolean;
  category?: 'self_harm_crisis' | 'abuse_or_assault' | 'severe_acute_hemorrhage' | 'toxic_shock_or_acute_emergency';
  title: string;
  compassionateMessage: string;
  immediateActions: string[];
  helplines: Array<{
    name: string;
    number: string;
    description: string;
    tollFree?: boolean;
    available24x7?: boolean;
  }>;
}

// Regex patterns for hard-coded safety detection
const SELF_HARM_PATTERNS = [
  /\b(kill|end)\s+(my\s*self|myself|my\s*life)\b/i,
  /\b(suicide|suicidal|want\s+to\s+die|wish\s+i\s+was\s+dead|don't\s+want\s+to\s+live)\b/i,
  /\b(cut|cutting)\s+(my\s*self|myself|my\s*wrists|my\s*arms|my\s*thighs)\b/i,
  /\b(hang\s+myself|swallow\s+pills\s+to\s+die|overdose)\b/i,
  /\b(better\s+off\s+dead|no\s+reason\s+to\s+live)\b/i
];

const ABUSE_ASSAULT_PATTERNS = [
  /\b(molest|molested|molesting)\b/i,
  /\b(rape|raped|raping)\b/i,
  /\b(sexually\s+assault|assaulted\s+me)\b/i,
  /\b(unwanted\s+touch|touched\s+my\s+private|touching\s+me\s+inappropriately)\b/i,
  /\b(forced\s+me\s+to\s+have\s+sex|forced\s+me\s+to\s+touch)\b/i,
  /\b(hits\s+me|beating\s+me|abusing\s+me|unsafe\s+at\s+home|someone\s+is\s+hurting\s+me)\b/i
];

const SEVERE_HEMORRHAGE_PATTERNS = [
  /\bsoak(ing|ed)?\s+(through\s+)?(a\s+)?pad\s+(every|in\s+an)\s+hour\b/i,
  /\bbleed(ing)?\s+(through\s+)?(clothes|bed|sheets)\s+(non-?stop|heavily)\b/i,
  /\b(fainted|passed\s+out|blacked\s+out)\s+(from|while)\s+(bleeding|period)\b/i,
  /\b(extremely\s+pale|cannot\s+stand\s+up|loss\s+of\s+blood\s+dizzy)\b/i,
  /\bgolf\s+ball\s+sized\s+clots?\s+continuously\b/i
];

const TOXIC_SHOCK_OR_ACUTE_EMERGENCY = [
  /\b(toxic\s+shock|tss)\b/i,
  /\btampon\s+(forgotten|stuck|left\s+in\s+(for\s+)?days)\b/i,
  /\b(tampon).*(high\s+fever|vomit|rash|chills)\b/i,
  /\b(high\s+fever|vomit|rash|chills).*(tampon)\b/i,
  /\b(unbearable|agonizing|worst\s+pain\s+of\s+my\s+life)\s+pelvic\s+pain\b/i,
  /\bsharp\s+stabbing\s+pain\s+one\s+side\s+(cannot\s+walk|fever)\b/i
];

export function checkSafetyTriggers(userInput: string): SafetyResult {
  const cleanInput = userInput.trim().toLowerCase();

  // 1. Self-Harm / Suicide Ideation
  for (const pattern of SELF_HARM_PATTERNS) {
    if (pattern.test(cleanInput)) {
      return {
        triggered: true,
        category: 'self_harm_crisis',
        title: 'We care about you — you are not alone',
        compassionateMessage: 'Please pause and take a gentle breath. You matter so deeply, and whatever heavy feelings or pain you are carrying right now, you do not have to carry them in silence. There are kind, trained people ready to listen and support you right this second, free and without any judgment.',
        immediateActions: [
          'Reach out immediately to one of the confidential, free helplines below.',
          'Talk to a trusted friend, older sibling, school counselor, or family member right now.',
          'If you are in immediate physical danger, call national emergency 112 or go to the nearest hospital emergency room.'
        ],
        helplines: [
          {
            name: 'Tele-MANAS (Govt of India)',
            number: '14416 or 1800-891-4416',
            description: '24/7 National Mental Health & Emotional Crisis Helpline (Free & Confidential)',
            tollFree: true,
            available24x7: true
          },
          {
            name: 'Childline India',
            number: '1098',
            description: '24/7 Emergency phone helpline for children & teenagers across India',
            tollFree: true,
            available24x7: true
          },
          {
            name: 'Vandrevala Foundation',
            number: '+91 9999 666 555',
            description: 'Free 24/7 mental health counseling and crisis intervention',
            tollFree: false,
            available24x7: true
          },
          {
            name: 'Crisis Text Line (International)',
            number: 'Text HOME to 741741',
            description: 'Free, 24/7 crisis support via SMS',
            tollFree: true,
            available24x7: true
          }
        ]
      };
    }
  }

  // 2. Abuse / Sexual Assault / Domestic Danger
  for (const pattern of ABUSE_ASSAULT_PATTERNS) {
    if (pattern.test(cleanInput)) {
      return {
        triggered: true,
        category: 'abuse_or_assault',
        title: 'You are safe to seek help — this is not your fault',
        compassionateMessage: 'Nothing that happened is your fault. Your body belongs to you, and you have every right to be safe, respected, and protected. There are dedicated people who will protect your privacy and help you immediately.',
        immediateActions: [
          'Call the 24/7 Women Helpline (181) or Childline (1098) immediately — calls are free and confidential.',
          'Find a safe location away from the person hurting or threatening you.',
          'Tell a trusted teacher, doctor, or family member who can stand by your side.'
        ],
        helplines: [
          {
            name: 'Women & Girl Helpline (India)',
            number: '181',
            description: '24/7 Emergency support and safety for women and girls facing violence or harassment',
            tollFree: true,
            available24x7: true
          },
          {
            name: 'Childline India',
            number: '1098',
            description: '24/7 Free emergency assistance for youth up to 18 years',
            tollFree: true,
            available24x7: true
          },
          {
            name: 'National Emergency',
            number: '112',
            description: 'Immediate police and medical emergency dispatch',
            tollFree: true,
            available24x7: true
          }
        ]
      };
    }
  }

  // 3. Severe Acute Hemorrhage
  for (const pattern of SEVERE_HEMORRHAGE_PATTERNS) {
    if (pattern.test(cleanInput)) {
      return {
        triggered: true,
        category: 'severe_acute_hemorrhage',
        title: 'Important: Urgent Medical Care Needed',
        compassionateMessage: 'Soaking through thick pads in an hour continuously or feeling faint and extremely pale is too much blood loss for your body to handle on its own. Please don’t wait or try to tough it out at home.',
        immediateActions: [
          'Tell a parent, older relative, or school nurse immediately that you are bleeding heavily and feel weak.',
          'Go straight to an urgent care clinic or hospital emergency room.',
          'Lie down with your legs elevated slightly to prevent fainting while help is being arranged.'
        ],
        helplines: [
          {
            name: 'National Emergency Ambulance (India)',
            number: '108 or 112',
            description: 'Free emergency medical ambulance service',
            tollFree: true,
            available24x7: true
          }
        ]
      };
    }
  }

  // 4. Toxic Shock Syndrome / Acute Abdominal Emergency
  for (const pattern of TOXIC_SHOCK_OR_ACUTE_EMERGENCY) {
    if (pattern.test(cleanInput)) {
      return {
        triggered: true,
        category: 'toxic_shock_or_acute_emergency',
        title: 'Emergency Medical Assessment Needed',
        compassionateMessage: 'If you have a high fever, sudden vomiting, or rash while using a tampon, or sudden agonizing sharp lower abdominal pain that prevents you from standing, this requires immediate in-person medical evaluation.',
        immediateActions: [
          'If wearing a tampon, remove it immediately.',
          'Inform an adult, teacher, or guardian right away that you need urgent medical care.',
          'Go to the nearest emergency department or medical clinic.'
        ],
        helplines: [
          {
            name: 'Emergency Ambulance',
            number: '108 or 112',
            description: 'Immediate ambulance and emergency dispatch',
            tollFree: true,
            available24x7: true
          }
        ]
      };
    }
  }

  return {
    triggered: false,
    title: '',
    compassionateMessage: '',
    immediateActions: [],
    helplines: []
  };
}

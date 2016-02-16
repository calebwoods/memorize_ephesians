export class Passage {
  constructor(verses) {
    this._verses = verses;
  }

  metadata() {
    let firstVerse = this._verses[0];
    let lastVerse = this._verses[this._verses.length - 1]
    let bookChapter = firstVerse.book + ' ' + firstVerse.chapter + ':';
    if (this._verses.length > 1) {
      if (firstVerse.chapter === lastVerse.chapter) {
        return bookChapter + firstVerse.verse + '-' + lastVerse.verse;
      } else {
        return firstVerse.book + ' ' + firstVerse.chapter + ':' + firstVerse.verse + '-' + lastVerse.chapter + ':' + lastVerse.verse;
      }
    } else {
      return bookChapter + this._verses[0].verse;
    }
  }

  baseAudioUrl() {
    return "http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=";
  }

  audioUrl() {
    return encodeURI(this.baseAudioUrl() + this.metadata() + '&output-format=mp3');
  }

  readText() {
    return this._verses.map(function (rawVerse) {
      return '<sup>' + rawVerse.verse + '</sup>' + rawVerse.text;
    }).join('');
  }

  recallFirstText() {
    return this._verses.map(function (rawVerse) {
      return '<sup>' + rawVerse.verse + '</sup>' + rawVerse.text.split(' ').map(function (word) {
        if (word[0]) {
          return word[0] + word.slice(1, word.length).replace(/\w/g, ' ');
        } else {
          return '';
        }
      }).join(' ');
    }).join('');
  }

  recallNoneText() {
    return this._verses.map(function (rawVerse) {
      return '<sup>' + rawVerse.verse + '</sup>' + rawVerse.text.split(' ').map(function (word) {
        return word.replace(/\w/g, ' ');
      }).join(' ');
    }).join('');
  }
}

export function verses() {
  return rawVerses.map((verse) => {
    return new Passage([ verse ]);
  });
}

// this is a temporary random sorting sorting into segments,
// just to get something in place
export function segments() {
  const segmentIndexes = [
    [0,  2], // 1:1-2
    [2,  2], // 1:3-4
    [4,  2], // 1:5-6
    [6,  2], // 1:7-8
    [8,  2], // 1:9-10
    [10, 2], // 1:11-12
    [12, 2], // 1:13-14
    [14, 2], // 1:15-16
    [16, 1], // 1:17
    [17, 1], // 1:18
    [18, 2], // 1:19-20
    [20, 1], // 1:21
    [21, 2], // 1:22-23
    [0, 23], // 1:1-23
    [23, 3], // 2:1-3
    [26, 2], // 2:4-5
    [27, 2], // 2:6-7
    [30, 2], // 2:8-9
    [32, 1], // 2:10
    [33, 2], // 2:11-12
    [35, 1], // 2:13
    [36, 1], // 2:14
    [37, 2], // 2:15-16
    [39, 2], // 2:17-18
    [41, 2], // 2:19-20
    [43, 2], // 2:21-22
    [0, 45], // 1:1-2:22
    [45, 3], // 3:1-3
    [48, 2], // 3:4-5
    [50, 1], // 3:6
    [51, 2], // 3:7-8
    [53, 2], // 3:9-10
    [55, 2], // 3:11-12
    [57, 1], // 3:13
    [58, 2], // 3:14-15
    [60, 2], // 3:16-17
    [62, 2], // 3:18-19
    [64, 2], // 3:20-21
    [0, 66]  // 1:1-3:21
  ];

  return segmentIndexes.map((touple) => {
    return new Passage(rawVerses.slice(touple[0], (touple[0] + touple[1])));
  });
}

export function chapters() {
  const chapterIndexes = [
    [0,  23], // 1:1-23
    [23, 22], // 2:1-22
    [45, 21]  // 3:1-21
  ];

  return chapterIndexes.map((touple) => {
    return new Passage(rawVerses.slice(touple[0], (touple[0] + touple[1])));
  });
}

const rawVerses = Object.freeze([
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 1,
        "text": "Paul, an apostle of Christ Jesus by the will of God, To the saints who are in Ephesus, and are faithful in Christ Jesus:"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 2,
        "text": "Grace to you and peace from God our Father and the Lord Jesus Christ."
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 3,
        "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavenly places,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 4,
        "text": "even as he chose us in him before the foundation of the world, that we should be holy and blameless before him. In love"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 5,
        "text": "he predestined us for adoption as sons through Jesus Christ, according to the purpose of his will,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 6,
        "text": "to the praise of his glorious grace, with which he has blessed us in the Beloved."
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 7,
        "text": "In him we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 8,
        "text": "which he lavished upon us, in all wisdom and insight"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 9,
        "text": "making known to us the mystery of his will, according to his purpose, which he set forth in Christ"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 10,
        "text": "as a plan for the fullness of time, to unite all things in him, things in heaven and things on earth."
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 11,
        "text": "In him we have obtained an inheritance, having been predestined according to the purpose of him who works all things according to the counsel of his will,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 12,
        "text": "so that we who were the first to hope in Christ might be to the praise of his glory."
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 13,
        "text": "In him you also, when you heard the word of truth, the gospel of your salvation, and believed in him, were sealed with the promised Holy Spirit,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 14,
        "text": "who is the guarantee of our inheritance until we acquire possession of it, to the praise of his glory."
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 15,
        "text": "For this reason, because I have heard of your faith in the Lord Jesus and your love toward all the saints,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 16,
        "text": "I do not cease to give thanks for you, remembering you in my prayers,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 17,
        "text": "that the God of our Lord Jesus Christ, the Father of glory, may give you a spirit of wisdom and of revelation in the knowledge of him,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 18,
        "text": "having the eyes of your hearts enlightened, that you may know what is the hope to which he has called you, what are the riches of his glorious inheritance in the saints,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 19,
        "text": "and what is the immeasurable greatness of his power toward us who believe, according to the working of his great might"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 20,
        "text": "that he worked in Christ when he raised him from the dead and seated him at his right hand in the heavenly places,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 21,
        "text": "far above all rule and authority and power and dominion, and above every name that is named, not only in this age but also in the one to come."
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 22,
        "text": "And he put all things under his feet and gave him as head over all things to the church,"
    },
    {
        "book": "Ephesians",
        "chapter": 1,
        "verse": 23,
        "text": "which is his body, the fullness of him who fills all in all."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 1,
        "text": "And you were dead in the trespasses and sins"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 2,
        "text": "in which you once walked, following the course of this world, following the prince of the power of the air, the spirit that is now at work in the sons of disobedience—"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 3,
        "text": "among whom we all once lived in the passions of our flesh, carrying out the desires of the body and the mind, and were by nature children of wrath, like the rest of mankind."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 4,
        "text": "But God, being rich in mercy, because of the great love with which he loved us,"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 5,
        "text": "even when we were dead in our trespasses, made us alive together with Christ—by grace you have been saved—"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 6,
        "text": "and raised us up with him and seated us with him in the heavenly places in Christ Jesus,"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 7,
        "text": "so that in the coming ages he might show the immeasurable riches of his grace in kindness toward us in Christ Jesus."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 8,
        "text": "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God,"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 9,
        "text": "not a result of works, so that no one may boast."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 10,
        "text": "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 11,
        "text": "Therefore remember that at one time you Gentiles in the flesh, called “the uncircumcision” by what is called the circumcision, which is made in the flesh by hands—"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 12,
        "text": "remember that you were at that time separated from Christ, alienated from the commonwealth of Israel and strangers to the covenants of promise, having no hope and without God in the world."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 13,
        "text": "But now in Christ Jesus you who once were far off have been brought near by the blood of Christ."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 14,
        "text": "For he himself is our peace, who has made us both one and has broken down in his flesh the dividing wall of hostility"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 15,
        "text": "by abolishing the law of commandments expressed in ordinances, that he might create in himself one new man in place of the two, so making peace,"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 16,
        "text": "and might reconcile us both to God in one body through the cross, thereby killing the hostility."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 17,
        "text": "And he came and preached peace to you who were far off and peace to those who were near."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 18,
        "text": "For through him we both have access in one Spirit to the Father."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 19,
        "text": "So then you are no longer strangers and aliens, but you are fellow citizens with the saints and members of the household of God,"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 20,
        "text": "built on the foundation of the apostles and prophets, Christ Jesus himself being the cornerstone,"
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 21,
        "text": "in whom the whole structure, being joined together, grows into a holy temple in the Lord."
    },
    {
        "book": "Ephesians",
        "chapter": 2,
        "verse": 22,
        "text": "In him you also are being built together into a dwelling place for God by the Spirit."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 1,
        "text": "For this reason I, Paul, a prisoner for Christ Jesus on behalf of you Gentiles—"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 2,
        "text": "assuming that you have heard of the stewardship of God's grace that was given to me for you,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 3,
        "text": "how the mystery was made known to me by revelation, as I have written briefly."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 4,
        "text": "When you read this, you can perceive my insight into the mystery of Christ,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 5,
        "text": "which was not made known to the sons of men in other generations as it has now been revealed to his holy apostles and prophets by the Spirit."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 6,
        "text": "This mystery is that the Gentiles are fellow heirs, members of the same body, and partakers of the promise in Christ Jesus through the gospel."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 7,
        "text": "Of this gospel I was made a minister according to the gift of God's grace, which was given me by the working of his power."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 8,
        "text": "To me, though I am the very least of all the saints, this grace was given, to preach to the Gentiles the unsearchable riches of Christ,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 9,
        "text": "and to bring to light for everyone what is the plan of the mystery hidden for ages in God who created all things,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 10,
        "text": "so that through the church the manifold wisdom of God might now be made known to the rulers and authorities in the heavenly places."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 11,
        "text": "This was according to the eternal purpose that he has realized in Christ Jesus our Lord,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 12,
        "text": "in whom we have boldness and access with confidence through our faith in him."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 13,
        "text": "So I ask you not to lose heart over what I am suffering for you, which is your glory."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 14,
        "text": "For this reason I bow my knees before the Father,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 15,
        "text": "from whom every family in heaven and on earth is named,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 16,
        "text": "that according to the riches of his glory he may grant you to be strengthened with power through his Spirit in your inner being,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 17,
        "text": "so that Christ may dwell in your hearts through faith—that you, being rooted and grounded in love,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 18,
        "text": "may have strength to comprehend with all the saints what is the breadth and length and height and depth,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 19,
        "text": "and to know the love of Christ that surpasses knowledge, that you may be filled with all the fullness of God."
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 20,
        "text": "Now to him who is able to do far more abundantly than all that we ask or think, according to the power at work within us,"
    },
    {
        "book": "Ephesians",
        "chapter": 3,
        "verse": 21,
        "text": "to him be glory in the church and in Christ Jesus throughout all generations, forever and ever. Amen."
    }
]);

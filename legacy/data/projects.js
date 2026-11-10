/* ============================================================================
   PROJECTS DATA
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit to add/update projects.

   Each project object has:
     id        - unique url-safe slug
     title     - display title (shown left of the card header)
     tags      - array of short label strings (shown right of the card header)
     company  - short 1-2 sentence summary (shown in modal)
     role   - longer paragraph (shown in modal)
     details   - array of "Label: value" strings (bullet list in modal)
     meta      - key/value pairs shown at the bottom of the modal
     images    - array of image OR video paths (.jpg, .png, .gif, .mp4, .webm)
     displayCount - how many of the images to flash through on the CARD on hover
                    1 = static (shows only first)
                    2+ = rotate through that many on hover
                    The MODAL always shows ALL images.

   Tape images are configured globally in index.html (window.TAPE_IMAGES).
   Each card automatically gets one of them randomly assigned (deterministic
   per project id, so it doesn't reshuffle on refresh).
   ========================================================================== */

window.PROJECTS = [
    {
      id: "cartesia",
      title: "Business Operations @ Cartesia",
      tags: ["operating", "storytelling", "building"],
      company: "Cartesia is an applied research lab building voice AI, including the world's fastest text-to-speech model.",
      role: "Tackled hard problems across business functions. Owned product, customer, and partner marketing.",
      details: [
        "Built and scaled 0→1 outbound engine, generating 6-figures in closed deals ($500K+ pipeline) through 32 targeted email campaigns; led 5-person growth standups and retros, sole owner on OKR tracker",
        "Owned customer and partner marketing: launched 8 case studies (10K+ views) and first customer video, led co-marketing with Cerebras, Intercom, Together AI, Google Cloud, Notion, and Anthropic",
        "Optimized lifecycle marketing: rewrote onboarding and enterprise flows driving 100K+ opens"
      ],
      meta: {
        Dates: "2025-Present",
        Location: "San Francisco, CA"
      },
      images: [
        "assets/cards/c1.gif",
        "assets/cards/c2.gif",
        "assets/cards/c3.png",
        "assets/cards/c4.png",
        "assets/cards/c5.png",
        "assets/cards/c6.png",
        "assets/cards/c7.png",
        "assets/cards/c8.png",
        "assets/cards/c9.gif"
      ],
      captions: [
        "Owned partner marketing including with Google Cloud, Together AI, Intercom, Notion, and Anthropic",
        "Ran product marketing for agents product, including end-to-end demo video (clip shown)",
        "(Continued) Competitive intelligence and sales enablement including 20-page deep-dives, battlecards, and market map",
        "Owned customer marketing, launched 8 case studies with 10K+ views",
        "(Continued)",
        "Wrote social copy for launches and new content, with 80K+ social impressions",
        "Redesigned product onboarding emails and enterprise flows (lifecycle marketing) driving 100K+ opens",
        "Designed and built 0 -> 1 outbound engine generating 6-figures in closed deals ($500K+ pipeline)",
        "Directed and edited first-ever video customer story"
      ],
      imageDurations: [
        null,
        5200,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 9
    },

    {
      id: "back-the-team",
      title: "Co-Founder @ Back The Team",
      tags: ["building", "operating"],
      company: "Back The Team is a mentorship platform connecting young athletes with Olympic athletes for holistic mindset training. (Imagine a huge groupchat – with private Olympian videos and daily challenges.",
      role: "Founder mode = doing whatever it takes for the business. Sales, marketing, finance, bizdev, design, and athlete management.",
      details: [
        "Signed 7 Olympic athletes in 6 weeks, generating 5-figures revenue",
        "Attracted partnership interest from the U.S. Ski & Snowboard Team and Phillips Exeter Academy",
        "Invited to present to the New England Prep School Athletic Council executive board meeting",
        "Incubated at the Harvard Innovation Labs"
      ],
      meta: {
        Dates: "2025",
        Location: "Boston, MA"
      },
      images: [
        "assets/cards/b1.png",
        "assets/cards/b2.png",
        "assets/cards/b3.png"
      ],
      captions: [
        "Our first two Olympians: Nick Page and Priscilla Loomis",
        "Testimonial from coach: I played D1 football and there was nothing like this when I was coming up. [...] It's really special. Thank you so much for what you're doing.",
        "Gamified point system for engagement; first iteration included a free trip for the winner to meet and train with their Olympic coach"
      ],
      imageDurations: [
        null,
        null,
        null
      ],
      displayCount: 2
    },

    {
      id: "unops",
      title: "Strategic Initiatives @ UNOPS",
      tags: ["operating", "building"],
      company: "The StopTB Partnership is a global health branch of the United Nations Office for Project Services, established to eliminate tuberculosis.",
      role: "Worked on the External Affairs & Strategic Initiatives team, primarily rebuilding the public-facing website.",
      details: [
        "Managed $2M in grants on team of 4",
        "Spearheaded website redesign and rebuilt 13 pages on new platform",
        "Restructured Product Innovation Scan with 450+ entries",
        "Developed 50-slide health landscape analysis"
      ],
      meta: {
        Dates: "Summer 2024",
        Location: "Geneva, Switzerland"
      },
      images: [
        "assets/cards/u1.png",
        "assets/cards/u2.png",
        "assets/cards/u3.png",
        "assets/cards/u4.png"
      ],
      captions: [
        "Product Innovation Scan",
        "",
        "Redesigned website",
        "Website building timeline and updated innovation scan entries"
      ],
      imageDurations: [
        null,
        null,
        null,
        null
      ],
      displayCount: 2
    },

    {
      id: "mit-media-lab-clover",
      title: "Design and Research @ MIT Media Lab",
      tags: ["designing", "building"],
      company: "The MIT Media Lab's Center for Constructive Communication (prev. Lab for Social Machines) designs systems for collective listening.",
      role: "Worked over 2 years (including gap year) on research and design for Clover, a new pro-social media platform for teens.",
      details: [
        "4th hire for team",
        "Conducted user research, expert interviews, and 3 design workshops",
        "Produced high-fidelity mockups and videos presented to the Emerson Collective",
        "Worked closely with former IDEO designers through 4 series of iteration"
      ],
      meta: {
        Dates: "2020-2022",
        Location: "Cambridge, MA"
      },
      images: [
        "assets/cards/m1.png",
        "assets/cards/m2.png",
        "assets/cards/m3.png"
      ],
      captions: [
        "",
        "",
        ""
      ],
      imageDurations: [
        null,
        null,
        null
      ],
      displayCount: 1
    },

    {
      id: "wdl",
      title: "Product Management @ World Data Lab",
      tags: ["operating"],
      company: "The World Data Lab creates data visualizations and projections for the Sustainable Development Goals, co-founded by the World Bank Chief Economist.",
      role: "Product management intern on three projects, interfacing between data science team and public and private sector clients.",
      details: [
        "Managed projects for clients including Mastercard Foundation, International Labor Organization, and L’Oreal",
        "Scoped and filtered World Bank datasets for 160 countries",
        "Co-authored article for Brookings Institute"
      ],
      meta: {
        Dates: "Summer 2023",
        Location: "Vienna, Austria"
      },
      images: [
        "assets/cards/l1.png",
        "assets/cards/l2.png",
        "assets/cards/l3.png",
        "assets/cards/l4.png",
        "assets/cards/l5.png"
      ],
      captions: [
        "",
        "",
        "",
        "Independent data scoping for indicator catalogue",
        ""
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 3
    },

    {
      id: "inlet",
      title: "Founder @ Inlet",
      tags: ["building", "designing"],
      company: "Inlet was a web app for creating multimedia moodboards with music, art, and writing. Active for 2 years.",
      role: "Independently built web app and recruited team to support design and marketing.",
      details: [
        "Reached 200 beta users for lil' web app with our team of 7 volunteers",
        "Awarded grants from 10KEntrepreneurs, LookUp Foundation, and Harvard Innovation Labs"
      ],
      meta: {
        Dates: "",
        Location: ""
      },
      images: [
        "assets/cards/i1.gif",
        "assets/cards/i2.png",
        "assets/cards/i3.png",
        "assets/cards/i4.gif",
        "assets/cards/i5.png",
        "assets/cards/i6.png"
      ],
      captions: [
        "",
        "Homepage",
        "Example boards created by community",
        "Demo of board-building functionality (clip)",
        "",
        "Socials and design"
      ],
      imageDurations: [
        20000,
        null,
        null,
        5000,
        null,
        null
      ],
      displayCount: 6
    },

    {
      id: "foothill-ventures",
      title: "Venture Associate Intern @ Foothill Ventures",
      tags: ["storytelling", "building"],
      company: "Foothill Ventures invests in frontier technology, with a focus on early-stage investments in AI and infrastructure.",
      role: "Gap year working as first-ever venture associate intern.",
      details: [
        "Created “Founder’s Lessons” content strategy with 23 founder interviewsand 7 summary articles",
        "Reached 25K+ reads and 50K+ minutes read",
        "Built portfolio intern-matching program with 10+ hires"
      ],
      meta: {
        Dates: "2020-2021",
        Location: "Los Altos, CA"
      },
      images: [
        "assets/cards/v1.png",
        "assets/cards/v2.png",
        "assets/cards/v3.png",
        "assets/cards/v4.png",
        "assets/cards/v5.png"
      ],
      captions: [
        "",
        "Created and edited original video content from interviews",
        "Designed and executed successful content strategy, continued by 3 later interns",
        "Built and marketed sustainable internship-matching program with 300+ applications in 2 weeks",
        "Content strategy contributed to LinkedIn following growing 5x"
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 4
    },

    {
      id: "impactive",
      title: "Operations Intern @ Impactive",
      tags: ["operating", "building"],
      company: "Impactive (YC17, acquired by ActBlue) is a digital organizing platform with 1,000+ clients.",
      role: "Reported to COO, primarily focused on GTM research.",
      details: [
        "Delivered new pricing strategy, in-depth competitive analysis, database, and market map of 57 competitor models"
      ],
      meta: {
        Dates: "Summer 2022",
        Location: "Remote"
      },
      images: [
        "assets/cards/p1.png",
        "assets/cards/p2.png"
      ],
      captions: [
        "",
        "Market map of 57 competitor features and models, with accompanying database"
      ],
      imageDurations: [
        null,
        null
      ],
      displayCount: 2
    },

    {
      id: "allgirlithm",
      title: "Co-Founder @ Allgirlithm",
      tags: ["storytelling"],
      company: "Allgirlithm was a blog founded in 2017, one of the first global AI blogs targeting women and girls.",
      role: "Co-founded nonprofit after attending summer camp at the Stanford AI Lab with Dr. Fei-Fei Li.",
      details: [
        "Reached 70K+ views and 20K+ visitors",
        "Co-developed open-source AI club curriculum with 72 chapters in 9 countries",
        "Led 14 blog writers and partnerships with 16 organizations."
      ],
      meta: {
        Dates: "2017-2020",
        Location: "Global"
      },
      images: [
        "assets/cards/a1.png",
        "assets/cards/a2.png",
        "assets/cards/a3.png",
        "assets/cards/a4.png",
        "assets/cards/a5.png"
      ],
      captions: [
        "",
        "Blogged about AI applications in field like medicine, fashion, chess, and art",
        "Resources, open-sourced 10-week AI Club curriculum, and grants",
        "",
        "Taught 150+ students through local workshops in Utah including with Boys & Girls Club and Girl Scouts of Utah"
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 2
    },

    {
      id: "creative-writing-community",
      title: "Writing Community",
      tags: ["storytelling", "connecting"],
      company: "Built communities of writers in SF, Boston, and Utah.",
      role: "Co-host weekly writing group. Previously president of the Harvard Creative Writing Collective and founded high school literary magazine.",
      details: [
        "2nd president of student organization building the first open, inclusive creative writing group on campus",
        "Led board of 5 to plan, market, and host 14 events a year (peer-editing workshops, open mics, guest readings). Grew mailing list 144%.",
        "Built partnerships with Organizers for Climate Action, Black Arts Collective, Hutchins Center, Harvard English Department",
        "Creative writing teacher, 100+ hours of classes reaching 250+ diverse students. Built website with accessible writing resources reaching 2K+ views"
      ],
      meta: {
        Dates: "2022-Present",
        Location: "Various"
      },
      images: [
        "assets/cards/w1.png",
        "assets/cards/w2.png",
        "assets/cards/w3.png",
        "assets/cards/w4.png",
        "assets/cards/w5.png"
      ],
      captions: [
        "",
        "",
        "",
        "",
        ""
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 3
    },

    {
      id: "franklin",
      title: "Leader @ Franklin Fellowship",
      tags: ["connecting"],
      company: "The Franklin Fellowship is a dinner group for values-based reflection and dialogue, bringing together 12 strangers to talk and break bread.",
      role: "Dinner member, leader, and co-president over four years.",
      details: [
        "Grew largest and most diverse cohort with 56 members from 19 states and 10 countries",
        "Dinner guests included Grammy-award winning musicians, physicists, lawyers, and former Harvard president Drew Faust"
      ],
      meta: {
        Dates: "2021-2025",
        Location: "Cambridge, MA"
      },
      images: [
        "assets/cards/f1.png",
        "assets/cards/f2.png",
        "assets/cards/f3.png",
        "assets/cards/f4.png",
        "assets/cards/f5.png"
      ],
      captions: [
        "",
        "",
        "",
        "",
        ""
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 5
    },

    {
      id: "writing",
      title: "Writing Publications & Exhibitions",
      tags: ["storytelling"],
      company: "Selected features from 10 years learning the craft of creative writing.",
      role: "My writing is heavily research-based - featured pieces included research on climate science, artist biographies, immigration history, computer science history, and current news.",
      details: [
        "Published by Academy of American Poets, New York Times, and Pulitzer Center",
        "Exhibited at the United Nations Headquarters and Nora Eccles Harrison Museum of Art",
        "Readings at the Smithsonian Museum, Library of Congress, and Texas Book Festival",
        "Awarded Academy of American Poets Prize, Lloyd McKim Garrison Prize, and Edward Eager Memorial Prize",
        "Studied over three years with former U.S. Poet Laureate Tracy K. Smith and with MacArthur Fellow Jorie Graham"
      ],
      meta: {
        Dates: "2017-Present",
        Location: "Various"
      },
      images: [
        "assets/cards/r1.png",
        "assets/cards/r2.png",
        "assets/cards/r3.png",
        "assets/cards/r4.png"
      ],
      captions: [
        "",
        "",
        "",
        ""
      ],
      imageDurations: [
        null,
        null,
        null,
        null
      ],
      displayCount: 4
    },

    {
      id: "typewriter-poems",
      title: "Typewriter Poems @ Signet Society",
      tags: ["storytelling"],
      company: "The Signet Society is an arts and letters society founded in 1870.",
      role: "Elected member, hosted variety of poetry readings and open mics and also wrote typewriter poems for people!",
      details: [
        ""
      ],
      meta: {
        Dates: "2022-2025",
        Location: "Cambridge, MA"
      },
      images: [
        "assets/cards/t1.png",
        "assets/cards/t2.png",
        "assets/cards/t3.png"
      ],
      captions: [
        "",
        "",
        ""
      ],
      imageDurations: [
        null,
        null,
        null
      ],
      displayCount: 3
    },

    {
      id: "field-of-water",
      title: "Field of Water @ Honors Thesis",
      tags: ["storytelling"],
      company: "Senior thesis for honors English degree, an 80-page original poetry collection titled Field of Water.",
      role: "Advised by Professor Josh Bell.",
      details: [
        "Awarded summa cum laude with highest honors",
        "Traveled to 8 locations along the Yangtze River in China (over 1,000 miles) conducting research and ethnography",
        "Keystone poems written using language from oral histories prior to the construction of the Three Gorges Dam in 1994",
        "Received Artist Development Fellowship to support travel"
      ],
      meta: {
        Dates: "2024-2025",
        Location: "Yangtze Basin, China"
      },
      images: [
        "assets/cards/fw1.png",
        "assets/cards/fw2.png",
        "assets/cards/fw3.png"
      ],
      captions: [
        "",
        "",
        ""
      ],
      imageDurations: [
        null,
        null,
        null
      ],
      displayCount: 3
    },

    {
      id: "mit-tech-review",
      title: "MIT Tech Review",
      tags: ["storytelling"],
      company: "The MIT Tech Review is one of the world's leading science and technology magazines.",
      role: "Published in print and online editions of magazine as cover story.",
      details: [
        "Winner of youth essay contest out of entries from 28 countries",
        "Shared on social media outlets with 3M+ followers"
      ],
      meta: {
        Dates: "2020",
        Location: "Print and digital"
      },
      images: [
        "assets/cards/mtr1.png",
        "assets/cards/mtr2.png"
      ],
      captions: [
        "",
        ""
      ],
      imageDurations: [
        null,
        null
      ],
      displayCount: 2
    },

    {
      id: "conflux",
      title: "Conflux Collective",
      tags: ["storytelling", "designing"],
      company: "The Conflux Collective is an interdisciplinary art-tech organization exploring new media and experimental arts.",
      role: "Featured artist and designer in Liminal Interfaces exhibition.",
      details: [
        "Commissioned to write poem displayed at the Harvard Science and Engineering Complex",
        "Exhibition note: 'This poem was written to display in the rafters of the exhibit, thus bringing to light how the passageway is a liminal space which would otherwise go unnoticed. The lines draw from images in the residents' projects to describe how liminal spaces are associated with transition, memory, and the in-between flux of familiar and unfamiliar—which creates a strange sense of recognition and return.'"
      ],
      meta: {
        Dates: "2023",
        Location: "Allston, MA"
      },
      images: [
        "assets/cards/x1.png",
        "assets/cards/x2.png"
      ],
      captions: [
        "",
        ""
      ],
      imageDurations: [
        null,
        null
      ],
      displayCount: 2
    },

    {
      id: "nspp",
      title: "National Student Poet of the West",
      tags: ["storytelling", "connecting"],
      company: "The National Student Poets Program is the nation's highest honor for youth poets, established by the President’s Committee on the Arts and Humanities",
      role: "Served as National Student Poet of the West, literary ambassador to 11 Western states",
      details: [
        "One of 5 chosen from 24,000 submissions by jury including 2 former U.S. Poet Laureates",
        "Invited to White House, initiation reading at the Smithsonian Museum of the American Indian and the Library of Congress"
      ],
      meta: {
        Dates: "2019-2020",
        Location: "Washington, D.C."
      },
      images: [
        "assets/cards/s1.png",
        "assets/cards/s2.png",
        "assets/cards/s3.png",
        "assets/cards/s4.png",
        "assets/cards/s5.png"
      ],
      captions: [
        "",
        "",
        "Mitt Romney sent me a letter",
        "",
        "Conducted dozens of free in-person and virtual poetry workshops for kids"
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 4
    },

    {
      id: "zines",
      title: "Zine x Nature",
      tags: ["storytelling", "designing", "connecting"],
      company: "Zine x Nature is a media project instructing community-members on how to create physical zines as place-making and tools of attention. Supported by the GripTape Challenge.",
      role: "Created project concept, dozens of zines, and zine website.",
      meta: {
        Dates: "2019-Present",
        Location: "Logan, UT"
      },
      images: [
        "assets/cards/z1.png",
        "assets/cards/z2.png",
        "assets/cards/z3.png",
        "assets/cards/z4.png",
        "assets/cards/z5.png"
      ],
      captions: [
        "",
        "",
        "",
        "",
        "Handmade zine instructions at https://zinexnature.weebly.com/make-your-own.html"
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 5
    },

    {
      id: "arts-first",
      title: "Arts First Student Producer",
      tags: ["operating", "connecting"],
      company: "Arts First is one of the largest collegiate art festivals in the country.",
      role: "Student producer for 3 years, managing full-day performance stage including staff and logistics.",
      details: [
        "Coordinated logistics for 24 arts groups with 80+ performers, managing staff and volunteers for indoor and outdoor stages",
        "Managed print and digital marketing to 10,000 people.",
        "Speaker at Harvard Arts Medal Ceremony and Dean's Cabinet"
      ],
      meta: {
        Dates: "2021-2024",
        Location: "Cambridge, MA"
      },
      images: [
        "assets/cards/af1.png",
        "assets/cards/af2.png"
      ],
      captions: [
        "",
        ""
      ],
      imageDurations: [
        null,
        null
      ],
      displayCount: 2
    },

    {
      id: "drawing",
      title: "Drawing @ Harvard",
      tags: ["designing"],
      company: "Studied with Katarina Burin of the Harvard Art Film & Visual Studies Department.",
      role: "Learned to see (and to draw) through a semester of 4-hour studio workshops.",
      details: [
        "Final project was a series of drawings made from photographs of drowned buildings"
      ],
      meta: {
        Dates: "Spring 2025",
        Location: "Cambridge, MA"
      },
      images: [
        "assets/cards/d1.png",
        "assets/cards/d2.png",
        "assets/cards/d3.png"
      ],
      captions: [
        "",
        "",
        ""
      ],
      imageDurations: [
        null,
        null,
        null
      ],
      displayCount: 3
    },

    {
      id: "outtakes",
      title: "Outtakes!",
      tags: ["connecting"],
      company: "",
      role: "",
      meta: {
        Dates: "2021-Present",
        Location: "Around the world"
      },
      images: [
        "assets/cards/outtakes/1.JPG",
        "assets/cards/outtakes/2.jpg",
        "assets/cards/outtakes/3.JPG",
        "assets/cards/outtakes/4.JPG",
        "assets/cards/outtakes/5.JPG",
        "assets/cards/outtakes/6.JPG",
        "assets/cards/outtakes/7.JPG",
        "assets/cards/outtakes/8.JPG",
        "assets/cards/outtakes/9.JPG",
        "assets/cards/outtakes/10.JPG",
        "assets/cards/outtakes/11.JPG",
        "assets/cards/outtakes/12.JPG",
        "assets/cards/outtakes/13.jpg"
      ],
      captions: [
        "Day in the life ... studying for oral exams as an English major",
        "Malala speaking at the Women Deliver conference in Kigali, Rwanda",
        "House run by Ursuline nuns, where I lived for a summer working at the UN in Geneva",
        "Visiting the Hagia Sophia in Istanbul with college students from Boğaziçi University",
        "Learned bad latte art as a barista for 2 years at the campus café",
        "Where my grandparents grew up near Huangshan in Anhui Province, visiting as part of my thesis research",
        "Summer camp where I taught coding and language arts in Oita, Japan",
        "Working at an off-the-grid farm (and living in this crawl space house) on the Big Island",
        "Modern dance...to Satellite by Harry Styles. Also did traditional Chinese fan dance and water sleeve dance",
        "Meeting an old guy who gave me alpenroses when I stayed at a mountain hut in Chamonix, France",
        "Seeing the most people ever and getting the most mosquito bites ever in Mumbai, India",
        "Watching A Midsummer Night's Dream at Shakespeare's Globe Theatre in London",
        "Whipping out the specialized thesaurus (arranged by idea/concept, not alphabetical!) in the dining hall"
      ],
      imageDurations: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      displayCount: 13
    }
];

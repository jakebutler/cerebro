import { internalMutation } from "./_generated/server";

// Import the seed data
const seedData = [
  {
    "name": "John Zeratsky",
    "skills": "Design sprints, productivity, PM workflows",
    "bio": "Co-author of *Sprint*; former GV design partner & PM; writes on product methods, workflow, and remote kits.",
    "website": "https://johnzeratsky.com",
    "blogs": [
      "https://johnzeratsky.com/blog",
      "https://medium.com/@jzeratsky"
    ],
    "twitter": "https://x.com/jzeratsky",
    "linkedin": null,
    "other_social": [],
    "podcast": null,
    "needs_verification": ["linkedin"]
  },
  {
    "name": "Shreyas Doshi",
    "skills": "Product leadership, frameworks, strategy",
    "bio": "Former PM leader at Stripe, Twitter, Google, Yahoo; known for deep insights on product execution and mental models. Writes and speaks extensively on Twitter and his personal blog.",
    "website": "https://shreyasdoshi.com/",
    "blogs": [
      "https://shreyasdoshi.com/writing/"
    ],
    "twitter": "https://x.com/shreyas",
    "linkedin": "https://www.linkedin.com/in/shreyasdoshi/",
    "other_social": [],
    "podcast": null,
    "needs_verification": []
  },
  {
    "name": "Claire Vo",
    "skills": "AI product strategy, growth, experimentation",
    "bio": "Former CPO at Optimizely, founder of Experiment Zone, currently building AI products. She hosts the *How I AI* podcast, exploring the intersection of AI and product.",
    "website": "https://clairevo.com/",
    "blogs": [
      "https://clairevo.com/blog",
      "https://medium.com/@clairevo"
    ],
    "twitter": "https://x.com/clairevo",
    "linkedin": "https://www.linkedin.com/in/clairevo/",
    "other_social": [],
    "podcast": "https://www.howiai.fm/",
    "needs_verification": ["website"]
  },
  {
    "name": "Gibson Biddle",
    "skills": "Product strategy, vision, consumer experience",
    "bio": "Former VP Product at Netflix. Teaches product leadership and innovation. Writes extensively on Medium and speaks globally.",
    "website": "https://gibsonbiddle.com/",
    "blogs": [
      "https://gibsonbiddle.medium.com/",
      "https://gibsonbiddle.com/newsletter"
    ],
    "twitter": "https://x.com/gibsonbiddle",
    "linkedin": "https://www.linkedin.com/in/gibsonbiddle/",
    "other_social": [],
    "podcast": "https://www.productdecoded.com",
    "needs_verification": []
  },
  {
    "name": "Lenny Rachitsky",
    "skills": "Product strategy, growth, consumer SaaS",
    "bio": "Former PM at Airbnb; author of the popular Lenny's Newsletter and host of Lenny's Podcast, covering product, growth, and career advice. Widely followed for actionable insights on product management and startups.",
    "website": "https://www.lennysnewsletter.com",
    "blogs": [
      "https://www.lennysnewsletter.com/"
    ],
    "twitter": "https://x.com/lennysan",
    "linkedin": "https://www.linkedin.com/in/lennyrachitsky/",
    "other_social": [],
    "podcast": "https://www.lennysnewsletter.com/podcast",
    "needs_verification": []
  },
  {
    "name": "Brian Chesky",
    "skills": "Design-led product leadership, brand, user empathy",
    "bio": "CEO and co-founder of Airbnb. Known for applying design principles to leadership and product vision. Writes about company-building and culture.",
    "website": "https://brianchesky.medium.com",
    "blogs": [
      "https://medium.com/@bchesky"
    ],
    "twitter": "https://x.com/bchesky",
    "linkedin": "https://www.linkedin.com/in/brianchesky/",
    "other_social": [],
    "podcast": null,
    "needs_verification": []
  },
  {
    "name": "Marty Cagan",
    "skills": "Product discovery, org design, product culture",
    "bio": "Partner at SVPG, author of *Inspired* and *Empowered*. Former executive at eBay, Netscape, and HP. Mentor to PM leaders globally and a foundational voice in modern product thinking.",
    "website": "https://svpg.com",
    "blogs": [
      "https://svpg.com/articles/"
    ],
    "twitter": "https://x.com/cagan",
    "linkedin": "https://www.linkedin.com/in/cagan/",
    "other_social": [],
    "podcast": null,
    "needs_verification": []
  },
  {
    "name": "Elena Verna",
    "skills": "PLG, growth, go-to-market, B2B SaaS",
    "bio": "Growth advisor (Dropbox, Miro, Notion), former CMO at SurveyMonkey. Writes about go-to-market and product-led growth strategy. Popular on LinkedIn for tactical growth advice.",
    "website": "https://elenaverna.com",
    "blogs": [
      "https://www.elenaverna.com/blog"
    ],
    "twitter": "https://x.com/ElenaVerna",
    "linkedin": "https://www.linkedin.com/in/elenaverna/",
    "other_social": [],
    "podcast": null,
    "needs_verification": []
  },
  {
    "name": "Andrew Chen",
    "skills": "Network effects, growth, consumer platforms",
    "bio": "General Partner at a16z. Previously led growth at Uber. Writes about startups and network effects on Substack and previously on his blog.",
    "website": "https://andrewchen.com",
    "blogs": [
      "https://andrewchen.com/",
      "https://andrewchen.substack.com/"
    ],
    "twitter": "https://x.com/andrewchen",
    "linkedin": "https://www.linkedin.com/in/andrewchen/",
    "other_social": [],
    "podcast": null,
    "needs_verification": []
  },
  {
    "name": "John Cutler",
    "skills": "Systems thinking, product teams, discovery",
    "bio": "Product Evangelist at Amplitude. Known for visual frameworks and deep takes on org design, product development, and outcomes. Highly active on Twitter and Medium.",
    "website": "https://cutle.fish",
    "blogs": [
      "https://cutlefish.substack.com/",
      "https://medium.com/@johnpcutler",
      "https://cutle.fish/blog",
      "https://johnpcutler.medium.com/"
    ],
    "twitter": "https://x.com/johncutlefish",
    "linkedin": "https://www.linkedin.com/in/johncutlefish/",
    "other_social": [],
    "podcast": null,
    "needs_verification": []
  },
  {
    "name": "Julie Zhuo",
    "skills": "Design, leadership, scaling product teams",
    "bio": "Former VP of Design at Facebook; co-founder of Sundial. Author of *The Making of a Manager* and thought leader on product, design, and leadership.",
    "website": "https://www.juliezhuo.com/",
    "blogs": ["https://www.juliezhuo.com/writing/"],
    "twitter": "https://x.com/joulee",
    "linkedin": "https://www.linkedin.com/in/juliezhuo/",
    "other_social": [],
    "podcast": null,
    "needs_verification": []
  }
];

export const seedDatabase = internalMutation({
  handler: async (ctx) => {
    // Clear existing data (optional)
    const existingLeaders = await ctx.db.query("pmLeaders").collect();
    for (const leader of existingLeaders) {
      await ctx.db.delete(leader._id);
    }
    
    // Insert seed data
    for (const leader of seedData) {
      await ctx.db.insert("pmLeaders", {
        ...leader,
        history: [] // Initialize with empty history
      });
    }
    
    return { success: true, count: seedData.length };
  },
});
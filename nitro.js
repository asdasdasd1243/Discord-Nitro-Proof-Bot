const Discord = require("discord.js"),
  client = new Discord.Client(),
  nodeHtmlToImage = require("node-html-to-image"),
  config = require("./config.json"),
  puppeteer = require("puppeteer"),
  express = require("express"),
  app = express();
var mime = require("mime"),
  fs = require("fs"),
  path = require("path");
const port = 3e3;
async function nitrogenerator(e, t) {
  let a = formatAMPM(new Date());
  let n = formatAMPM(new Date(Date.now() - 6e4)),
    o = await fs.readFileSync(`${__dirname}/testingboost.html`, "utf8");
  (datatosend = o),
    (datatosend = datatosend.replace(
      "FIRSTAUTHORURL",
      e.author.displayAvatarURL()
    )),
    (datatosend = datatosend.replace("THEFIRSTAUTHOR", e.author.username)),
    (datatosend = datatosend.replace(
      "SECONDAUTHORURL",
      client.users.cache.random().displayAvatarURL()
    )),
    (datatosend = datatosend.replace("THESECONDAUTHOR", t.shift())),
    (datatosend = datatosend.replace("RESPONSETONITRO", t.join(" "))),
    (datatosend = datatosend.replace("FIRSTAUTHORDATE", "Today at " + n)),
    (datatosend = datatosend.replace("SECONDAUTHORDATE", "Today at " + a)),
    app.get("/font", function(e, t) {
      const a = `${__dirname}/Whitneyfont.woff`;
      t.sendFile(a);
    }),
    app.get("/", function(e, t) {
      t.send(datatosend);
    });
  let r = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  const s = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }),
    i = await s.newPage();
  await i.goto(`http://localhost:${port}`),
    await i.waitForSelector(".scrollerInner-2YIMLh");
  const d = await i.$(".scrollerInner-2YIMLh");
  let c = await d.screenshot({ type: "png" });
  await s.close();
  const l = new Discord.MessageAttachment(c, "NitroProof.png");
  e.channel.send(`${e.author}`, l), r.close();
}
function formatAMPM(e) {
  var t = e.getHours(),
    a = e.getMinutes(),
    n = t >= 12 ? "PM" : "AM";
  return (t = (t %= 12) || 12) + ":" + (a = a < 10 ? "0" + a : a) + " " + n;
}
client.on("ready", () => {
  function randomStatus() {
    let status = [
      "Infinite Codes In Stock",
      "Generating Codes",
      "Stealing Emojis",
      "Invite Me:  >invite",
      "!! Snowwy#1337 Is My Dad"
    ]; // You can change it whatever you want.
    let rstatus = Math.floor(Math.random() * status.length);

    // client.user.setActivity(status[rstatus], {type: "WATCHING"});
    // You can change the "WATCHING" into STREAMING, LISTENING, and PLAYING.
    // Example: streaming

    client.user.setActivity(status[rstatus], {
      type: "PLAYING",
      url: "https://www.twitch.tv/snowwy2k"
    });
  }
  setInterval(randomStatus, 5000); // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.

  console.log("Online.");
});

  client.on("message", async e => {
    if ("dm" === e.channel.type) return;
    if (e.author.bot) return;
    if (0 !== e.content.indexOf(config.prefix)) return;
    const t = e.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    "boost" === t.shift().toLowerCase() && (await nitrogenerator(e, t));
  }),
  client.login(config.token);

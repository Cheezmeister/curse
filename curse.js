/*****************************************************************************
* Shakespearian Curse Generator -- Based on lists compiled by Jerry Maguire, *
*     English teacher at Center Grove High School in Greenwood, Indiana.     *
* Public domain implementations by Trevor Stone http://trevorstone.org/curse *
*****************************************************************************/
// Implementation in ECMAScript 6.  Run with nodejs or import and use.

"use strict";

const curse = function() {
// Encapsulates a list of words
class WordList {
  constructor(words, randomFn = Math.random) {
    this.words = words;
    this.randomFn = randomFn;
  }

  randomWord() {
    return this.words[Math.round(this.randomFn() * this.words.length)];
  }
}

// The next three objects contain the words to construct the curses
const adjective1 = new WordList(["artless", "bawdy", "beslubbering",
  "bootless", "brazen", "churlish", "cockered", "clouted", "craven",
  "currish", "dankish", "dissembling", "distempered", "droning", "errant",
  "fawning", "fitful", "fobbing", "froward", "frothy", "gleeking", "gnarling",
  "goatish", "gorbellied", "greasy", "grizzled", "haughty", "hideous",
  "impertinent", "infectious", "jaded", "jarring", "knavish", "lewd",
  "loggerheaded", "lumpish", "mammering", "mangled", "mewling", "paunchy",
  "peevish", "pernicious", "prating", "pribbling", "puking", "puny",
  "purpled", "quailing", "queasy", "rank", "reeky", "roguish", "roynish",
  "ruttish", "saucy", "sottish", "spleeny", "spongy", "surly", "tottering",
  "unmuzzled", "vacant", "vain", "venomed", "villainous", "waggish", "wanton",
  "warped", "wayward", "weedy", "wenching", "whoreson", "yeasty"]);

const adjective2 = new WordList(["base-court", "bat-fowling", "beef-witted",
  "beetle-headed", "boil-brained", "bunched-backed", "clapper-clawed",
  "clay-brained", "common-kissing", "crook-pated", "dismal-dreaming",
  "dizzy-eyed", "dog-hearted", "dread-bolted", "earth-vexing", "elf-skinned",
  "empty-hearted", "evil-eyed", "eye-offending", "fat-kidneyed", "fen-sucked",
  "flap-mouthed", "fly-bitten", "folly-fallen", "fool-born", "full-gorged",
  "guts-griping", "half-faced", "hasty-witted", "heavy-handed", "hedge-born",
  "hell-hated", "horn-mad", "idle-headed", "ill-breeding", "ill-composed",
  "ill-nurtured", "iron-witted", "knotty-pated", "lean-witted",
  "lily-livered", "mad-bread", "milk-livered", "motley-minded",
  "muddy-mettled", "onion-eyed", "pale-hearted", "paper-faced", "pinch-spotted",
  "plume-plucked", "pottle-deep", "pox-marked", "raw-boned", "reeling-ripe",
  "rough-hewn", "rude-growing", "rug-headed", "rump-fed", "shag-eared",
  "shard-borne", "sheep-biting", "shrill-gorged", "spur-galled", "sour-faced",
  "swag-bellied", "tardy-gaited", "tickle-brained", "toad-spotted",
  "unchin-snouted", "weak-hinged", "weather-bitten", "white-livered"]);

const noun = new WordList(["apple-john", "baggage", "barnacle", "bladder",
  "boar-pig", "bugbear", "bum-bailey", "canker-blossom", "clack-dish",
  "clotpole", "coxcomb", "codpiece", "crutch", "cutpurse", "death-token",
  "dewberry", "dogfish", "egg-shell", "flap-dragon", "flax-wench", "flirt-gill",
  "foot-licker", "fustilarian", "giglet", "gudgeon", "gull-catcher", "haggard",
  "harpy", "hedge-pig", "hempseed", "horn-beast", "hugger-mugger",
  "jack-a-nape", "jolthead", "lewdster", "lout", "maggot-pie", "malignancy",
  "malkin", "malt-worm", "mammet", "manikin", "measle", "minimus", "minnow",
  "miscreant", "moldwarp", "mumble-news", "nut-hook", "pantaloon", "pigeon-egg",
  "pignut", "puttock", "pumpion", "rabbit-sucker", "rampallion", "ratsbane",
  "remnant", "rudesby", "ruffian", "scantling", "scullion", "scut",
  "skainsmate", "snipe", "strumpet", "varlot", "vassal", "waterfly",
  "whey-face", "whipster", "wagtail", "younker"]);

class Curse {
  // Returns a random curse.
  curse() {
    let adj1 = adjective1.randomWord();
    let adj2 = adjective2.randomWord();
    let n = noun.randomWord();
    return `Thou ${adj1} ${adj2} ${n}!`;
  }

  // Yields a curse num times.
  *generateCurses(num) {
    for (let i = 0; i < num; ++i) {
      yield this.curse();
    }
  }
}

return new Curse();
}();

// Running under node.js?
if (process && process.argv) {
  function printCurses(curseCount) {
    for (let c of curse.generateCurses(curseCount)) {
      process.stdout.write(`${c}\n`);
    }
  }
  if (process.argv.length > 2) {
    const [interpreter, file, numberOfCurses] = process.argv;
    if (numberOfCurses == '-h') {
      let cmd = `${interpreter} ${file}`;
      console.log(`Usage: ${cmd} [-h] [numberOfCurses]`);
      process.exit(1);
    }
    printCurses(parseInt(numberOfCurses) || 0);
  } else {
    const readline = require('readline');
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    io.question('Number of curses: ', (num) => {
      printCurses(parseInt(num))
      io.close();
    });
  }
}

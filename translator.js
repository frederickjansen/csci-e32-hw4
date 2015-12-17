exports.zombify = function (english) {
  // Make sure we're dealing with strings
  var str = english.toString();

  /*
   * Rules:
   * lower-case "r" at the end of words replaced with "rh".
   * an "a" or "A" is replaced with "hra"
   * the starts of sentences are capitalized (the "start of a sentence" is any occurrence of ".!?", followed by a space, followed by a letter.)
   * "e" or "E" is replaced by "rr"
   * "i" or "I" is replaced by "rrRr"
   * "o" or "O" is replaced by "rrrRr"
   * "u" or "U" is replaced by "rrrrRr"
   * "r" or "R" is replaced by "RR"
   * "z" at end of word is replaced by "ZZZ"
   * "s" at end of word is replace by "SSS"
   *
   * Split into two capturing groups to differentiate between r and end of word and other letters r.
   */
  var letterReplacePass = str.replace(/(r\b)|(a|A|e|E|i|I|o|O|u|U|r|R|z\b|s\b)/g, function (match, p1, p2) {
    // Check first capturing group, r at end of string
    switch (p1) {
      case 'r':
        return 'rh';
    }

    // Check second capturing group, regular letter replace
    switch (p2) {
      case 'a':
        return 'hra';
      case 'A':
        return 'hra';
      case 'e':
        return 'rr';
      case 'E':
        return 'rr';
      case 'i':
        return 'rrRr';
      case 'I':
        return 'rrRr';
      case 'o':
        return 'rrrRr';
      case 'O':
        return 'rrrRr';
      case 'u':
        return 'rrrrRr';
      case 'U':
        return 'rrrrRr';
      case 'r':
        return 'RR';
      case 'R':
        return 'RR';
      case 'z':
        return 'ZZZ';
      case 's':
        return 'SSS';
    }

    // If we have a match but no replacement rule, just return the match
    return typeof p1 === 'undefined' ? p2 : p1;
  });

  // Detect first character of new sentence with lookahead, used for capitalization
  var capitalizationPass = letterReplacePass.replace(/(\.|\?|!)(=?\s\w)/g, function (match) {
    return match.substr(0, 2) + match.substr(-1, 1).toUpperCase();
  });

  return capitalizationPass;
};

exports.unzombify = function (zombie) {
  // Make sure we're dealing with strings
  var str = zombie.toString();

  // Detect first character of new sentence with lookahead, used for capitalization
  var capitalizationPass = str.replace(/(\.|\?|!)(=?\s\w)/g, function (match) {
    return match.substr(0, 2) + match.substr(-1, 1).toLowerCase();
  });

  /*
   * Do to the way the rules are defined, uppercase characters might be replaced with lowercase ones
   *
   * Rules:
   * lower-case "rh" at the end of words replaced with "r".
   * an "hra" is replaced with "a".
   * the starts of sentences are made lowercase (the "start of a sentence" is any occurrence of ".!?", followed by a space, followed by a letter.)
   * "rr" is replaced by "e"
   * "rrRr" is replaced by "i"
   * "rrrRr" is replaced by "o"
   * "rrrrRr" is replaced by "u"
   * "RR" is replaced by "r"
   * "ZZZ" at end of word is replaced by "z"
   * "SSS" at end of word is replaced by "s"
   *
   * Split into two capturing groups to differentiate between r and end of word and other letters r.
   */
  var letterReplacePass = capitalizationPass.replace(/(rh\b|hra|rrRr|rrrRr|rrrrRr|rr|RR|ZZZ\b|SSS\b)/g, function (match, p1) {
    switch (p1) {
      case 'rh':
        return 'r';
      case 'hra':
        return 'a';
      case 'rr':
        return 'e';
      case 'rrRr':
        return 'i';
      case 'rrrRr':
        return 'o';
      case 'rrrrRr':
        return 'u';
      case 'RR':
        return 'r';
      case 'ZZZ':
        return 'z';
      case 'SSS':
        return 's';
      default:
        return p1;
    }
  });

  return letterReplacePass;
};

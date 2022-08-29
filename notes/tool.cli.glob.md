---
id: set0v0z3ubgjaquzv8p9dcy
title: Glob
desc: ''
updated: 1661426783395
created: 1661425480612
---

## Definition: search pattern

>["Globs" are the patterns you type when you do stuff like ls *.js on the command line, or put build/* in a .gitignore file.](https://www.npmjs.com/package/glob#:~:text=%22Globs%22%20are%20the%20patterns%20you%20type%20when%20you%20do%20stuff%20like%20ls%20*.js%20on%20the%20command%20line%2C%20or%20put%20build/*%20in%20a%20.gitignore%20file.)

https://facelessuser.github.io/wcmatch/glob/

## History

## Use

- \* Matches 0 or more characters in a single path portion
- ? Matches 1 character
- [...] Matches a range of characters, similar to a RegExp range. If the first character of the range is ! or ^ then it matches any character not in the range.
- !(pattern|pattern|pattern) Matches anything that does not match any of the patterns provided.
- ?(pattern|pattern|pattern) Matches zero or one occurrence of the patterns provided.
- +(pattern|pattern|pattern) Matches one or more occurrences of the patterns provided.
- *(a|b|c) Matches zero or more occurrences of the patterns provided
- @(pattern|pat*|pat?erN) Matches exactly one of the patterns provided
- ** If a "globstar" is alone in a path portion, then it matches zero or more directories and subdirectories searching for matches. It does not crawl symlinked directories.

## Related

RegEx

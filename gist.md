# Gist on the RegEx for Matching an Email

Introductory paragraph (replace this with your text)

## Summary

In this gist I will go over this regex for matching an email, provided by EdX
```/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/```
I will go over each element of this regex by category and discuss how each of them work.


## Table of Contents

- [Anchors](#anchors)
- [Quantifiers](#quantifiers)
- [Grouping Constructs](#grouping-constructs)
- [Bracket Expressions](#bracket-expressions)
- [Character Classes](#character-classes)
- [Character Escapes](#character-escapes)
- [Walkthrough](#walkthrough)

## Regex Components

### Anchors
This regex has anchors for the beginning and end of the email address, noted by the ```^``` and ```$``` symbols. They describe that what is in the parentheses needs to be near the anchors needs to be at the start and end of the strings.

### Quantifiers
This regex has 1 quantifier, in the top-level domain section of the regex. Quantifiers signify the amount of times the string needs to match the associated pattern, in this case how many consecutive characters are alphaneumeric or a period. Quantifiers can be ```*``` for >=0, ```+``` for >=1, or ```?``` for 0-1 times, but for this regex we are using curly braces to assert that the pattern needs to match between 2 and 6 times for the regex to pass using the syntax ```{2,6}```.

### Grouping Constructs
There are 3 grouping constructs in this regex. Grouping constructs, represented by parentheses ```()```, are a way for regex writers to describe that certain pieces of text need to follow one format and the following pieces of text might follow another. For example, the first set of parentheses in this regex, ```^([a-z0-9_\.-]+)``` describes the format that the text that comes before the ```@``` in the email address.

### Bracket Expressions
This regex has 3 bracket notations in it. Bracket notations represent ranges of characters, like ```a-z``` or ```0-9```, that should be *included*. For example, the bracket next to the ```^``` anchor shows ```[a-z0-9_\.-]``` meaning that the start of the regex needs to be composed of alphaneumeric characters and underscores, periods, and dashes.

### Character Classes
Character classes are where a regex can define a set of characters to allow. While any set of characters to be allowed like ```[a-z0-9_\.-]```, can be called a character class, there are a few that are pre-built. In this regex, we use ```/d``` after the @ sign, meaning that we will look for any arabic neumeral digit.

### Character Escapes
Sometimes, you want to use regex to check for characters that might also be characters that regex uses for a function, like parentheses, brackets, curly braces, anchors, etc. When you need to tell the regex that this ```^``` is a ^ and not an anchor for the start of the regex, you preceed it with a forward slash, like this ```/^``` that forward slash is called the "escape character" to signals that the next character in the list is to be interpreted literally.

## Walkthrough
Let's start at the beginning with the first anchor, ```^```. The grouping construct next to the anchor contains ```[a-z0-9_\.-]+```, which has the escape character to include literally a period and also a ```+``` quantifier, showing that the first part of the address needs to be more than or equal to 1 character in length.

Next, we see the simple ```@```. This does what it says on the tin, the string must have an at symbol after a string of characters that satisfy the first condition.

After, we see another character class, ```[\da-z\.-]+``` which contains our first dedicated character class of ```\d```. This dedicated character class is equivalent to ```[0-9]```, making our entire class equivalent to ```[0-9a-z\.-]+```. Once again the ```+``` means we check for this format any number of times greater than 0.

Much like the @ we saw earlier, the ```\.``` we see is simply a period in the domain name denoting the end of the domain proper and the start of the top-level domain.

Finally, the ```$``` anchor denotes the end of the regex and the ```([a-z\.]{2,6})``` denoting that this section should be 2-6 characters that are either alphabetic or periods, allowing for multi-part top-level domains like .co.uk

## Author

I am a student at the MSU bootcamp for full stack web developers, my github is [danpatoneil](github.com/danpatoneil) and my email address is [danpatoneil@gmail.com](mailto:danpatoneil@gmail.com)

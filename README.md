# alif-toolkit

## Origin

When I made <a href="https://github.com/mapmeld/crossword-unicode">crossword-unicode</a>
 and <a href="https://github.com/mapmeld/wiki-crossword">wiki-crossword</a>
(which generates crossword puzzles from scraping random Wikipedia articles),
Arabic script posed some interesting challenges. I open sourced my work, but
it started me thinking about more general data and tools to make it easier to
build language games for Arabic-script languages.

Consider these game ideas:

- Crossword puzzles for younger students with names of animals
- Fill-in-the-blank where the neighboring letters should show connecting forms (for example "العَرَبِ_ة‎" vs "العَرَ بـ_ـة‎")
- A game where you add long vowels or tashkeel marks
- Games which show and hide tashkeel based on skill level
- Games which should support Arabic, Farsi, Urdu, and Pashto words

## Goals

- Open queryable word bank, based on Wikipedia and Wiktionary
- Multiple categories on words (animals / cities / countries)
- Shared word banks (visible to check for inappropriate words)
- Breakdowns of words into individual letters, glyphs (such as LA), text-shaped letters
- Tashkeel options
- English and Chinese translations

## Technology

MongoDB

## License

Content / data largely CC-BY-SA Wikipedia and Wiktionary

Code open sourced under an MIT license

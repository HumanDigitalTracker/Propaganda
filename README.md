English 

# Tracker Prototype

A prototype of a dashboard which is used to track Propaganda.

- React 16 based
- Ant Design
- MapboxGL
- PYthon / postgres backend

##What is it?

A user interface to allow analysts to record their findings regarding social media postings by terroist groups in the middle east.

The analysts can apply rich text (headings, italics lists etc) to the text.

In addition, the text editor supports a multitude of plugins that allow embedding data in the rich text. This opens up oportunities to allow the Analysts to define their own definitions, tooltips, add links to content etc.

These plugins are activated by various short cuts:

- `^` - add content
- `@R` - add region
- `@D` - add definiton
- `@G` - add (hard coded) graph

For example if `^` is pressed, a drop down list of 'content' - ie facebook posts, tweets etc is retreived from the database. 
The analyst selects one, and then the rich text contains a preview of that content.


## How does it work?

Currently is is a prototype that is far from fully functional. 

It uses a designer provided background file to give the illusion of a toolbar etc

There are 2 screens - an admin view, and a public facing dashboard view.

- http://localhost:3000/#/admin
- http://localhost:3000/#/dashboard/analysis

It uses tmux via the ````start.sh```` command to get the python server, proxy and dev server up and running.

To use it, you go the admin link, and enter a headline, followed by article text via the test editor (this page is very rough and ready)

USe the keyboard shortcuts above to enrich the text.

Then select a terrorist group category and click 'Create Article'.


Next, navigate to http://localhost:3000/#/dashboard/analysis

Here, a default group (ISIS) hads been selected. Changing groups is not supported.

You can click on each article, and read the text, along with the rich text additions.


##Technical notes

It currently uses a card based system to decide what articles to show. THe benefits of the approach are not really being seem at the moment but at least it keeps the number of apis low.

The benefits would be the ability to create a variety of cards and be able to share them. 

See https://medium.com/@grahambates/card-based-data-visualisation-7683d1c189ef for more details



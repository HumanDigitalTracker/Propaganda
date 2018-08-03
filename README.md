English 

# Tracker Prototype

A prototype of a dashboard which is used to track Propaganda/Extremlism.

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

Here, a default group (ISIS) hads been selected. *Changing groups is not supported.*

You can click on each article, and read the text, along with the rich text additions by clicking on the link text.


##Technical notes

It currently uses a card based system to decide what articles to show. THe benefits of the approach are not really being seem at the moment but at least it keeps the number of apis low.

The benefits would be the ability to create a variety of cards and be able to share them. 

See https://medium.com/@grahambates/card-based-data-visualisation-7683d1c189ef for more details



##How to get it to run?

#### install git and tmux

sudo apt-get install git tmux

#### get repo

````
git clone https://github.com/HumanDigitalTracker/Propaganda.git
````

####Get Python
        ```
        $ sudo apt-get install python-virtualenv
        $ sudo apt-get install python3-pip
        $ sudo apt-get install python3-setuptools
        $ sudo easy_install3 pip
        
        $cd Propaganda
        $ virtualenv -p python3 env
        
        $ source env/bin/activate
        $ cd api
        $ pip install -r requirements.txt
        ```

* #### Environment Variables (start.sh does this for you)
    ```
    export APP_SETTINGS="development"
    export DATABASE_URL="postgresql://postgres:postgres@localhost/tracker"
    ```
    
  ### To create the database
  
  sudo apt-get install postgresql postgresql-contrib
  
  
  sudo -u postgres psql
  From the resulting prompt:
  
  ALTER USER postgres PASSWORD 'postgres';
  CREATE DATABASE tracker;
   
  (control d to exit)
  
    
  ### Install Node
  
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  
  ### Install js requirements
  cd ..
  npm install
  

 #### Build database
 
     (Remember to be in the virtualenvironment and have set the environment variables)
     
       source env/bin/activate
       export APP_SETTINGS="development"
       export DATABASE_URL="postgresql://postgres:postgres@localhost/tracker"
         
 
    ```
    (env)$ python manage.py db init

    (env)$ python manage.py db migrate
    ```

    And finally, migrate your migrations to persist on the DB
    ```
    (env)$ python manage.py db upgrade
    ```


### Populate DB

- `psql -U postgres -d tracker -a -f api/sql/tracker_public_country.sql -h localhost`
-  `psql -U postgres -d tracker -a -f api/sql/tracker_public_user.sql -h localhost`
- `psql -U postgres -d tracker -a -f api/sql/tracker_public_userXCountry.sql -h localhost`
- `psql -U postgres -d tracker -a -f api/sql/tracker_public_content.sql -h localhost`


### edit database

psql -U postgres -d tracker -h localhost

SELECT * from cards 
````start.sh````

### tmux help

To use tmux, start it using start.sh

 - control b and then arrow keys to swap panes
 - control b and press d to get out of tmux panes (it is all still running)
 - tmux kill-server will stop all processes in all panes
 







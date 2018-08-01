        ```
        $ pip install virtualenv
        $ virtualenv -p python3 env
        $ pip install autoenv
        ```

* #### Environment Variables (start.sh does this for you)
    ```
    source env/bin/activate
    export APP_SETTINGS="development"
    export DATABASE_URL="postgresql://postgres:postgres@localhost/tracker"
    ```
    
  ### To create the database
  
  psql -U postgres -h localhost
  
  ````
  > create database tracker
  ````
  
 ### start the database server
 
 ````sudo service postgresql start````
  
 #### Install your requirements
 
     Remember to run source env/bin/activate before doing this
 
    ```
    (env)$ pip install -r requirements.txt
    ```

 #### Apply your Migrations
 
     Remember to run source env/bin/activate before doing this
 
    ```
    (env)$ python manage.py db init

    (env)$ python manage.py db migrate
    ```

    And finally, migrate your migrations to persist on the DB
    ```
    (env)$ python manage.py db upgrade
    ```

````start.sh````






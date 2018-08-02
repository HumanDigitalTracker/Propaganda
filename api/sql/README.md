

to restore 
````
cd sql
psql -U postgres -d thing -a -f tracker_public_country.sql -h localhost
psql -U postgres -d thing -a -f tracker_public_user.sql -h localhost
psql -U postgres -d thing -a -f tracker_public_userXCountry.sql -h localhost
psql -U postgres -d thing -a -f tracker_public_content.sql -h localhost
````

password of postgres 




````


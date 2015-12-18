# CSCI E-32 HW4
## API
### GET /zombify/:text
Translates text from English to Zombie.

Parameters:

* text (string, required): Text to translate. Max length is 1000 characters.

Response: JSON - {"message": "foo"}
### GET /unzombify/:text
Translates text from Zombie to English.

Parameters:

* text (string, required): Text to translate. Max length is 1000 characters.

Response: JSON - {"message": "foo"}
## Usage
Run `npm install`, then `npm start`. The server will run on port 7000.

### By Frederick Joossens

Run npm i to install dependencies.

Create a .env file containing the following variables:

    PORT: Specify the port number for the server.
    JWT_SECRET: Set the secret key for JWT token generation.
    DB_NAME: Provide the name of the database.
    DB_PASSWORD: Set the password for the database.


Assumptions:

    Only one assumption is taken throughout the project: Each player belongs to one of the predefined teams, defined by the team_id constant.

    It looks like this

            const team_id = {
                "India": 1,
                "Australia": 2,
                "South Africa": 5,
                "New Zealand": 4,
                "West Indies": 3,
                "Bangladesh": 6,
                "Pakistan": 7,
                "Afghanistan": 8,
                "Zimbabwe": 9,
                "Sri Lanka": 10,
                "EngLand": 11,
                "Netherland": 12,
                "Scotland": 13,
            };

        and every player belongs one of this {team: team_id}


Router Functionality:

    All routers are functional and provide the correct output as expected.


Important Note:

    While running the code, if any error regarding token validity occurs, ensure to check all routers without middleware to rectify the issue.
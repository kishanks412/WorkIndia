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

        and every player belongs to one of this {team: team_id}

        when your adding team member to a squad then take {team_id} from above reference


Router Functionality:

    All routers are functional and provide the correct output as expected.

Match Status Calculation

    The match status is calculated dynamically based on the match date and the current date. This functionality is implemented to provide users with real-time information about matches.

    Implementation
    
        The match status is determined using the following logic:

        Completed: If the match date is before the current date.
        Ongoing: If the match date is the same as the current date.
        Upcoming: If the match date is after the current date.

Important Note:

    While running the code, if any error regarding token validity occurs, ensure to check all routers without middleware to rectify the issue.
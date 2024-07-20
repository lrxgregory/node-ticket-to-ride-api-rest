const roadsScoringTicketToRideUSA = [
    {
        start: 'Vancouver',
        end: 'Calgary',
        score: 5,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Vancouver',
        end: 'Seattle',
        score: 1,
        wagonNumber: 1,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Seattle',
        end: 'Portland',
        score: 1,
        wagonNumber: 1,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Seattle',
        end: 'Calgary',
        score: 4,
        wagonNumber: 4,
        locomotive: 1,
        map: 'USA'
    },
    {
        start: 'Portland',
        end: 'San Francisco',
        score: 5,
        wagonNumber: 5,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Portland',
        end: 'Salt Lake City',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'San Francisco',
        end: 'Los Angeles',
        score: 4,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'San Francisco',
        end: 'Salt Lake City',
        score: 5,
        wagonNumber: 5,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Salt Lake City',
        end: 'Las Vegas',
        score: 3,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Salt Lake City',
        end: 'Denver',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Las Vegas',
        end: 'Los Angeles',
        score: 3,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Denver',
        end: 'Kansas City',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Denver',
        end: 'Oklahoma City',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Denver',
        end: 'Santa Fe',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Kansas City',
        end: 'Oklahoma City',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Kansas City',
        end: 'St. Louis',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Oklahoma City',
        end: 'Dallas',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Oklahoma City',
        end: 'Santa Fe',
        score: 3,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Dallas',
        end: 'Houston',
        score: 1,
        wagonNumber: 1,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Houston',
        end: 'New Orleans',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'New Orleans',
        end: 'Atlanta',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'New Orleans',
        end: 'Miami',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Atlanta',
        end: 'Miami',
        score: 5,
        wagonNumber: 5,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Atlanta',
        end: 'Raleigh',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Raleigh',
        end: 'Washington',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Raleigh',
        end: 'Charleston',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Charleston',
        end: 'Miami',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Washington',
        end: 'New York',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Washington',
        end: 'Pittsburgh',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'New York',
        end: 'Boston',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Pittsburgh',
        end: 'New York',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Pittsburgh',
        end: 'Chicago',
        score: 3,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Chicago',
        end: 'St. Louis',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Chicago',
        end: 'Omaha',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'St. Louis',
        end: 'Kansas City',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Omaha',
        end: 'Kansas City',
        score: 1,
        wagonNumber: 1,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Omaha',
        end: 'Duluth',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Duluth',
        end: 'Sault St. Marie',
        score: 5,
        wagonNumber: 5,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Duluth',
        end: 'Winnipeg',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Duluth',
        end: 'Helena',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Sault St. Marie',
        end: 'Montreal',
        score: 5,
        wagonNumber: 5,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Montreal',
        end: 'Boston',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Montreal',
        end: 'New York',
        score: 3,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'New York',
        end: 'Pittsburgh',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Pittsburgh',
        end: 'Toronto',
        score: 2,
        wagonNumber: 2,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Toronto',
        end: 'Montreal',
        score: 3,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Winnipeg',
        end: 'Sault St. Marie',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Winnipeg',
        end: 'Calgary',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Winnipeg',
        end: 'Duluth',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Winnipeg',
        end: 'Helena',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Helena',
        end: 'Salt Lake City',
        score: 3,
        wagonNumber: 3,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Helena',
        end: 'Denver',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Helena',
        end: 'Seattle',
        score: 6,
        wagonNumber: 6,
        locomotive: 0,
        map: 'USA'
    },
    {
        start: 'Helena',
        end: 'Calgary',
        score: 4,
        wagonNumber: 4,
        locomotive: 0,
        map: 'USA'
    }
];

module.exports = roadsScoringTicketToRideUSA;

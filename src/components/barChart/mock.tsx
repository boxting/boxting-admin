import React from 'react';
const dataJSON = [
  {
    "success": true,
    "data": {
        "election": {
            "id": "1",
            "name": "Test election"
        },
        "candidates": [
            {
                "electionId": "1",
                "firstName": "Rodrigo",
                "id": "1",
                "imageUrl": "none",
                "lastName": "Guadalupe",
                "type": "votable",
                "voteCount": 3
            },
            {
                "electionId": "1",
                "firstName": "Enzo",
                "id": "2",
                "imageUrl": "none",
                "lastName": "Lizama",
                "type": "votable",
                "voteCount": 2
            },
            {
                "electionId": "1",
                "firstName": "Juan",
                "id": "3",
                "imageUrl": "none",
                "lastName": "Castro",
                "type": "votable",
                "voteCount": 4
            },
            {
                "electionId": "1",
                "firstName": "nombre1",
                "id": "4",
                "imageUrl": "none",
                "lastName": "apellido1",
                "type": "votable",
                "voteCount": 1
            },
            {
                "electionId": "1",
                "firstName": "nombre2",
                "id": "5",
                "imageUrl": "none",
                "lastName": "apellido2",
                "type": "votable",
                "voteCount": 5
            },
        ],
        "totalVotes": 60
    }
  }
];

export default JSON.stringify(dataJSON[0]);


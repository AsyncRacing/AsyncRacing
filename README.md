# Async Racing

<!-- Add description of app here. -->

## Dev Setup

<!-- Introduce the step-by-step guide to set up and contribute to the project. -->

## Tech Stack

| Technology        | Usage                                |
| :---------------- | :----------------------------------- |
| GitHub            | Version Control; Collaboration Tools |
| TypeScript        | Frontend                             |
| JavaScript ESNext | Frontend                             |
| React.js          | Frontend                             |
| Jest              | Testing                              |
| Firebase          | Database                             |
| Google Analytics  | Analytics                            |
| Netlify           | Hosting; Continuous Integration      |
| MapBox            | Map API                              |

# Firebase Live DB Schema

```json
{
  "challenges": {
    "<challengeID>": {
      "course": {
        "start": [
          {
            "latitude": 0,
            "longitude": 0
          },
          {
            "latitude": 0,
            "longitude": 0
          }
        ],
        "finish": [
          {
            "latitude": 0,
            "longitude": 0
          },
          {
            "latitude": 0,
            "longitude": 0
          }
        ],
        "checkpoints": []
      },
      "tracks": {
        "<trackID>": {
          "creator": "",
          "title": "testTrack",
          "color": [0, 0, 255],
          "path": [
            {
              "latitude": 0,
              "longitude": 0,
              "time": "<JS Date>"
            }
          ]
        }
      },
      "metadata": {
        "creator": "Ben",
        "title": "Cool Challenge"
      }
    }
  }
}
```

# Contributors

- [Ben Simpson]
- [Ian Rones]
- [Nolan Kovacik]
- [Thomas Sarlandie]

[ben simpson]: #
[ian rones]: #
[nolan kovacik]: https://github.com/noltron000
[thomas sarlandie]: #

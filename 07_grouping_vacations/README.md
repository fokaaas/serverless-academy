# Grouping Vacations 👷

JSON transformation tool.

Run it:
```bash
node index.js
```

### Original object
```json
[
  {
    "_id":"6196a33a3a853300128602eb",
    "user":{
      "_id":"60b7c1f04df06a0011ef0e76",
      "name":"Laurence Knox"
    },
    "usedDays":3,
    "startDate":"2021-11-19",
    "endDate":"2021-11-23"
  },
  {
    "_id":"61a3c3bb3a85330012864b5b",
    "user":{
      "_id":"60b7c1f04df06a0011ef0e76",
      "name":"Laurence Knox"
    },
    "usedDays":2,
    "startDate":"2021-12-09",
    "endDate":"2021-12-10"
  },
  {
    "_id":"91a3c3bb3a85330012864b5b",
    "user":{
      "_id":"50b7c1f04df06a0011ef0e76",
      "name":"Robert Martin"
    },
    "usedDays":3,
    "startDate":"2021-07-09",
    "endDate":"2021-07-11"
  },
  {
    "_id":"71a3c3bb3a85330012864b5b",
    "user":{
      "_id":"10b7c1f04df06a0011ef0e76",
      "name":"Stanislav Basarab"
    },
    "usedDays":2,
    "startDate":"2021-07-08",
    "endDate":"2021-07-11"
  },
  {
    "_id":"91a3c3bb3a85330012864b5b",
    "user":{
      "_id":"50b7c1f04df06a0011ef0e76",
      "name":"Robert Martin"
    },
    "usedDays":2,
    "startDate":"2021-04-13",
    "endDate":"2021-04-14"
  }
]
```

### Result
```json
[
  {
    "userId": "60b7c1f04df06a0011ef0e76",
    "username": "Laurence Knox",
    "vacations": [
      {
        "startDate": "2021-11-19",
        "endDate": "2021-11-23"
      },
      {
        "startDate": "2021-12-09",
        "endDate": "2021-12-10"
      }
    ]
  },
  {
    "userId": "50b7c1f04df06a0011ef0e76",
    "username": "Robert Martin",
    "vacations": [
      {
        "startDate": "2021-07-09",
        "endDate": "2021-07-11"
      },
      {
        "startDate": "2021-04-13",
        "endDate": "2021-04-14"
      }
    ]
  },
  {
    "userId": "10b7c1f04df06a0011ef0e76",
    "username": "Stanislav Basarab",
    "vacations": [
      {
        "startDate": "2021-07-08",
        "endDate": "2021-07-11"
      }
    ]
  }
]
```
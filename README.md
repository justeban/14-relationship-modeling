![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 13: Single Resource Mongo and Express API
===

[![Build Status](https://travis-ci.com/justeban/13-object-relational-mapping.svg?branch=lab-justin)](https://travis-ci.com/justeban/13-object-relational-mapping)

* **Git Hub Repo:** [https://github.com/justeban/13-object-relational-mapping/tree/lab-justin](https://github.com/justeban/13-object-relational-mapping/tree/lab-justin)
* **Heroku App:** [https://mongo-server-lab-13.herokuapp.com/](https://mongo-server-lab-13.herokuapp.com/)
* **Travis Build:** [https://travis-ci.com/justeban/13-object-relational-mapping](https://travis-ci.com/justeban/13-object-relational-mapping)

# Overview
This is an app created to begin our dive into MongoDB and NoSQL databases. The api is created with RESTful endpoints that make queries to our MongoDB on Heroku.

# Configuration  

Make sure that your MONGODB_URI config var is set in Heroku. 

Necessary dependencies are downloaded. (*located in package.json*)

## Data Models

This API supports two data models so far: 

1. Guitars - ```{brand, model, price, strings}```
    ```
    brand: { type:String, uppercase:true, required:true },
    model: { type:String, uppercase:true, required:true},
    price: { type:Number, required:true},
    strings: {type:Number, default:6, enum:[4, 6, 12]}
    ``` 
2. Keyboards - ```{brand, model, price, keys}```
    ```
    brand: { type: String, uppercase: true, required: true },
    model: { type: String, uppercase: true, required: true },
    price: { type: Number, required: true },
    keys: { type: Number, required:true }
    ```

## Server Endpoints

**GET** `/api/v1/:model`

*  When used with either model, returns a JSON object that returns all guitars or keyboards. For Example: 
```
GET https://mongo-server-lab-13.herokuapp.com/api/v1/guitars

// returns

[
    {
        "strings": 6,
        "_id": "5b0f3ab7be1079fa146345e4",
        "brand": "GIBSON",
        "model": "LES PAUL",
        "price": 800,
        "__v": 0
    }, 
    
    ...
]
```

**POST** `/api/v1/:model`

* When used with either model, will post request to database and return what was posted. Request Body must match the model provided. 

```
POST https://mongo-server-lab-13.herokuapp.com/api/v1/guitars

req = {
  "brand": "Fender", 
  "model": "jazzmaster", 
  "price": 1999, 
  "strings": 6
}
```

**GET** `/api/v1/:model/:id`

* When used, will return data model entry that matches the id. 

```
GET https://mongo-server-lab-13.herokuapp.com/api/v1/keyboards/5b0fa39fe917c4015486d030

{
    "_id": "5b0fa39fe917c4015486d030",
    "brand": "NOVATION",
    "model": "LAUNCHKEY MINI MKII",
    "price": 79,
    "keys": 25,
    "__v": 0
}
```

**PUT** `/api/v1/:model/:id`

* When used, it will update the entry with the corresponding ID. Depending on the information given, the api will update the whole record or just one detail of a record.
```
PUT https://mongo-server-lab-13.herokuapp.com/api/v1/keyboards/5b0fa39fe917c4015486d030

req = {
    "brand": "NOVATION PlUS+"
}

or 

req = {
  "brand": "NOVATION PLUS+",
  "model": "LAUNCHKEY MK3",
  "price": 450,
  "keys": 88
}

both valid
```

**DELETE** `/api/v1/:model/:id`

* When used will delete entry corresponding with the id. 

```
DELETE https://mongo-server-lab-13.herokuapp.com/api/v1/guitar/5b0f3ab7be1079fa146345e4

// Guitar with id=5b0f3ab7be1079fa146345e4 deleted
```



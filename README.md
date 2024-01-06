# Referral System
A referral system for any link, similar to [bit.ly](https://bitly.com/) with simple and easy to use API.

This project uses [TypeScript](https://www.typescriptlang.org/). The database used is [SQLite](https://www.sqlite.org/index.html). [Express](https://expressjs.com/) is used as the web framework. [Sequelize](https://sequelize.org/) is used as the ORM.

## Features
- [x] Create a user account for referral management
- [x] Create a referral link linked to your username
- [x] See the number of clicks on your referral link

## Usage
The entire system is based on RESTful API, so you can use it in your own application.

- [Using the referal code](#using-the-referal-code)
- [Create a user account](#create-a-user-account)
- [Create a referral link](#create-a-referral-link)
- [Get the stats of a referral link](#get-the-stats-of-a-referral-link)


<a id="using-the-referal-code">

### Using the referal code
Pass the code as a parameter in the URL:
```bash
/:code
```
For example:
```bash
https://localhost/<code>
```
This will redirect you to the URL you specified when creating the referral link.


<a id="create-a-user-account">

### Create a user account
```bash
/POST /users/create
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| username | string | The username of the user |
| password | string | The password of the user |

```json
{
    "username": "user",
    "password": "pass"
}
```

#### Response
```json
{
    "status": "success",
    "message": "User created successfully"
}
```
In case the user already exists, the response will be:
```json
{
    "status": "error",
    "message": "User already exists"
}
```
Other errors occur if you forgot to add the parameters. The error messages are self-explanatory.

<a id="create-a-referral-link">

### Create a referral link
```bash
/POST /refer/create
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| username | string | The username of the user |
| redirect url | string | The URL to redirect to |

```json
{
    "username": "username",
    "redirect_url": "https://google.com"
}
```

#### Response
```json
{
    "status": "success",
    "message": "Referral link created successfully",
    "referral_link": "http://localhost:8080/r/username"
}
```
In case the user doesn't exist, the response will be:
```json
{
    "status": "error",
    "message": "User doesn't exist"
}
```
Other errors occur if the URL is invalid or you forgot to add the parameters. The error messages are self-explanatory.

<a id="get-the-stats-of-a-referral-link">

### Get the stats of a referral link
```bash
/GET /refer/stats
```
Parameters are passed in the URL:
| Name | Type | Description |
| ---- | ---- | ----------- |
code | string | The referral code |

Pass the code as a parameter in the URL:
```bash
/refer/stats?code=code
```

#### Response
```json
{
    "views": 100,
    "redirect_url": "https://google.com"
}
```

In case the referral link doesn't exist, the response will be:
```json
{
    "error": "Invalid referral code"
}
```

## Installation
Clone the repository:
```bash
git clone https://github.com/arnapchapagain/referral-system.git
```
cd to the directory:
```bash
cd referral-system
```

Install the dependencies:
```bash
npm install
```

This will install all the dependencies required for the project. Those are listed in the `package.json` file.

## Running the project
Create a `.env` file in the root directory and add the following:
```env
PORT=<port>
DB_PATH=<database-file-name>.sql
```

For example:
```env
PORT=3000
DB_PATH=database.sql
```

### Production
To run the project, run the following command:
```bash
npm start
```
This will start the server on port 8080. You can change the port in the `index.js` file.

### Development
To run the project in development mode, run the following command:
```bash
npm run dev
```
This will start the server on your `PORT` value using `nodemon`. This means that the server will restart automatically when you make changes to the code.

## Todo
- [ ] Track the number of UNIQUE clicks on your referral link
- [ ] More stats about the clicks (timestamp, location, IP, etc.)
- [ ] Admin panel to manage users and their links
# Wedding Guestbook

## Folder Structure
```bash
.
├── REAME.md
├── soalDua
│   ├── app.js
│   ├── bin
│   │   └── www
│   ├── config
│   │   └── database.js
│   ├── db.sqlite
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── auths.js
│   │   └── guests.js
│   └── views
│       ├── error.jade
│       ├── index.jade
│       └── layout.jade
└── soalSatu
    └── index.js
```

## Cara menjalankan program
1. Clone this repository.
2. Move directory to cloned one.
```bash
cd <directory-name>
```
3. Make sure you have npm install. By run this command.
```bash
npm version
``` 
4. Then move the directory to `soalDua`. Then simply run `npm install` to install all dependencies. Then to start the program, run `npm start`.

```bash
cd soalDua
```
```bash
npm install
```
```bash
npm start
```


## Soal tabel perkalian (Soal No.1)
- Pengerjaan soal no.1 dilakukan di folder [soalSatu](./soalSatu/).
- cara menjalankan file untuk jawaban no.1 adalah sebagai berikut.
  - jika anda sudah di folder soalSatu.
  ```bash
  node index.js
  ```
  - jika anda masih di root folder project.
  ```bash
  node soalSatu/index.js
  ```

## Fitur program
1. Guest form:
Header
```json
HTTP 1.0 POST /guests
```
Request Body
```json
{
	"name": "nawafil",
	"address": "Jaksel",
	"phone": "+6282249907755",
	"notes": "HWD"
}
```

Response Success
```json
{
	"message": "success",
	"data": {
		"name": "nawafil",
		"notes": "HWD",
		"id": 3
	}
}
```

Response Failed
```json
{
	"error": "No name specified"
}
```

2. Note Gallery
Header
```json
HTTP 1.0 GET /guests
```
Response Body
```json
{
	"message": "success",
	"data": [
		{
			"id": 1,
			"name": "Husnul",
			"notes": "Teman Dekat"
		},
		{
			"id": 2,
			"name": "Khansa",
			"notes": "Pacar Teman Dekat"
		},
		{
			"id": 3,
			"name": "nawafil",
			"notes": "HWD"
		}
	]
}
```

3. Autentikasi
Header
```json
HTTP 1.0 POST /auths/login
```

Request Body
```json
{
	"username": "admin1",
	"password": "qwerty123"
}
```

Response Failed
```json
{
	"error": "Either password or username is wrong."
}
```

Response Success
```json
{
	"message": "success",
	"data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMzY2OTcxOX0.2ZuBZ3VZsjM2-1UYPRsjmc12PgRyn6bTZELuVYM8mzE"
}
```

4. Admin

- Harusnya setelah fitur login dibuat, fitur admin bisa juga dibuat dengan implementasi middleware. Semua API yang hanya dikhususkan untuk admin akan perlu mengirimkan header khusus seperti `authorization` yang berisikan token(response dari endpoint login).


## Notes
- Script sql untuk dimasukkan langsung ke dalam codingan inisiasi database di file [/config/database.js](./soalDua/config/database.js). Tidak dipisah ke script sndiri menimbang waktu.

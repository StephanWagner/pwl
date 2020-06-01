# Vaulty

---

## Install

### Update database info

Create a database with charset `utf8mb4` and update config information in `.env` file.

### Migrate database

Run `php artisan migrate` to migrate initial tables.

```bash
php artisan migrate
```

### Build assets

This project uses gulp. See morer in section "Assets".

To build the CSS and JS files, run `npm install` and then `npm run build`.

```bash
npm install && npm run build
```

### Set master password

Open vaulty in a browser, you will be prompted to change the default password.

---

## Assets

This project uses Gulp. More info at https://gulpjs.com

Watch assets during development:

```bash
gulp watch
npm run watch
```

Build assest for production:

```bash
gulp build
npm run build
```

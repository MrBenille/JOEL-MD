const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUFIUEdHL2QzWERFWXJKMmowMG1jcjBBeGpkRVZaeXhINFowYUVKNm5XOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDJlWUdFZWFXa1ltZWROWUVqanZtbisvNGVOOXRhVXEvSERzUUsyWmttWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTlZMbDcySVlKTkhMZVNDcXlDVVY1NFBFS2RaYXJXN0ZPQTRDbHZEZzA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKcitQaWIzZDJPL3FLbXRaM3dFQU14eVk5cFN1dEFVY2RCT3hHZ3VWTVhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFKaVhpVG85YTY5empYM1NEc3NCeStmclh3eVNGZE5ZbTF1UVd4WnN3VU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImcxUW1LN3VLakxzbFRIQmVBMm9YSE5kT0o5cWJBTlROZzFUN1pZM3lLMDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUVOM002LzIxUStvVDBYRVZNQXllbS8vb3FYdS9MSWthR2ZaVzB3aWsxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTY0bTNnMWZBMlJTR25BWE1jNmtnS2FLcC90M0U5UHFISjZ5QlZDYTVUcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMOU96NHUwT1MvUkFKaWlqTkRiNzNJaE95VUl1b3UvdkpKUUwxaTFDZTc1ekhvbE1xM2JBdEtIcm0vOVZJYTVhOVhId1N6RHVYWTBjdUxISG9TUUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5IjoiZTFDTExpWXhwek1WNWJTSGdyM2ZjWXRvd2RkMmJ4YlVoYzcwTXQrN253UT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiM0N0NFJHbm5TcFNMN3YxMkNsUThlZyIsInBob25lSWQiOiI2YzY2NThkYS00OTFhLTRlYzctODhmZS1hNzA5OWE1YTMwNDEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjdwblY0b1lSQVR2OUxjYmptTFpsWHdPLzFjPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9ianZsWTBMbHpPbnhGaE5VMFR3WmRGeEh3az0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIyQkVMRVBKUiIsIm1lIjp7ImlkIjoiMjU0MTEyOTk1NTQ1OjU3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMbmZ1TWNHRU5qbHByWUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJENy9BR0tOcWc5N0pNQy9XQm04OStHK24ydk5LU0RtNlVWbEU4T0l0TVZvPSIsImFjY291bnRTaWduYXR1cmUiOiJvVkgxc0ZRV1BncnpUa2NCaVBvRXcwcHpzYjVBRHJmYnVxKzJaSUgvM3dLOXBzc21xeEp6d1VlREt3WStTVXB1b3M0UmFpcjNsclJjWkc2MENkVmNCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVno2SFVtUUNoWnI3SFpUY3Vqb2Q4RENCRnBIUTlaWTgwNWZrYWZ0KzNKSnZjZkUxc1BnSVRFWm05RlpaQ0QydnlyeXBlSzFNRWVicGpIallDdHhzQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMTI5OTU1NDU6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUSsvd0JpamFvUGV5VEF2MWdadlBmaHZwOXJ6U2tnNXVsRlpSUERpTFRGYSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDQ5NDU2NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOQm8ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Reagan",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254112995545",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Reagan',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7fad220f8082eaff5eb1d.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

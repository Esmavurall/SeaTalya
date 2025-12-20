const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true
}));
// BAĞLANTI BİLGİLERİ GÜNCELLENDİ (password: "", port: 3307)
const connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "", 
database: "esmaDB", 
port: 3306
});
console.log("Password gönderiliyor mu?:", connection.config.password ? "EVET" : "HAYIR");

connection.connect((err) => {
if (err) {
console.error("Veritabanı bağlantı hatası:", err);
} else {
console.log("Veritabanı bağlandı !");
}
});
app.get("/", (req, res) => {
res.send("Node js ile express sunucumuz çalıştı");
});
app.get("/about", (req, res) => {
res.send("About Datalarımız");
});
app.post("/submit-form", (req, res) => {
const { name, tel, per, date,cause,note } = req.body;
if (!name || !date || !tel ||!per || !cause || !note ) {
return res.status(400).send(" Zorunlu alanları dolduralım.");
}
const query = "INSERT INTO rezTab (name, tel, per, date, cause, note) VALUES (?, ?, ?, ?, ?, ?);";
connection.query(query, [name, tel, per, date, cause, note], 
(err, result) => {
if (err) {
console.error("Veri eklenirken hata:", 
err);
return res.status(500).send("Veri eklenirken hata oluştu.");
}
console.log("kayıt başarılı");
res.send(
`Form Başarıyla Gönderildi : Kullanıcı 
Adı : ${name} Telefon Numarası : ${tel} Kişi Sayısı : ${per} Tarih : ${date} Rezervasyon Amacı : ${cause} Ek Not : ${note}`
);
});
});
app.get("/rezTab", (req, res) => {
const query = "SELECT * FROM rezTab";
connection.query(query, (err, result) => {
if (err) {
console.error("Veri Alınamadı :", err);
return res.status(500).send("Veri Alınamadı");
}
res.json(result);
});
});
app.get("/form-search", (req, res) => {
const q = req.query.q || "";
if (!q.trim()) {
const query = "SELECT * FROM rezTab";
connection.query(query, (err, result) =>
{
if (err) {
console.error("Veri Alınamadı :", 
err);
return res.status(500).send("Veri Alınamadı");
}
return res.json(result);
});
return;
}
const like = `%${q}%`;
const query =
"SELECT * FROM rezTab WHERE name LIKE ? OR tel LIKE ? ";
connection.query(query, [like, like], (err, 
result) => {
if (err) {
console.error("Arama sırasında hata :", 
err);
return res.status(500).send("Arama sırasında hata oluştu");
}
res.json(result);
});
});
app.delete("/delete/:id", (req, res) => {
const id = req.params.id;
const query = "DELETE FROM rezTab WHERE id = ?";
connection.query(query, [id], (err, result) => {
if (err) {
console.error("Veri silinirken hata:", 
err);
return res.status(500).send("Veri silinirken hata");
}
if (result.affectedRows === 0) {
return res.status(404).send("Silinece veri bulunamadı.");
}
return res.status(200).send("Veri başarılı şekilde silindi !");
});
});
app.put("/form-update/:id", (req, res) => {
const id = req.params.id;
const { name, email } = req.body;
if (!name || !email) {
return res.status(400).send("Ad ve eposta zorunludur.");
}
const query = "UPDATE rezTab SET name = ?, email = ? WHERE id = ?";
connection.query(query, [name, email, id], 
(err, result) => {
if (err) {
console.error("Veri güncellenirken hata:", err);
return res.status(500).send("Veri güncellenirken hata oluştu.");
}
if (result.affectedRows === 0) {
return
res.status(404).send("Güncellenecek kayıt bulunamadı.");
}
return res.status(200).send("Kayıt güncellendi");
});
});
app.listen(port, () => {
console.log(`Localhost : ${port} Sunucumuz 
çalışıyor .`);
});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static("website"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.requestDate = new Date().toLocaleString();
    next();
});

app.get('/', (req, res) => {
    res.sendFile("website/index.html");
});

app.get("/get-data", (req, res) => {
    const data = new Date().toLocaleString();
    res.json(data);
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

app.post('/upload',async (req, res) => {
    try {
        let {sId, skarga, priorytet} = req.body;

        let sIdPattern = /^S\d{5}$/i;
        if (!sIdPattern.test(sId)) {
            return res.status(400).json({
                success: false,
                message: 'Numer indeksu powinien rozpoczynać się od litery s i mieć 5 cyfr'
            });
        }

        if (priorytet === null) {
            return res.status(400).json({success: false, message: 'Błąd. Priorytet nie został wybrany'});
        }

        // await delay(2000);

        let result = `<h2>Wysłano skargę</h2> Numer indeksu: ${sId}
                               <p>Treść:<br>${skarga}</p>
                               <p>Priorytet: ${priorytet}</p>
                               <div id="date">Data i godzina złożenia wniosku: ${req.requestDate}</div>`;
        res.json({success: true, message: result});
    } catch {
        res.status(500).json({ success: false, message: 'Błąd po stronie serwera'});
    }
});

app.listen(80, () => {

});
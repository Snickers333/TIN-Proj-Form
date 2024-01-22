async function showSummary(event) {
    event.preventDefault();

    let priorytetElement = document.querySelector('input[name="priorytet"]:checked');
    let priorytet = priorytetElement ? priorytetElement.value : null;
    let sId = document.getElementById('sId').value;
    let skarga = document.getElementById('skarga').value;

    let sIdPattern = /^S\d{5}$/i;
    if (!sIdPattern.test(sId)) {
        alert('Numer indeksu powinien rozpoczynać się od litery s i mieć 5 cyfr');
        return;
    }

    if (priorytet === null) {
        alert('Błąd. Priorytet nie został wybrany');
        return;
    }

    let data = {
        sId: sId,
        skarga: skarga,
        priorytet: priorytet
    };

    try {
        let response = await fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        let result = await response.json();

        if (result.success) {
            document.getElementById('formularz').style.display = 'none';
            document.getElementById('result').innerHTML = result.message;
            document.getElementById('result').style.display = 'block';
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Wystąpił błąd');
    }
}

async function fetchData() {
    try {
        const response = await fetch("/get-data");
        if (response.ok) {
            const data = await response.json();
            document.getElementById('date').textContent = "Data i godzina złożenia wniosku: " + data;
        }
    } catch (error) {
        console.error(error);
    }
}

setInterval(fetchData, 2000);

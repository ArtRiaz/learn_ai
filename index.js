function submitForm(e) {
    e.preventDefault();
    getData();

}


async function getData() {
    let userData = document.getElementById("input").value.trim();
    if(userData === "") return false;

    document.getElementById("messages").innerHTML = `<div class="mess-user">
        <p>${userData}</p>
    </div>` + document.getElementById("messages").innerHTML

    const API = "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";

    try {
        const response = await fetch('http://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages : [{role: 'user', content: userData}],
                max_tokens: 70,
                temperature: 0.7
            })
        })

        const data = await response.json()
        document.getElementById("messages").innerHTML = `<div class="mess-chat">
            <p>${data.choices[0].message.content}</p>
        </div>` + document.getElementById("messages").innerHTML
        document.getElementById("input").value = ""

    } catch(error) {
        console.error("Error: " + error)
    }
}
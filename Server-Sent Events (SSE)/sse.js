window.onload = function()
{
    const form_msg = document.getElementById('form-msg');
    const output = document.getElementById('output-msg');

    // Create a new SSE connection
    const sse_source = new EventSource('sse.php');

    // Check name
    let name_prompt = prompt('Enter your name:', '');

    if (name_prompt != '' && name_prompt != null)
        alert("Welcome to the chat "+name_prompt+"!");
    else
        alert("You as Anonymous! Welcome to the chat");


    // If the chat form is submitted
    form_msg.addEventListener('submit', (event) =>
    {
        event.preventDefault();
        const get_message = document.getElementById('message').value.trim();

        if (get_message != '')
        {
            // Send messages to the backend
            const http = new XMLHttpRequest();
            http.open('POST', 'send.php', true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = () => 
            {
                if (http.readyState == 4 && http.status == 200)
                {
                    if (http.responseText == 'success')
                    {
                        form_msg.reset();
                    }
                    else
                        alert('Message failed to send!');
                }
            }
            http.send('name=' +name_prompt+ '&msg=' +get_message);
        }
    });


    // Listen for 'update' events and update the output
    sse_source.addEventListener('update', (event) =>
    {
        const data = JSON.parse(event.data);

        const element_msg = document.createElement("div");
        element_msg.className = 'list';
        element_msg.innerHTML = `
            <b>${data.name == '' || data.name == 'null' ? 'Anonymous': data.name}</b> 
            (${data.time})

            <p>${data.message}</p>`;

        // Append output
        output.appendChild(element_msg);

        // Scroll to bottom div
        output.scrollTop = output.scrollHeight;
    });
}
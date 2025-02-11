document.getElementById('event-form').addEventListener('submit', createEvent);

let isLoggedIn = false; // Track user login status

function createEvent(event) {
    event.preventDefault();
    
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventLocation = document.getElementById('event-location').value;

    fetch('/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: eventName, date: eventDate, location: eventLocation })
    }).then(response => response.json())
    .then(data => {
        console.log('Event created:', data);
        loadEvents(); // Refresh the event list
    });
}

function loadEvents() {
    fetch('/events')
    .then(response => response.json())
    .then(data => {
        const eventList = document.getElementById('events');
        eventList.innerHTML = ''; // Clear the existing list

        data.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `${event.name} - ${event.date} @ ${event.location}`;
            eventList.appendChild(li);
        });
    });
}

loadEvents();

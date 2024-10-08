document.addEventListener('DOMContentLoaded', () => {
    const bookAppointmentBtn = document.getElementById('book-appointment-btn');
    const appointmentSection = document.getElementById('appointment-section');

    bookAppointmentBtn.addEventListener('click', () => {
        // Toggle the display of the appointment section
        appointmentSection.classList.toggle('hidden');
        // If the appointment section is being shown, generate time slots
        if (!appointmentSection.classList.contains('hidden')) {
            generateTimeSlots('morning', appointmentSection.querySelector('.time-slot-section:first-child'));
            generateTimeSlots('evening', appointmentSection.querySelector('.time-slot-section:last-child'));
        }
    });

    function generateTimeSlots(session, container) {
        // Clear any existing slots
        container.innerHTML = `<h2>${session.charAt(0).toUpperCase() + session.slice(1)}</h2>`;
        const timeSlots = session === 'morning' ? ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'] : ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'];
        timeSlots.forEach(time => {
            const timeSlotDiv = document.createElement('div');
            timeSlotDiv.classList.add('time-slot');
            timeSlotDiv.textContent = time;
            // Append the time slot to the container
            container.appendChild(timeSlotDiv);
        });
        // Add the "Add Slots" button
        const addSlotsBtn = document.createElement('button');
        addSlotsBtn.textContent = '+ Add Slots';
        addSlotsBtn.onclick = () => alert('Add more slots here.');
        container.appendChild(addSlotsBtn);
    }
});

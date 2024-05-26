document.addEventListener('DOMContentLoaded', function () {
    // Extract topic from URL or set it dynamically
    const pathParts = window.location.pathname.split('/');
    const topic = pathParts[pathParts.length - 1].replace('.html', ''); // "array", "string", etc.

    // Fetch existing questions
    fetch(`/api/topics/${topic}`)
        .then(response => response.json())
        .then(questions => {
            const questionsContainer = document.getElementById('questions');
            questions.forEach(q => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `
                    <h3>Q: ${q.question}</h3>
                    <p>${q.answer.replace(/\n/g, '<br>')}</p>
                `;
                questionsContainer.appendChild(questionElement);
            });
        });

    // Handle form submission
    document.getElementById('addQuestionForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;

        fetch(`/api/topics/${topic}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        })
        .then(response => {
            if (response.ok) {
                // Add the new question to the DOM
                const questionsContainer = document.getElementById('questions');
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `
                    <h3>Q: ${question}</h3>
                    <p>${answer.replace(/\n/g, '<br>')}</p>
                `;
                questionsContainer.appendChild(questionElement);

                // Clear the form
                document.getElementById('question').value = '';
                document.getElementById('answer').value = '';
            } else {
                console.error('Failed to add question');
            }
        });
    });
});

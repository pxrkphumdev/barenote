async function getData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/pxrkphumdev/barenote/refs/heads/main/js/metalclip.json');

    // Check if the request was successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Process your JSON data here

    const grid = document.querySelector(".grid")

    data.forEach(el => {
      grid.innerHTML +=
        `<div>
        <h1>${el.title}</h1>
        <div>${el.body}</div>
      </div>`
    });

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

window.addEventListener("DOMContentLoaded", getData)
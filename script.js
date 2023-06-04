// Function to fetch data from the JSON file
async function fetchData() {
    try {
      const response = await fetch('data.json');
      const jsonData = await response.json();
      return jsonData.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // Function to populate the table with data
  async function renderTable() {
    const tableBody = document.getElementById('data-body');
    tableBody.innerHTML = '';
  
    const data = await fetchData();
  
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>
          <button class="edit-btn" onclick="editData(${item.id})">Edit</button>
          <button class="delete-btn" onclick="deleteData(${item.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to handle the form submission
  async function handleFormSubmit(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
  
    const formData = {
      id: Date.now(), // Generate a unique ID (you can modify it as per your requirements)
      name: nameInput.value,
      email: emailInput.value
    };
  
    const data = await fetchData();
    data.push(formData);

    renderTable();
    resetForm();
  }
  
  // Function to reset the form
  function resetForm() {
    const form = document.getElementById('data-form');
    form.reset();
  }
  
  // Function to edit data
  function editData(id) {
    // Retrieve the data from the JSON file based on the ID
    // Update the form fields with the retrieved data
    // Once the editing is complete, call renderTable() to update the table
    renderTable();
  }
  
  // Function to delete data
  async function deleteData(id) {
    const data = await fetchData();
    const updatedData = data.filter(item => item.id !== id);
  
    // Save the updated data to the JSON file (you'll need a server-side implementation for this)
    // For simplicity, this example does not include the server-side code to update the JSON file
  
    renderTable();
  }
  
  // Initial rendering of the table
  renderTable();
let totalcost = 0;
    let editingRow = null;

    function updateTotalCost() {
        totalcost = 0;
        const rows = document.querySelectorAll('#dataTable tbody tr');
        rows.forEach(row => {
            const totalCostCell = row.cells[6]; // Total Cost cell
            if (totalCostCell) {
                totalcost += parseInt(totalCostCell.innerText) || 0;
            }
        });
        document.getElementById('totalcost').innerText = totalcost;
    }

    document.getElementById('dataForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the form values
        let cust_name = document.getElementById('manager_name').value;
        let cust_no = document.getElementById('cust_contactno').value;
        let product_name = document.getElementById('product_name').value;
        let product_no = parseInt(document.getElementById('product_no').value);
        let product_cost = parseInt(document.getElementById('product_cost').value);
        let product_quantity = parseInt(document.getElementById('product_quantity').value);
        let total_cost_f = parseInt(document.getElementById('total_cost_f').value);
        let date = document.getElementById('date').value;

        if (editingRow) {
            // Update existing row
            let cells = editingRow.getElementsByTagName('td');
            let oldTotalCost = parseInt(cells[6].innerText); // Previous total cost
            cells[0].innerText = cust_name;
            cells[1].innerText = cust_no;
            cells[2].innerText = product_name;
            cells[3].innerText = product_no;
            cells[4].innerText = product_cost;
            cells[5].innerText = product_quantity;
            cells[6].innerText = total_cost_f;
            cells[7].innerText = date;

            // Update total cost
            totalcost = totalcost - oldTotalCost + total_cost_f;
            editingRow = null;
        } else {
            // Add a new row
            let table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
            let newRow = table.insertRow();

            newRow.insertCell(0).innerText = cust_name;
            newRow.insertCell(1).innerText = cust_no;
            newRow.insertCell(2).innerText = product_name;
            newRow.insertCell(3).innerText = product_no;
            newRow.insertCell(4).innerText = product_cost;
            newRow.insertCell(5).innerText = product_quantity;
            newRow.insertCell(6).innerText = total_cost_f;
            newRow.insertCell(7).innerText = date;

            // Add edit button
            let editCell = newRow.insertCell(8);
            let editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = () => editRow(newRow);
            editCell.appendChild(editButton);

            // Update total cost
            totalcost += total_cost_f;
        }

        // Display the total cost
        document.getElementById('totalcost').innerText = totalcost;

        // Clear form fields
        //document.getElementById('dataForm').reset();
        //editingRow = null;
        // Clear the email and age fields but keep the name field
            document.getElementById('product_name').value = '';
            document.getElementById('product_no').value = '';
            document.getElementById('product_cost').value = '';
            document.getElementById('product_quantity').value = '';
            document.getElementById('total_cost_f').value = '';
            document.getElementById('date').value = '';
    });

    function editRow(row) {
        // Populate form with row data
        let cells = row.getElementsByTagName('td');
        document.getElementById('manager_name').value = cells[0].innerText;
        document.getElementById('cust_contactno').value = cells[1].innerText;
        document.getElementById('product_name').value = cells[2].innerText;
        document.getElementById('product_no').value = cells[3].innerText;
        document.getElementById('product_cost').value = cells[4].innerText;
        document.getElementById('product_quantity').value = cells[5].innerText;
        document.getElementById('total_cost_f').value = cells[6].innerText;
        document.getElementById('date').value = cells[7].innerText;

        // Set editingRow to the current row
        editingRow = row;
    }

    document.getElementById('geninvoice').addEventListener('click', function() {
        generatePDF();
    });

    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text("Invoice", 10, 10);

        // Get the table data
        let table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        let rows = table.getElementsByTagName('tr');

        // Set initial position for the table data in the PDF
        let yPosition = 20;

        // Add table headers
        doc.text("Customer Name", 10, yPosition);
        doc.text("Product Name", 60, yPosition);
        doc.text("Product Cost", 100, yPosition);
        doc.text("Quantity", 140, yPosition);
        doc.text("Total Cost", 175, yPosition);

        yPosition += 10;

        // Loop through each row and add the data to the PDF
        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].getElementsByTagName('td');
            doc.text(cells[0].innerText, 10, yPosition);   // Name
            doc.text(cells[2].innerText, 60, yPosition);   // Product Name
            doc.text(cells[4].innerText, 100, yPosition);  // Product Cost
            doc.text(cells[5].innerText, 140, yPosition);  // Quantity
            doc.text(cells[6].innerText, 175, yPosition);  // Total Cost
            yPosition += 10;
        }

        // Add the total cost at the bottom of the PDF
        yPosition += 10;
        doc.text("Total Cost: " + document.getElementById('totalcost').innerText, 10, yPosition);

        // Save the PDF
        doc.save("submitted_data.pdf");

        // Reload the page after PDF generation
        location.reload();
    }

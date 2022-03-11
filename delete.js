// ==UserScript==
// @name         netsuite
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// ==/UserScript==

let delete_nums = ["#SO202771", "#SO202772", "#SO202773"];
function getRowsToDelete() {
  // Initialize an array that's going to contain all the rows to be deleted
  let delete_rows = [];
  // Get the element that contains all the rows
  const ordenDeVenta = document.getElementsByClassName("uir-machine-row");
  // Loop through all these rows
  Array.from(ordenDeVenta).forEach(row => {
    // Find the cell that contains the order no.
    const cellWithNum = row.children[0];
    // Go through each order no that has to be deleted
    delete_nums.forEach(num => {
      // If it's in the cell
      if (!cellWithNum.innerText.includes(num)) {
        // Add the row to the array
        delete_rows.push(row);
      }
    })
  })
  // Return the array with rows to be deleted
  return delete_rows;
}

// Now you have all the rows here that have to be deleted
let rows = getRowsToDelete();
function deleteRow(row) {
  // Click the row
  row.click();
  // Set an interval to wait for the button to show
  const wait = setInterval(() => {
    const btn = row.getElementsByClassName("Eliminar");
    if (btn.length > 0) {
      clearInterval(wait);
      btn[0].click();
      // Remove the first item of the array
      rows.shift();
      // If there are more left
      if (rows.length) {
        // Repeat
        deleteRow(rows[0]);
      }
    }
  }, 250);
}

deleteRow(rows[0]);
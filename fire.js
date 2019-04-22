(function main() {
    let fireBuffer;
    let numRows = 10;
    let numCols = 100;

    createFireTable("fire-table", numRows, numCols);
    fireBuffer = initFireBuffer(numRows, numCols);

    setInterval(() => {
            randomizeBottomRows(fireBuffer, 10);
            fireFrame(fireBuffer);
            //displayFireBuffer(fireBuffer);
            drawFire(fireBuffer, "fire-table");
        },
        100);

})();

function drawFire(buffer, tableId, numRandomRows = 2) {
    let divId = 0;

    for (let row = 0; row < buffer.length - numRandomRows; row++) {
        for (let col = 0; col < buffer[row].length; col++) {
            let div = document.getElementById(`${divId}`);
            div.classList = "";
            let currentColor = `color-${buffer[row][col]}`;
            div.classList.add(currentColor);
            divId++;
        }
    }

}

function createFireTable(elementId, rows, cols, tableWidth = 900, tableHeight = 100) {
    let table = document.getElementById(elementId);
    table.style.width = `${tableWidth}px`;
    table.style.height = `${tableHeight}px`;

    let rowWidth = tableWidth / cols;
    let rowHeight = tableHeight / rows;
    let idCount = 0;

    console.log(`${rowWidth} x ${rowHeight}`);
    for (let r = 0; r < rows; r++) {
        let tr = document.createElement('tr');
        // tr.style.height = `${rowHeight}px`;

        for (let c = 0; c < cols; c++) {
            let td = document.createElement('td');
            let div = document.createElement('div');
            div.id = idCount++;

            div.style.height = `${rowHeight}px`;
            div.style.width = `${rowWidth}px`;
            td.appendChild(div);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}

function initFireBuffer(numRows, numCols, numRandomRows = 2) {
    let buffer = [];
    // add two rows for the random rows at the bottom
    for (let r = 0; r < numRows + numRandomRows; r++) {
        buffer[r] = [];
        for (let c = 0; c < numCols; c++) {
            buffer[r][c] = 0;
        }
    }
    return buffer;
}

function displayFireBuffer(buffer) {
    buffer.forEach(row => {
        let s = "";
        row.forEach(col => s += col + " ");
        console.log(s);
    });
}

function randomizeBottomRows(buffer, maxValue, numRows = 2) {
    // start at the bottom
    let bottomRow = buffer.length - 1;
    for (let i = 0; i < numRows; i++) {
        let currRow = buffer[bottomRow];
        for (let col = 0; col < currRow.length; col++) {
            currRow[col] = Math.floor(Math.random() * maxValue);
        }
        bottomRow--;
    }
}

function fireFrame(buffer, divisor = 4.1, numRandomRows = 2) {
    let bottomRow = buffer.length - numRandomRows - 1;
    for (let row = bottomRow; row >= 0; row--) {
        let currRow = buffer[row];
        for (let col = 0; col < currRow.length; col++) {
            let sum = 0;

            sum += buffer[row + 1][col]; //directly below
            sum += buffer[row + 2][col]; //directly below again

            // below and to the left
            if (col - 1 < 0) {
                sum += buffer[row + 1][currRow.length - 1]; // wrap around
            } else {
                sum += buffer[row + 1][col - 1];
            }

            // below and to the right
            if (col + 1 > currRow.length - 1) {
                sum += buffer[row + 1][0];
            } else {
                sum += buffer[row + 1][col + 1];
            }
            currRow[col] = Math.floor(sum / divisor);
        }
    }
}
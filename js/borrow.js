function displayBorrows() {

    let table = document.getElementById("borrowTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    borrows.forEach(borrow => {

        let statusClass = "";

        if (borrow.status === "Đang mượn") {
            statusClass = "borrowing";
        } 
        else if (borrow.status === "Đã trả") {
            statusClass = "returned";
        } 
        else {
            statusClass = "overdue";
        }

        let action = "";

        if (borrow.status === "Đang mượn") {

            action = `
                <button
                    class="btn"
                    onclick="returnBook('${borrow.id}')">
                    Trả sách
                </button>
            `;
        }

        table.innerHTML += `
            <tr>
                <td>${borrow.id}</td>

                <td>${borrow.reader}</td>

                <td>${borrow.book}</td>

                <td>
                    ${formatDate(borrow.borrowDate)}
                </td>

                <td>
                    ${formatDate(borrow.dueDate)}
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${borrow.status}
                    </span>
                </td>

                <td>
                    ${action}
                </td>
            </tr>
        `;
    });
}


function openBorrowForm() {

    document.getElementById("borrowForm")
        .style.display = "block";

    loadReaderSelect();
    loadBookSelect();
}


function closeBorrowForm() {

    document.getElementById("borrowForm")
        .style.display = "none";
}


function loadReaderSelect() {

    let select =
        document.getElementById("borrowReader");

    select.innerHTML =
        '<option value="">-- Chọn độc giả --</option>';

    readers.forEach(reader => {

        select.innerHTML += `
            <option value="${reader.id}">
                ${reader.name}
            </option>
        `;
    });
}


function loadBookSelect() {

    let select =
        document.getElementById("borrowBook");

    select.innerHTML =
        '<option value="">-- Chọn sách --</option>';

    books
        .filter(book => book.available > 0)
        .forEach(book => {

            select.innerHTML += `
                <option value="${book.id}">
                    ${book.title} - còn ${book.available}
                </option>
            `;
        });
}


function createBorrow() {

    let readerId =
        document.getElementById("borrowReader").value;

    let bookId =
        document.getElementById("borrowBook").value;

    let dueDate =
        document.getElementById("dueDate").value;


    if (!readerId || !bookId || !dueDate) {

        alert("Vui lòng nhập đầy đủ thông tin!");

        return;
    }


    let reader =
        readers.find(r => r.id === readerId);

    let book =
        books.find(b => b.id === bookId);


    if (!reader || !book) {
        return;
    }


    if (book.available <= 0) {

        alert("Sách đã hết!");

        return;
    }


    let id =
        "PM" +
        String(borrows.length + 1).padStart(3, "0");


    let today =
        new Date().toISOString().split("T")[0];


    borrows.push({

        id: id,

        reader: reader.name,

        book: book.title,

        borrowDate: today,

        dueDate: dueDate,

        status: "Đang mượn"
    });


    book.available--;


    localStorage.setItem(
        "borrows",
        JSON.stringify(borrows)
    );

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    alert("Tạo phiếu mượn thành công!");

    closeBorrowForm();

    displayBorrows();
}


function returnBook(id) {

    let borrow =
        borrows.find(b => b.id === id);

    if (!borrow) {
        return;
    }


    let book =
        books.find(b => b.title === borrow.book);


    if (book) {
        book.available++;
    }


    borrow.status = "Đã trả";


    localStorage.setItem(
        "borrows",
        JSON.stringify(borrows)
    );

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    alert("Trả sách thành công!");

    displayBorrows();
}


function checkOverdue() {

    let today = new Date();


    borrows.forEach(borrow => {

        if (borrow.status === "Đang mượn") {

            let due = new Date(borrow.dueDate);

            if (due < today) {
                borrow.status = "Quá hạn";
            }
        }
    });


    localStorage.setItem(
        "borrows",
        JSON.stringify(borrows)
    );
}


checkOverdue();

displayBorrows();
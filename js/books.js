
function displayBooks(list = books) {

    let table = document.getElementById("bookTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";


    list.forEach(book => {

        table.innerHTML += `

            <tr>

                <td>${book.id}</td>

                <td>${book.title}</td>

                <td>${book.author}</td>

                <td>${book.category}</td>

                <td>${book.quantity}</td>

                <td>${book.available}</td>

                <td>

                    <button
                        class="btn-edit"
                        onclick="editBook('${book.id}')">

                        Sửa

                    </button>

                    <button
                        class="btn-delete"
                        onclick="deleteBook('${book.id}')">

                        Xóa

                    </button>

                </td>

            </tr>

        `;
    });
}


// ============================
// MỞ FORM
// ============================

function openBookForm() {

    document.getElementById("bookForm")
        .style.display = "block";

}


// ============================
// ĐÓNG FORM
// ============================

function closeBookForm() {

    document.getElementById("bookForm")
        .style.display = "none";

    clearForm();

}


// ============================
// XÓA FORM
// ============================

function clearForm() {

    document.getElementById("bookId").value = "";

    document.getElementById("bookTitle").value = "";

    document.getElementById("bookAuthor").value = "";

    document.getElementById("bookCategory").value = "";

    document.getElementById("bookQuantity").value = "";

}


// ============================
// THÊM / SỬA SÁCH
// ============================

function saveBook() {

    let id =
        document.getElementById("bookId").value.trim();

    let title =
        document.getElementById("bookTitle").value.trim();

    let author =
        document.getElementById("bookAuthor").value.trim();

    let category =
        document.getElementById("bookCategory").value.trim();

    let quantity =
        Number(document.getElementById("bookQuantity").value);


    if (!id || !title || !author || !category || quantity <= 0) {

        alert("Vui lòng nhập đầy đủ thông tin!");

        return;
    }


    let existingBook =
        books.find(book => book.id === id);


    if (existingBook) {

        let oldQuantity = existingBook.quantity;

        let borrowed =
            oldQuantity - existingBook.available;

        existingBook.quantity = quantity;

        existingBook.available =
            Math.max(0, quantity - borrowed);

        existingBook.title = title;

        existingBook.author = author;

        existingBook.category = category;

    }

    else {

        books.push({

            id: id,

            title: title,

            author: author,

            category: category,

            quantity: quantity,

            available: quantity

        });

    }


    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    alert("Lưu sách thành công!");

    clearForm();

    closeBookForm();

    displayBooks();
}


// ============================
// XÓA SÁCH
// ============================

function deleteBook(id) {

    let confirmDelete =
        confirm("Bạn có chắc muốn xóa sách này?");


    if (!confirmDelete) {
        return;
    }


    books =
        books.filter(book => book.id !== id);


    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    displayBooks();

}


// ============================
// SỬA SÁCH
// ============================

function editBook(id) {

    let book =
        books.find(book => book.id === id);


    if (!book) {
        return;
    }


    document.getElementById("bookId").value =
        book.id;

    document.getElementById("bookTitle").value =
        book.title;

    document.getElementById("bookAuthor").value =
        book.author;

    document.getElementById("bookCategory").value =
        book.category;

    document.getElementById("bookQuantity").value =
        book.quantity;


    openBookForm();

}


// ============================
// TÌM KIẾM
// ============================

function searchBooks() {

    let keyword =
        document.getElementById("searchBook")
        .value
        .toLowerCase();


    let result =
        books.filter(book =>

            book.id.toLowerCase().includes(keyword) ||

            book.title.toLowerCase().includes(keyword) ||

            book.author.toLowerCase().includes(keyword) ||

            book.category.toLowerCase().includes(keyword)

        );


    displayBooks(result);
}


// ============================
// CHẠY
// ============================

displayBooks();

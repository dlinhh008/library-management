let books = JSON.parse(localStorage.getItem("books")) || [];

// ============================
// MỞ / ĐÓNG FORM MODAL
// ============================
function openBookForm() {
    const modal = document.getElementById("bookModal");
    if (modal) {
        modal.style.display = "block";
    }
}

function closeBookForm() {
    const modal = document.getElementById("bookModal");
    if (modal) {
        modal.style.display = "none";
    }
    clearForm();
}

function clearForm() {
    const bookIdInput = document.getElementById("bookId");
    if (bookIdInput) bookIdInput.disabled = false;
    
    document.getElementById("bookId").value = "";
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookCategory").value = "";
    document.getElementById("bookQuantity").value = "";
    
    const typeSelect = document.getElementById("bookType");
    if (typeSelect) typeSelect.value = "Sách giấy";
}

// ============================
// HIỂN THỊ DANH SÁCH SÁCH
// ============================
function displayBooks(list = books) {
    let table = document.getElementById("bookTable");
    if (!table) return;

    table.innerHTML = "";

    if (list.length === 0) {
        table.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">Chưa có dữ liệu sách</td></tr>`;
        return;
    }

    list.forEach(book => {
        let typeVal = book.type || "Sách giấy";
        let badgeClass = typeVal === "Sách giấy" ? "badge-paper" : "badge-online";

        table.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td><span class="${badgeClass}">${typeVal}</span></td>
                <td>${book.quantity}</td>
                <td>${book.available}</td>
                <td>
                    <button class="btn btn-edit" onclick="editBook('${book.id}')">Sửa</button>
                    <button class="btn btn-delete" onclick="deleteBook('${book.id}')">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// ============================
// THÊM / SỬA SÁCH
// ============================
function saveBook() {
    let id = document.getElementById("bookId").value.trim();
    let title = document.getElementById("bookTitle").value.trim();
    let author = document.getElementById("bookAuthor").value.trim();
    let category = document.getElementById("bookCategory").value.trim();
    let type = document.getElementById("bookType").value;
    let quantity = Number(document.getElementById("bookQuantity").value);

    if (!id || !title || !author || !category || quantity <= 0) {
        alert("Vui lòng nhập đầy đủ thông tin hợp lệ!");
        return;
    }

    let existingBook = books.find(book => book.id === id);

    if (existingBook) {
        let oldQuantity = existingBook.quantity;
        let borrowed = oldQuantity - existingBook.available;

        existingBook.quantity = quantity;
        existingBook.available = Math.max(0, quantity - borrowed);
        existingBook.title = title;
        existingBook.author = author;
        existingBook.category = category;
        existingBook.type = type;
    } else {
        books.push({
            id: id,
            title: title,
            author: author,
            category: category,
            type: type,
            quantity: quantity,
            available: quantity
        });
    }

    localStorage.setItem("books", JSON.stringify(books));
    alert("Lưu sách thành công!");
    closeBookForm();
    displayBooks();
}

// ============================
// SỬA SÁCH
// ============================
function editBook(id) {
    let book = books.find(b => b.id === id);
    if (!book) return;

    document.getElementById("bookId").value = book.id;
    document.getElementById("bookId").disabled = true;
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("bookAuthor").value = book.author;
    document.getElementById("bookCategory").value = book.category;
    document.getElementById("bookQuantity").value = book.quantity;
    document.getElementById("bookType").value = book.type || "Sách giấy";

    openBookForm();
}

// ============================
// XÓA SÁCH
// ============================
function deleteBook(id) {
    if (confirm("Bạn có chắc muốn xóa sách này?")) {
        books = books.filter(b => b.id !== id);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    }
}

// ============================
// TÌM KIẾM SÁCH
// ============================
function searchBooks() {
    let keyword = document.getElementById("searchBook").value.toLowerCase();

    let result = books.filter(book =>
        book.id.toLowerCase().includes(keyword) ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword) ||
        book.category.toLowerCase().includes(keyword) ||
        (book.type && book.type.toLowerCase().includes(keyword))
    );

    displayBooks(result);
}

// Khởi chạy khi load trang
document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
});
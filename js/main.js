let books = JSON.parse(localStorage.getItem("books")) || [
    {
        id: "S001",
        title: "Lập trình Java",
        author: "Nguyễn Văn A",
        category: "Công nghệ",
        quantity: 10,
        available: 7
    },
    {
        id: "S002",
        title: "Cơ sở dữ liệu",
        author: "Trần Văn B",
        category: "Công nghệ",
        quantity: 8,
        available: 5
    },
    {
        id: "S003",
        title: "Mạng máy tính",
        author: "Lê Văn C",
        category: "Công nghệ",
        quantity: 6,
        available: 4
    }
];


let readers = JSON.parse(localStorage.getItem("readers")) || [
    {
        id: "DG001",
        name: "Nguyễn Văn Minh",
        email: "minh@gmail.com",
        phone: "0901234567"
    },
    {
        id: "DG002",
        name: "Trần Thị Lan",
        email: "lan@gmail.com",
        phone: "0912345678"
    }
];


let borrows = JSON.parse(localStorage.getItem("borrows")) || [
    {
        id: "PM001",
        reader: "Nguyễn Văn Minh",
        book: "Lập trình Java",
        borrowDate: "2026-09-15",
        dueDate: "2026-09-22",
        status: "Đang mượn"
    },
    {
        id: "PM002",
        reader: "Trần Thị Lan",
        book: "Cơ sở dữ liệu",
        borrowDate: "2026-09-10",
        dueDate: "2026-09-17",
        status: "Quá hạn"
    }
];


// ============================
// LƯU LOCAL STORAGE
// ============================

localStorage.setItem("books", JSON.stringify(books));

localStorage.setItem("readers", JSON.stringify(readers));

localStorage.setItem("borrows", JSON.stringify(borrows));


// ============================
// DASHBOARD
// ============================

function loadDashboard() {

    let totalBooks = books.reduce(
        (sum, book) => sum + book.quantity,
        0
    );

    let totalReaders = readers.length;

    let totalBorrowing = borrows.filter(
        borrow => borrow.status === "Đang mượn"
    ).length;

    let totalOverdue = borrows.filter(
        borrow => borrow.status === "Quá hạn"
    ).length;


    let bookElement = document.getElementById("totalBooks");

    if (bookElement) {
        bookElement.innerText = totalBooks;
    }


    let readerElement = document.getElementById("totalReaders");

    if (readerElement) {
        readerElement.innerText = totalReaders;
    }


    let borrowingElement =
        document.getElementById("totalBorrowing");

    if (borrowingElement) {
        borrowingElement.innerText = totalBorrowing;
    }


    let overdueElement =
        document.getElementById("totalOverdue");

    if (overdueElement) {
        overdueElement.innerText = totalOverdue;
    }


    loadRecentBorrow();
}


// ============================
// PHIẾU MƯỢN GẦN ĐÂY
// ============================

function loadRecentBorrow() {

    let table = document.getElementById("recentBorrowTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";


    borrows.slice(-5).reverse().forEach(borrow => {

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


        table.innerHTML += `
            <tr>

                <td>${borrow.id}</td>

                <td>${borrow.reader}</td>

                <td>${borrow.book}</td>

                <td>${formatDate(borrow.borrowDate)}</td>

                <td>${formatDate(borrow.dueDate)}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${borrow.status}
                    </span>
                </td>

            </tr>
        `;
    });
}


// ============================
// FORMAT DATE
// ============================

function formatDate(date) {

    if (!date) {
        return "";
    }

    let d = new Date(date);

    return d.toLocaleDateString("vi-VN");
}


// ============================
// CHẠY DASHBOARD
// ============================

loadDashboard();

document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
});

// Hàm tính ngày quá hạn
function isOverdue(dueDateStr) {
    if (!dueDateStr) return false;
    const dueDate = new Date(dueDateStr);
    const currentDate = new Date();
    
    currentDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    const timeDiff = currentDate.getTime() - dueDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    return dayDiff > 0;
}

function updateDashboardStats() {
    // 1. Lấy dữ liệu từ LocalStorage
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let readers = JSON.parse(localStorage.getItem('readers')) || []; 
    let borrowRecords = JSON.parse(localStorage.getItem('borrowRecords')) || [];

    // 2. Thống kê phân loại Sách
    let totalBooks = books.length;
    let totalPaperBooks = 0;
    let totalOnlineBooks = 0;

    books.forEach(book => {
        // Nếu sách chưa gắn type thì mặc định tính là Sách giấy
        let type = book.type || "Sách giấy";
        if (type === "Sách online") {
            totalOnlineBooks++;
        } else {
            totalPaperBooks++;
        }
    });

    // 3. Thống kê Độc giả & Tình trạng Mượn trả
    let totalReaders = readers.length;
    let totalBorrowed = 0;
    let totalOverdue = 0;

    borrowRecords.forEach(record => {
        if (record.status === 'Đang mượn') {
            totalBorrowed++;
            if (isOverdue(record.dueDate)) {
                totalOverdue++;
            }
        }
    });

    // 4. Đẩy số liệu lên giao diện
    document.getElementById('totalBooks').innerText = totalBooks;
    document.getElementById('totalPaperBooks').innerText = totalPaperBooks;
    document.getElementById('totalOnlineBooks').innerText = totalOnlineBooks;
    document.getElementById('totalReaders').innerText = totalReaders;
    document.getElementById('totalBorrowed').innerText = totalBorrowed;
    document.getElementById('totalOverdue').innerText = totalOverdue;
}
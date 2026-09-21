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
    // 1. Dữ liệu Sách & Độc giả: Đang là null (chờ tích hợp API / Database từ backend)
    const books = null;
    const readers = null;

    // Hiển thị 0 hoặc "--" trên giao diện thay vì đọc nhầm dữ liệu cũ
    document.getElementById('totalBooks').innerText = books ? books.length : "0";
    document.getElementById('totalPaperBooks').innerText = books ? books.filter(b => (b.type || "Sách giấy") === "Sách giấy").length : "0";
    document.getElementById('totalOnlineBooks').innerText = books ? books.filter(b => b.type === "Sách online").length : "0";
    document.getElementById('totalReaders').innerText = readers ? readers.length : "0";

    // 2. Dữ liệu Mượn / Trả (nếu có dùng tạm mock local hoặc để 0 chờ backend)
    let borrowRecords = JSON.parse(localStorage.getItem('borrowRecords')) || [];
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

    document.getElementById('totalBorrowed').innerText = totalBorrowed;
    document.getElementById('totalOverdue').innerText = totalOverdue;
}
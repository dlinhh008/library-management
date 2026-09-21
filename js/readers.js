let readers = JSON.parse(localStorage.getItem("readers")) || [];

// ============================
// MỞ / ĐÓNG MODAL ĐỘC GIẢ
// ============================
function openReaderForm() {
    const modal = document.getElementById("readerModal");
    if (modal) {
        modal.style.display = "block";
    }
}

function closeReaderForm() {
    const modal = document.getElementById("readerModal");
    if (modal) {
        modal.style.display = "none";
    }
    clearReaderForm();
}

function clearReaderForm() {
    const idInput = document.getElementById("readerId");
    if (idInput) idInput.disabled = false;

    document.getElementById("readerId").value = "";
    document.getElementById("readerName").value = "";
    document.getElementById("readerEmail").value = "";
    document.getElementById("readerPhone").value = "";
}

// ============================
// HIỂN THỊ ĐỘC GIẢ
// ============================
function displayReaders(list = readers) {
    let table = document.getElementById("readerTable");
    if (!table) return;

    table.innerHTML = "";

    if (list.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">Chưa có dữ liệu độc giả</td></tr>`;
        return;
    }

    list.forEach(reader => {
        table.innerHTML += `
            <tr>
                <td>${reader.id}</td>
                <td>${reader.name}</td>
                <td>${reader.email}</td>
                <td>${reader.phone}</td>
                <td>
                    <button class="btn btn-edit" onclick="editReader('${reader.id}')">Sửa</button>
                    <button class="btn btn-delete" onclick="deleteReader('${reader.id}')">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// ============================
// LƯU ĐỘC GIẢ
// ============================
function saveReader() {
    let id = document.getElementById("readerId").value.trim();
    let name = document.getElementById("readerName").value.trim();
    let email = document.getElementById("readerEmail").value.trim();
    let phone = document.getElementById("readerPhone").value.trim();

    if (!id || !name || !email || !phone) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let existingReader = readers.find(r => r.id === id);

    if (existingReader) {
        existingReader.name = name;
        existingReader.email = email;
        existingReader.phone = phone;
    } else {
        readers.push({ id, name, email, phone });
    }

    localStorage.setItem("readers", JSON.stringify(readers));
    alert("Lưu độc giả thành công!");
    closeReaderForm();
    displayReaders();
}

// ============================
// SỬA ĐỘC GIẢ
// ============================
function editReader(id) {
    let reader = readers.find(r => r.id === id);
    if (!reader) return;

    document.getElementById("readerId").value = reader.id;
    document.getElementById("readerId").disabled = true;
    document.getElementById("readerName").value = reader.name;
    document.getElementById("readerEmail").value = reader.email;
    document.getElementById("readerPhone").value = reader.phone;

    openReaderForm();
}

// ============================
// XÓA ĐỘC GIẢ
// ============================
function deleteReader(id) {
    if (confirm("Bạn có chắc muốn xóa độc giả này?")) {
        readers = readers.filter(r => r.id !== id);
        localStorage.setItem("readers", JSON.stringify(readers));
        displayReaders();
    }
}

// ============================
// TÌM KIẾM ĐỘC GIẢ
// ============================
function searchReaders() {
    let keyword = document.getElementById("searchReader").value.toLowerCase();
    let result = readers.filter(r =>
        r.id.toLowerCase().includes(keyword) ||
        r.name.toLowerCase().includes(keyword) ||
        r.email.toLowerCase().includes(keyword)
    );
    displayReaders(result);
}

document.addEventListener("DOMContentLoaded", () => {
    displayReaders();
});
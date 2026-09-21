function displayReaders(list = readers) {

    let table =
        document.getElementById("readerTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";


    list.forEach(reader => {

        table.innerHTML += `

            <tr>

                <td>${reader.id}</td>

                <td>${reader.name}</td>

                <td>${reader.email}</td>

                <td>${reader.phone}</td>

                <td>

                    <button
                        class="btn-edit"
                        onclick="editReader('${reader.id}')">

                        Sửa

                    </button>

                    <button
                        class="btn-delete"
                        onclick="deleteReader('${reader.id}')">

                        Xóa

                    </button>

                </td>

            </tr>

        `;

    });
}


function openReaderForm() {

    document.getElementById("readerForm")
        .style.display = "block";

}


function closeReaderForm() {

    document.getElementById("readerForm")
        .style.display = "none";

    clearReaderForm();

}


function clearReaderForm() {

    document.getElementById("readerId").value = "";

    document.getElementById("readerName").value = "";

    document.getElementById("readerEmail").value = "";

    document.getElementById("readerPhone").value = "";

}


function saveReader() {

    let id =
        document.getElementById("readerId")
        .value.trim();

    let name =
        document.getElementById("readerName")
        .value.trim();

    let email =
        document.getElementById("readerEmail")
        .value.trim();

    let phone =
        document.getElementById("readerPhone")
        .value.trim();


    if (!id || !name || !email || !phone) {

        alert("Vui lòng nhập đầy đủ!");

        return;
    }


    let existing =
        readers.find(reader => reader.id === id);


    if (existing) {

        existing.name = name;

        existing.email = email;

        existing.phone = phone;

    }

    else {

        readers.push({

            id: id,

            name: name,

            email: email,

            phone: phone

        });

    }


    localStorage.setItem(
        "readers",
        JSON.stringify(readers)
    );


    alert("Lưu độc giả thành công!");

    closeReaderForm();

    displayReaders();
}


function deleteReader(id) {

    if (!confirm("Bạn có chắc muốn xóa?")) {
        return;
    }


    readers =
        readers.filter(reader => reader.id !== id);


    localStorage.setItem(
        "readers",
        JSON.stringify(readers)
    );


    displayReaders();
}


function editReader(id) {

    let reader =
        readers.find(reader => reader.id === id);


    if (!reader) {
        return;
    }


    document.getElementById("readerId").value =
        reader.id;

    document.getElementById("readerName").value =
        reader.name;

    document.getElementById("readerEmail").value =
        reader.email;

    document.getElementById("readerPhone").value =
        reader.phone;


    openReaderForm();
}


function searchReaders() {

    let keyword =
        document.getElementById("searchReader")
        .value
        .toLowerCase();


    let result =
        readers.filter(reader =>

            reader.id.toLowerCase().includes(keyword) ||

            reader.name.toLowerCase().includes(keyword) ||

            reader.email.toLowerCase().includes(keyword) ||

            reader.phone.includes(keyword)

        );


    displayReaders(result);
}


displayReaders();

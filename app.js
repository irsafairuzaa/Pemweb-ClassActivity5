let tasks = [
  {
    id: Date.now(), // ID unik
    judul: "Membuat fungsi render",
    matkul: "Pemrograman Web",
    deadline: "2026-10-15",
    selesai: false
  }
];

const daftarTugas = document.querySelector("#daftar-tugas");

function render() {
  daftarTugas.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "selesai";
    checkbox.checked = task.selesai;
    checkbox.dataset.id = task.id;

    const divInfo = document.createElement("div");
    divInfo.className = "info";

    const spanJudul = document.createElement("span");
    spanJudul.className = "judul";
    spanJudul.textContent = task.judul;

    const smallDetail = document.createElement("small");
    smallDetail.textContent = task.matkul + " · deadline " + task.deadline;

    divInfo.appendChild(spanJudul);
    divInfo.appendChild(smallDetail);

    const btnHapus = document.createElement("button");
    btnHapus.className = "btn-hapus";
    btnHapus.textContent = "X";
    btnHapus.dataset.id = task.id;

    li.appendChild(checkbox);
    li.appendChild(divInfo);
    li.appendChild(btnHapus);

    daftarTugas.appendChild(li);
  });
}

render();
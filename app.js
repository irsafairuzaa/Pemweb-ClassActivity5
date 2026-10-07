let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: Date.now(),
    judul: "Membuat fungsi render",
    matkul: "Pemrograman Web",
    deadline: "2026-10-15",
    selesai: false
  }
];

let currentFilter = "semua";
const infoJumlah = document.querySelector("#info-jumlah");
const filterButtons = document.querySelectorAll(".filter-controls button");

const daftarTugas = document.querySelector("#daftar-tugas");

function render() {
  daftarTugas.innerHTML = "";

  const jumlahAktif = tasks.filter(function(task) {
    return task.selesai === false;
  }).length;
  
  if (tasks.length === 0) {
    infoJumlah.textContent = "Belum ada tugas sama sekali";
  } else {
    infoJumlah.textContent = jumlahAktif + " tugas aktif";
  }

  let tasksDisaring = tasks;
  if (currentFilter === "aktif") {
    tasksDisaring = tasks.filter(function(task) { return !task.selesai; });
  } else if (currentFilter === "selesai") {
    tasksDisaring = tasks.filter(function(task) { return task.selesai; });
  }

  if (tasksDisaring.length === 0 && tasks.length > 0) {
    daftarTugas.innerHTML = "<li style='text-align: center; color: gray;'>Tidak ada tugas di kategori ini</li>";
    return;
  }

  tasksDisaring.forEach(function (task) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "cek-selesai";
    checkbox.checked = task.selesai;
    checkbox.dataset.id = task.id;

    const divInfo = document.createElement("div");
    divInfo.className = "info";

    const spanJudul = document.createElement("span");
    spanJudul.className = "judul";
    spanJudul.textContent = task.judul;
    
    if (task.selesai) {
      spanJudul.style.textDecoration = "line-through";
      spanJudul.style.color = "gray";
    }

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

const formTugas = document.querySelector("#form-tugas");
const inputJudul = document.querySelector("#input-judul");
const selectMatkul = document.querySelector("#select-matkul");
const inputTanggal = document.querySelector("#input-tanggal");
const pesanError = document.querySelector("#pesan-error");

formTugas.addEventListener("submit", function (e) {
  e.preventDefault(); 

  const judul = inputJudul.value.trim();
  const matkul = selectMatkul.value;
  const deadline = inputTanggal.value;

  if (judul.length < 3) {
    pesanError.textContent = "Error: Judul tugas minimal 3 karakter";
    return;
  }
  
  if (!deadline) {
    pesanError.textContent = "Error: Deadline wajib diisi";
    return; 
  }

  pesanError.textContent = "";

  const tugasBaru = {
    id: Date.now(),
    judul: judul,
    matkul: matkul,
    deadline: deadline,
    selesai: false
  };

  tasks.push(tugasBaru);

  render();

  formTugas.reset();
});

daftarTugas.addEventListener("click", function(e) {
  const btnHapus = e.target.closest(".btn-hapus");
  
  if (btnHapus) {
    const idTugas = Number(btnHapus.dataset.id); 
    
    tasks = tasks.filter(function(task) {
      return task.id !== idTugas;
    });
    
    render();
  }
});

daftarTugas.addEventListener("change", function(e) {
  const checkbox = e.target.closest(".cek-selesai");
  
  if (checkbox) {
    const idTugas = Number(checkbox.dataset.id); 
    
    tasks = tasks.map(function(task) {
      if (task.id === idTugas) {
        return { ...task, selesai: checkbox.checked };
      }
      return task;
    });
    
    render();
  }
});

filterButtons.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    filterButtons.forEach(function(b) {
      b.classList.remove("on");
    });
    
    e.target.classList.add("on");
    
    currentFilter = e.target.dataset.filter;
    
    render();
  });
});

function simpanDanRender() {
  tasks.sort(function(a, b) {
    return new Date(a.deadline) - new Date(b.deadline);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  
  render();
}

simpanDanRender();
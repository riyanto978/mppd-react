import Swal from "sweetalert2";
import moment from "moment";

(() => {
  chrome.runtime.onMessage.addListener((ob) => {
    if (ob.type == "write") {
      copyToLocal();
      return;
    }

    let list_td = document.querySelectorAll("td");

    for (let td_index = 0; td_index < list_td.length; td_index++) {
      const element = list_td[td_index];

      if (element.innerText.toLowerCase() == "nama") {
        const nama = list_td[td_index + 2].innerText;

        chrome.runtime.sendMessage({
          message: { type: "nama", value: nama },
        });
      }

      if (element.innerText.toLowerCase() == "nik") {
        const nik = list_td[td_index + 2].innerText;

        chrome.runtime.sendMessage({
          message: { type: "nik", value: nik },
        });
      }

      if (element.innerText.toLowerCase() == "alamat fasyankes") {
        const alamat_fasyankes = list_td[td_index + 2].innerText;

        if (alamat_fasyankes == "" || alamat_fasyankes == "-") {
          Swal.fire({
            title: "Tolak!",
            text: "Alamat Fasyankes Tidak Ada",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }

      if (element.innerText.toLowerCase() == "nama fasyankes") {
        const nama_fasyankes = list_td[td_index + 2].innerText;

        if (nama_fasyankes == "" || nama_fasyankes == "-") {
          Swal.fire({
            title: "Tolak!",
            text: "Nama Fasyankes Tidak Ada",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }

      if (element.innerText.toLowerCase() == "periode sip") {
        let periode_sip = list_td[td_index + 2].innerText;

        let periode_sips = periode_sip.split(" s/d ");

        let tanggal1Dates = periode_sips[0].split(" ");
        let hari1 = parseInt(tanggal1Dates[0], 10);
        let bulan1 = months[tanggal1Dates[1]];
        let tahun1 = parseInt(tanggal1Dates[2], 10);
        let tanggal1 = moment(new Date(tahun1, bulan1, hari1));

        let tanggal2Dates = periode_sips[1].split(" ");
        let hari2 = parseInt(tanggal2Dates[0], 10);
        let bulan2 = months[tanggal2Dates[1]];
        let tahun2 = parseInt(tanggal2Dates[2], 10);
        let tanggal2 = moment(new Date(tahun2, bulan2, hari2));

        let diff = tanggal2.diff(tanggal1, "years", true);

        if (diff < 5) {
          Swal.fire({
            title: "Info",
            text: "Check Sip Pertama",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      }
    }
  });

  let isCopying = false;
  if (window.location.href.startsWith("https://admin.mppdigital.go.id/sim/")) {
    let submitBtn = document.querySelectorAll("button[type='submit']")[0];

    if (submitBtn) {
      submitBtn.id = "form-submit";

      submitBtn.setAttribute("type", "button");

      submitBtn.addEventListener("click", (e) => {
        if (isCopying == true) {
        } else {
          isCopying = true;

          let value = (
            document.getElementsByName("verifikasi")[0] as HTMLInputElement
          ).value;

          if (value == "1") {
            copyToLocal().finally(() => {
              submitBtn.setAttribute("type", "submit");

              document.getElementById("form-submit")?.click();
            });
          } else {
            submitBtn.setAttribute("type", "submit");

            document.getElementById("form-submit")?.click();
          }
        }
      });
    }
  }

  const copyToLocal = () => {
    let list_td = document.querySelectorAll("td");
    let jenis = "";
    let nama = "";

    for (let td_index = 0; td_index < list_td.length; td_index++) {
      const element = list_td[td_index];
      if (element.innerText.toLowerCase() == "jenis izin") {
        jenis = list_td[td_index + 2].innerText;
      }

      if (element.innerText.toLowerCase() == "nama") {
        nama = list_td[td_index + 2].innerText;
      }
    }

    chrome.runtime.sendMessage({
      message: { type: "write", value: { jenis, nama } },
    });

    return Swal.fire({
      title: "Info",
      text: "Telah tercopy",
      icon: "warning",
    });
  };
})();

const months: { [key: string]: number } = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

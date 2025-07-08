(() => {
  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url && !tab.url.startsWith("https://admin.mppdigital.go.id/")) {
      return;
    }

    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { type: "hello" });
    }
  });

  chrome.tabs.onRemoved.addListener(async (tab) => {
    try {
      let result = await chrome.storage.session.get([
        "allMppdTabsId",
        "tolakmppdTabsId",
        "siimutTabsId",
        "sisdmkTabsId",
      ]);

      if (result.allMppdTabsId == tab) {
        chrome.storage.session.set({ allMppdTabsId: 0 });
      }

      if (result.tolakmppdTabsId == tab) {
        chrome.storage.session.set({ tolakmppdTabsId: 0 });
      }

      if (result.siimutTabsId == tab) {
        chrome.storage.session.set({ siimutTabsId: 0 });
      }

      if (result.sisdmkTabsId == tab) {
        chrome.storage.session.set({ sisdmkTabsId: 0 });
      }
    } catch (error) {}
  });

  chrome.commands.onCommand.addListener(async (command) => {
    let [tab] = await chrome.tabs.query({ active: true });

    if (tab.url?.startsWith("https://admin.mppdigital.go.id/")) {
      if (command == "do-script" && tab.id != undefined) {
        chrome.tabs.sendMessage(tab.id, { type: "hello" });
      }

      if (command == "write-script" && tab.id != undefined) {
        chrome.tabs.sendMessage(tab.id, { type: "write" });
      }
    }
  });

  chrome.runtime.onMessage.addListener(async (req) => {
    if (req.message.type == "write") {
      let { jenis, nama } = req.message.value;

      try {
        let { data } = await chrome.storage.local.get(["data"]);
        let res = data == undefined ? [] : JSON.parse(data);

        let finds = res.findIndex((e: any) => e.title == jenis);

        if (finds < 0) {
          res.push({ title: jenis, names: [nama] });
        } else {
          let element = res[finds];

          let findName = element.names.find((e: any) => e == nama);

          if (!findName) {
            res[finds] = { title: jenis, names: [...element.names, nama] };
          }
        }

        chrome.storage.local.set({ data: JSON.stringify(res) });
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (req.message.type == "generate") {
      let [tab] = await chrome.tabs.query({ active: true });

      if (tab.id) chrome.tabs.sendMessage(tab.id, { type: "hello" });
    }

    try {
      let {
        allMppdTabsId = 0,
        tolakmppdTabsId = 0,
        siimutTabsId = 0,
        sisdmkTabsId = 0,
      } = await chrome.storage.session.get([
        "allMppdTabsId",
        "tolakmppdTabsId",
        "siimutTabsId",
        "sisdmkTabsId",
      ]);

      if (req.message.type == "nama") {
        let nama = req.message.value.replaceAll(" ", "+");

        if (allMppdTabsId == 0) {
          chrome.tabs.create(
            {
              url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=all`,
              active: false,
            },
            (tab) => {
              chrome.storage.session.set({ allMppdTabsId: tab.id });
            }
          );
        } else {
          chrome.tabs.update(allMppdTabsId, {
            url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=all`,
            active: false,
          });
        }

        if (tolakmppdTabsId == 0) {
          chrome.tabs.create(
            {
              url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=tolak`,
              active: false,
            },
            (tab) => {
              chrome.storage.session.set({ tolakmppdTabsId: tab.id });
            }
          );
        } else {
          chrome.tabs.update(tolakmppdTabsId, {
            url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=tolak`,
            active: false,
          });
        }

        let res = await chrome.storage.session.get(["role"]);
        const role = res.role ?? "ip";

        if (siimutTabsId == 0) {
          chrome.tabs.create(
            {
              url: `https://izin.semarangkota.go.id:7777/index.php?LaporanSearch%5Bno_agenda%5D=&LaporanSearch%5Bstatus_sip%5D=&LaporanSearch%5Btgl_daftar%5D=&LaporanSearch%5Batas_nama%5D=${nama}&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bnama_sarana%5D=&LaporanSearch%5Blokasi%5D=&LaporanSearch%5Bpemohon_nama%5D=&LaporanSearch%5Bpemohon_alamat%5D=&LaporanSearch%5Bkelurahan%5D=&LaporanSearch%5Bnama_kantor%5D=&LaporanSearch%5Bproses_tahapan%5D=&LaporanSearch%5Bno_sk%5D=&LaporanSearch%5Btgl_sk%5D=&LaporanSearch%5Bspm%5D=&LaporanSearch%5Busername%5D=&r=laporan&ijin=${role}`,
              active: false,
            },
            (tab) => {
              chrome.storage.session.set({ siimutTabsId: tab.id });
            }
          );
        } else {
          chrome.tabs.update(siimutTabsId, {
            url: `https://izin.semarangkota.go.id:7777/index.php?LaporanSearch%5Bno_agenda%5D=&LaporanSearch%5Bstatus_sip%5D=&LaporanSearch%5Btgl_daftar%5D=&LaporanSearch%5Batas_nama%5D=${nama}&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bnama_sarana%5D=&LaporanSearch%5Blokasi%5D=&LaporanSearch%5Bpemohon_nama%5D=&LaporanSearch%5Bpemohon_alamat%5D=&LaporanSearch%5Bkelurahan%5D=&LaporanSearch%5Bnama_kantor%5D=&LaporanSearch%5Bproses_tahapan%5D=&LaporanSearch%5Bno_sk%5D=&LaporanSearch%5Btgl_sk%5D=&LaporanSearch%5Bspm%5D=&LaporanSearch%5Busername%5D=&r=laporan&ijin=${role}`,
            active: false,
          });
        }
      }

      if (req.message.type == "nik") {
        let nik = req.message.value;

        if (sisdmkTabsId == 0) {
          setTimeout(() => {
            chrome.tabs.create(
              {
                url: `https://sisdmk.kemkes.go.id/pencarian/nik_cek`,
                active: false,
              },
              (tab) => {
                sisdmkTabsId = tab.id;
                chrome.storage.session.set({ sisdmkTabsId: tab.id });

                setTimeout(() => {
                  chrome.scripting.executeScript({
                    target: { tabId: sisdmkTabsId },
                    func: changeValue,
                    args: [nik],
                  });
                }, 5000);
              }
            );
          }, 1000);
        } else {
          chrome.scripting.executeScript({
            target: { tabId: sisdmkTabsId },
            func: changeValue,
            args: [nik],
          });
        }
      }
    } catch (error) {}
  });
})();

const changeValue = (value: any) => {
  const nikInput = document.getElementById("nik") as HTMLInputElement | null;
  if (nikInput) {
    nikInput.value = value;
  }

  document.getElementById("cek_nik")?.click();
};

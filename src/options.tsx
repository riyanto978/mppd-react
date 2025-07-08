import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { useIsMount } from "./hooks/useIsMount";
import Swal from "sweetalert2";

type ners = {
  title: string;
  names: string[];
};

const Options = () => {
  const [role, setRole] = useState("");
  const [data, setData] = useState<ners[]>([]);
  const isMount = useIsMount();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await chrome.storage.local.get(["role", "data"]);

        let responseRole = response.role ?? "";
        setRole(responseRole);

        let arr = response.data == undefined ? [] : JSON.parse(response.data);

        setData(arr);
      } catch {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.data?.newValue) {
        let arr =
          changes.data?.newValue == undefined
            ? []
            : JSON.parse(changes.data.newValue);
        setData(arr);
      }
    });
  }, []);

  useEffect(() => {
    if (!isMount) {
      chrome.storage.local.set({ data: JSON.stringify(data) });
    }
  }, [data]);

  return (
    <>
      <div className="p-6 w-full flex flex-col space-y-3">
        <label className="label">Kode</label>

        <select
          id="input-role"
          className="w-1/3 rounded-xl border border-gray-300 px-3 py-3"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            chrome.storage.local.set({ role: e.target.value });
          }}
        >
          <option value="iptg">IPTG/Izin Praktik Teknisi Gigi</option>
          <option value="saltm">
            SALTM/Izin Praktik Teknologi Laboratorium Medik
          </option>
          <option value="sia">SIA/Izin Praktik Apoteker</option>
          <option value="siaa">
            SIAA/Izin Praktik Asisten Apoteker / Teknis Kefarmasian
          </option>
          <option value="sif">SIF/Izin Fisioterapi</option>
          <option value="sikb">
            SIKB/Izin Praktik Bidan pada Sarana Kesehatan
          </option>
          <option value="sikop">SIKOP/Izin Praktik Ortotis Prostetis</option>
          <option value="sikot">SIKOT/Izin Praktik Okupasi Terapis</option>
          <option value="sikpa">SIKPA/Izin Praktik Penata Anestesi</option>
          <option value="sikr">SIKR/Izin Praktik Radiografer</option>
          <option value="sikrm">SIKRM/Izin Praktik Rekam Medis</option>
          <option value="sikro">
            SIKRO/Izin Praktik Refraksionis Optisien
          </option>
          <option value="siksan">SIKSAN/Izin Praktik Sanitarian</option>
          <option value="siktg">SIKTG/Izin Praktik Tenaga Gizi</option>
          <option value="siktw">SIKTW/Izin Praktik Terapis Wicara</option>
          <option value="sip">SIP/Izin Praktik Perawat</option>
          <option value="sipat">SIPAT/Izin Praktik Akupuntur Terapis</option>
          <option value="sipb">
            SIPB/PMB - Izin Praktik Bidan secara Mandiri
          </option>
          <option value="sipdh">SIPDH/Izin Praktik Dokter Hewan</option>
          <option value="sipe">SIPE/Izin Praktik Elektromedis</option>
          <option value="sipfm">SIPFM/Izin Praktik Fisikawan Medik</option>
          <option value="sipg">SIPG/Izin Praktik Terapis Gigi dan Mulut</option>
          <option value="sippg">SIPPG/Izin Praktik Perawat Gigi</option>
          <option value="sippk">SIPPK/Izin Praktik Psikologi Klinis</option>
          <option value="sipte">SIPTE/Izin Praktik Tenaga Epidemiolog</option>
          <option value="siptk">
            SIPTK/Izin Praktik Teknisi Kardiovaskuler
          </option>
          <option value="siptpd">
            SIPTPD/Izin Praktik Teknisi Pelayanan Darah
          </option>
          <option value="siptpki">
            SIPTPKI/Izin Praktik Teknisi Promosi Kesehatan dan Ilmu Perilaku
          </option>
          <option value="ssiptkt">
            SSIPTKT/Surat Izin Praktik Tenaga Kesehatan Tradisional
          </option>
          <option value="stpt">
            STPT/Surat Terdaftar Penyehat Tradisional
          </option>
          <option value="atlm">
            ATLM/Izin PraktikTeknologi Laboratorium Medik
          </option>
          <option value="iaa">
            IAA/Izin Praktik Asisten Apoteker/Teknis Kefarmasian
          </option>
          <option value="if">IF/Izin Fisioterapi</option>
          <option value="ijn60">
            IJN60/Surat Terdaftar Pengobat Tradisional
          </option>
          <option value="ikb">
            IKB/Izin Praktik Bidan pada Sarana Kesehatan
          </option>
          <option value="ikop">IKOP/Izin Praktik Ortotis Prostetis</option>
          <option value="ikot">IKOT/Izin Praktik Okupasi Terapis</option>
          <option value="ikpa">IKPA/Izin Praktik Penata Anestesi</option>
          <option value="ikr">IKR/Izin Praktik Radiografer</option>
          <option value="ikrm">IKRM/Izin Praktik Rekam Medis</option>
          <option value="ikro">IKRO/Izin Praktik Refraksionis Optisien</option>
          <option value="iksan">IKSAN/Izin Praktik Sanitarian</option>
          <option value="iktg">IKTG/Izin Praktik Tenaga Gizi</option>
          <option value="iktw">IKTW/Izin Praktik Terapis Wicara</option>
          <option value="ip">IP/Izin Praktik Perawat</option>
          <option value="ipat">IPAT/Izin Praktik Akupuntur Terapis</option>
          <option value="ipdh">IPDH/Izin Praktik Dokter Hewan</option>
          <option value="ipe">IPE/Izin Praktik Elektromedis</option>
          <option value="ipfm">IPFM/Izin Praktik Fisikawan Medik</option>
          <option value="ipg">IPG/Izin Praktik Terapis Gigi dan Mulut</option>
          <option value="ippg">IPPG/Izin Praktik Perawat Gigi</option>
          <option value="ippk">IPPK/Izin Praktik Psikologi Klinis</option>
          <option value="ipte">IPTE/Izin Praktik Tenaga Epidemiolog</option>
          <option value="sipa">SIPA/Izin Praktik Apoteker</option>
          <option value="sippromkes">
            SIPPROMKES/Izin Praktik Teknisi Promosi Kesehatan dan Ilmu Perilaku
          </option>
          <option value="siptkt">
            SIPTKT/Surat Izin Praktik Tenaga Kesehatan Tradisional
          </option>
          <option value="siptkv">
            SIPTKV/Izin Praktik Teknisi Kardiovaskuler
          </option>
          <option value="sipttd">
            SIPTTD/Izin Praktik Teknisi Pelayanan Darah
          </option>
        </select>
        <div className="p-4 min-w-1/3">
          <ul className="list-decimal  space-y-3">
            {data.map((e, i) => {
              return (
                <React.Fragment key={e.title}>
                  <li className="text-xl font-bold ">
                    {e.title}, Jumlah {e.names.length}
                  </li>

                  <ul className="space-y-2">
                    {e.names.map((nama, index) => (
                      <li className="text-lg flex space-x-2" key={nama}>
                        <div>{nama}</div>

                        <button
                          className="border border-red-400 rounded-md px-2 py-1 text-xs"
                          onClick={() => {
                            setData((prev) => {
                              const edits = [...prev];

                              let names = e.names.filter((e) => e != nama);

                              if (names.length == 0) {
                                let titles = data.filter(
                                  (datas) => e.title != datas.title
                                );

                                return titles;
                              }

                              edits[i].names = names;

                              return edits;
                            });
                          }}
                        >
                          delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        {data.length > 0 && (
          <div className="flex justify-between w-1/3">
            <button
              className="border border-red-500 text-red-400  rounded-lg px-4 py-2"
              onClick={() => {
                setData([]);
                chrome.storage.local.set({ data: JSON.stringify([]) });
              }}
            >
              reset
            </button>

            <button
              className="border border-green-600 text-green-500 rounded-lg px-4 py-2 "
              onClick={() => {
                let texts =
                  "Ijin ibu wonten perizinan di MPPD, mohon berkenan untuk TTE\n";
                let count = 1;
                data.forEach((element) => {
                  texts += `\n${count}. ${element.title}, jumlah ${element.names.length} \n`;

                  element.names.forEach((e) => {
                    texts += `\t- ${e}\n`;
                  });

                  count += 1;
                });

                navigator.clipboard.writeText(texts);

                Swal.fire({
                  title: "Info",
                  text: "Telah tercopy",
                  icon: "warning",
                });
              }}
            >
              copy
            </button>

            {/* <button
            className="border border-green-600 text-green-500 rounded-lg px-4 py-2 "
            onClick={() => {
              setData(initial);
            }}
          >
            extract
          </button> */}
          </div>
        )}
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);

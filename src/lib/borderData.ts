export interface BoundaryPoint {
  id: string;
  name: string;
  dmsLon: string;
  dmsLat: string;
  lat: number; // Decimal degree latitude
  lng: number; // Decimal degree longitude
  type: "PABU" | "PBU" | "TK";
}

// Kantor Wali Nagari Toboh Gadang Details
export const KANTOR_WALI_NAGARI = {
  name: "Kantor Wali Nagari Toboh Gadang",
  lat: -0.6631,  // Central and accessible coordinate on the main road
  lng: 100.2415,
  alamat: "Korong Toboh Olo, Nagari Toboh Gadang, Kecamatan Sintuak Toboh Gadang, Kabupaten Padang Pariaman, Sumatera Barat",
  waliNagari: "NASRI (Wali Nagari Antar Waktu)",
  sekretaris: "YOSMAN YAZID, S.Pd (PLT.)",
  jamKerja: "Senin - Jumat: 08:00 - 16:00 WIB",
  kontak: "tobohgadang04@gmail.com",
  telepon: "+62 812-3456-7890", // Placeholder for actual contact
  layanan: [
    "Surat Keterangan Usaha (SKU)",
    "Surat Keterangan Tidak Mampu (SKTM)",
    "Surat Keterangan Domisili",
    "Surat Keterangan Kelahiran / Kematian",
    "Surat Pengantar Nikah (N1-N4)",
    "Surat Keterangan Ahli Waris"
  ]
};

// Converted boundary pillars from the dataset image
export const BOUNDARY_POINTS: BoundaryPoint[] = [
  // PABU & PBU Series (Pilar Utama)
  {
    id: "PABU-001",
    name: "PABU.13.05.11.2002-11.2004-11.2005.001",
    dmsLon: "100° 14' 18.05379943\" E",
    dmsLat: "00° 40' 09.64292154\" S",
    lat: -0.66934526,
    lng: 100.23834827,
    type: "PABU"
  },
  {
    id: "PBU-003",
    name: "PBU 13.05.03.2002-11.2002.003",
    dmsLon: "100° 14' 41.64168000\" E",
    dmsLat: "00° 39' 16.22408400\" S",
    lat: -0.65450669,
    lng: 100.24490047,
    type: "PBU"
  },
  {
    id: "PBU-001-A",
    name: "PBU 13.05.10.2003-11.2002-11.2004.001",
    dmsLon: "100° 13' 31.49372333\" E",
    dmsLat: "00° 40' 08.49233455\" S",
    lat: -0.66902565,
    lng: 100.22541492,
    type: "PBU"
  },
  {
    id: "PBU-001-B",
    name: "PBU.13.05.11.2002-11.2004.001",
    dmsLon: "100° 13' 53.76759698\" E",
    dmsLat: "00° 40' 09.49114939\" S",
    lat: -0.66930310,
    lng: 100.23160211,
    type: "PBU"
  },
  {
    id: "PBU-002-A",
    name: "PBU.13.05.11.2002-11.2005.002",
    dmsLon: "100° 14' 26.52206140\" E",
    dmsLat: "00° 40' 02.74140320\" S",
    lat: -0.66742817,
    lng: 100.24070057,
    type: "PBU"
  },
  {
    id: "PBU-002-B",
    name: "PBU.13.05.11.2002-11.2005.002",
    dmsLon: "100° 14' 21.27247908\" E",
    dmsLat: "00° 40' 08.49902490\" S",
    lat: -0.66902751,
    lng: 100.23924236,
    type: "PBU"
  },

  // TK.13.05.11.2002-17.2002 Series (Utara / North Segment)
  {
    id: "TK-N-001",
    name: "TK.13.05.11.2002-17.2002.001",
    dmsLon: "100° 13' 55.44704280\" E",
    dmsLat: "00° 39' 08.44750080\" S",
    lat: -0.65234653,
    lng: 100.23206862,
    type: "TK"
  },
  {
    id: "TK-N-002",
    name: "TK.13.05.11.2002-17.2002.002",
    dmsLon: "100° 14' 04.56156600\" E",
    dmsLat: "00° 39' 05.95568880\" S",
    lat: -0.65165436,
    lng: 100.23460044,
    type: "TK"
  },
  {
    id: "TK-N-003",
    name: "TK.13.05.11.2002-17.2002.003",
    dmsLon: "100° 14' 10.36358160\" E",
    dmsLat: "00° 39' 03.33692280\" S",
    lat: -0.65092692,
    lng: 100.23621211,
    type: "TK"
  },
  {
    id: "TK-N-004",
    name: "TK.13.05.11.2002-17.2002.004",
    dmsLon: "100° 14' 13.19431920\" E",
    dmsLat: "00° 39' 01.24094880\" S",
    lat: -0.65034471,
    lng: 100.23699842,
    type: "TK"
  },
  {
    id: "TK-N-005",
    name: "TK.13.05.11.2002-17.2002.005",
    dmsLon: "100° 14' 15.98501040\" E",
    dmsLat: "00° 38' 58.17113880\" S",
    lat: -0.64949198,
    lng: 100.23777361,
    type: "TK"
  },
  {
    id: "TK-N-006",
    name: "TK.13.05.11.2002-17.2002.006",
    dmsLon: "100° 14' 26.02329000\" E",
    dmsLat: "00° 39' 00.41265000\" S",
    lat: -0.65011463,
    lng: 100.24056203,
    type: "TK"
  },
  {
    id: "TK-N-007",
    name: "TK.13.05.11.2002-17.2002.007",
    dmsLon: "100° 14' 27.88320120\" E",
    dmsLat: "00° 39' 00.10276560\" S",
    lat: -0.65002855,
    lng: 100.24107867,
    type: "TK"
  },
  {
    id: "TK-N-008",
    name: "TK.13.05.11.2002-17.2002.008",
    dmsLon: "100° 14' 34.32456240\" E",
    dmsLat: "00° 39' 05.53914360\" S",
    lat: -0.65153865,
    lng: 100.24286793,
    type: "TK"
  },
  {
    id: "TK-N-009",
    name: "TK.13.05.11.2002-17.2002.009",
    dmsLon: "100° 14' 37.35161880\" E",
    dmsLat: "00° 39' 03.88757160\" S",
    lat: -0.65107988,
    lng: 100.24370878,
    type: "TK"
  },
  {
    id: "TK-N-010",
    name: "TK.13.05.11.2002-17.2002.010",
    dmsLon: "100° 14' 36.18183120\" E",
    dmsLat: "00° 39' 06.12423000\" S",
    lat: -0.65170118,
    lng: 100.24338384,
    type: "TK"
  },
  {
    id: "TK-N-011",
    name: "TK.13.05.11.2002-17.2002.011",
    dmsLon: "100° 14' 38.57179200\" E",
    dmsLat: "00° 39' 07.05486600\" S",
    lat: -0.65195969,
    lng: 100.24404772,
    type: "TK"
  },

  // TK.13.05.11.2002-11.2005 Series (Timur / East Segment)
  {
    id: "TK-E-001",
    name: "TK.13.05.11.2002-11.2005.001",
    dmsLon: "100° 14' 44.11877950\" E",
    dmsLat: "00° 39' 11.63334060\" S",
    lat: -0.65323148,
    lng: 100.24558855,
    type: "TK"
  },
  {
    id: "TK-E-002",
    name: "TK.13.05.11.2002-11.2005.002",
    dmsLon: "100° 14' 39.77292518\" E",
    dmsLat: "00° 39' 20.38001060\" S",
    lat: -0.65566111,
    lng: 100.24438137,
    type: "TK"
  },
  {
    id: "TK-E-003",
    name: "TK.13.05.11.2002-11.2005.003",
    dmsLon: "100° 14' 35.73245021\" E",
    dmsLat: "00° 39' 24.51734667\" S",
    lat: -0.65681037,
    lng: 100.24325901,
    type: "TK"
  },
  {
    id: "TK-E-004",
    name: "TK.13.05.11.2002-11.2005.004",
    dmsLon: "100° 14' 34.74231016\" E",
    dmsLat: "00° 39' 28.80790892\" S",
    lat: -0.65800220,
    lng: 100.24298398,
    type: "TK"
  },
  {
    id: "TK-E-005",
    name: "TK.13.05.11.2002-11.2005.005",
    dmsLon: "100° 14' 31.36905958\" E",
    dmsLat: "00° 39' 35.46132321\" S",
    lat: -0.65985037,
    lng: 100.24204696,
    type: "TK"
  },
  {
    id: "TK-E-006",
    name: "TK.13.05.11.2002-11.2005.006",
    dmsLon: "100° 14' 29.63888952\" E",
    dmsLat: "00° 39' 43.64307611\" S",
    lat: -0.66212308,
    lng: 100.24156636,
    type: "TK"
  },
  {
    id: "TK-E-007",
    name: "TK.13.05.11.2002-11.2005.007",
    dmsLon: "100° 14' 28.30477965\" E",
    dmsLat: "00° 39' 47.80644238\" S",
    lat: -0.66327957,
    lng: 100.24119574,
    type: "TK"
  },
  {
    id: "TK-E-008",
    name: "TK.13.05.11.2002-11.2005.008",
    dmsLon: "100° 14' 33.04352306\" E",
    dmsLat: "00° 39' 48.59446447\" S",
    lat: -0.66349846,
    lng: 100.24251207,
    type: "TK"
  },
  {
    id: "TK-E-009",
    name: "TK.13.05.11.2002-11.2005.009",
    dmsLon: "100° 14' 34.11477182\" E",
    dmsLat: "00° 39' 54.31757568\" S",
    lat: -0.66508822,
    lng: 100.24280966,
    type: "TK"
  },
  {
    id: "TK-E-010",
    name: "TK.13.05.11.2002-11.2005.010",
    dmsLon: "100° 14' 41.91978850\" E",
    dmsLat: "00° 39' 53.19679006\" S",
    lat: -0.66477689,
    lng: 100.24497771,
    type: "TK"
  },
  {
    id: "TK-E-013",
    name: "TK.13.05.11.2002-11.2005.013",
    dmsLon: "100° 14' 29.20356947\" E",
    dmsLat: "00° 39' 57.78661691\" S",
    lat: -0.66605184,
    lng: 100.24144541,
    type: "TK"
  },
  {
    id: "TK-E-014",
    name: "TK.13.05.11.2002-11.2005.014",
    dmsLon: "100° 14' 26.17968655\" E",
    dmsLat: "00° 40' 01.77412040\" S",
    lat: -0.66715948,
    lng: 100.24060547,
    type: "TK"
  },
  {
    id: "TK-E-015",
    name: "TK.13.05.11.2002-11.2005.015",
    dmsLon: "100° 14' 20.48187665\" E",
    dmsLat: "00° 40' 05.09376197\" S",
    lat: -0.66808160,
    lng: 100.23902274,
    type: "TK"
  },

  // TK.13.05.11.2002-11.2004 Series (Selatan / South Segment)
  {
    id: "TK-S-001",
    name: "TK.13.05.11.2002-11.2004.001",
    dmsLon: "100° 14' 11.87717694\" E",
    dmsLat: "00° 40' 10.48141584\" S",
    lat: -0.66957817,
    lng: 100.23663255,
    type: "TK"
  },
  {
    id: "TK-S-002",
    name: "TK.13.05.11.2002-11.2004.002",
    dmsLon: "100° 14' 08.73598411\" E",
    dmsLat: "00° 40' 06.27599671\" S",
    lat: -0.66840999,
    lng: 100.23575998,
    type: "TK"
  },
  {
    id: "TK-S-003",
    name: "TK.13.05.11.2002-11.2004.003",
    dmsLon: "100° 14' 06.98286078\" E",
    dmsLat: "00° 40' 09.05029148\" S",
    lat: -0.66918064,
    lng: 100.23527301,
    type: "TK"
  },
  {
    id: "TK-S-004",
    name: "TK.13.05.11.2002-11.2004.004",
    dmsLon: "100° 13' 45.63035804\" E",
    dmsLat: "00° 40' 12.21108628\" S",
    lat: -0.67005863,
    lng: 100.22934177,
    type: "TK"
  },
  {
    id: "TK-S-005",
    name: "TK.13.05.11.2002-11.2004.005",
    dmsLon: "100° 13' 50.66401118\" E",
    dmsLat: "00° 40' 07.96799833\" S",
    lat: -0.66887999,
    lng: 100.23074003,
    type: "TK"
  },
  {
    id: "TK-S-006",
    name: "TK.13.05.11.2002-11.2004.006",
    dmsLon: "100° 13' 54.85076217\" E",
    dmsLat: "00° 40' 06.48738902\" S",
    lat: -0.66846872,
    lng: 100.23190297,
    type: "TK"
  },
  {
    id: "TK-S-007",
    name: "TK.13.05.11.2002-11.2004.007",
    dmsLon: "100° 13' 50.30398601\" E",
    dmsLat: "00° 40' 04.83601109\" S",
    lat: -0.66801000,
    lng: 100.23064000,
    type: "TK"
  },
  {
    id: "TK-S-008",
    name: "TK.13.05.11.2002-11.2004.008",
    dmsLon: "100° 13' 47.85194775\" E",
    dmsLat: "00° 40' 02.71884673\" S",
    lat: -0.66742190,
    lng: 100.22995888,
    type: "TK"
  },
  {
    id: "TK-S-009",
    name: "TK.13.05.11.2002-11.2004.009",
    dmsLon: "100° 13' 39.54117296\" E",
    dmsLat: "00° 40' 02.87398209\" S",
    lat: -0.66746499,
    lng: 100.22765033,
    type: "TK"
  },
  {
    id: "TK-S-010",
    name: "TK.13.05.11.2002-11.2004.010",
    dmsLon: "100° 13' 35.36039897\" E",
    dmsLat: "00° 40' 05.38981346\" S",
    lat: -0.66816384,
    lng: 100.22648899,
    type: "TK"
  },
  {
    id: "TK-S-011",
    name: "TK.13.05.11.2002-11.2004.011",
    dmsLon: "100° 13' 32.78561026\" E",
    dmsLat: "00° 40' 07.23362092\" S",
    lat: -0.66867601,
    lng: 100.22577378,
    type: "TK"
  },

  // TK.13.05.03.2002-11.2002 Series (Barat / West Segment)
  {
    id: "TK-W-001",
    name: "TK.13.05.03.2002-11.2002.001",
    dmsLon: "100° 13' 44.31596160\" E",
    dmsLat: "00° 39' 10.91264400\" S",
    lat: -0.65303129,
    lng: 100.22897666,
    type: "TK"
  },
  {
    id: "TK-W-002",
    name: "TK.13.05.03.2002-11.2002.002",
    dmsLon: "100° 13' 42.52833480\" E",
    dmsLat: "00° 39' 13.20114960\" S",
    lat: -0.65366699,
    lng: 100.22848009,
    type: "TK"
  },
  {
    id: "TK-W-003",
    name: "TK.13.05.03.2002-11.2002.003",
    dmsLon: "100° 13' 43.62199320\" E",
    dmsLat: "00° 39' 14.08897440\" S",
    lat: -0.65391360,
    lng: 100.22878389,
    type: "TK"
  },
  {
    id: "TK-W-004",
    name: "TK.13.05.03.2002-11.2002.004",
    dmsLon: "100° 13' 41.64168000\" E",
    dmsLat: "00° 39' 16.22408400\" S",
    lat: -0.65450669,
    lng: 100.2282338,
    type: "TK"
  },
  {
    id: "TK-W-005",
    name: "TK.13.05.03.2002-11.2002.005",
    dmsLon: "100° 13' 38.68221000\" E",
    dmsLat: "00° 39' 14.71211280\" S",
    lat: -0.6540867,
    lng: 100.22741173,
    type: "TK"
  },
  {
    id: "TK-W-006",
    name: "TK.13.05.03.2002-11.2002.006",
    dmsLon: "100° 13' 37.99407000\" E",
    dmsLat: "00° 39' 15.24070800\" S",
    lat: -0.65423353,
    lng: 100.22722058,
    type: "TK"
  },
  {
    id: "TK-W-007",
    name: "TK.13.05.03.2002-11.2002.007",
    dmsLon: "100° 13' 36.93615600\" E",
    dmsLat: "00° 39' 17.65654200\" S",
    lat: -0.6549046,
    lng: 100.22692671,
    type: "TK"
  },
  {
    id: "TK-W-008",
    name: "TK.13.05.03.2002-11.2002.008",
    dmsLon: "100° 13' 33.72693600\" E",
    dmsLat: "00° 39' 20.03478480\" S",
    lat: -0.65556522,
    lng: 100.22603526,
    type: "TK"
  },
  {
    id: "TK-W-009",
    name: "TK.13.05.03.2002-11.2002.009",
    dmsLon: "100° 13' 33.06406080\" E",
    dmsLat: "00° 39' 20.60634240\" S",
    lat: -0.65572398,
    lng: 100.22585113,
    type: "TK"
  },
  {
    id: "TK-W-010",
    name: "TK.13.05.03.2002-11.2002.010",
    dmsLon: "100° 13' 37.23430440\" E",
    dmsLat: "00° 39' 24.29065080\" S",
    lat: -0.6567474,
    lng: 100.22700956,
    type: "TK"
  },
  {
    id: "TK-W-011",
    name: "TK.13.05.03.2002-11.2002.011",
    dmsLon: "100° 13' 37.68794040\" E",
    dmsLat: "00° 39' 26.22245400\" S",
    lat: -0.65728401,
    lng: 100.22713554,
    type: "TK"
  },
  {
    id: "TK-W-012",
    name: "TK.13.05.03.2002-11.2002.012",
    dmsLon: "100° 13' 36.09150240\" E",
    dmsLat: "00° 39' 28.25729280\" S",
    lat: -0.65784925,
    lng: 100.22669208,
    type: "TK"
  },
  {
    id: "TK-W-013",
    name: "TK.13.05.03.2002-11.2002.013",
    dmsLon: "100° 13' 41.03485320\" E",
    dmsLat: "00° 39' 37.69827840\" S",
    lat: -0.66047174,
    lng: 100.22806523,
    type: "TK"
  },
  {
    id: "TK-W-014",
    name: "TK.13.05.03.2002-11.2002.014",
    dmsLon: "100° 13' 34.73036760\" E",
    dmsLat: "00° 39' 47.86359120\" S",
    lat: -0.66329544,
    lng: 100.22631399,
    type: "TK"
  }
];

// Reorders the segments to form a closed polygon loop around Toboh Gadang:
// North (W -> E) -> East (N -> S) -> South (E -> W) -> West (S -> N)
export function getPolygonCoordinates(): [number, number][] {
  const north = BOUNDARY_POINTS.filter(p => p.id.startsWith("TK-N")).sort((a, b) => a.lng - b.lng);
  const east = BOUNDARY_POINTS.filter(p => p.id.startsWith("TK-E")).sort((a, b) => b.lat - a.lat);
  const south = BOUNDARY_POINTS.filter(p => p.id.startsWith("TK-S")).sort((a, b) => b.lng - a.lng);
  const west = BOUNDARY_POINTS.filter(p => p.id.startsWith("TK-W")).sort((a, b) => a.lat - b.lat);

  const closedLoop = [...north, ...east, ...south, ...west];
  return closedLoop.map(p => [p.lat, p.lng]);
}

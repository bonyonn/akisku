// ------------------------
// LAYER 1: PUZZLE
// ------------------------

const title = document.getElementById("title");   
const finalText = "RAHASIA NEGARA";
const chars = "!@#$%^&*()_+=-{}[]|:;'<>,.?/ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function animateTitleLoop() {
  let index = 0;

  const interval = setInterval(() => {
    const display = finalText
      .split("")
      .map((char, i) => {
        if (i < index) return finalText[i];
        return randomChar();
      })
      .join("");

    title.textContent = display;

    index++;
    if (index > finalText.length) clearInterval(interval);
  }, 100);

  setTimeout(animateTitleLoop, 3000); // loop animasi setiap 3 detik
}

// mulai animasi pertama
animateTitleLoop();

// Fungsi validasi input puzzle
function checkPuzzle() {
  const input = document.getElementById("puzzleInput").value
    .toLowerCase()
    .replace(/\s/g, '');

  const correctAnswers = ["dedeakis", "dede akis"];
  const warning = document.getElementById("warning");
  const successMessage = document.getElementById("successMessage");
  const overlay = document.getElementById("transitionOverlay");

  if (correctAnswers.includes(input)) {
    warning.classList.add("hidden");
    successMessage.classList.remove("hidden");

    // Munculkan overlay hitam setelah 2 detik
    setTimeout(() => {
      overlay.classList.remove("hidden");
      overlay.classList.add("show");
    }, 2000);

    // Arahkan ke halaman berikutnya setelah transisi
    setTimeout(() => {
      window.location.href = "halaman-lanjut.html";
    }, 3500);
  } else {
    warning.classList.remove("hidden");
  }
}

// ------------------------
// LAYER 2: QUIZ KEMESRAAN PASANGAN
// ------------------------

// ==== LAYER 2: KUIS KEMESRAAN PASANGAN ====
const quizData = [
  { q: "Tim sepak bola favorit?", a: "Manchester United" },
  { q: "Tim eSports favorit?", a: "RRQ" },
  { q: "Hobi?", a: "Main game, nonton" },
  { q: "Tanggal lahir?", a: "7 Desember 2000" },
  { q: "Tempat date apa yang pengen dikunjungi?", a: "Museum date" },
  { q: "Makanan favorit?", a: "Ayam Geprek" },
  { q: "Jumlah kucing?", a: "3" },
  { q: "Genre film favorit?", a: "Horor" },
  { q: "Apa yang bikin aku tertarik sama kamu?", a: "Pintar dan pengertian" },
  { q: "Apa yang jadi prioritas aku diantara kamu, RRQ, ML, streaming?", a: "Kamu, RRQ, ML, streaming" }
];

// Fungsi submit quiz
function submitQuiz() {
  let score = 0;

  quizData.forEach((item, index) => {
    const selected = document.querySelector(`select[name="q${index + 1}"]`).value;
    if (selected && selected === item.a) score++;
  });

  let feedback = "", emoticon = "";

  if (score >= 9) {
    feedback = "Kamu tahu aku luar dalam. Gak nyangka bisa sekompak ini. Salut!";
    emoticon = "💖";
  } else if (score >= 6) {
    feedback = "Lumayan ngerti, tapi masih banyak yang kamu lewatin. Perhatiin lagi, ya.";
    emoticon = "😊";
  } else if (score >= 3) {
    feedback = "Kita udah lama deket, tapi kamu masih banyak gak tahu soal aku. Sedikit kecewa sih.";
    emoticon = "😬";
  } else {
    feedback = "Kamu beneran pernah deket sama aku gak sih? Yang kamu isi barusan nyakitin juga sebenernya.";
    emoticon = "💔";
  }

  const modal = document.createElement("div");
  modal.className = "result-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Hasil Kuis</h2>
      <p><strong>Skor:</strong> ${score}/10</p>
      <p><strong>Emotikon:</strong> ${emoticon}</p>
      <p>${feedback}</p>
      <button id="nextStageBtn">Lanjut ke Stage Selanjutnya</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("nextStageBtn").addEventListener("click", () => {
    window.location.href = "layer3.html";
  });

  fetch("https://script.google.com/macros/s/AKfycbxYwTv2HGnCSjgWTcZMtTxl3V4a6p1VUtHLkzJRypVAQBdHpI2hqFajjAjEol-ZgIq3HA/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: {
        nama: "Dede Akis ❤️",
        skor: `${score}/10`,
        emotikon: emoticon,
        kalimat: feedback
      }
    })
  });
}

// ===== script-layer3.js START =====
document.addEventListener('DOMContentLoaded', () => {
    const envelopeContainer = document.getElementById("envelopeContainer");
    const envelopeSeal = document.getElementById("envelopeSeal");
    const question = document.getElementById("question");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const sweetMessage = document.getElementById("sweetMessage");
    const music = document.getElementById("backgroundMusic");
    const muteBtn = document.getElementById("muteBtn");
    const heartsContainer = document.getElementById("heartsContainer");
    const nextBtn = document.getElementById("nextBtn");
    const floatingPhoto = document.getElementById("floatingPhoto");

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heartsContainer.appendChild(heart);
    }

    muteBtn.addEventListener("click", () => {
        music.muted = !music.muted;
        muteBtn.textContent = music.muted ? "Unmute Musik" : "Mute Musik";
    });

    music.play().catch(err => {
        console.log("Autoplay diblokir:", err);
        const autoplayMessage = document.createElement("div");
        autoplayMessage.className = "autoplay-message";
        autoplayMessage.innerHTML = `<p>Klik di mana saja untuk memutar musik 🎵</p>`;
        document.body.appendChild(autoplayMessage);
        document.body.addEventListener("click", () => {
            music.play().then(() => {
                autoplayMessage.remove();
            }).catch(err => {
                console.error("Gagal muter musik:", err);
            });
        }, { once: true });
    });

    music.addEventListener('error', (e) => {
        console.error("Gagal muat musik:", e);
        alert("Maaf, musik gagal dimuat. Pastikan file 'boba_date.mp3' ada di folder yang benar.");
    });

    envelopeSeal.addEventListener("click", () => {
        envelopeContainer.classList.add("closing");
        setTimeout(() => {
            envelopeContainer.classList.add("hidden");
            question.classList.remove("hidden");
            question.classList.add("show");
        }, 1300);
    });

    yesBtn.addEventListener("click", () => {
        question.style.opacity = "0";
        setTimeout(() => {
            question.classList.add("hidden");
            const popup = document.createElement("div");
            popup.className = "popup";
            popup.innerHTML = `
                <p>Horeee!!! Dede Akis masih mau sama aku!!! 😭❤️ Aku janji gak bakal nyebelin (tapi boong dikit 😜)</p>
                <button id="closePopupBtn">Next</button>
            `;
            document.body.appendChild(popup);
            document.getElementById("closePopupBtn").addEventListener("click", closePopup);
        }, 500);
    });

    noBtn.addEventListener("click", () => {
        const maxX = window.innerWidth - noBtn.offsetWidth - 40;
        const maxY = window.innerHeight - noBtn.offsetHeight - 40;
        const newX = Math.max(40, Math.min(maxX, Math.random() * maxX));
        const newY = Math.max(40, Math.min(maxY, Math.random() * maxY));
        noBtn.style.position = "absolute";
        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
        noBtn.style.transition = "all 0.3s ease";

        const noMessagePopup = document.createElement("div");
        noMessagePopup.className = "no-message-popup";
        noMessagePopup.innerHTML = `<p>Yakin ga sayang? 😏</p>`;
        document.body.appendChild(noMessagePopup);
        setTimeout(() => {
            noMessagePopup.remove();
        }, 2000);
    });

    function closePopup() {
        document.querySelector(".popup").remove();
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        sweetMessage.classList.remove("hidden");
        sweetMessage.style.display = "block";
        sweetMessage.style.opacity = "1";

        if (nextBtn) {
            nextBtn.classList.remove("hidden");
            nextBtn.style.display = "inline-block";
        }

        if (floatingPhoto) {
            floatingPhoto.classList.add("show");
        }
    }
});

// ===== layer4.js START =====
const chapters = [
  [
    "Tepat pada pukul 05:20 WIB, di situlah aku pertama kali “bertemu” dengan kamu… waktu itu kamu yang duluan nge-reach aku lewat aplikasi berlogo pesawat kertas ✈️. Dan itu jadi awal mula dari semuanya—yang nggak cuma bikin semua ini terjadi, tapi juga ngubah hidupku... dan mungkin juga ngubah hidupmu 💫",
    "Waktu itu, entah apa yang ada di pikiran kamu sampai seniat itu manipulasi umur sama tingkat pendidikan. Pas aku tanya, “Kamu masih sekolah?” kamu dengan pedenya jawab, “Kelas 1 SMK.” Dan aku? Langsung percaya aja tanpa mikir panjang 😅 Mungkin kalau kamu jujur dari awal, cerita kita udah tamat hari itu juga.",
    "Setelah ngobrol makin intens dari tanggal 22 April, kita sepakat pindah ke WA—biar lebih personal wkwk 😜 nggak alter-an lagi. Intermezo dikit, tapi setelah aku baca ulang chat kita di Telegram, ternyata hobi ribut udah muncul dari zaman bocil 😭 Meskipun sekarang juga masih bocil sih 🤪",
    "Nah, masuk ke bagian yang paling bikin aku kaget dan excited… waktu kamu bilang, “Aku gadis Bandung,” aku langsung seneng banget 😍 Soalnya, dapet cewek satu kota tuh rasanya kayak dapet jackpot. Terus aku nanya, “Bandung mana? Soalnya aku sekolah di Bandung juga.” Dan di luar prediksi BMKG, kamu jawab, “Antapani.” Damn. Di situ perasaanku langsung campur aduk 😳 dalam hati aku nanya, “Apakah ini yang disebut takdir itu, God?” 😭✨",
    "Karena makin penasaran, aku lanjut nanya, “Antapaninya di mana?” Kirain bakal jauh dari tempat aku… eh kamu jawab, “Sukalaksana.” Anjir 😭 Disitulah aku mulai bilang ke diriku sendiri: “Ini jodohku udah muncul ke permukaan.” Soalnya kalau bukan jodoh, mana mungkin kebetulannya bisa sedeket dan sespesial itu wkwk ❤️"
  ],
  [
    "Ini merupakan salah satu momen titik terendah dalam hidupku—karena kita harus dipisahkan, bukan karena kehendak kita berdua, tapi karena campur tangan orang lain. Yang lebih menyakitkan, perpisahan itu bukan terjadi secara baik-baik. Ada tekanan yang begitu besar, sampai bikin mental aku kena… sampai akhirnya anxiety-ku kambuh, dan aku susah tidur tiap malam.",
    "Waktu itu aku masih berharap semua ini cuma prank. Aku berharap itu hanya chat iseng dari kamu yang lagi pura-pura marah. Tapi ternyata… harapan itu cuma angan-angan kosong yang langsung pecah di depan mata.",
    "Aku masih ingat detail kejadiannya dengan jelas—karena semuanya masuk ke dalam core memory aku. Malam itu, awalnya terasa biasa aja, tenang dan damai seperti malam-malam sebelumnya. Sampai akhirnya, tiba-tiba ada notif masuk dari DM Instagram. Aku pikir kamu yang nge-DM… tapi begitu aku buka, keringat dingin langsung keluar. Satu per satu kata-kata kasar dan makian dari beliau masuk ke mataku. Dan jujur, saat itu aku nggak berani ngerespon.",
    "Aku takut beliau tau semuanya tentang aku—sampai ke mana aku kuliah. Ketakutan makin besar saat pikiranku mulai muter ke arah yang lebih buruk: gimana kalau beliau lapor ke kampus? Gimana kalau aku di-DO? Pikiran itu terus muter-muter di kepalaku… bikin aku nggak bisa tidur sama sekali. Bahkan kalaupun bisa tidur, aku cuma kebangun tiap 15 menit karena cemas. Mimpi-mimpinya pun ikut kacau—mulai dari mimpi yang bikin aku lega karena ternyata semua itu cuma prank, sampai ke mimpi paling buruk yang pernah aku bayangkan seumur hidupku 💭",
    "Rasa takut, deg-degan, dan keringat dingin di hari itu… masih kebayang jelas sampai detik ini.",
    "Makanya, waktu itu aku nggak berani bales chat kamu. Tapi kamu… entah kenapa masih bisa sempat nge-chat aku, padahal kamu juga lagi ada di titik terberat hidupmu—kamu baru aja operasi usus buntu dan aku belum sempat minta maaf… atas semua beban pikiran yang mungkin aku tambah ke kamu, disaat fisik dan mental kamu juga lagi lemah.",
    "Jadi lewat kesempatan ini, aku mau minta maaf sebesar-besarnya… 🙏 Maaf karena semua itu terjadi. Dan aku cuma bisa berharap—semoga kejadian seperti itu adalah yang pertama dan terakhir kalinya dalam hidup kita berdua. Aamiin 🤍"
  ],
  [
    "Dulu, setelah kejadian itu, entah kenapa aku bisa chat-an lagi sama kamu. Aku lupa tepatnya kapan, tapi yang aku inget... waktu itu kamu lagi deket sama cowok yang ada di pesantren, atau… di mana gitu—lupa lagi 😅 Kamu masih inget gak sih? Wkwkwk.",
    "Waktu itu kamu curhat ke aku soal cowok yang kamu suka di pesantren. Katanya kalian sering saling kirim surat, terus sampe ketauan dan akhirnya dihukum—dimasukin kolam, bahkan dijemur di lapangan 🤣 Mampus! WKWKWK canda babe.",
    "Jujur ya, di situ aku seneng banget, karena kamu udah bisa move on dan bisa deket sama cowok yang seumuran. Walaupun... yaa, ada sedikit 🤏🏻 rasa sakit hati, tapi gapapa. Semua itu demi kebaikanmu kok xixixi 😌",
    "Waktu itu aku mulai mikir buat ngejauh dari kamu… cuman aku bingung caranya gimana. Soalnya kalo tiba-tiba ngilang, takutnya kamu mikir aku cemburu lagi (padahal emang iya sih 🥲). Untungnya dewi fortuna muncul… yaitu kamu tiba-tiba nanya: 'Kamu juga pasti udah punya cewek, kan?'",
    "Dan boom! itu kesempatan emas buat aku pelan-pelan pergi. Aku langsung jawab, 'Iya, punya. Orangnya cantik lagi nanti kamu iri?' (Halu, padahal belum punya siapa-siapa 😭)",
    "Terus kamu bales, 'Oh, mana? Coba pengen liat.' Aku udah bisa nebak kamu bakal nanya itu, dan aku udah siapin jawabannya: 'Orangnya cantik, nanti kamu iri lagi 😜' Jawab kayak gitu tuh tujuannya biar kamu ilfeel banget sama aku—biar kamu benci dan ninggalin aku. Sadis ya, tapi saat itu aku pikir, itu cara paling cepat dan nggak nyakitin kamu secara langsung.",
    "Tapi kamu emang nggak gampang nyarah. Kamu makin kepo, terus ngebujuk pengen liat fotonya. Yaudah, akhirnya aku kirim foto temen kuliahku yang kebetulan emang sering chat-an sama aku waktu itu.",
    "Dan... yup. Rencana aku berhasil. Setelah itu kamu mulai dry text, mulai ngerespon seadanya. Tapi aku lupa, apa yang bikin kita bener-bener berhenti chat-an setelah itu. Kalau kamu masih inget, nanti boleh dong kasih tau aku setelah ini hehe 🥹 Lafyuu 💋"
  ],
  [
    [
      "Kalau disuruh jawab satu kata buat menggambarkan perjalanan romansaku dari tanggal 23 Juni 2024 sampai detik ini, aku pasti akan jawab: GENGSI.",
      "Seperti kata orang-orang bijak, “Jodoh itu akan menemukan jalannya sendiri.” Begitu juga kita. Udah berapa kali dipisahkan, tapi tetap aja selalu bisa ketemu dan nyatu lagi. Walaupun jalannya penuh rintangan. Kalo diibaratin game, kisah cinta kita tuh kayak mode petualangan level hardcore—susah, bikin stres, tapi bikin nagih wkwkwk.",
      "Balik lagi ke topik. Kenapa aku bilang gengsi? Karena bahkan saat kita mulai contact-an lagi, aku nggak langsung chat kamu. Aku cuma ngode—like-like story kamu, berharap kamu sadar. Tapi kamu nggak peka, atau mungkin waktu itu kamu lagi deket sama cowok lain, aku juga nggak tau. Karena capek ngode doang tapi nggak direspon, akhirnya aku beranikan diri buat nge-DM kamu... dengan modus mabar 😅",
      "Sebelum nge-DM, aku aktifin fitur “pesan sementara” biar kalau nggak dibales dalam 24 jam, pesannya hilang sendiri—jadi bisa pura-pura nggak pernah ngechat WKWKWK. Untungnya kamu bales juga, mungkin kamu kasian sama aku, meskipun balasanmu drytext banget 🥶"
    ],
    [
      "Tapi aku tetap usaha cari topik biar obrolan jalan terus, dan akhirnya kita pindah ke WA. Setelah ngobrol lama, suasananya mulai cair, dan kita pun saling tukar IG. Atau lebih tepatnya, aku yang minta IG kamu karena aku kepo... selama kita nggak bareng, kamu deket sama siapa aja.",
      "Dan ya… aku nyesel. Buka DM kamu lumayan bikin hati ngilu, tapi aku nggak berani ngomong karena ya… GENGSI.",
      "Tapi dibalik itu semua aku happy karena bisa megang ke 3 akun mu, itu menandakan aku dipercaya sama kamu.",
      "Kamu bilang suka main Telegram, dan pas aku cek, ternyata last seen kamu masih kemarin. Di situ aku pengen banget nanya: “Kamu bikin akun Telegram buat apa?” Tapi lagi-lagi… aku nggak berani. Karena gengsi.",
      "Aku juga masih inget waktu aku bilang: 'Kalau kamu udah mulai sekolah, pasti bakal ada cowok baru yang deketin.' Gatau kenapa aku punya feeling kuat soal itu… dan bener aja. Baru awal masuk udah ada aja yang ngegodain kamu. Apalagi waktu kamu cerita tentang yang camp. Kamu curhat ke aku, tapi aku malah pura-pura nggak peduli dan bilang: “Yaudah sok aja atuh, bagus seumuran juga.” Padahal dalam hati mah… nyesek, pengen nangis. Tapi lagi-lagi, aku tahan… karena GENGSI 😔"
    ],
    [
      "Oh iya, kamu masih inget gak dulu waktu aku minta foto kamu yang pake sorban? Nah, foto itu aku jadiin PP Mobile Legends aku dengan nama whippedcream wkwk. Rencananya sih aku mau bikin surprise buat kamu—pengen ngajak kamu mabar, terus kamu baru sadar kalo itu aku... lucu gak sih? 😭 Tapi entah kenapa, tiap aku ajak kamu mabar, pasti kamu nolak terus. Selalu ada aja alasannya.",
      "Padahal kamu sering bilang kalo kamu sering mabar sama temen kamu... bahkan sama mantan kamu juga. Jujur aja, itu bikin kecewa, tapi ya… aku pendam aja. GENGSI kalo bilang.",
      "Makin ke sini kamu makin deket sama temen cowok kamu di sekolah. Dari yang suka ngetreat kamu jajanan, ngelus kepala, sampai boncengin kamu pulang—dan ditembak di jalan pula. Sumpah, itu bikin aku pengen nangis banget. Tapi aku bisa apa? Selain pura-pura gak peduli, pura-pura gak liat. Aku gak mau bilang aku cemburu... karena GENGSI.",
      "Banyak hal-hal kecil yang sebenernya pengen banget aku tanyain ke kamu. Kayak: Kalau dibonceng cowok, duduknya gimana? Nyamping atau biasa sambil meluk? Di kelas kamu duduk sama siapa? Kalau istirahat, ke kantin bareng siapa? Tapi aku tahan semua rasa penasaran itu... karena aku takut dapet jawaban yang nyakitin. Jadi aku milih buat gak nanya. Karena, lagi-lagi… GENGSI.",
      "Waktu aku beliin kamu boneka, sebenernya alasannya bukan karena aku pengen ngasih sesuatu buat nemenin kamu pas kangen aku. Tapi karena aku iri. Kamu dikasih bucket boneka sama cowok lain pas graduation, dan aku ngerasa... aku juga harus ada di antara barang-barang pemberian ke kamu. Aku pengen gak ada cowok lain yang ‘nempel’ ke kamu, bahkan dalam bentuk boneka. Tapi tentu… aku gak bilang. Karena ya… kamu udah tau jawabannya: GENGSI 😞"
    ],
    [
      "Tanggal 15 Maret jadi titik di mana aku pengen ngetes diri sendiri: “Bisa gak sih hidup tanpa kamu?” Makanya aku mulai cari-cari alasan buat bikin kamu kesel. Aku pengen kamu yang mutusin duluan. Minimal kita break. Tapi ternyata kita gak benar-benar putus, cuma sepakat buat tanpa status untuk waktu yang gak ditentukan.",
      "Awalnya aku lega. Tapi… perasaan lega itu gak bertahan lama. Gak nyampe 12 jam, aku udah kangen kamu lagi. Hidupku rasanya hampa. Dan akhirnya aku ngechat kamu lagi, pake modus strike TikTok buat mulaiin obrolan.",
      "Sejak saat itu, aku sadar… aku gak bisa jauh dari kamu. Dan perlahan aku mulai ubah sikapku. Gatau kamu sadar atau enggak, tapi sejak kejadian itu aku jadi selalu fast respon. Aku jadi lebih sering ngalah. Karena aku gak mau kehilangan kamu lagi, babe 🫶🏻",
      "Jadi dulu, maaf ya... kalo aku sering bikin kamu badmood, sampai nangis. Sering jutek atau dingin. Padahal itu cuma reaksi aku saat lagi cemburu sama kamu. Jadi kalau ke depannya aku tiba-tiba berubah dan bikin kamu kesel, bisa jadi itu tanda aku lagi... cemburu 😅",
      "Sayangnya, aku baru sadar betapa butuhnya aku sama kamu... terlambat. Baru sebentar kita tanpa status, tapi cowok-cowok udah ngantri. Dan puncaknya... waktu kamu mulai masukin cowok lain ke SG, terus bilang: 'Emang kita ada status?' Sumpah. Itu sakit banget. Marah juga. Iya, aku tau aku yang salah karena nyia-nyiain kamu. Tapi aku gak nyangka kamu bakal seberani itu ngomong kayak gitu.",
      "Dan di posisi LDR kayak gini, aku cuma bisa ngeliatin kamu dari jauh. Ngelike story kamu… sambil nahan sakit.",
      "Sedangkan aku? Gak pernah masuk SG kamu. Jangankan muka, nama aku di jersey aja kamu sensor. Aku gak tau… mungkin kamu jaga perasaan cowok lain, atau ada alasan lain. Aku juga gak kepo. Karena ya… GENGSI buat nanya hal begituan.",
      "Dan sekarang, waktu aku nulis ini… mata aku berkaca-kaca. Karena rasanya kayak callback semua rasa sakit, cemburu, kecewa, dan sedih yang selama ini aku pendem. Semuanya numpuk. Tapi gapapa… aku tulis semua ini karena aku emang sayang sama kamu. Beneran.",
      "Jadi ya, kalau kamu nanya kenapa aku kadang suka aneh, suka dingin, suka pura-pura gak peduli… itu semua bukan karena aku gak sayang, tapi justru karena aku terlalu sayang. Tapi aku kalah sama satu hal—gengsi. Dan sampai detik ini, aku masih belajar buat ngelawan itu… demi kita. Karena, meskipun gengsi yang dulu bikin aku kehilangan, sekarang aku sadar, aku gak mau kehilangan kamu lagi.",
      "Kamu masi inget yang kamu waktu itu kaya ngeramal gitu apa ya lupa lagi namanya yang kamu sebut nama terus sambik nunjuk ayat dalam quran gitu, nah sebenrnya aku juga ikutan seneng ketika tau jawabannya cuman aku berlaga cuek aja gak peduli karena GENGSI aku tinggi.",
      "Dan di titik ini, setelah semua yang udah kita laluin... aku tau, perasaan ini lebih dari sekadar cerita masa lalu. Ini tentang perjuangan. Dan perjuangan ini belum selesai."
    ]
  ],
  [
    "Udah dulu deh curhatnya, takut tahun depan gak ada yang bisa diceritain lagi wkwk. Tapi kalau tahun depan kita masih sama-sama (aamiin yang kenceng 🫶🏻), kayaknya aku bakal rutin nulis beginian tiap tahun deh. Semoga kamu gak bosen ya bacain ocehan panjang dari aku ini, Dede Akis 😠💕",
    "Gak kerasa ternyata aku nulis ini udah 10 halaman di Word wkwk. Tapi jujur aja, gak berasa pegal sama sekali. Mungkin karena aku seneng banget nulisnya, soalnya ini aku buat spesial buat orang tercinta. 💋",
    "Intinya cuma satu: Jika ada 1000 orang yang mencintaimu, aku salah satunya. Jika ada 100 orang yang mencintaimu, aku pasti termasuk di antaranya. Jika hanya 10 orang yang mencintaimu, aku tetap ada di sana. Jika hanya 1 orang yang mencintaimu, yakinlah itu aku. Dan jika tak ada seorang pun yang mencintaimu… maka aku telah tiada, tapi cintaku tetap hidup.",
    "Di hari yang spesial ini, aku ingin berkomitmen serius sama kamu, Kis. Jadi... Maukah kamu jadi pacarku dan melanjutkan kisah ini bareng aku?",
    "Aku gak mau perhatianmu kebagi ke cowo lain. Aku ingin jadi satu-satunya orang yang bisa dapetin semua itu. Dan satu hal lagi: aku pengen banget bisa pamerin Dede Gemashku ini di sosmed, tapi ya kamu masih bocil, jadi harus sabar dulu 😠 Makanya cepet gede ya! Biar aku juga bisa ikutan pamer pacar kayak orang-orang 😤✨",
    "Pas kamu nanti sweet seventeen, aku janji kita rayain bareng. Aku pasti ke Bandung, beneran. Aku takut kamu ngerayainnya bukan sama aku tapi sama cowo lain wkwk",
    "Oh iya, satu hal lagi yang belum kelar… Jangan lupa aku masih nunggu jurnalmu itu lohh!! Cepet selesain ya, aku pengen banget baca 🫶🏻",
    "Jadi segitu dulu ya uneg uneg dariku... Lafyuuu my endless love, Dede Akis. Makasih udah baca sampe akhir, kamu luar biasa banget.",
    "Dari aku, Bonyon – 4 April 2025 Untuk kamu, Dede Akis – 18 April 2025 💐"
  ]
];

let currentPage = 0;
let ch4Segment = 0;
let currentParagraphIndex = 0;

function startBook() {
  const intro = document.getElementById('intro');
  const book = document.getElementById('book');
  const chapter1 = document.getElementById('chapter1');
  if (!intro || !book || !chapter1) {
    console.error('Required elements not found: intro, book, or chapter1');
    return;
  }
  intro.style.display = 'none';
  book.style.display = 'block';
  chapter1.classList.add('active');
  currentParagraphIndex = 0;
  typeText('ch1-content', chapters[0], 0);
}

function nextPage(page) {
  console.log('nextPage called with page:', page);
  const currentChapter = document.getElementById(`chapter${page}`);
  const nextChapter = document.getElementById(`chapter${page + 1}`);
  if (!currentChapter || !nextChapter) {
    console.error(`Chapter elements not found: chapter${page} or chapter${page + 1}`);
    return;
  }
  currentChapter.classList.remove('active');
  nextChapter.classList.add('active');
  currentPage = page;
  console.log('Updated currentPage to:', currentPage);
  currentParagraphIndex = 0;
  if (page === 3) {
    ch4Segment = 0;
    showSegment(0);
  } else {
    typeText(`ch${page + 1}-content`, chapters[page], 0, page === 4 ? showQuestion : null);
  }
}

function showSegment(seg) {
  const content = document.getElementById('ch4-content');
  if (!content) {
    console.error('ch4-content element not found');
    return;
  }
  content.innerHTML = '';
  ch4Segment = seg;
  currentParagraphIndex = 0;
  typeText('ch4-content', chapters[3][seg], 0);
  const segButtons = ['seg0-btn', 'seg1-btn', 'seg2-btn', 'seg3-btn', 'ch4-next'];
  segButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = 'none';
    else console.warn(`Button ${id} not found`);
  });
}

function typeText(elementId, texts, index) {
  const content = document.getElementById(elementId);
  if (!content) {
    console.error(`Element ${elementId} not found`);
    return;
  }
  if (index > 0) {
    content.innerHTML += '<br><br>';
  }
  let i = 0;
  let currentText = texts[index];
  const interval = setInterval(() => {
    if (i < currentText.length) {
      content.innerHTML += currentText[i];
      i++;
    } else {
      clearInterval(interval);
      currentParagraphIndex = index + 1;
      if (currentPage === 3) {
        if (currentParagraphIndex < texts.length) {
          const nextParaBtn = document.createElement('button');
          nextParaBtn.innerText = 'Lanjut Baca';
          nextParaBtn.onclick = () => {
            nextParaBtn.remove();
            typeText(elementId, texts, currentParagraphIndex);
          };
          content.appendChild(nextParaBtn);
        } else if (ch4Segment < chapters[3].length - 1) {
          const nextSegmentBtn = document.createElement('button');
          nextSegmentBtn.innerText = 'Lanjut Baca';
          nextSegmentBtn.onclick = () => {
            nextSegmentBtn.remove();
            showSegment(ch4Segment + 1);
          };
          content.appendChild(nextSegmentBtn);
        } else {
          const nextBtn = document.getElementById('ch4-next');
          if (nextBtn) {
            nextBtn.style.display = 'inline-block';
          } else {
            console.warn('Next button ch4-next not found');
          }
        }
      } else {
        if (currentParagraphIndex < texts.length) {
          const nextParaBtn = document.createElement('button');
          nextParaBtn.innerText = 'Lanjut Baca';
          nextParaBtn.onclick = () => {
            nextParaBtn.remove();
            typeText(elementId, texts, currentParagraphIndex);
          };
          content.appendChild(nextParaBtn);
        } else {
          const nextBtnId = `ch${currentPage + 1}-next`;
          const nextBtn = document.getElementById(nextBtnId);
          if (nextBtn) {
            nextBtn.style.display = 'inline-block';
          } else if (currentPage === 4) {
            showQuestion();
          } else {
            console.warn(`Next button ${nextBtnId} not found`);
          }
        }
      }
    }
  }, 25);
}

function showQuestion() {
  const question = document.getElementById('question');
  if (!question) {
    console.error('question element not found');
    return;
  }
  question.style.display = 'block';
}

function choose(choice) {
  const response = document.getElementById('response');
  const book = document.getElementById('book');
  if (!response || !book) {
    console.error('response or book element not found');
    return;
  }
  console.log('choose function called with choice:', choice);

  if (choice === 'Iya') {
    response.innerText = 'Aku bahagia banget, Dede! ❤️ Pilihanmu udah tersimpan.';
  } else {
    response.innerText = 'Aku tetep sayang kamu. Pilihanmu udah tersimpan.';
  }

  console.log('Attempting to redirect to YouTube playlist in 3 seconds...');
  
  setTimeout(() => {
    try {
      console.log('Redirecting to YouTube playlist now...');
      window.location.href = 'https://www.youtube.com/playlist?list=PLtiC_W2S_Wgx3xb8ffom6W1Z8oXNv5G4e&autoplay=1';
    } catch (error) {
      console.error('Failed to redirect to YouTube playlist:', error);
      response.innerText += '\nGagal redirect ke playlist YouTube. Coba buka manual: https://www.youtube.com/playlist?list=PLtiC_W2S_Wgx3xb8ffom6W1Z8oXNv5G4e';
    }
  }, 3000);
}
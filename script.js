// HTML elemanlarımızı DOM'dan yakalıyoruz
const hayirButonu = document.getElementById("hayir-btn");
const evetButonu = document.getElementById("evet-btn");
const teklifEkrani = document.getElementById("teklif-ekrani");
const detayEkrani = document.getElementById("detay-ekrani");
const takvimEkrani = document.getElementById("takvim-ekrani");
const onaylaBtn = document.getElementById("onayla-btn");

// Seçimleri hafızada tutacağımız değişkenler (State)
let secilenYemek = "";
let secilenTarih = "";
let secilenSaat = "";

// 1. HAYIR BUTONU: Fare yaklaşınca ekranda süzülerek kaçma mantığı
hayirButonu.addEventListener("mouseover", () => {
    hayirButonu.style.position = "absolute";
    const guvenliX = Math.random() * (window.innerWidth - hayirButonu.offsetWidth);
    const guvenliY = Math.random() * (window.innerHeight - hayirButonu.offsetHeight);
    hayirButonu.style.left = guvenliX + "px";
    hayirButonu.style.top = guvenliY + "px";
});

// 2. EVET BUTONU: Teklif ekranını kapatıp yemek seçim ekranını açar
evetButonu.addEventListener("click", function() {
    teklifEkrani.style.display = "none";
    detayEkrani.style.display = "block"; 
});

// 3. YEMEK SEÇİMİ: Yemek kartlarına tıklanınca veriyi kaydet ve takvime geç
const yemekKartlari = document.querySelectorAll(".yemek-karti");
yemekKartlari.forEach(kutu => {
    kutu.addEventListener("click", () => {
        secilenYemek = kutu.querySelector("p").innerText;
        
        // Yemek ekranını gizle, takvim ekranını aç
        detayEkrani.style.display = "none";
        takvimEkrani.style.display = "block";
        
        // Dinamik 7 günlük takvimi üret
        takvimOlustur();
    });
});

// Kontrol Mekanizması: Tarih ve saat seçildiyse onay butonunu görünür yap
function kontrolEtVeGoster() {
    if (secilenTarih !== "" && secilenSaat !== "") {
        onaylaBtn.style.display = "block";
    }
}

// Görsel Geri Bildirim: Seçilen butonları pembe yapmak için yardımcı fonksiyon
function butonSecimiTemizle(butonListesi) {
    butonListesi.forEach(b => b.classList.remove("secili-zaman"));
}

// 4. TAKVİM MOTORU: Bugünden itibaren önümüzdeki 7 günü otomatik hesaplar
function takvimOlustur() {
    const tarihAlani = document.getElementById("tarih-secenekleri");
    tarihAlani.innerHTML = ""; 
    
    const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    
    for(let i = 0; i < 7; i++) {
        let bugun = new Date();
        bugun.setDate(bugun.getDate() + i); 
        
        let gunNo = bugun.getDate();
        let ayIsmi = aylar[bugun.getMonth()];
        
        let buton = document.createElement("button");
        buton.className = "zaman-karti tarih-btn";
        buton.innerText = gunNo + " " + ayIsmi;
        
        buton.addEventListener("click", () => {
            secilenTarih = buton.innerText;
            const tumTarihButonlari = document.querySelectorAll(".tarih-btn");
            butonSecimiTemizle(tumTarihButonlari);
            buton.classList.add("secili-zaman");
            
            kontrolEtVeGoster();
        });
        
        tarihAlani.appendChild(buton); 
    }
}

// 5. SAAT SEÇİMİ: Saat butonlarına tıklama mantığı
const saatButonlari = document.querySelectorAll(".saat-btn");
saatButonlari.forEach(buton => {
    buton.addEventListener("click", () => {
        secilenSaat = buton.innerText;
        butonSecimiTemizle(saatButonlari);
        buton.classList.add("secili-zaman");
        
        kontrolEtVeGoster();
    });
});

// 6. FİNAL: E-posta (Mailto) Yönlendirmesi
onaylaBtn.addEventListener("click", () => {
    const emailAdresin = "be.my.date@mail2world.com"; 
    const konu = "Teklifin Cevabı! 💌";
    const mesaj = `Sürprizini gördüm! 💖 Menümüz ${secilenYemek}, ${secilenTarih} saat ${secilenSaat}'te buluşuyoruz, heyecanla bekliyorum!`;
    
    const encodeEdilmisKonu = encodeURIComponent(konu);
    const encodeEdilmisMesaj = encodeURIComponent(mesaj);
    
    const mailtoLink = `mailto:${emailAdresin}?subject=${encodeEdilmisKonu}&body=${encodeEdilmisMesaj}`;
    window.location.href = mailtoLink;
});
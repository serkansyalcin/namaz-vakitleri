document.addEventListener("DOMContentLoaded", function() {
  const ilSelect = document.getElementById('il-select');
  const ilceSelect = document.getElementById('ilce-select');
  const ilUrl = 'https://ezanvakti.herokuapp.com/sehirler/2';

  fetch(ilUrl)
    .then(response => response.json())
    .then(data => {
      // Şehir seçeneklerini seçim alanına ekliyoruz
      data.forEach(sehir => {
        const option = document.createElement('option');
        option.value = sehir.SehirID;
        option.text = sehir.SehirAdi;
        ilSelect.appendChild(option);
      });
    })
    .catch(error => console.error(error));

  // İl seçimi değiştiğinde ilçe seçeneklerini getiriyoruz
  ilSelect.addEventListener('change', () => {
    const ilceUrl = `https://ezanvakti.herokuapp.com/ilceler/${ilSelect.value}`;

    // İlçe seçim alanını boşaltıyoruz
    ilceSelect.innerHTML = '<option selected>Lütfen önce bir il seçin...</option>';
    ilceSelect.disabled = true;

    // İl seçiliyse, ilçeleri getir
    if (ilSelect.value !== '') {
      // İlçe seçeneklerini API'den getiriyoruz
      fetch(ilceUrl)
        .then(response => response.json())
        .then(data => {
          // İlçe seçeneklerini seçim alanına ekliyoruz
          if (Array.isArray(data)) {
            data.forEach(ilce => {
              const option = document.createElement('option');
              option.value = ilce.IlceID;
              option.text = ilce.IlceAdi;
              ilceSelect.appendChild(option);
              console.log(ilceSelect);
            });
          }

          // İlçe seçim alanını aktif hale getiriyoruz
          ilceSelect.disabled = false;
        })
        .catch(error => console.error(error));
    }
  });


  // Namaz saatlerini getiriyoruz
  ilceSelect.addEventListener('change', () => {
    const namazUrl = `https://ezanvakti.herokuapp.com/vakitler?ilce=${ilceSelect.value}`;

    fetch(namazUrl)
      .then(response => response.json())
      .then(data => {
        console.log("vakitler");
        console.log(namazUrl);
        // Namaz saatlerini gösteriyoruz
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const trHead = document.createElement('tr');
        const thTarih = document.createElement('th');
        const thImsak = document.createElement('th');
        const thGunes = document.createElement('th');
        const thOgle = document.createElement('th');
        const thIkindi = document.createElement('th');
        const thAksam = document.createElement('th');
        const thYatsi = document.createElement('th');
        thTarih.textContent = 'Tarih';
        thImsak.textContent = 'İmsak';
        thGunes.textContent = 'Güneş';
        thOgle.textContent = 'Öğle';
        thIkindi.textContent = 'İkindi';
        thAksam.textContent = 'Akşam';
        thYatsi.textContent = 'Yatsı';
        trHead.appendChild(thTarih);
        trHead.appendChild(thImsak);
        trHead.appendChild(thGunes);
        trHead.appendChild(thOgle);
        trHead.appendChild(thIkindi);
        trHead.appendChild(thAksam);
        trHead.appendChild(thYatsi);
        thead.appendChild(trHead);
        table.appendChild(thead);
    
        data.forEach(vakit => {
          const trBody = document.createElement('tr');
          const tdTarih = document.createElement('td');
          const tdImsak = document.createElement('td');
          const tdGunes = document.createElement('td');
          const tdOgle = document.createElement('td');
          const tdIkindi = document.createElement('td');
          const tdAksam = document.createElement('td');
          const tdYatsi = document.createElement('td');
          tdTarih.textContent = new Date(vakit.MiladiTarihUzunIso8601).toLocaleDateString();
          tdImsak.textContent = vakit.Imsak;
          tdGunes.textContent = vakit.Gunes;
          tdOgle.textContent = vakit.Ogle;
          tdIkindi.textContent = vakit.Ikindi;
          tdAksam.textContent = vakit.Aksam;
          tdYatsi.textContent = vakit.Yatsi;
          trBody.appendChild(tdTarih);
          trBody.appendChild(tdImsak);
          trBody.appendChild(tdGunes);
          trBody.appendChild(tdOgle);
          trBody.appendChild(tdIkindi);
          trBody.appendChild(tdAksam);
          trBody.appendChild(tdYatsi);
          tbody.appendChild(trBody);
        });
        table.appendChild(tbody);
    
        const namazSaatleriDiv = document.getElementById('namaz-saatleri');
        namazSaatleriDiv.innerHTML = '';
        namazSaatleriDiv.appendChild(table);
      })
      .catch(error => console.error(error));
  });
});
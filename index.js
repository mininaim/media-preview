async function displayURLPreview(url) {
    const previewContainerElement = document.getElementById('previewContainer');
  
    if (url.trim() === '') {
      while (previewContainerElement.firstChild) {
        previewContainerElement.removeChild(previewContainerElement.firstChild);
      }
      return;
    }
  
    try {
      const response = await fetch(url);
      const html = await response.text();
  
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
  
      const title = tempDiv.querySelector('title').innerText;
  
      const linkTags = tempDiv.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
      const faviconURL = linkTags.length ? linkTags[0].href : '';
  
      const audioExtensions = ['mp3', 'ogg', 'wav']; // Add more audio extensions if needed
      const isAudio = audioExtensions.some((extension) => url.endsWith(extension));
  
      const previewContainer = document.createElement('div');
      previewContainer.classList.add('card', 'my-3');
  
      let previewContent;
  
      if (isAudio) {
        const audioPlayer = document.createElement('audio');
        audioPlayer.setAttribute('controls', '');
        audioPlayer.innerHTML = `<source src="${url}" type="audio/mpeg">`;
  
        previewContent = audioPlayer;
      } else {
        const providerIcon = document.createElement('img');
        providerIcon.classList.add('preview-icon');
        providerIcon.src = faviconURL || 'path/to/fallback-icon.png';
  
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
  
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = title;
  
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = url;
  
        cardBody.appendChild(providerIcon);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
  
        previewContent = cardBody;
      }
  
      previewContainer.appendChild(previewContent);
  
      while (previewContainerElement.firstChild) {
        previewContainerElement.removeChild(previewContainerElement.firstChild);
      }
      previewContainerElement.appendChild(previewContainer);
    } catch (error) {
      console.error('Error fetching URL metadata:', error);
    }
  }
  const urlInput = document.getElementById('mediaLink');
  
  urlInput.addEventListener('input', () => {
    const url = urlInput.value;
    displayURLPreview(url);
  });
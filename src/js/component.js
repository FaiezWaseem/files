let components = {
  folderCard: (item) => {
    return `
        <a    target="_blank" class="files-a files-a-svg"   style="opacity: 1;">
        <svg viewBox="0 0 48 48" class="svg-folder files-svg" onclick='initjs.folderClicked(${JSON.stringify(item)})'>
          <path class="svg-folder-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"></path>
          <path class="svg-folder-fg" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"></path>
        </svg>
        <div class="files-data" onclick='initjs.folderClicked(${JSON.stringify(item)})'>
          <span class="name" title="${item.name}">${item.name}</span>
          <span class="icon">
            <svg viewBox="0 0 48 48" class="svg-folder svg-icon">
              <path class="svg-folder-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"></path>
              <path class="svg-folder-fg" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"></path>
            </svg>
          </span>
          <span class="ext"></span>
          <span class="date">
            <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
          </span>
          <span class="flex"></span>
        </div>
        <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
          <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
            <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
            <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
          </svg>
        </span>
         </a>
        `
  },
  imageCard: (item) => {
    let ratio = item.dimension.width / item.dimension.height;
    ratio = ratio.toFixed(4);
    return `
        <a  target="_blank" class="files-a files-a-img files-a-loaded" style="--ratio: ${ratio}; opacity: 1;" data-name="${item.name}">
        <img class="files-img" 
          width="${item.dimension.width}" height="${item.dimension.height}"
          src=".${item.download_url}"
          loading="lazy"
          data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)" 
          >
        <div class="files-data">
          <span class="gps map-link" data-href="https://www.google.com/maps/search/?api=1&amp;query=34.041754,-118.567238" data-lang="google maps" title="Google maps">
            <svg viewBox="0 0 24 24" class="svg-icon svg-marker">
              <path class="svg-path-marker" d="M18.27 6C19.28 8.17 19.05 10.73 17.94 12.81C17 14.5 15.65 15.93 14.5 17.5C14 18.2 13.5 18.95 13.13 19.76C13 20.03 12.91 20.31 12.81 20.59C12.71 20.87 12.62 21.15 12.53 21.43C12.44 21.69 12.33 22 12 22H12C11.61 22 11.5 21.56 11.42 21.26C11.18 20.53 10.94 19.83 10.57 19.16C10.15 18.37 9.62 17.64 9.08 16.93L18.27 6M9.12 8.42L5.82 12.34C6.43 13.63 7.34 14.73 8.21 15.83C8.42 16.08 8.63 16.34 8.83 16.61L13 11.67L12.96 11.68C11.5 12.18 9.88 11.44 9.3 10C9.22 9.83 9.16 9.63 9.12 9.43C9.07 9.06 9.06 8.79 9.12 8.43L9.12 8.42M6.58 4.62L6.57 4.63C4.95 6.68 4.67 9.53 5.64 11.94L9.63 7.2L9.58 7.15L6.58 4.62M14.22 2.36L11 6.17L11.04 6.16C12.38 5.7 13.88 6.28 14.56 7.5C14.71 7.78 14.83 8.08 14.87 8.38C14.93 8.76 14.95 9.03 14.88 9.4L14.88 9.41L18.08 5.61C17.24 4.09 15.87 2.93 14.23 2.37L14.22 2.36M9.89 6.89L13.8 2.24L13.76 2.23C13.18 2.08 12.59 2 12 2C10.03 2 8.17 2.85 6.85 4.31L6.83 4.32L9.89 6.89Z"></path>
            </svg>
          </span>
          <span class="name" title="${item.name}">${item.name}</span>
          <span class="title">Outer Peristyle, The J. Paul Getty Museum at the Getty Villa </span>
          <span class="icon">
            <svg viewBox="0 0 24 24" class="svg-icon svg-image">
              <path class="svg-path-image" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"></path>
            </svg>
          </span>
          <span class="dimensions">${item.dimension.width} x ${item.dimension.height}</span>
          <span class="size">${item.size}</span>
          <div class="exif">
            <span class="exif-item exif-Model" data-lang="Model" title="Model">
              <svg viewBox="0 0 24 24" class="svg-icon svg-camera">
                <path class="svg-path-camera" d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"></path>
              </svg>EX-Z57 </span>
            <span class="exif-item exif-ApertureFNumber" data-lang="ApertureFNumber" title="ApertureFNumber">f/2.6</span>
            <span class="exif-item exif-FocalLength" data-lang="FocalLength" title="FocalLength">5.8 <small>mm</small>
            </span>
            <span class="exif-item exif-ExposureTime" data-lang="ExposureTime" title="ExposureTime">1/40</span>
            <span class="exif-item exif-gps map-link" data-href="https://www.google.com/maps/search/?api=1&amp;query=34.041754,-118.567238" data-lang="google maps" title="Google maps">
              <svg viewBox="0 0 24 24" class="svg-icon svg-marker">
                <path class="svg-path-marker" d="M18.27 6C19.28 8.17 19.05 10.73 17.94 12.81C17 14.5 15.65 15.93 14.5 17.5C14 18.2 13.5 18.95 13.13 19.76C13 20.03 12.91 20.31 12.81 20.59C12.71 20.87 12.62 21.15 12.53 21.43C12.44 21.69 12.33 22 12 22H12C11.61 22 11.5 21.56 11.42 21.26C11.18 20.53 10.94 19.83 10.57 19.16C10.15 18.37 9.62 17.64 9.08 16.93L18.27 6M9.12 8.42L5.82 12.34C6.43 13.63 7.34 14.73 8.21 15.83C8.42 16.08 8.63 16.34 8.83 16.61L13 11.67L12.96 11.68C11.5 12.18 9.88 11.44 9.3 10C9.22 9.83 9.16 9.63 9.12 9.43C9.07 9.06 9.06 8.79 9.12 8.43L9.12 8.42M6.58 4.62L6.57 4.63C4.95 6.68 4.67 9.53 5.64 11.94L9.63 7.2L9.58 7.15L6.58 4.62M14.22 2.36L11 6.17L11.04 6.16C12.38 5.7 13.88 6.28 14.56 7.5C14.71 7.78 14.83 8.08 14.87 8.38C14.93 8.76 14.95 9.03 14.88 9.4L14.88 9.41L18.08 5.61C17.24 4.09 15.87 2.93 14.23 2.37L14.22 2.36M9.89 6.89L13.8 2.24L13.76 2.23C13.18 2.08 12.59 2 12 2C10.03 2 8.17 2.85 6.85 4.31L6.83 4.32L9.89 6.89Z"></path>
              </svg>
            </span>
          </div>
          <span class="ext">
            <span class="ext-inner">${item.ext}</span>
          </span>
          <span class="date">
            <time datetime="2008-01-21T10:24:02+05:00" data-time="1200893042" data-format="L LT" title="Monday, January 21, 2008 10:24 AM ~ 15 years ago" data-title-format="LLLL">${item.modified_time}</time>
          </span>
          <span class="flex"></span>
        </div>
        <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
          <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
            <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
            <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
          </svg>
        </span>
      </a>
        `
  },
  videocard: (item) => {

    return `
    <a data-name="${item.name}" target="_blank" class="files-a files-a-img files-a-loaded"
    style="--ratio:1.5; opacity: 1;"><svg viewBox="0 0 24 24" class="svg-icon svg-play"
     data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
        <path class="svg-path-play" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
    </svg><video class="files-img playvideo"
        data-src="${item.download_url}"
        play-src="${item.download_url.replace("dw", "vid")}"
        width="480" height="320"
        src=""
        muted
        >
        </video>
    <div class="files-data"><span class="name" title="Sample1280.mp4">${item.name}</span><span class="icon"><svg
                viewBox="0 0 24 24" class="svg-icon svg-video">
                <path class="svg-path-video"
                    d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z">
                </path>
            </svg></span><span class="size">${item.size}</span><span class="ext"><span
                class="ext-inner">mp4</span></span><span class="date"><time datetime="2022-04-07T12:06:51+05:00"
                data-time="1649315211" data-format="L LT" title="Thursday, April 7, 2022 12:06 PM ~ a year ago"
                data-title-format="LLLL">${item.modified_time}</time></span><span class="flex"></span></div><span
        class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'><svg viewBox="0 0 24 24" class="svg-icon svg-dots">
            <path class="svg-path-dots"
                d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z">
            </path>
            <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
        </svg></span>
</a>
    
    `
  },
  sideBarFolder: (item) => {
    return `
      <li data-level="1" data-path="${item.name}" onclick='initjs.folderClicked(${JSON.stringify(item)})' class="menu-li">
      <a  class="menu-a">
        <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder">
          <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
        </svg>${item.name} </a>
    </li>
      `
  },
  sideBarFolderwithSubDir: () => {
    return `
      <li data-level="1" data-path="galleries" class="menu-li has-ul">
      <a href="https://demo.files.gallery/?galleries" class="menu-a menu-active">
        <svg viewBox="0 0 24 24" class="menu-icon menu-icon-toggle">
          <path class="svg-path-plus" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
          <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
        </svg>
        <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder menu-icon-folder-toggle">
          <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
          <path class="svg-path-folder_plus" d="M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z"></path>
          <path class="svg-path-folder_minus" d="M7.874 12h8v2h-8z"></path>
        </svg>galleries </a>
      <ul style="--depth:1" class="menu-ul">
        <li data-level="2" data-path="galleries/cityscape" class="menu-li">
          <a href="https://demo.files.gallery/?galleries/cityscape" class="menu-a">
            <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder">
              <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
            </svg>cityscape </a>
        </li>
        <li data-level="2" data-path="galleries/forests" class="menu-li">
          <a href="https://demo.files.gallery/?galleries/forests" class="menu-a">
            <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder">
              <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
            </svg>forests </a>
        </li>
        <li data-level="2" data-path="galleries/girls" class="menu-li">
          <a href="https://demo.files.gallery/?galleries/girls" class="menu-a">
            <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder">
              <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
            </svg>girls </a>
        </li>
        <li data-level="2" data-path="galleries/hiking" class="menu-li">
          <a href="https://demo.files.gallery/?galleries/hiking" class="menu-a">
            <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder">
              <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
            </svg>hiking </a>
        </li>
        <li data-level="2" data-path="galleries/mountains" class="menu-li">
          <a href="https://demo.files.gallery/?galleries/mountains" class="menu-a">
            <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder">
              <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
            </svg>mountains </a>
        </li>
        <li data-level="2" data-path="galleries/panorama" class="menu-li">
          <a href="https://demo.files.gallery/?galleries/panorama" class="menu-a">
            <svg viewBox="0 0 24 24" class="menu-icon menu-icon-folder">
              <path class="svg-path-folder" d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"></path>
            </svg>panorama </a>
        </li>
        <li>
          
        </li>
      </ul>
    </li>
      `
  },
  fileCard: (item) => {
    return `
      <a  target="_blank" class="files-a files-a-svg" data-name="${item.name}" style="opacity: 1;" data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
      <svg viewBox="0 0 56 56" class="svg-file svg-text files-svg">
    <path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path>
    <polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon>
    <g class="svg-file-icon">
      <path d="M12.5,13h6c0.553,0,1-0.448,1-1s-0.447-1-1-1h-6c-0.553,0-1,0.448-1,1S11.947,13,12.5,13z"></path>
      <path d="M12.5,18h9c0.553,0,1-0.448,1-1s-0.447-1-1-1h-9c-0.553,0-1,0.448-1,1S11.947,18,12.5,18z"></path>
      <path d="M25.5,18c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 c-0.38-0.37-1.04-0.37-1.42,0c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71C24.979,17.89,25.24,18,25.5,18z"></path>
      <path d="M29.5,18h8c0.553,0,1-0.448,1-1s-0.447-1-1-1h-8c-0.553,0-1,0.448-1,1S28.947,18,29.5,18z"></path>
      <path d="M11.79,31.29c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71 C11.979,32.89,12.229,33,12.5,33c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 C12.84,30.92,12.16,30.92,11.79,31.29z"></path>
      <path d="M24.5,31h-8c-0.553,0-1,0.448-1,1s0.447,1,1,1h8c0.553,0,1-0.448,1-1S25.053,31,24.5,31z"></path>
      <path d="M41.5,18h2c0.553,0,1-0.448,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1S40.947,18,41.5,18z"></path>
      <path d="M12.5,23h22c0.553,0,1-0.448,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.448-1,1S11.947,23,12.5,23z"></path>
      <path d="M43.5,21h-6c-0.553,0-1,0.448-1,1s0.447,1,1,1h6c0.553,0,1-0.448,1-1S44.053,21,43.5,21z"></path>
      <path d="M12.5,28h4c0.553,0,1-0.448,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1S11.947,28,12.5,28z"></path>
      <path d="M30.5,26h-10c-0.553,0-1,0.448-1,1s0.447,1,1,1h10c0.553,0,1-0.448,1-1S31.053,26,30.5,26z"></path>
      <path d="M43.5,26h-9c-0.553,0-1,0.448-1,1s0.447,1,1,1h9c0.553,0,1-0.448,1-1S44.053,26,43.5,26z"></path>
    </g>
    <path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path>
    <text class="svg-file-ext" x="28" y="51.5">${item.ext}</text>
  </svg>
  <div class="files-data">
    <span class="name" title="${item.name}">${item.name}</span>
    <span class="icon">
      <svg viewBox="0 0 24 24" class="svg-icon svg-text">
        <path class="svg-path-text" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
      </svg>
    </span>
    <span class="size">${item.size}</span>
    <span class="ext">
      <span class="ext-inner">${item.ext}</span>
    </span>
    <span class="date">
      <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
    </span>
    <span class="flex"></span>
  </div>
  <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
    <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
      <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
      <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
    </svg>
  </span>
</a>
      `
  },
  csvCard: (item) => {
    return `
      <a  target="_blank" class="files-a files-a-svg" data-name="${item.name}" style="opacity: 1;" data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
      <svg viewBox="0 0 56 56" class="svg-file svg-excel files-svg"><path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path><polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon><g class="svg-file-icon"><path style="fill:#c8bdb8" d="M23.5,16v-4h-12v4v2v2v2v2v2v2v2v4h10h2h21v-4v-2v-2v-2v-2v-2v-4H23.5z M13.5,14h8v2h-8V14z M13.5,18h8v2h-8V18z M13.5,22h8v2h-8V22z M13.5,26h8v2h-8V26z M21.5,32h-8v-2h8V32z M42.5,32h-19v-2h19V32z M42.5,28h-19v-2h19V28 z M42.5,24h-19v-2h19V24z M23.5,20v-2h19v2H23.5z"></path></g><path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path>
      <text class="svg-file-ext" x="28" y="51.5">${item.ext}</text></svg>
  <div class="files-data">
    <span class="name" title="${item.name}">${item.name}</span>
    <span class="icon">
      <svg viewBox="0 0 24 24" class="svg-icon svg-text">
        <path class="svg-path-text" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
      </svg>
    </span>
    <span class="size">${item.size}</span>
    <span class="ext">
      <span class="ext-inner">${item.ext}</span>
    </span>
    <span class="date">
      <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
    </span>
    <span class="flex"></span>
  </div>
  <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
    <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
      <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
      <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
    </svg>
  </span>
</a>
      `
  },
  pdfCard: (item) => {
    return `
      <a  target="_blank" class="files-a files-a-svg" data-name="${item.name}" style="opacity: 1;" data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
      <svg viewBox="0 0 56 56" class="svg-file svg-pdf files-svg"><path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path><polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon><g class="svg-file-icon"><path d="M19.514,33.324L19.514,33.324c-0.348,0-0.682-0.113-0.967-0.326 c-1.041-0.781-1.181-1.65-1.115-2.242c0.182-1.628,2.195-3.332,5.985-5.068c1.504-3.296,2.935-7.357,3.788-10.75 c-0.998-2.172-1.968-4.99-1.261-6.643c0.248-0.579,0.557-1.023,1.134-1.215c0.228-0.076,0.804-0.172,1.016-0.172 c0.504,0,0.947,0.649,1.261,1.049c0.295,0.376,0.964,1.173-0.373,6.802c1.348,2.784,3.258,5.62,5.088,7.562 c1.311-0.237,2.439-0.358,3.358-0.358c1.566,0,2.515,0.365,2.902,1.117c0.32,0.622,0.189,1.349-0.39,2.16 c-0.557,0.779-1.325,1.191-2.22,1.191c-1.216,0-2.632-0.768-4.211-2.285c-2.837,0.593-6.15,1.651-8.828,2.822 c-0.836,1.774-1.637,3.203-2.383,4.251C21.273,32.654,20.389,33.324,19.514,33.324z M22.176,28.198 c-2.137,1.201-3.008,2.188-3.071,2.744c-0.01,0.092-0.037,0.334,0.431,0.692C19.685,31.587,20.555,31.19,22.176,28.198z M35.813,23.756c0.815,0.627,1.014,0.944,1.547,0.944c0.234,0,0.901-0.01,1.21-0.441c0.149-0.209,0.207-0.343,0.23-0.415 c-0.123-0.065-0.286-0.197-1.175-0.197C37.12,23.648,36.485,23.67,35.813,23.756z M28.343,17.174 c-0.715,2.474-1.659,5.145-2.674,7.564c2.09-0.811,4.362-1.519,6.496-2.02C30.815,21.15,29.466,19.192,28.343,17.174z M27.736,8.712c-0.098,0.033-1.33,1.757,0.096,3.216C28.781,9.813,27.779,8.698,27.736,8.712z"></path></g><path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path><text class="svg-file-ext" x="28" y="51.5">pdf</text></svg>
  <div class="files-data">
    <span class="name" title="${item.name}">${item.name}</span>
    <span class="icon">
      <svg viewBox="0 0 24 24" class="svg-icon svg-text">
        <path class="svg-path-text" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
      </svg>
    </span>
    <span class="size">${item.size}</span>
    <span class="ext">
      <span class="ext-inner">${item.ext}</span>
    </span>
    <span class="date">
      <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
    </span>
    <span class="flex"></span>
  </div>
  <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
    <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
      <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
      <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
    </svg>
  </span>
</a>
      `
  },
  docCard: (item) => {
    return `
      <a  target="_blank" class="files-a files-a-svg" data-name="${item.name}" style="opacity: 1;" data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
 <svg viewBox="0 0 56 56" class="svg-file svg-word files-svg"><path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path><polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon><g class="svg-file-icon"><path d="M12.5,13h6c0.553,0,1-0.448,1-1s-0.447-1-1-1h-6c-0.553,0-1,0.448-1,1S11.947,13,12.5,13z"></path><path d="M12.5,18h9c0.553,0,1-0.448,1-1s-0.447-1-1-1h-9c-0.553,0-1,0.448-1,1S11.947,18,12.5,18z"></path><path d="M25.5,18c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 c-0.38-0.37-1.04-0.37-1.42,0c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71C24.979,17.89,25.24,18,25.5,18z"></path><path d="M29.5,18h8c0.553,0,1-0.448,1-1s-0.447-1-1-1h-8c-0.553,0-1,0.448-1,1S28.947,18,29.5,18z"></path><path d="M11.79,31.29c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71 C11.979,32.89,12.229,33,12.5,33c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 C12.84,30.92,12.16,30.92,11.79,31.29z"></path><path d="M24.5,31h-8c-0.553,0-1,0.448-1,1s0.447,1,1,1h8c0.553,0,1-0.448,1-1S25.053,31,24.5,31z"></path><path d="M41.5,18h2c0.553,0,1-0.448,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1S40.947,18,41.5,18z"></path><path d="M12.5,23h22c0.553,0,1-0.448,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.448-1,1S11.947,23,12.5,23z"></path><path d="M43.5,21h-6c-0.553,0-1,0.448-1,1s0.447,1,1,1h6c0.553,0,1-0.448,1-1S44.053,21,43.5,21z"></path><path d="M12.5,28h4c0.553,0,1-0.448,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1S11.947,28,12.5,28z"></path><path d="M30.5,26h-10c-0.553,0-1,0.448-1,1s0.447,1,1,1h10c0.553,0,1-0.448,1-1S31.053,26,30.5,26z"></path><path d="M43.5,26h-9c-0.553,0-1,0.448-1,1s0.447,1,1,1h9c0.553,0,1-0.448,1-1S44.053,26,43.5,26z"></path></g><path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path>
 <text class="svg-file-ext" x="28" y="51.5">${item.ext}</text></svg>
      <div class="files-data">
    <span class="name" title="${item.name}">${item.name}</span>
    <span class="icon">
      <svg viewBox="0 0 24 24" class="svg-icon svg-text">
        <path class="svg-path-text" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
      </svg>
    </span>
    <span class="size">${item.size}</span>
    <span class="ext">
      <span class="ext-inner">${item.ext}</span>
    </span>
    <span class="date">
      <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
    </span>
    <span class="flex"></span>
  </div>
  <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
    <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
      <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
      <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
    </svg>
  </span>
</a>
      `
  },
  zipCard: (item) => {
    return `
      <a  target="_blank" class="files-a files-a-svg" data-name="${item.name}" style="opacity: 1;" data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
      <svg viewBox="0 0 56 56" class="svg-file svg-archive files-svg"><path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path><polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon><g class="svg-file-icon"><path d="M28.5,24v-2h2v-2h-2v-2h2v-2h-2v-2h2v-2h-2v-2h2V8h-2V6h-2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2 h-4v5c0,2.757,2.243,5,5,5s5-2.243,5-5v-5H28.5z M30.5,29c0,1.654-1.346,3-3,3s-3-1.346-3-3v-3h6V29z"></path><path d="M26.5,30h2c0.552,0,1-0.447,1-1s-0.448-1-1-1h-2c-0.552,0-1,0.447-1,1S25.948,30,26.5,30z"></path></g><path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path>
      <text class="svg-file-ext" x="28" y="51.5">${item.ext}</text></svg>
      <div class="files-data">
    <span class="name" title="${item.name}">${item.name}</span>
    <span class="icon">
      <svg viewBox="0 0 24 24" class="svg-icon svg-text">
        <path class="svg-path-text" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
      </svg>
    </span>
    <span class="size">${item.size}</span>
    <span class="ext">
      <span class="ext-inner">${item.ext}</span>
    </span>
    <span class="date">
      <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
    </span>
    <span class="flex"></span>
  </div>
  <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
    <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
      <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
      <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
    </svg>
  </span>
</a>
      `
  },
  codeCard: (item) => {
    return `
      <a  target="_blank" class="files-a files-a-svg" data-name="${item.name}" style="opacity: 1;" data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
      <svg viewBox="0 0 56 56" class="svg-file svg-code files-svg"><path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path><polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon><g class="svg-file-icon"><path d="M15.5,24c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6-6 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-6,6C16.012,23.902,15.756,24,15.5,24z"></path><path d="M21.5,30c-0.256,0-0.512-0.098-0.707-0.293l-6-6c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l6,6c0.391,0.391,0.391,1.023,0,1.414C22.012,29.902,21.756,30,21.5,30z"></path><path d="M33.5,30c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6-6 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-6,6C34.012,29.902,33.756,30,33.5,30z"></path><path d="M39.5,24c-0.256,0-0.512-0.098-0.707-0.293l-6-6c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l6,6c0.391,0.391,0.391,1.023,0,1.414C40.012,23.902,39.756,24,39.5,24z"></path><path d="M24.5,32c-0.11,0-0.223-0.019-0.333-0.058c-0.521-0.184-0.794-0.755-0.61-1.276l6-17 c0.185-0.521,0.753-0.795,1.276-0.61c0.521,0.184,0.794,0.755,0.61,1.276l-6,17C25.298,31.744,24.912,32,24.5,32z"></path></g><path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path>
      <text class="svg-file-ext" x="28" y="51.5">${item.ext}</text></svg>
      <div class="files-data">
    <span class="name" title="${item.name}">${item.name}</span>
    <span class="icon">
      <svg viewBox="0 0 24 24" class="svg-icon svg-text">
        <path class="svg-path-text" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
      </svg>
    </span>
    <span class="size">${item.size}</span>
    <span class="ext">
      <span class="ext-inner">${item.ext}</span>
    </span>
    <span class="date">
      <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
    </span>
    <span class="flex"></span>
  </div>
  <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
    <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
      <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
      <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
    </svg>
  </span>
</a>
      `
  },
  audioCard: (item) => {
    return `
      <a  target="_blank" class="files-a files-a-svg" data-name="${item.name}" style="opacity: 1;" data-item='${JSON.stringify(item)}' onclick="initjs.openFileInfoModal(this)">
      <svg viewBox="0 0 56 56" class="svg-file svg-audio files-svg"><path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path><polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon><g class="svg-file-icon"><path d="M35.67,14.986c-0.567-0.796-1.3-1.543-2.308-2.351c-3.914-3.131-4.757-6.277-4.862-6.738V5 c0-0.553-0.447-1-1-1s-1,0.447-1,1v1v8.359v9.053h-3.706c-3.882,0-6.294,1.961-6.294,5.117c0,3.466,2.24,5.706,5.706,5.706 c3.471,0,6.294-2.823,6.294-6.294V16.468l0.298,0.243c0.34,0.336,0.861,0.72,1.521,1.205c2.318,1.709,6.2,4.567,5.224,7.793 C35.514,25.807,35.5,25.904,35.5,26c0,0.43,0.278,0.826,0.71,0.957C36.307,26.986,36.404,27,36.5,27c0.43,0,0.826-0.278,0.957-0.71 C39.084,20.915,37.035,16.9,35.67,14.986z M26.5,27.941c0,2.368-1.926,4.294-4.294,4.294c-2.355,0-3.706-1.351-3.706-3.706 c0-2.576,2.335-3.117,4.294-3.117H26.5V27.941z M31.505,16.308c-0.571-0.422-1.065-0.785-1.371-1.081l-1.634-1.34v-3.473 c0.827,1.174,1.987,2.483,3.612,3.783c0.858,0.688,1.472,1.308,1.929,1.95c0.716,1.003,1.431,2.339,1.788,3.978 C34.502,18.515,32.745,17.221,31.505,16.308z"></path></g><path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path>
      <text class="svg-file-ext" x="28" y="51.5">${item.ext}</text></svg>
      <div class="files-data">
    <span class="name" title="${item.name}">${item.name}</span>
    <span class="icon">
      <svg viewBox="0 0 24 24" class="svg-icon svg-text">
        <path class="svg-path-text" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
      </svg>
    </span>
    <span class="size">${item.size}</span>
    <span class="ext">
      <span class="ext-inner">${item.ext}</span>
    </span>
    <span class="date">
      <time datetime="${item.modified_time}" data-time="${item.modified_time}" data-format="L LT" title="${item.modified_time}" data-title-format="LLLL">${item.modified_time}</time>
    </span>
    <span class="flex"></span>
  </div>
  <span class="context-button files-context" data-action="context" data-file='${JSON.stringify(item)}'>
    <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
      <path class="svg-path-dots" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
      <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
    </svg>
  </span>
</a>
      `
  },
  contextHeader: (title) => {
    return `
    <svg viewBox="0 0 24 24" class="svg-icon svg-image">
    <path class="svg-path-image" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"></path>
  </svg>
  ${title}
    `
  },
  modal: (item) => {
    return `
    <div class="swal2-container swal2-center swal2-backdrop-show" style="overflow-y: auto;">
    <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container"
        class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true"
        style="display: grid;"><button type="button" class="swal2-close" aria-label="Close this dialog"
            style="display: flex;" onclick='document.getElementById("modal-f").innerHTML = "";'><svg viewBox="0 0 24 24" class="svg-icon svg-close">
                <path class="svg-path-close"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                </path>
            </svg></button>
        <ul class="swal2-progress-steps" style="display: none;"></ul>
        <div class="swal2-icon" style="display: none;"></div><img class="swal2-image" style="display: none;">
        <h2 class="swal2-title" id="swal2-title" style="display: block;">Rename</h2>
        <div class="swal2-html-container" id="swal2-html-container" style="display: block;"><span
                class="swal-files-path"><span
                    class="swal-files-name swal-files-has-path">${item?.name}</span></span></div><input maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-input"
            placeholder="New name" type="text" style="display: flex;" value="${item?.name}" id='fileRename' ><input type="file" maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-file"
            style="display: none;">
        <div class="swal2-range" style="display: none;"><input type="range" maxlength="127" autocapitalize="off"
                autocorrect="off" autocomplete="off" spellcheck="false"><output></output></div><select maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-select"
            style="display: none;"></select>
        <div class="swal2-radio" style="display: none;"></div><label for="swal2-checkbox" class="swal2-checkbox"
            style="display: none;"><input type="checkbox" maxlength="127" autocapitalize="off" autocorrect="off"
                autocomplete="off" spellcheck="false"><span class="swal2-label"></span></label><textarea maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-textarea"
            style="display: none;"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none;"></div>
        <div class="swal2-actions" style="display: flex;">
            <div class="swal2-loader"></div><button type="button" class="swal2-confirm swal2-styled" aria-label=""
                style="display: inline-block;" onclick='initjs.clickedRename("${item.name}")'>OK</button><button type="button" class="swal2-deny swal2-styled"
                aria-label="" style="display: none;">No</button><button type="button" class="swal2-cancel swal2-styled"
                aria-label="" style="display: none;">Cancel</button>
        </div>
        <div class="swal2-footer" style="display: none;"></div>
        <div class="swal2-timer-progress-bar-container">
            <div class="swal2-timer-progress-bar" style="display: none;"></div>
        </div>
    </div>
</div>
    `
  },
  CreateFoldermodal: (item) => {
    return `
    <div class="swal2-container swal2-center swal2-backdrop-show" style="overflow-y: auto;">
    <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container"
        class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true"
        style="display: grid;"><button type="button" class="swal2-close" aria-label="Close this dialog"
            style="display: flex;" onclick='document.getElementById("modal-f").innerHTML = "";'><svg viewBox="0 0 24 24" class="svg-icon svg-close">
                <path class="svg-path-close"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                </path>
            </svg></button>
        <ul class="swal2-progress-steps" style="display: none;"></ul>
        <div class="swal2-icon" style="display: none;"></div><img class="swal2-image" style="display: none;">
        <h2 class="swal2-title" id="swal2-title" style="display: block;">Folder</h2>
        <div class="swal2-html-container" id="swal2-html-container" style="display: block;"><span
                class="swal-files-path"><span
                    class="swal-files-name swal-files-has-path">${item?.name}</span></span></div><input maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-input"
            placeholder="New name" type="text" style="display: flex;"  id='cFolder' ><input type="file" maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-file"
            style="display: none;">
        <div class="swal2-range" style="display: none;"><input type="range" maxlength="127" autocapitalize="off"
                autocorrect="off" autocomplete="off" spellcheck="false"><output></output></div><select maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-select"
            style="display: none;"></select>
        <div class="swal2-radio" style="display: none;"></div><label for="swal2-checkbox" class="swal2-checkbox"
            style="display: none;"><input type="checkbox" maxlength="127" autocapitalize="off" autocorrect="off"
                autocomplete="off" spellcheck="false"><span class="swal2-label"></span></label><textarea maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-textarea"
            style="display: none;"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none;"></div>
        <div class="swal2-actions" style="display: flex;">
            <div class="swal2-loader"></div><button type="button" class="swal2-confirm swal2-styled" aria-label=""
                style="display: inline-block;" onclick='initjs.createFolder()'>OK</button><button type="button" class="swal2-deny swal2-styled"
                aria-label="" style="display: none;">No</button><button type="button" class="swal2-cancel swal2-styled"
                aria-label="" style="display: none;">Cancel</button>
        </div>
        <div class="swal2-footer" style="display: none;"></div>
        <div class="swal2-timer-progress-bar-container">
            <div class="swal2-timer-progress-bar" style="display: none;"></div>
        </div>
    </div>
</div>
    `
  },
  CreateLoginmodal: (item) => {
    return `
    <div class="swal2-container swal2-center swal2-backdrop-show" style="overflow-y: auto;">
    <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container"
        class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true"
        style="display: grid;"><button type="button" class="swal2-close" aria-label="Close this dialog"
            style="display: flex;" onclick='document.getElementById("modal-f").innerHTML = "";'><svg viewBox="0 0 24 24" class="svg-icon svg-close">
                <path class="svg-path-close"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                </path>
            </svg></button>
        <ul class="swal2-progress-steps" style="display: none;"></ul>
        <div class="swal2-icon" style="display: none;"></div><img class="swal2-image" style="display: none;">
        <h2 class="swal2-title" id="swal2-title" style="display: block;">Login</h2>
        <div class="swal2-html-container" id="swal2-html-container" style="display: block;"><span
                class="swal-files-path"><span
                    class="swal-files-name swal-files-has-path">${item?.name}</span></span></div>
                    <input maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-input"
            placeholder="Username" type="text" style="display: flex;"  id='username' >
                    <input maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-input"
            placeholder="Password" type="text" style="display: flex;"  id='password' >
            <input type="file" maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-file"
            style="display: none;">
        <div class="swal2-range" style="display: none;">
        <input type="range" maxlength="127" autocapitalize="off"
                autocorrect="off" autocomplete="off" spellcheck="false">
                <output></output>
                </div><select maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-select"
            style="display: none;"></select>
        <div class="swal2-radio" style="display: none;"></div><label for="swal2-checkbox" class="swal2-checkbox"
            style="display: none;"><input type="checkbox" maxlength="127" autocapitalize="off" autocorrect="off"
                autocomplete="off" spellcheck="false"><span class="swal2-label"></span></label><textarea maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-textarea"
            style="display: none;"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none;"></div>
        <div class="swal2-actions" style="display: flex;">
            <div class="swal2-loader"></div><button type="button" class="swal2-confirm swal2-styled" aria-label=""
                style="display: inline-block;" onclick='initjs.login()'>OK</button><button type="button" class="swal2-deny swal2-styled"
                aria-label="" style="display: none;">No</button><button type="button" class="swal2-cancel swal2-styled"
                aria-label="" style="display: none;">Cancel</button>
        </div>
        <div class="swal2-footer" style="display: none;"></div>
        <div class="swal2-timer-progress-bar-container">
            <div class="swal2-timer-progress-bar" style="display: none;"></div>
        </div>
    </div>
</div>
    `
  },
  CreateFilemodal: (item) => {
    return `
    <div class="swal2-container swal2-center swal2-backdrop-show" style="overflow-y: auto;">
    <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container"
        class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true"
        style="display: grid;"><button type="button" class="swal2-close" aria-label="Close this dialog"
            style="display: flex;" onclick='document.getElementById("modal-f").innerHTML = "";'><svg viewBox="0 0 24 24" class="svg-icon svg-close">
                <path class="svg-path-close"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                </path>
            </svg></button>
        <ul class="swal2-progress-steps" style="display: none;"></ul>
        <div class="swal2-icon" style="display: none;"></div><img class="swal2-image" style="display: none;">
        <h2 class="swal2-title" id="swal2-title" style="display: block;">File</h2>
        <div class="swal2-html-container" id="swal2-html-container" style="display: block;"><span
                class="swal-files-path"><span
                    class="swal-files-name swal-files-has-path">${item?.name}</span></span></div><input maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-input"
            placeholder="New name" type="text" style="display: flex;"  id='cFolder' ><input type="file" maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-file"
            style="display: none;">
        <div class="swal2-range" style="display: none;"><input type="range" maxlength="127" autocapitalize="off"
                autocorrect="off" autocomplete="off" spellcheck="false"><output></output></div><select maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-select"
            style="display: none;"></select>
        <div class="swal2-radio" style="display: none;"></div><label for="swal2-checkbox" class="swal2-checkbox"
            style="display: none;"><input type="checkbox" maxlength="127" autocapitalize="off" autocorrect="off"
                autocomplete="off" spellcheck="false"><span class="swal2-label"></span></label><textarea maxlength="127"
            autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" class="swal2-textarea"
            style="display: none;"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none;"></div>
        <div class="swal2-actions" style="display: flex;">
            <div class="swal2-loader"></div><button type="button" class="swal2-confirm swal2-styled" aria-label=""
                style="display: inline-block;" onclick='initjs.createFile()'>OK</button><button type="button" class="swal2-deny swal2-styled"
                aria-label="" style="display: none;">No</button><button type="button" class="swal2-cancel swal2-styled"
                aria-label="" style="display: none;">Cancel</button>
        </div>
        <div class="swal2-footer" style="display: none;"></div>
        <div class="swal2-timer-progress-bar-container">
            <div class="swal2-timer-progress-bar" style="display: none;"></div>
        </div>
    </div>
</div>
    `
  },
  CreateuploadModal: (item) => {
    return `
    <div class="swal2-container swal2-center swal2-backdrop-show" style="overflow-y: auto;">
    <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container"
        class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true"
        style="display: grid;"><button type="button" class="swal2-close" aria-label="Close this dialog"
            style="display: flex;" onclick='document.getElementById("modal-f").innerHTML = "";'><svg viewBox="0 0 24 24" class="svg-icon svg-close">
                <path class="svg-path-close"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                </path>
            </svg></button>
        <ul class="swal2-progress-steps" style="display: none;"></ul>
        <div class="swal2-icon" style="display: none;"></div><img class="swal2-image" style="display: none;">
        <h2 class="swal2-title" id="swal2-title" style="display: block;">Upload Files</h2>
        <div class="swal2-html-container" id="swal2-html-container" style="display: block;"><span
                class="swal-files-path">
                <div class="_container">
                <div class="progress">
                   <div class="progress-bar" id="jd" role="progressbar" style="width: 0%;">0%</div>
                </div>
                <div style="text-align: center;">
                   <span>Drag & Drop or</span>
                   <button type="button" class="btn btn-success" id="upid">Click To Upload <span id="message"></span></button>
                   
                </div>
                <table class="table">
                   <thead>
                      <tr>
                         <th scope="col">#</th>
                         <th scope="col">Name</th>
                         <th scope="col">Size</th>
                         <th scope="col">Progress</th>
                      </tr>
                   </thead>
                   <tbody id="filesbdy">
          
                   </tbody>
                </table>
             </div>
        <div class="swal2-actions" style="display: flex;">
            <div class="swal2-loader"></div><button type="button" class="swal2-confirm swal2-styled" aria-label=""
                style="display: inline-block;" onclick='initjs.createFile()'>OK</button><button type="button" class="swal2-deny swal2-styled"
                aria-label="" style="display: none;">No</button><button type="button" class="swal2-cancel swal2-styled"
                aria-label="" style="display: none;">Cancel</button>
        </div>
        <div class="swal2-footer" style="display: none;"></div>
        <div class="swal2-timer-progress-bar-container">
            <div class="swal2-timer-progress-bar" style="display: none;"></div>
        </div>
    </div>
</div>
    `
  },
  modalFilePreview: (selectedFile) => {
    function fileExtensions(s) { return ["txt", "css", "ini", "conf", "log", "htaccess", "passwd", "ftpquota", "sql", "js", "json", "sh", "config", "php", "php4", "php5", "phps", "phtml", "htm", "html", "shtml", "xhtml", "xml", "xsl", "m3u", "m3u8", "pls", "cue", "eml", "msg", "csv", "bat", "twig", "tpl", "md", "gitignore", "less", "sass", "scss", "c", "cpp", "cs", "py", "map", "lock", "dtd", "svg", "scss", "asp", "aspx", "asx", "asmx", "ashx", "jsx", "jsp", "jspx", "cfm", "cgi", "yml", "yaml", "toml"].includes(s) }
    function videoExtensions(s) { return ["mp4", "mov", "flv"].includes(s) }
    function imageExtensions(s) { return ["png", "jepg", "gif", "webp", "ico", "JPEG", "JPG", "PNG"].includes(s) }
    if (!selectedFile.is_dir) {
      if (fileExtensions(selectedFile.ext)) {
        initjs.readfile(selectedFile)
      } else if (videoExtensions(selectedFile.ext)) {
        document.querySelector(".modal-preview-dir").innerHTML = `
        <video src="./src/php/Stream.php?path=${selectedFile.path}" controls style="width:100%;"></video>
        `
      } else if (imageExtensions(selectedFile.ext)) {
        document.querySelector(".modal-preview-dir").innerHTML = `
        <img src="s${selectedFile.download_url.slice(2)}" style="width:100%;height : 100%;" />
        `
      } else {
        document.querySelector(".modal-preview-dir").innerHTML = `
      <svg viewBox="0 0 48 48" class="svg-folder modal-svg">
      <svg viewBox="0 0 56 56" class="svg-file svg-text files-svg">
      <path class="svg-file-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"></path>
      <polygon class="svg-file-flip" points="37.5,0.151 37.5,12 49.349,12"></polygon>
      <g class="svg-file-icon">
      <path d="M12.5,13h6c0.553,0,1-0.448,1-1s-0.447-1-1-1h-6c-0.553,0-1,0.448-1,1S11.947,13,12.5,13z"></path>
      <path d="M12.5,18h9c0.553,0,1-0.448,1-1s-0.447-1-1-1h-9c-0.553,0-1,0.448-1,1S11.947,18,12.5,18z"></path>
      <path d="M25.5,18c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 c-0.38-0.37-1.04-0.37-1.42,0c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71C24.979,17.89,25.24,18,25.5,18z"></path>
      <path d="M29.5,18h8c0.553,0,1-0.448,1-1s-0.447-1-1-1h-8c-0.553,0-1,0.448-1,1S28.947,18,29.5,18z"></path>
      <path d="M11.79,31.29c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71 C11.979,32.89,12.229,33,12.5,33c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 C12.84,30.92,12.16,30.92,11.79,31.29z"></path>
      <path d="M24.5,31h-8c-0.553,0-1,0.448-1,1s0.447,1,1,1h8c0.553,0,1-0.448,1-1S25.053,31,24.5,31z"></path>
      <path d="M41.5,18h2c0.553,0,1-0.448,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1S40.947,18,41.5,18z"></path>
      <path d="M12.5,23h22c0.553,0,1-0.448,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.448-1,1S11.947,23,12.5,23z"></path>
      <path d="M43.5,21h-6c-0.553,0-1,0.448-1,1s0.447,1,1,1h6c0.553,0,1-0.448,1-1S44.053,21,43.5,21z"></path>
      <path d="M12.5,28h4c0.553,0,1-0.448,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1S11.947,28,12.5,28z"></path>
      <path d="M30.5,26h-10c-0.553,0-1,0.448-1,1s0.447,1,1,1h10c0.553,0,1-0.448,1-1S31.053,26,30.5,26z"></path>
      <path d="M43.5,26h-9c-0.553,0-1,0.448-1,1s0.447,1,1,1h9c0.553,0,1-0.448,1-1S44.053,26,43.5,26z"></path>
      </g>
      <path class="svg-file-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"></path>
      <text class="svg-file-ext" x="28" y="51.5">${selectedFile.ext}</text>
    </svg>
    </svg>
    `
      }
    } else {
      document.querySelector(".modal-preview-dir").innerHTML = `
      <svg viewBox="0 0 48 48" class="svg-folder modal-svg">
      <path class="svg-folder-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"></path>
      <path class="svg-folder-fg" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"></path>
    </svg>
      `

    }
  },
}

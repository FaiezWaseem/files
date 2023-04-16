// Global Variables
const sideBarToggleClass = "sidebar-closed"
const dropDownLayoutButtons = document.querySelectorAll(".dropdown-item-layout");
const sidebarbtn = document.getElementById("menu-toggle")
var isOpen = false;
const folderAction = document.getElementById("folder-actions");
const contextmenu = document.getElementById("contextmenu")


// SideBar 
const toggleSideBar = function () {
    document.getElementsByTagName("html")[0].classList.toggle(sideBarToggleClass);
}

// Layout DropDown Events
window.onresize = () => {
    // SideBar Toggle
    // window.innerWidth > 768 ? document.getElementsByTagName("html")[0].classList.remove(sideBarToggleClass) : toggleSideBar()
    // DropDown contextmenu hide on resize
    contextmenu.style = ''

}
dropDownLayoutButtons.forEach(btn => {
    btn.onclick = () => {
        document.getElementById("files").className = "";
        document.getElementById("files").className = ("list files-" + btn.getAttribute("data-action"))
        //    btn.classList.toggle("active")
    }
    // btn.classList.toggle("active")    
})

// SideBar Tree Collaps Open/CLose

sidebarbtn.onclick = () => {
    const subtree = document.querySelectorAll(".has-ul");
    sidebarbtn.classList.toggle("is-expanded")
    if (!isOpen) {
        subtree.forEach(li => {
            li.className = "";
            li.className = "menu-li has-ul menu-li-open"
        })
        isOpen = true;
    } else {
        isOpen = false;
        subtree.forEach(li => {
            li.className = "";
            li.className = "menu-li has-ul"
        })
    }
}

// Folder Action Open DropDown Menu
// Contains Options to UPload , create Folder /File
folderAction.onclick = () => {
    document.getElementById("modal-bg").style.display = "block"
    if (contextmenu.style.display !== "block") {
        contextmenu.style = `
     display : block;
     top : ${folderAction.offsetHeight + 59}px;
     right : 0px;
     opacity :1;
     `
    } else {
        contextmenu.style = ""
    }
}
document.getElementById("search").onkeydown = (e) => {
    const search = (e.target.value)
    if (search.length > 2) {
        console.clear()
        document.querySelectorAll(".name").forEach(item => {
            const itemText = item.innerText.toLowerCase();
            if (!itemText.includes(search.toLowerCase())) {
                item.parentNode.parentNode.style.display = "none"
            }
        })
    } else {
        document.querySelectorAll(".name").forEach(item => {
            item.parentNode.parentNode.style.display = "block"
        })

    }
}
document.getElementById("search").onkeyup = (e) => {
    const search = (e.target.value)
    if (search.length > 2) {
        console.clear()
        document.querySelectorAll(".name").forEach(item => {
            const itemText = item.innerText.toLowerCase();
            if (!itemText.includes(search.toLowerCase())) {
                item.parentNode.parentNode.style.display = "none"
            }
        })
    } else {
        document.querySelectorAll(".name").forEach(item => {
            item.parentNode.parentNode.style.display = "block"
        })

    }
}

let editorLoad = (async (value) => {
    let opt;
    let lang;
    ["xcode", "gob", "chrome", "tomorrow_night", "solarized_dark", "kuroir", "github", "dracula", "katzenmilch", "merbivore", "nord_dark", "sqlserver", "textmate"].forEach(function (e) {
        opt += `<option value="${e}">${e}</option>`
    });
    ["abap", "abc", "actionscript", "ada", "alda", "apache_conf", "apex", "aql", "asciidoc", "asl", "assembly_x86", "autohotkey", "batchfile", "bibtex", "c_cpp", "c9search", "cirru", "clojure", "cobol", "coffee", "coldfusion", "crystal", "csharp", "csound_document", "csound_orchestra", "csound_score", "css", "curly", "d", "dart", "diff", "dockerfile", "dot", "drools", "edifact", "eiffel", "ejs", "elixir", "elm", "erlang", "forth", "fortran", "fsharp", "fsl", "ftl", "gcode", "gherkin", "gitignore", "glsl", "gobstones", "golang", "graphqlschema", "groovy", "haml", "handlebars", "haskell", "haskell_cabal", "haxe", "hjson", "html", "html_elixir", "html_ruby", "ini", "io", "ion", "jack", "jade", "java", "javascript", "jexl", "json", "json5", "jsoniq", "jsp", "jssm", "jsx", "julia", "kotlin", "latex", "latte", "less", "liquid", "lisp", "livescript", "log", "logiql", "logtalk", "lsl", "lua", "luapage", "lucene", "makefile", "markdown", "mask", "matlab", "maze", "mediawiki", "mel", "mips", "mixal", "mushcode", "mysql", "nginx", "nim", "nix", "nsis", "nunjucks", "objectivec", "ocaml", "partiql", "pascal", "perl", "pgsql", "php_laravel_blade", "php", "pig", "powershell", "praat", "prisma", "prolog", "properties", "protobuf", "puppet", "python", "qml", "r", "raku", "razor", "rdoc", "red", "rhtml", "robot", "rst", "ruby", "rust", "sac", "sass", "scad", "scala", "scheme", "scrypt", "scss", "sh", "sjs", "slim", "smarty", "smithy", "snippets", "soy_template", "space", "sparql", "sql", "sqlserver", "stylus", "svg", "swift", "tcl", "terraform", "tex", "text", "textile", "toml", "tsx", "turtle", "twig", "typescript", "vala", "vbscript", "velocity", "verilog", "vhdl", "visualforce", "wollok", "xml", "xquery", "yaml", "zeek", "django"].forEach(function (e) {
        lang += `<option value="${e}">${e}</option>`
    });
    await import('https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js').catch((error) => console.log('Loading failed' + error))
    document.querySelector(".modal-preview-dir").appendChild(Object.assign(document.createElement("select"), { id: "themes", innerHTML: opt }))
    document.querySelector(".modal-preview-dir").appendChild(Object.assign(document.createElement("select"), { id: "modes", innerHTML: lang }))
    var editor = await ace.edit('editor')
    window.editor = editor;
    editor.setValue(value, -1)
    editor.currentfile = null;
    ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/')
    editor.setOptions({
        theme: 'ace/theme/tomorrow_night',
        mode: 'ace/mode/javascript',
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    })
    themes.addEventListener('change', function (e) {
        editor.setOptions({
            theme: 'ace/theme/' + e.target.value
        })
    })
    modes.addEventListener('change', function (e) {
        editor.setOptions({
            mode: 'ace/mode/' + e.target.value
        })
    })
})


const initjs = {
    rootPath: null,
    currentPath: null,
    selectedFile: null,
    files: [],
    init: function () {
        // If no roothpath is defined will fetch from server
        if (this.rootPath === null) {
            mydb.rootPath().then(res => {
                if (res.status === 200) {
                    this.currentPath = res.data;
                    this.rootPath = res.data;
                    this.getCurrentFolder()
                } else {
                    alert("Failed To Get Your Root Document Path")
                }
            }).catch(err => {
                alert("Failed To Get Your Root Document Path!  || Error : " + err)
            })
        } else {
            this.getCurrentFolder()
        }
        // Open Modal To create new Folder
        document.querySelector(`[data-action="new_folder"]`).onclick = () => {
            this.hideAllMenusAndModal()
            document.getElementById("modal-f").innerHTML = components.CreateFoldermodal({
                name: "Create new Folder",
            })
        }
        // Open Modal To create new File
        document.querySelector(`[data-action="new_file"]`).onclick = () => {
            this.hideAllMenusAndModal()
            document.getElementById("modal-f").innerHTML = components.CreateFilemodal({
                name: "Create new File",
            })
        }
        // Open Modal To Upload Files
        document.querySelector(`[data-action="upload_files"]`).onclick = () => {
            this.hideAllMenusAndModal()
            document.getElementById("modal-f").innerHTML = components.CreateuploadModal(this.currentPath)
        }
        // Save file
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 's') {
                // Prevent the Save dialog to open
                e.preventDefault();
                this.saveCurrentFile()
            }
        });
    },
    saveCurrentFile(){
        if (this.selectedFile) {

            mydb.putFile(this.currentPath + "/" + this.selectedFile.name, editor.getValue()).then(res => {
                if (res.status === 200) {
                    alert("File Saved")

                }
            }).catch(err => {
                alert("Error saving file: " + err);
            });
        } else {
            alert("No File Selected !")

        }
    },
    getCurrentFolder() {
        //Loads the currentPath Directory
        mydb.getFolder(this.currentPath).then(res => {
            if (res.status === 200) {
                this.files = res.data;
                this.loadSideBar();
                this.loadFiles();
                this.uploadFile();
            } else {
                console.warn(res)
                alert("Failed To Load Files From Directory :" + this.currentPath)
            }
        }).catch(err => {
            console.error("Failed To Load Files From Directory :" + this.currentPath + " || Error : " + err)
            // alert("Failed To Load Files From Directory :" + this.currentPath + " || Error : " + err)

        })
    },
    loadSideBar() {
        const ul = document.querySelector(".menu-root")
        ul.innerHTML = ""
        this.files.forEach(item => {
            if (item.is_dir) {
                ul.innerHTML += components.sideBarFolder(item);
            }
        })
        // Show Total files/folder Count
        document.querySelector(".breadcrumbs-info").innerHTML = `
        ${this.files.length} <span data-lang="folders" class="breadcrumbs-info-type">files/Folder</span>
        `
    },
    loadFiles() {
        this.updateBreadCrumbs();
        let file = document.getElementById("files")
        file.innerHTML = ''
        this.files.forEach(item => {
            if (item.is_dir) {
                file.innerHTML += components.folderCard(item);
            } else {
                if (this.isImage(item.ext)) {
                    file.innerHTML += components.imageCard(item);
                } else if (this.isVideo(item.ext)) {
                    file.innerHTML += components.videocard(item);
                } else if (["csv", "xlsx" , "xls"].includes(item.ext)) {
                    file.innerHTML += components.csvCard(item);
                } else if (["pdf"].includes(item.ext)) {
                    file.innerHTML += components.pdfCard(item);
                } else if (["doc", "docx", "odt"].includes(item.ext)) {
                    file.innerHTML += components.docCard(item);
                } else if (["zip", "tar", "tar.gz", "rar"].includes(item.ext)) {
                    file.innerHTML += components.zipCard(item);
                } else if (["php", "html", "css", "js", "json", "ts", "yml", "rb", "less", "py", "c", "cpp", "csharp", "java", "xml", "xhtml", "sass", "sql", "jsx", "blade.php" , "kt"].includes(item.ext)) {
                    file.innerHTML += components.codeCard(item);
                } else if (["mp3", "ogg", "flac", "m4a", "wav"].includes(item.ext)) {
                    file.innerHTML += components.audioCard(item);
                } else {
                    console.log(item.ext)
                    file.innerHTML += components.fileCard(item);
                }
            }
        })
        this.onFilesLoad();
    },
    folderClicked: function (item) {
        this.currentPath = this.currentPath + "/" + item.name;
        this.getCurrentFolder();
        this.loadSideBar();
        this.loadFiles();
    },
    updateBreadCrumbs: function () {
        let bd = document.getElementById("breadcrumbs")
        bd.innerHTML = `
     <span class="crumb">
              <a  data-path="root" class="crumb-link" onclick='initjs.beadCrumbClick("root")'>
                <svg viewBox="0 0 24 24" class="svg-icon svg-home">
                  <path class="svg-path-home" d="M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M17 13V17H15V14H13V17H11V13H9L14 9L19 13Z"></path>
                </svg>
              </a>
            </span>
     `
        let tempPath = this.currentPath.split(this.rootPath + "/");
        if (tempPath[1]) {
            tempPath[1].split("/").forEach(title => {
                bd.innerHTML += `
            <span class="crumb crumb-active" onclick='initjs.beadCrumbClick("${title}")' style="transform: translateX(0px); opacity: 1;">
                  <a  data-path="${title}" class="crumb-link">${title}</a>
                </span>
            `
            })
        }

    },
    beadCrumbClick: function (title) {
        if (title == "root") {
            this.currentPath = this.rootPath;
        } else {
            this.currentPath = this.currentPath.split(title)[0] + title;
        }
        this.getCurrentFolder();
        this.loadSideBar();
        this.loadFiles();
    },
    isImage: function (ext) {
        const images = ["gif", "JPEG", "PNG", "png", "jpeg", "jpg", "ico", "webp"]
        return images.includes(ext)
    },
    isVideo: function (ext) {
        const videos = ["mp4", "mov", "flv", "3gp", "mkv"]
        return videos.includes(ext)

    },
    onFilesLoad: function () {
        // create an Event listenter for Files Context Menu Background
        document.getElementById("modal-bg").addEventListener("click", (e) => {
            e.preventDefault();
            this.hideAllMenusAndModal()
        })
        // create an Event listenter to open (or show) Context Menu
        // and set the necessary values
        document.querySelectorAll("[data-action='context']").forEach(elem => {
            // Adding onclick event to listen from which file context menu is clicked
            elem.onclick = () => {
                let client = elem.getBoundingClientRect(); // getting client info
                let file = JSON.parse(elem.getAttribute("data-file")) // getting file/folder info
                this.selectedFile = file; // updating the selecting file
                // hiding the folder Context Menu
                contextmenu.style = ''
                // display file context menu
                document.getElementById("filecontextmenu").style = `
                      display: block; 
                      top: ${client.top + 54}px; 
                      left: ${client.left - 100}px;
                      --offset : 120px; 
                      width : 180px; 
                      opacity: 1;
                      `;
                // show modal bg to detect click outside context menu       
                document.getElementById("modal-bg").style.display = "block"
                //Context Menu events
                // Update Context Menu Header with the selected file name
                document.getElementById("file-dropdown-header").innerHTML = components.contextHeader(this.selectedFile.name)
                // Change the download url to current selected file
                document.querySelector("[data-lang='filedownload']").href = this.selectedFile.download_url
                document.querySelector("[data-lang='file-copy-link']").href = this.selectedFile.download_url
                document.querySelector("[data-lang='filedownload']").setAttribute("download", this.selectedFile.name)
                // Files/Folder Info  Modal on Close clicked
                document.querySelector(`[data-lang="close"]`).onclick = () => {
                    this.hideAllMenusAndModal()
                }
                // On File context menu show info clicked display info modal
                document.querySelector(`[data-action='file-info-modal']`).onclick = () => {
                    document.getElementById("filecontextmenu").style = ""
                    document.getElementById("files_modal").style.display = "block"
                    console.log(this.selectedFile)
                    document.querySelector(".modal-title").innerHTML = this.selectedFile.name
                    document.querySelector(".modal-info-name").innerHTML = this.selectedFile.name
                    components.modalFilePreview(this.selectedFile)
                    document.querySelector(".modal-info-mime").innerHTML = `
                    <svg viewBox="0 0 48 48" class="svg-folder svg-icon">
                  <path class="svg-folder-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"></path>
                  <path class="svg-folder-fg" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"></path>
                </svg>
                   ${this.selectedFile.ext === "" ? "directory" : this.selectedFile.ext}
                    `
                    document.querySelector(".modal-info-date").innerHTML = `
                    <path class="svg-path-date" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z">
                    </path>
                  </svg><time datetime="2022-08-12T10:05:53+05:00" data-time="1660280753" data-format="llll" title="Friday, August 12, 2022 10:05 AM ~ 6 months ago" data-title-format="LLLL">${this.selectedFile.modified_time}
                    AM<span class="relative-time"></span></time>
                    `
                    document.querySelector(".modal-info-permissions").innerHTML = `
                    <svg viewBox="0 0 24 24" class="svg-icon svg-lock_open_outline">
                  <path class="svg-path-lock_open_outline" d="M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z">
                  </path>
                </svg>${this.selectedFile.perm}
                    `
                }
                // Open Rename Modal
                document.querySelector(`[data-lang="file-rename"]`).onclick = () => {
                    document.getElementById("modal-f").innerHTML = components.modal(this.selectedFile)
                    this.hideAllMenusAndModal()
                }
                // On File context menu delete clicked , Delete the file
                document.querySelector("[data-action='filedelete']").onclick = () => {
                    console.log(this.currentPath + "/" + this.selectedFile.name)
                    mydb.deleteFile(this.currentPath + "/" + this.selectedFile.name)
                        .then(res => {
                            if (res.status === 200) {
                                this.getCurrentFolder();
                                this.loadSideBar();
                                this.loadFiles();
                                this.selectedFile = null;
                                this.hideAllMenusAndModal()
                            } else if (res.status === 300) {
                                alert(res.data)
                            }
                        })
                }
            }

        })


        setTimeout(() => {
            document.querySelectorAll("video.playvideo").forEach(vid => {
                vid.src = vid.getAttribute("play-src")
                vid.load()
                vid.play()
                setTimeout(() => {
                    vid.pause()
                }, 1000)
            })
        }, 3000)
    },
    clickedRename: function (name) {
        const renamefileNewName = document.getElementById("fileRename").value;
        const renamefileOldName = name;
        const renameFileNewPath = this.currentPath + "/" + renamefileNewName;
        const renameFileOldPath = this.currentPath + "/" + renamefileOldName;
        mydb.fileRename(renameFileOldPath, renameFileNewPath).then(res => {
            if (res.status === 200) {
                console.log("file Renamed")
                this.getCurrentFolder();
                this.loadSideBar();
                this.loadFiles();
                this.selectedFile = null;
                this.hideAllMenusAndModal()
                document.getElementById("modal-f").innerHTML = "";
            } else if (res.status === 300) {
                alert(res.data)
            }
        })
    },
    createFolder: function () {
        const folderName = document.getElementById("cFolder").value;
        mydb.createFolder(folderName, this.currentPath).then(res => {
            if (res.status === 200) {
                console.log("created folder : " + folderName)
                this.getCurrentFolder();
                this.loadSideBar();
                this.loadFiles();
                this.selectedFile = null;
                this.hideAllMenusAndModal()
                document.getElementById("modal-f").innerHTML = "";
            } else if (res.status === 300) {
                alert(res.data)
            }

        })
    },
    createFile: function () {
        const fileName = document.getElementById("cFolder").value;
        console.log(this.currentPath + "/" + fileName)
        mydb.createFile(this.currentPath + "/" + fileName, "").then(res => {
            if (res.status === 200) {
                console.log("created file : " + fileName)
                this.getCurrentFolder();
                this.loadSideBar();
                this.loadFiles();
                this.selectedFile = null;
                this.hideAllMenusAndModal()
                document.getElementById("modal-f").innerHTML = "";
            } else if (res.status === 300) {
                alert(res.data)
            }
        })
    },
    openFileInfoModal: function (elem) {
        let file = JSON.parse(elem.getAttribute("data-item"));
        this.selectedFile = file; // updating the selecting file

        document.querySelector(".modal-info-context").setAttribute("data-file", JSON.stringify(file))

        // hiding the folder Context Menu
        contextmenu.style = ''

        // show modal bg to detect click outside context menu       
        document.getElementById("modal-bg").style.display = "block"
        //Context Menu events
        // Update Context Menu Header with the selected file name
        document.getElementById("file-dropdown-header").innerHTML = components.contextHeader(this.selectedFile.name)
        // Change the download url to current selected file
        document.querySelector("[data-lang='filedownload']").href = this.selectedFile.download_url
        document.querySelector("[data-lang='file-copy-link']").href = this.selectedFile.download_url
        document.querySelector("[data-lang='filedownload']").setAttribute("download", this.selectedFile.name)
        // Files/Folder Info  Modal on Close clicked
        document.querySelector(`[data-lang="close"]`).onclick = () => {
            this.hideAllMenusAndModal()
        }
        // On File context menu show info clicked display info modal
        document.getElementById("filecontextmenu").style = ""
        document.getElementById("files_modal").style.display = "block"
        console.log(this.selectedFile)
        document.querySelector(".modal-title").innerHTML = this.selectedFile.name
        document.querySelector(".modal-info-name").innerHTML = this.selectedFile.name
        components.modalFilePreview(this.selectedFile)
        document.querySelector(".modal-info-mime").innerHTML = `
            <svg viewBox="0 0 48 48" class="svg-folder svg-icon">
          <path class="svg-folder-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"></path>
          <path class="svg-folder-fg" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"></path>
        </svg>
           ${this.selectedFile.ext === "" ? "directory" : this.selectedFile.ext}
            `
        document.querySelector(".modal-info-date").innerHTML = `
            <path class="svg-path-date" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z">
            </path>
          </svg><time datetime="2022-08-12T10:05:53+05:00" data-time="1660280753" data-format="llll" title="Friday, August 12, 2022 10:05 AM ~ 6 months ago" data-title-format="LLLL">${this.selectedFile.modified_time}
            AM<span class="relative-time"></span></time>
            `
        document.querySelector(".modal-info-permissions").innerHTML = `
            <svg viewBox="0 0 24 24" class="svg-icon svg-lock_open_outline">
          <path class="svg-path-lock_open_outline" d="M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z">
          </path>
        </svg>${this.selectedFile.perm}
            `

        // Open Rename Modal
        document.querySelector(`[data-lang="file-rename"]`).onclick = () => {
            document.getElementById("modal-f").innerHTML = components.modal(this.selectedFile)
            this.hideAllMenusAndModal()
        }

        // On File context menu delete clicked , Delete the file
        document.querySelector("[data-action='filedelete']").onclick = () => {
            console.log(this.currentPath + "/" + this.selectedFile.name)
            mydb.deleteFile(this.currentPath + "/" + this.selectedFile.name)
                .then(res => {
                    if (res.status === 200) {
                        this.getCurrentFolder();
                        this.loadSideBar();
                        this.loadFiles();
                        this.selectedFile = null;
                        this.hideAllMenusAndModal()
                    }
                })
        }

    },
    hideAllMenusAndModal: function () {
        document.getElementById("filecontextmenu").style = ""
        document.getElementById("modal-bg").style.display = "none"
        document.getElementById("files_modal").style.display = "none"
        contextmenu.style = ""
        // document.getElementById("modal-f").innerHTML = "";
    },
    readfile: function (file) {
        console.log(this.currentPath + "/" + file.name);
        mydb.getFile(this.currentPath + "/" + file.name).then(res => {
            if (res.status == 200) {
                document.querySelector(".modal-preview-dir").style.maxHeight = "300px"
                // document.querySelector(".modal-preview-dir").style.overflow =  "scroll"
                document.querySelector(".modal-preview-dir").innerHTML = `
                <div id="editor" style="height: 250px; width: 100%;">
                </div>
                `
                editorLoad(res.data)
            }
        })
    },
}


initjs.init();
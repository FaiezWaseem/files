// Global Variables
const sideBarToggleClass = "sidebar-closed"
const dropDownLayoutButtons = document.querySelectorAll(".dropdown-item-layout");
const sidebarbtn = document.getElementById("menu-toggle")
var isOpen = false;
const folderAction = document.getElementById("folder-actions");
const contextmenu = document.getElementById("contextmenu")

var elem = document.documentElement;
var isFullScreen = false
/* View in fullscreen */
function openFullscreen() {
    if (isFullScreen) {
        closeFullscreen()
        isFullScreen = false;
        return;
    }
    isFullScreen = true;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    return;
}
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

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
        mydb.isAuthRequired().then(res => {
            localStorage.setItem('isAuthRequired', res.data)
            if (res.data) {
                const Auth = this.isAuthenticated();
                if (Auth.isAuth) {
                    console.log(Auth.token)
                    if (this.rootPath === null) {

                        this.setLoader(true)
                        mydb.rootPath().then(res => {
                            if (res.status === 200) {
                                this.currentPath = res.data;
                                this.rootPath = res.data;
                                this.getCurrentFolder()
                                this.setLoader(false)
                            } else {
                                this.setLoader(false)
                                alert("Failed To Get Your Root Document Path")
                            }
                        }).catch(err => {
                            this.setLoader(false)
                            alert("Failed To Get Your Root Document Path!  || Error : " + err)
                        })
                    } else {
                        this.getCurrentFolder()
                    }
                } else {
                    document.getElementById("modal-f").innerHTML = components.CreateLoginmodal({
                        name: "Authentication",
                    })
                }
            } else {
                localStorage.clear()
                if (this.rootPath === null) {

                    this.setLoader(true)
                    mydb.rootPath().then(res => {
                        if (res.status === 200) {
                            this.currentPath = res.data;
                            this.rootPath = res.data;
                            this.getCurrentFolder()
                            this.setLoader(false)
                        } else {
                            this.setLoader(false)
                            alert("Failed To Get Your Root Document Path")
                        }
                    }).catch(err => {
                        this.setLoader(false)
                        alert("Failed To Get Your Root Document Path!  || Error : " + err)
                    })
                } else {
                    this.getCurrentFolder()
                }
            }
        })

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

            let btn = document.getElementById("upid");
            btn.addEventListener("click", function () {
                let input = document.createElement("input")
                input.type = "file";
                input.multiple = true;
                input.id = "id_" + Math.floor((Math.random() * 10) + 1)
                input.onchange = (e) => {
                    initjs.upload(input.files)
                }

                input.click()
            })
        }
        // Save file
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 's') {
                // Prevent the Save dialog to open
                e.preventDefault();
                this.saveCurrentFile()
            }
        });
        const dropArea = document.body;
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault(); //preventing from default behaviour
            document.body.style.border = "4px dashed green"
        });
        dropArea.addEventListener("dragleave", (event) => {
            console.log(event)
            document.body.style.border = "0px solid green"
        });
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault(); //preventing from default behaviour
            document.body.style.border = "0px solid green"
            this.hideAllMenusAndModal()
            document.getElementById("modal-f").innerHTML = components.CreateuploadModal(this.currentPath)
            let files = event.dataTransfer.files;
            this.upload(files)
            let btn = document.getElementById("upid");
            btn.addEventListener("click", function () {
                let input = document.createElement("input")
                input.type = "file";
                input.multiple = true;
                input.id = "id_" + Math.floor((Math.random() * 10) + 1)
                input.onchange = (e) => {
                    initjs.upload(input.files)
                }

                input.click()
            })
        });
    },
    saveCurrentFile() {
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
        this.setLoader(true)
        mydb.getFolder(this.currentPath).then(res => {
            if (res.status === 200) {
                this.files = res.data;
                this.loadSideBar();
                this.loadFiles();
                this.uploadFile();
                this.setLoader(false)
            } else {
                console.warn(res)
                this.setLoader(false)
                alert("Failed To Load Files From Directory :" + this.currentPath)
            }
        }).catch(err => {
            this.setLoader(false)
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
                } else if (["csv", "xlsx", "xls"].includes(item.ext)) {
                    file.innerHTML += components.csvCard(item);
                } else if (["pdf"].includes(item.ext)) {
                    file.innerHTML += components.pdfCard(item);
                } else if (["doc", "docx", "odt"].includes(item.ext)) {
                    file.innerHTML += components.docCard(item);
                } else if (["zip", "tar", "tar.gz", "rar"].includes(item.ext)) {
                    file.innerHTML += components.zipCard(item);
                } else if (["php", "html", "css", "js", "json", "ts", "yml", "rb", "less", "py", "c", "cpp", "csharp", "java", "xml", "xhtml", "sass", "sql", "jsx", "blade.php", "kt"].includes(item.ext)) {
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
    folderClicked(item) {
        this.currentPath = this.currentPath + "/" + item.name;
        this.getCurrentFolder();
        this.loadSideBar();
        this.loadFiles();
    },
    updateBreadCrumbs() {
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
    beadCrumbClick(title) {
        if (title == "root") {
            this.currentPath = this.rootPath;
        } else {
            this.currentPath = this.currentPath.split(title)[0] + title;
        }
        this.getCurrentFolder();
        this.loadSideBar();
        this.loadFiles();
    },
    isImage(ext) {
        const images = ["gif", "JPEG", "PNG", "png", "jpeg", "jpg", "ico", "webp"]
        return images.includes(ext)
    },
    isVideo(ext) {
        const videos = ["mp4", "mov", "flv", "3gp", "mkv"]
        return videos.includes(ext)

    },
    onFilesLoad() {
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
                document.querySelector(`[data-action="Unzip"]`).onclick = () => {
                    console.log(this.selectedFile)
                    if (this.selectedFile.ext === 'zip') {
                        let separatorIndex = this.selectedFile.path.lastIndexOf('/');
                        let directoryPath = this.selectedFile.path.substring(0, separatorIndex);

                        let filePath = this.selectedFile.path;
                        separatorIndex = filePath.lastIndexOf('/');
                        let filenameWithExtension = filePath.substring(separatorIndex + 1);
                        let filenameWithoutExtension = filenameWithExtension.slice(0, filenameWithExtension.lastIndexOf('.'));

                        mydb.unzipFile(this.selectedFile.path, directoryPath, filenameWithoutExtension)
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
                    }else{
                        alert('Not A Zip File')
                    }

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
    clickedRename(name) {
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
    createFolder() {
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
    createFile() {
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
    openFileInfoModal(elem) {
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
           ${this.selectedFile.ext === "" ? "directory" : this.selectedFile.ext} | ${this.selectedFile.size}
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
        this.setLoader(true)
        mydb.getFile(this.currentPath + "/" + file.name).then(res => {
            if (res.status == 200) {
                document.querySelector(".modal-preview-dir").style.maxHeight = "300px"
                // document.querySelector(".modal-preview-dir").style.overflow =  "scroll"
                document.querySelector(".modal-preview-dir").innerHTML = `
                <div id="editor" style="height: 250px; width: 100%;">
                </div>
                <button type="button" class="btn btn-1 is-icon" onclick="initjs.saveCurrentFile()" data-tooltip="save" data-lang="save"><svg viewBox="0 0 24 24" class="svg-icon svg-save_edit"><path class="svg-path-save_edit" d="M10,19L10.14,18.86C8.9,18.5 8,17.36 8,16A3,3 0 0,1 11,13C12.36,13 13.5,13.9 13.86,15.14L20,9V7L16,3H4C2.89,3 2,3.9 2,5V19A2,2 0 0,0 4,21H10V19M4,5H14V9H4V5M20.04,12.13C19.9,12.13 19.76,12.19 19.65,12.3L18.65,13.3L20.7,15.35L21.7,14.35C21.92,14.14 21.92,13.79 21.7,13.58L20.42,12.3C20.31,12.19 20.18,12.13 20.04,12.13M18.07,13.88L12,19.94V22H14.06L20.12,15.93L18.07,13.88Z"></path></svg></button>
                <button type="button" class="btn btn-1 is-icon" onclick="initjs.copyContent()" data-tooltip="copy text" data-lang="copy text"><svg viewBox="0 0 24 24" class="svg-icon svg-clipboard"><path class="svg-path-clipboard" d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"></path></svg></button>
                
                `
                editorLoad(res.data)
                this.setLoader(false)
            }
        }).catch(err => this.setLoader(false))
    },
    copyContent() {
        try {
            const text = editor.getValue();
            navigator.clipboard.writeText(text);
            alert('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    },
    setLoader(show = true) {
        document.querySelector(".loader").style.display = show ? "flex" : "none"
    },
    upload(files) {
        function Progress(num) {
            var jd = document.getElementById('jd');
            jd.style.cssText = 'width:' + num + '%';
            jd.innerHTML = num + '%';
            document.getElementById("message").innerText = num + '%';
        }
        $.fcup({

            files,
            upId: 'upid', //Upload the id of the dom

            upShardSize: '2', //Slice size, (maximum per upload) in unit M, default 3M

            upMaxSize: '9216', //Upload file size, unit M, no setting no limit supported 9GB

            upUrl: './src/php/file.php?p=' + this.currentPath, //File upload interface

            //The interface returns a result callback, which is judged according to the
            // data returned by the result, and can return a string or json for judgment processing
            upCallBack: function (res, id) {

                // 状态
                var status = res.status;
                // 信息
                var msg = res.message;
                // url
                var url = res.url + "?" + Math.random();

                // Already done
                if (status == 2) {
                    // alert(msg);
                    document.getElementById("f" + id).innerText = "Done";
                }

                // still uploading
                if (status == 1) {
                    console.log(msg);
                }

                // The interface returns an error
                if (status == 0) {
                    // Stop uploading trigger $.upStop function
                    $.upErrorMsg(msg);
                }

                // 判断是否上传过了
                if (status == 3) {
                    Progress(100);
                    jQuery.upErrorMsg(msg);
                }
            },

            // 上传过程监听，可以根据当前执行的进度值来改变进度条
            upEvent: function (num, id) {
                // num的值是上传的进度，从1到100
                Progress(num);
                document.getElementById("f" + id).innerText = num + "%";
            },

            // 发生错误后的处理
            upStop: function (errmsg) {
                // 这里只是简单的alert一下结果，可以使用其它的弹窗提醒插件
                alert(errmsg);
                document.getElementById("message").innerText = "Uploading Failed .... " + errmsg;
            },

            // 开始上传前的处理和回调,比如进度条初始化等
            upStart: function () {
                Progress(0);
                document.getElementById("message").innerText = "Uploading Started ....";
            },
            listfiles: function (files) {
                for (let i = 0; i < files.length; i++) {
                    const element = files[i];
                    document.getElementById("filesbdy").innerHTML += `
                      <tr>
                      <th scope="row">${i + 1}</th>
                      <td>${element.name}</td>
                      <td>${humanFileSize(element.size)}</td>
                      <td id="f${element.size}">0%</td>
                      </tr>
                        `

                }
            }

        });
        function humanFileSize(size) {
            var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
            return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        }
    },
    isAuthenticated() {
        const token = window.localStorage.getItem('token') || null;
        if (token) {
            return {
                isAuth: true,
                token,
            };
        }
        return {
            isAuth: false,
            token: null
        }

    },
    login() {
        /**
         * @type {string}
         */
        const username = document.getElementById('username').value;
        /**
        * @type {string}
        */
        const password = document.getElementById('password').value;
        if (username.length > 0 && password.length > 0) {
            mydb.login(username, password)
                .then(res => {
                    if (res.status === 200) {
                        window.localStorage.setItem('token', res.data.token);
                        document.getElementById("modal-f").innerHTML = "";
                        this.init()
                    }
                })
        }
    }
}


initjs.init();
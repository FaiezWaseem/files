<?php
// use absolute path of directory i.e: '/var/www/folder' or $_SERVER['DOCUMENT_ROOT'].'/folder'
$root_path = $_SERVER['DOCUMENT_ROOT'];


// provide Auth username & password
$auth = array(
    'username' => 'faiez',
    'password' => '$2y$10$S3akzb3kHClIM8bIChTJsucGMpmnVHaR.yu.s5L5MitUIt2RkSE26' // or getHash('some password')
);
$isAuth = false; // set to true to enable auth

// Read Mode Only
// set to true if want to disable delete and create options
$read_only = false;
// Set Specific Rights
$config = array(
    "allow_file_create" => true,
    "allow_folder_create" => true,
    "allow_folder_delete" => true,
    "allow_file_delete" => true,
    "allow_file_rename" => true,
    "allow_folder_rename" => true,
    "allow_read_folder" => true,
    "allow_read_file" => true,
);

function isAuth()
{
    global $isAuth, $auth;
    if ($isAuth) {
        if (isset($_GET['token']) ? $_GET['token'] == $auth['password'] : false) {
            return true;
        }
        if (isset($_POST['token']) ? $_POST['token'] == $auth['password'] : false) {
            return true;
        }
        return false;
    } else {
        return true;
    }

}
function getHash($pwd)
{
    return password_hash($pwd, PASSWORD_DEFAULT);
}
function matchHash($pwd, $hashed_pass)
{
    return password_verify($pwd, $hashed_pass) ? true : false;
}

/**
 *  will be using this temporarily for mobile file upload
 */
if(isset($_FILES['file_attachment']['name'])){
    if(!empty($_FILES['file_attachment']['name']))
    {
      $target_dir = $_GET['p'].'/';
      if (!file_exists($target_dir))
      {
        mkdir($target_dir, 0777);
      }
      $target_file =
        $target_dir . basename($_FILES["file_attachment"]["name"]);
      $imageFileType = 
        strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
      // Check if file already exists
      if (file_exists($target_file)) {
        echo json_encode(
           array(
             "status" => 0,
             "data" => array()
             ,"msg" => "Sorry, file already exists."
           )
        );
        die();
      }
      // Check file size
      if ($_FILES["file_attachment"]["size"] > 70000000) {
        echo json_encode(
           array(
             "status" => 0,
             "data" => array(),
             "msg" => "Sorry, your file is too large."
           )
         );
        die();
      }
      if (
        move_uploaded_file(
          $_FILES["file_attachment"]["tmp_name"], $target_file
        )
      ) {
        echo json_encode(
          array(
            "status" => 1,
            "data" => $_GET['p'],
            "msg" => "The file " . 
                     basename( $_FILES["file_attachment"]["name"]) .
                     " has been uploaded."));
      } else {
        echo json_encode(
          array(
            "status" => 0,
            "data" => array(),
            "msg" => "Sorry, there was an error uploading your file."
          )
        );
      }
    }
}

if (isset($_POST["login"]) && isset($_POST["username"]) && isset($_POST["password"])) {
    if ($_POST['username'] == $auth['username'] && matchHash($_POST['password'], $auth['password'])) {
        return response(200, "Success", [
            'token' => $auth['password'],
            'username' => $auth['username']
        ]);
    } else {
        return response(400, "Failed", [
            'error' => 'Invalid Credentials'
        ]);
    }
}
// to get a video file preview 
if (isset($_GET["vid"])) {
    $file = $_GET["vid"];
    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Disposition: attachment; filename=' . basename($file));
        if (filesize($file) > 1220497) {
            header('Content-Length: 1220497');
            readfile($file);
            exit;
        } else {
            header('Content-Length: ' . filesize($file));
            readfile($file);
            exit;
        }
    }
}

// Download file
if (isset($_GET["dw"])) {
    $file = $_GET["dw"];
    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        if (is_dir($file)) {
            $rootPath = str_replace(basename($file), "", $file);
            $zipPath = $rootPath . basename($file) . '.zip';

            ziptoFolder($file, $zipPath);
            header('Content-Disposition: attachment; filename=' . basename($file) . '.zip');
            header('Content-Length: ' . filesize($zipPath));
            ob_clean();
            flush();
            readfile($zipPath);
            exit;
        } else {

            header('Content-Disposition: attachment; filename=' . basename($file));
            header('Content-Length: ' . filesize($file));
            ob_clean();
            flush();
            readfile($file);
            exit;
        }
    }
}
if (isset($_GET["img"])) {
    header('Content-type: image/jpeg');
    echo readfile($_GET['img']);
}
if (isset($_POST["getRoot"])) {
    if (isAuth() && $config["allow_read_folder"]) {
        return response(200, "Ok", $root_path);
    }else{
        return response(300, "Failed", [
            'error' => 'Either User Need Authentications or You dont have Permission To Access this Method'
        ]);
    }
}
if (isset($_POST["getFolder"]) && isset($_POST["path"]) && isset($_POST["rename"])) {
    if (isAuth() && $config["allow_folder_rename"]) {
        if (!$read_only) {
            if (rename($_POST["getFolder"], $_POST["path"])) {
                return response(200, "Ok", "saved");
            } else {
                return response(300, "Failed", "Failed To Rename");
            }
        } else {
            return response(300, "Failed", "currently in Read Only Mode Cannot Rename File/folder");
        }
    }
}
if (isset($_POST["getFolder"]) && isset($_POST["path"])) {
    $current_path = $_POST["path"];
    $dir_files = array();
    if (isAuth() && $config["allow_read_folder"]) {
        if (is_dir($_POST["path"])) {
            if ($dh = opendir($_POST["path"])) {
                while (($file = readdir($dh)) !== false) {
                    if ($file !== ".." && $file !== ".") {
                        $ext = pathinfo($file, PATHINFO_EXTENSION);
                        $is_Image_dim = getImageDimensions($current_path . "/" . $file);

                        array_push($dir_files, [
                            "name" => $file,
                            "ext" => $ext,
                            "is_dir" => is_dir($current_path . "/" . $file),
                            "size" => getHumanReadableSize(filesize($current_path . "/" . $file)),
                            "modified_time" => date("F d Y H:i:s", filemtime($current_path . "/" . $file)),
                            "perm" => substr(sprintf("%o", fileperms($current_path . "/" . $file)), -4),
                            "download_url" => "/src/php/index.php?" . ($is_Image_dim ? "img" : "dw") . "=" . $current_path . "/" . urlencode($file),
                            "dimension" => $is_Image_dim,
                            "path" => $current_path . "/" . $file,
                        ]);
                    }
                }
            }
            return response(200, "Ok", $dir_files);
        } else {
            return response(300, "Not A folder", $_POST["path"]);
        }
    }
}
if (isset($_POST["create"]) && isset($_POST["folder"]) && isset($_POST["path"])) {
    if (isAuth() && $config["allow_folder_create"]) {
        if (!$read_only) {

            if (mkdir($_POST["path"] . "/" . $_POST["folder"])) {
                return response(200, "Ok", $_POST["folder"] . " Created");
            } else {
                return response(300, "Ok", $_POST["folder"] . " Failed to create!");
            }
        } else {
            return response(300, "Failed", "Failed To create currently in read only mode");
        }
    }
}
if (isset($_POST["create"]) && isset($_POST["path"]) && isset($_POST["data"])) {
    if (isAuth() && $config["allow_file_create"]) {
        if (!$read_only) {
            saveFile($_POST["path"], json_decode($_POST["data"]));
            response(200, "Ok", getFile($_POST["path"]));
        } else {
            return response(300, "Failed", "Failed To Create Currently in Read only mode");
        }
    }
}
if (isset($_POST["get"]) && isset($_POST["path"])) {
    if (isAuth() && $config["allow_read_file"]) {
        response(200, "Ok", getFile($_POST["path"]));
    }
}
if (isset($_POST["save"]) && isset($_POST["path"]) && isset($_POST["data"])) {
    if (isAuth() && $config["allow_file_create"]) {
        if (!$read_only) {
            saveFile($_POST["path"], $_POST["data"]);
            response(200, "Ok", getFile($_POST["path"]));
        } else {
            return response(300, "Failed", "Failed To save curently in read only mode");
        }
    }
}
if (isset($_POST["remove"]) && isset($_POST["path"])) {
    if (isAuth() && $config["allow_file_delete"]) {
        if (!$read_only) {
            if (deleteDirectory($_POST["path"])) {
                response(200, "Ok", "Delete failed");
            } else {
                response(300, "Ok", "Delete failed");
            }
        } else {
            return response(300, "Failed", "Failed To delete currently in read only mode");
        }
    }
}
if(isset($_POST['isAuthRequired'])){
    response(200, "Ok", $isAuth);
}



function deleteDirectory($dir)
{
    if (!file_exists($dir)) {
        return true;
    }

    if (!is_dir($dir)) {
        return unlink($dir);
    }

    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }

        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }

    }

    return rmdir($dir);
}
function saveFile(string $path, $content)
{
    $myfile = fopen($path, "w") or die("Unable to open file!");
    $text = json_decode($content);
    fwrite($myfile, $text);
    fclose($myfile);
}

function getFile(string $path)
{
    if (file_exists($path)) {
        return file_get_contents($path);
    } else {
        return null;
    }

}
function response($status, $status_message, $data)
{
    header("Access-Control-Allow-Origin: *");
    header("Content-Type:application/json");
    header("HTTP/1.1 " . $status);
    $response['status'] = $status;
    $response['status_message'] = $status_message;
    $response['data'] = $data;
    $json_response = json_encode($response);
    echo $json_response;
    exit();
}
function getHumanReadableSize($bytes)
{
    if ($bytes > 0) {
        $base = floor(log($bytes) / log(1024));
        $units = array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"); //units of measurement
        return number_format(($bytes / pow(1024, floor($base))), 2) . " $units[$base]";
    } else
        return "0 bytes";
}
function getImageDimensions($path = null)
{
    $ext = pathinfo($path, PATHINFO_EXTENSION);
    $images_ext = array('ico', 'gif', 'jpg', 'jpeg', 'jpc', 'jp2', 'jpx', 'xbm', 'wbmp', 'png', 'bmp', 'tif', 'tiff', 'psd', 'svg', 'webp', 'avif', 'PNG', 'JPEG', 'JPG');
    if (in_array($ext, $images_ext)) {
        list($width, $height, $type, $attr) = getimagesize($path);
        return ["width" => $width, "height" => $height, "type" => $type];
    } else {
        return null;
    }
}
function ziptoFolder($file = null, $outputPath = "file.zip")
{
    // Get real path for our folder
    $rootPath = realpath($file);

    // Initialize archive object
    $zip = new ZipArchive();
    $zip->open($outputPath, ZipArchive::CREATE | ZipArchive::OVERWRITE);

    // Create recursive directory iterator
    /** @var SplFileInfo[] $files */
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($rootPath),
        RecursiveIteratorIterator::LEAVES_ONLY
    );

    foreach ($files as $name => $file) {
        // Skip directories (they would be added automatically)
        if (!$file->isDir()) {
            // Get real and relative path for current file
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($rootPath) + 1);

            // Add current file to archive
            $zip->addFile($filePath, $relativePath);
        }
    }

    // Zip archive will be created only after closing object
    $zip->close();
    return true;
}
?>


<?php
// uploading logic

if(isset($_POST['file_name'])){
  // Set up cross-domain headers
header('Access-Control-Allow-Origin:*');

header('Access-Control-Allow-Methods:PUT,POST,GET,DELETE,OPTIONS');

header('Access-Control-Allow-Headers:x-requested-with,content-type');

header('Content-Type:application/json; charset=utf-8');

$file = isset($_FILES['file_data']) ? $_FILES['file_data']:null; //分段的文件

$name = isset($_POST['file_name']) ? $_POST['file_name']:null; //要保存的文件名

$total = isset($_POST['file_total']) ? $_POST['file_total']:0; //总片数

$index = isset($_POST['file_index']) ? $_POST['file_index']:0; //当前片数

$md5   = isset($_POST['file_md5']) ? $_POST['file_md5'] : 0; //文件的md5值

$size  = isset($_POST['file_size']) ?  $_POST['file_size'] : null; //文件大小

$path  = isset($_GET['p']) ?  str_replace('~', ' ',$_GET['p']) : null; //文件大小

//echo 'Total number of files:'.$total.'Current number of files:'.$index;

// Output json information
function jsonMsg($status,$message,$url=''){
   $arr['status'] = $status;
   $arr['message'] = $message;
   $arr['url'] = $url;
   echo json_encode($arr);
   die();
}

if(!$file || !$name){
	jsonMsg(0,'No files');
}

// Simply determine the file type

$info = pathinfo($name);

// Obtain the file suffix
$ext = isset($info['extension'])?$info['extension']:'';


// In actual use, md5 is used to name the file, which can reduce conflicts

$file_name = $name;

$newfile = $path."/".$file_name;

// The address to which the file is accessible
$url = $path."/".$file_name;

/** 判断是否重复上传 **/
// Clears the file status
clearstatcache($newfile);
// If the file size is the same, it has been uploaded
if(is_file($newfile) && ($size == filesize($newfile))){
   jsonMsg(3,'Already uploaded',$url);          
}
/** Determine if the upload is repeated  **/

// Here is the point to determine whether there is an uploaded file stream
if ($file['error'] == 0) {
    // If the file does not exist, it is created
    if (!file_exists($newfile)) {
        if (!move_uploaded_file($file['tmp_name'], $newfile)) {
            jsonMsg(0,'The file could not be moved');
        }
        // Equal number of pieces equals completion
        if($index == $total ){  
          jsonMsg(2,'Upload complete',$url);
        }        
        jsonMsg(1,'Uploading in progress');
    }     
    // If the current number of tiles is less than or equal to the total number of tiles, continue adding after the file
    if($index <= $total){
        $content = file_get_contents($file['tmp_name']);
        if (!file_put_contents($newfile, $content, FILE_APPEND)) {
          jsonMsg(0,'Unable to write to file');
        }
        // Equal number of pieces equals completion
        if($index == $total ){  
          jsonMsg(2,'Upload complete',$url);
        }
        jsonMsg(1,'Uploading in progress');
    }               
} else {
    jsonMsg(0,'No files were uploaded');
}
}

?>


<?php 
if(isset($_GET['path'])){
/**
 * Description of VideoStream
 *
 * @author Rana
 * @link http://codesamplez.com/programming/php-html5-video-streaming-tutorial
 */
class VideoStream
{
    private $path = "";
    private $stream = "";
    private $buffer = 102400;
    private $start  = -1;
    private $end    = -1;
    private $size   = 0;
 
    function __construct($filePath) 
    {
        $this->path = $filePath;
    }
     
    /**
     * Open stream
     */
    private function open()
    {
        if (!($this->stream = fopen($this->path, 'rb'))) {
            die('Could not open stream for reading');
        }
         
    }
     
    /**
     * Set proper header to serve the video content
     */
    private function setHeader()
    {
        ob_get_clean();
        header("Content-Type: video/mp4");
        header("Cache-Control: max-age=2592000, public");
        header("Expires: ".gmdate('D, d M Y H:i:s', time()+2592000) . ' GMT');
        header("Last-Modified: ".gmdate('D, d M Y H:i:s', @filemtime($this->path)) . ' GMT' );
        $this->start = 0;
        $this->size  = filesize($this->path);
        $this->end   = $this->size - 1;
        header("Accept-Ranges: 0-".$this->end);
         
        if (isset($_SERVER['HTTP_RANGE'])) {
  
            $c_start = $this->start;
            $c_end = $this->end;
 
            list(, $range) = explode('=', $_SERVER['HTTP_RANGE'], 2);
            if (strpos($range, ',') !== false) {
                header('HTTP/1.1 416 Requested Range Not Satisfiable');
                header("Content-Range: bytes $this->start-$this->end/$this->size");
                exit;
            }
            if ($range == '-') {
                $c_start = $this->size - substr($range, 1);
            }else{
                $range = explode('-', $range);
                $c_start = $range[0];
                 
                $c_end = (isset($range[1]) && is_numeric($range[1])) ? $range[1] : $c_end;
            }
            $c_end = ($c_end > $this->end) ? $this->end : $c_end;
            if ($c_start > $c_end || $c_start > $this->size - 1 || $c_end >= $this->size) {
                header('HTTP/1.1 416 Requested Range Not Satisfiable');
                header("Content-Range: bytes $this->start-$this->end/$this->size");
                exit;
            }
            $this->start = $c_start;
            $this->end = $c_end;
            $length = $this->end - $this->start + 1;
            fseek($this->stream, $this->start);
            header('HTTP/1.1 206 Partial Content');
            header("Content-Length: ".$length);
            header("Content-Range: bytes $this->start-$this->end/".$this->size);
        }
        else
        {
            header("Content-Length: ".$this->size);
        }  
         
    }
    
    /**
     * close curretly opened stream
     */
    private function end()
    {
        fclose($this->stream);
        exit;
    }
     
    /**
     * perform the streaming of calculated range
     */
    private function stream()
    {
        $i = $this->start;
        set_time_limit(0);
        while(!feof($this->stream) && $i <= $this->end) {
            $bytesToRead = $this->buffer;
            if(($i+$bytesToRead) > $this->end) {
                $bytesToRead = $this->end - $i + 1;
            }
            $data = fread($this->stream, $bytesToRead);
            echo $data;
            flush();
            $i += $bytesToRead;
        }
    }
     
    /**
     * Start streaming video content
     */
    function start()
    {
        $this->open();
        $this->setHeader();
        $this->stream();
        $this->end();
    }
}
$stream = new VideoStream($_GET['path']);
$stream->start();
}

?>


<!DOCTYPE html>
<html class="menu-enabled has-scrollbars" style="--body-width:1356px;">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="robots" content="noindex,nofollow">
  <title>Files Clone</title>
  <link href="./src/css/files.css" rel="stylesheet">
  <link rel="icon"
    href="data:image/svg+xml,%3Csvg
								xmlns=&#39;http://www.w3.org/2000/svg&#39; viewBox=&#39;0 0 24 24&#39;%3E%3Cpath fill=&#39;%2337474F&#39; d=&#39;M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z&#39; /%3E%3C/svg%3E"
    type="image/svg+xml">
    <style>
       .progress {
         height: 20px;
         margin-bottom: 20px;
         overflow: hidden;
         background-color: #f5f5f5;
         border-radius: 4px;
         -webkit-box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
         box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
      }

      .progress-bar {
         float: left;
         width: 0%;
         height: 100%;
         font-size: 12px;
         line-height: 20px;
         color: #fff;
         text-align: center;
         background-color: #337ab7;
         -webkit-box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);
         box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);
         -webkit-transition: width .6s ease;
         -o-transition: width .6s ease;
         transition: width .6s ease;
      }
      iframe{
        width: 500px;
        height: 350px;
      }
      @media (max-width : 480px) {
        iframe { width : 300px}
      }
    </style>
</head>

<body class="" style="opacity: 1;" >
  <div class="loader">
    <img src="./src/loader.gif" alt="Loading Please Wait..."/>
  </div>
  <!-- MAIN -->
  <main id="main">

    <!-- Navigation bar -->
    <nav id="topbar" class="topbar-sticky headroom headroom--pinned headroom--top headroom--bottom">
      <div id="topbar-top">
        <div id="search-container">
          <input id="search" type="search" placeholder="filter" size="1" spellcheck="false" autocomplete="off"
            autocorrect="off" autocapitalize="off" title="ctrl-F">
          <svg viewBox="0 0 24 24" class="svg-icon svg-search">
            <path class="svg-path-search"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z">
            </path>
          </svg>
        </div>
        <div id="change-layout" class="dropdown mouse-hover">
          <button type="button" class="btn-icon btn-topbar">
            <svg viewBox="0 0 24 24" class="svg-icon svg-layout_rows">
              <path class="svg-path-layout_rows" d="M3,19H9V12H3V19M10,19H22V12H10V19M3,5V11H22V5H3Z"></path>
            </svg>
          </button>
          <div class="dropdown-menu dropdown-menu-topbar dropdown-menu-center">
            <h6 class="dropdown-header" data-lang="layout">layout</h6>
            <div>
              <button class="dropdown-item dropdown-item-layout" data-action="list">
                <svg viewBox="0 0 24 24" class="svg-icon svg-layout_list">
                  <path class="svg-path-layout_list"
                    d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z">
                  </path>
                </svg>
                <span class="dropdown-text" data-lang="list">list <span></span>
                </span>
              </button>
              <button class="dropdown-item dropdown-item-layout" data-action="imagelist">
                <svg viewBox="0 0 24 24" class="svg-icon svg-layout_imagelist">
                  <path class="svg-path-layout_imagelist"
                    d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9"></path>
                </svg>
                <span class="dropdown-text" data-lang="imagelist">imagelist <span></span>
                </span>
              </button>
              <button class="dropdown-item dropdown-item-layout" data-action="blocks">
                <svg viewBox="0 0 24 24" class="svg-icon svg-layout_blocks">
                  <path class="svg-path-layout_blocks"
                    d="M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10"></path>
                </svg>
                <span class="dropdown-text" data-lang="blocks">blocks <span></span>
                </span>
              </button>
              <button class="dropdown-item dropdown-item-layout" data-action="grid">
                <svg viewBox="0 0 24 24" class="svg-icon svg-layout_grid">
                  <path class="svg-path-layout_grid"
                    d="M3,9H7V5H3V9M3,14H7V10H3V14M8,14H12V10H8V14M13,14H17V10H13V14M8,9H12V5H8V9M13,5V9H17V5H13M18,14H22V10H18V14M3,19H7V15H3V19M8,19H12V15H8V19M13,19H17V15H13V19M18,19H22V15H18V19M18,5V9H22V5H18Z">
                  </path>
                </svg>
                <span class="dropdown-text" data-lang="grid">grid <span></span>
                </span>
              </button>
              <button class="dropdown-item dropdown-item-layout active" data-action="rows">
                <svg viewBox="0 0 24 24" class="svg-icon svg-layout_rows">
                  <path class="svg-path-layout_rows" d="M3,19H9V12H3V19M10,19H22V12H10V19M3,5V11H22V5H3Z"></path>
                </svg>
                <span class="dropdown-text" data-lang="rows">rows <span></span>
                </span>
              </button>
              <button class="dropdown-item dropdown-item-layout" data-action="columns">
                <svg viewBox="0 0 24 24" class="svg-icon svg-layout_columns">
                  <path class="svg-path-layout_columns"
                    d="M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z"></path>
                </svg>
                <span class="dropdown-text" data-lang="columns">columns <span></span>
                </span>
              </button>
            </div>
            <div id="layout-options">
              <div id="layout-sizer">
                <label for="layout-sizer-range" class="form-label mb-0">
                  <span data-lang="size">size</span>
                  <span data-lang="rows" class="layout-label-type">rows</span>
                </label>
                <input type="range" class="form-range" id="layout-sizer-range" value="200" min="80" max="220"
                  list="layout-size-default" style="--range-default-pos:0.5;">
                <datalist id="layout-size-default">
                  <option value="150"></option>
                </datalist>
              </div>
              <div id="layout-spacer">
                <label for="layout-spacer-range" class="form-label mb-0">
                  <span data-lang="space">space</span>
                  <span data-lang="rows" class="layout-label-type">rows</span>
                </label>
                <input type="range" class="form-range" id="layout-spacer-range" value="50" min="0" max="100"
                  list="layout-space-default">
                <datalist id="layout-space-default">
                  <option value="50"></option>
                </datalist>
              </div>
              <div id="cover-toggle" style="display: none;">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="covertoggle" checked="">
                  <label class="form-check-label" for="covertoggle" data-lang="uniform">uniform</label>
                </div>
              </div>
              <div id="imagelist-square" style="display: none;">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="imagelistsquare" checked="">
                  <label class="form-check-label" for="imagelistsquare" data-lang="uniform">uniform</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="change-sort" class="dropdown mouse-hover">
          <button type="button" class="btn-icon btn-topbar">
            <svg viewBox="0 0 24 24" class="svg-icon svg-sort_name_asc">
              <path class="svg-path-sort_name_asc"
                d="M9.25 5L12.5 1.75L15.75 5H9.25M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z">
              </path>
            </svg>
          </button>
          <div class="dropdown-menu dropdown-menu-topbar dropdown-menu-center">
            <h6 class="dropdown-header" data-lang="sort">sort</h6>
            <button class="dropdown-item active sort-asc" data-action="name">
              <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
                <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
                <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
              </svg>
              <svg viewBox="0 0 24 24" class="svg-icon svg-sort_name_asc">
                <path class="svg-path-sort_name_asc"
                  d="M9.25 5L12.5 1.75L15.75 5H9.25M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z">
                </path>
                <path class="svg-path-sort_name_desc"
                  d="M15.75 19L12.5 22.25L9.25 19H15.75M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z">
                </path>
              </svg>
              <span class="dropdown-text" data-lang="name">name</span>
            </button>
            <button class="dropdown-item" data-action="kind">
              <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
                <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
                <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
              </svg>
              <svg viewBox="0 0 24 24" class="svg-icon svg-sort_kind_asc">
                <path class="svg-path-sort_kind_asc" d="M3 11H15V13H3M3 18V16H21V18M3 6H9V8H3Z"></path>
                <path class="svg-path-sort_kind_desc" d="M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z"></path>
              </svg>
              <span class="dropdown-text" data-lang="kind">kind</span>
            </button>
            <button class="dropdown-item" data-action="size">
              <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
                <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
                <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
              </svg>
              <svg viewBox="0 0 24 24" class="svg-icon svg-sort_size_asc">
                <path class="svg-path-sort_size_asc"
                  d="M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z">
                </path>
                <path class="svg-path-sort_size_desc"
                  d="M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z">
                </path>
              </svg>
              <span class="dropdown-text" data-lang="size">size</span>
            </button>
            <button class="dropdown-item" data-action="date">
              <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
                <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
                <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
              </svg>
              <svg viewBox="0 0 24 24" class="svg-icon svg-sort_date_asc">
                <path class="svg-path-sort_date_asc"
                  d="M7.78 7C9.08 7.04 10 7.53 10.57 8.46C11.13 9.4 11.41 10.56 11.39 11.95C11.4 13.5 11.09 14.73 10.5 15.62C9.88 16.5 8.95 16.97 7.71 17C6.45 16.96 5.54 16.5 4.96 15.56C4.38 14.63 4.09 13.45 4.09 12S4.39 9.36 5 8.44C5.59 7.5 6.5 7.04 7.78 7M7.75 8.63C7.31 8.63 6.96 8.9 6.7 9.46C6.44 10 6.32 10.87 6.32 12C6.31 13.15 6.44 14 6.69 14.54C6.95 15.1 7.31 15.37 7.77 15.37C8.69 15.37 9.16 14.24 9.17 12C9.17 9.77 8.7 8.65 7.75 8.63M13.33 17V15.22L13.76 15.24L14.3 15.22L15.34 15.03C15.68 14.92 16 14.78 16.26 14.58C16.59 14.35 16.86 14.08 17.07 13.76C17.29 13.45 17.44 13.12 17.53 12.78L17.5 12.77C17.05 13.19 16.38 13.4 15.47 13.41C14.62 13.4 13.91 13.15 13.34 12.65S12.5 11.43 12.46 10.5C12.47 9.5 12.81 8.69 13.47 8.03C14.14 7.37 15 7.03 16.12 7C17.37 7.04 18.29 7.45 18.88 8.24C19.47 9 19.76 10 19.76 11.19C19.75 12.15 19.61 13 19.32 13.76C19.03 14.5 18.64 15.13 18.12 15.64C17.66 16.06 17.11 16.38 16.47 16.61C15.83 16.83 15.12 16.96 14.34 17H13.33M16.06 8.63C15.65 8.64 15.32 8.8 15.06 9.11C14.81 9.42 14.68 9.84 14.68 10.36C14.68 10.8 14.8 11.16 15.03 11.46C15.27 11.77 15.63 11.92 16.11 11.93C16.43 11.93 16.7 11.86 16.92 11.74C17.14 11.61 17.3 11.46 17.41 11.28C17.5 11.17 17.53 10.97 17.53 10.71C17.54 10.16 17.43 9.69 17.2 9.28C16.97 8.87 16.59 8.65 16.06 8.63M9.25 5L12.5 1.75L15.75 5H9.25">
                </path>
                <path class="svg-path-sort_date_desc"
                  d="M7.78 7C9.08 7.04 10 7.53 10.57 8.46C11.13 9.4 11.41 10.56 11.39 11.95C11.4 13.5 11.09 14.73 10.5 15.62C9.88 16.5 8.95 16.97 7.71 17C6.45 16.96 5.54 16.5 4.96 15.56C4.38 14.63 4.09 13.45 4.09 12S4.39 9.36 5 8.44C5.59 7.5 6.5 7.04 7.78 7M7.75 8.63C7.31 8.63 6.96 8.9 6.7 9.46C6.44 10 6.32 10.87 6.32 12C6.31 13.15 6.44 14 6.69 14.54C6.95 15.1 7.31 15.37 7.77 15.37C8.69 15.37 9.16 14.24 9.17 12C9.17 9.77 8.7 8.65 7.75 8.63M13.33 17V15.22L13.76 15.24L14.3 15.22L15.34 15.03C15.68 14.92 16 14.78 16.26 14.58C16.59 14.35 16.86 14.08 17.07 13.76C17.29 13.45 17.44 13.12 17.53 12.78L17.5 12.77C17.05 13.19 16.38 13.4 15.47 13.41C14.62 13.4 13.91 13.15 13.34 12.65S12.5 11.43 12.46 10.5C12.47 9.5 12.81 8.69 13.47 8.03C14.14 7.37 15 7.03 16.12 7C17.37 7.04 18.29 7.45 18.88 8.24C19.47 9 19.76 10 19.76 11.19C19.75 12.15 19.61 13 19.32 13.76C19.03 14.5 18.64 15.13 18.12 15.64C17.66 16.06 17.11 16.38 16.47 16.61C15.83 16.83 15.12 16.96 14.34 17H13.33M16.06 8.63C15.65 8.64 15.32 8.8 15.06 9.11C14.81 9.42 14.68 9.84 14.68 10.36C14.68 10.8 14.8 11.16 15.03 11.46C15.27 11.77 15.63 11.92 16.11 11.93C16.43 11.93 16.7 11.86 16.92 11.74C17.14 11.61 17.3 11.46 17.41 11.28C17.5 11.17 17.53 10.97 17.53 10.71C17.54 10.16 17.43 9.69 17.2 9.28C16.97 8.87 16.59 8.65 16.06 8.63M15.75 19L12.5 22.25L9.25 19H15.75Z">
                </path>
              </svg>
              <span class="dropdown-text" data-lang="date">date</span>
            </button>
          </div>
        </div>
        <button class="btn-icon btn-topbar" id="topbar-fullscreen" onclick="openFullscreen()">
          <svg viewBox="0 0 24 24" class="svg-icon svg-expand">
            <path class="svg-path-expand"
              d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z">
            </path>
            <path class="svg-path-collapse"
              d="M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z">
            </path>
          </svg>
        </button>
      </div>
      <div id="topbar-breadcrumbs">
        <button id="folder-actions" class="context-button" style="">
          <svg viewBox="0 0 24 24" class="svg-icon svg-folder_cog_outline">
            <path class="svg-path-folder_cog_outline"
              d="M4 4C2.89 4 2 4.89 2 6V18C2 19.11 2.9 20 4 20H12V18H4V8H20V12H22V8C22 6.89 21.1 6 20 6H12L10 4M18 14C17.87 14 17.76 14.09 17.74 14.21L17.55 15.53C17.25 15.66 16.96 15.82 16.7 16L15.46 15.5C15.35 15.5 15.22 15.5 15.15 15.63L14.15 17.36C14.09 17.47 14.11 17.6 14.21 17.68L15.27 18.5C15.25 18.67 15.24 18.83 15.24 19C15.24 19.17 15.25 19.33 15.27 19.5L14.21 20.32C14.12 20.4 14.09 20.53 14.15 20.64L15.15 22.37C15.21 22.5 15.34 22.5 15.46 22.5L16.7 22C16.96 22.18 17.24 22.35 17.55 22.47L17.74 23.79C17.76 23.91 17.86 24 18 24H20C20.11 24 20.22 23.91 20.24 23.79L20.43 22.47C20.73 22.34 21 22.18 21.27 22L22.5 22.5C22.63 22.5 22.76 22.5 22.83 22.37L23.83 20.64C23.89 20.53 23.86 20.4 23.77 20.32L22.7 19.5C22.72 19.33 22.74 19.17 22.74 19C22.74 18.83 22.73 18.67 22.7 18.5L23.76 17.68C23.85 17.6 23.88 17.47 23.82 17.36L22.82 15.63C22.76 15.5 22.63 15.5 22.5 15.5L21.27 16C21 15.82 20.73 15.65 20.42 15.53L20.23 14.21C20.22 14.09 20.11 14 20 14M19 17.5C19.83 17.5 20.5 18.17 20.5 19C20.5 19.83 19.83 20.5 19 20.5C18.16 20.5 17.5 19.83 17.5 19C17.5 18.17 18.17 17.5 19 17.5Z">
            </path>
          </svg>
        </button>
        <div class="breadcrumbs-info" style="">6 <span data-lang="folders" class="breadcrumbs-info-type">folders</span>
        </div>
        <div id="breadcrumbs">
          <span class="crumb">
            <a href="https://demo.files.gallery/" data-path="" class="crumb-link">
              <svg viewBox="0 0 24 24" class="svg-icon svg-home">
                <path class="svg-path-home"
                  d="M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M17 13V17H15V14H13V17H11V13H9L14 9L19 13Z">
                </path>
              </svg>
            </a>
          </span>
          <span class="crumb crumb-active" style="transform: translateX(0px); opacity: 1;">
            <a href="https://demo.files.gallery/?galleries" data-path="galleries" class="crumb-link">galleries</a>
          </span>
        </div>
      </div>
      <div id="topbar-info" class="info-hidden"></div>
      <div id="files-sortbar" class="sortbar-rows">
        <div class="sortbar-inner">
          <div class="sortbar-item sortbar-name sortbar-active sort-asc" data-action="name">
            <span data-lang="name" class="sortbar-item-text">name</span>
            <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
              <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
              <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
            </svg>
          </div>
          <div class="sortbar-item sortbar-kind" data-action="kind">
            <span data-lang="kind" class="sortbar-item-text">kind</span>
            <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
              <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
              <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
            </svg>
          </div>
          <div class="sortbar-item sortbar-size" data-action="size">
            <span data-lang="size" class="sortbar-item-text">size</span>
            <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
              <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
              <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
            </svg>
          </div>
          <div class="sortbar-item sortbar-date" data-action="date">
            <span data-lang="date" class="sortbar-item-text">date</span>
            <svg viewBox="0 0 24 24" class="svg-icon svg-menu_down">
              <path class="svg-path-menu_down" d="M7,13L12,18L17,13H7Z"></path>
              <path class="svg-path-menu_up" d="M7,12L12,7L17,12H7Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>
    <!-- Navigation bar -->


    <!-- Files Container -->
    <div id="files-container">
      <div id="files" class="list files-rows" style="--imagelist-height:100px; --imagelist-min-height:auto;">

      </div>
    </div>
    <!-- Files Container -->

  </main>
  <!-- MAIN -->


  <!-- SideBar -->
  <aside id="sidebar">
    <button id="sidebar-toggle" type="button" class="btn-icon" onclick="toggleSideBar()">
      <svg viewBox="0 0 24 24" class="svg-icon svg-menu">
        <path class="svg-path-menu" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path>
        <path class="svg-path-menu_back"
          d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"></path>
      </svg>
    </button>
    <div id="sidebar-inner">
      <div id="sidebar-topbar">
        <button id="menu-toggle" type="button" class="btn-icon">
          <svg viewBox="0 0 24 24" class="svg-icon svg-plus">
            <path class="svg-path-plus" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
            <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
          </svg>
        </button>
      </div>
      <div id="sidebar-menu">
        <ul style="--depth:0" class="menu-root">
        </ul>
      </div>
    </div>
  </aside>
  <!-- SideBar -->



  <div id="sidebar-bg"></div>
  <div id="modal-bg"></div>



  <div class="modal" id="files_modal" tabindex="-1" role="dialog" data-action="close">
    <div class="modal-dialog" role="document">
      <div class="modal-content modal-content-dir" style="opacity: 1; transform: scale(1);">
        <div class="modal-header">
          <h5 class="modal-title" title="files">files</h5>
          <div class="modal-buttons">
            <div class="modal-code-buttons" style="display: none">
              <button type="button" class="btn btn-1 is-icon" data-action="save" data-tooltip="save"
                data-lang="save"><svg viewBox="0 0 24 24" class="svg-icon svg-save_edit">
                  <path class="svg-path-save_edit"
                    d="M10,19L10.14,18.86C8.9,18.5 8,17.36 8,16A3,3 0 0,1 11,13C12.36,13 13.5,13.9 13.86,15.14L20,9V7L16,3H4C2.89,3 2,3.9 2,5V19A2,2 0 0,0 4,21H10V19M4,5H14V9H4V5M20.04,12.13C19.9,12.13 19.76,12.19 19.65,12.3L18.65,13.3L20.7,15.35L21.7,14.35C21.92,14.14 21.92,13.79 21.7,13.58L20.42,12.3C20.31,12.19 20.18,12.13 20.04,12.13M18.07,13.88L12,19.94V22H14.06L20.12,15.93L18.07,13.88Z">
                  </path>
                </svg></button><button type="button" class="btn btn-1 is-icon" data-action="copy"
                data-tooltip="copy text" data-lang="copy text"><svg viewBox="0 0 24 24" class="svg-icon svg-clipboard">
                  <path class="svg-path-clipboard"
                    d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z">
                  </path>
                </svg></button><button type="button" class="btn btn-1 is-icon" data-action="fullscreen"><svg
                  viewBox="0 0 24 24" class="svg-icon svg-expand">
                  <path class="svg-path-expand"
                    d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z">
                  </path>
                  <path class="svg-path-collapse"
                    d="M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z">
                  </path>
                </svg></button>
            </div><button class="btn btn-1 is-icon" data-action="close" data-lang="close" title="Close"><svg
                viewBox="0 0 24 24" class="svg-icon svg-close">
                <path class="svg-path-close"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                </path>
              </svg></button>
          </div>
        </div>
        <div class="modal-body">
          <a target="_blank" title="open in new tab" class="modal-preview modal-preview-dir" >
               
          </a>
          <div class="modal-info">
            <span class="context-button modal-info-context" data-action="context">
              <svg viewBox="0 0 24 24" class="svg-icon svg-dots">
                <path class="svg-path-dots"
                  d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z">
                </path>
                <path class="svg-path-minus" d="M19,13H5V11H19V13Z"></path>
              </svg>
            </span>
            <div class="modal-info-name">files</div>
            <div class="modal-info-meta"><span class="modal-info-mime"><svg viewBox="0 0 48 48"
                  class="svg-folder svg-icon">
                  <path class="svg-folder-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"></path>
                  <path class="svg-folder-fg"
                    d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"></path>
                </svg>directory</span><span class="modal-info-permissions is-readwrite"><svg viewBox="0 0 24 24"
                  class="svg-icon svg-lock_open_outline">
                  <path class="svg-path-lock_open_outline"
                    d="M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z">
                  </path>
                </svg>0755</span></div>
            <div class="modal-info-date"><svg viewBox="0 0 24 24" class="svg-icon svg-date">
                <path class="svg-path-date"
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z">
                </path>
              </svg><time datetime="2022-08-12T10:05:53+05:00" data-time="1660280753" data-format="llll"
                title="Friday, August 12, 2022 10:05 AM ~ 6 months ago" data-title-format="LLLL">Fri, Aug 12, 2022 10:05
                AM<span class="relative-time">6 months ago</span></time></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Folder Context Menu -->
  <div id="contextmenu" class="dropdown-menu cm-bottom" style="">
    <h6 class="dropdown-header" title="content">content</h6>
    <button class="dropdown-item" data-action="modal">
      <span data-lang="show info" class="no-pointer">Show info</span>
    </button>
    <a class="dropdown-item" href="/" target="_blank" data-lang="open in new tab">open in new tab</a>
    <button class="dropdown-item" data-action="clipboard">
      <span data-lang="copy link" class="no-pointer">Copy link</span>
    </button>
    <div class="context-fm">
      <button class="dropdown-item fm-action" data-action="new_folder">
        <svg viewBox="0 0 24 24" class="svg-icon svg-plus">
          <path class="svg-path-plus" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
        </svg>
        <span data-lang="new folder" class="no-pointer">New folder</span>
      </button>
      <button class="dropdown-item fm-action" data-action="new_file">
        <svg viewBox="0 0 24 24" class="svg-icon svg-plus">
          <path class="svg-path-plus" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
        </svg>
        <span data-lang="new file" class="no-pointer">New file</span>
      </button>
      <button  class="dropdown-item fm-action" data-action="upload_files">
        <svg viewBox="0 0 24 24" class="svg-icon svg-tray_arrow_up">
          <path class="svg-path-tray_arrow_up"
            d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z">
          </path>
        </svg>
        <span data-lang="upload" class="no-pointer">Upload</span>
      </button>
    </div>
  </div>
  <!-- Folder Context Menu -->


  <!-- Files Context Menu -->
  <div id="filecontextmenu" class="dropdown-menu cm-bottom" style="">
    <h6 class="dropdown-header" id="file-dropdown-header" title="folder">
      <svg viewBox="0 0 24 24" class="svg-icon svg-image">
        <path class="svg-path-image"
          d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z">
        </path>
      </svg>
      fodler
    </h6>
    <button class="dropdown-item" data-action="file-info-modal">
      <span data-lang="show-info" class="no-pointer">Show info</span>
    </button>
    <a class="dropdown-item" href="#" target="_blank" data-lang="open in new tab">open in new tab</a>
    <a class="dropdown-item" data-action="clipboard" data-lang="file-copy-link">
      <span data-lang="copy link" class="no-pointer">Copy link</span>
    </a>
    <a href="h" class="dropdown-item" data-lang="filedownload" download="">download</a>
    <div class="context-fm">
      <button class="dropdown-item fm-action" data-action="filedelete">
        <svg viewBox="0 0 24 24" class="svg-icon svg-close_thick">
          <path class="svg-path-close_thick"
            d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z">
          </path>
        </svg>
        <span data-lang="delete" class="no-pointer">Delete</span>
      </button>
      <button class="dropdown-item fm-action" data-action="rename" data-lang="file-rename">
        <svg viewBox="0 0 24 24" class="svg-icon svg-pencil_outline">
          <path class="svg-path-pencil_outline"
            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z">
          </path>
        </svg>
        <span class="no-pointer">Rename</span>
      </button>
      <button class="dropdown-item fm-action" data-action="duplicate">
        <svg viewBox="0 0 24 24" class="svg-icon svg-plus_circle_multiple_outline">
          <path class="svg-path-plus_circle_multiple_outline"
            d="M16,8H14V11H11V13H14V16H16V13H19V11H16M2,12C2,9.21 3.64,6.8 6,5.68V3.5C2.5,4.76 0,8.09 0,12C0,15.91 2.5,19.24 6,20.5V18.32C3.64,17.2 2,14.79 2,12M15,3C10.04,3 6,7.04 6,12C6,16.96 10.04,21 15,21C19.96,21 24,16.96 24,12C24,7.04 19.96,3 15,3M15,19C11.14,19 8,15.86 8,12C8,8.14 11.14,5 15,5C18.86,5 22,8.14 22,12C22,15.86 18.86,19 15,19Z">
          </path>
        </svg>
        <span data-lang="duplicate" class="no-pointer">Duplicate</span>
      </button>
    </div>
  </div>
  <!-- Files Context Menu -->



  <div id="modal-f">

  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js" ></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ext-language_tools.min.js"></script>
  <script defer src="./src/js/jquery.min.js"></script>
  <script defer src="./src/js/fcup.js"></script>
  <script defer src="./src/js/tinylib.js"></script>
  <script defer src="./src/js/component.js"></script>
  <script defer src="./src/js/main.js"></script>

</body>

</html>
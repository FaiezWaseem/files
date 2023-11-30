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
if (isset($_POST["unzip"]) && isset($_POST["from"]) && isset($_POST["to"]) && isset($_POST["name"])) {
    if (isAuth() && $config["allow_file_create"]) {
        if (!$read_only) {
            $zip = new ZipArchive;
            $res = $zip->open($_POST["from"]);
            if ($res === TRUE) {
            $zip->extractTo($_POST["to"]."/".$_POST["name"]."/");
            $zip->close();
            response(200, "Ok", "Unzipped");
        } else {
                response(300, "Failed", "Failed To Unzipped");
            }
           
        } else {
            return response(300, "Failed", "Failed To Unzip in read only mode");
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
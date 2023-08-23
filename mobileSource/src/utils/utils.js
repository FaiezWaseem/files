class Utils {
  static appURL(){
    // return 'http://192.168.0.102:8080/files';
    // return 'http://192.168.0.105/files'
    return 'https://fileupload.faiezwaseem.com'
  }
  static isImage(ext) {
    const images = ['gif', 'JPEG', 'PNG', 'png', 'jpeg', 'jpg', 'ico', 'webp'];
    return images.includes(ext);
  }
  static isVideo(ext) {
    const videos = ['mp4', 'mov', 'flv', '3gp', 'mkv'];
    return videos.includes(ext);
  }
  static isPdf(ext) {
    return ['pdf'].includes(ext);
  }
  static isDoc(ext) {
    return ['doc', 'docx', 'odt'].includes(ext);
  }
  static isCompressed(ext) {
    return ['zip', 'tar', 'tar.gz', 'rar'].includes(ext);
  }
  static isCode(ext) {
    const lang = [
      'php',
      'html',
      'css',
      'js',
      'json',
      'ts',
      'yml',
      'rb',
      'less',
      'py',
      'ipynb',
      'c',
      'cpp',
      'csharp',
      'cs',
      'java',
      'xml',
      'xhtml',
      'sass',
      'sql',
      'jsx',
      'blade.php',
      'kt',
    ];
    return lang.includes(ext);
  }
  static isAudio(ext) {
    return ['mp3', 'ogg', 'flac', 'm4a', 'wav'].includes(ext);
  }
  static isPpt(ext) {
    return ['ppt', 'pptx'].includes(ext);
  }
  static isExcel(ext) {
    return ['xlsm', 'xlsx' , 'csv'].includes(ext);
  }
  static isAndroid(ext) {
    return ['apk','aab'].includes(ext);
  }
}

export default Utils;

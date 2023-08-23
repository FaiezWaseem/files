import React from 'react';
import { TouchableOpacity, Image, Linking, ScrollView , ToastAndroid } from 'react-native';
import {
  PBox,
  Box,
  Row,
  Input,
  Text,
  width,
  height,
  Center,
  Button,
} from 'rn-faiez-components';
import * as DocumentPicker from 'expo-document-picker';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import colors from '../utils/colors';
import MasonryList from '@react-native-seoul/masonry-list';
import mydb from '../utils/tinylib';
import Utils from '../utils/utils';
import { BottomSheet } from 'react-native-btr';
import SyntaxHighlighter from 'react-native-syntax-highlighter'; // 2.0.0
import { tomorrow } from 'react-syntax-highlighter/styles/prism'; // 7.0.1
import { Video, ResizeMode } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import WebView from 'react-native-webview';
import Drawer from 'react-native-drawer';
const folderImage = require('../../assets/folder-1484.png');
const zip = require('../../assets/zip.jpg');
const video = require('../../assets/icons8-video-96.png');
const code = require('../../assets/code.jpg');
const pdf = require('../../assets/pdf-2616.png');
const file = require('../../assets/icons8-file-128.png');
const ppt = require('../../assets/pptx.jpg');
const excel = require('../../assets/icons8-excel-144.png');
const android = require('../../assets/apk.jpg');
const audio = require('../../assets/music.jpg');

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 1 },
  main: { paddingLeft: 3 },
};

export default () => {
  const [files, setFiles] = React.useState([]);
  const [rootPath, setRootPath] = React.useState('');
  const [currentPath, setCurrentPath] = React.useState('');
  const [breadcrumb, setBreadCrumb] = React.useState('');
  const [isLoadingNext, setLoadingNext] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogFolderVisible, setDialogFolderVisible] = React.useState(false);
  const [newfilename, setFileName] = React.useState('');

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const ToggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  React.useEffect(() => {
    setLoadingNext(true);
    mydb
      .rootPath()
      .then((res) => {
        if (res.status === 200) {
          setCurrentPath(res.data);
          setRootPath(res.data);
          mydb.getFolder(res.data).then((response) => {
            if (response.status === 200) {
              setLoadingNext(false);
              setFiles(response.data);
            }
          });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    updateBreadCrumbs();
  }, [currentPath]);

  const loadFiles = (path) => {
    setLoadingNext(true);
    mydb.getFolder(path).then((response) => {
      if (response.status === 200) {
        setCurrentPath(path);
        setLoadingNext(false);
        setFiles(response.data);
      }
    });
  };
  const updateBreadCrumbs = () => {
    if (currentPath !== rootPath) {
      let tempPath = currentPath.split(rootPath + '/');
      if (tempPath[1]) {
        console.log(tempPath[1]);
        setBreadCrumb(tempPath[1]);
      } else {
        setBreadCrumb('');
      }
    }
  };
  const goBack = () => {
    const temp = currentPath.split(rootPath + '/');
    if (temp[1]) {
      let path = temp[1].split('/');
      path.pop();
      path = path.toString();
      path = path.replace(/,/g, '/');
      console.log(rootPath + '/' + path);
      loadFiles(rootPath + '/' + path);
    }
  };
  const onPress = (item) => {
    if (item.is_dir) {
      loadFiles(item.path);
    }
  };

  function onItemPress(type) {
    setShowMenu(false);
    if (type === 'cFile') {
      setDialogVisible(true);
    }
    if (type === 'cFolder') {
      setDialogFolderVisible(true);
    }
    if (type === 'upload') {
      console.log(type);
      pickfile();
    }
  }

  const pickfile = async () => {
    try {
      let file = await DocumentPicker.getDocumentAsync({
        multiple: true, type: '*/*',
        copyToCacheDirectory: true,
      });

      if (file.type == 'success') {
        console.log(file)
        uploadFile(file , (e)=>{
          if(e.is_done){
            alert('File Uploaded') 
          }else{
            console.log(e.progress)
            ToastAndroid.showWithGravityAndOffset(
              `${file.name} ${e.progress.toFixed(2)}% uploaded`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        })
      } else {
        console.error(file)
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function doThing(myfile) {
    var file = myfile;
    var chunkSize = 1024 * 1024;
    var fileSize = file.size;
    var chunks = Math.ceil(file.size / chunkSize, chunkSize);
    var chunk = 0;

    console.log('file size..', fileSize);
    console.log('chunks...', chunks);
    sendFileSlice(file, chunkSize, chunk, chunks);
  }

  function sendFileSlice(file, chunkSize, chunk, chunks) {

    const xhttp = new XMLHttpRequest();
    xhttp.setRequestHeader('Content-Type', 'application/octet-stream');
    const serverURL = Utils.appURL() + `/testupload.php?p=${currentPath}`;
    console.log(serverURL)
    if (chunk <= chunks) {
      var offset = chunk * chunkSize;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          chunk++;
          sendFileSlice(file, chunkSize, chunk, chunks);
        }
      };
      xhttp.open("POST", serverURL);
      xhttp.send(file.slice(offset, offset + chunkSize));
    }
  }

  let uploadFile = async (file , onprogress) => {
    const serverURL = Utils.appURL() + `/src/php/?p=${currentPath}`;
    console.clear()
    console.log(serverURL)

    // 1. initialize request
    const xhr = new XMLHttpRequest();
    // 2. open request
    xhr.open('POST', serverURL);
    // 3. set up callback for request
    xhr.onload = () => {
      const response = JSON.parse(xhr.response);
      onprogress({
        progress: 100,
        is_done: true,
        response,
      });
      // ... do something with the successful response
    };
    // 4. catch for request error
    xhr.onerror = (e) => {
      console.error(e);
    };
    // 4. catch for request timeout
    xhr.ontimeout = (e) => {
      console.error(e);
    };
    // 4. create formData to upload
    const formData = new FormData();

    const fileToUpload = { 
      uri: file.uri,
      name: file.name,
      type: file.mimeType
    }

    console.log(fileToUpload)

    formData.append('name', file.name);
    formData.append('file_attachment', fileToUpload);
    // 6. upload the request
    xhr.send(formData);
    // 7. track upload progress
    if (xhr.upload) {
      // track the upload progress
      xhr.upload.onprogress = ({ total, loaded }) => {
        const uploadProgress = loaded / total;
        let a = uploadProgress.toFixed(2);
        a = parseFloat(a) * 100;
        onprogress({
          progress: a,
          is_done: false,
        });
      };
    }

  };


  return (
    <Box flex>
      <Drawer
        type="overlay"
        content={<DrawerComponent files={files} onPress={onPress} />}
        tapToClose={true}
        open={isDrawerOpen}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        onClose={ToggleDrawer}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}>
        <Row pl={8} p={4} bg={colors.dark2} alignItems={'center'}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.green,
              padding: 8,
              maxHeight: 40,
              borderRadius: 4,
            }}
            onPress={ToggleDrawer}>
            <Octicons name="three-bars" size={24} color={colors.white} />
          </TouchableOpacity>
          <Row
            bg={colors.dark}
            pl={5}
            m={5}
            rounded={6}
            alignItems={'center'}
            w={'85%'}>
            <MaterialCommunityIcons
              name="folder-search-outline"
              size={24}
              color={colors.white}
            />
            <Input
              placeholder={'Filter'}
              p={8}
              color={colors.white}
              hintColor={'grey'}
            />
          </Row>
        </Row>
        <Row pl={8} p={4} bg={colors.dark2} alignItems={'center'}>
          <TouchableOpacity
            onPress={() => {
              setCurrentPath(rootPath);
              loadFiles(rootPath);
            }}>
            <MaterialCommunityIcons
              name="folder-home"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={goBack}>
            <Text
              color={colors.white}
              mr={15}
              ml={15}
              style={{
                flex: 1,
              }}>
              {breadcrumb}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <MaterialCommunityIcons
              name="folder-cog-outline"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <OptionPop
            visible={showMenu}
            hideMenu={() => {
              setShowMenu(!showMenu);
            }}
            onItemPress={onItemPress}
          />
        </Row>
        <MasonryList
          data={files}
          keyExtractor={(item) => item.path}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card item={item} onPress={onPress} currentPath={currentPath} />
          )}
          refreshing={isLoadingNext}
          onRefresh={() => loadFiles(currentPath)}
        />
        <Dialog
          visible={dialogFolderVisible}
          toggleDialog={() => setDialogFolderVisible(!dialogFolderVisible)}
          title={'Create Folder'}
          placeholder={'Enter Folder Name'}
          onChangeText={setFileName}
          onPress={() => {
            if (newfilename?.length > 3) {
              mydb.createFolder(newfilename, currentPath).then((res) => {
                if (res.status === 200) {
                  setDialogFolderVisible(false);
                  alert('Folder Created');
                  setFileName('');
                }
              });
            }
          }}
        />
        <Dialog
          visible={dialogVisible}
          toggleDialog={() => setDialogVisible(!dialogVisible)}
          title={'Create File'}
          placeholder={'Enter File Name ex: sample.txt '}
          onChangeText={setFileName}
          onPress={() => {
            if (newfilename?.length > 5) {
              mydb
                .createFile(currentPath + '/' + newfilename, '')
                .then((res) => {
                  if (res.status === 200) {
                    setDialogVisible(false);
                    alert('file Created');
                    setFileName('');
                  }
                });
            }
          }}
        />
      </Drawer>
    </Box>
  );
};

const DrawerComponent = ({ files, onPress }) => {
  return (
    <Box flex bg={colors.darkModal} pt={height(5)}>
      <ScrollView>
        {files.map((item) => {
          if (item.is_dir)
            return (
              <TouchableOpacity
                onPress={() => {
                  onPress(item);
                }}>
                <Row w={'100%'} p={8}>
                  <MaterialCommunityIcons
                    name="folder"
                    size={24}
                    color="white"
                  />
                  <Text fontSize={18} ml={4} color={colors.white}>
                    {item.name.toString()}
                  </Text>
                </Row>
              </TouchableOpacity>
            );
        })}
      </ScrollView>
      <Center>
        <Button
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.white,
            width: 200,
            padding: 8,
          }}
          txtStyle={{
            textAlign: 'center',
          }}
          color={colors.white}>
          Change HOST URL
        </Button>
      </Center>
    </Box>
  );
};

const Card = ({ item, onPress, currentPath }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [rename, setRename] = React.useState('');

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };
  let imageType = 'local';
  let image = file;
  let modalSize = 200;

  if (item.is_dir) {
    image = folderImage;
  }
  if (Utils.isCompressed(item.ext)) {
    image = zip;
  }
  if (Utils.isVideo(item.ext)) {
    image = video;
    modalSize = 400;
  }
  if (Utils.isCode(item.ext)) {
    image = code;
    modalSize = height('80');
  }
  if (Utils.isPdf(item.ext)) {
    modalSize = height('80');
    image = pdf;
  }
  if (Utils.isPpt(item.ext)) {
    image = ppt;
  }
  if (Utils.isExcel(item.ext)) {
    image = excel;
  }
  if (Utils.isAndroid(item.ext)) {
    image = android;
  }
  if (Utils.isImage(item.ext)) {
    image = Utils.appURL() + item.download_url;
    imageType = 'URL';
    modalSize = 400;
  }
  if (Utils.isAudio(item.ext)) {
    image = audio;
  }

  const onItemPress = (type) => {
    console.log(type);
    setShowMenu(false);
    if (type === 'info') {
      toggleBottomNavigationView();
    }
    if (type === 'copylink') {
      Clipboard.setStringAsync(Utils.appURL() + item.download_url).then(
        (res) => {
          alert('Copied To ClipBoard');
        }
      );
    }
    if (type === 'download') {
      Linking.openURL(Utils.appURL() + item.download_url);
    }
    if (type === 'rename') {
      toggleDialog();
    }
    if (type === 'delete') {
      mydb
        .deleteFile(item.path)
        .then((res) => (res.status === 200 ? alert('Deleted') : null));
    }
  };

  return (
    <PBox
      w={width(47)}
      alignItems={'center'}
      bg={colors.white}
      rounded={6}
      m={5}
      p={5}
      onPress={() => {
        onPress(item);
      }}
      onLongPress={() => {
        setShowMenu(true);
      }}>
      <Row w={'100%'} position={'absolute'} justifyContent={'flex-end'}>
        <TouchableOpacity
          onPress={() => {
            setShowMenu(true);
          }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </Row>
      {imageType !== 'local' || Utils.isVideo(item.ext) ? (
        <TouchableOpacity
          onPress={() => {
            toggleBottomNavigationView();
          }}>
          <Image
            source={imageType === 'local' ? image : { uri: image }}
            style={{ width: 80, height: 80 }}
          />
        </TouchableOpacity>
      ) : (
        <Image
          source={imageType === 'local' ? image : { uri: image }}
          style={{ width: 80, height: 80 }}
        />
      )}

      <Text>{item.name}</Text>
      <Dialog
        value={rename}
        visible={dialogVisible}
        toggleDialog={toggleDialog}
        title={'Rename'}
        placeholder={'Enter new Name'}
        onChangeText={(txt) => setRename(txt)}
        onPress={() => {
          if (rename.length > 0) {
            const renamefileNewName = rename;
            const renamefileOldName = item.name;
            const renameFileNewPath = currentPath + '/' + renamefileNewName;
            const renameFileOldPath = currentPath + '/' + renamefileOldName;
            mydb
              .fileRename(renameFileOldPath, renameFileNewPath)
              .then((res) => {
                if (res.status === 200) {
                  alert('file Renamed');
                  item.name = rename;
                  setRename('');
                  toggleDialog();
                }
              });
          }
        }}
      />
      <FileMenu
        visible={showMenu}
        hideMenu={setShowMenu}
        onItemPress={onItemPress}
      />
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
      //Toggling the visibility state on the clicking out side of the sheet
      >
        <Box bg={colors.darkModal} h={modalSize} p={8} m={8} rounded={8}>
          {Utils.isVideo(item.ext) && (
            <Video
              style={{ width: '100%', height: 200 }}
              source={{
                uri: Utils.appURL() + '/src/php/Stream.php?path=' + item.path,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          )}
          {Utils.isImage(item.ext) && (
            <Image
              source={imageType === 'local' ? image : { uri: image }}
              style={{ width: '100%', height: 200 }}
            />
          )}
          {Utils.isCode(item.ext) && <Code item={item} />}
          {Utils.isPdf(item.ext) && (
            <Box h={height(50)}>
              <WebView
                source={{
                  uri:
                    'https://drive.google.com/viewerng/viewer?embedded=true&url=' +
                    Utils.appURL() +
                    item.download_url,
                }}
                onLoadStart={() => {
                  console.log('loading');
                }}
              />
            </Box>
          )}
          <ScrollView>
            <Text color={colors.green} fontWeight={'bold'}>
              <Text color={colors.white}>Name :</Text> {item.name}
            </Text>
            <Text color={colors.white}>Size : {item.size}</Text>
            <Text color={colors.white}>Date : {item.modified_time}</Text>
            <Text color={colors.white}>Extension : {item.ext}</Text>
            <Text color={colors.white}>Path : {item.path}</Text>
            <Text color={colors.white}>
              Download URL :{' '}
              <Text color={'grey'}> {Utils.appURL() + item.download_url}</Text>
            </Text>
          </ScrollView>
        </Box>
      </BottomSheet>
    </PBox>
  );
};
const FileMenu = ({ visible, hideMenu, onItemPress }) => {
  return (
    <Box>
      <Menu visible={visible} onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            onItemPress('info');
          }}>
          {'info'}
        </MenuItem>
        <MenuItem
          onPress={() => {
            onItemPress('copylink');
          }}>
          {'Copy Link'}
        </MenuItem>
        <MenuItem
          onPress={() => {
            onItemPress('download');
          }}>
          {'Download'}
        </MenuItem>
        <MenuItem
          onPress={() => {
            onItemPress('rename');
          }}>
          {'Rename'}
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            onItemPress('delete');
          }}
          textStyle={{
            color: 'red',
          }}>
          {'Delete'}
        </MenuItem>
      </Menu>
    </Box>
  );
};

const Code = ({ item }) => {
  const [codeString, setCodeString] = React.useState('const hello = "welcome"');
  React.useEffect(() => {
    mydb.getFile(item.path).then((res) => {
      console.log(res);
      setCodeString(res.data);
    });
  }, []);

  // <Text  color={colors.white} bg={colors.dark} >{codeString}</Text>
  return (
    <SyntaxHighlighter
      style={tomorrow}
      customStyle={{ padding: 0, margin: 0 }}
      language="php"
      highlighter="prism">
      {codeString}
    </SyntaxHighlighter>
  );
};

const Dialog = ({
  visible,
  toggleDialog,
  title,
  placeholder,
  onChangeText,
  value,
  onPress,
}) => {
  return (
    <BottomSheet
      visible={visible}
      //setting the visibility state of the bottom shee
      onBackButtonPress={toggleDialog}
      //Toggling the visibility state on the click of the back botton
      onBackdropPress={toggleDialog}
    //Toggling the visibility state on the clicking out side of the sheet
    >
      <Center flex>
        <Center w={width(80)} bg={colors.darkModal} rounded={8} p={8}>
          <Text color={colors.white} m={8} fontSize={24}>
            {title}
          </Text>
          <Input
            w={'90%'}
            placeholder={placeholder}
            p={8}
            color={colors.white}
            hintColor={'grey'}
            bg={colors.dark}
            rounded={8}
            mb={8}
            value={value}
            onChangeText={onChangeText}
          />
          <Button
            onPress={onPress}
            style={{
              backgroundColor: colors.green,
              borderRadius: 8,
              width: 50,
              height: 50,
              padding: 8,
              justifyContent: 'center',
            }}
            txtStyle={{
              color: colors.white,
              textAlign: 'center',
            }}>
            OK
          </Button>
        </Center>
      </Center>
    </BottomSheet>
  );
};

const OptionPop = ({ visible, hideMenu, onItemPress }) => {
  return (
    <Box>
      <Menu visible={visible} onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            onItemPress('cFile');
          }}>
          {'Create File'}
        </MenuItem>
        <MenuItem
          onPress={() => {
            onItemPress('cFolder');
          }}>
          {'Create Folder'}
        </MenuItem>
        <MenuItem
          onPress={() => {
            onItemPress('upload');
          }}>
          {'Upload'}
        </MenuItem>
      </Menu>
    </Box>
  );
};

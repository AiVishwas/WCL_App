import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; //
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList, Task} from '../navigation/types';
import {RouteProp} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';//
import {launchCamera, Asset} from 'react-native-image-picker';//

type LongPressDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LongPressDetailScreen'
>;
type LongPressDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'LongPressDetailScreen'
>;

const LongPressDetailScreen = () => {
  const navigation = useNavigation<LongPressDetailScreenNavigationProp>();
  const route = useRoute<LongPressDetailScreenRouteProp>();
  const {task} = route.params;
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedPrakar, setSelectedPrakar] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [completionPhotos, setCompletionPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [cutting, setCutting] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch(error => {
        console.error('Error clearing user session:', error);
      });
    navigation.dispatch(StackActions.popToTop());
  };

  const handleSubmit = () => {
    Alert.alert(
      'Form Submitted',
      `Your data has been submitted successfully! Selected Prakar: ${selectedPrakar}`,
    );
  };

  const handleCancel = () => {
    Alert.alert('Form Cancelled', 'Your data has been discarded.');
  };

  const handleTakePhoto = () => {
    launchCamera({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newPhotoUri = response.assets[0].uri;

        // Ensure newPhotoUri is not undefined or null
        if (newPhotoUri) {
          setPhotos(prevPhotos => [...prevPhotos, newPhotoUri]);
        } else {
          console.error('New photo URI is undefined or null');
        }
      }
    });
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  const handleRemoveAllPhoto = () => {
    Alert.alert('removed');
  };

  const handleSubmitAllPhoto = () => {
    Alert.alert('submit');
  };

  const handleTakeCompletionPhoto = () => {
    launchCamera({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newPhotoUri = response.assets[0].uri;

        // Ensure newPhotoUri is not undefined or null
        if (newPhotoUri) {
          setCompletionPhotos(prevPhotos => [...prevPhotos, newPhotoUri]);
        } else {
          console.error('New photo URI is undefined or null');
        }
      }
    });
  };

  const handleTakeVideo = () => {
    launchCamera({mediaType: 'video', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorMessage) {
        console.error('VideoPicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newVideoUri = response.assets[0].uri;

        // Ensure newVideoUri is not undefined or null
        if (newVideoUri) {
          setVideos(prevVideos => [...prevVideos, newVideoUri]);
        } else {
          console.error('New video URI is undefined or null');
        }
      }
    });
  };

  const handleRemoveCompletionPhoto = (index: number) => {
    setCompletionPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = (index: number) => {
    setVideos(prevVideos => prevVideos.filter((_, i) => i !== index));
  };

  const handleRemoveAllCompletionPhotosAndVideos = () => {
    // Clear all completion photos and videos
    setCompletionPhotos([]);
    setVideos([]);
    Alert.alert('Removed');
  };

  const handleSubmitAllCompletionPhotosAndVideos = () => {
    // Submit all completion photos and videos
    console.log('Completion Photos:', completionPhotos);
    console.log('Videos:', videos);
    Alert.alert('Submitted');
  };

  const handleDeletePart4 = () => {
    setWidth('');
    setHeight('');
    setCutting('');
    Alert.alert('Removed')
  };

  const handleSubmitPart4 = () => {
    // Handle the form submission logic here
    console.log('Submitted details:', {width, height, cutting});
    Alert.alert("Submitted")
  };

  const handleDeletePart5 = () => {
    Alert.alert('Removed')
  };

  const handleSubmitPart5 = () => {
    // Handle the form submission logic here
    Alert.alert("Submitted")
  };

  return (
    <ScrollView contentContainerStyle={{overflow: 'hidden'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/new_logo.png')}
            style={styles.logo}
          />
          {isLoggedIn && (
            <View style={styles.headerRight}>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>नमस्ते</Text>
                <Text style={styles.officerName}>{task.officer}</Text>
              </View>
              <Image
                source={require('../assets/images/user.png')}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}>
                <Image
                  source={require('../assets/images/logout.png')}
                  style={styles.logoutImage}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back_button.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.label}>{task.title}</Text>
            <Text style={styles.value}>{task.code}</Text>
            <Text style={styles.label}>दीवार पेंटिंग का आकार:</Text>
            <Text style={styles.value}>Wall Shop Painting</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.label}>शेष:</Text>
            <Text style={styles.value}>{task.size} Sq. ft</Text>
          </View>
        </View>

        {/* UP Prakar Form */}
        <View style={styles.prakarFormContainer}>
          <Text style={styles.upprakar}>उपप्रकार</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedPrakar}
              onValueChange={itemValue => setSelectedPrakar(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select उपप्रकार" value="" />
              <Picker.Item label="प्रकार 1" value="prakar1" />
              <Picker.Item label="प्रकार 2" value="prakar2" />
              <Picker.Item label="प्रकार 3" value="prakar3" />
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
              <Image
                source={require('../assets/images/deleted.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tickButton} onPress={handleSubmit}>
              <Image
                source={require('../assets/images/done1.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Photo Upload Section */}
        <View style={styles.photoSection}>
          <Text style={styles.photoSectionTitle}>
            काम शुरू करने से पहले फोटो लें
          </Text>
          <TouchableOpacity
            style={styles.takePhotoButton}
            onPress={handleTakePhoto}>
            <Image
              source={require('../assets/images/plus_button.png')}
              style={styles.cameraIcon}
            />
            <Text style={styles.takePhotoText}>फोटो अपलोड करें</Text>
          </TouchableOpacity>

          {/* First Row */}
          <View style={styles.photoRow}>
            <View style={styles.photoDiv}>
              {photos[0] ? (
                <>
                  <Image
                    source={{uri: photos[0]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemovePhoto(0)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
            <View style={styles.photoDiv}>
              {photos[1] ? (
                <>
                  <Image
                    source={{uri: photos[1]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemovePhoto(1)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
          </View>

          {/* Second Row */}
          <View style={styles.photoRow}>
            <View style={styles.photoDiv}>
              {photos[2] ? (
                <>
                  <Image
                    source={{uri: photos[2]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemovePhoto(2)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
            <View style={styles.photoDiv}>
              {photos[3] ? (
                <>
                  <Image
                    source={{uri: photos[3]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemovePhoto(3)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
          </View>

          {/* Button Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.crossButtonThumbnail}
              onPress={() => handleRemoveAllPhoto()}>
              <Image
                source={require('../assets/images/deleted.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tickButtonThumbnail}
              onPress={() => handleSubmitAllPhoto()}>
              <Image
                source={require('../assets/images/done1.png')}
                style={styles.tickIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Completion Photo and Video Upload Section */}
        <View style={styles.photoAndVideoSection}>
          <Text style={styles.photoSectionTitle}>
            काम पूरा होने के बाद फोटो और वीडियो लें
          </Text>
          <TouchableOpacity
            style={styles.takePhotoButton}
            onPress={handleTakeCompletionPhoto}>
            <Image
              source={require('../assets/images/plus_button.png')}
              style={styles.cameraIcon}
            />
            <Text style={styles.takePhotoText}>फोटो अपलोड करें</Text>
          </TouchableOpacity>

          {/* First Row */}
          <View style={styles.photoRow}>
            <View style={styles.photoDiv}>
              {completionPhotos[0] ? (
                <>
                  <Image
                    source={{uri: completionPhotos[0]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveCompletionPhoto(0)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
            <View style={styles.photoDiv}>
              {completionPhotos[1] ? (
                <>
                  <Image
                    source={{uri: completionPhotos[1]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveCompletionPhoto(1)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
          </View>

          {/* Second Row */}
          <View style={styles.photoRow}>
            <View style={styles.photoDiv}>
              {completionPhotos[2] ? (
                <>
                  <Image
                    source={{uri: completionPhotos[2]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveCompletionPhoto(2)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
            <View style={styles.photoDiv}>
              {completionPhotos[3] ? (
                <>
                  <Image
                    source={{uri: completionPhotos[3]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveCompletionPhoto(3)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.takePhotoButton}
            onPress={handleTakeVideo}>
            <Image
              source={require('../assets/images/plus_button.png')}
              style={styles.cameraIcon}
            />
            <Text style={styles.takePhotoText}>वीडियो अपलोड करें</Text>
          </TouchableOpacity>

          {/* First Row for Videos */}
          <View style={styles.photoRow}>
            <View style={styles.videoDiv}>
              {videos[0] ? (
                <>
                  <Image
                    source={{uri: videos[0]}}
                    style={styles.photoThumbnail}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveVideo(0)}>
                    <Image
                      source={require('../assets/images/garbage18.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.cameraIcon}
                />
              )}
            </View>
          </View>

          {/* Buttons Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.crossButtonThumbnail}
              onPress={handleRemoveAllCompletionPhotosAndVideos}>
              <Image
                source={require('../assets/images/deleted.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tickButtonThumbnail}
              onPress={handleSubmitAllCompletionPhotosAndVideos}>
              <Image
                source={require('../assets/images/done1.png')}
                style={styles.tickIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerPart4}>
          <Text style={styles.inputLabel}>(W) चौड़ाई</Text>
          <TextInput
            style={styles.input}
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
            placeholder="चौड़ाई दर्ज करें"
          />
          <Text style={styles.inputLabel}>(H) लंबाई</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="लंबाई दर्ज करें"
          />

          <View style={styles.separator} />

          <Text style={styles.inputLabel}>कटौती</Text>

          <View style={styles.dimensionsRow}>
    <View style={styles.dimension}>
      <Text style={styles.inputLabel}>(W) चौड़ाई</Text>
      <TextInput
        style={styles.inputPart2}
        value={width}
        onChangeText={setWidth}
        keyboardType="numeric"
        placeholder="चौड़ाई दर्ज करें"
      />
    </View>
    <View style={styles.dimension}>
      <Text style={styles.inputLabel}>(H) लंबाई</Text>
      <TextInput
        style={styles.inputPart2}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        placeholder="लंबाई दर्ज करें"
      />
    </View>
  </View>


          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.crossButtonThumbnail}
              onPress={handleDeletePart4}>
              <Image
                source={require('../assets/images/deleted.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tickButtonThumbnail}
              onPress={handleSubmitPart4}>
              <Image
                source={require('../assets/images/done1.png')}
                style={styles.tickIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerPart5}>

          <Text style={styles.inputLabel}>स्थान का पता</Text>
          <TextInput
            style={styles.inputPart5}
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
          />
        
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.crossButtonThumbnail}
              onPress={handleDeletePart5}>
              <Image
                source={require('../assets/images/deleted.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tickButtonThumbnail}
              onPress={handleSubmitPart5}>
              <Image
                source={require('../assets/images/done1.png')}
                style={styles.tickIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

         {/* Add your checkbox and button below the containerPart5 */}
         <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
          />
          <Text style={styles.checkboxText}>
            मैंने जमा करने से पहले सभी अपलोड किए गए दस्तावेज़ और माप को जांच कर लिया है
          </Text>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (isChecked) {
              // Submit form logic
            } else {
              Alert.alert('कृपया चेकबॉक्स को टिक करें');
            }
          }}>
          <Text style={styles.submitButtonText}>जमा करे</Text>
        </TouchableOpacity>
        
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    minHeight: 2600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginEnd: 10,
  },
  userName: {
    fontSize: 19,
    color: '#333',
  },
  officerName: {
    fontSize: 16,
    color: '#585858',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  logoutButton: {
    marginRight: 10,
  },
  logoutImage: {
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#808080',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#FFFFFF',
  },
  prakarFormContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  upprakar: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  pickerWrapper: {
    width: '100%',
    borderWidth: 3, // Add border width
    borderColor: 'black',
    borderRadius: 5, // Rounded corners
    marginVertical: 10,
    overflow: 'hidden', // To ensure the picker is contained within the border
  },
  picker: {
    width: '100%',
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  tickButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  photoSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    height: 450,
  },
  photoAndVideoSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    height: 700,
  },
  photoSectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  takePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  cameraIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  takePhotoText: {
    fontSize: 16,
    color: '#00796B',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  tickButtonThumbnail: {
    padding: 10,
    backgroundColor: '#ffffff80',
    borderRadius: 5,
    zIndex: 1,
    marginBottom: 10,
  },
  crossButtonThumbnail: {
    padding: 10,
    backgroundColor: '#ffffff80',
    borderRadius: 5,
    zIndex: 1,
    marginBottom: 10,
  },
  tickIcon: {
    width: 28,
    height: 28,
  },
  crossIcon: {
    width: 28,
    height: 28,
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  photoDiv: {
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
  },
  videoDiv: {
    width: '90%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
  },
  photoThumbnail: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  containerPart4: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    width: 290,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginTop: 15,

  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
  },
  separator: {
    height: 2,
    width: 300,
    backgroundColor: 'black',
    marginVertical: 15,
  },
  dimensionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dimension: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputPart2: {
    width: 130,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginTop: 15,

  },
  
  containerPart5: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  inputPart5: {
    width: 290,
    height: 110,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginTop: 15,

  },
  checkboxContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  checkbox: {
    alignSelf: 'center',

  },
  checkboxText: {
    fontSize: 18,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    width: 200,
    height: 40,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 75,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -6,
  },
});

export default LongPressDetailScreen;

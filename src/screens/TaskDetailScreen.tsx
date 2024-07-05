import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { StackActions } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;


const TaskDetailScreen = ({ route }: { route: TaskDetailScreenRouteProp }) => {
  const navigation = useNavigation();
  const { task } = route.params;
  const [uploadedFiles, setUploadedFiles] = useState<DocumentPickerResponse[]>([]);
  const [selectedPhotosCard1, setSelectedPhotosCard1] = useState<string[]>([]);
  const [selectedPhotosCard2, setSelectedPhotosCard2] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showPhotoContainer1, setShowPhotoContainer1] = useState(false);
  const [showPhotoContainer2, setShowPhotoContainer2] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    cutWidth: '',
    cutHeight: ''
  });
  

  const handleInputChange = (name: string, value: string) => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      setDimensions({ ...dimensions, [name]: value });
    }
  };

  const handleDocumentPick = async (cardIndex: number) => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setUploadedFiles(prevFiles => [...prevFiles, ...results]);
      if (cardIndex === 1) {
        setSelectedPhotosCard1(prevPhotos => [...prevPhotos, ...results.map(file => file.uri)]);
      } else if (cardIndex === 2) {
        setSelectedPhotosCard2(prevPhotos => [...prevPhotos, ...results.map(file => file.uri)]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.error(err);
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSubmitOverall = () => {
    if (
      !dimensions.width ||
      !dimensions.height ||
      !dimensions.cutWidth ||
      !dimensions.cutHeight ||
      selectedPhotosCard1.length === 0 ||
      selectedPhotosCard2.length === 0
    ) {
      Alert.alert('Error', 'Please fill all fields and upload at least one photo in each container.');
      return;
    }
  
    navigation.navigate('TaskList', {
        officerName: task.officer,
        taskId: task.id,
        backgroundColor: 'orange',
    });
  };
  

  const handleAdd = () => {
    Alert.alert('Add Files', 'Add Photos/Videos');
  };

  const handleSubmit = (cardIndex: number) => {
    if (cardIndex === 1) {
      Alert.alert('Submitted', 'Photos from Card 1 have been submitted.');
      setShowPhotoContainer1(false);
    } else if (cardIndex === 2) {
      Alert.alert('Submitted', 'Photos from Card 2 have been submitted.');
      setShowPhotoContainer2(false);
    }
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => {
        setIsLoggedIn(false); 
      })
      .catch((error) => {
        console.error('Error clearing user session:', error);
      });
    navigation.dispatch(StackActions.popToTop());
  };

  const handleCancel = (cardIndex: number) => {
    Alert.alert('Cancel', 'Delete Images ?');
    if (cardIndex === 1) {
      setShowPhotoContainer1(false);
    } else if (cardIndex === 2) {
      setShowPhotoContainer2(false);
    }
  };

  const togglePhotoContainer = (cardIndex: number) => {
    if (cardIndex === 1) {
      setShowPhotoContainer1(!showPhotoContainer1);
    } else if (cardIndex === 2) {
      setShowPhotoContainer2(!showPhotoContainer2);
    }
  };

  const renderPhotoContainer = (selectedPhotos: string[], cardIndex: number) => {
    return (
      <View style={styles.photoContainer}>
        {selectedPhotos.map((photo: string, index: number) => (
          <Image key={index} source={{ uri: photo }} style={styles.photo} />
        ))}
        {Array.from({ length: 4 - selectedPhotos.length }, (_, index) => (
          <TouchableOpacity key={index} onPress={() => handleDocumentPick(cardIndex)} style={styles.placeholderContainer}>
            <Image source={require('../assets/images/placeholder.png')} style={styles.placeholderImage} />
          </TouchableOpacity>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.customButton, styles.leftButton]} onPress={() => handleCancel(cardIndex)}>
            <Image source={require('../assets/images/deleted.png')} style={styles.buttonIcon1} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.customButton, styles.rightButton]} onPress={() => handleSubmit(cardIndex)}>
            <Image source={require('../assets/images/done1.png')} style={styles.buttonIcon1} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header1}>
        <Image source={require('../assets/images/new_logo.png')} style={styles.logo} />
        {isLoggedIn && (
          <View style={styles.headerRight}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>नमस्ते</Text>
              <Text style={styles.officerName}>{task.officer}</Text>
            </View>
            <Image source={require('../assets/images/user.png')} style={styles.profileImage} />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Image source={require('../assets/images/logout.png')} style={styles.logoutImage} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleGoBack}>
              <Image source={require('../assets/images/back_button.png')} style={styles.buttonIcon} />
            </TouchableOpacity>
            <Text style={styles.header}>{task.title}</Text>
            <TouchableOpacity onPress={handleAdd}>
              <Image source={require('../assets/images/plus_button.png')} style={styles.buttonIcon2} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subHeader}>{task.code} {task.size}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionHeader}>जगह</Text>
          <Text style={styles.address}>{task.address}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>चौड़ाई (W)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.0"
                keyboardType="numeric"
                value={dimensions.width}
                onChangeText={(value) => handleInputChange('width', value)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>लंबाई (H)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.0"
                keyboardType="numeric"
                value={dimensions.height}
                onChangeText={(value) => handleInputChange('height', value)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>कटौती (W)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.0"
                keyboardType="numeric"
                value={dimensions.cutWidth}
                onChangeText={(value) => handleInputChange('cutWidth', value)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>कटौती (H)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.0"
                keyboardType="numeric"
                value={dimensions.cutHeight}
                onChangeText={(value) => handleInputChange('cutHeight', value)}
              />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.rowBetween}>
            <Text style={styles.label1}>डीलर / डिपो प्रमाणप</Text>
            <TouchableOpacity onPress={() => togglePhotoContainer(1)}>
              <Text style={styles.label}> + फोटो अपलोड करे</Text>
            </TouchableOpacity>
          </View>
          {showPhotoContainer1 && renderPhotoContainer(selectedPhotosCard1, 1)}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.rowBetween}>
            <Text style={styles.label1}>किरायें की रसीदें</Text>
            <TouchableOpacity onPress={() => togglePhotoContainer(2)}>
              <Text style={styles.label}> + फोटो अपलोड करे</Text>
            </TouchableOpacity>
          </View>
          {showPhotoContainer2 && renderPhotoContainer(selectedPhotosCard2, 2)}
        </Card.Content>
      </Card>

      <TouchableOpacity style={[styles.submitButton, { alignSelf: 'center' }]} onPress={handleSubmitOverall}>
        <Text style={styles.submitButtonText}>जमा करें</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal : 10,
    backgroundColor: '#E0F7FA',
  },
  cardContent: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  buttonIcon: {
    width: 34,
    height: 34,
  },
  buttonIcon1: {
    width: 34,
    height: 34,
  },
  buttonIcon2: {
    width: 34,
    height: 34,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  address: {
    fontSize: 16,
    color: '#444',
  },
  contact: {
    fontSize: 16,
    color: '#444',
  },
  officer: {
    fontSize: 16,
    color: '#444',
  },
  linkedOfficer: {
    fontSize: 16,
    color: '#444',
  },
  date: {
    fontSize: 16,
    color: '#444',
  },
  size: {
    fontSize: 16,
    color: '#444',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 15,
  },
  label1: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  inputGroup: {
    width: '45%',
    marginBottom: 10,
  },
  allTasks: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userNameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginEnd: 10,
    marginTop: 10,
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
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 10,
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 10,
  },
  logoutButton: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 10,
  },
  logoutImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  photo: {
    width: '48%',
    height: 140,
    aspectRatio: 1,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  placeholderContainer: {
    width: '48%',
    height: 140,
    aspectRatio: 1,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    
  },
  submitButton: {
    width : '48%',
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 40,
    alignSelf: 'flex-end',
  },
  submitButtonText: {
    fontSize: 20,
    textAlign : "center",
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  
  rightButton: {
    alignSelf: 'flex-end',
  },
  leftButton: {
    alignSelf: 'flex-start',
    
  },
});
export default TaskDetailScreen;

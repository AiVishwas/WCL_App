import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Card } from 'react-native-paper';
type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

const TaskDetailScreen = ({ route }: { route: TaskDetailScreenRouteProp }) => {
  const { task } = route.params;
  const [uploadedFiles, setUploadedFiles] = useState<DocumentPickerResponse[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleDocumentPick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });
      setUploadedFiles(prevFiles => [...prevFiles, ...results]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.error(err);
      }
    }
  };

  const handleGoBack = () => {
    Alert.alert('Back Btton Pressed', 'Go Back')
  };

  const handleAdd = () => {
    Alert.alert('Add Files', 'Add Photos/Videos');
  };

  const handleSubmit = () => {
    Alert.alert('Submitted', 'All documents and measurements have been checked.');
  };

  const handleLogout = () => {
    // Implement logout functionality here
  };

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.header1}>
        <Image source={require('../assets/images/new_logo.png')} style={styles.logo} />
        {isLoggedIn ? (
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
        ) : null}
      </View>
      <Card style={styles.card}>
  <Card.Content style={styles.cardContent}>
    <View style={styles.titleContainer}>
      <TouchableOpacity onPress={handleGoBack}>
        <Image source={require('../assets/images/back_button.jpg')} style={styles.buttonIcon} />
      </TouchableOpacity>
      <Text style={styles.header}>{task.title}</Text>
      <TouchableOpacity onPress={handleAdd}>
        <Image source={require('../assets/images/plus_button.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
    <Text style={styles.subHeader}>{task.code}    {task.size}</Text>
  </Card.Content>
</Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionHeader}>ग्राहक ज्ञान</Text>
          <Text style={styles.label}>नाम</Text>
          <TextInput style={styles.input} placeholder="" />
          <Text style={styles.allTasks}>All Task</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionHeader}>Raideep Traders</Text>
          <Text style={styles.label}>नाम</Text>
          <TextInput style={styles.input} placeholder="" />
          <Text style={styles.label}>डीलर / डिपो प्रमाणप�</Text>
          <Button title="जमा करे" onPress={handleSubmit} />
          <Button title="किराये की रसीद�" onPress={handleDocumentPick} />

          <Text style={styles.label}>फोटो अपलोड करे</Text>
          <Button title="फोटो अपलोड करे" onPress={handleDocumentPick} />

          <Text style={styles.address}>Main Road Devgard, near police station, 560339</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionHeader}>जगह</Text>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>चौड़ाई (W)</Text>
              <TextInput style={styles.input} placeholder="27" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>लंबाई (H)</Text>
              <TextInput style={styles.input} placeholder="16.5" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>कटौती (W)</Text>
              <TextInput style={styles.input} placeholder="0" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>कटौती (H)</Text>
              <TextInput style={styles.input} placeholder="0" />
            </View>
          </View>
          <Text style={styles.label}>Raideep Traders (RJT5032234) 2200 Sq. ft</Text>
          <Text style={styles.label}>दीवार पेंटिंग का प्रकार: Wall Shop Painting</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionHeader}>काम पूरा होने के बाद फोटो और वीडियो ल�</Text>
          <Button title="फोटो अपलोड करे" onPress={handleDocumentPick} />
          <Button title="वीडियो अपलोड करे" onPress={handleDocumentPick} />
          <Text style={styles.sectionHeader}>मुझे जमा करने से पहले सभी अपलोड किए गए दस्तावेज़ और माप को जांच कर लिया है</Text>
          <Button title="जमा करे" onPress={handleSubmit} />
          <Text style={styles.sectionHeader}>स्थान का पता</Text>
          <Text style={styles.address}>Main Road Devgard, near airport road, 560359</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionHeader}>Sidewall</Text>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>चौड़ाई (W)</Text>
              <TextInput style={styles.input} placeholder="27" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>लंबाई (H)</Text>
              <TextInput style={styles.input} placeholder="16.5" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>कटौती (W)</Text>
              <TextInput style={styles.input} placeholder="2" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>कटौती (H)</Text>
              <TextInput style={styles.input} placeholder="0.5" />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionHeader}>Raideep Traders (RJ503234) (2200 sq. ft)</Text>
          <Text style={styles.label}>डीलर / डिपो प्रमाणप�</Text>
          <Button title="जमा करे" onPress={handleSubmit} />
          <Button title="किराये की रसीद�" onPress={handleDocumentPick} />
          <Text style={styles.address}>Main Road Devgard, near airport road, 560359</Text>
          <Text style={styles.address}>Main Road Devgard, near police station, 560339</Text>
        </Card.Content>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.uploadedFilesHeader}>Uploaded Files:</Text>
            {uploadedFiles.map((file, index) => (
              <Text key={index} style={styles.uploadedFile}>{file.name}</Text>
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    flex: 1, // This allows the title to take remaining space
  },
  buttonIcon: {
    width: 24,
    height: 24,
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
  mapLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 10,
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
  uploadedFilesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  uploadedFile: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
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
      marginEnd : 5
    },
    userName: {
      fontSize: 19,
      color: '#333',
    },
    officerName: {
      fontSize: 16,
      color: '#585858',
      fontWeight : 'bold'
    },
    logo: {
      width: 60,
      height: 50,
      resizeMode: 'contain',
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
      
    },
    logoutButton: {
      padding: 5,
    },
    logoutImage: {
      width: 35,
      height: 35,
      resizeMode: 'contain',
    },

    // Other styles as per your existing implementation
  });

export default TaskDetailScreen;

// TaskListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, Modal, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, Task } from '../navigation/types';

type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;
type TaskListScreenRouteProp = RouteProp<RootStackParamList, 'TaskList'>;



const fetchTasksFromBackend = async (): Promise<Task[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Raideep Traders',
          code: '(RJT503234)',
          size: '2200 Sq. ft',
          address: 'Main road, kenchia, Sri Ganganagar, Sri Ganganagar, Rajasthan, DP024569',
          contact: '+91 9820898208',
          officer: 'Prakash Sharma',
        },
        {
          id: '2',
          title: 'Jayesh Traders',
          code: '(RJT503235)',
          size: '3200 Sq. ft',
          address: 'Ocean complex, Atlantis Lane, Vadodara Rural Taluka, Vadodara District, Gujarat, 390007, India',
          contact: '+91 8225913371',
          officer: 'Jayesh Sharma',
        },
      ]);
    }, 1000);
  });
};

const TaskListScreen = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  const route = useRoute<TaskListScreenRouteProp>();
  const { officerName } = route.params || {}; 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', code: '', size: '', address: '', contact: '', officer: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  type user = {
    username: string;
    password: string;
    name: string;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await fetchTasksFromBackend();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (Object.values(newTask).some(field => field === '')) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    setTasks([...tasks, { ...newTask, id: (tasks.length + 1).toString() }]);
    setNewTask({ title: '', code: '', size: '', address: '', contact: '', officer: '' });
    setModalVisible(false);
  };

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

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity style={styles.taskCard} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
      <Text style={styles.taskTitle}>{item.title} {item.code}</Text>
      <Text>{item.address}</Text>
      <Text>📞 {item.contact}</Text>
      <Text>Linked Officer: {item.officer}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <Image source={require('../assets/images/new_logo.png')} style={styles.logo} />
        {isLoggedIn && (
          <View style={styles.headerRight}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>नमस्ते</Text>
              <Text style={styles.officerName}>{officerName}</Text>
            </View>
            <Image source={require('../assets/images/user.png')} style={styles.profileImage} />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Image source={require('../assets/images/logout.png')} style={styles.logoutImage} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.topSection}>
        <Text style={styles.title}>मेरा काम</Text>
        <TextInput style={styles.searchBox} placeholder="Search..." />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
      />
      {isLoggedIn && (
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Task</Text>
          {['title', 'code', 'size', 'address', 'contact', 'officer'].map(field => (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newTask[field as keyof typeof newTask]}
              onChangeText={text => setNewTask({ ...newTask, [field]: text })}
            />
          ))}
          <TouchableOpacity style={styles.modalButton} onPress={handleAddTask}>
            <Text style={styles.modalButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 15,
    margin : 10,
    marginBottom : 15,
    paddingVertical: 10,
    backgroundColor : "#FF3131"
  },
  title: {
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color : "white",
  },
  searchBox: {
    flex: 0.5,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderWidth: 2.5, 
    borderColor: '#000',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 36,
    marginBottom: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TaskListScreen;

// src/screens/TaskListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Task } from '../navigation/types';
//import { Task } from './src/navigation/types.ts';

type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;

// Mock function to simulate fetching data from a backend
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
          title: 'Amandeep Traders',
          code: '(RJT503235)',
          size: '3200 Sq. ft',
          address: 'Main road, kenchia, Sri Ganganagar, Sri Ganganagar, Rajasthan, DP024569',
          contact: '+91 7347832208',
          officer: 'Sharma',
        },
      ]);
    }, 1000);
  });
};

const TaskListScreen = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', code: '', size: '', address: '', contact: '', officer: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
    setIsLoggedIn(false);
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
      <View style={styles.header}>
        <Image source={require('../assets/images/new_logo.png')} style={styles.logo} />
        {isLoggedIn ? (
          <View style={styles.headerRight}>
            <Text style={styles.userName}>नमस्ते नरेश मोर्य</Text>
            <Image source={require('../assets/images/user.png')} style={styles.profileImage} />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Image source={require('../assets/images/logout.png')} style={styles.logoutImage} />
            </TouchableOpacity>
          </View>
        ) : null}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E0F7FA',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    marginRight: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  logoutButton: {
    width: 30,
    height: 30,
    backgroundColor: '#E0F7FA',
  },
  logoutImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#E0F7FA',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchBox: {
    width: '40%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  taskCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskListScreen;

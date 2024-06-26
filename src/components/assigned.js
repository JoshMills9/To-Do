import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs,where,query} from 'firebase/firestore';
import { Text, View , Image, Pressable, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { FontAwesome6 } from '@expo/vector-icons';
import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';


const Assigned = ({ route }) => {
    const { userEmail } = route.params;
    const [assignedTasks, setAssignedTasks] = useState([]);
    console.log(assignedTasks)
    const [isVisible, setIsVisible] = useState(false);


    const db = getFirestore();

    //useEffect to get assigned tasks from db
    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                // Construct a reference to the 'tasks' collection
                const tasksCollectionRef = collection(db, 'users');
                
                // Query the tasks collection for documents where the 'assignedTo' field is equal to userEmail
                const querySnapshot = await getDocs(query(tasksCollectionRef, where("assigned", "==", userEmail)));
                if (!querySnapshot.empty) {
                    // If documents are found, extract their data and update the state with the tasks
                    const tasks = querySnapshot.docs.map(doc => doc.data());
                    setAssignedTasks(tasks);
                } else {
                    alert('No assigned tasks found for user:' + userEmail)
                    console.log('No assigned tasks found for user:', userEmail);
                }
            } catch (error) {
                console.error('Error receiving assigned tasks:', error);
            }
        };
    
        // Call fetchAssignedTasks when the component mounts or when db or userEmail change
        fetchAssignedTasks();
    }, [db, userEmail]);
    

       //function to delete item by index
       const deleteList = (index) => {
        
        // Create a copy of the original list
        const updatedList = [...assignedTasks];
    
        // Remove the item at the specified index
        updatedList.splice(index, 1);

        // Update the state with the modified list
        setAssignedTasks(updatedList);
    };


        const [visible, setVisible] = useState(false);
        const [deleteIndex, setDeleteIndex] = useState(null);

        const showDialog = (index) => {
            setVisible(true);
            setDeleteIndex(index);
        };

        const hideDialog = () => setVisible(false);

        const handleDelete = () => {
            deleteList(deleteIndex);
            hideDialog();
        };
    


    return (
        <PaperProvider>
        <View style={{flex:1,padding:10}}>

             {assignedTasks.map((task, index) => (
                    <Pressable onPress={()=> setIsVisible(true)}>
                        <View style={{width:"100%",alignSelf:"center", backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"lightgray",padding:6, elevation:9 , borderRadius:15}}>
                            <View style={{marginBottom:15,backgroundColor:"",flexDirection:"row",alignItems:"center", justifyContent:"flex-start",}}>
                                <View style={{width:16,height:16, borderRadius:100,backgroundColor:"royalblue" ,marginRight:50}}></View>
                                <Text style={{fontWeight:"300"}}>From: {<FontAwesome6 name="circle-user" size={12} color="gray" />} {task.assignedTask.from}</Text>
                            </View>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <View style={{flex:1,marginLeft:20,}}>
                                    <Text style={{fontSize:18, fontWeight:"bold"}}>{isVisible ? task.assignedTask.title : task.assignedTask.title.length > 20 ? `${task.assignedTask.title.slice(0, 20)} ...` : task.assignedTask.title }</Text>
                                </View>

                                <View style={{width:100}}>
                                    <Text style={{fontSize:10}} >{task.assignedTask.date}</Text>
                                </View>
                            </View>

                            <View style={{marginLeft:20, flexDirection:"row", alignItems:"center"}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize:16, fontWeight:"300"}} >{isVisible ? task.assignedTask.description : task.assignedTask.description.length > 30 ? `${task.assignedTask.description.slice(0, 30)} ...` : task.assignedTask.description }</Text>
                                </View>
                                <TouchableOpacity onPress={()=> showDialog(index)}><Image style={[styles.delete,{width:30,height:30}]}  source={require("../images/trash.png")}/></TouchableOpacity>
                            </View>
                            
                        </View>
                    </Pressable>
                ))}
           
           {visible &&
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" size={30}/>
                    <Dialog.Title style={{alignSelf:'center', fontWeight:"bold"}}>Caution!!</Dialog.Title>
                    <Dialog.Content>
                        <Text style={{alignSelf:'center', fontSize:16}}>Do you want to delete this task?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{flexDirection:"row", justifyContent:"space-evenly", width:100}}>
                            <TouchableOpacity onPress={hideDialog}><Text style={{alignSelf:'center', fontSize:16}}>Cancel</Text></TouchableOpacity> 
                            <TouchableOpacity  onPress={handleDelete}><Text style={{alignSelf:'center', fontSize:16}}>Yes</Text></TouchableOpacity> 
                        </View>
                        
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            }
        
        </View>
        </PaperProvider>       
    );
};

export default Assigned;

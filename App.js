import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { CardTask } from "./components/CardTask/CardTask";
import Dialog from "react-native-dialog";
import { Header } from "./components/Header/Header";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { s } from "./App.style";
import { useState } from "react";
import uuid from "react-native-uuid";

export default function App() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Todo", isCompleted: true },
    { id: 2, title: "Todo az", isCompleted: false },
    { id: 3, title: "Todo ze", isCompleted: true },
    { id: 4, title: "Todo", isCompleted: true },
  ]);

  function onPressTodo(pressedTodo) {
    const udpatedTodo = {
      ...pressedTodo,
      isCompleted: !pressedTodo.isCompleted,
    };
    const index = todoList.findIndex((t) => t.id === pressedTodo.id);
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = udpatedTodo;
    setTodoList(updatedTodoList);
  }
  function onLongPressTodo(longPressedTodo) {
    Alert.alert(
      "Suppression",
      "Es tu sûre de vouloir supprimer cette tâche ?",
      [
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setTodoList(todoList.filter((t) => t.id !== longPressedTodo.id));
          },
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  }

  const filteredNoteList = getFilteredNoteList();
  function renderTasks() {
    return filteredNoteList.map((todo, i) => (
      <View key={todo + i} style={{ marginBottom: 20 }}>
        <CardTask
          todo={todo}
          onPress={onPressTodo}
          onLongPress={onLongPressTodo}
        />
      </View>
    ));
  }

  function getFilteredNoteList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter(({ isCompleted }) => !isCompleted);
      case "done":
        return todoList.filter(({ isCompleted }) => isCompleted);
    }
  }

  function createTodo() {
    if (inputValue.trim().length > 0) {
      setTodoList([
        ...todoList,
        { id: uuid.v4(), title: inputValue, isCompleted: false },
      ]);
    }
    setIsDialogVisible(false);
  }

  const buttonAdd = () => {
    return (
      <Pressable
        style={{
          position: "absolute",
          bottom: 60,
          right: 20,
          backgroundColor: "#C2DAFF",
          width: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
        }}
        onPress={() => setIsDialogVisible(true)}
      >
        <Text
          style={{
            color: "#2F76E5",
            fontWeight: "bold",
            fontSize: 18,
            paddingVertical: 15,
          }}
        >
          + New todo
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaProvider style={{ backgroundColor: "#F9F9F9" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={s.root}>
          <View style={{ flex: 1 }}>
            <Header />
          </View>
          <View style={{ flex: 5 }}>
            <ScrollView>{renderTasks()}</ScrollView>
          </View>
        </View>
        {buttonAdd()}

        <Dialog.Container
          visible={isDialogVisible}
          onBackdropPress={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Créer une tâche</Dialog.Title>
          <Dialog.Description>
            Choisi un nom pour la nouvelle tâche
          </Dialog.Description>
          <Dialog.Input onChangeText={setInputValue} />
          <Dialog.Button label="Créer" onPress={createTodo} />
        </Dialog.Container>
      </SafeAreaView>
      <TabBottomMenu
        todoList={todoList}
        onPress={setSelectedTabName}
        selectedTabName={selectedTabName}
      />
    </SafeAreaProvider>
  );
}

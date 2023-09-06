import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Modal from "./components/Modal";

export default function App() {
  const [textValue, setTextValue] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [itemSelected, setItemSelected] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const onHandleChangeItem = (text) => setTextValue(text);

  const addItem = () => {
    if (textValue === "") {
      return;
    }
    setItemsList((prevState) => [
      ...prevState,
      { id: Math.random(), value: textValue },
    ]);
    setTextValue("");
  };

  const renderListItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onHandleModal(index)}
    >
      <Text style={styles.textItem}>{item?.value}</Text>
    </TouchableOpacity>
  );

  const onHandleDelete = () => {
    console.log(itemSelected);
    let arr = itemsList;
    arr.splice(itemSelected, 1);
    setItemsList(arr);
    setModalVisible(false);
  };

  const onHandleModal = (index) => {
    setModalVisible(true);
    setItemSelected(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nuevo Producto"
          value={textValue}
          onChangeText={onHandleChangeItem}
        />
        <Button title="Agregar" color={"#0f5418"} onPress={addItem} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={itemsList}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal modalVisible={modalVisible} onHandleDelete={onHandleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 80,
    backgroundColor: "#00001a",
  },
  title: {
    fontSize: 35,
    fontWeight: "500",
    marginBottom: 25,
    color: "whitesmoke",
    paddingStart: 30,
  },
  inputContainer: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  input: {
    width: 200,
    height: 60,
    fontSize: 17,
    paddingLeft: 5,
  },
  listContainer: {
    marginTop: 25,
  },
  itemContainer: {
    width: 300,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5b5aa0",
  },
  textItem: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    fontVariant: "no-common-ligatures",
  },
});

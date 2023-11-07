import React, { Component } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [], // Armazena as listas criadas
      currentList: null, // Lista selecionada
      newItemName: '', // Nome do novo item a ser adicionado
    };
  }

  // Função para criar uma nova lista
  createList = () => {
    const newList = {
      id: Date.now().toString(),
      name: 'Nova Lista',
      items: [],
    };
    this.setState({
      lists: [...this.state.lists, newList],
      currentList: newList,
    });
  }

  // Função para adicionar um novo item à lista selecionada
  addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: this.state.newItemName,
    };
    this.setState((prevState) => ({
      currentList: {
        ...prevState.currentList,
        items: [...prevState.currentList.items, newItem],
      },
      newItemName: '',
    }));
  }

  // Função para selecionar uma lista e exibir seus itens
  selectList = (list) => {
    this.setState({ currentList: list });
  }

  render() {
    return (
      <View>
        <Button title="Criar Lista" onPress={this.createList} />
        <View>
          <Text>Listas Criadas:</Text>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.selectList(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {this.state.currentList && (
          <View>
            <Text>Itens da Lista: {this.state.currentList.name}</Text>
            <FlatList
              data={this.state.currentList.items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text>{item.name}</Text>
              )}
            />
            <TextInput
              placeholder="Nome do Item"
              value={this.state.newItemName}
              onChangeText={(text) => this.setState({ newItemName: text })}
            />
            <Button title="Adicionar Item" onPress={this.addItem} />
          </View>
        )}
      </View>
    );
  }
}

export default App;

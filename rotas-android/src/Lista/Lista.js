import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

const ListaDeCompras = () => {
  const [item, setItem] = useState('');
  const [listas, setListas] = useState([]);
  const [listaAtual, setListaAtual] = useState([]);
  const [nomeNovaLista, setNomeNovaLista] = useState('');

  const adicionarItem = () => {
    if (item) {
      setListaAtual([...listaAtual, item]);
      setItem('');
    }
  };

  const removerItem = (index) => {
    const novaLista = [...listaAtual];
    novaLista.splice(index, 1);
    setListaAtual(novaLista);
  };

  const limparLista = () => {
    setListaAtual([]);
  };

  const criarNovaLista = () => {
    if (nomeNovaLista) {
      setListas([...listas, { nome: nomeNovaLista, itens: [] }]);
      setNomeNovaLista('');
      setListaAtual([]);
    }
  };

  const listasMemo = useMemo(() => listas, [listas]);
  const listaAtualMemo = useMemo(() => listaAtual, [listaAtual]);

  return (
    <View>
      <Text>Lista de Compras</Text>
      <TextInput
        placeholder="Digite um item"
        value={item}
        onChangeText={text => setItem(text)}
      />
      <Button title="Adicionar" onPress={adicionarItem} />
      <Button title="Limpar Lista Atual" onPress={limparLista} />
      <TextInput
        placeholder="Nome da nova lista"
        value={nomeNovaLista}
        onChangeText={text => setNomeNovaLista(text)}
      />
      <Button title="Criar Nova Lista" onPress={criarNovaLista} />
      <FlatList
        data={listaAtualMemo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
            <Button title="Excluir" onPress={() => removerItem(index)} />
          </ListItem>
        )}
      />
    </View>
  );
};

export default ListaDeCompras;
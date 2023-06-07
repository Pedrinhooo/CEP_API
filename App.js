import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState('');

  const fetchCepData = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        setCepData(null);
      } else {
        setCepData(data);
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro ao buscar o CEP');
      setCepData(null);
    }
  };

  const formatCep = (value) => {
    const cepRegex = /^(\d{5})(\d{3})$/;
    if (cepRegex.test(value)) {
      return value.replace(cepRegex, '$1-$2');
    }
    return value;
  };

  const handleCepChange = (value) => {
    const formattedCep = formatCep(value);
    setCep(formattedCep);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={handleCepChange}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={fetchCepData} />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : cepData ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>CEP: {cepData.cep}</Text>
          <Text style={styles.resultText}>Logradouro: {cepData.logradouro}</Text>
          <Text style={styles.resultText}>Bairro: {cepData.bairro}</Text>
          <Text style={styles.resultText}>Cidade: {cepData.localidade}</Text>
          <Text style={styles.resultText}>Estado: {cepData.uf}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    width: 300,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  resultContainer: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#999',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});

export default App;

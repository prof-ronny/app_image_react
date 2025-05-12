import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function App() {
  const [image, setImage] = useState<string|null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar as fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ 'images' ],
      allowsEditing: true,

      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Armazena o URI da imagem selecionada
    }

  }

  
const takePhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert("Permissão necessária", "Precisamos da sua permissão para usar a câmera.");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri); // Armazena o URI da foto tirada
  }
};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="Selecionar da Galeria" onPress={pickImage} />
    <Button title="Tirar uma Foto" onPress={takePhoto} />
    {image && <Image source={{ uri: image }} 
    style={{ width: 200, height: 200, marginTop: 20 }} />}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

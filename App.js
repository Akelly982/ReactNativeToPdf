import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { WebView } from 'react-native-webview';

const htmlContent = ' <!DOCTYPE html> <html lang="en"> <body> <h1>Saucy Burrito!</h1> </body> </html>';


export default function App() {


  const [errorMsg, setErrorMsg] = useState(null)


  // const createPDF = async (html) => {
  //   Print.Orientation = "portrait"
  //   try {
  //       const { uri } = await Print.printToFileAsync({ html });
  //       if (Platform.OS === "ios") {
  //         await Sharing.shareAsync(uri);
  //       } else {
  //         const permission = await MediaLibrary.requestPermissionsAsync();
  //         if (permission.granted){
  //           await MediaLibrary.createAssetAsync(uri)
  //           .then((res) => {
  //             console.log("res:" + res.View)
  //           })
  //           .catch((err) =>{
  //               console.log("ak error")
  //           })   
  //         }
  //       }

  //   } catch (err) {
  //       console.error(err);
  //   }
  // };

  const createPDF = async (html) => {
    try {
        const { uri } = await Print.printToFileAsync({ html });
        console.log(uri);
        
        return uri;
        
    } catch (err) {
        console.error(err);
    }
  };

  const htmlToPdf = () => {
    setErrorMsg("button was pressed")

    //Print Libary
    createPDF(htmlContent)

  }

  return (

    // <View style={styles.container}>
    //   <Text>Testing creating a pdf from html code</Text>
    //   <Text> - - - </Text>
    //   <TouchableOpacity style={styles.submitButton} onPress={() => htmlToPdf()}> 
    //       <Text>Submit</Text>
    //   </TouchableOpacity>
    //   <Text> - - - </Text>
    //   <Text style={styles.errorText}> {errorMsg} </Text>
    // </View>


    <WebView
      originWhitelist={['*']}
      source={{html: htmlContent}}
      useWebKit={true}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
    />
 

  );

}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton:{
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  errorText:{
    color: 'red',
  },
});

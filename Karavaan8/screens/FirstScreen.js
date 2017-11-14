import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight} from 'react-native';
import {CreateParticipantJSON} from '../model/JSONTransformer'
const util = require("util");

export default class FirstScreen extends React.Component {
  render() {
	var {navigate} = this.props.navigation;
    return (
		<View style={styles.navbar}>
				<Button style = {styles.navbutton} onPress={() => navigate("Second",{})} title= "Best"></Button>
				<Button style = {styles.navbutton} onPress={() => navigate("Trips",{})} title= "Trips"></Button>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
	flexDirection:'column',
  },
  container:
  {
	  flex: 1,
  },
  article : 
  {
	flex:10,
  },
});
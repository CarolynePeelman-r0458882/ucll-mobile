import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableHighlight,Image} from 'react-native';

const util = require("util");

export default class ExpensesScreen extends React.Component {
  render() {
    return (
      <Image source={require('../images/settings-background.jpg')} style={styles.container}>
	<View style={styles.navbar}>
		<Text>Settings</Text>
    </View>
    </Image>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
	marginTop: 40,
  },
  navbarText:
  {
	  fontSize:20,
  },
  container:{
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
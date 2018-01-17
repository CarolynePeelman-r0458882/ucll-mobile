import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { createExpenseJSON, getTrips,removeTrip } from '../model/JSONUtils'
import TripButton from '../view/TripButton.js';
import styles from './styles.js'

const util = require("util");

export default class FirstScreen extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = { trips : []};
		this.fetchData = this.fetchData.bind(this);
		this.deleteTrip = this.deleteTrip.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
		console.disableYellowBox = true;
	}

	componentDidMount() {
        this.fetchData().done();
	}

	refresh() {
		this.fetchData();
	}
	
	async fetchData() {
		console.log("FetchData too");
		const trips = await getTrips();
		const TripA = [];
		for(var key in trips){
			TripA.push({
				trip_id : trips[key].trip_id,
				destination : trips[key].destination,
				start_date : trips[key].start_date,
				end_date : trips[key].end_date,
				trip_currency : trips[key].trip_currency
			})
		}
		this.setState({trips : TripA});
  }
	async deleteTrip(tripId)
	{
		const trips = await removeTrip(tripId);
		const TripA = [];
		for(var key in trips){
			TripA.push({
				trip_id : trips[key].trip_id,
				destination : trips[key].destination,
				start_date : trips[key].start_date,
				end_date : trips[key].end_date,
				trip_currency : trips[key].trip_currency
			})
		}
		this.setState({trips : TripA});
	}
	confirmDelete(tripId)
	{
		Alert.alert('Delete Trip?','Are you sure you want to delete this Trip?',
		[{text: 'Delete', onPress: () => this.deleteTrip(tripId)},
		{text: 'I Changed my Mind', onPress: () => console.log('OK Pressed')},],
		{ cancelable: false })
	}

	render() {
	var {navigate} = this.props.navigation;
	var trip = [];

	var trip = this.state.trips.map((entry,index) => (
	<View style={styles.buttonContainer}>
			<View style={styles.buttonView}>
				<TouchableHighlight onPress={() => navigate("TripOverviewScreen",{trip:entry})}>
				<View>
					<Text style={styles.buttonViewText}>{entry.destination}</Text>
					<Text style={styles.buttonViewText}>{entry.start_date}</Text>
					<Text style={styles.buttonViewText}>{entry.end_date}</Text>
					<Text style={styles.buttonViewText}>{entry.trip_currency}</Text>
				</View>
				</TouchableHighlight>
			</View>
			<View>
					<TouchableHighlight style={styles.exitcolumn} onPress={() => this.confirmDelete(entry.trip_id)}>
						<Text style={styles.exitText}>X</Text>
					</TouchableHighlight>
			</View>
	</View>));
	
    return (
		<Image source={require('../images/trips.jpg')} style={styles.container}>
		<ScrollView style={styles.navbar}>
			<TouchableHighlight style={styles.addButton} onPress={() => navigate("AddTrip", {onGoBack: () => this.refresh()})}>
				<View>
					<Text style={styles.addButtonText}>ADD TRIP</Text>
				</View>
			</TouchableHighlight>
			{trip}
		</ScrollView>
		</Image>
    );
  }
}
/*
const styles = StyleSheet.create({
  imagecontainer:{
	flex: 1,
	width: undefined,
	height: undefined,
	backgroundColor:'transparent',
	justifyContent: 'center',
	alignItems: 'center',
  },
  exitcolumn : 
  {
	//backgroundColor : 'red',
	backgroundColor: '#FF4136',
	width : 40,
	flex: 1,
	//height: 55,
	alignSelf:'center',
	justifyContent:'center',
	//borderRadius: 8,
	//borderWidth: 2,
	borderColor: '#A2A794',
	
  },
    exitText : 
  {
	color: 'white',
	alignSelf:'center',
	justifyContent:'center',
	fontSize:30,
  },
  addTripbutton : 
  {
	marginTop: 15,
	borderRadius: 3,
	width: 200,
	height: 70,
	marginLeft: 'auto',
	marginRight: 'auto',
	backgroundColor: '#00FF7F',
	justifyContent: 'center',
	alignItems: 'center',
	},
  button : 
  {
	marginBottom : 10,
	borderRadius : 3,
	width : 200,
	height: 70,
	marginLeft: 'auto',
	marginRight: 'auto',
	backgroundColor:'transparent',
	
  },
  buttonView:
  {
	width: 160,
  },
  buttonContainer:
  {
	flexDirection: 'row',
	backgroundColor: 'white',
	borderRadius: 6,
	marginTop:20,
	justifyContent: 'center',
	alignItems: 'center',
  },
  addButtonText :
  {
	fontSize: 24,
	color: 'white',
	textAlign:'center',
  },
  buttonText : 
  {
	fontSize: 21,
	textAlign: 'center',
  },
});*/
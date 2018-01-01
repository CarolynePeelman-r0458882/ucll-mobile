import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput,ScrollView} from 'react-native';
import OurPicker from '../view/OurPicker.js';
import DatePicker from 'react-native-datepicker'
import { createExpense, getTrips,removeTrip,getPersons } from '../model/JSONUtils'
import ModalDropdown from 'react-native-modal-dropdown';

const util = require("util");

export default class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {person: "", target:"",trip: "", expense_date: "",trips:[{"trip_id" : "01", "destination":"Barcelona"},{"trip_id":"02","destination":"Frankrijk"}], people : [], target : "",currency:"",amount:"",date:"",reason:"",category:"",loaded:false };
		this.addExpense = this.addExpense.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData().done();
    }
	async addExpense()
	{
		try
		{
			if(this.state.username == "")
			{
				alert("Please enter your username");
			}
			if(this.state.targetUsername == "")
			{
				alert("Please choose target username");
			}
			if(this.state.date == "")
			{
				alert("Please choose date"); //Misschien beter om automatisch datum op te halen?
			}
			if(this.state.currency == "")
			{
				alert("Please choose currency you paid in");
			}
			if(this.state.amount == "")
			{
				alert("Please enter amount");
			}
			else
			{
				var result =
				{
					username: this.state.username,
					targetId: this.state.targetUsername.person_id,
					date: this.state.date,
					currency: this.state.currency,
					amount: this.state.amount
				};
				var setResult = await CreateMoneyTransfer(result.username, result.targetId, result.date, result.currency, result.amount);
				if(!setResult)
				{
					alert("Oops, something went wrong :(");
				}
				else
				{
					this.props.navigation.goBack();
				}
			}
		}
		catch(error)
		{
			console.log(error);
		}
	}
    async fetchData() {
		try
        {
            var setPerson = await getPersons();
            if(!setPerson)
            {
                Alert.alert("Oops, something went wrong :(");
            }
            else
            {
                this.setState({people : setPerson});
            }
        }

        catch(error)
        {
            alert(error);
        }
		/*
		const trips = await getTrips();
		const TripA = [];
		for(var key in trips){
			TripA.push({
				destination : trips[key].destination
			})
		}
		this.setState({trips : TripA});
		¨*/
		this.setState({loaded : true});
  }

    render() {
		if(!this.state.loaded)
		{
			return false;
		}
		else
		{
        return (
            <Image source={require('../images/expense-background.png')} style={styles.container}>
			<ScrollView>
                <View style={styles.navbar}>
                    <Text style={styles.header}>Add an Expense</Text>
					
					<Text style={styles.entryText}>Sender Username</Text>
                    <ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        renderRow={this._person_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._person_renderSeparator(rowID)}
                        onSelect ={(idx,value) => this.setState({person : value}) }	
                        value={this.state.person.name}
                    >
                    <Text style={styles.chosenText}>Tap to choose: {this.state.person.name}</Text>
                    </ModalDropdown>
					
					<Text style={styles.entryText}>Target Username</Text>
                    <ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        renderRow={this._person_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._person_renderSeparator(rowID)}
                        onSelect ={(idx,value) => this.setState({target : value}) }	
                        value={this.state.target.name}>
                    <Text style={styles.chosenText}>Tap to choose: {this.state.target.name}</Text>
                    </ModalDropdown>
					
                    <Text style={styles.entryText}>Link to trip</Text>
					<ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.dropdownText}
                        options={this.state.trips}
                        renderRow={this._trip_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._trip_renderSeparator(rowID)}
                        onSelect ={(idx,value) => this.setState({trip : value}) }
						value={this.state.trip.destination}>
                    <Text style={styles.chosenText}>Tap to choose: {this.state.trip.destination}</Text>
                    </ModalDropdown>
					
                    <Text style={styles.entryText}>Amount</Text>
                    <TextInput
                        style={styles.chosenText}
                        editable = {true}
						keyboardType = 'numeric'
						onChangeText={(text) => this.setState({amount:text})}
                    />
					
					<Text style={styles.entryText}>Currency</Text>
                    <OurPicker values={["USD", "YEN", "EURO"]} defaultVal={"EURO"}
					onSelect ={(idx,value) => this.setState({currency : value}) }/>
					
                    <Text style={styles.entryText}>Category</Text>
                    <OurPicker values={["Option 1", "Option 2"]} defaultVal={"Option 1"} />
					
                    <Text style={styles.entryText}>Reason</Text>
                    <TextInput
                        style={styles.chosenText}
                        keyboardType='numeric'
                        editable={true} onChangeText={(text) => this.setState({reason:text})}
                    />
					
                    <Text style={styles.entryText}>Date</Text>
                    <DatePicker style={styles.date} date={this.state.expense_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ expense_date: date }) }} customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />
                </View>
                <TouchableHighlight style={styles.addExpensebutton} onPress={() => this.addExpense() }>
                    <View>
                        <Text style={styles.buttonText}>ADD EXPENSE</Text>
                    </View>
                </TouchableHighlight>
			</ScrollView>
            </Image>
        );
		}
    }
    _trip_renderRow(rowData){
        return (
              <TouchableHighlight>
                <View>
                  <Text>
                    {`${rowData.destination}`}
                  </Text>
                </View>
              </TouchableHighlight>
            );
    }
    _trip_renderSeparator(rowID){
        let key = `spr_${rowID}`;
        return (<View key={key.name} />);
    }
	_person_renderRow(rowData){
        return (
              <TouchableHighlight>
                <View>
                  <Text>
                    {`${rowData.name}`}
                  </Text>
                </View>
              </TouchableHighlight>
            );
    }
    _person_renderSeparator(rowID){
        let key = `spr_${rowID}`;
        return (<View key={key.name} />);
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    entryText: {
        fontSize: 24,
		marginTop : 20,
    },
	chosenText : 
	{
		fontSize: 20,
		color : 'red',
	},
    navbar: {
        flex: 1,
        marginTop: 40,
    },
    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addExpensebutton:
        {
            marginTop: 5,
            marginBottom: 10,
            borderRadius: 3,
            width: 200,
            height: 70,
            marginLeft: 'auto',
            marginRight: 'auto',
			marginTop: 20,
            backgroundColor: '#00FF7F',
            justifyContent: 'center',
            alignItems: 'center',
        },
    buttonText:
        {
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
        }
});

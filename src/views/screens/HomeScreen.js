/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import PropTypes from 'prop-types';
import COLORS from "../../consts/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/HomeScreen/Header";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import Card from "../components/Card";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [flightResult, setFlightResult] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDepartureDate(date.toString().slice(0, 10));
    
    hideDatePicker();
  };
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);
    const customToLocaleDateString = (date) => {
      const formattedDate = date.toLocaleDateString("en-US", options);
      return formattedDate.replace(",", "");
    };

return customToLocaleDateString(date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.npoint.io/378e02e8e732bb1ac55b"
      );
      const jsonData = await response.json();
      setFlightResult(jsonData);
      setApiResponse(jsonData);
    } catch (error) {
      console.warn("Error fetching data:", error);
    }
  };
  const filterDataOnPlace = () => {
    if (departureDate === "" && to === "" && from === "") {
      setFlightResult(apiResponse);
    } else if (departureDate === "") {
      const filteredArray = apiResponse.filter(
        (item) => item.origin === from && item.destination === to
      );
      setFlightResult(filteredArray);
    } else {
      const filteredArray = apiResponse.filter(
        (item) =>
          item.origin === from &&
          item.destination === to &&
          formatDate(item.departureTime)=== departureDate.slice(0, departureDate.length)
          
      );
      setFlightResult(filteredArray);
      // console.warn(filteredArray);
    }
  };
  const sortByAirline = () => {
    setFlightResult((prevFlightResult) => {
      const sortedData = [...prevFlightResult].sort((a, b) =>
        a.airline.localeCompare(b.airline)
      );
      return sortedData;
    });
  };
  const sortByPrice = () => {
    setFlightResult((prevFlightResult) => {
      const sortedData = [...prevFlightResult].sort(
        (a, b) => a.price - b.price
      );
      return sortedData;
    });
  };

  return (

      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
   <ScrollView>

        <Header />
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <View style={style.inputContainer}>
            <MaterialIcons name="flight-takeoff" size={24} color="black" />
            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              value={from}
              placeholder="FROM"
              onChangeText={(text) => setFrom(text)}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <View style={style.inputContainer}>
            <MaterialIcons name="flight-land" size={24} color="black" />
            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              placeholder="TO"
              value={to}
              onChangeText={(text) => setTo(text)}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <View style={[style.inputContainer]}>
            <AntDesign name="calendar" size={24} color="black" />
            <Button title="DEPARTURE" onPress={showDatePicker} />
            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              editable={false}
              value={departureDate}
            />

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              testID="modal"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",

            paddingHorizontal: 20,
          }}
        >
          <SecondaryButton
            title={"Sort By Price"}
            onPress={sortByPrice}
          ></SecondaryButton>
          <SecondaryButton
            title={"Sort By Airline"}
            onPress={sortByAirline}
          ></SecondaryButton>
        </View>

        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <PrimaryButton
            title={"Search Flights"}
            onPress={filterDataOnPlace}
          ></PrimaryButton>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={flightResult}
          renderItem={({ item }) => (
            <Card flight={item} navigation={navigation} testID="flights"/>
          )}
        />
      </ScrollView>

      </SafeAreaView>
 
  );
};

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
   
  },
});
HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;

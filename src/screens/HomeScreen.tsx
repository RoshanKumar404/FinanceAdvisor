import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    FlatList,
    Modal,
    Image,
  } from "react-native";
  import React, { useState } from "react";
  import Icon from "react-native-vector-icons/Ionicons";
  import { useNavigation } from "@react-navigation/native";
  
  export default function HomeScreen() {
    const [balanceVisible, setBalanceVisible] = useState(false);
    const [balance, setBalance] = useState(10000);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
  
    const platforms = [
      { id: 1, name: "GPAY", price: 1000 },
      { id: 2, name: "PHONE PE", price: 105 },
      { id: 3, name: "PAYTM", price: 100 },
      { id: 4, name: "AMAZON PAY", price: 100 },
    ];
  
    const handleOptionPress = (screenName) => {
      setModalVisible(false);
      navigation.navigate(screenName);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.appName}>Smart Cash</Text>
          <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
            <Icon name={balanceVisible ? "eye" : "eye-off"} size={34} color="#7c2a6a" />
          </TouchableOpacity>
  
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>ME</Text>
          </View>
        </View>
  
        <View style={styles.balanceCard}>
          <Text style={styles.title}>TOTAL BALANCE</Text>
          <Text style={styles.title}>
            {balanceVisible ? `₹${balance}` : "₹*****"}
          </Text>
        </View>
  
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>TRANSACTION PLATFORMS</Text>
          <FlatList
            horizontal
            data={platforms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.platformCircle}>
                <Text style={styles.platformText}>{item.name}</Text>
                <Text style={styles.platformText}>{item.price}</Text>
              </View>
            )}
            contentContainerStyle={{ gap: 10 }}
          />
        </View>
  
        <View style={styles.Expensebackground}>
          <View style={styles.expenxCard}>
            <Text style={styles.title}>Today's Expenses</Text>
            <Text style={styles.title}>₹ 1000</Text>
          </View>
          <View style={styles.expenxCard}>
            <Text style={styles.title}>Today's Income</Text>
            <Text style={styles.title}>₹ 10000</Text>
          </View>
        </View>
  
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            console.log("Floating + button pressed");
            setModalVisible(true);
          }}
        >
          <Text style={{ fontSize: 50, color: "#F5F5F5" }}>+</Text>
        </TouchableOpacity>
  
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {[ 
                { screen: "Bolo", label: "Bolo" },
                { screen: "Invoice", label: "Invoice" },
                { screen: "Ai_Alerts", label: "Ai-Alerts" },
                { screen: "AccountSnapshots", label: "Account Snapshot" },
                { screen: "PaidPrimeFeatures", label: "Paid Prime Features" },
              ].map(({ screen, label }) => (
                <TouchableOpacity
                  key={screen}
                  style={styles.modalButton}
                  onPress={() => handleOptionPress(screen)}
                >
                  <Text style={styles.modalButtonText}>{label}</Text>
                </TouchableOpacity>
              ))}
  
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    color: "#7c6a6a",
                    marginTop: 10,
                    fontWeight: "bold",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#212121",
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      margin: 20,
    },
    appName: {
      fontSize: 22,
      color: "#10B981",
      fontWeight: "bold",
      marginRight: 10,
    },
    Expensebackground: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      margin: 10,
      backgroundColor: "#212121",
      borderWidth: 1,
      borderColor: "#10B981",
      borderRadius: 10,
    },
    profileCircle: {
      backgroundColor: "#10B981",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    profileText: {
      color: "#F5F5F5",
      fontWeight: "bold",
      fontSize: 29,
    },
    balanceCard: {
      backgroundColor: "#212121",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      margin: 25,
      borderWidth: 2,
      borderColor: "#10B981",
    },
    expenxCard: {
      backgroundColor: "#10b981",
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
      margin: 10,
      borderWidth: 1,
      borderColor: "black",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#F5F5F5",
    },
    balance: {
      fontSize: 24,
      fontWeight: "bold",
    },
    sectionBox: {
      borderWidth: 2,
      borderColor: "#10B981",
      padding: 15,
      borderRadius: 15,
      margin: 25,
    },
    sectionTitle: {
      fontSize: 19,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#F5F5F5",
    },
    platformCircle: {
      backgroundColor: "#10b981",
      borderRadius: 30,
      padding: 12,
      alignItems: "center",
      width: 100,
      justifyContent: "center",
    },
    platformText: {
      color: "#fff",
      fontSize: 15,
      textAlign: "center",
    },
    floatingButton: {
      position: "absolute",
      bottom: 40,
      right: 20,
      backgroundColor: "#10B981",
      width: 60,
      height: 65,
      borderRadius: 40,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    modalOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: "#F5F5F5",
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    modalButton: {
      backgroundColor: "#7c6a6a",
      padding: 12,
      borderRadius: 8,
      marginTop: 10,
      width: "100%",
      alignItems: "center",
    },
    modalButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
  
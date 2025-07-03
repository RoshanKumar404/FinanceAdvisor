import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import UPI from 'react-native-upi-intent';

const Bell = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to initiate the payment process
  const initiatePayment = (amount) => {
    setLoading(true);
    setError('');

    const options = {
      vpa: 'your_vpa@upi', // Your UPI ID (replace with actual UPI ID)
      payeeName: 'Receiver Name',
      transactionRef: `txn_${new Date().getTime()}`,
      amount: amount.toString(),
      transactionNote: 'Subscription for Smart Cash',
    };

    UPI.initiatePayment(options)
      .then((response) => {
        setLoading(false);
        console.log('Payment Response:', response);
        // Handle success (show success message, etc.)
      })
      .catch((error) => {
        setLoading(false);
        setError('Payment failed. Please try again.');
        console.error('Payment Error:', error);
        // Handle error (show failure message)
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💎 Paid Prime Features</Text>

      <View style={styles.featureBox}>
        <Text style={styles.feature}>1. Fraud Alerts</Text>
        <Text style={styles.feature}>2. Entry Limit of Cash Transactions</Text>
        <Text style={styles.feature}>3. Access data anywhere anytime (1 device for security)</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={() => initiatePayment(45)} // ₹45 / Month
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : 'Pay ₹45 / Month'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#007bff' }]}
        onPress={() => initiatePayment(350)} // ₹350 / Year
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : 'Pay ₹350 / Year'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featureBox: {
    marginBottom: 30,
  },
  feature: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default Bell;
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function Bell() {
//   return (
//     <View>
//       <Text>Bell</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})
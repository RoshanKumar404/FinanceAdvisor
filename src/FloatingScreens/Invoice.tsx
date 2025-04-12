import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput, ScrollView } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Invoice = () => {
  const [gstNumber, setGstNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [filePath, setFilePath] = useState<string | null>(null);

  const generatePDF = async () => {
    const numericAmount = parseFloat(amount);

    if (!gstNumber || !businessName || !businessAddress || isNaN(numericAmount)) {
      Alert.alert('Missing Info', 'Please fill all GST details and enter a valid amount.');
      return;
    }

    const gstRate = numericAmount < 50000 ? 0.13 : 0.18;
    const gstAmount = numericAmount * gstRate;
    const total = numericAmount + gstAmount;

    const htmlContent = `
      <h1 style="text-align: center;">Transaction Invoice</h1>
      <p><strong>GST Number:</strong> ${gstNumber}</p>
      <p><strong>Business Name:</strong> ${businessName}</p>
      <p><strong>Address:</strong> ${businessAddress}</p>
      <br />
      <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <tr>
          <th>Base Amount</th>
          <th>GST Rate</th>
          <th>GST Amount</th>
          <th>Total Amount</th>
        </tr>
        <tr>
          <td>₹${numericAmount.toFixed(2)}</td>
          <td>${gstRate * 100}%</td>
          <td>₹${gstAmount.toFixed(2)}</td>
          <td>₹${total.toFixed(2)}</td>
        </tr>
      </table>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'Invoice_With_GST',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      setFilePath(file.filePath);
      Alert.alert('Success', `PDF saved to: ${file.filePath}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧾 Invoice PDF Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="GST Number"
        value={gstNumber}
        onChangeText={setGstNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Business Address"
        value={businessAddress}
        onChangeText={setBusinessAddress}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Base Amount (₹)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Button title="Generate PDF" onPress={generatePDF} />

      {filePath && <Text style={styles.pathText}>Saved to: {filePath}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F6F8FC', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  pathText: { marginTop: 15, color: '#444', textAlign: 'center' },
});

export default Invoice;

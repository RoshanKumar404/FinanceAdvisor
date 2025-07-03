import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';

const Transaction = () => {
  const [permissionStatus, setPermissionStatus] = useState('unknown');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const init = async () => {
      const status = await RNAndroidNotificationListener.getPermissionStatus();
      setPermissionStatus(status);
      if (status !== 'authorized') {
        RNAndroidNotificationListener.requestPermission();
      }
    };

    init();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const storedNotifications = await RNAndroidNotificationListener.getNotifications();
      const parsed = JSON.parse(storedNotifications);
      const transactions = extractTransactions(parsed);
      setTransactions(transactions);
    } catch (e) {
      console.log('❌ Failed to fetch notifications:', e);
    }
  };

  const extractTransactions = (notifications) => {
    return notifications
      .filter(n =>
        n.text &&
        (n.text.includes('credited') || n.text.includes('debited') || n.text.includes('received'))
      )
      .map((n, index) => {
        const amountMatch = n.text.match(/₹[\d,]+/);
        const descMatch = n.text.match(/(?:for|towards|via)\s(.+?)(?:\.|$)/i);
        return {
          id: `TXN${index + 1}${Math.floor(Math.random() * 1000)}`,
          date: new Date(n.time).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
          }),
          time: new Date(n.time).toLocaleTimeString('en-IN'),
          amount: amountMatch ? amountMatch[0] : '₹0',
          description: descMatch ? descMatch[1] : 'Bank Transaction',
        };
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Transaction History</Text>
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>TRANSACTION ID</Text>
            <Text style={styles.header}>DATE AND TIME</Text>
            <Text style={styles.header}>AMOUNT</Text>
            <Text style={styles.header}>DESCRIPTION</Text>
          </View>

          {transactions.map((txn, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{txn.id}</Text>
              <Text style={styles.cell}>{txn.date} {txn.time}</Text>
              <Text style={styles.cell}>{txn.amount}</Text>
              <Text style={styles.cell}>{txn.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#1F1B18' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  table: { borderWidth: 1, borderColor: '#fff' },
  headerRow: { flexDirection: 'row', backgroundColor: '#4D4035' },
  row: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#fff' },
  header: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#fff',
  },
  cell: {
    flex: 1,
    color: '#fff',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#fff',
  },
});

export default Transaction;
// import { View, Text } from 'react-native'
// import React from 'react'

// const Transaction = () => {
//   return (
//     <View>
//       <Text>Transaction</Text>
//     </View>
//   )
// }

// export default Transaction
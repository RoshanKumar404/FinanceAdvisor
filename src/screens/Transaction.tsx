import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';

const Transaction = () => {
  const [permissionStatus, setPermissionStatus] = useState('unknown');
  const [notifications, setNotifications] = useState([]);

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
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const storedNotifications = await RNAndroidNotificationListener.getNotifications();
      const parsed = JSON.parse(storedNotifications);
      setNotifications(parsed || []);
    } catch (e) {
      console.log('❌ Failed to fetch notifications:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📲 Notification Polling</Text>
      <Text style={styles.permission}>
        Permission: {permissionStatus === 'authorized' ? '✅ Authorized' : '❌ Not Authorized'}
      </Text>

      <ScrollView style={styles.notifications}>
        {notifications.length === 0 ? (
          <Text style={styles.noNotifications}>No notifications yet.</Text>
        ) : (
          notifications.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.app}>{item.app}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.text}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F6F8FC' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  permission: { fontSize: 16, marginBottom: 8 },
  notifications: { flex: 1 },
  noNotifications: { textAlign: 'center', color: '#888', marginTop: 40 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  app: { fontWeight: 'bold', color: '#2D88FF' },
  title: { fontSize: 16, fontWeight: 'bold' },
  time: { fontSize: 12, color: '#999', marginTop: 4 },
});

export default Transaction;

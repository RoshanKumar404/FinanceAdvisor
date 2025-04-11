import React, { useState, useRef, } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';

const suggestedQuestions = [
  "Show me my recent transactions",
  "How do I contact customer support",
  "What is my spending limit?",
  "Transfer money",
  "What is my account balance?"
];

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { type: 'system', text: 'Welcome to the Chatbot! Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef();

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'sender', text: input };
    const botMessage = { type: 'receiver', text: getResponse(input) };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const getResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! How can I help you today?";
    } else if (msg.includes('show me my recent transactions')) {
      return "Phone pay - ₹1200.20";
    } else if (msg.includes('how do i contact customer support')) {
      return "Helpline number: 919786589";
    } else if (msg.includes('what is my spending limit?')) {
      return "Your spending limit is ₹7500.";
    } else if (msg.includes('transfer money')) {
      return "I can guide you through the transfer process. What is the recipient's name or account number?";
    } else if (msg.includes('what is my account balance?')) {
      return "Your account balance is $10,000.";
    } else if (msg.includes('help')) {
      return "I can answer simple questions. Try saying 'hello' or ask me 'what is my spending limit?'";
    } else if (msg.includes('thank you') || msg.includes('thanks')) {
      return "You're welcome!";
    } else if (msg.includes('weather')) {
      return "I'm sorry, I cannot provide real-time weather information.";
    } else {
      return "I'm sorry, I don't understand that question. Could you please rephrase it?";
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <Animatable.View
              animation="fadeInUp"
              duration={600}
              delay={index * 100}
              key={index}
              style={[
                styles.messageBubble,
                msg.type === 'sender' ? styles.senderBubble : msg.type === 'receiver' ? styles.receiverBubble : styles.systemBubble
              ]}
            >
              <Text style={[
                styles.messageText,
                msg.type === 'system' && { fontStyle: 'italic' }
              ]}>
                {msg.text}
              </Text>
            </Animatable.View>
          ))}
        </ScrollView>

        <View style={styles.suggestedContainer}>
          {suggestedQuestions.map((question, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.suggestedButton}
              onPress={() => {
                setInput(question);
                handleSend();
              }}
            >
              <Text style={styles.suggestedText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  chatContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    backgroundColor: 'black',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 6,
  },
  senderBubble: {
    backgroundColor: '#e2e8f0',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  receiverBubble: {
    backgroundColor: '#63b3ed',
    alignSelf: 'flex-end',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  systemBubble: {
    backgroundColor: '#edf2f7',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 12,
  },
  messageText: {
    color: '#1a202c',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    paddingTop: 8,
    marginTop: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#63b3ed',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  suggestedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  suggestedButton: {
    backgroundColor: '#edf2f7',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  suggestedText: {
    color: '#4a5568',
    fontSize: 14,
  },
});

export default ChatBot;
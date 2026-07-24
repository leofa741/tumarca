'use client';

import { RefObject } from 'react';
import { Message } from '../types';
import styles from '../ChatWidget.module.css';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;  // ← AGREGAR | null
}

export default function ChatMessages({ messages, isLoading, messagesEndRef }: ChatMessagesProps) {
  return (
    <div className={styles.messages}>
      {messages.map(msg => (
        <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
          <div className={styles.messageContent}>{msg.text}</div>
        </div>
      ))}
      
      {isLoading && (
        <div className={`${styles.message} ${styles.bot}`}>
          <div className={styles.messageContent}>
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
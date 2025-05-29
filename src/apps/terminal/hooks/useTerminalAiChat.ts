import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChatsStore } from '@/stores/useChatsStore';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Simplified version of useAiChat hook for Terminal use only
export function useTerminalAiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setAiMessages = useChatsStore((state) => state.setAiMessages);

  // Simplified append function to add messages to the chat that matches the original useAiChat interface
  const append = useCallback(
    async (
      message: string | { content?: string; body?: string; role?: 'user' | 'assistant' | 'system'; metadata?: any },
      options: { role?: 'user' | 'assistant' | 'system'; body?: any } = {}
    ) => {
      const roleToUse = 
        typeof message === 'string' 
          ? options.role || 'user' 
          : message.role || 'user';
      
      const contentToUse = 
        typeof message === 'string' 
          ? message 
          : message.content || message.body || options.body || '';
      
      const metadataToUse = 
        typeof message === 'string' 
          ? undefined 
          : message.metadata;

      // Create the message object
      const newMessage: Message = {
        id: uuidv4(),
        role: roleToUse,
        content: contentToUse,
        timestamp: Date.now(),
        metadata: metadataToUse,
      };

      // Add message to state
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setAiMessages(updatedMessages);

      // For assistant messages, simulate typing
      if (roleToUse === 'assistant') {
        setIsLoading(true);
        // Just simulate a brief delay for consistency
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }

      return newMessage.id;
    },
    [messages, setAiMessages]
  );

  // Simplified stop function that just sets loading to false
  const stop = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    messages,
    append,
    isLoading,
    stop,
    setMessages,
  };
}

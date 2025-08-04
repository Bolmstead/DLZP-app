import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  template: `
    <div class="chat-container">
      <!-- Chat Toggle Button -->
      <button
        class="chat-toggle-btn"
        (click)="toggleChat()"
        [class.chat-open]="isOpen()"
      >
        @if (isOpen()) {
        <span>✕</span>
        } @else {
        <span>💬</span>
        }
      </button>

      <!-- Chat Box -->
      @if (isOpen()) {
      <div class="chat-box">
        <!-- Chat Header -->
        <div class="chat-header">
          <h3>Customer Support</h3>
          <span class="online-indicator">● Online</span>
        </div>

        <!-- Messages Area -->
        <div class="chat-messages" #messagesContainer>
          @for (message of messages(); track message.id) {
          <div
            class="message"
            [class.user-message]="message.isUser"
            [class.bot-message]="!message.isUser"
          >
            <div class="message-content">
              {{ message.text }}
            </div>
            <div class="message-time">
              {{ formatTime(message.timestamp) }}
            </div>
          </div>
          }
        </div>

        <!-- Input Area -->
        <div class="chat-input-area">
          <input
            type="text"
            [(ngModel)]="currentMessage"
            (keyup.enter)="sendMessage()"
            placeholder="Type your message..."
            class="chat-input"
          />
          <button
            class="send-btn"
            (click)="sendMessage()"
            [disabled]="!currentMessage.trim()"
          >
            Send
          </button>
        </div>
      </div>
      }
    </div>
  `,
  styles: `
    .chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .chat-toggle-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #3b82f6;
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chat-toggle-btn:hover {
      background: #2563eb;
      transform: scale(1.05);
    }

    .chat-toggle-btn.chat-open {
      background: #ef4444;
    }

    .chat-toggle-btn.chat-open:hover {
      background: #dc2626;
    }

    .chat-box {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 350px;
      height: 450px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chat-header {
      background: #3b82f6;
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .online-indicator {
      font-size: 12px;
      color: #86efac;
    }

    .chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .message {
      display: flex;
      flex-direction: column;
    }

    .user-message {
      align-items: flex-end;
    }

    .bot-message {
      align-items: flex-start;
    }

    .message-content {
      max-width: 80%;
      padding: 8px 12px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.4;
    }

    .user-message .message-content {
      background: #3b82f6;
      color: white;
    }

    .bot-message .message-content {
      background: #f3f4f6;
      color: #374151;
    }

    .message-time {
      font-size: 11px;
      color: #6b7280;
      margin-top: 4px;
    }

    .chat-input-area {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }

    .chat-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 20px;
      outline: none;
      font-size: 14px;
    }

    .chat-input:focus {
      border-color: #3b82f6;
    }

    .send-btn {
      padding: 8px 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .send-btn:hover:not(:disabled) {
      background: #2563eb;
    }

    .send-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .chat-box {
        width: 300px;
        height: 400px;
      }
      
      .chat-container {
        bottom: 15px;
        right: 15px;
      }
    }
  `,
})
export class ChatComponent {
  isOpen = signal(false);
  messages = signal<ChatMessage[]>([
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  currentMessage = '';
  private messageIdCounter = 2;

  toggleChat() {
    this.isOpen.set(!this.isOpen());
  }

  sendMessage() {
    const message = this.currentMessage.trim();
    if (!message) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: this.messageIdCounter++,
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    this.messages.update((messages) => [...messages, userMessage]);
    this.currentMessage = '';

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: this.messageIdCounter++,
        text: this.generateBotResponse(message),
        isUser: false,
        timestamp: new Date(),
      };
      this.messages.update((messages) => [...messages, botResponse]);
    }, 1000);
  }

  private generateBotResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about products, orders, shipping, or anything else.";
    } else if (
      lowerMessage.includes('product') ||
      lowerMessage.includes('item')
    ) {
      return "You can browse our products using the category filter or search bar. Is there something specific you're looking for?";
    } else if (
      lowerMessage.includes('cart') ||
      lowerMessage.includes('order')
    ) {
      return 'You can view your cart by clicking the cart button in the header. Need help with checkout?';
    } else if (
      lowerMessage.includes('shipping') ||
      lowerMessage.includes('delivery')
    ) {
      return 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.';
    } else {
      return 'Thank you for your message! Our team will get back to you shortly. Is there anything else I can help with?';
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

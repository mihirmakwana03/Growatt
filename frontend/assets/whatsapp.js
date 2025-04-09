class WhatsAppWidget {
  constructor(options = {}) {
    // Extract options with defaults
    this.phoneNumber = options.phoneNumber || '';
    this.name = options.name || 'John Doe';
    this.avatar =
      options.avatar || 'https://getwidget.com/assets/images/avatar.png';
    this.welcomeMessage =
      options.welcomeMessage || 'Hi there 👋\nHow can I help you?';
    this.buttonText = options.buttonText || 'Chat on WhatsApp';
    this.position = options.position || 'right'; // right or left
    this.delay = parseInt(options.delay || '1000', 10);
    this.autoOpen = options.autoOpen !== undefined ? options.autoOpen : true;
    this.container = options.container || null; // Container element for preview

    // Validate required fields
    if (!this.phoneNumber) {
      console.error('WhatsApp Widget Error: Phone number is required');
      return;
    }

    // Set dynamic status
    this.status = this.getDynamicStatus();

    this.init();
  }

  getDynamicStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Check if it's Monday to Saturday and between 9:00 AM and 5:00 PM
    if (day >= 1 && day <= 6 && (hour > 9 || (hour === 9 && minute >= 0)) && (hour < 17 || (hour === 17 && minute === 0))) {
      return 'Online';
    }
    return 'Offline';
  }

  init() {
    try {
      // Add styles
      this.addStyles();

      // Create widget elements
      this.createWidget();

      // Add event listeners
      this.addEventListeners();

      // Auto open if enabled
      if (this.autoOpen) {
        setTimeout(() => {
          this.openChat();
        }, this.delay);
      }
    } catch (error) {
      console.error('Error initializing WhatsApp widget:', error);
    }
  }

  addStyles() {
    // Check if styles are already added
    if (document.getElementById('whatsapp-widget-styles')) {
      return;
    }

    const styles = `
      .whatsapp-widget-container {
        position: fixed;
        bottom: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-family: inherit; /* Inherit font from parent website */
      }
      
      .whatsapp-widget-container * {
        font-family: inherit; /* Ensure all child elements inherit the font */
      }
      
      /* Fallback font stack if not in a website with defined fonts */
      .whatsapp-widget-container {
        font-family: inherit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      
      .whatsapp-widget-container.right {
        right: 20px;
      }
      
      .whatsapp-widget-container.left {
        left: 20px;
      }
      
      .whatsapp-widget-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #25D366;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        animation: pulse 1.5s infinite;
      }
      
      @keyframes pulse {
        0% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
        }
        70% {
        box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
        }
        100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
        }
      }
      
      .whatsapp-widget-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        animation: none;
      }
      
      .whatsapp-widget-button svg {
        width: 30px;
        height: 30px;
        fill: white;
      }
      
      .whatsapp-chat-box {
        position: absolute;
        bottom: 80px;
        width: 320px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
        background-color: #2c2c2c;
        transform-origin: bottom;
        transition: all 0.3s ease;
        opacity: 0;
        transform: scale(0.9) translateY(20px);
        pointer-events: none;
      }
      
      .whatsapp-chat-box.open {
        opacity: 1;
        transform: scale(1) translateY(0);
        pointer-events: all;
        animation: popIn 0.3s ease;
      }
      
      @keyframes popIn {
        0% {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
        }
        40% {
        opacity: 1;
        transform: scale(1.03) translateY(-5px);
        }
        100% {
        transform: scale(1) translateY(0);
        }
      }
      
      .whatsapp-chat-header {
        background-color: #2c2c2c;
        color: white;
        padding: 16px;
        display: flex;
        align-items: center;
        position: relative;
      }
      
      .whatsapp-chat-close {
        position: absolute;
        top: 16px;
        right: 16px;
        color: white;
        cursor: pointer;
        font-size: 18px;
        opacity: 0.8;
        transition: opacity 0.2s ease;
      }
      
      .whatsapp-chat-close:hover {
        opacity: 1;
      }
      
      .whatsapp-chat-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 12px;
        object-fit: cover;
      }
      
      .whatsapp-chat-user-info {
        flex: 1;
      }
      
      .whatsapp-chat-name {
        font-weight: 600;
        font-size: 16px;
        margin: 0;
      }
      
      .whatsapp-chat-status {
        font-size: 12px;
        opacity: 0.8;
        margin: 0;
        color: #25D366;
      }
      
      .whatsapp-chat-body {
        padding: 16px;
        background-color: #2c2c2c;
        color: white;
        background-image: url("./assets/whatsapp-bg.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        height: 320px;
        overflow-y: auto;
      }


      
      .whatsapp-message {
        background-color: #005c4b;
        border-radius: 8px;
        border-top-right-radius: 0px;
        padding: 10px 12px;
        margin-bottom: 8px;
        max-width: 80%;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        white-space: pre-line;
        animation: fadeIn 0.3s ease;
        color: white;
        margin-left: auto; /* Align message to the right */
      }
      
      @keyframes fadeIn {
        from {
        opacity: 0;
        transform: translateY(10px);
        }
        to {
        opacity: 1;
        transform: translateY(0);
        }
      }
      
      .whatsapp-message::after {
        content: '';
        position: absolute;
        top: 0;
        right: -8px;
        width: 0;
        height: 0;
        border-top: 8px solid #005c4b;
        border-right: 8px solid transparent;
      }
      
      .whatsapp-timestamp {
        font-size: 10px;
        color: #888888;
        text-align: right;
        margin-top: 4px;
      }
      
      .whatsapp-chat-footer {
        background-color: #3d3d3d;
        padding: 16px;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
      }
      
      .whatsapp-chat-button {
        background-color: #25D366;
        color: white;
        border: none;
        border-radius: 24px;
        padding: 12px 24px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ease;
      }
      
      .whatsapp-chat-button:hover {
        background-color: #1da152;
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .whatsapp-chat-button svg {
        width: 20px;
        height: 20px;
        fill: white;
      }
      
      @media (max-width: 480px) {
        .whatsapp-chat-box {
        width: 280px;
        }
        
        .whatsapp-widget-button {
        width: 50px;
        height: 50px;
        }
        
        .whatsapp-widget-button svg {
        width: 24px;
        height: 24px;
        }
      }
      `;

    const styleElement = document.createElement('style');
    styleElement.id = 'whatsapp-widget-styles';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  createWidget() {
    // Create container
    this.widgetContainer = document.createElement('div');
    this.widgetContainer.className = `whatsapp-widget-container ${this.position}`;

    // If a container is specified (for preview), append to that instead of body
    if (this.container) {
      this.container.appendChild(this.widgetContainer);
    } else {
      document.body.appendChild(this.widgetContainer);
    }

    // Create chat button
    this.chatButton = document.createElement('div');
    this.chatButton.className = 'whatsapp-widget-button';
    this.chatButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      `;
    this.widgetContainer.appendChild(this.chatButton);

    // Create chat box
    this.chatBox = document.createElement('div');
    this.chatBox.className = 'whatsapp-chat-box';
    this.widgetContainer.appendChild(this.chatBox);

    // Create chat header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'whatsapp-chat-header';
    chatHeader.innerHTML = `
      <img src="${this.avatar}" alt="${this.name}" class="whatsapp-chat-avatar">
      <div class="whatsapp-chat-user-info">
        <p class="whatsapp-chat-name">${this.name}</p>
        <p class="whatsapp-chat-status">${this.status}</p>
      </div>
      <div class="whatsapp-chat-close">×</div>
      `;
    this.chatBox.appendChild(chatHeader);

    // Create chat body
    const chatBody = document.createElement('div');
    chatBody.className = 'whatsapp-chat-body';

    // Add client welcome message
    const clientWelcomeMessageElement = document.createElement('div');
    clientWelcomeMessageElement.className = 'whatsapp-message';
    clientWelcomeMessageElement.style.backgroundColor = '#353535'; // Change background color
    clientWelcomeMessageElement.style.marginLeft = '0'; // Align to the left
    clientWelcomeMessageElement.style.marginRight = 'auto'; // Ensure alignment
    clientWelcomeMessageElement.textContent = 'Welcome to our service! How can we assist you today?';

    // Add timestamp for client welcome message
    const clientWelcomeTimestamp = document.createElement('div');
    clientWelcomeTimestamp.className = 'whatsapp-timestamp';
    const now = new Date();
    clientWelcomeTimestamp.textContent = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    clientWelcomeMessageElement.appendChild(clientWelcomeTimestamp);

    chatBody.appendChild(clientWelcomeMessageElement);


    // // Add client welcome message
    // const clientWelcomeMessageElement = document.createElement('div');
    // clientWelcomeMessageElement.className = 'whatsapp-message';
    // clientWelcomeMessageElement.style.marginLeft = '0'; // Align to the left
    // clientWelcomeMessageElement.style.marginRight = 'auto'; // Ensure alignment
    // clientWelcomeMessageElement.textContent = 'Welcome to our service! How can we assist you today?';

    // // Add timestamp for client welcome message
    // const clientWelcomeTimestamp = document.createElement('div');
    // clientWelcomeTimestamp.className = 'whatsapp-timestamp';
    // const now = new Date();
    // clientWelcomeTimestamp.textContent = `${now.getHours()}:${now
    //   .getMinutes()
    //   .toString()
    //   .padStart(2, '0')}`;
    // clientWelcomeMessageElement.appendChild(clientWelcomeTimestamp);

    // chatBody.appendChild(clientWelcomeMessageElement);

    // Add welcome message
    const welcomeMessageElement = document.createElement('div');
    welcomeMessageElement.className = 'whatsapp-message';
    welcomeMessageElement.textContent = this.welcomeMessage;

    // Add timestamp for welcome message
    const timestamp = document.createElement('div');
    timestamp.className = 'whatsapp-timestamp';
    timestamp.textContent = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    welcomeMessageElement.appendChild(timestamp);

    chatBody.appendChild(welcomeMessageElement);
    this.chatBox.appendChild(chatBody);

    // Create chat footer
    const chatFooter = document.createElement('div');
    chatFooter.className = 'whatsapp-chat-footer';

    // Create chat button
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'whatsapp-chat-button';
    whatsappButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
      </svg>
      ${this.buttonText}
      `;
    chatFooter.appendChild(whatsappButton);
    this.chatBox.appendChild(chatFooter);
  }


  addEventListeners() {
    // Toggle chat on widget button click
    this.chatButton.addEventListener('click', () => {
      this.toggleChat();
    });

    // Close chat on close button click
    const closeButton = this.chatBox?.querySelector('.whatsapp-chat-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeChat();
      });
    }

    // Open WhatsApp on chat button click
    const whatsappButton = this.chatBox?.querySelector('.whatsapp-chat-button');
    if (whatsappButton) {
      whatsappButton.addEventListener('click', () => {
        this.openWhatsApp();
      });
    }
  }

  toggleChat() {
    if (this.chatBox.classList.contains('open')) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    this.chatBox.classList.add('open');
  }

  closeChat() {
    this.chatBox.classList.remove('open');
  }

  openWhatsApp() {
    // Format phone number (remove any non-digit characters)
    const formattedNumber = this.phoneNumber.replace(/\D/g, '');

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }

  // Method to destroy the widget
  destroy() {
    try {
      // Remove event listeners
      if (this.chatButton) {
        this.chatButton.removeEventListener('click', this.toggleChatBound);
      }

      const closeButton = this.chatBox?.querySelector('.whatsapp-chat-close');
      if (closeButton) {
        closeButton.removeEventListener('click', this.closeChatBound);
      }

      const whatsappButton = this.chatBox?.querySelector(
        '.whatsapp-chat-button'
      );
      if (whatsappButton) {
        whatsappButton.removeEventListener('click', this.openWhatsAppBound);
      }

      // Remove widget from DOM
      if (this.widgetContainer && this.widgetContainer.parentNode) {
        this.widgetContainer.parentNode.removeChild(this.widgetContainer);
      }
    } catch (error) {
      console.error('Error destroying WhatsApp widget:', error);
    }
  }
}

// Initialize WhatsApp Widget from data attributes
function initFromDataAttributes() {
  const elements = document.querySelectorAll('[data-whatsapp-widget]');
  elements.forEach((element) => {
    const options = {
      phoneNumber: element.getAttribute('data-phone-number'),
      name: element.getAttribute('data-name'),
      status: element.getAttribute('data-status'),
      avatar: element.getAttribute('data-avatar'),
      welcomeMessage: element.getAttribute('data-welcome-message'),
      buttonText: element.getAttribute('data-button-text'),
      position: element.getAttribute('data-position'),
      autoOpen: element.getAttribute('data-auto-open') === 'true',
      delay: element.getAttribute('data-delay'),
      container: element,
    };

    new WhatsAppWidget(options);
  });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initFromDataAttributes);

// Global initialization function
window.initWhatsAppWidget = function (options) {
  return new WhatsAppWidget(options);
};

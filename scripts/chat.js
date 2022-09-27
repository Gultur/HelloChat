
class User
{
    constructor(name)
    {
        this.name = name
    }
}

class Message
{
    constructor(content, user)
    {
        this.content = content
        this.user = user
    }
}

class Chat extends HTMLElement
{
    constructor(){
        super()
        this.chatSection = document.createElement('div');
        this.chatSection.classList.add('chat-section')

        this.leftUser = new User('Chat A')
        this.rightUser = new User('Chat B')


        this.appendChild(this.chatSection);

        this.chatSection.appendChild(this.createChatBox(this.leftUser));
        this.chatSection.appendChild(this.createChatBox(this.rightUser));
    }

    createChatBox(user)
    {
        const chatBox = document.createElement('div');
        chatBox.classList.add('chat-box')
        chatBox.setAttribute('user', user.name)

        const header = document.createElement('div')
        header.innerHTML = user.name
        header.classList.add('chat-header')
        chatBox.appendChild(header)

        const messagesBox = this.createMessageBox(user)
        chatBox.appendChild(messagesBox)

        const inputMessage = this.createSendBox(user)
        chatBox.appendChild(inputMessage)

        return chatBox
    }

    createMessageBox(user)
    {
        const messagesBox = document.createElement('div');
        messagesBox.classList.add('messages-box')
        messagesBox.setAttribute('user', user.name)

        return messagesBox
    }

    createSendBox(user)
    {
        const sendBox = document.createElement('form')
        sendBox.classList.add('input-message')

        const input = document.createElement('textarea')
        input.placeholder = 'WriteMessage'

        const button = document.createElement('button')
        button.innerText = 'OK'
        button.onclick = this.handleSendMessage(input, user)

        sendBox.appendChild(input)
        sendBox.appendChild(button)

        return sendBox
    }

    handleSendMessage(input, user) {
        return function (event) {
            event.preventDefault();
            if (input && input.value) {

                const message = new Message(input.value, user)
                const messageBoxes = document.querySelectorAll('.messages-box')

                messageBoxes.forEach((messageBox) => {

                    const span = document.createElement('p')
                    const pre = document.createElement('pre')
                    pre.innerHTML = message.content


                    const messageBoxUser = messageBox.getAttribute('user')
                    span.classList.add(messageBoxUser === message.user?.name? 'self' : 'other', 'message')

                    span.appendChild(pre)
                    messageBox.appendChild(span);
                    messageBox.scrollTop = messageBox. scrollHeight
                    input.value = ""
                })
            }
        }
    }
}

customElements.define('chat-section', Chat)
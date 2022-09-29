
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
        input.placeholder = 'Ecrivez votre message'
        input.addEventListener('keyup', this.handleInputEvent);

        const button = document.createElement('button')
        button.innerText = 'OK'
        button.setAttribute('disabled', true)
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

                    const pre = document.createElement('pre')
                    pre.textContent = message.content

                    const messageBoxUser = messageBox.getAttribute('user')

                    const isSender = messageBoxUser === message.user?.name
                    pre.classList.add( isSender === true ? 'self' : 'other', 'message')

                    messageBox.appendChild(pre);
                    messageBox.scrollTop = messageBox. scrollHeight

                    // we need to reset the textarea value
                    input.value = ''
                    input.dispatchEvent(new Event('keyup'))
                })
            }
        }
    }

    handleInputEvent(event)
    {
        const target = event.target

        const relatedButton = target?.nextSibling // we know that the button is the next sibling element, we should 
        const buttonIsDisabled = relatedButton?.getAttribute('disabled');

        if(target?.value !== '' && buttonIsDisabled)
        {
            relatedButton.removeAttribute('disabled')
        }

        if(target?.value === '' && !buttonIsDisabled)
        {
            relatedButton.setAttribute('disabled', true)
        }
    }
}

customElements.define('chat-section', Chat)
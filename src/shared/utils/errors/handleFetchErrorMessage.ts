type MessageType = {
  [key: string]: string
}

function handleFetchErrorMessage(err: string) {
  const messageTypes: MessageType = {
    EMAIL_ALREADY_REGISTERED: 'Endereço de e-mail já está em uso'
  }

  if (!messageTypes[err]) {
    return { message: 'Desculpe, algo deu errado.' }
  }

  return { message: messageTypes[err] }
}

export { handleFetchErrorMessage }


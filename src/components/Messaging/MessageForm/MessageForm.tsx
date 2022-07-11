import { useAppDispatch } from "../../../hooks/redux"
import { Message } from "../../../types/message"
import { useForm } from '../../../hooks/form'
import postMessage from "../../../features/messaging/actions/postMessageAction"
import styles from './MessageForm.module.css'

interface MessageFormProps {
  conversationId: Message["id"]
}

interface MessageFormValues {
  message: string,
}

export const MessageForm = ({ conversationId }: MessageFormProps) => {

  const initialState: MessageFormValues = {
    message: '',
  };

  const { onChange, onSubmit, values, resetForm } = useForm(
    sendMessage,
    initialState
  );

  const dispatch = useAppDispatch()
  async function sendMessage() {
    if (!values?.message.trim()) {
      return
    }
    resetForm()
    dispatch(postMessage({
      conversationId,
      body: values.message.trim()
    }))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          className={styles.input}
          name='message'
          id='message'
          type='texte'
          placeholder='Your message'
          onChange={onChange}
          required
          value={values.message}
        />
        <button className={styles.button} type='submit'>Send</button>
      </form>
    </div>
  );
}
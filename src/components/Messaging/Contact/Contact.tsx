import { useUser } from "../../../features/messaging/hooks/users"
import { User } from "../../../types/user"
import styles from './Contact.module.css'

interface ContactProps {
  id: User["id"],
  clickHandler: any,
}

export const Contact = ({ id, clickHandler }: ContactProps) => {

  const user = useUser(id)

  return (
    <div className={styles.container} onClick={() => clickHandler(user.id)}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}></div>
        <div className={styles.details}>
          <div className={styles.interlocutor}>{user.nickname}</div>
        </div>
      </div>
    </div>
  )
}
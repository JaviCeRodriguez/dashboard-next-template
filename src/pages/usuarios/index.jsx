import { useState, useEffect } from 'react';
import UserCard from "@components/common/Cards/User";
import MainLayout from "@components/layout/MainLayout";

const Users = ({ users }) => {
  const [usersList, setUsersList] = useState(users);

  const changeStatus = (userUid, status) => {
    const newUsersList = usersList.map(user => {
      if (user.uid === userUid) {
        user.subscription.status = status;
      }
      return user;
    });
    setUsersList(newUsersList);
  }

  useEffect(() => {
    setUsersList(users);
  }, []);

  return (
    <MainLayout>
      {
        usersList && usersList.map(user => <UserCard key={user.uid} user={user} changeStatus={changeStatus} />)
      }
    </MainLayout>
  );
};

export async function getStaticProps() {
  const reponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/random_user?size=50`);
  const users = await reponse.json();
  
  return {
    props: {
      users: users,
    },
  }
}

export default Users;

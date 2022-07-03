import { useState, useEffect } from 'react';
import { Input, HStack, Select } from '@chakra-ui/react';
import UserCard from "@components/common/Cards/User";
import MainLayout from "@components/layout/MainLayout";

const Users = ({ users }) => {
  const [usersList, setUsersList] = useState(users);
  const [filter, setFilter] = useState({
    name: '',
    status: null,
  });

  const changeStatus = (userUid, status) => {
    const newUsersList = usersList.map(user => {
      if (user.uid === userUid) {
        user.subscription.status = status;
      }
      return user;
    });
    setUsersList(newUsersList);
  }

  const filterUsers = (key, value) => {
    const newFilter = { ...filter };
    newFilter[key] = value;
    setFilter(newFilter);
  }

  useEffect(() => {
    setUsersList(users);
  }, []);

  useEffect(() => {
    // Filter users by first_name + last_name and status
    const newUsersList = users.filter(user => {
      let result = true;
      if (filter.name) {
        result = user.first_name.toLowerCase().includes(filter.name.toLowerCase()) || user.last_name.toLowerCase().includes(filter.name.toLowerCase());
      }
      if (filter.status) {
        result = result && user.subscription.status === filter.status;
      }
      return result;
    });
    setUsersList(newUsersList);
  }, [filter])

  return (
    <MainLayout>
      <HStack mx="8px" my="12px">
        <Input
          variant='outline'
          placeholder='Buscar por nombre'
          onChange={(e) => filterUsers('name', e.target.value)}
        />
        <Select
          placeholder='Filtrar por estado'
          onChange={(e) => filterUsers('status', e.target.value)}>
          <option value='Active'>Activo</option>
          <option value='Pending'>Pediente</option>
          <option value='Idle'>Inactivo</option>
          <option value='Blocked'>Bloqueado</option>
        </Select>
      </HStack>
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

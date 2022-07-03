import { Box, Button, Heading, HStack, VStack, Image, Text } from '@chakra-ui/react';
import { EmailIcon, WarningTwoIcon, CheckIcon, LockIcon } from '@chakra-ui/icons';

const UserCard = ({ user, changeStatus }) => {
  const { status, plan, payment_method } = user.subscription
  const statusColor = {
    Active: 'green.500',
    Pending: 'yellow.500',
    Idle: 'gray.500',
    Blocked: 'red.500',
  }
  
  return (
    <Box my="10px" mx="8px" p="12px" bgColor="gray.900" borderRadius="lg">
      <HStack justifyContent="space-between">
        <HStack>
          <Image src={user.avatar} alt={user.username} borderRadius="full" boxSize="80px" bgColor="blue.400" />
          <VStack alignItems="flex-start">
            <Heading as="h3" fontSize="lg">{user.first_name} {user.last_name} ({user.username})</Heading>
            <Text fontSize='md'>{user.address.city} - {user.address.state} - {user.address.country}</Text>
            <HStack>
              <EmailIcon color="yellow.400" />
              <Text fontSize='md'>{user.email}</Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack>
          <Box bgColor={statusColor[status]} p="5px" borderRadius="lg" w="270px" mr="20px">
            <Heading as="h4" fontSize="md">Plan: {plan}</Heading>
            <Text fontSize='md'>Payment method: {payment_method}</Text>
          </Box>
          <VStack>
            {
              status !== 'Active' && 
              <Button onClick={() => changeStatus(user.uid, 'Active')} leftIcon={<CheckIcon />} w="120px" bgColor='green.500' variant='solid'>
                Activar
              </Button>
            }
            {
              status !== 'Idle' && status !== 'Pending' &&
              <Button onClick={() => changeStatus(user.uid, 'Idle')} leftIcon={<LockIcon />} w="120px" bgColor='gray.500' variant='solid'>
                Inactivar
              </Button>
            }
            {
              status !== 'Blocked' &&
              <Button onClick={() => changeStatus(user.uid, 'Blocked')} leftIcon={<WarningTwoIcon />} w="120px" bgColor='red.500' variant='solid'>
                Bloquear
              </Button>
            }
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
};

export default UserCard;

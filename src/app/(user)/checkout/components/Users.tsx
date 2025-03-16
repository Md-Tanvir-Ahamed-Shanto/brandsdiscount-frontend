import { useGetAllUsersQuery } from '@/api/userApi';

const Users = () => {
    const { data: usersAll, isLoading } = useGetAllUsersQuery('');
    console.log('🚀 ~ Users ~ usersAll:', usersAll);

    return (
        <div>
            {isLoading ? 'isLoading' : <h1>Users List {usersAll?.length} </h1>}
        </div>
    );
};

export default Users;

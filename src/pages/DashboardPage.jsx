import { SearchQueryProvider } from '../hooks/useQuery';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/Table';

export  function UserDashboard()
{
    return(
        <>
        <SearchQueryProvider >
        <SearchBar/>
        <UserTable/>
      </SearchQueryProvider>
        </>
    )
}